package curg.ethseoul023.Service;

import curg.ethseoul023.Domain.Approve;
import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Repository.MongoDBRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.web3j.abi.DefaultFunctionEncoder;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Optional;


@Service
public class ApproveService {

    private final MongoDBRepository memoryRepository;

    public ApproveService(MongoDBRepository memoryRepository) {
        this.memoryRepository = memoryRepository;
    }

    public String IsExistaaAddress(String eoaAddress) {

        Wallet wallet = memoryRepository.findByEoaAddress(eoaAddress);
        if (wallet.getEoa() == null) {
            return "0x000";
        }
        return wallet.getAa();
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
            System.out.println("tx hash : "+transaction.getTransactionHash());
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
//        // Function을 ABI 문자열로 인코딩
//        String encodedFunction = DefaultFunctionEncoder.encode(transferFromFunction);
//
//        // 트랜잭션 생성
//        Transaction transaction = Transaction.createFunctionCallTransaction(
//                eoaAddress,
//                BigInteger.ZERO, // 가스 가격 (설정하지 않을 경우 자동으로 적용됨)
//                BigInteger.valueOf(100000), // 가스 한도
//                BigInteger.ZERO,// 전송할 이더량 (ERC20 토큰 전송이므로 0)
//                tokenAddress,
//                encodedFunction
//        );
//
//        try {
//            // 트랜잭션 전송
//            EthSendTransaction response = web3j.ethSendTransaction(transaction).send();
//
//            // 트랜잭션 결과 처리
//            if (response.hasError()) {
//                // 트랜잭션 전송 실패 시 에러 처리
//                String errorMessage = response.getError().getMessage();
//                System.out.println("Transaction failed: " + errorMessage);
//                return false;
//            } else {
//                // 트랜잭션 전송 성공
//                String transactionHash = response.getTransactionHash();
//                System.out.println("Transaction sent: " + transactionHash);
//                return true;
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return false;
//        }
//    }
    }
}
