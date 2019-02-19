let memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H',];
let memory_values = [];
let memory_tile_ids = [];
let tiles_flipped = 0;
let click_attempts = 0;
let t = 50;
let stars = 10;

// shuffle function added to prototype
Array.prototype.memory_tile_shuffle = function() {
  var i = this.length, j, temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
}

// function creates a random background color
function randomColor() {
  var color = '#'; // hexadecimal starting symbol
  var letters = ['FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF']; //Set your colors here
  color += letters[Math.floor(Math.random() * letters.length)];
  document.getElementById('memory_board').style.background = color; // Setting the random color on your div element.
}

// function creates new board
function newBoard() {
        //provides restart option
        document.getElementById("restart").addEventListener("click", function() {
          location.reload();
        });
        //timer logic
        let sTime = setInterval(function() {
          if (t != 0) {
            document.getElementById("timer").style.color = "black";
            document.getElementById("timer").style.fontWeight = "lighter";
            document.getElementById("timer").innerHTML = t + " seconds remain";
            if (t <= 10 ) {
              document.getElementById("timer").style.color = "red";
              document.getElementById("timer").style.fontWeight = "bolder";
            }
            t = t - 1;
          } else {
            t = 50;
            document.getElementById("timer").innerHTML = "0 seconds remain";
            alert("Time is up.  Press 'OK' to start next game!")
            location.reload();
          }
        }, 1000);
  randomColor();
  tiles_flipped = 0;
  click_attempts = 0;
  var output = '';
  //shuffle invocation
  memory_array.memory_tile_shuffle();
  for(var i = 0; i < memory_array.length; i++) {
    output += '<div class="card" id="tile_'+i+'"onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
}
  document.getElementById('memory_board').innerHTML = output;
}

// function of flipping and clicking
function memoryFlipTile(tile, value) {
    click_attempts++;
    if (click_attempts <= 20) {stars = 10}
      else if (click_attempts <= 25) {stars = 9; document.getElementById('star10').style.display = "none";}
      else if (click_attempts <= 30) {stars = 8; document.getElementById('star9').style.display = "none";}
      else if (click_attempts <= 35) {stars = 7; document.getElementById('star8').style.display = "none";}
      else if (click_attempts <= 40) {stars = 6; document.getElementById('star7').style.display = "none";}
      else if (click_attempts <= 45) {stars = 5; document.getElementById('star6').style.display = "none";}
      else if (click_attempts <= 50) {stars = 4; document.getElementById('star5').style.display = "none";}
      else if (click_attempts <= 55) {stars = 3; document.getElementById('star4').style.display = "none";}
      else if (click_attempts <= 60) {stars = 2; document.getElementById('star3').style.display = "none";}
      else {stars = 1; document.getElementById('star2').style.display = "none";}
      document.getElementById("move-counter").innerHTML = `Move Counter: ${click_attempts}`;
    if (memory_values.length < 2) {
      tile.style.background = '#FFF';
      tile.innerHTML = value;
      if (memory_values.length === 0) {
        memory_values.push(value);
        memory_tile_ids.push(tile.id);
      } else if (memory_values.length === 1) {
          memory_values.push(value);
          memory_tile_ids.push(tile.id);
          if (memory_values[0] === memory_values[1]) {
            memory_values = []; memory_tile_ids = [];
            tiles_flipped += 2;
          } else {
            function flip2Back() {
                var tile0 = document.getElementById(memory_tile_ids[0]);
                var tile1 = document.getElementById(memory_tile_ids[1]);
                tile0.style.background = 'black'; tile1.style.background = 'black';
                tile0.innerHTML = ''; tile1.innerHTML = '';
                memory_values = []; memory_tile_ids = [];
                }
              setTimeout(flip2Back, 700);
            }
        }
    }
    //win condition
    if (tiles_flipped === memory_array.length) {
      let modal = document.getElementById("modal");
      modal.style.display = "block";
      let modalPara = document.getElementById("modal-statement");
      modalPara.innerHTML = `<p>you have won with  ${click_attempts} click attempts (scoring ${stars} out of 10  stars) and ${t} seconds remaining!  Click on X to re-play!</p>`;
      document.getElementById("timer").style.display = "none";
      t = -1;  //timer logic hack
      document.getElementById('memory_board').innerHTML = "";
      let span = document.getElementsByClassName("close")[0];
      span.onclick = function() {
        location.reload();
      };
    }
}

newBoard();
