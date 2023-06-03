package curg.ethseoul023.Controller;


import curg.ethseoul023.Domain.Asset;
import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class WalletController {

    @Autowired
    private WalletService walletService;
    @GetMapping("/getAddress")
    public String getAddress(@RequestParam String eoa)
    {
        return walletService.getAAbyEOA(eoa);
    }

    @PostMapping("/addAddress")
    public String addAddress(Wallet form)
    {
        return walletService.addAddress(form.getEoa(),form.getAa());
    }

    @GetMapping("/asset")
    public List<Asset> getAsset(@RequestParam String address, int chainIdx){
        return walletService.getAsset(address,chainIdx);
    }

    @GetMapping("/")
    public String test() throws IOException, ExecutionException, InterruptedException {
        return walletService.test();
    }
}