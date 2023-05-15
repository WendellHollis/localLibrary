function findAuthorById(authors, id) {
  let authorFind = authors.find((author) => author.id === id)
  return authorFind
}

function findBookById(books, id) {
  let bookFind = books.find((book) => book.id === id)
  return bookFind
}

function partitionBooksByBorrowedStatus(books) {
  let seperatedBooks = []
  let outBooks = []
  let stockedBooks = []
   books.forEach(book =>{
    (book.borrows.find(item=> !item.returned)) ? outBooks.push(book) : stockedBooks.push(book)
    })
    seperatedBooks.push(outBooks, stockedBooks)
  return seperatedBooks
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book
  const borrowers = borrows.map(({ id, returned })=> {
    const account = accounts.find(account => account.id === id)
    return {
      ...account,
      returned,
    };
  });
  return borrowers
    .sort((borrowerA, borrowerB) => {
      const companyA = borrowerA.company;
      const companyB = borrowerB.company;
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
