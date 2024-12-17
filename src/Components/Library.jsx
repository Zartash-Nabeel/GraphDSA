import { useState } from 'react';

class Queue {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.queue = [];
  }

  // Enqueue function to add a book to the queue
  enqueue(book) {
    if (this.queue.length < this.maxSize) {
      this.queue.push(book);
    } else {
      alert('Cannot add more than 4 books.');
    }
  }

  // Dequeue function to remove the first book (issue it)
  dequeue() {
    return this.queue.shift();
  }

  // Check if the queue is full
  isFull() {
    return this.queue.length === this.maxSize;
  }

  // Get the length of the queue
  getLength() {
    return this.queue.length;
  }

  // Get the books in the queue

  getBooks() {
    return this.queue;
  }

  // Remove all books from the queue (when all are returned)
  clearQueue() {
    this.queue = [];
  }
}

const Library = () => {
  // List of books categorized
  const booksList = [
    'English Literature', 'Computer Science', 'Mathematics', 'Physics',
    'Chemistry', 'Biology', 'History', 'Geography', 'Philosophy', 'Art',
    'Music Theory', 'Psychology', 'Economics', 'Law', 'Sociology',
    'Political Science', 'Anthropology', 'Literature', 'Astronomy', 'Linguistics'
  ];

  const [issueQueue, setIssueQueue] = useState(new Queue(4)); // Queue for issued books
  const [wishlist, setWishlist] = useState([]); // Books that are added to the wishlist
  const [issuedBooks, setIssuedBooks] = useState([]); // Keep track of issued books
  
  const currentDate = new Date();
  const sevenDaysLater = new Date(currentDate);
  sevenDaysLater.setDate(currentDate.getDate() + 7); // Set issue return date to 7 days later

  // Add a book to the wishlist (can have multiple books)
  const addToWishlist = (book) => {
    // Check if the book is already in the wishlist or issue queue
    if (!wishlist.includes(book) && !isInQueue(book)) {
      setWishlist((prevWishlist) => [...prevWishlist, book]);
    } else {
      alert('This book is already in the wishlist or queue.');
    }
  };

  // Remove a book from the wishlist
  const removeFromWishlist = (book) => {
    setWishlist(wishlist.filter((b) => b !== book));
  };

  // Check if a book is already in the queue
  const isInQueue = (book) => {
    return issueQueue.getBooks().some((item) => item.book === book);
  };

  // Issue books from the wishlist
  const issueBook = (book) => {
    // Only issue the book if it's not already in the queue and if the queue isn't full
    if (issueQueue.getLength() < 4) {
      const newBook = {
        book,
        issueDate: currentDate.toLocaleDateString(),
        returnDate: sevenDaysLater.toLocaleDateString(),
      };

      // Add the book to the issue queue
      const newQueue = new Queue(4);
      issueQueue.getBooks().forEach((b) => newQueue.enqueue(b));
      newQueue.enqueue(newBook);

      setIssueQueue(newQueue); // Update issue queue state


      setWishlist(wishlist.filter((b) => b !== book)); // Remove the book from wishlist
      setIssuedBooks([...issuedBooks, book]); // Add to issued books list
    } else {
      alert('Cannot issue more than 4 books at a time.');
    }
  };

  // Return all books at once
  const returnAllBooks = () => {
    // Create a copy of the queue, clearing it completely
    const newQueue = new Queue(4);
    newQueue.clearQueue(); // Clear the entire queue

    setIssueQueue(newQueue); // Update the issue queue state with an empty queue
    setIssuedBooks([]); // Reset the issued books
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h2 className="text-3xl font-bold mb-4 text-center text-white underline underline-offset-4">.     Library     .</h2>
      <p className="text-center mb-8 text-2xl text-white underline underline-offset-2">Browse books and add them to your wishlist for issuing!</p>

      {/* Wishlist Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold mb-4">Your Issue Wishlist</h3>
        <div className="space-y-2">
          {wishlist.length > 0 ? (
            wishlist.map((book, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{book}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => issueBook(book)}
                    className="bg-blue-500 text-white rounded-md px-3 py-1"
                  >
                    Issue Book
                  </button>
                  <button
                    onClick={() => removeFromWishlist(book)}
                    className="bg-red-500 text-white rounded-md px-3 py-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No books in your wishlist.</p>
          )}
        </div>
      </div>

      {/* Books in Issue Queue */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold mb-4">Issued Books (Queue)</h3>
        <div className="space-y-2">
          {issueQueue.getLength() > 0 ? (
            issueQueue.getBooks().map((book, index) => (
              <div key={index} className="flex justify-between">
                <span>{book.book}</span>
                <span>Issued: {book.issueDate} - Return By: {book.returnDate}</span>
              </div>
            ))
          ) : (
            <p>No books have been issued.</p>
          )}
        </div>
        <button
          onClick={returnAllBooks}
          className="mt-4 bg-red-500 text-white rounded-md px-4 py-2"
          disabled={issueQueue.getLength() === 0}
        >
          Return All Books
        </button>
      </div>

      {/* Book List for Adding to Wishlist */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-center">Available Books</h3>
        {/* Create a grid with 4 items per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {booksList.map((book, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center p-4 rounded-lg border border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out"
            >
              <span className="text-lg font-medium text-gray-800">{book}</span>
              <button
                onClick={() => addToWishlist(book)}
                className={`px-4 py-2 mt-2 rounded-lg text-white ${
                  isInQueue(book) || wishlist.includes(book)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 transition duration-200'
                }`}
                disabled={isInQueue(book) || wishlist.includes(book)}
              >
                {isInQueue(book) || wishlist.includes(book)
                  ? 'Already in Wishlist or Queue'
                  : 'Add to Wishlist'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
