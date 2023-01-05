const { default: mongoose } = require("mongoose");
//@ts-check
const isValid = function (value) {
    if (typeof (value) === "undefined" || typeof (value) === null) { return false }
    if (typeof (value) === "string" && value.trim().length == 0) { return false }
    return true
}

const isEmailValid = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const isPhoneValid = function (phone) {
    return /^[6-9]\d{9}$/.test(phone)
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const validPassword = function (password) {
    if (password.length < 8 || password.length > 15) return false
    return true
}

module.exports = {
    isValid,
    isEmailValid,
    isPhoneValid,
    isValidObjectId,
    validPassword
}