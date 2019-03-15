//Taking a stab at insertion sort. Sample array is random order ints 1-20.

/*
  So how should insertion sort work?

  Parse through the array, sorting it one element at a time such that eventually the whole array
  is sorted. Flow as follows:

  Working from left to right, sort each element to correct place among each index to the left
  So arr[0] is sorted by default because arrays of length 1 are always sorted.
  If arr[1] < arr[0] switch arr[1] w/ arr[0] else leave in place
  If arr[2] < arr[1] switch, repeat until process moving left until no switch needed
  Repeat with each next index until last index is sorted into place
  arr is now sorted

  So, gets pretty slow as array size grows because we're looking at O(n^2) for arr of n length.

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

//advance the frontier of the sorted domain. Zeroth index is sorted by definition. Start at 1.
for (let i = 1; i < array.length; i++) {
    let sortee = array[i]; //temp
    stepCount++;
    //loop through sorted region to find spot for sortee
    for (let j = 0; j < i; j++) {
        if (sortee < array[j]) {
            //reposition sortee
            array.splice(i, 1);
            array.splice(j, 0, sortee);
            stepCount += 3;
            break;
        }
        stepCount++;
        //Sortee is in correct spot.
    }
}

let timeElapsed = new Date().getTime() - start; //time elapsed equals finish time minus start time

console.log(`Array sorted in ${timeElapsed/1000} seconds and ${stepCount} steps`); //report on performance
