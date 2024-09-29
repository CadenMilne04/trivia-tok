const User = require("../models/user.model");

const UsersServices = {
    async addPointsToUser(email, name){
        await User.findOneAndUpdate(
            {email: email, name: name},
            { $inc: {points: 1}},
            { new: true, upsert: true }, 
        )
    },
    async removePointsFromUser(email, name){
        await User.findOneAndUpdate(
            {email: email, name: name},
            { $inc: {points: -1}},
            { new: true, upsert: true }, 
        )
    },
    async getTopTenUsersByPoints(){
        return await User.find().sort({points: -1}).limit(10);
    },
    async getUserByEmail(email){
        return await User.findOne({email: email});
    },
};

module.exports = UsersServices;

