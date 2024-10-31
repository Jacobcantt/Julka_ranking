let users = [
  { name: 'Użytkownik 1', coins: 0 },
  { name: 'Użytkownik 2', coins: 0 },
  { name: 'Użytkownik 3', coins: 0 },
  { name: 'Użytkownik 4', coins: 0 }
];

// Funkcja aktualizująca ranking
function updateRanking() {
  // Sortowanie od największej liczby monet
  users.sort((a, b) => b.coins - a.coins);
  users.forEach((user, index) => {
    const rankItem = document.querySelector(`#rank${index + 1}`);
    rankItem.querySelector('.username').textContent = user.name;
    rankItem.querySelector('.coins').textContent = user.coins;
  });
}

// Event Listener do obsługi edycji bezpośredniej
document.querySelectorAll('.rank-item').forEach((item) => {
  const usernameField = item.querySelector('.username');
  const coinsField = item.querySelector('.coins');

  // Gdy użytkownik skończy edytować nazwę i naciśnie Enter
  usernameField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      coinsField.focus();
    }
  });

  // Gdy użytkownik skończy edytować liczbę monet i naciśnie Enter
  coinsField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      coinsField.blur();
    }
  });

  // Zapisanie danych po zakończeniu edycji
  item.addEventListener('blur', () => {
    const index = item.getAttribute('data-index');
    const name = usernameField.textContent.trim();
    const coins = parseInt(coinsField.textContent.trim(), 10);

    users[index] = { name, coins: isNaN(coins) ? 0 : coins };
    updateRanking();
  }, true); // Użycie "true" zapewnia wywołanie podczas wychodzenia z pola
});

// Inicjalizacja rankingu
updateRanking();
