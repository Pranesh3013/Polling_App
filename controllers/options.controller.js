import {Question} from '../models/question.js';
import {Option} from '../models/option.js';
import exp from 'constants';

const baseUrl = process.env.BASE_URL || 'https://example.com/';

//create options
export const createOpt = async(req,res) => {

    try{
        const questionId = req.params.id
        const {text} = req.body;

        if(!questionId || !text){
            return res.status(404).json({
                message:'Empty question id or option',
                status: 'failure',
                data:[]
            });
        }

        const question = await Question.findById(questionId)
        if(!question){
            return res.status(404).json({
                message:'Invalid question id',
                status: 'failure',
                data:[]
            });
        }

        const option = await Option.create({'text': text, 'questionId': question._id});
        option.linkToVote = `${baseUrl}/api/options/${option.id}/addVote`;
        await option.save();
        if(!option){
            throw new Error('unavbble to create options')
        }

        question.options.push(option._id);
        await question.save();

        return res.status(200).json({
            message: 'Options created',
            status: 'successful',
            data: [option]  
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message:'Internal Server Error',
            status: 'failure',
            data: []
        })
    }   
}

//delete options
export const deleteOptions = async(req, res) => {
    try{

        const optionId = req.params.id;
        if(!optionId){
            return res.status(404).json({
                message: 'option id Needed',
                status: 'failure',
                data: []
            });
        }

        const option = await Option.findById(optionId);
        if(!option){
            return res.status(404).json({
                message: 'Invalid option id',
                status: 'failure',
                data: []
            }); 
        }

        await Question.findByIdAndUpdate(option.questionId, {$pull: {'options': option.id}});
        await Options.findByIdAndDelete(optionId);

        return res.status(200).json({
            message: 'Option deleted',
            status: 'successful',
            data: []
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 'failure',
            data: []
        })
    }
}

//add votee
export const addVote = async(req,res) => {
    try{
        const optionId = req.params.id;
        if(!optionId){
            return res.status(404).json({
                message: 'No Option Id present',
                status: 'failure',
                data: []
            });
        }
        
        const option = await Option.findById(optionId);

        if (!option) {
            return res.status(404).json({
                message: 'Invalid Option id',
                status: 'failure',
                data: []
            });
        };
        
        option.votes++;
        await option.save();

        return res.status(200).json({
            message: 'voted',
            status: 'successful',
            data: [option]
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 'failure',
            data: []
        })
    }
}
    
