const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(path.join(__dirname, "controllers"));
console.log(typeof files);
