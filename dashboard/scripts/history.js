var placar = nodecg.Replicant('ArenaPlacar');
var backup = [];

placar.on("change",(newVal,oldVal)=>{
    var html ="";
    if(newVal){
        backup = newVal;
        count = 0;
        newVal.forEach(element => {
            console.log(element);
            html += `
            <div class="arenaInfo">
                <div id="monsterPhoto" class="monsterImg ${element.slot.monster}"></div>
                <div class="monsterInfo">
                    <div id="monsterName">${element.slot.monsterName}</div>
                    <div id="weapons">
                        <div id="weapon1" class="weapon ${element.slot.weapons[0]} ${element.bans.E == 1?"BanE":""} ${element.bans.D == 1?"BanD":""}"></div>
                        <div id="weapon2" class="weapon ${element.slot.weapons[1]} ${element.bans.E == 2?"BanE":""} ${element.bans.D == 2?"BanD":""}"></div>
                        <div id="weapon3" class="weapon ${element.slot.weapons[2]} ${element.bans.E == 3?"BanE":""} ${element.bans.D == 3?"BanD":""}"></div>
                        <div id="weapon4" class="weapon ${element.slot.weapons[3]} ${element.bans.E == 4?"BanE":""} ${element.bans.D == 4?"BanD":""}"></div>
                        <div id="weapon5" class="weapon ${element.slot.weapons[4]} ${element.bans.E == 5?"BanE":""} ${element.bans.D == 5?"BanD":""}"></div>
                    </div>
                </div>
                <div id="playerPicks">
                <div id="Pick1" class="weapon ${element.slot.weapons[element.picks.E -1]}"></div>
                <div onclick="remove(${count})" class="victory victory${element.victory == 0?"E":"D"}"></div>
                <div id="Pick2" class="weapon ${element.slot.weapons[element.picks.D -1]}"></div>
                </div>
            </div>`;
            
            count++;
        });
    }

    document.getElementById("history").innerHTML = html;

})

function reset(){
    placar.value = [];
}


function remove(e){
    backup.splice(e,1);
    placar.value = backup;
}