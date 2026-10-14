const express = require('express');
const router = express.Router();
const SHA1 = require('sha1');
var db = require('../utils/database.js');

// login
router.post('/login', (req, res) =>{
    let email = req.body.email;
    let table = 'users';
    let passwd = req.body.passwd;

    if (!email || !passwd){
        return res.status(400).json({error: "Missing required fields!"});
    }

    db.query(`SELECT * FROM ${table} WHERE email = ?`, [values[emailIdx]], (err, results) => {
    });
});

// register
router.post('/register', (req, res) =>{
    let data = req.body;
    let table = 'users';

    let fields = Object.keys(data);
    let values = Object.values(data);

    let nameIdx = fields.indexOf('name');
    let emailIdx = fields.indexOf('email');
    let passwdIdx = fields.indexOf('passwd');
    let confirmIdx = fields.indexOf('confirm');

    if (nameIdx < 0 || emailIdx < 0 || passwdIdx < 0 || confirmIdx < 0){
        return res.status(400).json({error: "Missing required fields!"});
    }

    if (values[passwdIdx] != values[confirmIdx]){
        return res.status(400).json({error: `The passwords does't match!`});
    }

    db.query(`SELECT * FROM ${table} WHERE email = ?`, [values[emailIdx]], (err, results) => {
        if (err){
            return res.status(500).json({ error: err.error});
        }

        if (results.length > 0){
            return res.status(400).json({ error: 'This e-mail already registered!'});
        }

        if (passwdIdx > 0){
            values[passwdIdx] = SHA1(values[passwdIdx]);
        }

        fields.splice(confirmIdx, 1)
        values.splice(confirmIdx, 1)

        fields = fields.join(', ');
        values = "'" + values.join("', '") + "'";

        db.query(`INSERT INTO ${table} (${fields}) VALUES(${values})`, (err, results) =>{
            if (err){
                return res.status(500).json({ error: err.error});
            }
            return res.status(201).json({message: "Registered succesfully!"})
        })
    })
});

// token verification

// isloggedin

module.exports = router;