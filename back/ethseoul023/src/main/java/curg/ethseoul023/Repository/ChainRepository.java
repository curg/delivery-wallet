package curg.ethseoul023.Repository;


import org.springframework.stereotype.Repository;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Function;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.Response;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.util.Arrays;
import java.util.concurrent.ExecutionException;

@Repository
public class ChainRepository {

    private Web3j web3 = Web3j.build(new HttpService("https://eth-goerli.g.alchemy.com/v2/aVmzl7Fwxc-3Vyrh-KPH28hh-vsk7HE7"));

    public String getTokenAmount(String contractAddress, String ownerAddress) throws ExecutionException, InterruptedException {

        Function function = new Function(
                "balanceOf",  // function we're calling
                Arrays.asList(new Address(ownerAddress)),  // Parameters to pass as Solidity Types ->new Address(ownerAddress)
                Arrays.asList(new TypeReference<Bool>() {}));
        String encodedFunction = FunctionEncoder.encode(function);

        EthCall response = web3.ethCall(
                        Transaction.createEthCallTransaction(
                                null,
                                contractAddress,
                                encodedFunction),
                        DefaultBlockParameterName.LATEST
                )
                .sendAsync().get();
        return response.getValue();
    }

    public String getEthAmount(String ownerAddress) throws IOException {
        EthGetBalance ethGetBalance = web3.ethGetBalance(ownerAddress,
                DefaultBlockParameterName.LATEST).send();
        String balance = String.valueOf(ethGetBalance.getBalance());
        return balance;
    }

}


// 0x0d1FCB66050EE7a14FF4B9a2bf499f521BbA41bD   ->  USDT
// 0xac5058E9Ac8b8aD7A7B765E360FfA7943F530be5   -> WBTC

// 0x08fbCc35b21C519724982632f1FE410EaC0838F4    -> 유저