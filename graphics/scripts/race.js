var p = nodecg.Replicant('Players');
var hist = nodecg.Replicant('ArenaPlacar');
var slotsRep = nodecg.Replicant('ArenaSlots');
var hostsVar = nodecg.Replicant('ArenaHosts');
var pickRep = nodecg.Replicant('PickVar');


var slot = [];
var picks = [];

hist.on("change",(newVar, oldVar)=>{
        
    placarE = 0;
    placarD = 0;
    if(newVar){
        placar = newVar;
        placar.forEach(element => {
            if(element.victory == 0){
                placarE++;
            }
            if(element.victory == 1){
                placarD++;
            }
        });
    }
    document.getElementById("Player1Score").innerHTML = placarE;
    document.getElementById("Player2Score").innerHTML = placarD;
});

slotsRep.on("change",(newVar, oldVar)=>{
    document.getElementById("TargetMonster").className = "";
        
    if(newVar[0]){
        slot = newVar;
        document.getElementById("TargetMonster").className = newVar[0].monster;
    }

});

pickRep.on("change",(newVar, oldVar)=>{
    document.getElementById("Player1Weapon").classList = "playerWeapon left";
    document.getElementById("Player2Weapon").classList = "playerWeapon right";
        
    if(newVar){
        document.getElementById("Player1Weapon").classList = "playerWeapon left " + slot[0].weapons[newVar.E -1];
        document.getElementById("Player2Weapon").classList = "playerWeapon right " +slot[0].weapons[newVar.D -1];
    }
});


hostsVar.on("change",(newVar, oldVar)=>{
    document.getElementById("HostsNames").innerHTML = newVar.replace(" e ", "<br>");
});

p.on("change",(newVar, oldVar)=>{
        
    if(newVar){
        document.getElementById("Player1Name").innerHTML = newVar.player1.name;
        document.getElementById("Player2Name").innerHTML = newVar.player2.name;
        document.getElementById("Player1Image").style = `background-image: url("/assets/arena-mh/players/${newVar.player1.name}.png")`;
        document.getElementById("Player2Image").style = `background-image: url("/assets/arena-mh/players/${newVar.player2.name}.png")`;
    }
});