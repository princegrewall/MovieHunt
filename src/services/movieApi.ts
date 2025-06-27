
const OMDB_API_KEY = '2c9c5ac4'; // Free API key for demonstration
const BASE_URL = 'https://www.omdbapi.com/';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Runtime?: string;
  imdbRating?: string;
  Released?: string;
  Writer?: string;
  Country?: string;
  Language?: string;
}

export const searchMovies = async (query: string, page: number = 1): Promise<{ movies: Movie[], totalResults: number }> => {
  const response = await fetch(`${BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}&type=movie`);
  const data = await response.json();
  
  if (data.Response === 'True') {
    return {
      movies: data.Search || [],
      totalResults: parseInt(data.totalResults) || 0
    };
  }
  return { movies: [], totalResults: 0 };
};

export const getMovieDetails = async (id: string): Promise<Movie | null> => {
  const response = await fetch(`${BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}&plot=full`);
  const data = await response.json();
  
  if (data.Response === 'True') {
    return data;
  }
  return null;
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  // Since OMDB doesn't have a "popular" endpoint, we'll search for some popular titles
  const popularTitles = ['Avengers', 'Batman', 'Spider-Man', 'Star Wars', 'Lord of the Rings'];
  const randomTitle = popularTitles[Math.floor(Math.random() * popularTitles.length)];
  const result = await searchMovies(randomTitle);
  return result.movies.slice(0, 8);
};
