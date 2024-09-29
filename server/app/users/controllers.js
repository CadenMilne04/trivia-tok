const UsersServices = require('./services');
const QuestionsService = require('../questions/services');

const UsersControllers = {
    async checkQuestionAnswer(req,res){
        const { email, name, questionID, answer } = req.body;
        //1. Look up the question (to find correct answer)
        //2. Add points based on answer, also let the caller know whether or not they fucked it.

        try {
            let question = await QuestionsService.getQuestionByID(questionID);
            if(question.answer == answer){
                if(name != "non-authenticated"){
                    UsersServices.addPointsToUser(email, name);
                }
                res.status(200).send({
                    message: "You got the right answer!",
                    correct: true
                });
            }
            else {
                //Remove point from the user with the email provided.
                if(name != "non-authenticated"){
                    UsersServices.removePointsFromUser(email, name);
                }
                res.status(200).send({
                    message: "You got the wrong answer...",
                    correct: false
                });
            }

        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getTopTenUsersByPoints(req,res){
        try {

            let topten = await UsersServices.getTopTenUsersByPoints()
            
            res.status(200).send({
                message: "found them!",
                topten: topten,
            });
        } catch (error) {
            res.status(500).send(error.message);
        }

    },

    async getPointsByEmail(req,res){
        try {
            const {email} = req.body;

            let user = await UsersServices.getUserByEmail(email)
            points = user.points;
            
            res.status(200).send({
                message: "found them!",
                points: points,
            });
        } catch (error) {
            res.status(500).send(error.message);
        }

    }
};

module.exports = UsersControllers;
