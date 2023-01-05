const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const ItinerarySchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "user"
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        default: 1
    },
    activities: [{
        name: String,
        location: String,
        duration: Number
    }],
    accommodation: [{
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        hotelName: String,
        room:Number,
        address: String
    }],
    totalCost: {
        type: Number,
        trim:true
    },
    public: {
        type: Boolean,
        default: false
    },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Completed'] },
})

module.exports = mongoose.model("itinerary", ItinerarySchema)
