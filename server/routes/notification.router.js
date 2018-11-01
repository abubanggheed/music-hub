const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

//gets a user's notifications
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM notifications WHERE person_id = $1`, [req.user.id])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('error in getting notifications:', error);
            res.sendStatus(500);
        });
});




module.exports = router;