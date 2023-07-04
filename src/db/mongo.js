import { MongoClient } from "mongodb";

const uri = "mongodb+srv://admin:admin@clusterseacinema.yywxlp7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

client.connect();

const dbName = "sea-cinema";

const database = client.db(dbName);

export default database;