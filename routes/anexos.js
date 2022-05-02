const express = require('express');
const router = express.Router();
const anexoController = require('../controllers/anexo-controller');

router.get('/anexos', anexoController.getAnexos);
router.post('/anexos', anexoController.postAnexos);
router.put('/anexos', anexoController.putAnexos);

module.exports = router;
