const express = require('express');
const cors = require('cors'); //모든 출처 허용하는 미들웨어-프론트와 백 분리된 구조에서 API 호출
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); //비밀번호 암호화해주는 라이브러리
const app = express();
const dotenv = require('dotenv'); //.env파일로 민감한 정보 이동


app.use(cors({
    origin: 'http://localhost:3000', // 
    credentials: true
}));
dotenv.config(); 

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


db.connect(err => {
    if (err) throw err;
    console.log("MySQL 연결 완료");
});

//가입 api
app.post('/join', async (req, res) => {
    const { userName, userId, userPw} = req.body;
    const seed = Math.random().toString(36).substring(2, 10); //프로필 시드

    console.log("요청 바디:", req.body);

    //중복된 userid 체크
    db.query('SELECT * FROM user WHERE userid = ?', [userId], async (err, results) => {
        if (results.length > 0) {
            return res.json({ message: '이미 존재하는 아이디입니다.' });
        }

        const hashedPw = await bcrypt.hash(userPw, 10);  //비밀번호 해싱 (비밀번호,salt)
        console.log(hashedPw)

       //사용자 정보 DB에 저장
        db.query('INSERT INTO user (userid, username, password, profile_seed) VALUES (?, ?, ?, ?)', [userId, userName, hashedPw, seed], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.' });
            }
            res.json({ message: '회원가입 성공' });
        });
    });
});

app.post('/login', async(req,res)=>{
    const { userId, userPw } = req.body;

    // 1. DB에서 userId로 사용자 정보 조회
    db.query('SELECT * FROM user WHERE userid = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: '서버 오류' });
        }

        if (results.length > 0) {
            const user = results[0]; // 첫 번째 결과가 해당 사용자의 정보

            // 2. 입력한 비밀번호와 DB에 저장된 해시된 비밀번호 비교
            bcrypt.compare(userPw, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: '비밀번호 확인 오류' });
                }

                if (isMatch) {
                    return res.json({ message: '로그인 성공' });
                } else {
                    return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
                }
            });
        } else {
            return res.status(400).json({ message: '아이디가 존재하지 않습니다.' });
        }
    });
});


app.listen(5000, () => {
    console.log('http://localhost:5000/join');
});
