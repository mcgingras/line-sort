import {selectionSort, bubbleSort} from './sorts';

window.onload = function() {
    var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);
}

function loadArray(){
    paper.project.clear()
    let values = document.getElementById('array').value;
    let sortType = document.getElementById('sortType').value;
    draw(values, sortType);
}

/**
 * helper
 * 
 * adds indices to array so they can be tracked as paths
 * ex: [2,3,1] => [[2,1], [3,2], [1,3]]
 */
function withIndices(arr){
    let mod = [];
    for(let i=0; i<arr.length; i++){
        mod.push([arr[i],i]);
    }
    return mod;
}


function draw(values, sortType){
    let og = values.split(',');
    let valArray = withIndices(og);
    
    let paths;
    if(sortType == 'bubble'){
        paths = bubbleSort(valArray);
    }
    else if(sortType == "selection"){
        paths = selectionSort(valArray);
    }
     
    let colors = ['#EE4141', '#F5BF24', '#FF6C81', '#67D3BE', '#67BBEF', '#8A65AA'];
    for(let i=0; i<paths.length; i++){
        let path = new paper.Path();
        path.strokeWidth = '4';
        path.strokeColor = colors[og[i]-1];

        for(let j=0; j<paths[i].length; j++){
            let p = new paper.Point(j*20,(paths[i][j]+2)*20);
            path.add(p)
        }
        path.smooth();
    }
    paper.view.draw();
}

document.getElementById('js--submit').addEventListener("click", loadArray);