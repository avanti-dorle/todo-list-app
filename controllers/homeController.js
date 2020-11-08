const fs = require('fs');

exports.getHomePage = (req, res) => {
    
    let query = "SELECT * FROM `todolist` ORDER BY id ASC"; 
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('todoHome.ejs', {
            todoItems: result
        });
    });
};

exports.addItem = (req, res) => {

    let todo_item = req.body.todo_item;
    let query = "INSERT INTO `todolist` (todo_item) VALUES ('" + todo_item + "')";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
};

exports.deleteItem = (req, res) => {
    let itemId = req.params.id;
    let deleteQuery = 'DELETE FROM todolist WHERE id = "' + itemId + '"';

    db.query(deleteQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
};