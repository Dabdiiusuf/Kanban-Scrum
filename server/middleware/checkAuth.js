// const { admin } = require("../firebase");

// module.exports = async function checkAuth(req, res, next) {
//   try {
//     const header = req.headers.authorization || "";
//     const token = header.startsWith("Bearer") ? header.slice(7) : null;
//     if (!token)
//       return res.status(401).json({ error: "Missing Authorization header" });

//     const decoded = await admin.auth().verifyIdToken(token);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid or expired token " });
//   }
// };
