var p = nodecg.Replicant('Players');

const p1Inp = document.getElementById("Player1Name");
const p2Inp = document.getElementById("Player2Name");

p.on("change", (newVal, oldVal) => {
    if(newVal){
        if(newVal["player1"]){
            p1Inp.value = newVal["player1"].name;
        }
        if(newVal["player2"]){
            p2Inp.value = newVal["player2"].name;
        }
    }
});

function save(){

    var object = {
        "player1":{name:p1Inp.value, id:uuidv4()},
        "player2":{name:p2Inp.value, id:uuidv4()},
    }

    p.value = object;
}



function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  