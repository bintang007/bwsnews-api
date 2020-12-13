const router = require('express').Router();
const adminController = require('../controllers/admin');
const adminValidator = require('../middlewares/validators/admin');

router.post('/login', adminValidator.login, adminController.login);
router.post('/register', adminValidator.register, adminController.register);

module.exports = router;