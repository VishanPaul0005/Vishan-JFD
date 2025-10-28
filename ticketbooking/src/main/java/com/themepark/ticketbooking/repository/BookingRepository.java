package com.themepark.ticketbooking.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.themepark.ticketbooking.model.Booking;

public interface BookingRepository extends MongoRepository<Booking, String> {
}

