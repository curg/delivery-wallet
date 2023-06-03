package curg.ethseoul023.Service;

import curg.ethseoul023.Domain.Asset;
import curg.ethseoul023.Repository.ChainRepository;
import curg.ethseoul023.Repository.MemoryRepository;
import curg.ethseoul023.Repository.MongoDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class WalletService {

    @Autowired
    private MongoDBRepository mongoDBRepository;

    @Autowired
    private MemoryRepository memoryRepository;

    @Autowired
    private ChainRepository chainRepository;

    public String getAAbyEOA(String eoa) {
        return memoryRepository.getAddress(eoa);

    }

    public String addAddress(String eoa,String aa){
        return memoryRepository.addAddress(eoa,aa);
    }

    public List<Asset> getAsset(String address, int chainIdx)
    {
        List<Asset> l = new ArrayList<Asset>();

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
        a2.setAmount("241");
        a2.setValue(bigDecimal.multiply(new BigDecimal(1)).toString());
        l.add(a2);

        Asset a3 = new Asset();
        a3.setTokenIdx(3);
        a3.setTicker("WBTC");
        a3.setAmount("13");
        a3.setValue(bigDecimal.multiply(new BigDecimal(20000)).toString());
        l.add(a3);

        return l;
    }

    public String test() throws IOException, ExecutionException, InterruptedException {
        return chainRepository.call(
                "0x4A18B1D7eFe1177020868583b168AA4045efDbAE",
                "0x08fbCc35b21C519724982632f1FE410EaC0838F4");
    }
}
