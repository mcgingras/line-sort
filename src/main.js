import {selectionSort, bubbleSort} from './sorts';

let currentSort = 'selection';
var smoothing = 0.5;   // range: (0.0, 1.0), def: 0.8
var bins = 64;   // range: [16, 1024], def: 1024 - MUST be power of 2

// audio related globals
let canplay = false;
let audio  = new Audio();
let analyser, waveArray, freqArray;

window.onload = function() {
    let canvas = document.getElementById('myCanvas');
    paper.setup(canvas);
    // draw(values);
}


function withIndices(arr){
    let mod = [];
    for(let i=0; i<arr.length; i++){
        mod.push([arr[i],i]);
    }
    return mod;
}


function draw(values){
    paper.project.clear();
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

document.getElementById('js--play').addEventListener("click", playAudio);

function drawRandom(amt){
    let values = [];
    let s = '';
    for(let i = 0; i<amt; i++){
        let n = Math.floor(Math.random() * 5) + 1;
        values.push(n);
        s = s + n + ',';
    }
    
    // document.getElementById('array').value = s.substring(0, s.length-1);
    draw(s.substring(0, s.length-1));
}

function playAudio(){
    var blob = window.URL || window.webkitURL;
    let file = document.getElementById('song').files[0];
    let src = blob.createObjectURL(file);
    audio.crossOrigin = 'Anonymous'
    audio.src = src;
    audio.loop = true
    audio.controls = true
    document.body.appendChild(audio);

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();

    var source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);

    analyser.fftSize = 2*bins;
    analyser.smoothingTimeConstant = smoothing;
    let bufferLength = analyser.frequencyBinCount;
    waveArray = new Uint8Array(bufferLength);
    freqArray = new Uint8Array(bufferLength);

    source.connect(audioCtx.destination);
    canplay = true;
    audio.play();
}

function updateDrawing(){
    if(canplay){
        analyser.getByteTimeDomainData(waveArray); // Wavalength data
        analyser.getByteFrequencyData(freqArray);  // Frequency data
        function range(n){
            const scale = (num, in_min, in_max, out_min, out_max) => {
                return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            }
            return scale(n,0,256,0,5);
        }
        let waveCapped = freqArray.map((n) => range(n));
        
        drawRandom(waveCapped[20] + waveCapped[22] + waveCapped[24] + 2 );
        // draw(waveCapped.join(","));
        
    }
    window.requestAnimationFrame(updateDrawing);
    
}

updateDrawing();