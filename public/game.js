let currentPlayer = findPlayer();

function findPlayer(){
    let j = Math.floor(Math.random()*2);

    return j === 0 ? 'O' : 'X';
}

const gameBoard = Array(9).fill(null);
//macht ein 9 großes Array und füllt es mit einem leeren String

const cells = document.querySelectorAll(".Feld");
//speichert alle Sachen der Klasse Feld in cells

let currentPlayerDisplay = document.getElementById("currentPlayerIndicator");
//setzt currentPlayerDisplay auf das currentPlayerP aus dem HTML


const resetButton = document.getElementById("knopf");
//setzt die Variable resetButton auf den Knopf aus dem HTML dokument

resetButton.addEventListener('click', resetGame);
//setzt einen EventListener auf den Button welcher bei einem click die resetGame Funtkion aufruft
//resetgame() würde die Funktion sofort ausführen beim ausführen bzw. einlesen des codes

function resetGame(){
    gameBoard.fill(null);
    //füllt das Array mit nichts damit auch Sicher ist dass es leer ist

    cells.forEach(cell => cell.textContent = "");
    //setzt den Text der Felder auf einen leeren String

    currentPlayer = findPlayer();
    currentPlayerDisplay.textContent = currentPlayer;
}


cells.forEach((cell,index) => {
    cell.addEventListener('click', () => makeMove(index));
    //setzt einen Eventlistener der bei einem click auslöst und die makeMove funktion ausführt und den Index des Feldes mitkriegt
})

function makeMove(index){
    if(gameBoard[index] === null){
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        
        if(checkwin()){
            //Hier mit () da die Funktion direkt ausgeführt werden soll sobald dieser Teil gerufen wird

            alert(currentPlayer + " wins!");
            //macht ein Popup das sagt dass der Spieler gewonnen hat

        } else if(gameBoard.every(cell => cell !== null)){
            //checkt in gameBoard ob alle dinger, in diesem Fall cell dessen Inhalt ungleich null ist
            
            alert("Draw!");
        }

        else{
            currentPlayer = currentPlayer ==='X' ? 'O' : 'X';
            //checkt ob currentplayer X ist wenn ja dann O wenn nein dann X

            currentPlayerDisplay.textContent = currentPlayer;
            //ändert so dass auch angezeigt wird dass sich der momentane Spieler geändert hat, hoffentlich
        }
    }
}

function checkwin(){
    const winConditions = [
        //Horizontalen Wins
        [0,1,2], //wenn die Zelle 0 1 und 2 gefüllt sind mit der gleichen Sache, dann ist es erflogreich
        [3,4,5],
        [6,7,8],

        //vertiaklen Wins
        [0,3,6],
        [1,4,7],
        [2,5,8],

        //diagonale Wins
        [0,4,8],
        [2,4,6],

    ];

    return winConditions.some(pattern => //überprüfe ob mindestens eins davons zutrifft, durch .some festgelegt
        pattern.every(index => gameBoard[index] === currentPlayer))
        //überprüfe ob in dem Muster alle, durch .every festgelegt, Felder den selben Inhalt haben wie currentplayer
}