function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function newBoard() {
  tilesFlipped = 0;
  var output = '';
  shuffle(memoryArray);
  for (let i = 0; i < memoryArray.length; i++) {
    output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memoryArray[i]+'\')"></div>';
    }
    document.getElementsByClassName('deck').innerHTML = output;
}

function memoryFlipTile(tile, val) {
if(tile.innerHTML == "" && memoryValues.length < 2) {
  tile.style.background = '#FFF';
  tile.innerHTML = val;
  if(memoryValues.length == 0) {
    memoryValues.push(val);
    memoryTileIDs.push(tile.id);
  } else if (memoryValues.length == 1) {
    memoryValues.push(val);
    memoryTileIDs.push(tile.id);
    if(memoryValues[0] == memoryValues[1]){
      tilesFlipped += 2;
      //clear both arrays
      memoryValues = [];
      memoryTileIDs = [];
      //check to see if whole board is cleared
      if(tilesFlipped == memoryArray.length) {
        alert("board cleared...generating new board");
        document.getElementByID('deck').innerHTML = "";
        newBoard();
      }
    } else {
      function flip2Back() {
        let tile_1 = document.getElementByID(memoryTileIDs[0]);
        let tile_2 = document.getElementByID(memoryTileIDs[1]);
        tile_1.style.backgroundColor = "red";
        tile_2.style.backgroundColor = "red";
        tile_1.innerHTML = "";
        tile_2.innerHTML = "";
        //clear both arrays
        memoryValues = [];
        memoryTileIDs = [];
      }
      setTimeout(flip2Back, 700);
    }
  }
}
}

let memoryArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D']
let memoryValues = [];
let memoryTileIDs = [];
newBoard();


shuffle(memoryArray);

// ^^you have to invoke this function, not just declare it dummy;

// let x = shuffle([1, 2, 3, 4]);

const aHeading = document.querySelector('.A');
const aTextAdd = '<h2>A</h2>';
aHeading.insertAdjacentHTML('afterbegin', aTextAdd)


// const newSpan = document.createElement('span');
// newSpan.textContent = 'blahgaty blubity blue';
// document.body.appendChild(newSpan);

const mainHeading = document.querySelector('ul');

mainHeading.addEventListener('click', function () {
  console.log('The icon was clicked!');
  document.body.appendChild(newSpan);
});

const mainHeading2 = document.querySelector('.jets');
const htmlTextToAdd = '<h2>Skydiving is fun!</h2>';

mainHeading2.insertAdjacentHTML('beforeend', htmlTextToAdd);

// const cardName = document.getElementsByClassName('card');
// console.log(cardName);

const allCards = document.querySelectorAll('.card');
for( let i = 0; i < allCards.length; i++){
    console.dir(allCards[i]);
}

// DOM is globally accessible by JavaScript code using the document object
