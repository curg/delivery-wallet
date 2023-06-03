package curg.ethseoul023.Service;
//
//import curg.ethseoul023.Domain.Asset;
import curg.ethseoul023.Domain.Asset;
import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Repository.ChainRepository;
import curg.ethseoul023.Repository.MongoDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
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
    public List<Asset> getAssets(String owner, int chainIdx) throws ExecutionException, InterruptedException {
        List<Asset> l = new ArrayList<Asset>();

        String amountUSDT = chainRepository.call(
                "0x0d1FCB66050EE7a14FF4B9a2bf499f521BbA41bD",
                owner
        );
        String amountWBTC = chainRepository.call(
                "0xac5058E9Ac8b8aD7A7B765E360FfA7943F530be5",
                owner
        );

        Asset a1 = new Asset();
        a1.setTokenIdx(1);
        a1.setTicker("ETH");
        a1.setAmount("113");
        BigDecimal bigDecimal = new BigDecimal(a1.getAmount());
        a1.setValue(bigDecimal.multiply(new BigDecimal(1900)).toString());
        l.add(a1);

        Asset a2 = new Asset();
        a2.setTokenIdx(2);
        a2.setTicker("USDT");
        a2.setAmount(amountUSDT);
        a2.setValue(bigDecimal.multiply(new BigDecimal(1)).toString());
        l.add(a2);

        Asset a3 = new Asset();
        a3.setTokenIdx(3);
        a3.setTicker("WBTC");
        a3.setAmount(amountWBTC);
        a3.setValue(bigDecimal.multiply(new BigDecimal(20000)).toString());
        l.add(a3);

        return l;
    }

}
