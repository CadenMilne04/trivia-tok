const QuestionsService = require('./services');

const QuestionsControllers = {
    async getQuestions(req, res){
        const { searchTerm, pageNum } = req.body;

        try {
            if(searchTerm == "random"){
                let questions = await QuestionsService.getRandomQuestions();
                res.status(200).send({
                    message: "found 25 random questions!",
                    questions: questions
                });
                return;
            }

            let questions = await QuestionsService.getQuestionsMatchingSearchTerm(searchTerm);

            if (questions.length == 25){
                res.status(200).send({
                    message: "found 25 questions at that page!",
                    questions: questions
                });
            }
            else {
                let numQuestionsToGenerate = 25 - questions.length;
                const generatedQuestions = await QuestionsService.generateQuestionsWithGemini(searchTerm, numQuestionsToGenerate);
                const generatedQuestionsJson = JSON.parse(generatedQuestions);
                await QuestionsService.addQuestionToCollection(searchTerm, pageNum, generatedQuestionsJson);

                questions = await QuestionsService.getQuestionsMatchingSearchTerm(searchTerm);
                res.status(200).send({
                    message: "Generated some questions to fill the page!",
                    questions: questions
                });
            }

        } catch (error) {
            res.status(500).send(error.message);
        }

    }
};

module.exports = QuestionsControllers;

