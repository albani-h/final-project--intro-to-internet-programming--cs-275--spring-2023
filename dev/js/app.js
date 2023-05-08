let input = window.prompt(`enter a number 1-100`);
let test=parseInt(input);

while(test==isNaN||test<2||parseInt(input)==isNaN){
    if(test<2||parseInt(input)==isNaN||test==isNaN){
        let newprompt= window.prompt(`invalid entry, try again`);
        input=newprompt;
        if(test=NaN||parseInt(input)>=2){
            break;
        }
    }
}
let originaltable=document.createElement(`table`);
let flippedtable=document.createElement(`table`);

function createoriginaltable(){
    let counterforogcells=1;
    for(let rowcounter=1;rowcounter<=input;rowcounter++){
        let rows= document.createElement(`tr`);
        for(let cellcounter=1;cellcounter<=input;cellcounter++){
            let datacell=document.createElement(`td`);
            let text=document.createTextNode(`${counterforogcells}`);
            rows.appendChild(datacell);
            datacell.appendChild(text);
            counterforogcells++;
        }
        originaltable.appendChild(rows);
    }
}

function createflippedtable(){
    let counterforflipped=1;
    for(let rowcounter=1;rowcounter<=input;rowcounter++){
        let rows= document.createElement(`tr`);

        for(let cellcounter=1;cellcounter<=input;cellcounter++){
            let datacell=document.createElement(`td`);
            let text=document.createTextNode(`${counterforflipped}`);
            rows.appendChild(datacell);
            datacell.appendChild(text);
            counterforflipped++;
        }
        flippedtable.appendChild(rows);
    }
}
createoriginaltable();
createflippedtable();

function swap(x1,y1,x2,y2){

    //the last row that has cells to be swapped is at row input-2
    let stoppingpointforrow=input-2;
    //meaning we have gotten to the end of the row
    let stoppingpointforcellinrow=input-1;

    //while all of the viable rows to be swapped have not been swapped
    while(x1<=stoppingpointforrow){
        let tmp= flippedtable.rows[x1].cells[y1].textContent;
        flippedtable.rows[x1].cells[y1].textContent=flippedtable.rows[x2].cells[y2].textContent;
        flippedtable.rows[x2].cells[y2].textContent=tmp;
        y1++;
        y2--;
        //if we get to the end of the row
        if(y1==stoppingpointforcellinrow){
        //goes to the next row and resets to start at the first cell of that row
            x1++;
            y1=0;
            //goes to the previous row and resets to start at the last cell of that row
            x2--;
            y2=input-1;
            //the number of times cells within a row swaps decreases by 1 with each row
            stoppingpointforcellinrow--;
        }
        //if the stopping point is reached then return and don't do any more swaps
        if(x1==stoppingpointforcellinrow&&y1==stoppingpointforcellinrow||stoppingpointforcellinrow==0){
            return;
        }
    }
}
swap(input-input,input-input,input-1,input-1,flippedtable);
function highlightdiagonal(x1,y1){
    while(x1<=input-1){
        originaltable.rows[x1].cells[y1].style.backgroundColor=`yellow`;
        flippedtable.rows[x1].cells[y1].style.backgroundColor=`yellow`;
        originaltable.rows[x1].cells[y1].style.color=`red`;
        flippedtable.rows[x1].cells[y1].style.color=`red`;
        x1++;
        y1--;
    }
}
highlightdiagonal(input-input,input-1);
document.body.appendChild(originaltable);
document.body.appendChild(flippedtable);








