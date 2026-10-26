// require("dotenv").config();
const mongoose = require("mongoose");

const conn = async () => {
    try {
        mongoose.set("strictQuery", false);

        await mongoose.connect(
            process.env.MONGODB_URI ||
            "mongodb+srv://server:3HF462AvuP8CS071@masfob-production-d0d6a846.mongo.ondigitalocean.com/oyil_server?tls=true&authSource=admin&replicaSet=masfob-production"
        );

        console.log("🔥 Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        throw error;
    }
};

module.exports = { conn };