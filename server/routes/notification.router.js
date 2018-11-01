const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

//gets a user's notifications
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM notification WHERE person_id = $1
    ORDER BY id DESC;`, [req.user.id])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('error in getting notifications:', error);
            res.sendStatus(500);
        });
});

router.delete('/one/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM notification WHERE id = $1 AND person_id = $2;`, [req.params.id, req.user.id])
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in deleting one notification:', error);
        res.sendStatus(500);
    });
});




module.exports = router;