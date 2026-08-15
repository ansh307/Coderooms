const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const REFRESH_TOKEN_GRACE_PERIOD = 10 * 1000;

const hashRefreshToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const generateRefreshTokenFamily = () => {
  return crypto.randomUUID();
};

const generateRefreshToken = (userId, family) => {
  return jwt.sign(
    {
      userId,
      family,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

const getEncryptionKey = () => {
  return crypto
    .createHash("sha256")
    .update(process.env.REFRESH_TOKEN_ENCRYPTION_KEY)
    .digest();
};

const encryptRefreshToken = (token) => {
  const key = getEncryptionKey();

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted,
  ].join(":");
};

const decryptRefreshToken = (encryptedToken) => {
  const key = getEncryptionKey();

  const [ivHex, authTagHex, encrypted] = encryptedToken.split(":");

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(ivHex, "hex"),
  );

  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

module.exports = {
  hashRefreshToken,
  generateRefreshTokenFamily,
  generateRefreshToken,
  encryptRefreshToken,
  decryptRefreshToken,
  REFRESH_TOKEN_GRACE_PERIOD,
};