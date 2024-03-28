// const arr = [9,2,2,3,2,3,1,3,4,6,9,2,6,2,3,1,2,3,2]
// let narr = [];
// for (k = 0; k < arr.length; k++) {
//   if (arr[k] != arr[k + 1]) {
//     for (let i = 0; i < arr.length; i++) {
//       for (let j = 0; j < arr.length - i - 1; j++) {
//         if (arr[j] > arr[j + 1]) {
//           let temp = arr[j];
//           arr[j] = arr[j + 1];
//           arr[j + 1] = temp;
//         }
//       }
//     }
//     narr.push(arr[k]);
//   }
// }

// console.log(arr);
// console.log(narr);

// let arr = [9, 2, 2, 3, 2, 3, 1, 3, 4, 6, 9, 2, 6, 2, 3, 1, 2, 3, 2];

// function sortRemove(arr) {
//   if (arr.length <= 1) {
//     return arr;
//   }
//   let pivot = arr[Math.floor(arr.length / 2)];
//   let left = [];
//   let right = [];
//   let duplicate = [];

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < pivot) {
//       left.push(arr[i]);
//     } else if (arr[i] > pivot) {
//       right.push(arr[i]);
//     } else if (arr[i] === pivot) {
//       duplicate.push(arr[i]);
//     }
//   }

//   return [...sortRemove(left), duplicate, ...sortRemove(right)];
// }

// console.log(sortRemove(arr));

// let test = [0, 1, 0, 0, 0, 1];

// let users = [{
//     name: "saurabh",
//     age: 25,
//     subject: ['e', 'h', 'm', 's', 'a']
// },
// {
//     name: "sachin",
//     age: 22,
//     subject: ['e', 'h', 'm', 's']

// },
// {
//     name: "shashi",
//     age: 21,
//     subject: ['e', 'h', 'm']

// },
// {
//     name: "faisal",
//     age: 27,
//     subject: ['e', 'h', 'm', 's']

// }]
// function find(user) {
//     let result = [];
//     user.forEach((x) => {
//         if((x.subject).length>=4){
//             let {name,age} = x
//             result.push({name,age})
//         }
//     })
//     return result
// }
// console.log(find(users))

// function foo() {
//     let x = y = 0;
//     x++;
//     y++;
//     return x;
// }

// console.log(foo(), typeof x, typeof y);

// let lists = [[1,4,5],[1,3,4],[2,6],[[[[[[[0]]]]]]]];

// console.log((lists.flat(Infinity)).sort())
// let flatLists = lists.flat(Infinity)

// for (let i = 0; i < flatLists.length; i++) {
//   for (let j = 0; j < flatLists.length - i - 1; j++) {
//     if (flatLists[j] > flatLists[j + 1]) {
//       let temp = flatLists[j];
//       flatLists[j] = flatLists[j + 1];
//       flatLists[j + 1] = temp;
//     }
//   }
// }
// console.log(flatLists)

// // const orgObject = { company: 'XYZ Corp'};
// // const carObject = { name: 'Toyota'};
// // const staff = Object.assign({}, orgObject, carObject);
// // console.log(staff)

// class Person {
//     constructor(name) {
//       this.name = name;
//     }
//   }

//   var object = new Person("shashi");
//   console.log(object)

// (function () {
//   var message = "IIFE";
//   console.log(message);
// })();
// console.log(message); //Error: message is not defined

// const memoizAddition = () => {
//   let cache = {};
//   return (value) => {
//     if (value in cache) {
//       console.log("Fetching from cache");
//       return cache[value]; // Here, cache.value cannot be used as property name starts with the number which is not a valid JavaScript  identifier. Hence, can only be accessed using the square bracket notation.
//     } else {
//       console.log("Calculating result");
//       let result = value + 20;
//       cache[value] = result;
//       return result;
//     }
//   };
// };
// // returned function from memoizAddition
// const addition = memoizAddition();
// console.log(addition(20)); //output: 40 calculated
// console.log(addition(20)); //output: 40 cached

// let arr = [{v:3},{v:4}]
// let arr2 = [{v:1},{v:2}]

// let height = 0
// console.log(height || 100); // 100
// console.log(height ?? 100); // 0

// const car = {
//   brand: "Porsche",
//   model: {
//     year: "2024",
//   },
// };
// const year = car.model?.year;
// console.log(year);
// // '2024'
// const color = car.model?.color;
// console.log(color);
// // undefined
// const ownerName1 = car.owner?.name;
// console.log(ownerName1);
// // undefined
// const ownerName2 = car.owner.name;
// console.log(ownerName2);
// // Uncaught TypeError: Cannot read properties of undefined (reading 'name') at <anonymous>:1:11

// const originalDate = new Date(createdAt + ' UTC'); // createdAt is the dateTime in UTC format
// const istOptions = {
//   timeZone: 'Asia/Kolkata',
//   weekday: 'long',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
//   hour: 'numeric',
//   minute: 'numeric',
//   second: 'numeric'
// };
// const istCreatedAt = originalDate.toLocaleString('en-IN', istOptions);
// console.log(istDateTimeString); // Output: "Tuesday, 14 March 2024, 12:14:33 AM IST"

// const data = [
//   {
//       "Invoice no": {
//           "": "157-23-24"
//       },
//       "_id": "65e5fd3d4161f22fdd1e5dc9",
//       "storeName": "Blue fish pet shop",
//       "products": [
//           {
//               "quantity": 1,
//               "name": "1.Teen Alovera and  teen orange shampoo ",
//               "unitPrice": 7.77
//           },
//           {
//               "quantity": 1,
//               "name": "(MRP 259 50% off",
//               "unitPrice": 7.77
//           }
//       ],
//       "orderTotal": "777",
//       "orderDate": "2001-09-13T18:30:00.000Z",
//       "createdAt": "2024-03-04T16:56:29.412Z",
//       "updatedAt": "2024-03-04T16:56:29.412Z",
//       "__v": 0
//   },
//   {
//       "Invoice no": {
//           "": "167-23-24"
//       },
//       "_id": "65e5fd3d4161f22fdd1e5dcc",
//       "storeName": "Gold pet shop",
//       "products": []
//   }
// ];

// // Extract invoice numbers using map function and destructuring
// const invoiceNumbers = data.map(({ "Invoice no": invoiceNo }) => invoiceNo[""]);

// console.log("Invoice Numbers:", invoiceNumbers);

// let ob = [{"Shashikant" : 1,"Shashikant" : 22,"Shashikant" : 33},{"Aman" : 11,"Aman" : 222,"Aman" : 2222}]
// let merged = {...ob[0],...ob[1]}
// console.log(merged);    // output -  { Shashikant: 33, Aman: 2222 }

// console.log(1);
// console.log(2);
// setTimeout(() => console.log(3), 2000);
// console.log(4);

// Simulate HTTP request (Including network delay)
const getUser = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `User ${id}`;
};
// Execution
(async () => {
    let usersCount = 10;
    let benchmarkIdentifier = `sync`
   
    console.time(benchmarkIdentifier);
    for (let i = 1; i <= usersCount; i++) {
        const user = await getUser(i);
        console.log(user);
    }
    console.timeEnd(benchmarkIdentifier);
})();