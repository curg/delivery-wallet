package curg.ethseoul023.Domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Approve {

    private String eoaAddress;
    private int chainIdx; // 1 2 3
    private String amount; // 양
    private int tokenIdx;
}