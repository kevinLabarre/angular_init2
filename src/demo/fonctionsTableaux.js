// .map()
// Créé une copie d'un tableau en applican une opération sur les éléments
const a = [1, 2, 3, 4, 5];

const b = a.map((item) => item + 1);

a.map((item) => {
  if (item === 2) {
    item + 1;
  }
});

const users = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Doe", age: 25 },
  { id: 3, name: "Bob Smith", age: 40 },
];

const newUser = { id: 2, name: "NOUVEAUX", age: 25 },

const result = users.map(item => {
  if(item.id === 2){
    item = newUser
  }
})



// .filter()
// .find()
