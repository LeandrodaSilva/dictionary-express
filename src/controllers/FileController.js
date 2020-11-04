const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConf = require('../config/multer');
const connection = require('../database/connection');
const auth = require('../middlewares/auth');

router.use(auth);

router.post(
  '/upload',
  multer(multerConf).single('file'),
  async (req, res) => {
    try {
        const {originalname: name, filename: hash_name, size, mimetype} = req.file;
        console.log('user: '+ req.userId);
        const file = {
            name,
            hash_name,
            size,
            mimetype,
            url: `/uploads/${hash_name}`,
            "user_id": req.userId
        };

        await connection('files').insert(file);

        return res.json(file);
    } catch (error) {
        return res.status(500).send({ error: "Internal server error." });
    }
})

router.get('/', async (req, res) => {
    try {
        const files = await connection('files')
        .where('user_id', req.userId)
        .select('*');

        return res.json(files);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = app => app.use('/file', router)
