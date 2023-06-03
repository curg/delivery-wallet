package curg.ethseoul023.Repository;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class MemoryRepository {

    HashMap<String,String> table = new HashMap<String,String>();

    public String getAddress(String eoa){
        return table.get(eoa);
    }

    public String addAddress(String eoa,String aa){
        table.put(eoa,aa);
        return aa;
    }
}