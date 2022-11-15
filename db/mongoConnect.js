const mongoose = require('mongoose');
const {config} = require("../config/secret");

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://localhost:27017/express0');
  await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster0.frzne.mongodb.net/express0`);
  console.log("mongo connect");
}
