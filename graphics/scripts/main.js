var arenas = nodecg.Replicant('ArenaList');
var slotsRep = nodecg.Replicant('ArenaSlots');
const drum = document.getElementById("slotsItens");

var data = {};

var weapons = {};

var slots = [];


var list,firstItem ,div,height ,itemHeight

arenas.on("change", (newVal, oldVal) => {

    if(newVal){
       data = newVal;
       ready();
       console.log("arenas")
    }

});

slotsRep.on("change", (newVal, oldVal) => {

    if(newVal){
        slots = newVal;
        listitens(); 
        inject()
        reroll();
    }

});


function load(){
    randomize();
    listitens();
}


function randomize(){
    slots = [];
    var clone = JSON.parse(JSON.stringify(data));
    var count = clone.arenas.length + clone.challenges.length;
    while(count > 0){
        var rand = Math.floor(Math.random() * count);
        console.log(rand)
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
    console.log(slots)
    if(slots[0]){
        if(slots[0]["weapons"]){
            slotsRep.value = slots;
            inject();
        }else{
            randomize();
        }
    }
}


function inject(){
    if(slots[0]){
        if(slots[0]["weapons"]){
            html = "";
            var Wcount= 1;
            slots[0]["weapons"].forEach(element => {
                html += `<div id="weaponSlot${Wcount}" class="weaponSlot"> <div class="weaponSlotInner ${element}"> </div><div class="ban">X</div></div>`;
                Wcount++;
            }); 
            $("#weapons").html(html);
        }else{
            randomize();
        }
    }
    else{
        html = "";
        for(var Wcount = 1;Wcount<=5;Wcount++){
            html += `<div id="weaponSlot${Wcount}" class="weaponSlot"> <div class="weaponSlotInner"> </div><div class="ban">X</div></div>`;            
        }
        $("#weapons").html(html);
    }
}

function listitens(){
    html = "";
    slots.forEach((item)=>{
        html += `<div class="slotitem ${item.type}">
        <div class="monster ${item.monster}"></div>
        <div class="type">${item.type} Quest - <spam class="number">${item.number}</spam></div>
        <div class="monsterName">${item.monsterName}</div>
        </div>`;
    })
    $("#slotsItens").html(html+html);
    
    list = $('#slots>div:first');
    firstItem = list.find('.slotitem:first');
    firstItem.clone().appendTo(list);

    div = $("#slots");
    height = div.height();
    itemHeight = firstItem.height();
    inject();
}

function spin(){
    div.stop().css({marginTop: '0px'});
    div.animate({ marginTop: `${itemHeight-height}px` }, 2000,()=>{animate_weapons(1)});
}
function reroll(){
    div.css({marginTop: '-35px'});
    spin();
}


function animate_weapons(slot){
    $("#weaponSlot"+slot).find('.weaponSlotInner:first').animate({ marginTop: `3px` }, 100,()=>{
        if(slot<5){
            animate_weapons(slot+1);
        }
    });
}

var ready = () => {
    listitens();

    $('.setTurn').click(function(){
        var id = $(this).data("id");
        turn.value = id;
    });

    $('#start').click(function () {
        div.css({marginTop: '-35px'});
        load();
       // reroll();
    });

    
    div.css({marginTop: '100px'});
    var html = ``;
    html = "";
    for(var Wcount = 1;Wcount<=5;Wcount++){
        html += `<div id="weaponSlot${Wcount}" class="weaponSlot"> <div class="weaponSlotInner"> </div><div class="ban">X</div></div>`;            
    }
    $("#weapons").html(html);
    
}