var scores, round_score, game_play,active_player,final_score,prev_score;

init();

function init(){
    scores=[0,0];
    round_score=0;
    prev_score=0;
    game_play=1;
    active_player=0;
    //by default the final score is 30.
    final_score=30;
    
    //to show roll and hold buttons-
    document.querySelector('.btn-roll').style.display='block';
    document.querySelector('.btn-hold').style.display='block';
    //document.querySelector('.dice').style.display='none';
    //to hide the dice rolls-
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    //to change the classes winner/active
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    //display results- 
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
}
//new game button-
document.querySelector('.btn-new').addEventListener('click',init);

//roll button-
document.querySelector('.btn-roll').addEventListener('click',function(){
   if (game_play===1){
        var dice_1= Math.floor(Math.random() * 6) + 1;
        var dice_2= Math.floor(Math.random() * 6) + 1;
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'file:///home/snaastha/4-DOM-Pig-Game-Final/dice-' + dice_1 + '.png';
        document.getElementById('dice-2').src = 'file:///home/snaastha/4-DOM-Pig-Game-Final/dice-' + dice_2 + '.png';
        if(dice_1 !== 1 && dice_2 !== 1)
        {
            round_score+=dice_1+dice_2;
            document.querySelector('#current-'+active_player).textContent=round_score;
            prev_score=round_score;
            if(prev_score===8 && round_score===8){
                score[active_player]=0;
                document.querySelector('#score-'+active_player).textContent=scores[active_player];
                next_player();
            }
            
        }
       else{
        next_player();
        }} 
});


//calling of next player-
function next_player(){
    active_player===1 ? active_player=0:active_player=1;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    round_score=0;
    document.querySelector('#dice-2').style.display='none';
    document.querySelector('#current-0').textContent='0';
    document.querySelector('#dice-1').style.display='none';
    document.querySelector('#current-1').textContent='0';
    
}

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(game_play===1){
        scores[active_player]+=round_score;
        document.querySelector('#score-'+active_player).textContent=scores[active_player];
        //to check whether or not the player has won.
        if(scores[active_player] >= final_score){
            game_play=0;
            document.querySelector('#name-'+active_player).textContent='WINNER';
            document.querySelector('player-'+active_player+'-panel').classList.remove('active');
            document.querySelector('player-'+active_player+'-panel').classList.add('winner');
            document.querySelector('.btn-roll').style.display='none';
            document.querySelector('.btn-hold').style.display='none';
        }
        else {
            next_player();
        }
    }
});

document.querySelector('#btn-final').addEventListener('click',function(){
         final_score= document.querySelector('#final_score_input').value;
         console.log(final_score);  
         document.querySelector('#final_score_input').value='Final Score';
});