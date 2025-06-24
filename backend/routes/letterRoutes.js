const express = require('express');
const router = express.Router();
const upload = require('../middle/multer.js')
const letterController = require('../controllers/LetterController');

router.use('/uploads', express.static('uploads'));


//편지 업로드 api (공동 편지함, 내 편지함에서 조회) 
router.post('/addLetter', upload.single('image'), letterController.addLetter);
router.get('/openLetters', letterController.getOpenLetters);
router.get('/sentLetters/:userId', letterController.getSentLetters);
router.get('/receivedLetters/:userId', letterController.getReceivedLetters);
router.get('/readLetter/:userName/:letterId', letterController.readLetter);


module.exports = router;