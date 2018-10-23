const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


router.get('/mysongs/:id', rejectUnauthenticated, (req, res) => {
    switch (req.user.id) {
        case Number(req.params.id):
            pool.query(`SELECT song."name", song."type", project."name" AS project FROM song
            FULL OUTER JOIN project ON song.project_id = project.id
            WHERE creator = $1 ORDER BY song.id;`, [req.params.id])
                .then(result => {
                    res.send(result.rows);
                }).catch(error => {
                    res.sendStatus(500);
                    console.log('server error:', error);
                });
            break;

        default:
            res.sendStatus(403);
            break;
    }

});

router.get('/project/:id', (req, res) => {
    pool.query(`SELECT song."name", person.username AS artist, song."type", song.id, project."name" AS project FROM song
    LEFT OUTER JOIN project ON song.project_id = project.id
    LEFT OUTER JOIN person ON song.creator = person.id
    WHERE project.id = $1 ORDER BY song.id;`, [req.params.id])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            res.sendStatus(500);
            console.log('server error:', error);
        });
});

router.post('/:id', (req, res) => {
    let user = null;
    if (req.user) {
        user = req.user.id
    }
    pool.query(`INSERT INTO song (creator, "name", project_id)
    VALUES ($1, $2) RETURNING id`, [user, req.params.id])
        .then(result => {
            pool.query(`INSERT INTO url (song_id, mp3_url, wav_url, production_url, production_type)
            VALUES($1, $2, $3, $4, $5)`, [result.rows[0].id, req.body.mp3, req.body.wav, req.body.production, req.body.ext])
                .then(result => {
                    res.sendStatus(201);
                });
        }).catch(error => {
            res.sendStatus(500);
        });
});

module.exports = router;