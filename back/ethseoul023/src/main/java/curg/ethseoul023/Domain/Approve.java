package curg.ethseoul023.Domain;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Approve {

    private String eoaAddress;
    private int chainIdx;
    private String amount;
    private String tokenAddress;
}