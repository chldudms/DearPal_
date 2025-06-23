const express = require('express');
const router = express.Router();
const letterController = require('../controllers/LetterController');
const upload = require('../middle/multer');

router.post('/addLetter', upload.single('image'), letterController.addLetter);
router.get('/openLetters', letterController.getOpenLetters);
router.get('/sentLetters/:userId', letterController.getSentLetters);
router.get('/receivedLetters/:userId', letterController.getReceivedLetters);
router.get('/readLetter/:userName/:letterId', letterController.readLetter);

module.exports = router;
