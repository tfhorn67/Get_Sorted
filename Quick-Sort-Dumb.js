/*
  Implementing quick sort. Works by picking a 'pivot' element about which the array will be reordered
  such that each element to the left is less than the pivot and to the right is higher than the pivot
  This process is recursively applied to the left/right sub arrays until the array is sorted.

  There are a variety of methods for picking pivot points. Obvious ones include picking
  leftmost/rightmost element. These have initial array state edge cases which cause the sort to
  approach or reach worst case performance. Common methods for vanguarding against this include
  Choosing the middle element, a random element or using the 'median of three' method. To use the
  median of three method, the first, middle, and last elements are inspected, sorted, and the median
  value is chosen for the pivot.

  For simplicity while I get familiar, I'm just going to left index for pivot. And, not going to
  worry about sorting in place because its 2019 and memory is cheap. Once I understand the algorithm
  better, I'll re-factor it to use median of three or median of medians and to sort in place.


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

//let array = [2, 5, 4, 7, 9, 10, 3, 6, 8, 1];

//track run time of algorithm
let start = new Date().getTime();
let arrayOperations = 0;
let comparisons = 0;

//the actual algorithm
function quickSort (array) {
    if (array.length <= 1) {
        //is sorted
        return array
    }
    //else we still need to do work
    pivot = array[0];
    arrayOperations++;
    let low = [];
    let high = [];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            low.push(array[i]);
            arrayOperations++;
            comparisons++;
        } else {
            high.push(array[i]);
            arrayOperations++;
            comparisons++;
        }
    }
    low.push(pivot);
    arrayOperations++;
    //recurse
    low = quickSort(low);
    high = quickSort(high);

    //once bottomed out, merge
    return merge(low, high);
}

function merge (low, high) {
    return low.concat(high);
}


array = quickSort(array);
console.log(array);
//report on how it did
let timeElapsed = new Date().getTime() - start; //time elapsed equals finish time minus start time
console.log(`Array sorted in ${timeElapsed/1000} seconds with ${arrayOperations} array operations and ${comparisons} comparisons`);
