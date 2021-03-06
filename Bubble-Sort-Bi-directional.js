/*
Implementing two direction bubble sort. Similarly simple like insertion sort, just we'll be sorting
by rifling through two at a time instead of pulling one out and finding its place directly. Will
function similarly to one direction bubble, but instead of repeatedly making left to right pass,
it will repeatedly make left to right, then right to left passes. This should effectively solve the
directional hair-turtle problem that one direction bubble sort suffers.
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


//The actual algorithm
let sorted = false;
let loopCount = 1;
while (!sorted) { //keep repeating process until array verified as sorted
    let swapCount = 0;
    //make the left to right pass
    for (let i = loopCount; i < array.length - loopCount; i++) {
        if (array[i] > array[i+1]) {
            let temp = array[i];
            array[i] = array[i+1];
            array[i+1] = temp;
            swapCount++;
        }
    }
    //then make the right to left pass
    for (let i = array.length - loopCount; i >= loopCount; i--) {
        if (array[i] < array[i-1]) {
            let temp = array[i];
            array[i] = array[i-1];
            array[i-1] = temp;
            swapCount++;
        }
    }
    loopCount++;
    if (swapCount === 0) { //if no swaps on a pass, array must be sorted. Exit the loop
        sorted = true;
    }
}


//report on how it did
let timeElapsed = new Date().getTime() - start; //time elapsed equals finish time minus start time
console.log(`Array sorted in ${timeElapsed/1000} seconds and ${loopCount} passes.`);
