const express = require('express');
const router = express.Router();

const Booking = require('../models/bookingModel');

// get a list of bookings from db
router.get('/bookings', async (req, res, next) => {
    console.log(`Received a GET request on ${req.path} from ${req.hostname}`);
    let rooms = await Booking.find({hotel: req.body.hotel})
    res.send(rooms);
    console.log(`Response sent for GET ${req.path} to ${req.hostname}`);
});

// add a new booking to db
router.post('/bookings', (req, res, next) => {
    Booking.create(req.body)
    .then( booking => {
        res.send(booking);
    }).catch(next);
});

//update a booking in db
router.put('/bookings/:id', (req, res, next) => {
    Booking.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
        Booking.findOne({_id: req.params.id})
        .then( booking => {
            res.send(booking);
        });
    });
});

//delete a booking form db
router.delete('/bookings/:id', (req, res, next) => {
    Booking.findByIdAndRemove({_id: req.params.id})
    .then( booking => {
        res.send(booking);
    });
});

module.exports = router;