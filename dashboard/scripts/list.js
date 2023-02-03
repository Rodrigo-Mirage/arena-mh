var arenas = nodecg.Replicant('ArenaList');
const arenaList = document.getElementById("arenaList");

arenas.on("change", (newVal, oldVal) => {

    if(newVal){
        var html = "";

        html += "<fieldset><legend>Arenas</legend>";

        newVal.arenas.forEach(arena => {
            html += "<spam> " + arena.number;
            html += " - " + arena.monsterName;
            html += "</spam></br>";
        });
        
        html += "</fieldset><fieldset><legend>Challenges</legend>";


        newVal.challenges.forEach(arena => {
            html += "<spam>  " + arena.number;
            html += " - " + arena.monsterName;
            html += "</spam></br>";
        });

        html += "</fieldset>";


        arenaList.innerHTML = html;
    }

});

function Reload(){
    fetch('scripts/data.json')
    .then((response) => response.json())
    .then((json) => arenas.value = json);
}
