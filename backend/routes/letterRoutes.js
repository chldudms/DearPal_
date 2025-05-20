const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//편지 업로드 api (공동 편지함, 내 편지함에서 조회)
router.post('/addLetter', async (req, res) => {
    const { title, letterContent, selectedColor, userId } = req.body;
    var today = new Date();

    db.query('INSERT INTO letter (letter_id, letter_title, letter_content, letter_color, writer_id, receiver_id, is_shared, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [8, title, letterContent, selectedColor, userId, null, 1, today],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: '서버 오류' });
            }
            res.json({ message: '편지 업로드 성공' })
        })
})


// app.get('/loadLetters', (req,res)=>{
//     db.query()
// })

module.exports = router;