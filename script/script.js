import { scoreAchievement } from './data.js';
import { start, timeFunction } from './timelapse.js';

const firstValue = document.querySelector('.first-value');
const secondValue = document.querySelector('.second-value');
const enterValue = document.querySelector('.enter-value');
const answerSubmit = document.querySelector('.answer-submit');
const startBtn = document.querySelector('.start-test');
const levelUp = document.querySelector('.levelUpBar');
const scoreNotification = document.querySelector('.score-notification');

let score = JSON.parse(localStorage.getItem('score')) || {
    correct : 0 ,
    incorrect: 0
};

myMath();

function myMath(){

let myFirstValue;
let mySecondValue;
let interval = null;

 function randomNumber(){
     myFirstValue = Math.floor(Math.random() * 10);
     mySecondValue = Math.floor(Math.random() * 10);
    return {myFirstValue, mySecondValue};

}


function startRandom(){


startBtn.addEventListener('click', ()=>{
    let starts = start();
 setTimeout(()=>{

    clearInterval(starts.timer);

document.querySelector('.background-score').style.display = "block";

scoreNotification.style.display = "flex";

let scoreNotificationHtml = `<p class="score-notification-head">CONGRATULATION</p>
            
            <div class="score-notification-container">
                
                <div class="correct-score-notification">
                Correct:
                <span class="notif-correct">${score.correct}</span>
                </div>

                <div class="incorrect-score-notification">
                
                  Incorrect:
                <span class="notif-incorrect">${score.incorrect}</span>

                </div>
            </div>

            <div class="rank-image-notificaiton">
                    <div class="rank-image-notification-rank">RANK: <span class="rank-scoreAchievement">${scoreAchievement[score.correct].name}</span></div>

                    <div class="image-profile-rank">
                        <img class="image-profile-rank-rankimage" src="${scoreAchievement[score.correct].image}" alt="RankImage">
                    </div>
            </div>

            <button class="score-notification-button">Exit</button>
`; 

scoreNotification.innerHTML = scoreNotificationHtml;

document.querySelector('.score-notification-button').addEventListener('click', ()=>{
    localStorage.clear();
    location.reload();
});

 },60000);

    
    let randomNumbers = randomNumber();

    interval = setInterval(()=>{

    if(!interval) return;

    let firstRandom =  firstValue.textContent = Math.floor(Math.random() * 10);
    let secondRandom = secondValue.textContent = Math.floor(Math.random() * 10);

    let html =`
            <div class="first-value">
           <img class="first-number" src="image/numbers/${firstRandom}.jpg" alt="numberjpg">
        </div>

        <div class="operation">
            +
        </div>

        <div class="second-value">
           <img class="second-number" src="image/numbers/${secondRandom}.jpg" alt="numberjpg">
        </div>

    `;

    document.querySelector('.first-container-center').innerHTML = html;

}, 100);

setTimeout(()=>{

  clearInterval(interval);



  let html =`
            <div class="first-value">
           <img class="first-number" src="image/numbers/${randomNumbers.myFirstValue}.jpg" alt="numberjpg">
        </div>

        <div class="operation">
            +
        </div>

        <div class="second-value">
           <img class="second-number" src="image/numbers/${randomNumbers.mySecondValue}.jpg" alt="numberjpg">
        </div>

    `;

    document.querySelector('.first-container-center').innerHTML = html;

  interval = null;

},1000);
   
startBtn.style.display = "none";

});

}
    enterValue.addEventListener('keydown', e =>{
      if(enterValue.value !== ""){
         let notificationLetter = document.querySelector('.notification-letter');
let notification = document.querySelector('.notification');

let value = enterValue.value.trim();
         if(!value){ 
            notification.style.display = "block";
            notificationLetter.style.display = "block";
            notificationLetter.innerText=`Please enter a value or Click Start/ Remove extra spaces`; 
            setTimeout(()=>{
            notification.style.display = "none";
            notificationLetter.style.display = "none";
            },3000);
           return;}}
        if(e.key === "Enter"){
     
            answerSubmit.click();
        }
   });

   
startRandom();

submitScore();

function submitScore(){ 

let numIndex = 0;
let theBar = 0;

answerSubmit.addEventListener('click', ()=>{
    
let notificationLetter = document.querySelector('.notification-letter');
let notification = document.querySelector('.notification');

let value = enterValue.value.trim();
         if(!value){ 
            notification.style.display = "block";
            notificationLetter.style.display = "block";
            notificationLetter.innerText=`Please enter a value or Click Start/ Remove extra spaces`; 
            setTimeout(()=>{
            notification.style.display = "none";
            notificationLetter.style.display = "none";
            },3000);
           return;} 

if(theBar === 500) theBar = 0;
if(theBar === -50) theBar = 0;

numIndex = Math.max(0, Math.min(34, numIndex));
    if(enterValue.value !== ""){
  
        let totalValue = myFirstValue + mySecondValue;

  if(totalValue === Number(enterValue.value)){
  
   score.correct++;
  
  levelUp.style.width =`${theBar+=100}px`;
  
    if(score.correct % 1 === 0 && score.correct !== 0){
    numIndex++;
    
    document.querySelector('.rankImage').innerHTML =`<img style="height: 300px; width:100%; border-radius: 15px; object-fit: cover;" class="theImage" alt="NO IMAGE"src="${scoreAchievement[numIndex].image}" >`;

        document.querySelector('.foot-title-ranks').innerHTML = scoreAchievement[numIndex].name;

        document.querySelector('.story-line').innerHTML = scoreAchievement[numIndex].stories;

      
        
}
    
  }else if(totalValue !== Number(enterValue.value)){
   
    score.incorrect++;
    levelUp.style.width =`${theBar-=100}px`;
    if(score.incorrect % 1 === 0 && score.incorrect !== 0)
        numIndex--;

           if(numIndex <= 0 ) {
            numIndex = 0;
          }
         
             document.querySelector('.rankImage').innerHTML =`<img style="height: 300px; width:100%; border-radius: 15px; object-fit: cover;" class="theImage" alt="NO IMAGE" src="${scoreAchievement[numIndex].image}" >`;

             document.querySelector('.foot-title-ranks').innerHTML = scoreAchievement[numIndex].name;

             document.querySelector('.story-line').innerHTML = scoreAchievement[numIndex].stories;

}
    enterValue.value = "";     
}

localStorage.setItem('score', JSON.stringify(score));

startBtn.click();
});  
}

};







