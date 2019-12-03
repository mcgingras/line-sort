import {selectionSort, bubbleSort} from './sorts';

let currentSort = 'selection';

window.onload = function() {
    let canvas = document.getElementById('myCanvas');
    paper.setup(canvas);
}

function loadArray(){
    paper.project.clear();
    let values = document.getElementById('array').value;
    draw(values);
}

function setSort(event, sortType){
    // I really truly hate the imperative structure of this code
    const element = event.target;
    const curActive = document.querySelectorAll(".active")[0];
    curActive.className = 'smallcaps';
    element.className = "smallcaps active";
    currentSort = sortType;
    loadArray();
}


function withIndices(arr){
    let mod = [];
    for(let i=0; i<arr.length; i++){
        mod.push([arr[i],i]);
    }
    return mod;
}


function draw(values){
    let og = values.split(',');
    let valArray = withIndices(og);
    let paths;
    
    if(currentSort == 'bubble'){
        paths = bubbleSort(valArray);
    }
    else if(currentSort == "selection"){
        paths = selectionSort(valArray);
    }
     
    let colors = ['#EE4141', '#FF6C81', '#F5BF24', '#67D3BE', '#67BBEF', '#8A65AA'];
    let canvas = document.getElementById('myCanvas');
    const xStep = canvas.width/(paths[0].length-1)/2;
    const yStep = canvas.height/(og.length-1)/2;
    
    for(let i=0; i<paths.length; i++){
        let path = new paper.Path();
        path.strokeWidth = '2';
        path.strokeColor = colors[og[i]-1];

        for(let j=0; j<paths[i].length; j++){
            let p = new paper.Point(j*xStep,paths[i][j]*yStep);
            path.add(p)
        }
        // path.smooth();
    }
}

document.getElementById('js--submit').addEventListener("click", loadArray);
document.getElementById('js--selection').addEventListener("click", (e) => setSort(e,'selection'));
document.getElementById('js--bubble').addEventListener("click", (e) => setSort(e, 'bubble'));
// document.getElementById('js--merge').addEventListener("click", setSort('merge'));
// document.getElementById('js--radix').addEventListener("click", setSort('radix'));
// document.getElementById('js--quick').addEventListener("click", setSort('quick'));
// document.getElementById('js--cocktail').addEventListener("click", setSort('cocktail'));