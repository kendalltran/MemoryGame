let memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H',];
let memory_values = [];
let memory_tile_ids = [];
let tiles_flipped = 0;

Array.prototype.memory_tile_shuffle = function() {
  var i = this.length, j, temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
}
function randomColor() {
  var color = '#'; // hexadecimal starting symbol
  var letters = ['FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF']; //Set your colors here
  color += letters[Math.floor(Math.random() * letters.length)];
  document.getElementById('memory_board').style.background = color; // Setting the random color on your div element.
}
function newBoard() {
  randomColor();
  tiles_flipped = 0;
  var output = '';
  memory_array.memory_tile_shuffle();
  for(var i = 0; i < memory_array.length; i++) {
    output += '<div class="card" id="tile_'+i+'"onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
}
  var timeleft = 50;
  var downloadTimer = setInterval(function(){
    document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
    timeleft -= 1;
    if(timeleft <= -1){
      clearInterval(downloadTimer);
      document.getElementById("timer").innerHTML = "time is up";
    }
  }, 1000);
  document.getElementById('memory_board').innerHTML = output;
}

function shake () {
  let card = document.querySelector(".card");
  console.log(card);
  console.log('does this display');
}
function memoryFlipTile(tile, value) {
    if (memory_values.length < 2) {
      tile.style.background = '#FFF';
      tile.innerHTML = value;
      if (memory_values.length === 0) {
        memory_values.push(value);
        memory_tile_ids.push(tile.id);
        // console.log(memory_values); console.log(memory_tile_ids);
      } else if (memory_values.length === 1) {
          memory_values.push(value);
          memory_tile_ids.push(tile.id);
          // console.log(memory_values); console.log(memory_tile_ids);
          if (memory_values[0] === memory_values[1]) {
            // alert(`you have gotten ${memory_values[0]}!`);
            memory_values = []; memory_tile_ids = [];
            tiles_flipped += 2;
          } else {
            // console.log('does not match');
            function flip2Back() {
                var tile0 = document.getElementById(memory_tile_ids[0]);
                var tile1 = document.getElementById(memory_tile_ids[1]);
                // console.log('does not match2'); console.log(tile0); console.log(tile1);
                tile0.style.background = 'black'; tile1.style.background = 'black';
                tile0.innerHTML = ''; tile1.innerHTML = '';
                // clear both arrays
                memory_values = []; memory_tile_ids = [];
                }
              setTimeout(flip2Back, 700);
            }
        }
    }
    if (tiles_flipped === memory_array.length) { //LOOK INTO THIS:  something about get/set and queues javascript vs html......
      document.getElementById('memory_board').innerHTML = "";
      setTimeout(alert('you win!'), 1400)
      newBoard();
    }
}

newBoard();
