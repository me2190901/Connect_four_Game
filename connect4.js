var player1=prompt("Player One:Enter Your Name, you will be Blue","Player1")
if(player1===null){
    player1="Player1";
}
var player1color='rgb(86, 151, 255)';

var player2=prompt("Player Two:Enter Your Name, you will be Red","Player2")
if(player2===null){
    player2="Player2";
}
var player2color='rgb(237, 45, 73)';


var table=$("table tr");

function returncolor(row,column){
    return table.eq(row).find("td").eq(column).find("button").css("background-color");
}

function changecolor(row,column,color){
    return table.eq(row).find("td").eq(column).find("button").css("background-color",color);
}

function checkequal(one,two,three,four){
    return (one===two && one===three && one===four && one!='rgb(128, 128, 128)' && one!=undefined)
}

function  returnbottom(column){
    for(var i=5;i>=0;i--){
        if(returncolor(i,column)==='rgb(128, 128, 128)'){
            return i;
        }
    }
}

function horizontalwin(row){
    for(var column=0;column<4;column++){
        if(checkequal(returncolor(row,column),returncolor(row,column+1),returncolor(row,column+2),returncolor(row,column+3))){
            return true;
        }
    }
}

function verticalwin(column){
    for(var row=0;row<3;row++){
        if(checkequal(returncolor(row,column),returncolor(row+1,column),returncolor(row+2,column),returncolor(row+3,column))){
            return true;
        }
    }
}

function diagonalwin(row,column){
    for(var i= -3;i<=0;i++){
        if(checkequal(returncolor(row+i,column+i),returncolor(row+i+1,column+i+1),returncolor(row+i+2,column+i+2),returncolor(row+i+3,column+i+3))){
            return true;
        }
    }
    for(var i=-3;i<=0;i++){
        if(checkequal(returncolor(row-i,column+i),returncolor(row-i-1,column+i+1),returncolor(row-i-2,column+i+2),returncolor(row-i-3,column+i+3))){
            return true;
        }
    }
}
function operation(){
    var column=$(this).closest("td").index();
    var row=returnbottom(column);
    console.log(column);
    changecolor(row,column,currentcolor);
    if(horizontalwin(row)||verticalwin(column)||diagonalwin(row,column)){
        $("button").slideUp("slow");
        $("h2").fadeOut("500");
        $("h3").fadeOut("500");
        $("h1").text(currentplayer+" has won! Press Restart to play again!")
        $("h1").css("margin-top","25%");
        $("h1").css("border","2px solid yellow");
        $(restart).html("<a href=\"connect4.html\">Restart!</a>")
        $("a:link").css("color","white");
        $("table").css("border","0px");
        $("table").css("background-color","white")
    }
    else{
        if(currentplayer===player1){
            currentplayer=player2;
            currentcolor=player2color;
            $("h3").text(player2+":it is your turn, please pick a column to drop your Red chip.")
        }
        else{
            currentplayer=player1;
            currentcolor=player1color;
            $("h3").text(player1+":it is your turn, please pick a column to drop your Blue chip.")
        }
    }
} 
var currentplayer=player1;
var currentcolor=player1color;

$("h3").text(player1+":it is your turn, please pick a column to drop your Blue chip.")

$('button').on("click",operation);

var restart=$("#b");
$(restart).click(function(){
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            changecolor(i,j,'rgb(128, 128, 128)');
        }
    }
})