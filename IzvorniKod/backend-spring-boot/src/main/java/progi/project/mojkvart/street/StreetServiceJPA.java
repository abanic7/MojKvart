package progi.project.mojkvart.street;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import java.util.List;
import java.util.Optional;

@Service
public class StreetServiceJPA implements StreetService{
    @Autowired
    private StreetRepository streetRepo;

    @Override
    public List<Street> listAll() {
        return streetRepo.findAll();
    }

    @Override
    public Optional<Street> findById(long streetId) {
        Assert.notNull(streetId, "ID must be given");
        return streetRepo.findById(streetId);
    }

    @Override
    public boolean existsById(long id) {
        return findById(id).isPresent();
    }

    @Override
    public Street fetch(long streetId) {
        return findById(streetId).orElseThrow(
                () -> new IllegalArgumentException()
        );
    };

    @Override
    public Street updateStreet(Street street) {
        Long streetId = street.getId();
        return streetRepo.save(street);
    }

    @Override
    public Street deleteStreet(long streetId) {
        Street street = fetch(streetId);
        streetRepo.delete(street);
        return street;
    }

    @Override
    public Street createStreet(Street street) {
        Assert.isNull(street.getId(),
                "Street ID must be null, not: " + street.getId()
        );
        return streetRepo.save(street);
    }
}