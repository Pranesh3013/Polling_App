import {Question} from '../models/question.js'
import { Option } from '../models/option.js';


//create a question 

export const create = async(req, res) => {
    try{
        const {title} = req.body;
        const existingQuestion = await Question.findOne({'title': title});

        if(existingQuestion){
            return res.status(401).json({
                message:'Question already exists',
                status:'failure',
                data: [{id: existingQuestion._id}]
            });
        }

        const question = await Question.create({'title': title});
        return res.status(200).json({
            message: 'Question created',
            status: 'successful',
            data: [question]
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'INternal server error',
            status: 'failure',
            data: []
        });
    }
}

//deleting a question
export const deleteQues = async(req, res) => {
    try{

        const questionId = req.params.id;

        if(!questionId){
            return res.status(404).json({
                message: 'Empty Question id',
                status: 'failure',
                data: []
            });
        };

        const question = await Question.findById(questionId);

        if(!question){
            return res.status(404).json({
                message:'Invalid Question id',
                status: 'failue',
                data:[]
            });
        };

        await Option.deleteMany({'_id': {$in: question.options} });
        await Question.findByIdAndDelete(questionId);

        return res.status(200).json({
            message: 'Question has been deleted',
            status: 'Success',
            data:[]
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error',
            status: 'failure',
            data: []
        });
    }
}

//getting a question
export const getQuestion = async(req, res) => {

    try{

        const questionId = req.params.id;
        if(!questionId){
            return res.status(404).json({
                message:'need question ID',
                status:'failure',
                data:[]
            });
        }

        const question = await Question.findById(questionId);

        if(!question){
            return res.status(404).json({
                message:'No question found for this particular question ID',
                status:'failure',
                data:[]
            });
        }

        await question.populate({path:'options', select: '-questionId'});

        return res.status(200).json({
            message:'Question found',
                status:'success',
                data:[question]
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Internal Server Error',
                status:'failure',
                data:[]
        });
    }
}