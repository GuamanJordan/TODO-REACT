const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/verify', authController.verify);
router.post('/recover', authController.recoverPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/validate-recovery', authController.validateRecoveryCode);

// Endpoints de perfil y configuración
router.put('/profile/:id', authController.updateProfile);
router.put('/settings/:id', authController.updateSettings);

module.exports = router;