var p = nodecg.Replicant('Players');

p.on("change",(newVar, oldVar)=>{
        
    if(newVar){
        document.getElementById("Player1Name").innerHTML = newVar.player1.name;
        document.getElementById("Player2Name").innerHTML = newVar.player2.name;
        document.getElementById("Player1Image").style = `background-image: url("/assets/arena-mh/players/${newVar.player1.name}.png")`;
        document.getElementById("Player2Image").style = `background-image: url("/assets/arena-mh/players/${newVar.player2.name}.png")`;
    }
});