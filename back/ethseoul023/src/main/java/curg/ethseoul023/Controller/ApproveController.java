package curg.ethseoul023.Controller;

import curg.ethseoul023.Domain.Approve;
import curg.ethseoul023.Service.ApproveService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApproveController {

    private final ApproveService approveService;

    public ApproveController(ApproveService approveService) {
        this.approveService = approveService;
    }

    @PostMapping("/approve")
    public boolean signalApprove(Approve _approve) throws Exception {
        return approveService.executeTransfer(_approve);
    }

}
