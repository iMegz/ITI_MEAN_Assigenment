const elementById = (id) => document.querySelector(`#${id}`);

const urlOrFile = elementById("urlOrFile");
const addBtn = elementById("add");
const preview = elementById("preview");
const imageField = elementById("image");
const title = elementById("title");
const author = elementById("author");
const booksList = elementById("booksList");

const books = [];

const onUrlOrFileClicked = () => {
  const urlOrFileLabel = elementById("urlOrFile");
  const imageType = elementById("image");
  const newType = imageType.type == "url" ? "file" : "url";
  imageType.type = newType;
  urlOrFileLabel.innerHTML = newType;
};
const refreshList = () => {
  booksList.innerHTML = "";
  books.forEach((book) => {
    let date = new Date(book.id);
    date = date.toLocaleDateString().substr(0, 25);
    const newBook = `
          <div id="${book.id}" class="item">
          <button onclick="onDeleteBook(this)" class="close" id="${book.id}">X</button>
          <h2>${book.title}</h2>
            <img src="${book.image}" alt="${book.title}" />
            <div class="info">
              <h3>${book.author}</h3>
              <h5>Added on ${date}</h5>
            </div>
          </div>
          `;

    booksList.innerHTML += newBook;
  });
};
const onAddClicked = () => {
  if (books.length == 0) elementById("noBooks").remove();
  books.push({
    id: Date.now(),
    title: title.value,
    author: author.value,
    imageType: imageField.type,
    image:
      imageField.type == "url"
        ? imageField.value
        : URL.createObjectURL(imageField.files[0]),
  });
  refreshList();
  title.value = "";
  author.value = "";
  imageField.value = "";
};

const onDeleteBook = (deletedBook) => {
  const index = books.findIndex((book) => book.id == deletedBook.id);
  books.splice(index, 1);
  refreshList();
  if (books.length == 0)
    booksList.innerHTML = '<span id="noBooks">No books found!</span>';
};
const onChangeImage = () => {
  if (imageField.type == "file") {
    preview.src = URL.createObjectURL(imageField.files[0]);
  } else {
    const regexp = /http(\S+)/;
    const imageAdded = regexp.test(imageField.value);
    if (imageAdded) {
      preview.src = imageField.value;
    }
  }
};

urlOrFile.onclick = onUrlOrFileClicked;
addBtn.onclick = onAddClicked;
