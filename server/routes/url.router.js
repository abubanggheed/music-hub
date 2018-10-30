const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

//sends an object with booleans for properties that indicate whether certain urls
//exist in the database.
router.get('/available/:id', (req, res) => {
    pool.query(`SELECT * FROM url WHERE song_id = $1`, [req.params.id])
        .then(result => {
            let urls = result.rows[0]
            let objectToSend = {
                id: urls.id,
                mp3Status: urls.mp3_url !== null,
                wavStatus: urls.wav_url !== null,
                productionStatus: urls.production_url !== null,
            }
            res.send(objectToSend);
        }).catch(error => {
            console.log('error in url availability:', error);
            res.sendStatus(500);
        });
});

//finds the requested url, and sends it to the client.
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
        }).catch(error => {
            res.sendStatus(500);
        });
});

//obtains the mp3 url from the database, as that is the only one which is played
//live by the website
router.get('/play', (req, res) => {
    pool.query(`SELECT * FROM url WHERE song_id = $1`, [req.query.id])
        .then(result => {
            if (result.rows.length > 0) {
                res.send(result.rows[0].mp3_url)
            } else {
                res.send('');
            }
        }).catch(error => {
            res.sendStatus(500);
        });
});

module.exports = router;