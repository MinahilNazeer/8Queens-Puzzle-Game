let queenCount = 0;
const cells = document.querySelectorAll(".cel");
const queenImg = "queen.png"; 

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const cellNumber = parseInt(cell.id.split("-")[1]);
    const row = Math.floor((cellNumber - 1) / 8);
    const col = (cellNumber - 1) % 8;
    
    if (cell.classList.contains("queen")) {
      cell.style.backgroundImage = "";
      cell.classList.remove("queen");
      queenCount = queenCount - 1;
      clearDangerZones();
    } else {
      if (cell.classList.contains("danger")) {
        alert("⚠️ Can't place queen here!");
        return;
      }
      
      cell.style.backgroundImage = `url(${queenImg})`;
      cell.style.backgroundSize = "cover";
      cell.classList.add("queen");
      queenCount = queenCount + 1;
      markDangerZones(row, col);
    }
    
    document.querySelector(".info p").textContent = queenCount + " / 8 Queens Placed";
    
    setTimeout(() => {
      checkWin();
    }, 300);
  });
});

function getCellID(row, col) {
  const cellNumber = (row * 8) + col + 1;
  return "cell-" + cellNumber;
}

function markDangerZones(row, col) {
  for (let c = 0; c <= 7; c++) {
    if (c !== col) {
      const cellId = getCellID(row, c);
      const cell = document.getElementById(cellId);
      cell.classList.add("danger");
    }
  }
  
  for (let r = 0; r <= 7; r++) {
    if (r !== row) {
      const cellId = getCellID(r, col);
      const cell = document.getElementById(cellId);
      cell.classList.add("danger");
    }
  }
  
  let r = row - 1;
  let c = col - 1;
  while (r >= 0 && c >= 0) {
    const cellId = getCellID(r, c);
    const cell = document.getElementById(cellId);
    cell.classList.add("danger");
    r = r - 1;
    c = c - 1;
  }

  r = row + 1;
  c = col + 1;
  while (r <= 7 && c <= 7) {
    const cellId = getCellID(r, c);
    const cell = document.getElementById(cellId);
    cell.classList.add("danger");
    r = r + 1;
    c = c + 1;
  }

  r = row - 1;
  c = col + 1;
  while (r >= 0 && c <= 7) {
    const cellId = getCellID(r, c);
    const cell = document.getElementById(cellId);
    cell.classList.add("danger");
    r = r - 1;
    c = c + 1;
  }

  r = row + 1;
  c = col - 1;
  while (r <= 7 && c >= 0) {
    const cellId = getCellID(r, c);
    const cell = document.getElementById(cellId);
    cell.classList.add("danger");
    r = r + 1;
    c = c - 1;
  }
}

function clearDangerZones() {
  cells.forEach(cell => {
    cell.classList.remove("danger");
  });
  
  cells.forEach(cell => {
    if (cell.classList.contains("queen")) {
      const cellNumber = parseInt(cell.id.split("-")[1]);
      const row = Math.floor((cellNumber - 1) / 8);
      const col = (cellNumber - 1) % 8;
      markDangerZones(row, col);
    }
  });
}

function checkWin() {
  if (queenCount === 8) {
    let conflicts = 0;
    
    cells.forEach(cell => {
      if (cell.classList.contains("queen") && cell.classList.contains("danger")) {
        conflicts = conflicts + 1;
      }
    });
    
    if (conflicts === 0) {
      alert("🎉 YOU WIN! All 8 Queens placed safely!");
    }
  }
}

document.getElementById("restart-btn").addEventListener("click", () => {
  cells.forEach(cell => {
    cell.style.backgroundImage = "";
    cell.classList.remove("queen");
    cell.classList.remove("danger");
  });
  queenCount = 0;
  document.querySelector(".info p").textContent = "0 / 8 Queens Placed";
});

document.getElementById("answer-btn").addEventListener("click", () => {
  cells.forEach(cell => {
    cell.style.backgroundImage = "";
    cell.classList.remove("queen");
    cell.classList.remove("danger");
  });
  queenCount = 0;
  
  const solution = [
    { row: 0, col: 0 },
    { row: 1, col: 4 },
    { row: 2, col: 7 },
    { row: 3, col: 5 },
    { row: 4, col: 2 },
    { row: 5, col: 6 },
    { row: 6, col: 1 },
    { row: 7, col: 3 }
  ];
  
  solution.forEach(pos => {
    const cellId = getCellID(pos.row, pos.col);
    const cell = document.getElementById(cellId);
    cell.style.backgroundImage = `url(${queenImg})`;
    cell.style.backgroundSize = "cover";
    cell.classList.add("queen");
    queenCount = queenCount + 1;
    markDangerZones(pos.row, pos.col);
  });
  
  document.querySelector(".info p").textContent = queenCount + " / 8 Queens Placed";
  
  setTimeout(() => {
    checkWin();
  }, 300);

});
