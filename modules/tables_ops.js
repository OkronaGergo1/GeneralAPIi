const express = require('express');
const router = express.Router();

var db = require('../utils/database');

// SELECT ALL RECORDS FROM A TABLE
router.get('/:table', (req, res) =>{
    let table = req.params.table;

    db.query(`SELECT * FORM ${table}`, (err, results) =>{
        if (err){
            return res.status(500).json({ error: 'Database query error'})
        }
        else{
            return res.status(200).json(results);
        }
    });
});

// SELECT A SPECIFIC RECORS BY ID FROM A TABLE
router.get('/:table/:id', (req, res) =>{
    let table = req.params.table;
    let id = req.params.id;

    db.query(`SELECT * FORM ${table} where ID = ?`, [id], (err, results) =>{
        if (err){
            return res.status(500).json({ error: 'Database query error: ' + err.message})
        }
        else{
            return res.status(200).json(results);
        }
    });
});

//SELECT RECORDS FROM A TABLE WHERE A SPECIFIC FIELD MATCHES A VALUE
router.get('/:table/:field/:value', (req, res) =>{
    let table = req.params.table;
    let field = req.params.field;
    let value = req.params.value;
    db.query(`SELECT * FORM ${table} where ${field} = ?`, [value], (err, results) =>{
        if (err){
            return res.status(500).json({ error: 'Database query error: ' + err.message})
        }
        else{
            return res.status(200).json(results);
        }
    });
});

router.get('/:table/:field/:operator/:value', (req, res) =>{
    let table = req.params.table;
    let field = req.params.field;
    let operator = getOps(req.params.operator);
    let value = req.params.value;
    db.query(`SELECT * FORM ${table} where ${field} ${operator} ?`, [value], (err, results) =>{
        if (err){
            return res.status(500).json({ error: 'Database query error: ' + err.message})
        }
        else{
            return res.status(200).json(results);
        }
    });
});

// ADD NEW RECORD TO A TABLE
router.post('/:table', (req, res) =>{
    let table = req.params.table;
    let data = req.body;

    let fields = Object.keys(data).join(', ');
    let values = "'" +Object.values(data).join("', '") + "'";

    db.query(`INSERT INTO ${table} (${fields}) VALUES (${values})`, (err, results) =>{
        if (err){
            return res.status(500).json({ error: 'Database query error: ' + err.message})
        }
        else{
            return res.status(201).json({message: 'Record added succesfully', id: results.insertId});
        }
    });
});

//UPDATE RECORDS FROM A TABLE
router.patch('/:table/:id', (req, res) =>{
    let table = req.params.table;
    let id = req.params.id;
    let data = req.body;

    let updates = Object.entries(data).map(([key, value]) => `${key} = '${value}'`).join(', ');

    db.query(`UPDATE ${table} SET ${updates} WHERE ID = ?`,[id], (err, results) =>{
        if (err){
            return res.status(500).json({ error: 'Database query error: ' + err.message})
        }
        else{
            return res.status(200).json({message: 'All record deleted succesfully'});
        }
    });
});

//DELETE ALL RECORDS FROM A TABLE
router.delete('/:table', (req, res) =>{
    let table = req.params.table;

    db.query(`DELETE FROM ${table}`, (err, _results) =>{
        if (err){
            return res.status(500).json({ error: 'Database query error: ' + err.message})
        }
        else{
            return res.status(200).json({message: 'All record deleted succesfully'});
        }
    });
});

//DELETE A SPECIFIC RECORD BY ID FROM A TABLE
router.delete('/:table/:id', (req, res) =>{
    let table = req.params.table;
    let id = req.params.id;

    db.query(`DELETE FROM ${table} WHERE ID = ?`, [id], (err, _results) =>{
        if (err){
            return res.status(500).json({ error: 'Database query error: ' + err.message})
        }
        else{
            return res.status(200).json({message: 'Record deleted succesfully'});
        }
    });
});

function getOps(op){
    switch (op){
        case 'eq':
            return '=';
        case 'lt':
            return '<';
        case 'gt':
            return '>';
        case 'lte':
            return '<=';
        case 'gte':
            return '>=';
        case 'ne':
            return '<>';
        case 'like':
            return 'LIKE';
        case 'not':
            return 'NOT';
        default:
            throw new Error('Invalid operator')
    }
}

module.exports = router;