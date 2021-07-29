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
