function withIndices(arr){
    let mod = [];
    for(i=0; i<arr.length; i++){
        mod.push([arr[i],i]);
    }

    return mod;
}

function selectionSort(arr){
    // set path array to encode path each element takes
    paths = [];

    arr = withIndices(arr);

    for(a=0; a<arr.length; a++){
        paths.push([arr[a][1]]);
    }

    for (i=0; i<arr.length-1; i++){
        let min = i;
        for (j=i+1; j<arr.length; j++){
            if (arr[j][0] <= arr[min][0]){
                min = j
            }
        }
        let temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;


        for (k=0; k<arr.length; k++){
            let id = arr[k][1]; // is the id
            paths[id].push(k);
        }
    }
    return arr;
}

function bubbleSort(arr){
    let paths = [];
    arr = withIndices(arr);
    for(a=0; a<arr.length; a++){
        paths.push([arr[a][1]]);
    }

    for(k=0; k<arr.length; k++){
        for(i=0; i<arr.length-1; i++){
            if(arr[i+1] < arr[i]){
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
            for (j=0; j<arr.length; j++){
                let id = arr[j][1]; // is the id
                paths[id].push(j);
            }
        }
    }
    console.log(paths)
    return arr; 
}


// format must be number, id -- to follow path...
// may be able to use implicit array indexing in future?
console.log(bubbleSort([4,2,1,3]))
