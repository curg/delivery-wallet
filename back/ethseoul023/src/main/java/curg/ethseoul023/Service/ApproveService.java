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

    public boolean executeTransfer(@RequestBody Approve _approve) throws Exception {
        String eoaAddress = _approve.getEoaAddress();
        String amount = _approve.getAmount();
        String tokenAddress = "0x49c57c70912BD12304A70D494007320BecfDAAca";
        String aaAddress = String.valueOf(mongoDBRepository.findByEoaAddress(eoaAddress));

//        String privateKey = "0x625f593048696399cb4a3fc11985426e607152ed506873edc4e99ed3d89a9f95";
        return true;
    }
}