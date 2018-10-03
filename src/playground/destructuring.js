//
// OBJECT DESTRUCTURING
//

// const person = {
//     name: 'Regis', 
//     age: 48,
//     location: {
//         city: 'New York',
//         temp: 58
//     }
// };

// const {name: firstName = 'Anonymous', age} = person;

// console.log(`${firstName} is ${age}`);

// const {city, temp: temperature} = person.location;
// console.log(`It's ${temperature} in ${city}`);

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;
// console.log(publisherName); // Pinguin, Self-Publihed

//
// ARRAY DESTRUCTURING
//
// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
// const [ , city, state = 'New York'] = address;
// console.log(`You are in ${city}, ${state}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [productName, , mediumPrice] = item;
console.log(`A medium ${productName} costs ${mediumPrice}`);

