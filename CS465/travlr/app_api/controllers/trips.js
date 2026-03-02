const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = Trip;

const tripList = async(req, res) => {
    // Get all trips from the database
    const q = await Model.find({}).exec();

    // Database returned no data
    if (!q) {
        return res.status(404).json(err);
    }

    // return the list of trips
    return res.status(200).json(q);
};

const tripsFindByCode = async(req, res) => {
    // Get all trips from the database
    const q = await Model
        .find({'code' : req.params.tripCode})
        .exec();

    // Database returned no data
    if (!q) {
        return res.status(404).json(err);
    }

    // return the list of trips
    return res.status(200).json(q);
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async(req, res) => {
    const newTrip = new Model({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if (!q) {
        // Database returned no data
        return res
            .status(400)
            .json(err);
    } else {
        // Return resulting new trip
        return res
            .status(201)
            .json(q);
    }

    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};

// PUT: /trips/:tripCode - Updates a Trip
const tripsUpdateTrip = async(req, res) => {

    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

        if(!q)
        { // Database returned no data
            return res
                .status(400)
                .json(err);
        } else { // Return resulting updated trip
            return res
                .status(201)
                .json(q);
        }

        // Uncomment the following line to show results of operation
        // on the console
        // console.log(q);
};

// DELETE: /trips/:tripCode - Deletes a Trip
const tripsDeleteTrip = async(req, res) => {
    const q = await Model
        .findOneAndDelete({ 'code' : req.params.tripCode })
        .exec();

        if(!q)
        { // Database returned no data
            return res
                .status(404)
                .json({ message: 'Trip not found' });
        } else { // Return confirmation
            return res
                .status(200)
                .json(q);
        }
};

module.exports = {
    tripList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
}; 