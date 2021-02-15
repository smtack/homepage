const addBookmarkButton = document.querySelector('.addBookmarkButton')
const addBookmarkForm = document.querySelector('.addBookmarkForm')
const closeBookmarkForm = document.querySelector('.closeBookmarkForm')
const bookmarkForm = document.querySelector('.bookmarkForm')

const addCategoryButton = document.querySelector('.addCategoryButton')
const addCategoryForm = document.querySelector('.addCategoryForm')
const closeCategoryForm = document.querySelector('.closeCategoryForm')
const categoryForm = document.querySelector('.categoryForm')

window.onload = () => {
  getBookmarks()
}

addBookmarkButton.addEventListener("click", () => {
  addBookmarkForm.style.display = "block"
  getCategories()
})

closeBookmarkForm.addEventListener("click", () => {
  addBookmarkForm.style.display = "none"
})

addCategoryButton.addEventListener("click", () => {
  addCategoryForm.style.display = "block"
})

closeCategoryForm.addEventListener("click", () => {
  addCategoryForm.style.display = "none"
})

window.addEventListener("click", (e) => {
  if(e.target == addBookmarkForm || e.target == addCategoryForm) {
    addBookmarkForm.style.display = "none"
    addCategoryForm.style.display = "none"
  }
})

bookmarkForm.addEventListener("submit", (e) => {
  e.preventDefault()

  let name = document.querySelector('.name').value
  let url = document.querySelector('.url').value
  let category = document.querySelector('.category').value

  if(!validateForm(name, url)) {
    return false
  }

  let bookmark = {
    name: name,
    url: url,
    category: category
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

  location.reload()
})

categoryForm.addEventListener("submit", (e) => {
  e.preventDefault()

  let categoryName = document.querySelector('.categoryName').value

  if(!categoryName) {
    alert("Enter a name")
  }

  let category = {
    categoryName: categoryName
  }

  if(localStorage.getItem("categories") === null) {
    let categories = []

    categories.push(category)

    localStorage.setItem("categories", JSON.stringify(categories))
  } else {
    let categories = JSON.parse(localStorage.getItem("categories"))

    categories.push(category)

    localStorage.setItem("categories", JSON.stringify(categories))
  }

  location.reload()
})

function getCategories() {
  let categories = JSON.parse(localStorage.getItem("categories"))
  let categoriesList = document.querySelector(".category")

  categoriesList.innerHTML = ""

  for(let i = 0; i < categories.length; i++) {
    let category = categories[i].categoryName

    categoriesList.innerHTML +=
      '<option>' + category + '</option>'
  }
}

function getBookmarks() {
  let categories = JSON.parse(localStorage.getItem("categories"))
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"))

  let bookmarksList = document.querySelector(".bookmarksList")

  for(let i = 0; i < categories.length; i++) {
    let category = categories[i].categoryName

    let box = document.createElement('div')
    box.className = 'box'
    box.innerHTML += '<h2>' + category + '<a class="deleteCategory" onclick="deleteCategory(\'' + category + '\')" href="#">&times;</a>' + '</h2>'

    for(let i = 0; i < bookmarks.length; i++) {
      let name = bookmarks[i].name
      let url = bookmarks[i].url
      let cat = bookmarks[i].category

      if(cat == category) {
        box.innerHTML += 
          '<div class="bookmark">' +
          '<p><a target="_blank" href="' + url + '">' + name + '</a>' +
          '<a class="deleteBookmark" onclick="deleteBookmark(\'' + url + '\')" href="#">&times;</a></p>'+
          '</div>'
      }
    }

    bookmarksList.appendChild(box)
  }
}

function deleteCategory(category) {
  let categories = JSON.parse(localStorage.getItem('categories'))

  for(let i = 0; i < categories.length; i++) {
    if(categories[i].categoryName == category) {
      categories.splice(i, 1)
    }
  }

  localStorage.setItem('categories', JSON.stringify(categories))

  location.reload()
}

function deleteBookmark(url) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

  for(let i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url) {
      bookmarks.splice(i, 1)
    }
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  location.reload()
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