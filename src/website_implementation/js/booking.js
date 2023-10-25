// reference: https://www.youtube.com/watch?v=Kb856Ts8Bws
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// initialize ticketprice selected movie
let ticketprice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //copy selected seats into array，map through array
    //return new array of indexes
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    //calculate selectedseatscount using the length of string from JSON.
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketprice;
}

// get data from localstorage and populate ui
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); //fetches the selectedseats data stored 

    //checks if any seats were previously selected and stored in local storage.（for every seats）
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
          if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
          }
        });
    }
}
// move previously selected, set the current index option
const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

// movie select event
movieSelect.addEventListener('change', e => {
  ticketprice = +e.target.value;
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});
// initial and call the updateSelectedCount
updateSelectedCount();
