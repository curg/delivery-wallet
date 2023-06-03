package curg.ethseoul023.Controller;

import curg.ethseoul023.Domain.Approve;
import curg.ethseoul023.Service.ApproveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApproveController {

    @Autowired
    private ApproveService approveService;

    @PostMapping
    public boolean signalApprove(Approve _approve){
        return approveService.executeTransfer(_approve);
    }

}
