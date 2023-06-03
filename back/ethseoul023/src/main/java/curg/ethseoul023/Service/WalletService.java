package curg.ethseoul023.Service;

import curg.ethseoul023.Repository.MemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WalletService {

    @Autowired
    private MemoryRepository memoryRepository;

}
