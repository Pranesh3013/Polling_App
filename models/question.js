import mongoose from "mongoose";
import { type } from "os";

// Question schema --> title & option fro a ques

const questionSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        unique:  true
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }]
},
{ timestamps: true });

export const Question = mongoose.model('Question', questionSchema);