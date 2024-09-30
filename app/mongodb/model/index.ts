const dbConfig = require("../config/config.ts");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorial = require("./model.ts")(mongoose);

module.exports = db;
