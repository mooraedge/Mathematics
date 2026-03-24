



let timer = null;
let isRunning = false;
let timeStart = 0;
let elapseTime = 0;


export function start(){
    if(!isRunning){
       timeStart = Date.now() - elapseTime;
        timer = setInterval(timeFunction, 10);
        isRunning = true;
      
    }


    return {timer};
}

export function timeFunction(){
let currentTime = Date.now();

elapseTime = currentTime - timeStart;


let minutes = Math.floor(elapseTime / (1000 * 60) % 60);
let seconds = Math.floor((elapseTime / 1000) % 60);
let miliSeconds = Math.floor(elapseTime % 1000 / 10);

minutes = String(minutes).padStart(2, "0");
seconds = String(seconds).padStart(2, "0");
miliSeconds = String(miliSeconds).padStart(2, "0");

document.querySelector('.time-lapse').textContent = `${minutes}:${seconds}:${miliSeconds}`;

return {seconds}
}



