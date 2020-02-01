// const person = {
//     name: 'Andrew',
//     age: 22,
//     location: {
//     city: 'Dallas',
//     temp: 50
//     }
// };

// const {name = 'Anonymous', age} = person;
// const {city, temp} = person.location;
// console.log(`${name} is ${age}`);
// if(city){
// console.log(`its ${temp} in ${city}` );
// }

// const book = {
//     title: 'Harry Potter 57',
//     author: 'Who Cares',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const {name: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);

const address = ['2800 Waterview', 'Dallas', 'Texas', '75080'];

const [street, city, state = 'unknown', zip] = address;

console.log(`You are in ${city}, ${state}`);

const items = ['Tea', '2', '3', '4'];
const [item, small, medium, large] = items;

console.log(`A ${item} cost ${small} for a small, ${medium} for a medium, ${large} for a large`);