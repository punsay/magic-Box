var magicBoxItems = [];

var nonDrag_drag_Map = new Map();
nonDrag_drag_Map.set("magic-box_item_1", ["magic-box_item_2", "magic-box_item_4"]);
nonDrag_drag_Map.set("magic-box_item_2", ["magic-box_item_1", "magic-box_item_3", "magic-box_item_5"]);
nonDrag_drag_Map.set("magic-box_item_3", ["magic-box_item_2", "magic-box_item_6"]);
nonDrag_drag_Map.set("magic-box_item_4", ["magic-box_item_1", "magic-box_item_5", "magic-box_item_7" ]);
nonDrag_drag_Map.set("magic-box_item_5", ["magic-box_item_2", "magic-box_item_4", "magic-box_item_6","magic-box_item_8" ]);
nonDrag_drag_Map.set("magic-box_item_6", ["magic-box_item_3", "magic-box_item_5", "magic-box_item_9" ]);
nonDrag_drag_Map.set("magic-box_item_7", ["magic-box_item_4", "magic-box_item_8"]);
nonDrag_drag_Map.set("magic-box_item_8", ["magic-box_item_7", "magic-box_item_5", "magic-box_item_9" ]);
nonDrag_drag_Map.set("magic-box_item_9", ["magic-box_item_8", "magic-box_item_6"]);

$(document).ready(function () {

    $("#magic-box_item_6").attr("draggable","true");
    $("#magic-box_item_6").attr("ondragstart","dragStart(event)");

    $("#magic-box_item_8").attr("draggable","true");
    $("#magic-box_item_8").attr("ondragstart","dragStart(event)");

    $("#magic-box_item_6").css("cursor","grab");
    $("#magic-box_item_8").css("cursor","grab");

    $("#magic-box_item_9").attr("ondrop","dragDrop(event)");
    $("#magic-box_item_9").attr("ondragover","allowDrop(event)");

});

function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragDrop(ev) {

    var data = ev.dataTransfer.getData("text");

    $("#"+data).removeAttr("draggable","true");
    $("#"+data).removeAttr("ondragstart","dragStart(event)");
    $("#"+data).css("cursor","default");

    $("#"+data).attr("ondrop","dragDrop(event)");
    $("#"+data).attr("ondragover","allowDrop(event)");

    var targetDiv = ev.target.id;
    $("#"+targetDiv).text(""+ $("#"+data).text());

    $("#"+targetDiv).removeAttr("ondrop","dragDrop(event)");
    $("#"+targetDiv).removeAttr("ondragover","allowDrop(event)");

    $(".magic-box_item span").each(function () {
        if($(this).is("[draggable]")){
            $(this).removeAttr("draggable","true");
            $(this).removeAttr("ondragstart","dragStart(event)");
            $(this).css("cursor","default");
        }
    });

    for(var i=0; i< nonDrag_drag_Map.get(data).length;i++){
        $("#"+nonDrag_drag_Map.get(data)[i]).attr("draggable","true");
        $("#"+nonDrag_drag_Map.get(data)[i]).attr("ondragstart","dragStart(event)");
        $("#"+nonDrag_drag_Map.get(data)[i]).css("cursor","grab");
    }

    $("#"+data).text("");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function getRandomInts(num) {
    var ints = [];
    while (ints.length < num-1) {
        var randNum = getRandomInt(1, 9);
        if(!(ints.indexOf(randNum) > -1)){
            ints.push(randNum);
        }
    }
    return ints;
}

$( ".magic-box_btn button" ).click(function() {

    var magicBoxItems = getRandomInts(9);

    $(".magic-box_item span").each(function (index) {
        $(this).text(magicBoxItems.pop());
    });

    $("#magic-box_item_6").attr("draggable","true");
    $("#magic-box_item_6").attr("ondragstart","dragStart(event)");

    $("#magic-box_item_8").attr("draggable","true");
    $("#magic-box_item_8").attr("ondragstart","dragStart(event)");

    $("#magic-box_item_6").css("cursor","grab");
    $("#magic-box_item_8").css("cursor","grab");

    $("#magic-box_item_9").attr("ondrop","dragDrop(event)");
    $("#magic-box_item_9").attr("ondragover","allowDrop(event)");

    $("#magic-box_item_9").text("");

});

