//API routinh

import express from 'express';
const router = express.Router();
import questionsRoute from './questions.js'
import optionsRoute from './options.js';

//question route
router.use('./questions', questionsRoute);

//option route
router.use('./options', optionsRoute);

export default router;

