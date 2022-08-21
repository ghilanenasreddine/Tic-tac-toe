let blocks=document.querySelectorAll(".block");
let playersTurn = document.querySelector(".players-turn");
let found=false;
let click=1;
let x=[];
let o=[];

let results={
    1:[0,1,2],
    2:[0,4,8],
    3:[0,3,6],
    4:[1,4,7],
    5:[2,5,8],
    6:[2,4,6],
    7:[3,4,5],
    8:[6,7,8],
}

setTimeout(player,1000,"X")


function player(turn){
    playersTurn.textContent = "player " + turn;
}


blocks.forEach((block,idx)=>{
    block.onclick = function () {
        if(click<=9){
            if (click % 2 == 0) {
                this.textContent = "O";
                this.classList.add("clicked")
                o.push(idx);
                player("X");
                checkTheWiner(o, "O")
            } else {
                this.textContent = "X";
                this.classList.add("clicked");
                x.push(idx);
                player("O");
                checkTheWiner(x, "X")
            }
            if (click == 9 && found == false) {

                playersTurn.textContent = " THERE IS NO WINNER"

                playersTurn.style.animation = "twinkle 1s infinite";
                document.getElementById("sad").play()
                setTimeout(() => {
                    location.reload()
                }, 4000)
            }
        }
        click++;
    }
});

function checkTheWiner(playerArr, player) {
    if(playerArr.length>=3){
        playerArr.sort();
        for (let value of Object.values(results)) {
            let arrValue = []
            playerArr.forEach((el1) => {
                if (value.includes(el1)) {
                    arrValue.push(el1);
                }
            })
            if (arrValue.join() === value.join()) {
                
                found = true

                playersTurn.textContent = player + " THE WINNER";
                playersTurn.style.animation ="twinkle 1s infinite";

                blocks.forEach(el=>{
                    el.style.pointerEvents="none"
                })
                
                value.forEach(el=>{
                    blocks[el].style.animation = "twinkle 1s infinite"
                })
                document.getElementById("congrat").play()
                setTimeout(() => {
                    location.reload()
                }, 4000)
            }
        }
    }
}