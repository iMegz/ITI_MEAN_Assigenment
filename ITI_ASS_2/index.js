const rand = (mul) => Math.floor(Math.random() * mul);
const elementById = (id) => document.querySelector(`#${id}`);
const reset = () => location.reload();
const randID = (i) => {
  const upper = String.fromCharCode(rand(26) + 65);
  const int01 = rand(900) + 100;
  const lower = String.fromCharCode(rand(26) + 97);
  const iterator = i < 10 ? `00${i}` : i < 100 ? `0${i}` : i;
  return `${upper}${int01}${iterator}${lower}`;
};
const randName = () => {
  const name = { studentName: "", gender: "Male" };
  name.gender = Math.round(Math.random()) ? "male" : "female";
  const firstName = (arr) => arr[rand(arr.length)];
  name.studentName = firstName(names[name.gender]);
  name.studentName += ` ${names.surnames[rand(names.surnames.length)]}`;
  return name;
};
const viewNumberOfStudents = () => {
  const numberOfStudents = elementById("numberOfStudents").value;
  const label = elementById("numberOfStudentsLabel");
  label.innerHTML = `Number of students : ${numberOfStudents}`;
};
const generateStudents = () => {
  const numberOfStudents = elementById("numberOfStudents").value;
  const avg = elementById("avg");
  const gradesTable = elementById("gradesTable");
  elementById("empty").remove();
  const students = [];
  let totalAverage = 0;
  for (let i = 0; i < numberOfStudents; i++) {
    const { studentName, gender } = randName();
    students[i] = {
      id: randID(i),
      studentName,
      gender,
      math: rand(100),
      physics: rand(100),
      chemistry: rand(100),
      history: rand(100),
      english: rand(100),
      average: 0,
    };
    const { math, physics, chemistry, history, english } = students[i];
    students[i].average = (math + physics + chemistry + history + english) / 5;
    totalAverage += students[i].average;
    const newRow = gradesTable.insertRow(i + 1);
    newRow.id = students[i].id;
    Object.entries(students[i]).forEach(([key, value], index) => {
      newRow.insertCell(index).innerHTML = value;
    });
  }
  totalAverage = Math.floor((totalAverage / numberOfStudents) * 100) / 100;
  avg.innerHTML = `Total Average = ${totalAverage}`;
  students.sort((a, b) => a.average - b.average);
  elementById(students[0].id).classList.add("min");
  elementById(students[students.length - 1].id).classList.add("max");
};
