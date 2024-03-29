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

    public boolean isExistAA(String eoa) {
        Optional<Wallet> wallet = mongoDBRepository.findByEoaAddress(eoa);
        if (wallet.isPresent()) {
            return true;
        }
        return false;
    }

    public String getAAbyEOA(String eoa) {
        Optional<Wallet> wallet = mongoDBRepository.findByEoaAddress(eoa);
        if (wallet.isPresent()) {
            return wallet.get().getAaAddress();
        }
        return "null";
    }

    public String addAddress(String eoa,String aa){
        Wallet wallet = new Wallet();

        eoa = eoa.toLowerCase();
        wallet.setEoaAddress(eoa);
        wallet.setAaAddress(aa);
        if (isExistAA(eoa)==false){
            mongoDBRepository.insert(wallet);
            return aa;
        }
        return "false";
    }
    public List<String> getAssets(String owner, int chainIdx) throws ExecutionException, InterruptedException, IOException {
        List<String> list = new ArrayList<>();

        List<String> tokenAddresses = new ArrayList<>();
        tokenAddresses.add("0xB186887176E450bFfc03697b0684347f3f346F3D");// CURG
        tokenAddresses.add("0x0d1FCB66050EE7a14FF4B9a2bf499f521BbA41bD");// USDT
        tokenAddresses.add("0xac5058E9Ac8b8aD7A7B765E360FfA7943F530be5");// WBTC
        tokenAddresses.add("0x236F53345F541c755DF70988C7E8e4b658B820aA");// DAI

        String amountUSDT = chainRepository.getTokenAmount(
                "0x0d1FCB66050EE7a14FF4B9a2bf499f521BbA41bD",
                owner
        );


        int i;
        for( i=0; i<4; i++)
        {
            String amount = chainRepository.getTokenAmount(
                    tokenAddresses.get(i),
                    owner
            );

            amount = amount.substring(2,amount.length());
            BigInteger result = new BigInteger(amount,16);
            list.add(result.toString());
        }
        return list;
    }
}

