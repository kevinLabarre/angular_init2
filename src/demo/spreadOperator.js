const a = [1, 2, 3];
const b = [4, 5, 6];

console.log(...a);
console.log(...b);

const c = [...a];
const d = [...a, 4, 5, 6];
const e = [...a, ...b];

const user = { name: "John Doe", age: 30 };

const copie = { ...user, city: "New-York" };
console.log(copie);

const user2 = { ...copie, age: 40 };
console.log(user2);

function sum(...numbers) {
  let total = 0;
  numbers.forEach((n) => (total += n));
  return total;
}

somme1 = sum(1, 2, 3);
somme2 = sum(1, 2, 3, 48, 56, 36);
console.log(somme1, somme2);
