import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/MovieDetail.css";

const API_URL = "https://www.omdbapi.com?apikey=b169cf0";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_URL}&i=${id}`);
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch (err) {
        setError("Failed to fetch movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = savedFavorites.some(fav => fav.imdbID === movie.imdbID);
    
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = savedFavorites.filter(fav => fav.imdbID !== movie.imdbID);
    } else {
      updatedFavorites = [...savedFavorites, movie];
    }
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const isFavorite = favorites.some(fav => fav.imdbID === movie?.imdbID);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="movie-detail-container">
        <ErrorMessage message={error} />
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="movie-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      
      <div className="movie-detail">
        <div className="movie-detail-poster">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"}
            alt={movie.Title}
          />
        </div>
        
        <div className="movie-detail-info">
          <div className="movie-detail-header">
            <h1>{movie.Title}</h1>
            <button
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? '❤️' : '🤍'} {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
          
          <div className="movie-detail-meta">
            <span className="meta-item">Year: {movie.Year}</span>
            <span className="meta-item">Rated: {movie.Rated}</span>
            <span className="meta-item">Runtime: {movie.Runtime}</span>
            <span className="meta-item">Genre: {movie.Genre}</span>
          </div>
          
          <div className="movie-detail-ratings">
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="ratings">
                <h3>Ratings</h3>
                {movie.Ratings.map((rating, index) => (
                  <div key={index} className="rating-item">
                    <strong>{rating.Source}:</strong> {rating.Value}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="movie-detail-plot">
            <h3>Plot</h3>
            <p>{movie.Plot}</p>
          </div>
          
          <div className="movie-detail-details">
            <div className="detail-row">
              <strong>Director:</strong> {movie.Director}
            </div>
            <div className="detail-row">
              <strong>Writer:</strong> {movie.Writer}
            </div>
            <div className="detail-row">
              <strong>Actors:</strong> {movie.Actors}
            </div>
            <div className="detail-row">
              <strong>Language:</strong> {movie.Language}
            </div>
            <div className="detail-row">
              <strong>Country:</strong> {movie.Country}
            </div>
            <div className="detail-row">
              <strong>Awards:</strong> {movie.Awards !== "N/A" ? movie.Awards : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

