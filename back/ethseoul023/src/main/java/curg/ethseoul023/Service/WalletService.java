package curg.ethseoul023.Service;
//
//import curg.ethseoul023.Domain.Asset;
import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Repository.ChainRepository;
import curg.ethseoul023.Repository.MongoDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
public class WalletService {

    @Autowired
    private MongoDBRepository mongoDBRepository;


    @Autowired
    private ChainRepository chainRepository;

    public String getAAbyEOA(String eoa) {
        Optional<Wallet> wallet = mongoDBRepository.findByEoaAddress(eoa);
        if (wallet.isPresent()) {
            return wallet.get().getAaAddress();
        }
        return "";
    }

    public String addAddress(String eoa,String aa){
        Wallet wallet = new Wallet();
        wallet.setEoaAddress(eoa);
        wallet.setAaAddress(aa);
        mongoDBRepository.insert(wallet);
        return aa;
    }
    public List<String> getAssets(String owner, int chainIdx) throws ExecutionException, InterruptedException, IOException {
        List<String> l = new ArrayList<>();

        String amountETH = chainRepository.getEthAmount(owner);

        String amountUSDT = chainRepository.getTokenAmount(
                "0x0d1FCB66050EE7a14FF4B9a2bf499f521BbA41bD",
                owner
        );
        String amountWBTC = chainRepository.getTokenAmount(
                "0xac5058E9Ac8b8aD7A7B765E360FfA7943F530be5",
                owner
        );

        amountUSDT = amountUSDT.substring(2,amountUSDT.length());
        amountWBTC = amountWBTC.substring(2,amountWBTC.length());
        // 256bit

        BigInteger result_USDT = new BigInteger(amountUSDT,16);
        BigInteger result_WBTC = new BigInteger(amountWBTC,16);
        l.add(amountETH);
        l.add(result_USDT.toString());
        l.add(result_WBTC.toString());
        return l;

    }

}
