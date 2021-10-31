import dotenv from "dotenv";
dotenv.config();

// 환경변수가 있는지 확인
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInTime: required("JWT_EXPIRES_TIME", "600000"),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  port: parseInt(required("PORT", 8080)),
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
  },
  csrf: {
    plainToken: required("CSRF_SECRET_KEY"),
  },
};
