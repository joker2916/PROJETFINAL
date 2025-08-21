const nodemailer = require("nodemailer");

// 📧 Configure ton service ici (ex : Gmail ou Mailtrap)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

/**
 * Envoie un mail de réinitialisation
 * @param {string} to - L'email du destinataire
 * @param {string} resetLink - Le lien de réinitialisation
 */
async function sendPasswordResetEmail(to, resetLink) {
    const mailOptions = {
        from: `"Support agriculture intelligente" <${process.env.MAIL_USER}>`,
        to,
        subject: "Réinitialisation de votre mot de passe",
        html: `
      <h2>Réinitialisation de mot de passe</h2>
      <p>Bonjour,</p>
      <p>Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
      <a href="${resetLink}">Définir un nouveau mot de passe</a>
      <br/>
      <p>Ce lien expirera après un certain temps.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendPasswordResetEmail };
