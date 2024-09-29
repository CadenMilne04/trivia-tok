const { GoogleGenerativeAI } =  require("@google/generative-ai");
 
const Question = require("../models/question.model")

const QuestionService = {
    async getQuestionsMatchingSearchTerm(searchTerm) {
        const questions = await Question.find({ ["term"]: { $regex: searchTerm, $options: 'i' } }).limit(25);
        return questions;
    },

    async getRandomQuestions() {
        const questions = await Question.aggregate([{ $sample: { size: 25 }}]);
        return questions;
    },

    async generateQuestionsWithGemini(searchTerm, numQuestions) {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You will respond only in json. Do not provide explanations. Do not add any input.
                        The json that I want you to create will be in this exact format:
                            [{"question": <The question that you come up with>,
                             "answer": <The answer to the question>,
                             "choice1": <An answer to the question which is either correct or incorrect>,
                             "choice2": <An answer to the question which is either correct or incorrect>,
                             "choice3": <An answer to the question which is either correct or incorrect>,
                             "choice4": <An answer to the question which is either correct or incorrect>,
                             "creator": "Google Gemini",
                            },...]
                        You should be creating json like this that will be used to make an array ${numQuestions} trivia questions about the topic ${searchTerm}`;

        const result = await model.generateContent(prompt);
        return result.response.candidates[0].content.parts[0].text;
    },

    async addQuestionToCollection(searchTerm, pageNum, questionsData){
        let documents = []
        questionsData.forEach((questionData, i) => {
            const {question, answer, choice1, choice2, choice3, choice4, creator} = questionData;
            document = {
                "term": searchTerm,
                "page": pageNum,
                "question": question,
                "answer": answer,
                "choice1": choice1,
                "choice2": choice2,
                "choice3": choice3,
                "choice4": choice4,
                "creator": creator,
            }
            documents.push(document)
        });
        await Question.insertMany(documents);
    },

    async getQuestionByID(questionID){
        return await Question.findById(questionID);
    }
};

module.exports = QuestionService;

