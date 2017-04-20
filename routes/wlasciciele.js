var express = require('express');
var router = express.Router();

var wlasciciele = require('../dbSchemas.js').Wlasciciele;

router.get('/', function (req, res) {
    wlasciciele.find(function (err, docs) {
        if (err)throw err;
    }).populate('samochody.id').exec(function (err, fury) {
        if (err) throw err;
        for (i = 0; i < fury.length; i++) {
            var fura = fury[i];
            if (fura.samochody !== 'undefined' && fura.samochody.length > 0) {
                fura.samochody.forEach(function (samochod, index, array) {
                    if (samochod.id == null) {
                        array.splice(index, 1);
                    }
                });
            }
        }
        res.render('wlasciciele', {title: "Wszyscy wlasciciele w bazie danych", wlasciciele: fury});
    })
});
router.get('/delete/:id', function (req, res) {
    wlasciciele.find({_id: req.params.id}, function (err, fura) {
        var result;
        if (err) {
            throw err;
        } else if (!fura || fura.length < 1) {
            result = 'Brak takiego wlasciciela!';
            res.render('usun_wlasciciela_result', {title: result});
        } else {
            fura[0].remove(function (err) {
                if (err) throw err;
                result = "Usunięto :)";
                res.render('usun_wlasciciela_result', {title: result});
            });
        }

    });
});
module.exports = router;
