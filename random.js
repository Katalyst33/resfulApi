console.log('Randomizer Game');
/*

const NUmberOfOptions = 5;
let arrayOfNUmbers = [];

 /!**
  * @return {number}
  *!/
 function RandomNumbers () {
    return  Math.floor((Math.random() * 10) + 1);
}


var age ="";
var i;

for (i=0; i < NUmberOfOptions ; i++) {
    console.log(RandomNumbers(arrayOfNUmbers));
}*/

let arr = [];

do {
    let num = Math.floor(Math.random() * 200 + 1);
    arr.push(num);
    arr = arr.filter((item, index) => {
        return arr.indexOf(item) === index
    });
} while (arr.length < 3);

console.log(arr);
console.log(arr[2]);
