const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  secure: true,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});
const sendVerificationEmail = async (email, verificationUrl) => {
  await transporter.sendMail({
    from: `onboarding@resend.dev`,
    to: email,
    subject: "Verify your email address",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 40px;
        background: #000;
        color: #fff;
      ">
        <h1 style="color: #818cf8;">
          Verify your email
        </h1>

        <p style="color: #ccc;">
          Thanks for creating an account with CodeRooms.
        </p>

        <p style="color: #ccc;">
          Please click the button below to verify your email address.
        </p>

        <a
          href="${verificationUrl}"
          style="
            display: inline-block;
            padding: 12px 24px;
            background: #4f46e5;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
          "
        >
          Verify Email
        </a>

        <p style="
          margin-top: 30px;
          font-size: 13px;
          color: #777;
        ">
          If you didn't create this account, you can safely ignore this email.
        </p>
      </div>
    `,
  });
};

const sendPasswordResetEmail = async (email, resetUrl) => {
  await transporter.sendMail({
    from: `"onboarding@resend.dev`,
    to: email,
    subject: "Reset your CodeRooms password",
    html: `
      <div
        style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          background: #000;
          color: #fff;
        "
      >
        <h2 style="color: #818cf8;">
          Reset your password
        </h2>

        <p style="color: #ccc;">
          We received a request to reset your CodeRooms password.
        </p>

        <p style="color: #ccc;">
          Click the button below to create a new password.
        </p>

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 24px;
            background: #4f46e5;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
          "
        >
          Reset Password
        </a>

        <p
          style="
            margin-top: 30px;
            font-size: 13px;
            color: #777;
          "
        >
          This link will expire in 15 minutes.
        </p>

        <p
          style="
            font-size: 13px;
            color: #777;
          "
        >
          If you didn't request a password reset, you can safely ignore this
          email.
        </p>
      </div>
    `,
  });
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};