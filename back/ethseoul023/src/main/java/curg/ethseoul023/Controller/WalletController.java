package curg.ethseoul023.Controller;


import curg.ethseoul023.Service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping("/")
    public String addWallet(){
        return "a";
    }
}
