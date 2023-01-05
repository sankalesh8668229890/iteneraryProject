const userModel = require("../models/userModel")
const itineraryModel = require("../models/itineraryModel")

const createItinerary = async (req, res) => {
    try {
        let { from, to, date, activities, accommodation, totalCost } = req.body
        let result = await itineraryModel.create(req.body)
        res.status(200).send({ status: true, data: result })
    }
    catch (error) {
        res.status(500).send({ status: false })
    }
}

const updateItinerary = async (req, res) => {
    try {
        let itineraryId = req.params.id
        let data = req.body;

        let { from, to, date, activities, accommodation, totalCost } = data

        const updatedData = {}

        const userById = await userModel.findById(itineraryId);
        if (!userById) {
            return res.status(404).send({ status: false, message: 'user not found.' });
        }
        if (Object.keys(data) == 0) {
            return res.status(400).send({status: false,message: "please provide data to update"})
        }


        let updateUser = await itineraryModel.findByIdAndUpdate({ _id: itineraryId }, { ...data }, { new: true })
        res.status(200).send({ status: true, data: updateUser })
    } catch (error) {

    }
}

const getItinerary = async (req, res) => {
    try {
        let userId = req.params.id

        // checking weather id is valid or not
        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid userId." })
        }
        let result = await itineraryModel.findById(_id)
        if (!result) {
            return res.status(404).send({ status: false, message: "No user Found" });
        }
        res.status(200).send({ status: true, data: result })
    }
    catch (error) {
        res.status(500).send({ status: false })
    }
}

const addActivity = async (req, res) => {
    try {
        let data = req.body
        let itineraryId = req.params.id
        let foundData = await itineraryModel.findByIdAndUpdate({ itineraryId }, { ...data }, { new: true })
        res.status(200).send({ status: true, data: foundData })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getSummary = async (req, res) => {
    try {
        let userId = req.params.id
        let data = await itineraryModel.find({ userId })
        res.status(200).send({ status: true, data: data })
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

module.exports = { createItinerary, getItinerary, getSummary, addActivity, updateItinerary }