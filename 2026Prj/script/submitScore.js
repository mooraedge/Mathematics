
export function submitScore(){ 

let numIndex = 0;
let theBar = 0;
answerSubmit.addEventListener('click', ()=>{
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
      
           
             document.querySelector('.rankImage').innerHTML =`<img style="height: 300px; width:100%; border-radius: 15px; object-fit: cover;" class="theImage" alt="NO IMAGE" src="${scoreAchievement[numIndex].image}" >`;

             document.querySelector('.foot-title-ranks').innerHTML = scoreAchievement[numIndex].name;

             document.querySelector('.story-line').innerHTML = scoreAchievement[numIndex].stories;


  }
    enterValue.value = "";

    }

localStorage.setItem('score', JSON.stringify(score));

});  
}