package curg.ethseoul023.Controller;


import curg.ethseoul023.Domain.Asset;
import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Service.WalletService;
//import curg.ethseoul023.Domain.Asset;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RestController
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/getAddress")
    public Optional<String> getAddress(@RequestParam String eoaAddress)
    {
        return Optional.ofNullable(walletService.getAAbyEOA(eoaAddress));
    }

    @PostMapping("/addAddress")
    public String addAddress(@RequestBody Wallet wallet)
    {
        return walletService.addAddress(wallet.getEoaAddress(), wallet.getAaAddress());
    }

    @GetMapping("/asset")
    public List<String> getAsset(@RequestParam String address, int chainIdx) throws ExecutionException, InterruptedException, IOException {
        return walletService.getAssets(address,chainIdx);
    }
}