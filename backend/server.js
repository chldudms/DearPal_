const express = require('express');
const cors = require('cors'); //모든 출처 허용하는 미들웨어-프론트와 백 분리된 구조에서 API 호출
const app = express();
const router = express.Router();
const auth = require('./routes/authRoutes');
const letter = require('./routes/letterRoutes');

app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true
}));

app.use(express.json());

app.use(auth);
app.use(letter)


app.listen(5000, () => {
    console.log('http://localhost:5000/join');
});
