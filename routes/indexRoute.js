// main routing file

import express from 'express';
const router = express.Router();

//api rotes
router.use('/api', router);

export default router;