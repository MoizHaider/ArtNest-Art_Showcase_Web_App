const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config({ path: ".env.local" });

let db;

exports.mongoConnect = (cb) => {
  const dbUrl = process.env.MONGODB_URI;
  MongoClient.connect(`${dbUrl}`, {
    ssl: true,
    serverSelectionTimeoutMS: 10000,
  })
    .then((client) => {
      db = client.db("ArtGallery");
      cb();
    })
    .catch((err) => {
        throw "Database not foking found 1";
    });
};

exports.dbConnect = () => {
  if (db) {
    return db;
  }
  const dbUrl = process.env.MONGODB_URI;
  MongoClient.connect(`${dbUrl}`, {
    ssl: true,
    serverSelectionTimeoutMS: 10000,
  })
    .then((client) => {
      db = client.db("ArtGallery");
      return db;
    })
    .catch((err) => {
      throw "Database not foking found 2";
    });
};
