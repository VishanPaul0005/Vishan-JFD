package com.themepark.ticketbooking.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "bookings")
public class Booking {
    @Id
    private String id;
    private String name;
    private String email;
    private String visitDate;
    private int numTickets;
    private double totalPrice;

    // 👇 ADD THESE
    private List<Integer> memberAges;  // store ages of all members
    private boolean collegeOffer;      // store whether college discount was applied

    public Booking() {}

    // Getters and Setters for all fields
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getVisitDate() {
        return visitDate;
    }
    public void setVisitDate(String visitDate) {
        this.visitDate = visitDate;
    }

    public int getNumTickets() {
        return numTickets;
    }
    public void setNumTickets(int numTickets) {
        this.numTickets = numTickets;
    }

    public double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    // 👇 New fields
    public List<Integer> getMemberAges() {
        return memberAges;
    }
    public void setMemberAges(List<Integer> memberAges) {
        this.memberAges = memberAges;
    }

    public boolean isCollegeOffer() {
        return collegeOffer;
    }
    public void setCollegeOffer(boolean collegeOffer) {
        this.collegeOffer = collegeOffer;
    }
}
