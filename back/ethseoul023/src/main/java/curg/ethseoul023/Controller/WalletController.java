package curg.ethseoul023.Controller;


import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class WalletController {

    @Autowired
    private WalletService walletService;
    @GetMapping("/getAddress")
    public String getAddress(@RequestParam String _eoaAddress)
    {
        return walletService.getAAbyEOA(_eoaAddress);
    }

    @PostMapping("/addAddress")
    public String addAddress(Wallet form)
    {
        return walletService.addAddress(form.getEoaAddress(),form.getAaAddress());
    }

}
