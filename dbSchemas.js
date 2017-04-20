var mongoose = require('mongoose');

// ##########################################################
// Połączenie z bazą danych
// ##########################################################

// mongoose.connect('mongodb://username:password@database.mongolab.com:55895/projectname', function(err) {
mongoose.connect('mongodb://radek:radek@ds054619.mlab.com:54619/radek', function (err) {
    if (err) {
        console.log('błąd połączenia', err);
    } else {
        console.log('połączenie udane');
    }
});

var Schema = mongoose.Schema;
var SamochodySchema = new Schema({
    marka: {type: String, required: true},
    model: {type: String, required: true},
    rokProdukcji: {type: Number, required: true},
    nrRejestracyjny: {type: String, required: true}
}, {collection: 'samochody'});
exports.Samochody = mongoose.model('samochod', SamochodySchema);
var samochodySchema = new Schema({
    id: {type: Schema.Types.ObjectId, ref: 'samochod'},
    wspolwlasciciel: {type: Number}
});

var WlascicieleSchema = new Schema({
    imie: {type: String, required: true},
    nazwisko: {type: String, required: true},
    dataUrodzenia: {type: Date, required: true},
    samochody: [samochodySchema]
}, {collection: 'wlasciciele'});
exports.Wlasciciele = mongoose.model('wlasciciele', WlascicieleSchema);
