var arenas = nodecg.Replicant('ArenaList');
const arenaList = document.getElementById("arenaList");

arenas.on("change", (newVal, oldVal) => {

    if(newVal){
        var html = "";

        html += "<fieldset><legend>Arenas</legend>";

        newVal.arenas.forEach(arena => {
            html += "<div class='arenaItem'>";

            html += "<spam> " + arena.number;
            html += " - " + arena.monsterName;
            html += "</spam>";

            html += "<div class='weapons'>";
                html += `<div class='mini-weapon ${arena.weapons[0]}'></div>`;
                html += `<div class='mini-weapon ${arena.weapons[1]}'></div>`;
                html += `<div class='mini-weapon ${arena.weapons[2]}'></div>`;
                html += `<div class='mini-weapon ${arena.weapons[3]}'></div>`;
                html += `<div class='mini-weapon ${arena.weapons[4]}'></div>`;
            html += "</div>";

            html += "</div>";
        });
        
        html += "</fieldset><fieldset><legend>Challenges</legend>";


        newVal.challenges.forEach(arena => {
            html += "<div class='arenaItem'>";
            html += "<spam>  " + arena.number;
            html += " - " + arena.monsterName;
            html += "</spam>";

            html += "<div class='weapons'>";
                html += `<div class='mini-weapon ${arena.weapons[0]}'></div>`;
                html += `<div class='mini-weapon ${arena.weapons[1]}'></div>`;
                html += `<div class='mini-weapon ${arena.weapons[2]}'></div>`;
                html += `<div class='mini-weapon ${arena.weapons[3]}'></div>`;
                html += `<div class='mini-weapon ${arena.weapons[4]}'></div>`;
            html += "</div>";

            html += "</div>";
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
