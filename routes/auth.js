const express = require("express");
const controller = require("../controllers/authController");
const passport = require("passport");
const {requireAuth} = require("../middleware/authMiddleware");
const router = express.Router();

router.get('/login', controller.getLogin);
router.get('/register', controller.getRegister);
router.post('/login', controller.postLoginJwt);
router.post('/register', controller.postRegisterJwt);
router.post('/logout', requireAuth, controller.postLogout);

module.exports = router;