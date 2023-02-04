
var p = nodecg.Replicant('Players');
var turn = nodecg.Replicant('ArenaTurn');


var banRep = nodecg.Replicant('BanVar');
var bans =
{
    E:"",
    D:""
};
banRep.on("change", (newVal, oldVal) => {
    if(newVal){
        bans = newVal;
        setBans();
    }
});


p.on("change", (newVal, oldVal) => {
    const Player1 = document.getElementById("Player1");
    const Player2 = document.getElementById("Player2");
    if(newVal){
        if(newVal["player1"]){
            Player1.value = newVal["player1"].name;
            Player1.setAttribute("data-id", newVal["player1"].id);
        }
        if(newVal["player2"]){
            Player2.value = newVal["player2"].name;
            Player2.setAttribute("data-id", newVal["player2"].id);
        }
    }
});



$('.banbtn').click(function(){
    $("#weaponSlot"+$(this).data("slot")).removeClass("BanD")
    $("#weaponSlot"+$(this).data("slot")).removeClass("BanE")
    switch($(this).data("side")){
        case "E":
            $("#weaponSlot"+$(this).data("slot")).addClass("BanE")
            break;
        case "D":
            $("#weaponSlot"+$(this).data("slot")).addClass("BanD")
            break;
    }
});

function setBans(){
    $(".weaponSlot").removeClass("BanD");
    $(".weaponSlot").removeClass("BanE");
    $('.banbtn').prop("disabled",false);
    if(bans.E!=""){
        $("#weaponSlot"+bans.E).addClass("BanE")
        $('#Ban'+bans.E).prop("disabled",true);
    }
    if(bans.D!=""){
        $("#weaponSlot"+bans.D).addClass("BanD")
        $('#Ban'+bans.D).prop("disabled",true);
    }
}

$('#reset').click(function () {
    reset();
});

function reset(){
    bans =
    {
        E:"",
        D:""
    };

    banRep.value = bans;
    div.css({marginTop: '100px'});
    var html = ``;
    html = "";
    for(var Wcount = 1;Wcount<=5;Wcount++){
        html += `<div id="weaponSlot${Wcount}" class="weaponSlot"> <div class="weaponSlotInner"> </div><div class="ban">X</div></div>`;            
    }
    $("#weapons").html(html);
    drum.html = "";
    slots = [];
    slotsRep.value = [];

}

$('#resetBans').click(function () {
    resetBans();
});

function resetBans(){

    bans =
    {
        E:"",
        D:""
    };

    banRep.value = bans;
}