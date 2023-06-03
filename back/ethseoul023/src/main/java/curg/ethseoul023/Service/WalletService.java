package curg.ethseoul023.Service;

import curg.ethseoul023.Repository.MongoDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WalletService {

    @Autowired
    private MongoDBRepository memoryRepository;

    public Optional<String> getAAbyEOA(String _eoaAddress) {
        return memoryRepository.findByEoaAddress(_eoaAddress);
    }




}
