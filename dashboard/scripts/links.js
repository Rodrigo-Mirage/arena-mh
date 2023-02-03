var p = nodecg.Replicant('Players');

const p1Inp = document.getElementById("Player1Link");
const p2Inp = document.getElementById("Player2Link");

var pathbase = "../graphics/player.html?id=";

p.on("change", (newVal, oldVal) => {
    if(newVal){
        if(newVal["player1"]){
            p1Inp.href = pathbase+newVal["player1"].id;
            p1Inp.innerText = newVal["player1"].name;
        }
        if(newVal["player2"]){
            p2Inp.href = pathbase+newVal["player2"].id;
            p2Inp.innerText = newVal["player2"].name;
        }
    }
});