package curg.ethseoul023.Service;

import curg.ethseoul023.Domain.Approve;
import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Dto.ApproveReturnDto;
import curg.ethseoul023.Repository.MongoDBRepository;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGasPrice;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.utils.Numeric;

import java.math.BigInteger;
import java.net.URI;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

@Service
public class ApproveService {

    private final MongoDBRepository mongoDBRepository;

    public ApproveService(MongoDBRepository mongoDBRepository) {
        this.mongoDBRepository = mongoDBRepository;
    }

    /*
    public String getNameWithParameter(
            String from,
            String to,
            String tokenAddress,
            String amount
    ) { //파라미터를 넣는경우
        URI uri = UriComponentsBuilder
                .fromUriString("http://localhost:8081")
                .path("/node")
                .queryParam("from", from)
                .queryParam("to",to)
                .queryParam("tokenAddress",tokenAddress)
                .queryParam("amount",amount)
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);

        return responseEntity.getBody();
    }
*/
    public String IsExistaaAddress(String eoaAddress) {
        Optional<Wallet> wallet = mongoDBRepository.findByEoaAddress(eoaAddress);
        if (wallet.isPresent()) {
            return wallet.get().getAaAddress();
        }
        return "0x000";
    }


    public ApproveReturnDto executeTransfer(@RequestBody Approve _approve) throws Exception {

        ApproveReturnDto returnDto = new ApproveReturnDto();

        String eoaAddress = _approve.getEoaAddress();
        int chainIdx = _approve.getChainIdx();
        String amount = _approve.getAmount();
        String tokenAddress = _approve.getTokenAddress();

        String privateKey = "0x625f593048696399cb4a3fc11985426e607152ed506873edc4e99ed3d89a9f95";
        Credentials credentials = Credentials.create(privateKey);
        // Ethereum 노드에 연결
        Web3j web3j = Web3j.build(new HttpService("https://eth-goerli.g.alchemy.com/v2/aVmzl7Fwxc-3Vyrh-KPH28hh-vsk7HE7"));

        String contractAddress = "0x49c57c70912BD12304A70D494007320BecfDAAca";

        String toAddress = IsExistaaAddress(eoaAddress); // aa 컨트랙트 주소
        if (toAddress == null) {
            System.out.println("지갑을 못찾았습니다");
            returnDto.setTxHash("null");
            returnDto.setResult("지갑을 못찾았습니다");
            return returnDto;
        }

        EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(credentials.getAddress(), DefaultBlockParameterName.LATEST).send();
        BigInteger nonce = ethGetTransactionCount.getTransactionCount();
        BigInteger amountToSend = new BigInteger(amount); // you can provide yourself how much you want to send

        Function function = new Function(
                "deliveryTokenAssets",
                Arrays.asList(new Address(160,tokenAddress),new Address(160,eoaAddress),new Address(160,toAddress), new Uint256(amountToSend)),
                Collections.singletonList(new TypeReference<Bool>() {
                }));;
        String encodedFunction = FunctionEncoder.encode(function);
        BigInteger gasLimit = BigInteger.valueOf(10000000L); // you can customize these
        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
        BigInteger gasPrice = ethGasPrice.getGasPrice();
        RawTransaction rawTransaction = RawTransaction.createTransaction(nonce, gasPrice, gasLimit, contractAddress, encodedFunction);
        byte[] signedMessage = TransactionEncoder.signMessage(rawTransaction, credentials);
        String hexValue = Numeric.toHexString(signedMessage);
        EthSendTransaction ethSendTransaction = web3j.ethSendRawTransaction(hexValue).sendAsync().get();
        String transactionHash = ethSendTransaction.getTransactionHash();
        System.out.println(transactionHash);
        if (transactionHash == null) {
            returnDto.setResult("가스비가 부족합니다");
            returnDto.setTxHash("null");
            return returnDto;
        } else if (ethSendTransaction.getError() != null) {
            returnDto.setResult(ethSendTransaction.getError().toString());
            returnDto.setTxHash("null");
        }
        returnDto.setResult("true");
        returnDto.setTxHash(transactionHash);
        return returnDto;
    }

}
