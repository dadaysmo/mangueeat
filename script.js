// --- elementos do jogo ---
const player = document.getElementById('player');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score-display');
let score =0;

// --- estado do jogador ---
let playerX = 375;
const playerSpeed = 20;

// --- controle do teclado ---
document.addEventListener('keydown', function(event){
    // verifica qual tecla foi pressionada
    if (event.key == 'ArrowLeft') {
        playerX -= playerSpeed; // diminui posição X (move to left)
    } else if (event.key == 'ArrowRight') {
        playerX += playerSpeed; // aumenta posição X (move to right)
    }

    // --- limites da tela ---
    if (playerX <0) {
        playerX = 0;
    } // impede de sair pela esquerda

    if (playerX > 750) {
        playerX = 750;
    } // impede de sair pela direita

    // --- att visual position ---
    player.style.left = playerX + 'px';
});

// --- lógica dos itens ---
function createItem() {

    const newItem = document.createElement('div');
    newItem.classList.add('item');

    //calcula posição aleatória p/ aparecer
    const randomX = Math.floor(Math.random()*770);
    newItem.style.left = randomX + 'px';

    gameArea.appendChild(newItem);

    //listener p/ remover item quando queda  terminar
    newItem.addEventListener('animationend', function() {
        newItem.remove();
    })
}

// --- temporizador ---
//a cada 2s createItem será chamado
setInterval(createItem, 2000);

// --- loop de colisão principal ---
function checkCollision() {
    // coordenadas do jogador
    const playerRect = player.getBoundingClientRect();
    //seleciona todos os itens na tela
    const items = document.querySelectorAll('.item');
    //verifica coord. de cada um
    items.forEach(function(item) {
        const itemRect = item.getBoundingClientRect();
        
        const colideHorizontal = playerRect.left < itemRect.right && playerRect.right > itemRect.left;
        const colideVertical = playerRect.top < itemRect.bottom && playerRect.bottom > itemRect.top;

        if (colideHorizontal && colideVertical) {
            item.remove();

            score++;
            scoreDisplay.textContent = `Pontos: ${score}`;
        }
    });
}

setInterval(checkCollision, 50);