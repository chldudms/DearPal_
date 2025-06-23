const db = require('../db/db');

exports.addLetter = async (req) => {
    const { userId, receiver, title, letterContent, selectedColor, sticker, musicTitle, letter_type } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const receiverId = receiver === 'null' ? null : receiver;
    const isShared = receiverId === null ? 1 : 0;
    const createdAt = new Date();

    if (!userId) throw new Error('userId 없음');

    const sql = `
        INSERT INTO letter
        (sender_id, receiver_id, title, content, color, is_shared, created_at, stickers, image_url, music, letter_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
        userId, receiverId, title, letterContent, selectedColor,
        isShared, createdAt, sticker, imagePath, musicTitle, letter_type
    ]);
};

exports.getOpenLetters = async () => {
    const sql = `
        SELECT L.id, L.title, L.content, L.color, L.stickers, L.created_at, L.sender_id,
               U.username AS sender_name
        FROM Letter L
        JOIN User U ON L.sender_id = U.id
        WHERE L.is_shared = TRUE
        ORDER BY L.created_at DESC
    `;
    const [results] = await db.query(sql);
    return results;
};

exports.getSentLetters = async (userId) => {
    const sql = `
        SELECT L.id, L.title, L.content, L.color, L.created_at, L.stickers,
               L.sender_id, sender.username AS sender_name, receiver.username AS receiver_name
        FROM Letter L
        LEFT JOIN User sender ON L.sender_id = sender.id
        LEFT JOIN User receiver ON L.receiver_id = receiver.id
        WHERE L.sender_id = ?
        ORDER BY L.created_at DESC
    `;
    const [results] = await db.query(sql, [userId]);
    return results;
};

exports.getReceivedLetters = async (userId) => {
    const sql = `
        SELECT L.id, L.title, L.content, L.color, L.created_at, L.stickers,
               L.sender_id, sender.username AS sender_name, receiver.username AS receiver_name
        FROM Letter L
        LEFT JOIN User sender ON L.sender_id = sender.id
        LEFT JOIN User receiver ON L.receiver_id = receiver.id
        WHERE L.receiver_id = ?
        ORDER BY L.created_at DESC
    `;
    const [results] = await db.query(sql, [userId]);
    return results;
};

exports.readLetter = async (letterId, userName) => {
    const sql = `
        SELECT L.id, L.title, L.content, L.color, L.created_at, L.sender_id,
               L.stickers, L.image_url, L.music, L.letter_type,
               U.username AS sender_name
        FROM Letter L
        JOIN User U ON L.sender_id = U.id
        WHERE L.id = ? AND U.username = ?
    `;
    const [results] = await db.query(sql, [letterId, userName]);
    return results[0];
};
