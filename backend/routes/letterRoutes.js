const express = require('express');
const router = express.Router();
const db = require('../db/db.js'); const multer = require('multer');
const path = require('path');


// multer 세팅
const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, 'uploads/');  // 업로드 폴더 경로
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //파일 이름
    }
});

const upload = multer({ storage: storage });

router.use('/uploads', express.static('uploads'));


//편지 업로드 api (공동 편지함, 내 편지함에서 조회)
router.post('/addLetter', upload.single('image'), async (req, res) => {
    const { userId, title, letterContent, selectedColor, sticker } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const today = new Date();

    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    if (!userId) {
        return res.status(400).json({ message: 'userId가 없습니다!' });
    }

    db.query(
        'INSERT INTO letter (sender_id, receiver_id, title, content, color, is_shared, created_at, stickers, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, null, title, letterContent, selectedColor, 1, today, sticker, imagePath],
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
        SELECT L.id, L.title, L.content, L.color, L.created_at,
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

        return res.json({ message: '공개 편지 로드 성공', letters: results });
    });
});

// 편지 내용 조회 api
router.get('/readLetter/:userName/:letterId', (req, res) => {
    const { userName, letterId } = req.params;

    const sql = `
        SELECT L.id, L.title, L.content, L.color, L.created_at,
               L.stickers, L.image_url,
               U.username AS sender_name
        FROM Letter L
        JOIN User U ON L.sender_id = U.id
        WHERE L.id = ? AND U.username = ?
    `;

    db.query(sql, [letterId, userName], (err, results) => {
        if (err) {
            console.error("DB 에러:", err);
            return res.status(500).json({ message: "서버 오류" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "편지를 찾을 수 없습니다" });
        }

        const letter = results[0]; //편지 내용

        return res.json({ message: '편지 로드 성공', letter });
    });
});



module.exports = router;