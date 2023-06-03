package curg.ethseoul023.Controller;


import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Service.WalletService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/getAddress")
    public Wallet getAddress(String _eoaAddress)
    {
        return walletService.getAAbyEOA(_eoaAddress);
    }
}
