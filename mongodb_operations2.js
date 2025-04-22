const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'companyDB';
async function runOperations()
{
 const client = new MongoClient(url);
 try {
 await client.connect();
 console.log("Connected to MongoDB!");
 const db = client.db(dbName);
 const employees = db.collection('employees');
 // **1. COUNT - Get total number of documents**
 const totalEmployees = await employees.countDocuments();
 console.log(`Total employees: ${totalEmployees}`);
 // **2. LIMIT - Get only 2 documents**
 const limitedEmployees = await employees.find().limit(2).toArray();
 console.log("Limited Employees:", limitedEmployees);
 // **3. SORT - Sort employees by salary in descending order**
 const sortedEmployees = await employees.find().sort({ salary: -1 }).toArray();
 console.log("Employees sorted by salary (High to Low):", sortedEmployees);
 // **4. SKIP - Skip the first record and fetch the next ones**
 const skippedEmployees = await employees.find().skip(1).toArray();
 console.log("Employees after skipping first record:", skippedEmployees);
 } catch (err)
 {
 console.error("Error:", err);
 } finally
 {
 await client.close();
 console.log("Connection closed.");
 }
}
runOperations();