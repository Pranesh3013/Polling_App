import express from 'express';
const router = express.Router();

import {create, deleteQues, getQuestion} from '../../controllers/questions.controller.js';
import { createOpt } from '../../controllers/options.controller.js';

router.post('/create', create);
router.delete('/:id/delete', deleteQues);
router.get('/:id', getQuestion);

router.post('/:id/options/create', createOpt);

module.exports = router;
