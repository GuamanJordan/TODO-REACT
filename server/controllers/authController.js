// Actualizar perfil de usuario
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, lastname, email } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    user.name = name || user.name;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    await user.save();
    res.json({ message: 'Perfil actualizado', user: { name: user.name, lastname: user.lastname, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar perfil' });
  }
};

// Actualizar configuración de usuario
exports.updateSettings = async (req, res) => {
  try {
    const userId = req.params.id;
    const { settings } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    user.settings = settings;
    await user.save();
    res.json({ message: 'Configuración actualizada', settings: user.settings });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar configuración' });
  }
};
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
    const recoveryToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.recoveryToken = recoveryToken;
    await user.save();

    const sent = await sendEmail({
      to: email,
      subject: 'Recuperación de contraseña - TaskFlow',
      text: `Tu código de recuperación es: ${recoveryToken}`,
      html: `<h2>TaskFlow</h2><p>Tu código de recuperación es: <strong>${recoveryToken}</strong></p>`
    });

    if (!sent) {
      return res.status(500).json({ message: 'Error al enviar correo de recuperación' });
    }

    res.json({ message: 'Se envió un código de recuperación a tu correo.' });
  } catch (err) {
    console.error('Error recover:', err.message);
    res.status(500).json({ message: 'Error al recuperar contraseña' });
  }
};
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    // Validar dominio permitido (acepta subdominios)
    const allowedDomains = ['gmail.com', 'outlook.com'];
    const emailDomain = email.split('@')[1].toLowerCase();
    if (!allowedDomains.some(domain => emailDomain.endsWith(domain))) {
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
    const user = new User({ name, lastname, email, password: hashedPassword, verified: false, verificationCode });
    await user.save();

    // Enviar email de verificación (obligatorio)
    const sent = await sendEmail({
      to: email,
      subject: 'Código de verificación - TaskFlow',
      text: `Tu código de verificación es: ${verificationCode}`,
      html: `<h2>Bienvenido a TaskFlow</h2><p>Tu código de verificación es: <strong>${verificationCode}</strong></p>`
    });

    if (!sent) {
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({ message: 'No se pudo enviar el correo de verificación. Intenta de nuevo.' });
    }

    res.status(201).json({ message: 'Usuario registrado. Revisa tu correo para verificar.' });
  } catch (err) {
    console.error('Error en registro:', err.message);
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
    res.json({ message: 'Login exitoso', user: { email: user.email, id: user._id, name: user.name, lastname: user.lastname } });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};