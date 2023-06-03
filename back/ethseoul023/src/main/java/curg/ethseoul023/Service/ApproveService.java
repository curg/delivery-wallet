package curg.ethseoul023.Service;

import curg.ethseoul023.Domain.Approve;
import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Repository.MongoDBRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
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
import java.net.URI;
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
        String aaAddress = String.valueOf(mongoDBRepository.findByEoaAddress(eoaAddress).get().getAaAddress());
        String tokenAddress = _approve.getTokenAddress();
        String amount = _approve.getAmount();

        getNameWithParameter(eoaAddress,aaAddress,tokenAddress,amount);

//        String privateKey = "0x625f593048696399cb4a3fc11985426e607152ed506873edc4e99ed3d89a9f95";
        return true;
    }
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
}