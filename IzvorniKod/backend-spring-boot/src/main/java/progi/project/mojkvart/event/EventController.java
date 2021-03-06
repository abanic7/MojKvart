package progi.project.mojkvart.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.account.AccountService;
import progi.project.mojkvart.meeting.Meeting;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    EventService eventService;

    @Autowired
    AccountService accountService;

    @GetMapping("")
    public List<Event> listEvents() {
        return eventService.listAll();
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable("id") long id) {
        if(!eventService.existsById(id)) {
            throw new IllegalArgumentException("Event with id: " + id + " does not exist");
        }
        return eventService.fetch(id);
    }

    @PostMapping("")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        if(event.getId() != null && eventService.existsById(event.getId())) {
            throw new IllegalArgumentException("Event with id: " + event.getId() + " already exists");
        } else {
            Account account = accountService.fetch(event.getAccount().getId());
            event.setAccount(account);
            Event saved = eventService.createEvent(event);
            return ResponseEntity.created(URI.create("/events/" + saved.getId())).body(saved);
        }
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable("id") Long id, @RequestBody Event event) {
        if(event.getId() != null && !eventService.existsById(event.getId())) {
            throw new IllegalArgumentException("Event with id: " + event.getId() + " does not exist");
        }
        else if(event.getId() == null) {
            throw new IllegalArgumentException("Event id must be given");
        }
        else {
            if(!event.getId().equals(id))
                throw new IllegalArgumentException("Event id must be preserved");
            return eventService.updateEvent(event);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable("id") long eventId) {
        if(!eventService.existsById(eventId))
            throw new IllegalArgumentException("Event with id " + eventId + " does not exist");
        eventService.deleteEvent(eventId);
    }
}
