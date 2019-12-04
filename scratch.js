function withIndices(arr){
    let mod = [];
    for(i=0; i<arr.length; i++){
        mod.push([arr[i],i]);
    }

    return mod;
}

function mergeSortPaths(arr){
    let paths = [];
    for(let a=0; a<arr.length; a++){
        paths.push([arr[a][1]]);
    }
    

    function mergeSort(arr){
        if(arr.length <= 1){
            return arr;
    }
    
        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);
    
        return merge(mergeSort(left), mergeSort(right));
    }
    
    function merge(left, right){
        let mergedArr = [];
        let l = 0; // index of left
        let r = 0; // index of right
    
        while(l < left.length && r < right.length){
            if(left[l] < right[r]){
                mergedArr.push(left[l]);
                paths[left[l][1]].push(l+r);
                l++;
            }
            else{
                mergedArr.push(right[r]);
                paths[right[l][1]].push(l+r);
                r++;
            }
        }
    
        return mergedArr.concat(left.slice(l)).concat(right.slice(r));
    }

    console.log(paths);
    return mergeSort(arr);
}






// format must be number, id -- to follow path...
// may be able to use implicit array indexing in future?
const values = withIndices([4,2,1,3]);
console.log(mergeSortPaths(values))
