const dbo = require('../config/db');
const models = require('../models/anexos');

async function getAnexos(req, res) {
    const dbConnect = dbo.getDb();
    
    dbConnect
        .collection("anexos")
        .find({})
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ response: "Error obteniendo los anexos" })
            }
            else {
                let response = []
                result.forEach(anexo => {
                    response.push(anexo);
                }); 
                res.status(200).json({ anexos: response });
            }
        })
};

async function postAnexos(req, res) {
    const dbConnect = dbo.getDb();

    let concepto = req.body.concepto;
    let valores = req.body.valores;

    const anexo = {};

    anexo[concepto] = valores
        
    dbConnect
        .collection("anexos")
        .insertOne(anexo , function (err, result) {
            if (err) {
                res.status(400).json({ response: 'Error insertando anexo' });
            } else {
                res.status(201).json({ response: 'Anexo insertado correctamente' });
            }
        });
}

async function putAnexos(req, res) {
    const dbConnect = dbo.getDb();

    const anexo = {
        concepto: req.body.concepto
    };

    const actualizacion = {
        $push: { valores : req.body.valor }
    }
        
    dbConnect
        .collection("anexos")
        .updateOne(anexo, actualizacion, function (err, result) {
            if (err) {
                res.status(400).json({ response: 'Error insertando anexo' });
            } else {
                res.status(202).json({ response: 'Anexo actualizado correctamente' });
            }
        });
}

module.exports = {
    getAnexos,
    postAnexos,
    putAnexos
}