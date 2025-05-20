const mysql = require('mysql2');
const dotenv = require('dotenv'); //.env파일로 민감한 정보 이동

dotenv.config();	//.env 파일을 읽어서 process.env에 등록

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

module.exports = db;