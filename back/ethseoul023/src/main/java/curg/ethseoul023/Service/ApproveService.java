package curg.ethseoul023.Service;

import curg.ethseoul023.Domain.Approve;
import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Repository.MongoDBRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Optional;

@Service
public class ApproveService {

    private final MongoDBRepository mongoDBRepository;

    public ApproveService(MongoDBRepository mongoDBRepository) {
        this.mongoDBRepository = mongoDBRepository;
    }


    public String IsExistaaAddress(String eoaAddress) {
        Optional<Wallet> wallet = mongoDBRepository.findByEoaAddress(eoaAddress);
        if (wallet.isPresent()) {
            return wallet.get().getAaAddress();
        }
        return "";
    }

    public boolean executeTransfer(@RequestBody Approve _approve) throws Exception {
        String eoaAddress = _approve.getEoaAddress();
//        int chainIdx = _approve.getChainIdx();
        String amount = _approve.getAmount();
//        String tokenAddress = _approve.getTokenAddress();
        String tokenAddress = "0x49c57c70912BD12304A70D494007320BecfDAAca";

        String privateKey = "0x625f593048696399cb4a3fc11985426e607152ed506873edc4e99ed3d89a9f95";
        Credentials credentials = Credentials.create(privateKey);
        // Ethereum 노드에 연결
        Web3j web3j = Web3j.build(new HttpService("https://eth-goerli.g.alchemy.com/v2/aVmzl7Fwxc-3Vyrh-KPH28hh-vsk7HE7"));

        // 토큰 컨트랙트 주소
//        String tokenContractAddress = "0x..."; // ERC20 토큰 컨트랙트 주소


        String toAddress = IsExistaaAddress(eoaAddress); // aa 컨트랙트 주소
        if (toAddress == null) {
            System.out.println("지갑을 못찾았습니다");
            return false;
        }
        System.out.println(toAddress);
        BigInteger bigIntamount = BigInteger.valueOf(Long.parseLong(amount)); // 전송할 토큰 양

        RawTransactionManager manger = new RawTransactionManager(web3j, credentials);
        // transferFrom 함수 호출을 위한 Function 생성
        Function transferFromFunction = new Function(
                "transferFrom",
                Arrays.asList(
                        new org.web3j.abi.datatypes.Address(eoaAddress),
                        new org.web3j.abi.datatypes.Address(toAddress),
                        new Uint256(bigIntamount)
                ),
                Arrays.asList(new TypeReference<Uint256>() {
                })
        );
        String data = FunctionEncoder.encode(transferFromFunction);
        BigInteger gasPrice = web3j.ethGasPrice().send().getGasPrice();
        BigInteger gasLimit = BigInteger.valueOf(120000);
        try {
            EthSendTransaction transaction = manger.sendTransaction(gasPrice, gasLimit, tokenAddress, data, null);
//            Thread.sleep(2000);
            System.out.println(transaction.getError());
            System.out.println("tx hash : " + transaction.getTransactionHash());
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }
}
