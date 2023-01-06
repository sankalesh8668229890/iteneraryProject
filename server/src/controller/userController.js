const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("../validator/validations")

const registerUser = async (req, res) => {
    try {
        let data = req.body
        let { name, email,phone, password } = data


        name = name.split(" ").filter(a => a).join(" ")

        // checking for email

        const duplicateEmail = await userModel.findOne({ email: email });
        if (duplicateEmail) { return res.status(400).send({ status: false, message: "Email is already exist" }) };

        // checking for phone

        const duplicatePhone = await userModel.findOne({ phone: data.phone });
        if (duplicatePhone) { return res.status(400).send({ status: false, message: "phone is already exist" }) };


        // checking for password
        if (!password) return res.status(400).send({ status: false, message: "please enter password" })

        if (!validator.validPassword(password)) {
            return res.status(400).send({ status: false, message: 'Password should be of minimum 8 characters & maximum 15 characters' })
        }

        const bcryptPassword = await bcrypt.hash(password, 10);
        data.password = bcryptPassword;

        let createdData = await userModel.create(data)
        res.status(201).send({ status: true, message: "User Is Successfully Created", data: createdData })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const login = async (req, res) => {
    try {
        let data = req.body
        const { email, password } = data

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ status: false, message: "email doesn't exist please Sign up first" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword)
            return res.status(401).send({ status: false, message: "Invalid login credentials or Invalid password" });

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                iat: Math.floor(Date.now() / 1000),
            },
            process.env.SECRET_KEY);
            console.log(token);

            res.cookie("itinerary", token,{
                expiresIn: new Date(Date.now() + 2592000000),
                httpOnly: true
            });
            // { expiresIn: Math.floor(Date.now() / 1000) + 2592000000});

        res.status(200).send({ status: true, message: "User Logged in Successfully", data: { userId: user._id, token: token } });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { registerUser, login }