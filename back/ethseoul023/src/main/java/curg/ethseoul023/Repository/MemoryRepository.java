package curg.ethseoul023.Repository;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class MemoryRepository {

    HashMap<String,String> table = new HashMap<String,String>();

    public String findByeoaAddress(String _eoaAddress){
        return "aa";
    }

    public String addaaAddress(String _eoaAddress,String _aaAddress){
        table.put(_eoaAddress,_aaAddress);
        return _aaAddress;
    }
}