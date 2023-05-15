function findAccountById(accounts, id) {
  for (let i in accounts){
    let currentAccount = accounts[i]
    if (currentAccount.id == id){
      return currentAccount
    }  
  }
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => (accountA.name.last < accountB.name.last) ? -1 : 1)
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  const { id: accId } = account;

  return books.reduce((accumulator, book) => {
    return (
      accumulator +
      book.borrows
        .filter(borrow => borrow.id === accId)
        .reduce((accumulatorBorrows, borrow) => accumulatorBorrows + 1, 0)
    );
  }, 0);
}


function getBooksPossessedByAccount(account, books, authors) {
  let checkedOutBooks = [];
  books.forEach(book=>{
    if (book.borrows.find(item=>item.id === account.id && !item.returned)) {
      checkedOutBooks.push(book);
    }
  })
  checkedOutBooks.forEach(book=>{
    let anAuthor = authors.find(person => person.id === book.authorId);
    book['author'] = anAuthor;
  })
  return checkedOutBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
