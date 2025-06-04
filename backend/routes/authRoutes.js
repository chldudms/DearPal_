const express = require('express');
const router = express.Router();
const db = require('../db/db.js')
const bcrypt = require('bcrypt'); //비밀번호 암호화해주는 라이브러리
const jwt = require('jsonwebtoken');  // JWT 라이브러리


//가입 api
router.post('/join', async (req, res) => {
    const { userName, userId, userPw } = req.body;
    const seed = Math.random().toString(36).substring(2, 10); //프로필 시드

    console.log("요청 바디:", req.body);

    //중복된 userid 체크
    db.query('SELECT * FROM user WHERE id = ?', [userId], async (err, results) => {
        if (results.length > 0) {
            return res.json({ message: '이미 존재하는 아이디입니다.' });
        } else if (err) {
            return res.status(500).json({ message: '서버 오류' });
        }

        const hashedPw = await bcrypt.hash(userPw, 10);  //비밀번호 해싱 (비밀번호,salt)
        console.log(hashedPw)

        //사용자 정보 DB에 저장
        db.query('INSERT INTO user (id, username, password, profile_image) VALUES (?, ?, ?, ?)', [userId, userName, hashedPw, seed], (err, result) => {
            if (err) {
                console.error(err);
            }

            // JWT토큰 생성
            const token = jwt.sign(
                { userId: userId, userName: userName, profileSeed: seed },
                'your_secret_key',
                { expiresIn: '1h' }
            );

            res.json({ message: '회원가입 성공', token});
        });
    });
});



//로그인
router.post('/login', async (req, res) => {
    const { userId, userPw } = req.body;
    
    console.log("요청 바디:", req.body);


    // DB에서 사용자 정보 조회
    db.query('SELECT * FROM user WHERE id = ?', [userId], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: '서버 오류' });
        }

        if (results.length > 0) {
            const user = results[0];

            //비밀번호 비교
            const isMatch = await bcrypt.compare(userPw, user.password);
            if (isMatch) {
                //JWT토큰 생성(유저정보와 유효기간 포함)
                const token = jwt.sign({ userId: user.id, userName: user.username, profileSeed: user.profile_image }, 'your_secret_key', { expiresIn: '1h' });

                //토큰 클라이언트에 응답으로 전달
                return res.json({ message: '로그인 성공', token });
            } else {
                return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
            }
        } else {
            return res.status(400).json({ message: '아이디가 존재하지 않습니다.' });
        }
    });
});

module.exports = router;