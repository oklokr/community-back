const mongoose = require("mongoose");
const password = "123Qwer1!"
const connectionStringTxt = `mongodb+srv://rebon1848:${password}@cluster0.bwn0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

exports.mongoDB = () => {
  mongoose.connect(connectionStringTxt).then(() => {
    console.log("MongoDB 연결 성공...")
  }).catch((err) => console.log(err));
}