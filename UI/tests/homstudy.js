// for (let i=0; i<10; i++)
//   console.log(i);
//   console.log('hello');

// class Person{
//   constructor() {}
// }
// class Employee extends Person{
//   constructor(){
//     super();
//   }
// }
// class Manager extends Employee{
//   constructor() {
//     super();
//   }
// }
// let manager = new Manager();
//
// console.log(manager instanceof Person);

// let places = ['Warri', 'Abuja', 'Lagos', 'Ibadan', 'Kano'];
// let [whereIWork, whereILive] = places;
//
// console.log(whereILive);

/**
Compute the sum of all integers that are multiples of 9,
from 1 to 250.
Enter the result of your computation in the text box below
 */
// let Multiples = 0;
// for (let i = 1; i <= 250; i++) {
//   if (i % 9 === 0) {
//     Multiples += i;
//   }
// }
//
// console.log(Multiples);
// const countDownC = (limit) => {
//   console.log("Now @ " + limit);
//   if (limit === 1 ) return 1;
//   countDownC(limit - 1);
// };
//
// const countDownD = (limit) => {
//   console.log("Now @ " + limit);
//   if (limit = 1) return 1;
//
//   countDownD(limit--);
// };
// countDownC(5);

// const allStates = ["Abia", "Adamawa", "Anambra", "Akwa Ibom", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Enugu", "Edo", "Ekiti", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"];
//
// const sortByNameLength = (states) => {
//   return states.sort((a, b) => {
//     return (b.split('').length - a.split('').length);
//   });
// };
//
// const sorted = sortByNameLength(allStates);
// console.log(sorted[4]);
// console.log(sorted);