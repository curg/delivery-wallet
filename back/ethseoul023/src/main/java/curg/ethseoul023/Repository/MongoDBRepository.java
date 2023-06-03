package curg.ethseoul023.Repository;

import curg.ethseoul023.Domain.WalletDomain;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MongoDBRepository extends MongoRepository<WalletDomain, String> {
    Optional<String> findByEoaAddress(String eoaAddress);
}
