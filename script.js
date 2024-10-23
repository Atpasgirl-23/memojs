const cards = document.querySelectorAll(".card");
let card1 = null;
let card2 = null;
let matchCount = 0;
let disable = false;

shuffleCards();

function flipCard(card) {
  if (!disable && card != card1) {
    card.classList.add("flip");
    if (!card1) {
      card1 = card;
      return;
    }
    card2 = card;
    disable = true;
    const img1 = card1.querySelector("img").src;
    const img2 = card2.querySelector("img").src;

    compareCards(img1, img2);
  }
}

function compareCards(img1, img2) {
  if (img1 == img2) {
    matchCount++;
    if (matchCount == 8) {
      setTimeout(() => {
        alert("Win!");
        shuffleCards();
        return;
      }, 1000);
    }
    card1.onclick = null;
    card2.onclick = null;
    card1 = null;
    card2 = null;
    disable = false;
    return;
  }
  setTimeout(() => {
    card1.classList.add("shake");
    card2.classList.add("shake");
  }, 400);

  setTimeout(() => {
    card1.classList.remove("flip", "shake");
    card2.classList.remove("flip", "shake");
    card1 = null;
    card2 = null;
    disable = false;
  }, 1000);
}

function shuffleCards() {
  card1 = null;
  card2 = null;
  matchCount = 0;
  disable = false;
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => {
    if (Math.random() > 0.5) {
      return 1;
    } else {
      return -1;
    }
  });

  cards.forEach((card, i) => {
    const img = card.querySelector("img");
    img.src = `./img/img-${arr[i]}.png`;
    card.classList.remove("flip");
    card.onclick = () => flipCard(card);
  });
}
