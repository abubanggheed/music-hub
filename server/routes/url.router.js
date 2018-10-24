const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/available/:id', (req, res) => {
    pool.query(`SELECT * FROM url WHERE song_id = $1`, [req.params.id])
        .then(result => {
            let urls = result.rows[0]
            let objectToSend = {
                id: urls.id,
                mp3Status: urls.mp3_url !== '',
                wavStatus: urls.wav_url !== '',
                productionStatus: urls.production_url !== '',
            }
            res.send(objectToSend);
        }).catch(error => {
            console.log('error in url availability:', error);
            res.sendStatus(500);
        });
});

router.get('/download', (req, res) => {
    pool.query(`SELECT * FROM url WHERE id = $1`, [req.query.id])
        .then(result => {
            let toSend;
            switch (req.query.type) {
                case 'mp3':
                    toSend = result.rows[0].mp3_url
                    break;
                case 'wav':
                    toSend = result.rows[0].wav_url
                    break;
                case 'production':
                    toSend = result.rows[0].production_url
                    break;
                default:
                    res.sendStatus(400);
                    break;
            }
            res.send(toSend);
        }).catch( error => {
            res.sendStatus(500);
        });
});

module.exports = router;