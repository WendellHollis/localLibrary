function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return getTotalBooksCount(accounts)
}

function getBooksBorrowedCount(books) {
  let checkedOutBooks = []
  books.forEach(book=>{
    if (book.borrows.find(item=> !item.returned)) {
      checkedOutBooks.push(book);
    }
  })
  return checkedOutBooks.length
}

function helper(books) {
  let countObj = {}
  books.forEach(aBook => {
    if (countObj[aBook.genre] != null) {
      countObj[aBook.genre]++
    } else {
      countObj[aBook.genre] = 1
    }
  })
  return countObj
}
function getMostCommonGenres(books) {
  let countObj = helper(books)
  let countArray = []
  for (const [key, value] of Object.entries(countObj)) {
    countArray.push({
      name: key,
      count: value,
    })
  }
  countArray.sort((a, b) => b.count - a.count)
  return countArray.slice(0, 5)
}

function getMostPopularBooks(books) {
  let countedBookList = []
  books.forEach((book) => countedBookList.push({name: book.title, count: book.borrows.length}))
  countedBookList.sort((bookA, bookB) => (bookA.count < bookB.count) ? 1 : -1)
  return countedBookList.slice(0, 5)
}


function getMostPopularAuthors(books,authors) {
  const topAuthors = authors.map(a => ({
  ...a,
  bookCount: books.filter(b => b.authorId === a.id).length,
  borrowCount: books.filter(b => b.authorId === a.id).reduce((acc, cur) => acc + cur.borrows.length, 0)
  })).sort((b, a) => a.borrowCount - b.borrowCount);
  topAuthors.length = 5;
  return topAuthors.map(ta => {
  return {count: ta.borrowCount, name: ta.name.first + " " + ta.name.last};
  })
  }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
