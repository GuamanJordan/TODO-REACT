exports.validateRecoveryCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    if (user.recoveryToken !== code) {
      return res.status(400).json({ message: 'Código incorrecto' });
    }
    res.json({ message: 'Código válido' });
  } catch (err) {
    res.status(500).json({ message: 'Error al validar código' });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    if (user.recoveryToken !== code) {
      return res.status(400).json({ message: 'Código de recuperación incorrecto' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.recoveryToken = undefined;
    await user.save();
    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar contraseña' });
  }
};
exports.recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    // Generar token de recuperación (simple, para ejemplo)
    const recoveryToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.recoveryToken = recoveryToken;
    await user.save();

    // Configuración flexible de nodemailer
    const mailService = process.env.MAIL_SERVICE || 'gmail';
    const mailUser = process.env.MAIL_USER;
    const mailPass = process.env.MAIL_PASS;
    let transporter;
    if (mailService === 'gmail') {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: mailUser, pass: mailPass }
      });
    } else if (mailService === 'sendgrid') {
      transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: { user: mailUser, pass: mailPass }
      });
    } else if (mailService === 'mailgun') {
      transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: { user: mailUser, pass: mailPass }
      });
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE === 'true',
        auth: { user: mailUser, pass: mailPass }
      });
    }

    await transporter.sendMail({
      from: mailUser,
      to: email,
      subject: 'Recuperación de contraseña',
      text: `Tu código de recuperación es: ${recoveryToken}`
    });

    res.json({ message: 'Se envió un código de recuperación a tu correo.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al recuperar contraseña' });
  }
};
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validar dominio permitido
    const allowedDomains = ['gmail.com', 'outlook.com'];
    const emailDomain = email.split('@')[1];
    if (!allowedDomains.includes(emailDomain)) {
      return res.status(400).json({ message: 'Dominio de correo no permitido' });
    }
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña requeridos' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    // Generar código de verificación
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, verified: false, verificationCode });
    await user.save();


    // Configuración flexible de nodemailer
    const mailService = process.env.MAIL_SERVICE || 'gmail';
    const mailUser = process.env.MAIL_USER;
    const mailPass = process.env.MAIL_PASS;

    let transporter;
    if (mailService === 'gmail') {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: mailUser,
          pass: mailPass
        }
      });
    } else if (mailService === 'sendgrid') {
      transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: mailUser,
          pass: mailPass
        }
      });
    } else if (mailService === 'mailgun') {
      transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: mailUser,
          pass: mailPass
        }
      });
    } else {
      // Configuración genérica
      transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE === 'true',
        auth: {
          user: mailUser,
          pass: mailPass
        }
      });
    }

    await transporter.sendMail({
      from: mailUser,
      to: email,
      subject: 'Código de verificación',
      text: `Tu código de verificación es: ${verificationCode}`
    });

    res.status(201).json({ message: 'Usuario registrado. Revisa tu correo para verificar.' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro' });
  }
};
exports.verify = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    if (user.verified) {
      return res.status(400).json({ message: 'Usuario ya verificado' });
    }
    if (user.verificationCode !== code) {
      return res.status(400).json({ message: 'Código incorrecto' });
    }
    user.verified = true;
    user.verificationCode = undefined;
    await user.save();
    res.json({ message: 'Usuario verificado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al verificar usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    if (!user.verified) {
      return res.status(400).json({ message: 'Usuario no verificado. Revisa tu correo.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    res.json({ message: 'Login exitoso', user: { email: user.email, id: user._id } });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};