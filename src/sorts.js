
/**
 * best:
 * worst:
 */
function quickSort(){
    //todo
}

/**
 * best:
 * worst:
 */
function mergeSort(){
    //todo
}

function radixSort(){
    //todo
}

/**
 * best:
 * worst:
 */
export function bubbleSort(arr){
    let paths = [];
    for(let a=0; a<arr.length; a++){
        paths.push([arr[a][1]]);
    }

    for(let k=0; k<arr.length; k++){
        for(let i=0; i<arr.length-1; i++){
            if(arr[i+1] < arr[i]){
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
            for (let j=0; j<arr.length; j++){
                let id = arr[j][1]; // is the id
                paths[id].push(j);
            }
        }
    }

    return paths; 
}

/**
 * best:
 * worst:
 */
export function selectionSort(arr){
    // set path array to encode path each element takes
    let paths = [];

    for(let a=0; a<arr.length; a++){
        paths.push([arr[a][1]]);
    }

    for (let i=0; i<arr.length-1; i++){
        let min = i;
        for (let j=i+1; j<arr.length; j++){
            if (arr[j][0] <= arr[min][0]){
                min = j
            }
        }
        let temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;

        for (let k=0; k<arr.length; k++){
            let id = arr[k][1]; // is the id
            paths[id].push(k);
        }
    }
    return paths;
}

/**
 * best:
 * worst:
 */
function cocktailSort(){
    // todo
}