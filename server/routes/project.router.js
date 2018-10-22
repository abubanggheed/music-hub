const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


router.get('/:id', rejectUnauthenticated, (req, res) => {
    switch (req.user.id) {
        case Number(req.params.id):
            pool.query(`SELECT project.id, project.head, project."name", COUNT(song.project_id) AS "number" FROM project
            LEFT OUTER JOIN song ON song.project_id = project.id
            WHERE person_id = $1
            GROUP BY project.id ORDER BY id;`, [req.params.id])
                .then(result => {
                    res.send(result.rows);
                }).catch(error => {
                    res.sendStatus(500);
                    console.log('server error:', error);
                });
            break;
        default:
            res.sendStatus(403)
    }
});


router.get('/', (req, res) => {
    pool.query(`SELECT project.id, project."name", person.username AS artist, COUNT(song.project_id) AS versions FROM project
    LEFT OUTER JOIN song ON song.project_id = project.id
    LEFT OUTER JOIN person ON project.person_id = person.id
    GROUP BY project.id, person.username
    ORDER BY id;`)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            res.sendStatus(500);
            console.log('server error:', error);
        });
});


router.post('/', (req, res) => {
    if (req.user) {
        pool.query(`INSERT INTO project (person_id, "name")
        VALUES ($1, $2);`, [req.user.id, req.body.name])
            .then(result => {
                res.sendStatus(201);
            }).catch(error => {
                res.sendStatus(500);
                console.log('server error:', error);
            });
    } else {
        res.sendStatus(412);
    }
});

router.post('/head/:id', (req, res) => {
    if (req.user) {
        pool.query(`UPDATE project
        SET head = $1 WHERE person_id = $2 AND id = $3;`,
            [req.body.songref, req.user.id, req.params.id])
            .then(result => {
                pool.query(`UPDATE song
            SET type = 'head' WHERE id = $1`, [req.body.songref])
                    .then(result => {
                        res.sendStatus(201);
                    })
            }).catch(error => {
                res.sendStatus(500);
                console.log('server error:', error);
            });
    } else {
        res.sendStatus(412);
    }
});

module.exports = router;