//Implementing selectio sort. Plan to sort in descending order.

/*
  How does insertion sort work? Sort of like the simpleton cousin of heap sort. It's a sort in place
  comparison algorithm that splits the array into two regions, one sorted, one unsorted. For sorting
  in descending order, it works by iterating over the unsorte region to find the highest unsorted
  value and moves it to the bottom of the sorted region. E.g. on an array of 1-10 unsorted: first
  pass would select 10 and move it the the righthand end of the array. Now 1-9 are unsorted and the
  right half is sorted: 10. Next pass would select 9 and move it righward, immediately left of 10.
  Rinse and repeat until the length of the unsorted region is zero. Same process for ascending order
  but sorting the low to the left instead of the high to the right.

*/

//This block just reads in and formats the array data from a .txt file
let fs = require('fs');
let array;
//read .txt file
try {
    array = fs.readFileSync('Array-Data.txt', 'utf8');
} catch(e) {
    console.log('Error:', e.stack);
}
//parse it to desired format
array = array.split(" ").map(function(item) {
    return parseInt(item, 10);
});






//log time and steps taken to sort
let start = new Date().getTime();
let stepCount = 0;
let comparisons = 0;

//The actual algorithm
let sortLength = 0;

for (let i = 0; i < array.length; i++ ) {
    //iterate through, find the highest unsorted value, capture its index
    let highIndex = 0;
    for (let j = 0; j < (array.length - sortLength); j++) {
        if (array[j] > array[highIndex]) {
            highIndex = j;
        }
        comparisons++;
    }
    //swap highest unsorted value with right most unsorted value
    let temp = array[array.length - 1 - sortLength];
    array[array.length - 1 - sortLength] = array[highIndex];
    array[highIndex] = temp;
    sortLength++;
    stepCount++;
}

let timeElapsed = new Date().getTime() - start; //time elapsed equals finish time minus start time

//report on performance
console.log(`Array sorted in ${timeElapsed/1000} seconds ${comparisons} array comparisons and ${stepCount} steps`);
