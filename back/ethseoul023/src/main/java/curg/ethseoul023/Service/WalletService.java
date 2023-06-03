package curg.ethseoul023.Service;

import curg.ethseoul023.Repository.MemoryRepository;
import curg.ethseoul023.Repository.MongoDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WalletService {

    @Autowired
    private MongoDBRepository mongoDBRepository;

    @Autowired
    private MemoryRepository memoryRepository;

    public String getAAbyEOA(String eoa) {
        return memoryRepository.getAddress(eoa);
    }

    public String addAddress(String eoa,String aa){
        return memoryRepository.addAddress(eoa,aa);
    }

}
