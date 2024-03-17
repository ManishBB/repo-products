import { Quiz } from "../models/quiz.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createQuiz = async (req, res) => {
    const { quizName, quizType, timer, optionsType, questions } = req.body;

    const user = req.user?._id;
    // Create a new quiz object
    const quiz = await Quiz.create({
        ownersEmail: req.user?.email,
        quizName: quizName,
        quizType: quizType,
        timer: timer,
        optionsType: optionsType,
        questions: questions,
    });

    const createdQuiz = await Quiz.findById(quiz._id);

    if (!createQuiz)
        throw new ApiError(
            500,
            "Something went wrong while creating a new quiz"
        );

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdQuiz, "Quiz registered successfully")
        );
};

const updateQuiz = async (req, res) => {
    const { quizId, quizName, quizType, timer, optionsType, questions } =
        req.body;

    const quiz = await Quiz.findOneAndUpdate(
        { _id: req.body.quizId },
        {
            $set: {
                quizName: quizName,
                quizType: quizType,
                timer: timer,
                optionsType: optionsType,
                questions: questions,
            },
        }
    );

    const createdQuiz = await Quiz.findById(quiz._id);

    if (!createQuiz)
        throw new ApiError(500, "Something went wrong while updating quiz");

    return res
        .status(200)
        .json(new ApiResponse(200, createdQuiz, "Quiz updated successfully"));
};

const updateQuizImpressions = async (req, res) => {
    //updating quiz impressions every time user visits the quiz

    try {
        const data = await Quiz.findOneAndUpdate(
            { _id: req.body.quizId },
            {
                $inc: {
                    impressions: 1,
                },
            }
        );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    data,
                    "Quiz impression updated successfully"
                )
            );
    } catch (error) {
        console.log(error, error.message);
    }
};

// TODO: Add email owner error check
// TODO: Understand why arrayFilter is used here
const updatePollOptionImpression = async (req, res) => {
    const data = await Quiz.findOneAndUpdate(
        { "questions.options._id": req.body.optionId },
        {
            $inc: {
                "questions.$[].options.$[elem].impressions": 1,
            },
        },
        {
            arrayFilters: [{ "elem._id": req.body.optionId }], // Specify the option ID in the arrayFilters
            new: true, // Return the updated document
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                data,
                "Poll option impression updated successfully"
            )
        );
};

const updateQnaCorrectOptionImpression = async (req, res) => {
    console.log(req.body.questionId);
    const data = await Quiz.findOneAndUpdate(
        { "questions._id": req.body.questionId },
        {
            $inc: {
                "questions.$[elem].qnaCorrectAnswerImpressions": 1,
            },
        },
        {
            arrayFilters: [{ "elem._id": req.body.questionId }], // Specify the option ID in the arrayFilters
            new: true, // Return the updated document
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                data,
                "Poll option impression updated successfully"
            )
        );
};

const updateQnaWrongOptionImpression = async (req, res) => {
    console.log(req.body.questionId);
    const data = await Quiz.findOneAndUpdate(
        { "questions._id": req.body.questionId },
        {
            $inc: {
                "questions.$[elem].qnaWrongAnswerImpressions": 1,
            },
        },
        {
            arrayFilters: [{ "elem._id": req.body.questionId }], // Specify the option ID in the arrayFilters
            new: true, // Return the updated document
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                data,
                "Poll option impression updated successfully"
            )
        );
};

const getQuizById = async (req, res) => {
    const quizId = req.params.quizId;

    const quiz = await Quiz.findById(quizId);

    if (!quiz)
        throw new ApiError(500, "Something went wrong while getting quiz");

    return res
        .status(200)
        .json(new ApiResponse(200, quiz, "Quiz fetched successfully"));
};

const deleteQuiz = async (req, res) => {
    const quizId = req.params.quizId;

    const quiz = await Quiz.findById(quizId);

    if (quiz.ownersEmail !== req.user.email) {
        throw new ApiError(404, "Unauthorized access to the user");
    }

    await Quiz.findByIdAndDelete(quizId);

    return res
        .status(200)
        .json(new ApiResponse(200, "", "Quiz deleted successfully"));
};

const getAllQuizzes = async (req, res) => {
    const userEmail = req.user.email;

    if (!userEmail) throw new ApiError(400, "Unauthorized Access");

    const allQuizzes = await Quiz.aggregate([
        {
            $match: {
                ownersEmail: userEmail,
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                allQuizzes,
                "Trending quizzes fetched successfully"
            )
        );
};

// TODO: Only return quizzes having impressions more than 10
const getTrendingQuizzes = async (req, res) => {
    const userEmail = req.user.email;

    if (!userEmail) throw new ApiError(400, "Unauthorized Access");

    const trendingQuizzes = await Quiz.aggregate([
        {
            $match: {
                ownersEmail: userEmail,
            },
        },
        {
            $sort: {
                impressions: -1,
            },
        },
        {
            $project: {
                quizName: 1,
                impressions: 1,
                createdAt: 1,
            },
        },
    ]);

    const filteredTrendingQuizzes = trendingQuizzes.filter(
        (item) => item.impressions > 10
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                filteredTrendingQuizzes,
                "Trending quizzes fetched successfully"
            )
        );
};

const getDashboardStats = async (req, res) => {
    const userEmail = req.user.email;

    if (!userEmail) throw new ApiError(400, "Unauthorized Access");

    const totalQuizzesAndImpressions = await Quiz.aggregate([
        {
            $match: {
                ownersEmail: userEmail,
            },
        },
        {
            $group: {
                _id: null,
                totalQuizzes: {
                    $sum: 1,
                },
                totalImpressions: {
                    $sum: "$impressions",
                },
            },
        },
    ]);

    const totalQuestions = await Quiz.aggregate([
        {
            $match: {
                ownersEmail: userEmail,
            },
        },
        {
            $unwind: "$questions",
        },
        {
            $group: {
                _id: null,
                numberOfQuestions: {
                    $sum: 1,
                },
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { ...totalQuizzesAndImpressions[0], ...totalQuestions[0] },
                "Dashboard quiz status fetched successfully"
            )
        );
};
// TODO: Edit/Update the quiz
// TODO: Get all quizzes according to recently created
// TODO:
// TODO:

export {
    createQuiz,
    getQuizById,
    deleteQuiz,
    getAllQuizzes,
    getTrendingQuizzes,
    getDashboardStats,
    updateQuiz,
    updateQuizImpressions,
    updatePollOptionImpression,
    updateQnaCorrectOptionImpression,
    updateQnaWrongOptionImpression,
};
