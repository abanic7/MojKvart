package progi.project.mojkvart.event;
import progi.project.mojkvart.account.Account;

import javax.persistence.*;
import java.sql.Time;
import java.time.Duration;
import java.time.LocalDate;

@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long id;

    @Column(name = "event_name")
    private String name;

    @Column(name = "event_description", length = 5000)
    private String description;

    @Column(name = "event_duration")
    private Long duration;

    @Column(name = "event_date")
    private LocalDate date;

    @Column(name = "event_time")
    private Time time;

    @Column(name = "event_location")
    private String location;

    @Column(name = "event_status", nullable = true)
    private String status;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    public Event(){
    }

    public Event(Long id, String name, String description, Long duration, LocalDate date, Time time, String location, String status, Account account) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.date = date;
        this.time = time;
        this.location = location;
        this.status = status;
        this.account = account;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public LocalDate getDate() { return date; }

    public void setDate(LocalDate date) { this.date = date; }

    public Time getTime() { return time; }

    public void setTime(Time time) { this.time = time; }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    @Override
    public String toString() {
        return "Event{account{" +
                getAccount().toString() + "}" +
                "date: " +getDate() +
                "time: " + getTime() +
                "description: " +getDescription()+
                "duration: " +getDuration()+
                "location: " +getLocation()+
                "name: " +getName()+
                "status" + getStatus();
    }

}
