import mongoose from 'mongoose';

//option schema 

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    linkToVote: {
        type: String
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
}, { timestamps: true });

export const Option = mongoose.model('Option', optionSchema);
