const dbo = require('../config/db');

async function getAnexos(req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("anexos")
        .findOne({}, (err, anexos) => {
            if (err) {
                res.status(400).json({ response: "Error obteniendo los anexos" })
            }
            else {
                delete anexos._id
                res.status(200).send(anexos);
            }
        })
};

async function postAnexos(req, res) {

    let concepto = req.body.concepto;
    let valor = req.body.valor;

    const dbConnect = dbo.getDb();

    dbConnect
        .collection("anexos")
        .findOne({}, (err, anexos) => {
            if (err) {
                return res.status(500).json({ response: "Server error" })
            }
            else {
                let operacion = { $set: {} }
                operacion.$set[concepto] = valor;
                dbConnect
                    .collection("anexos")
                    .updateOne({ _id: anexos._id }, operacion, function (err, result) {
                        if (err) {
                            res.status(400).json({ response: 'Error insertando anexo' });
                        } else {
                            res.status(201).json({ response: 'Anexo insertado correctamente' });
                        }
                    });
            }
        });
}

async function deleteAnexos(req, res){
    let concepto = req.body.concepto;

    const dbConnect = dbo.getDb();

    dbConnect
        .collection("anexos")
        .findOne({}, (err, anexos) => {
            if (err) {
                return res.status(500).json({ response: "Server error" })
            }
            else {
                let operacion = { $unset: {} }
                operacion.$unset[concepto] = "";
                dbConnect
                    .collection("anexos")
                    .updateOne({ _id: anexos._id }, operacion, function (err, result) {
                        if (err) {
                            res.status(400).json({ response: 'Error eliminado anexo' });
                        } else {
                            res.status(201).json({ response: 'Anexo eliminado correctamente' });
                        }
                    });
            }
        });
}

module.exports = {
    getAnexos,
    postAnexos,
    deleteAnexos
}
