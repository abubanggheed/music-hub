const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/available/:id', (req, res) => {
    pool.query(`SELECT * FROM url WHERE song_id = $1`,[req.params.id])
    .then( result => {
        let urls = result.rows[0]
        let objectToSend = {
            id: urls.id,
            mp3Status: urls.mp3_url !== '',
            wavStatus: urls.wav_url !== '',
            productionStatus: urls.production_url !== '',
        }
        res.send(objectToSend);
    }).catch( error => {
        console.log('error in url availability:', error);
        res.sendStatus(500);
    });
});

module.exports = router;