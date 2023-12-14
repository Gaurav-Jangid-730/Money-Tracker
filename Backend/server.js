const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');

  const db = client.db('moneytrackerDb');
  const collection = db.collection('expenses');

  // Function to insert an expense into the expenses collection
  async function addExpense(description, amount) {
    try {
      const result = await collection.insertOne({ description, amount });
      console.log('Expense added:', result.insertedId);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  }

  // Function to retrieve all expenses
  async function getExpenses() {
    try {
      const expenses = await collection.find({}).toArray();
      console.log('Expenses:', expenses);
    } catch (error) {
      console.error('Error getting expenses:', error);
    }
  }

  // Add an expense
  addExpense('Groceries', 50.25);

  // Retrieve all expenses
  getExpenses();

  // Close the connection
  client.close();
});
