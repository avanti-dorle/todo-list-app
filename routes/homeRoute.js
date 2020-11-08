const express = require("express");
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.getHomePage);
router.get('/delete/:id', homeController.deleteItem);
router.post('/add', homeController.addItem);

module.exports = router;