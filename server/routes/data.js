const router = require("express").Router();
const { Data, validate } = require("../models/data");
require('dotenv').config();
const mongoose = require("mongoose");

// POST route to create a new user
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const existingData = await Data.findOne({ email: req.body.email });
       
        if (existingData) return res.status(409).send({ message: "User with given email already exists!" });

        await new Data(req.body).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// GET route to fetch all users
router.get("/", async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        // Validate request body
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Extract id from parameters
        const { id } = req.params;

        // Ensure id is a valid number (for numeric IDs)
        if (isNaN(Number(id))) {
            return res.status(400).send({ message: "Invalid ID format" });
        }

        // Convert id to number
        const numericId = Number(id);

        // Update user data
        const updatedData = await Data.findOneAndUpdate(
            { id: numericId }, // Use custom numeric ID in query
            req.body, // Updated data
            { new: true, runValidators: true } // Options: return updated document and run validators
        );



        // Check if the user was found and updated
        if (!updatedData) return res.status(404).send({ message: "User not found" });

        res.status(200).send({ message: "User updated successfully", data: updatedData });
    } catch (error) {
        console.error('Error updating user:', error); // Improved error logging
        res.status(500).send({ message: "Internal Server Error" });
    }
});


// DELETE route to delete a user
router.delete("/:id", async (req, res) => {
    try {
        // Extract id from parameters
        const { id } = req.params;

        // Ensure id is a valid number (for numeric IDs)
        if (isNaN(Number(id))) {
            return res.status(400).send({ message: "Invalid ID format" });
        }

        // Convert id to number
        const numericId = Number(id);

        // Delete user data
        const deletedData = await Data.findOneAndDelete(
            { id: numericId } // Use custom numeric ID in query
        );

        // Check if the user was found and deleted
        if (!deletedData) return res.status(404).send({ message: "User not found" });

        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error); // Improved error logging
        res.status(500).send({ message: "Internal Server Error" });
    }
});



module.exports = router;
