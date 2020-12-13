const router = require('express').Router();
const feedController = require('../controllers/feed');
const feedMiddleware = require('../middlewares/validators/feed');
const {authentication} = require('../middlewares/auth');

router.get('/', feedController.index);
router.get('/:id', feedMiddleware.read, feedController.read);

router.use(authentication);
router.post('/', feedMiddleware.create, feedController.create);

router.put('/:id', feedMiddleware.update, feedController.update);
router.delete('/:id', feedMiddleware.destroy, feedController.destroy);

module.exports = router;