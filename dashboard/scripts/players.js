var p = nodecg.Replicant('Players');

const p1Inp = document.getElementById("Player1Name");
const p2Inp = document.getElementById("Player2Name");


const p1Link = document.getElementById("Player1Link");
const p2Link = document.getElementById("Player2Link");

var pathbase = "../graphics/player.html?id=";
var p1old, p2old;

p.on("change", (newVal, oldVal) => {
    if(newVal){
        if(newVal["player1"]){
            p1Inp.value = newVal["player1"].name;
            p1old = newVal["player1"];
            p1Link.href = pathbase+newVal["player1"].id;
            p1Link.innerText = "Link para " + newVal["player1"].name;
        }
        if(newVal["player2"]){
            p2Inp.value = newVal["player2"].name;
            p2old = newVal["player1"];
            p2Link.href = pathbase+newVal["player2"].id;
            p2Link.innerText = "Link para " + newVal["player2"].name;
        }
    }
});

function save(){

    var object = {
        "player1": p1old.name != p1Inp.value ? {name:p1Inp.value, id:uuidv4()}:p1old,
        "player2": p2old.name != p2Inp.value ? {name:p2Inp.value, id:uuidv4()}:p2old,
    }

    p.value = object;
}



function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  