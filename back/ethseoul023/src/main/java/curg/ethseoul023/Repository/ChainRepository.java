package curg.ethseoul023.Repository;


import org.springframework.stereotype.Repository;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Function;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.http.HttpService;

import java.util.Arrays;
import java.util.concurrent.ExecutionException;

@Repository
public class ChainRepository {

    private Web3j web3 = Web3j.build(new HttpService("https://eth-goerli.g.alchemy.com/v2/aVmzl7Fwxc-3Vyrh-KPH28hh-vsk7HE7"));

    public String call(String contractAddress, String ownerAddress) throws ExecutionException, InterruptedException {

        Function function = new Function(
                "one",  // function we're calling
                Arrays.asList(),  // Parameters to pass as Solidity Types ->new Address(ownerAddress)
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

}
