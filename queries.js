const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const books = db.collection(collectionName);

    //TASK 2: CRUD OPERATIONS
    // 1. Find all books in a specific genre in my case fiction
    const fictionBooks = await books.find({ genre: "Fiction" }).toArray();
    console.log("Books in the Fiction genre:");
    console.log(fictionBooks);

    // 2. Find books published after a certain year in my case 1950
    const recentBooks = await books.find({ published_year: { $gt: 1950 } }).toArray();
    console.log("Books published after 2000:");
    console.log(recentBooks);

    // 3. Find books by a specific author in my case George orwell
    const orwellBooks = await books.find({ author: "George Orwell" }).toArray();
    console.log("Books by George Orwell:");
    console.log(orwellBooks);

    // 4. Update the price of a specific book
    const updateResult = await books.updateOne(
  { title: "1984" },               // Filter: which book to update
  { $set: { price: 15.99 } }       // Update: set new price
    );
    console.log("Updated book price result:");
    console.log(updateResult);

    // 5. Delete a book by its title
    const deleteResult = await books.deleteOne({ title: "Moby Dick" });
    console.log("Delete result:");
    console.log(deleteResult);

    //TASK 3: ADVANCED QUERIES

    // 1. Find books that are in stock and published after 2010
const availableRecentBooks = await books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
}).toArray();
console.log("Books in stock and published after 2010:");
console.log(availableRecentBooks);

// 2. Projection: return only title, author, and price fields
const projectedBooks = await books.find(
  {},  // no filter, return all
  { projection: { title: 1, author: 1, price: 1, _id: 0 } }
).toArray();
console.log("Books with only title, author, and price:");
console.log(projectedBooks);

// 3. Sort books by price in ascending order
const sortedAsc = await books.find().sort({ price: 1 }).toArray();
console.log("Books sorted by price (ascending):");
console.log(sortedAsc);

// 3B.Sort books by price in descending order
const sortedDesc = await books.find().sort({ price: -1 }).toArray();
console.log("Books sorted by price (descending):");
console.log(sortedDesc);

// 4. Pagination - Page 1 (first 5 books)
const page1 = await books.find().limit(5).skip(0).toArray();
console.log("Page 1 (first 5 books):");
console.log(page1);

// 4B Pagination - Page 2 (next 5 books)
const page2 = await books.find().limit(5).skip(5).toArray();
console.log("Page 2 (next 5 books):");
console.log(page2);

//TASK 4: AGGREGATION PIPELINE
// 1. Aggregation: Average price of books by genre
const avgPriceByGenre = await books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
]).toArray();
console.log("Average price of books by genre:");
console.log(avgPriceByGenre);

// 2. Aggregation: Find the author with the most books
const mostBooksAuthor = await books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $limit: 1
  }
]).toArray();
console.log("Author with the most books:");
console.log(mostBooksAuthor);

// 3.. Aggregation: Group books by publication decade and count them
const booksByDecade = await books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $substr: [{ $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }, 0, 4] },
          "s"
        ]
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
]).toArray();
console.log("Books grouped by publication decade:");
console.log(booksByDecade);

//Task 5: INDEXING
// 1. Create an index on the title field
const titleIndex = await books.createIndex({ title: 1 });
console.log("Index created on title:", titleIndex);

// 2. Create a compound index on author and published_year
const compoundIndex = await books.createIndex({ author: 1, published_year: -1 });
console.log("Compound index created on author and published_year:", compoundIndex);

// 3. Use explain with an indexed query
const explainResult = await books.find({ title: "The Hobbit" }).explain("executionStats");
console.log("Explain output for indexed query:");
console.log(JSON.stringify(explainResult, null, 2));



  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

runQueries();
