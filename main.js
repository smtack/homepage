let addBookmarkButton = document.querySelector('.addBookmarkButton')
let addBookmarkForm = document.querySelector('.addBookmarkForm')
let closeBookmarkForm = document.querySelector('.closeBookmarkForm')
let bookmarkForm = document.querySelector('.bookmarkForm')

window.onload = () => {
  getBookmarks();
}

addBookmarkButton.addEventListener("click", () => {
  addBookmarkForm.style.display = "block"
})

closeBookmarkForm.addEventListener("click", () => {
  addBookmarkForm.style.display = "none"
})

window.addEventListener("click", (e) => {
  if(e.target == addBookmarkForm) {
    addBookmarkForm.style.display = "none"
  }
})

bookmarkForm.addEventListener("submit", (e) => {
  e.preventDefault()

  let name = document.querySelector('.name').value
  let url = document.querySelector('.url').value

  if(!validateForm(name, url)) {
    return false
  }

  let bookmark = {
    name: name,
    url: url
  }

  if(localStorage.getItem("bookmarks") === null) {
    let bookmarks = []

    bookmarks.push(bookmark)

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  } else {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"))

    bookmarks.push(bookmark)

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }

  bookmarkForm.reset()

  addBookmarkForm.style.display = "none"

  getBookmarks()
})

function getBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
  let bookmarksList = document.querySelector(".bookmarksList")

  bookmarksList.innerHTML = ""

  for(let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name
    let url = bookmarks[i].url

    bookmarksList.innerHTML += 
      '<div class="bookmark">' +
        '<h3>' + 
          '<a target="_blank" href="' + url + '">' + name + '</a>' +
          '<a class="deleteBookmark" onclick="deleteBookmark(\'' + url + '\')" href="#">&times;</a>' +
        '</h3>' +
      '</div>'
  }
}

function deleteBookmark(url) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

  for(let i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url) {
      bookmarks.splice(i, 1)
    }
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  getBookmarks()
}

function validateForm(name, url) {
  if(!name || !url) {
    alert("Fill in the form");
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  let regex = new RegExp(expression)

  if(!url.match(regex)) {
    alert("Enter a valid URL")
    return false
  }

  return true
}