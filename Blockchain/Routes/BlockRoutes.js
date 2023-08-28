
const express = require('express')
const { getBlocks, getDiffuculty, getLastBlock, newBlock } = require('../Controllers/BlockController.js')


const router = express.Router();


router.get('/blocks',getBlocks);
router.post('/newBlock',newBlock);
router.get('/getLastBlock', getLastBlock)
router.get('/getDifficulty', getDiffuculty)

module.exports = router;
