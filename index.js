const tagok = ["Seszti", "Dori", "Mariann", "Vanda", "Laci", "Zsolt atya", "Feca", "Balint", "Mate"]

const express = require('express')
const app = express()

app.use(express.static(__dirname))
app.use(express.urlencoded({extended: true}))
app.listen(8080)

var map;

//random generátor
try {
    lista = require('./lista.obj')
    map = new Map(lista);
} catch (e) {
    console.log(e)
    map = new Map();
    const tagok_random = tagok.sort(() => Math.random() - 0.5);
    for (let i = 0; i < tagok_random.length-1; i++) {
        map.set(tagok_random[i], tagok_random[i+1]);
    }
    map.set(tagok_random[tagok_random.length-1], tagok_random[0]);
    const obj = Object.fromEntries(map);
    const fs = require('fs');
    fs.writeFile('lista.obj', JSON.stringify(obj), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}


app.post('/huzas', function (req, res) {
    var huzott
    var nev = req.body.drawName
    if (!tagok.includes(nev)){
        huzott = "Nem vagy tagja a húzós csapatnak :,("
    } else {
        huzott = map.get(nev);
    }
})

app.get('/eredmeny', function (req, res) {
    res.send({'huzott': huzott})
})

