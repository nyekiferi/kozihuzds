const tagok = ["Seszti", "Dori", "Mariann", "Vanda", "Laci", "Zsolt atya", "Feca"]

const huzhatok = ["Seszti", "Dori", "Mariann", "Vanda", "Laci", "Zsolt atya", "Feca"]

const express = require('express')
const app = express()

app.use(express.static(__dirname))
app.use(express.urlencoded({extended: true}))
app.listen(8080)

var huzas

app.post('/huzas', function (req, res) {
    var index = Math.floor(Math.random() * huzhatok.length)
    var huzott = huzhatok[index]
    var nev = req.body.drawName
    if(huzott === nev){
        huzas = "Magadat huztad, huzz ujat!"
    }
    else if (!tagok.includes(nev)){
        huzas = "Nem vagy tagja a húzós csapatnak :,("
    }
    else if(huzhatok.length == 0){
        huzas = "Elfogytak a huzhato nevek!"
    }
    else{
        huzhatok.splice(index, 1)
        huzas = huzott
    }
    console.log(huzhatok)
})

app.get('/eredmeny', function (req, res) {
    res.send({'huzott': huzas})
})

