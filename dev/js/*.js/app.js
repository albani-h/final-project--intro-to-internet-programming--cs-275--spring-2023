"use strict";

var input = window.prompt("enter a number 1-100");
var test = parseInt(input);
console.log(test);
while (test == isNaN || test < 2 || parseInt(input) == isNaN) {
  if (test < 2 || parseInt(input) == isNaN || test == isNaN) {
    var newprompt = window.prompt("invalid entry, try again");
    input = newprompt;
    if (test = NaN || parseInt(input) >= 2) break;
  }
}
var originaltable = document.createElement("table");
var flippedtable = document.createElement("table");
function createoriginaltable() {
  var counterforogcells = 1;
  for (var rowcounter = 1; rowcounter <= input; rowcounter++) {
    var rows = document.createElement("tr");
    for (var cellcounter = 1; cellcounter <= input; cellcounter++) {
      var datacell = document.createElement("td");
      var text = document.createTextNode("".concat(counterforogcells));
      rows.appendChild(datacell);
      datacell.appendChild(text);
      counterforogcells++;
    }
    originaltable.appendChild(rows);
  }
}
function createflippedtable() {
  var counterforflipped = 1;
  for (var rowcounter = 1; rowcounter <= input; rowcounter++) {
    var rows = document.createElement("tr");
    for (var cellcounter = 1; cellcounter <= input; cellcounter++) {
      var datacell = document.createElement("td");
      var text = document.createTextNode("".concat(counterforflipped));
      rows.appendChild(datacell);
      datacell.appendChild(text);
      counterforflipped++;
    }
    flippedtable.appendChild(rows);
  }
}
createoriginaltable();
createflippedtable();
function swap(x1, y1, x2, y2) {
  //the last row that has cells to be swapped is at row input-2
  var stoppingpointforrow = input - 2;
  //meaning we have gotten to the end of the row
  var stoppingpointforcellinrow = input - 1;

  //while all of the viable rows to be swapped have not been swapped
  while (x1 <= stoppingpointforrow) {
    var tmp = flippedtable.rows[x1].cells[y1].textContent;
    flippedtable.rows[x1].cells[y1].textContent = flippedtable.rows[x2].cells[y2].textContent;
    flippedtable.rows[x2].cells[y2].textContent = tmp;
    y1++;
    y2--;

    //if we get to the end of the row
    if (y1 == stoppingpointforcellinrow) {
      //goes to the next row and resets to start at the first cell of that row
      x1++;
      y1 = 0;
      //goes to the previous row and resets to start at the last cell of that row
      x2--;
      y2 = input - 1;
      //the number of times cells within a row swaps decreases by 1 with each row
      stoppingpointforcellinrow--;
    }

    //if the stopping point is reached
    if (x1 == stoppingpointforcellinrow && y1 == stoppingpointforcellinrow || stoppingpointforcellinrow == 0) {
      return;
    }
  }
}
swap(input - input, input - input, input - 1, input - 1, flippedtable);
function highlightdiagonal(x1, y1) {
  while (x1 <= input - 1) {
    originaltable.rows[x1].cells[y1].style.backgroundColor = "yellow";
    flippedtable.rows[x1].cells[y1].style.backgroundColor = "yellow";
    originaltable.rows[x1].cells[y1].style.color = "red";
    flippedtable.rows[x1].cells[y1].style.color = "red";
    x1++;
    y1--;
  }
}
highlightdiagonal(input - input, input - 1);
document.body.appendChild(originaltable);
document.body.appendChild(flippedtable);