package curg.ethseoul023.Domain;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class Asset {
    private String ticker;
    private int tokenIdx;
    private String value;
    private String amount;
}