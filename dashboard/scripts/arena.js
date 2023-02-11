

var p = nodecg.Replicant('Players');
var turn = nodecg.Replicant('ArenaTurn');
var banRep = nodecg.Replicant('BanVar');
var hist = nodecg.Replicant('ArenaPlacar');
var arenas = nodecg.Replicant('ArenaList');
var slotsRep = nodecg.Replicant('ArenaSlots');
var hostsVar = nodecg.Replicant('ArenaHosts');
var timer = nodecg.Replicant('timer');
var pickRep = nodecg.Replicant('PickVar');

var bans = {E:0,D:0};
var picks = {E:0,D:0};
var players = [];
var slot = [];
var data = {};
var placar = [];

var placarE = 0;
var placarD = 0;

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
    if(newVar){
        if(newVar[0]){
            slot = newVar[0];
            document.getElementById("monsterName").innerHTML = newVar[0].monsterName;
            document.getElementById("monsterPhoto").classList = ["monsterImg"];
            document.getElementById("monsterPhoto").classList.add(newVar[0].monster);
            for(var i =0;i<5;i++){
                document.getElementById("weapon"+(i+1)).classList = ["weapon"];
                if(bans.E == i+1){
                    document.getElementById("weapon"+(i+1)).classList.add("BanE");
                }
                if(bans.D == i+1){
                    document.getElementById("weapon"+(i+1)).classList.add("BanD");
                }
                document.getElementById("weapon"+(i+1)).classList.add(newVar[0].weapons[i]);
            }

        }
    }
});

p.on("change",(newVal, oldVar)=>{
    if(newVal){
        if(newVal["player1"]){
            document.getElementById("Player1Name").innerHTML= newVal["player1"].name;
            players[0] = newVal["player1"].id;
        }
        if(newVal["player2"]){
            document.getElementById("Player2Name").innerHTML= newVal["player2"].name;
            players[1] = newVal["player2"].id;
        }
    }
});

banRep.on("change",(newVal, oldVar)=>{
    if(newVal){
        bans = newVal;
        for(var i = 1 ; i<=5 ;i++){
            console.log(i)
            if(i != newVal["E"]){
                document.getElementById("weapon"+i).classList.remove("BanE");
            }else{
                document.getElementById("weapon"+newVal["E"]).classList.add("BanE");
            }
            if(i != newVal["D"]){
                document.getElementById("weapon"+i).classList.remove("BanD");                
            }else{
                document.getElementById("weapon"+newVal["D"]).classList.add("BanD");
            }
        }
    }
});


pickRep.on("change", (newVal, oldVal) => {
    if(newVal){
        picks = newVal;
        document.getElementById("Player1Weapon").classList = ["weapon"];
        document.getElementById("Player2Weapon").classList = ["weapon"];

        if(newVal.E){
            document.getElementById("Player1Weapon").classList.add(slot.weapons[newVal.E-1]);
        }
        if(newVal.D){
            document.getElementById("Player2Weapon").classList.add(slot.weapons[newVal.D-1]);
        }
    }
});


function setVictory(e){
    var placarItem = {
        slot:slot,
        bans:bans,
        picks:picks,
        victory:e
    }
    placar.push(placarItem);
    hist.value = placar;
    clearAll();
}

function setTurn(e){
    turn.value = players[e];
}

arenas.on("change", (newVal, oldVal) => {
    if(newVal){
       data = newVal;
    }
});

function clearAll(){
    slotsRep.value = [];
    banRep.value = {E:0,D:0};
    pickRep.value = {E:0,D:0};
    turn.value = "none";
    document.getElementById("monsterName").innerHTML = "";
    document.getElementById("monsterPhoto").classList = ["monsterImg"];
    for(var i =0;i<5;i++){
        document.getElementById("weapon"+(i+1)).classList = ["weapon"];
    }
    timer.value = "";
}

function pickTurn(){
    turn.value = "pick";
}

function resetTurn(){
    banRep.value = {E:0,D:0};
    pickRep.value = {E:0,D:0};
    turn.value = "none";
    timer.value = "";
}

function reroll(){
    
    banRep.value = {E:0,D:0};
    slots = [];
    var clone = JSON.parse(JSON.stringify(data));
    var count = clone.arenas.length + clone.challenges.length;
    while(count > 0){
        var rand = Math.floor(Math.random() * count);
        if(rand >= clone.arenas.length){
            rand = rand - clone.arenas.length;
            slots.push(
                {
                    type:"Challenge",
                    number:clone.challenges[rand].number,
                    monster:clone.challenges[rand].monster,
                    weapons:clone.challenges[rand].weapons,
                    monsterName:clone.challenges[rand].monsterName
                });
            clone.challenges.splice(rand, 1)
        }else{
            slots.push(
                {
                    type:"Arena",
                    number:clone.arenas[rand].number,
                    monster:clone.arenas[rand].monster,
                    weapons:clone.arenas[rand].weapons,
                    monsterName:clone.arenas[rand].monsterName
                });
            clone.arenas.splice(rand, 1);
        }
        count = clone.arenas.length + clone.challenges.length;
    }
    if(slots[0]){
        if(slots[0]["weapons"]){
            slotsRep.value = slots;
        }else{
            randomize();
        }
    }
    timer.value = "";
}

function changeHost(input){
    console.log(input)
    console.log(input.value)
    hostsVar.value = input.value;
}

hostsVar.on("change",(newVal, oldVar)=>{
    if(newVal){
        console.log(document.getElementById("Hosts"))
        document.getElementById("Hosts").value = newVal;
    }
});

function countDown(x){
    timer.value = x;
    if(x>0){
        x = x-1;
        setTimeout(()=>{
            countDown(x);
        },1000);
    }
}