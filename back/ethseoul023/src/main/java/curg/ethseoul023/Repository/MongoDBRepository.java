package curg.ethseoul023.Repository;

import curg.ethseoul023.Domain.Wallet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MongoDBRepository extends MongoRepository<Wallet, String> {
    Optional<Wallet> findByEoaAddress(String eoaAddress);
}
