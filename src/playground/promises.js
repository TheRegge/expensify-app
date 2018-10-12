const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({name: 'regis', age: 48});
        reject('Something went wrong');
    }, 1500)
    // long running task here
});
console.log('before');
promise.then((data) => {
    console.log(data);
}).catch((error) => {
    console.log('error: ', error);
});
console.log('after');