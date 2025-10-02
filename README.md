# Week 1: MongoDB – Data Layer Fundamentals and Advanced Techniques

## ✅ How to Run the Project

### 1. Insert Sample Data
Run this command in the project folder:
node insert_books.js

### 2. Execute All Queries (CRUD + Aggregation + Indexing)
Run:
node queries.js

## ✅ Database Details
- Database name: plp_bookstore
- Collection name: books

## ✅ Tools Used
- MongoDB Community Edition / MongoDB Compass
- Node.js (CommonJS syntax)
- JavaScript

## ✅ What the Scripts Do

### 📌 insert_books.js
- Connects to MongoDB
- Drops existing `books` collection (if any)
- Inserts 12 sample book documents

### 📌 queries.js
Contains:
- Find books by genre
- Find books published after a certain year
- Find books by specific author
- Update book price
- Delete a book by title
- Aggregation queries (grouping, counting, averages, etc.)
- Index creation and `explain()` test

## ✅ Screenshot Requirement
A screenshot from MongoDB Compass showing:
- Database: `plp_bookstore`
- Collection: `books`
- Some documents visible

Add this file to the repo:
`compass_screenshot.png`

## ✅ How to Submit
1. Commit all files
2. Push to your repository
3. Submit the repo link
