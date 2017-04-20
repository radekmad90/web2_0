var express = require('express');
var router = express.Router();

var Samochody = require('../dbSchemas.js').Samochody;
var wlasciciele = require('../dbSchemas.js').Wlasciciele;
var setname = 'samochody';

router.get('/', function (req, res) {
    Samochody.find({}, function (err, docs) {
        if (err) {
            return next(err);
        }
        res.render('samochody', {title: "Wszystkie samochody w bazie danych", samochody: docs});
    });


});
router.get('/dodaj_samochod', function (req, res) {
    res.render('dodaj_samochod', {title: "Wpisz poniżej dane samochodu:"});

});
router.post('/dodaj_samochod', function (req, res) {
    var samochod = new Samochody({
        marka: req.body.marka,
        model: req.body.model,
        rokProdukcji: req.body.rokProdukcji,
        nrRejestracyjny: req.body.nrRejestracyjny
    }).save(function (err) {
        var result;
        if (err) {
            throw err;
        } else {
            result = "Udało się dodać samochód!"
        }
        res.render('dodaj_samochod_result', {title: result});
    })
});

router.get('/delete/:id', function (req, res) {
    Samochody.find({_id: req.params.id}, function (err, fura) {
        var result;
        if (err) {
            throw err;
        } else if (!fura || fura.length < 1) {
            result = 'Brak takiego samochodu!'
            res.render('usun_samochod_result', {title: result});
        } else {
            fura[0].remove(function (err) {
                if (err) throw err;
                result = "Usunięto :)";
                res.render('usun_samochod_result', {title: result});
            });
        }

    });
});
//
module.exports = router;
