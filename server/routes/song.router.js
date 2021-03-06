const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

//uptain all songs from a given user. If they are unauthorized, they get a 403.
router.get('/mysongs/:id', rejectUnauthenticated, (req, res) => {
    switch (req.user.id) {
        case Number(req.params.id):
            pool.query(`SELECT song."name", song."type", project.id AS project_id, project."name" AS project, song.id FROM song
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

//obtain all songs that are part of a particular project
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

//adds a new song
router.post('/:id', (req, res) => {
    let user = null;
    if (req.user) {
        user = req.user.id
    }
    pool.query(`INSERT INTO song (creator, "name", project_id)
    VALUES ($1, $2, $3) RETURNING id`, [user, req.body.name, req.params.id])
        .then(result => {
            //after the song is inserted, the urls send from the client must also be inserted
            pool.query(`INSERT INTO url (song_id, mp3_url, wav_url, production_url)
            VALUES($1, $2, $3, $4)`, [result.rows[0].id, req.body.mp3, req.body.wav, req.body.production])
                .then(result => {
                    res.sendStatus(201);
                }).catch(error => {
                    console.log('error in url post:', error);
                    res.sendStatus(500);
                })
        }).catch(error => {
            console.log('error in post:', error);
            res.sendStatus(500);
        });
});

//promotes a song to the head of a project
router.put('/head', (req, res) => {
    if (req.user) {
        //sets the head of a project to the search parameters
        pool.query(`UPDATE project SET head = $1
            WHERE id = $2 AND person_id = $3
            RETURNING head;`, [req.query.song, req.query.project, req.user.id])
            .then(result => {
                //sets the type of all songs under that project as 'remix'. That way
                //the previous head does not remain a head.
                let newHead = result.rows[0].head;
                pool.query(`UPDATE song SET "type" = 'remix'
                WHERE project_id = $1;`, [req.query.project])
                    .then(result => {
                        //now, we update the type of our new head to 'head'
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
});

//deletes a song
router.delete('/:id', (req, res) => {
    pool.query(`SELECT url.id AS url_id, project.person_id AS "admin", song_id, creator AS artist, url.mp3_url, url.wav_url, url.production_url FROM song
    JOIN url ON song.id = song_id
    JOIN project ON song.project_id = project.id
    WHERE song_id = $1;`, [req.params.id]).then(result => {
            let data = result.rows[0];
            //either the project creator of the song creator may delete a song
            if (data.admin == req.user.id || data.artist == req.user.id) {
                //deletes from url first, this part was written before the table was set to allow
                //cascading on delete.
                pool.query(`DELETE FROM url WHERE id = $1;`, [data.url_id]).then(result => {
                    pool.query(`DELETE FROM song WHERE id = $1;`, [data.song_id]).then(result => {
                        res.send([data.mp3_url, data.wav_url, data.production_url]);
                    }).catch(error => {
                        console.log('error in delete song:', error);
                        res.sendStatus(500);
                    })
                }).catch(error => {
                    console.log('error in delete id:', error);
                    res.sendStatus(500);
                })

            } else {
                console.log('invalid delete attempt:', error);
                res.sendStatue(403);
            }
        }).catch( error => {
            console.log('error in finding data', error);
            res.sendStatus(400);
        })
});

module.exports = router;