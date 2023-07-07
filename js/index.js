// game constant and variables
let inputdir = {x:0,y:0};
const foodsound=new Audio('music/food.mp3');
const gameOverSound=new Audio('music/gameover.mp3');
const moveSound=new Audio('music/move.mp3');
const musicSound=new Audio("music/music.mp3")
let speed=5;
let scores=0;
let lastPaintTime=0;
let snakearr=[
    {x:13,y:15}
]
let food={x:15,y:13};

// game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return;
}
    lastPaintTime=ctime;
    gameengine();

}
function iscollide(snake){
    // if you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y ){
            return true;
        }
    }
    // if you bump into wall 
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0  )
        {
            return true;

        }
        
    
}
function gameengine(){
    // part 1 updating the snake array & food
    if(iscollide(snakearr)){
        gameOverSound.play();
        musicSound.pause();
        inputdir = {x:0,y:0};
        alert("game over , press any Enter to play again");
        snakearr=[{x:13,y:15}];
        musicSound.play();
        scores=0;

    }
    // if you have eaten the food ,increment the score and regenerate the food
    if(snakearr[0].y=== food.y && snakearr[0].x===food.x)
    {
        foodsound.play();
        scores+=1;
        if(scores> hiscore)
        {
            hiscoreval=scores;
            
            localStorage.setItem('High score:',JSON.stringify(hiscoreval));
            highscore.innerHTML=" High Score : "+hiscoreval;
            
        }
        score.innerHTML="";
        score.innerHTML="Score: "+ scores;
        snakearr.unshift({x:snakearr[0].x+inputdir.x,y:snakearr[0].y+inputdir.y});
        let a= 2;
        let b= 16;
        food={x: Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};

    }
    // moving the snake
    for (let i = snakearr.length-2; i >=0; i--) {

        
        snakearr[i+1]={...snakearr[i]};
        
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;



    //part2 display the snake and food
    //display the snake
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeelement=document.createElement('div');
        snakeelement.style.gridRowStart= e.y;
        snakeelement.style.gridColumnStart=e.x;
        if(index==0)
        {
            snakeelement.classList.add('head');
        }
        else{

            snakeelement.classList.add('snake');
        }
        
            
        board.appendChild(snakeelement);
        
        
    });
    // display the food
    foodelement=document.createElement('div');
    foodelement.style.gridRowStart= food.y;
    foodelement.style.gridColumnStart=food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);


    

}



// main logic starts here
let hiscore=localStorage.getItem('High score:');
if(hiscore===null)
{
   let  hiscoreval=0;
    localStorage.setItem('High score:',JSON.stringify(hiscoreval));

}
else{
    hiscoreval=JSON.parse(hiscore);
    highscore.innerHTML=" High Score : "+hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    musicSound.play()
    inputdir={x:0,y:1} 
    // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
           inputdir.x=0;
           inputdir.y=-1;
           break;
        case "ArrowDown":
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft":
            inputdir.x=-1;
            inputdir.y=0;
            
            break;
        case "ArrowRight":
            inputdir.x=1;
            inputdir.y=0;
           
            break;
    
       
    
        default:
            break;
    }
});

