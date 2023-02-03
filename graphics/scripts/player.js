var p = nodecg.Replicant('Players');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const playerName = document.getElementById("PlayerName");
const shuffler = document.getElementById("shuffler");

var turn = nodecg.Replicant('ArenaTurn');

var myTurn;

turn.on("change", (newVal, oldVal) => {
    if(newVal){
        myTurn = newVal;
        verify();
    }
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


const id = urlParams.get('id');

var player;
var playerNum =0;

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
    if(myTurn == id){
        setTurn()
    }else{ 
        endTurn()
    }
}


function setTurn(){
    shuffler.classList.remove("notTurn");
    shuffler.classList.add("turn");
    var side = playerNum == 1 ? "E" : playerNum == 2 ? "D" : "";
    $('.banbtn').data("side", side );
    for(var i = 1 ; i <= 5; i++){
        if(i!= bans.E && i!=bans.D)
        {
            $('#Ban'+i).prop("disabled",false);
        }
    }
}

function endTurn(){
    shuffler.classList.add("notTurn");
    shuffler.classList.remove("turn");
    $('.banbtn').prop("disabled",true);
    $('.banbtn').data("side","");
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
}

function setBans(){
    $(".weaponSlot").removeClass("BanD");
    $(".weaponSlot").removeClass("BanE");
    $('.banbtn').prop("disabled",false);

    for(var i = 1 ; i <= 5; i++){
        if(i!= bans.E && i!=bans.D)
        {
            $('#Ban'+i).prop("disabled",true);
        }
    }

    if(bans.E!=""){
        $("#weaponSlot"+bans.E).addClass("BanE")
        $('#Ban'+bans.E).prop("disabled",true);
    }
    if(bans.D!=""){
        $("#weaponSlot"+bans.D).addClass("BanD")
        $('#Ban'+bans.D).prop("disabled",true);
    }
    turn.value = "asdfasdf";
    verify();
}