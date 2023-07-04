import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

client.connect();

const dbName = process.env.MONGO_DB_NAME;

const database = client.db(dbName);

export default database;