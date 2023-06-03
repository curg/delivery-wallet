package curg.ethseoul023.Service;

import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Repository.MongoDBRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WalletService {

    private final MongoDBRepository memoryRepository;

    public WalletService(MongoDBRepository memoryRepository) {
        this.memoryRepository = memoryRepository;
    }

    public Wallet getAAbyEOA(String _eoaAddress) {
        return memoryRepository.findByEoaAddress(_eoaAddress);
    }




}
