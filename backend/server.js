const express = require('express');
const cors = require('cors'); //모든 출처 허용하는 미들웨어-프론트와 백 분리된 구조에서 API 호출
const app = express();
const router = express.Router();
const authRouter = require('./routes/authRoutes');
const letterRouter = require('./routes/letterRoutes');

app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true
}));

app.use(express.json());

app.use(authRouter);
app.use(letterRouter)


app.listen(5000, () => {
    console.log('서버: http://localhost:5000');
});
