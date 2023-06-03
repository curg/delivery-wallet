package curg.ethseoul023.Service;

import curg.ethseoul023.Domain.Approve;
import curg.ethseoul023.Repository.MemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApproveService {

    @Autowired
    private MemoryRepository memoryRepository;

    public boolean executeTransfer(Approve _approve){

        return true;
    }
}
