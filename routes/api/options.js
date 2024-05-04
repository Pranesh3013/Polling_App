import express from 'express';
const router = express.Router();

import {deleteOptions, addVote} from '../../controllers/options.controller.js'

router.delete('/:id/delete', deleteOptions);
router.get('id/addVote', addVote);

module.exports = router;