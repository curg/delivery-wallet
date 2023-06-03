package curg.ethseoul023.Repository;

import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class MemoryRepository {
    public String findByEoaAddress(String _eoaAddress){
        return "aa";
    }
}