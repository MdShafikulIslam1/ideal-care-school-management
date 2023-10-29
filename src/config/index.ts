import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  default_pass: process.env.DEFAULT_PASS,
  bcrypt_salt_number: process.env.BCRYPT_SALT_NUMBER,
  jwt: {
    secret_key: process.env.SECRET_KEY,
    expires_in_secret_key: process.env.EXPIRES_IN_SECRET_KEY,
  },
};
