var p = nodecg.Replicant('Players');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const playerName = document.getElementById("PlayerName");
const shuffler = document.getElementById("shuffler");
var timer = nodecg.Replicant('timer');

var turn = nodecg.Replicant('ArenaTurn');

var myTurn;
var slots = [];

var slotsRep = nodecg.Replicant('ArenaSlots');
slotsRep.on("change", (newVal, oldVal) => {
    if(newVal){
        slots = newVal;
        setPicks();
    }
});

turn.on("change", (newVal, oldVal) => {
    if(newVal){
        myTurn = newVal;
        verify();
    }
});

timer.on("change", (newVal, oldVal) => {
    var html = "";
    if(newVal){
        html = newVal;
    }
    if(newVal===0){
        html = "HUNT BEGIN";
    }
    document.getElementById("Timer").innerHTML = html;

});

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

var pickRep = nodecg.Replicant('PickVar');
var picks =
{
    E:"",
    D:""
};
pickRep.on("change", (newVal, oldVal) => {
    if(newVal){
        picks = newVal;
        setPicks();
    }
});


const id = urlParams.get('id');

var player;
var playerNum = 0;

p.on("change", (newVal, oldVal) => {
    if(newVal){
        if(newVal["player1"].id == id){
            player = newVal["player1"].name;
            playerNum = 1;
        }
        if(newVal["player2"].id == id){
            player = newVal["player2"].name;
            playerNum = 2;
        }        


        playerName.innerText = player;

        verify();

    }
});


function verify(){
    document.getElementById("Timer").innerHTML = "";
    if(myTurn == id){
        const banElm = document.getElementById("PlayerBans");
        const pickElm = document.getElementById("PlayerPicks");
        banElm.classList = ["on"];
        pickElm.classList = ["off"];

        setTurn();
    }else{ 
        if(myTurn == "pick"){
            const banElm = document.getElementById("PlayerBans");
            const pickElm = document.getElementById("PlayerPicks");
            banElm.classList = ["off"];
            pickElm.classList = ["on"];
            
            document.getElementById("Timer").innerHTML = "Pick";

            setTurn();
        }else{
            const banElm = document.getElementById("PlayerBans");
            const pickElm = document.getElementById("PlayerPicks");
            banElm.classList = ["on"];
            pickElm.classList = ["off"];
            endTurn();
        }
    }
}


function setTurn(){
    shuffler.classList.remove("notTurn");
    shuffler.classList.add("turn");
    var side = playerNum == 1 ? "E" : playerNum == 2 ? "D" : "";
    $('.banbtn').data("side", side );
    $('.pickbtn').data("side", side );
    for(var i = 1 ; i <= 5; i++){
        if(i!= bans.E && i!=bans.D)
        {
            $('#Ban'+i).prop("disabled",false);
            $('#Pick'+i).prop("disabled",false);
        }
    }
    setPicks();
}

function endTurn(){
    shuffler.classList.add("notTurn");
    shuffler.classList.remove("turn");
    $('.banbtn').prop("disabled",true);
    $('.pickbtn').prop("disabled",true);
    $('.banbtn').data("side","");
    $('.pickbtn').data("side","");
}


$('.banbtn').click(function(){
    $("#weaponSlot"+$(this).data("slot")).removeClass("BanD")
    $("#weaponSlot"+$(this).data("slot")).removeClass("BanE")
    
    
    Ban($(this).data("slot"),$(this).data("side"));

    switch($(this).data("side")){
        case "E":
            $("#weaponSlot"+$(this).data("slot")).addClass("BanE")
            break;
        case "D":
            $("#weaponSlot"+$(this).data("slot")).addClass("BanD")
            break;
    }
});


function Ban(slot, side){
    $("#weaponSlot"+slot).removeClass("BanD");
    $("#weaponSlot"+slot).removeClass("BanE");
    bans[side] = slot;
    banRep.value = bans;
    turn.value = "none";
}

function setBans(){
    $(".weaponSlot").removeClass("BanD");
    $(".weaponSlot").removeClass("BanE");
    $('.banbtn').prop("disabled",false);
    $('.pickbtn').prop("disabled",false);

    for(var i = 1 ; i <= 5; i++){
        if(i!= bans.E && i!=bans.D)
        {
            $('#Ban'+i).prop("disabled",true);
            $('#Pick'+i).prop("disabled",true);
        }
    }

    if(bans.E!=""){
        $("#weaponSlot"+bans.E).addClass("BanE")
        $('#Ban'+bans.E).prop("disabled",true);
        $('#Pick'+bans.E).prop("disabled",true);
    }
    if(bans.D!=""){
        $("#weaponSlot"+bans.D).addClass("BanD")
        $('#Ban'+bans.D).prop("disabled",true);
        $('#Pick'+bans.D).prop("disabled",true);
    }
    verify();
}


$('.pickbtn').click(function(){
    
    PickSlot($(this).data("slot"),$(this).data("side"));

});


function PickSlot(slot, side){
    picks[side] = slot;
    pickRep.value = picks;
}


function setPicks(){
    var side = playerNum == 1 ? "E" : playerNum == 2 ? "D" : "";
    const PickWeapon = document.getElementById("PickWeapon");
    PickWeapon.classList = [];
    if(picks[side] > 0){
        PickWeapon.classList = [slots[0].weapons[picks[side]-1]];
    }
}
