import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../styles/Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  const removeFavorite = (imdbID) => {
    const updatedFavorites = favorites.filter(fav => fav.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites">
      <div className="favorites-header">
        <h1>My Favorite Movies</h1>
        <p className="favorites-count">
          {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="container">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="favorite-movie-wrapper">
              <MovieCard
                movie={movie}
                onClick={() => handleMovieClick(movie.imdbID)}
              />
              <button
                className="remove-favorite-button"
                onClick={() => removeFavorite(movie.imdbID)}
                title="Remove from favorites"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Favorites Yet</h2>
          <p>Start adding movies to your favorites by clicking on them and using the favorite button!</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;

