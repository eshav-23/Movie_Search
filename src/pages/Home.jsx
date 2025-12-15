import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../search.svg";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/Home.css";

const API_URL = "http://www.omdbapi.com?apikey=b169cf0";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const searchMovies = async (title) => {
    if (!title.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No movies found");
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div className="home">
      <div className="search-section">
        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchMovies(searchTerm);
              }
            }}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => handleMovieClick(movie.imdbID)}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
          <p>Try searching for a movie title</p>
        </div>
      )}
    </div>
  );
};

export default Home;

