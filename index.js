const tagok = ["Seszti", "Dóri", "Mariann", "Vanda", "Laci", "Zsolt atya", "Feca", "Bálint", "Máté", "Dia"]

const express = require('express')
const app = express()

app.use(express.static(__dirname))
app.use(express.urlencoded({extended: true}))
app.listen(3031)

const fs = require('fs');

var map = {};

var huzott;

//random generátor
try {
    //load map
    map = JSON.parse(fs.readFileSync('lista.json', 'utf8'));
} catch (e) {
    console.log(e)
    map = {}
    const tagok_random = tagok.sort(() => Math.random() - 0.5);
    for (let i = 0; i < tagok_random.length-1; i++) {
        map[tagok_random[i]] = tagok_random[i+1];
    }
    map[tagok_random[tagok_random.length-1]] = tagok_random[0];
    //save map
    fs.writeFile('lista.json', JSON.stringify(map), function (err) {
        if (err) return console.log(err);
        console.log('lista.json saved');
    }
    );
}

console.log(map)

app.post('/huzas', function (req, res) {
    huzott
    var nev = req.body.drawName
    console.log(nev.length)
    if (!tagok.includes(nev)){
        huzott = "Nem vagy tagja a húzós csapatnak :,("
    } else {
        huzott = map[nev]
        console.log(huzott)
    }
})

app.get('/eredmeny', function (req, res) {
    res.send({'huzott': huzott})
    console.log(huzott);
})

