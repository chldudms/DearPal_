const letterService = require('../service/letterService');

exports.addLetter = async (req, res) => {
    try {
        const result = await letterService.addLetter(req);
        res.json({ message: '편지 업로드 성공', result });
    } catch (err) {
        console.error('편지 업로드 실패:', err);
        res.status(500).json({ message: '서버 오류', error: err });
    }
};

exports.getOpenLetters = async (req, res) => {
    try {
        const letters = await letterService.getOpenLetters();
        res.json({ message: '공개 편지 조회 성공', letters });
    } catch (err) {
        res.status(500).json({ message: '서버 오류', error: err });
    }
};

exports.getSentLetters = async (req, res) => {
    try {
        const letters = await letterService.getSentLetters(req.params.userId);
        res.json({ message: '보낸 편지 조회 성공', letters });
    } catch (err) {
        res.status(500).json({ message: '서버 오류', error: err });
    }
};

exports.getReceivedLetters = async (req, res) => {
    try {
        const letters = await letterService.getReceivedLetters(req.params.userId);
        res.json({ message: '받은 편지 조회 성공', letters });
    } catch (err) {
        res.status(500).json({ message: '서버 오류', error: err });
    }
};

exports.readLetter = async (req, res) => {
    try {
        const { letterId, userName } = req.params;
        const letter = await letterService.readLetter(letterId, userName);
        if (!letter) return res.status(404).json({ message: '편지를 찾을 수 없습니다' });
        res.json({ message: '편지 로드 성공', letter });
    } catch (err) {
        res.status(500).json({ message: '서버 오류', error: err });
    }
};
