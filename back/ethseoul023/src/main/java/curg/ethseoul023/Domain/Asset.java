package curg.ethseoul023.Domain;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Asset {
    private String amount;
    private String ticker;
    private int tokenIdx;
    private String value;
}