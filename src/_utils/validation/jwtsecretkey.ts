const cryptoModule = require("crypto");
const secretKey = cryptoModule.randomBytes(32).toString("hex");
console.log(secretKey); // This will print a 64-character hexadecimal string
