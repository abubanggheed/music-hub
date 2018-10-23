const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


router.get('/mysongs/:id', rejectUnauthenticated, (req, res) => {
    switch (req.user.id) {
        case Number(req.params.id):
            pool.query(`SELECT song."name", song."type", project.id AS project_id, project."name" AS project FROM song
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
    pool.query(`SELECT song."name", person.username AS artist, person.id AS person_id, song."type", song.id, project."name" AS project FROM song
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
    VALUES ($1, $2, $3) RETURNING id`, [user, req.body.name, req.params.id])
        .then(result => {
            console.log(result.rows);
            console.log(req.body);
            pool.query(`INSERT INTO url (song_id, mp3_url, wav_url, production_url)
            VALUES($1, $2, $3, $4)`, [result.rows[0].id, req.body.mp3, req.body.wav, req.body.production])
                .then(result => {
                    res.sendStatus(201);
                }).catch( error => {
                    console.log('error in url post:', error);
                    res.sendStatus(500);
                })
        }).catch(error => {
            console.log('error in post:', error);
            res.sendStatus(500);
        });
});

router.put('/head', (req, res) => {
    if (req.user) {
        pool.query(`UPDATE project SET head = $1
            WHERE id = $2 AND person_id = $3
            RETURNING head;`, [req.query.song, req.query.project, req.user.id])
            .then(result => {
                let newHead = result.rows[0].head;
                pool.query(`UPDATE song SET "type" = 'remix'
                WHERE project_id = $1;`, [req.query.project])
                    .then(result => {
                        pool.query(`UPDATE song SET "type" = 'head'
                    WHERE id = $1;`, [newHead])
                            .then(result => {
                                res.sendStatus(200);
                            }).catch(error => {
                                console.log('error in set head:', error);
                            });
                    }).catch(error => {
                        console.log('error in set remix:', error);
                    });
            }).catch(error => {
                console.log('error in promote:', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;