const express = require('express');
const router = express.Router();
const anexoController = require('../controllers/anexo-controller');

router.get('/anexos', anexoController.getAnexos);
router.post('/anexos', anexoController.postAnexos);
router.delete('/anexos', anexoController.deleteAnexos);

module.exports = router;
