/*
  Implementing merge sort. Will function by dividing array into sub-arrays until those can be sorted.
  Then, sub by sub, merge pairs of sorted arrays into 2x larger sorted arrays. Last step is merging
  of the remaining two sub arrays of length ~n/2.

  I really want to get comfortable writing recursive functions instead of stepping through lots of
  needless arithmetic in my code. And, I think there's a good opportunity to practice that here with
  merge sort.
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






//track run time of algorithm
let start = new Date().getTime();
let arrayOperations = 0;
let comparisons = 0;

//the actual algorithm
function mergeSort(array) {
    //handle our easiest cases
    if (array.length <= 1) {
        //is sorted by default
        return array;
    }
    //else we got work to do
    let left = [];
    let right = [];
    //divide array into left and right halves
    for (let i = 0; i < array.length; i++) {
        if (i < (array.length/2)) {
            left.push(array[i]);
            arrayOperations++;
            comparisons++;
        }
        else {
            right.push(array[i]);
            arrayOperations++;
            comparisons++;
        }
    }

    left = mergeSort(left); //recurse until hits base case
    right = mergeSort(right); //recurse until hits base case

    //once recursion bottoms out at base case, merge back through the stack
    return merge(left, right);
}

//works. merges two sorted sub arrays into one sorted array
function merge(leftArray, rightArray) {
    let result = [];

    while ((leftArray.length > 0) && (rightArray.length > 0)) {
        //append smaller of two array[0] values to result
        if (leftArray[0] < rightArray[0]) {
            result.push(leftArray[0]);
            leftArray.shift();
            arrayOperations += 2;
            comparisons++;
        } else {
            result.push(rightArray[0]);
            rightArray.shift();
            arrayOperations += 2;
            comparisons++;
        }
    }
    //once here, one array is empty other has 1 index. only one of the next loops will be entered
    while (leftArray.length > 0) {
        result.push(leftArray[0]);
        leftArray.shift();
        arrayOperations += 2;
    }
    while (rightArray.length > 0) {
        result.push(rightArray[0]);
        rightArray.shift();
        arrayOperations += 2;
    }
    return result;
}

array = mergeSort(array);

//report on how it did
let timeElapsed = new Date().getTime() - start; //time elapsed equals finish time minus start time
console.log(`Array sorted in ${timeElapsed/1000} seconds with ${arrayOperations} array operations and ${comparisons} comparisons`);
