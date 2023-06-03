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

}
