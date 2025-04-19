function addToWatchlist(movie) {
    const userId = localStorage.getItem('userId'); // Get logged-in user's ID
  
    if (!userId) {
      alert("Please log in to add to watchlist.");
      return;
    }
  
    fetch('/api/watchlist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        movie: {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          genre_ids: movie.genre_ids
        }
      })
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => console.error("Error adding to watchlist:", err));
  }
  