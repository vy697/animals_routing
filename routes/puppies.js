'use strict';

var express = require('express'),
    router = express.Router(),
    pg = require('pg'),
    db_url = process.env.DATABASE_URL || 'postgres://localhost:5432/animals';

router.get('/', function(req, res) {
    pg.connect(db_url, function(err, client, done) {
        done();
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM puppies', function(err, data) {
            if (err) {
                return console.error('error querying database', err);
            }
            res.render('puppies/index', {
                puppies: data.rows
            });
        });
    });
});

router.get('/new', function(req, res) {
    res.render('puppies/new');
});

router.get('/:id', function(req, res) {
    pg.connect(db_url, function(err, client, done) {
        done();
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM puppies WHERE id = $1', [req.params.id], function(err, data) {
            if (err) {
                return console.error('error querying database', err);
            }
            var puppy = data.rows[0];
            if (!puppy) {
                res.redirect("/puppies");
            }
            res.render('puppies/show', {
                puppy: puppy
            });
        });
    });
});

router.get('/:id/edit', function(req, res) {
    pg.connect(db_url, function(err, client, done) {
        done();
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM puppies WHERE id = $1', [req.params.id], function(err, data) {
            if (err) {
                return console.error('error querying database', err);
            }
            var puppy = data.rows[0];
            if (!puppy) {
                res.redirect("/puppies");
            }
            res.render('puppies/edit', {
                puppy: puppy
            });
        });
    });
});

router.put('/:id', function(req, res) {
    pg.connect(db_url, function(err, client, done) {
        done();
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('UPDATE puppies SET name = $1 WHERE id = $2', [req.body.puppy.name, req.params.id], function(err, data) {
            if (err) {
                return console.error('error querying database', err);
            }
            res.redirect('/puppies');
        });
    });
});

router.post('/', function(req, res) {
    pg.connect(db_url, function(err, client, done) {
        done();
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('INSERT INTO puppies (name) VALUES ($1)', [req.body.puppy.name], function(err, data) {
            if (err) {
                return console.error('error querying database', err);
            }
            res.redirect('/puppies');
        });
    });
});

router.delete('/:id', function(req, res) {
    pg.connect(db_url, function(err, client, done) {
        done();
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('DELETE FROM puppies WHERE id = $1', [req.params.id], function(err, data) {
            if (err) {
                return console.error('error querying database', err);
            }
            res.redirect('/puppies');
        });
    });
});

module.exports = router;
