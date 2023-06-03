package curg.ethseoul023.Controller;

import curg.ethseoul023.Domain.Approve;
import curg.ethseoul023.Domain.Wallet;
import curg.ethseoul023.Repository.MongoDBRepository;
import curg.ethseoul023.Service.ApproveService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApproveController {

    private final ApproveService approveService;
    private final MongoDBRepository mongoDBRepository;

    public ApproveController(ApproveService approveService, MongoDBRepository mongoDBRepository) {
        this.approveService = approveService;
        this.mongoDBRepository = mongoDBRepository;
    }
    @PostMapping("/insertaddress")
    public void insertAddress() {
        Wallet testWallet = new Wallet();
        testWallet.setEoaAddress("0xEa3F5901b9A79331aB00e03bC8C475BC02132525");
        testWallet.setAaAddress("0xb3C6421241154C948634540f15496006CB2BF20E");
        mongoDBRepository.insert(testWallet);
    }
    @PostMapping("/approveEvent")
    public boolean signalApprove(Approve _approve) throws Exception{
        return approveService.executeTransfer(_approve);
    }

}
