import bcrypt from "bcrypt";
import { config } from "../config.js";

export const csrfCheck = (req, res, next) => {
  // 뭔가 정보를 변경하는 api 요청이 아니면 넘어간다
  if (req.method == "GET" || req.method == "OPTIONS" || req.method == "HEAD") {
    return next();
  }

  const csrfHeader = req.get("dwitter-csrf-token");

  if (!csrfHeader) {
    console.warn(
      'Missing required "dwitter-csrf-token" header',
      req.headers.origin
    );
    return res.status(403).json({ message: "Failed CSRF check" });
  }

  validateCsrfToken(csrfHeader) //
    .then((valid) => {
      if (!valid) {
        console.warn(
          'Value provided in "dwitter-csrf-token" header does not validate',
          req.headers.origin,
          csrfHeader
        );
        return res.status(403).json({ message: "Failed CSRF check" });
      }
      next();
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    });
};

async function validateCsrfToken(csrfHeader) {
  return bcrypt.compare(config.csrf.plainToken, csrfHeader);
}
