const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

//get all projects made by a specific user
router.get('/user/:id', rejectUnauthenticated, (req, res) => {
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

//get all projects made by anyone. This route can be reached by the general public
router.get('/', (req, res) => {
    pool.query(`SELECT project.id, project."name", person.username AS artist, COUNT(song.project_id) AS versions, head FROM project
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

//obtains some data reguarding a specific project for future use.
router.get('/info/:id', (req, res) => {
    pool.query(`SELECT "name", project.id AS project_id, username, person_id FROM project
    JOIN person ON project.person_id = person.id
    WHERE project.id = $1;`, [req.params.id])
        .then(response => {
            res.send(response.rows);
        }).catch(error => {
            res.sendStatus(500);
        });
});

//new project
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

//adds a head to a project
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

//checks to see of the projects head reference still exists.
router.put('/head/:id', (req, res) => {
    pool.query(`SELECT * FROM project
    JOIN song ON song.id = project.head
    WHERE project.id = $1;`, [req.params.id]).then(result => {
        //if the head no longer exists, the head should be NULL
            if (result.rows.length === 0) {
                pool.query(`SET head = NULL
            WHERE id = $1;`, [req.params.id]).then(result => {
                        res.sendStatus(200);
                    }).catch(error => {
                        console.log('error setting head to null;', error);
                        res.sendStatus(500);
                    });
            } else {
                res.sendStatus(200);
            }
        }).catch(error => {
            console.log('error in project song join:', error);
            res.sendStatus(500);
        });
});

//removes a project. The use of req.user means that an unauthorized request deletes nothing
router.delete('/:id', (req, res) => {
    pool.query(`DELETE FROM project WHERE id = $1 AND person_id = $2;`, [req.params.id, req.user.id])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error in delete project:', error);
            res.sendStatus(500);
        });
});

module.exports = router;