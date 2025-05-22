const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//편지 업로드 api (공동 편지함, 내 편지함에서 조회)
router.post('/addLetter', async (req, res) => {
    const { userId, title, letterContent, selectedColor } = req.body;
    const today = new Date();

    if (!userId) {
        return res.status(400).json({ message: 'userId가 없습니다!' });
    }

    db.query(
        'INSERT INTO letter (sender_id, receiver_id, title, content, color, is_shared, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, null, title, letterContent, selectedColor, 1, today],
        (err, results) => {
            if (err) {
                console.error("쿼리 실패:", err);
                return res.status(500).json({ message: '서버 오류', error: err });
            }
            res.json({ message: '편지 업로드 성공' });
        }
    );
});



// 모든 편지 조회 api
router.get('/openLetters', (req, res) => {
    const sql = `
        SELECT L.id, L.title, L.color, L.created_at,
            U.username AS sender_name
        FROM Letter L
        JOIN User U ON L.sender_id = U.id
        WHERE L.is_shared = TRUE
        ORDER BY L.created_at DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('DB 에러:', err);
            return res.status(500).json({ message: '서버 오류' });
        }

        return res.json({
            message: '공개 편지 로드 성공',
            letters: results
        });
    });
});


module.exports = router;