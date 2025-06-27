const OMDB_API_KEY = '2c9c5ac4'; 
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

// Static movie data
const staticMovies: Movie[] = [
  {
    imdbID: "tt0111161",
    Title: "The Shawshank Redemption",
    Year: "1994",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1489599849000-e62c6acf3b7b?w=300&h=450&fit=crop",
    Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Genre: "Drama",
    Director: "Frank Darabont",
    Actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
    Runtime: "142 min",
    imdbRating: "9.3",
    Released: "14 Oct 1994",
    Writer: "Stephen King, Frank Darabont",
    Country: "United States",
    Language: "English"
  },
  {
    imdbID: "tt0068646",
    Title: "The Godfather",
    Year: "1972",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    Plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    Genre: "Crime, Drama",
    Director: "Francis Ford Coppola",
    Actors: "Marlon Brando, Al Pacino, James Caan",
    Runtime: "175 min",
    imdbRating: "9.2",
    Released: "24 Mar 1972",
    Writer: "Mario Puzo, Francis Ford Coppola",
    Country: "United States",
    Language: "English"
  },
  {
    imdbID: "tt0468569",
    Title: "The Dark Knight",
    Year: "2008",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
    Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    Genre: "Action, Crime, Drama",
    Director: "Christopher Nolan",
    Actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    Runtime: "152 min",
    imdbRating: "9.0",
    Released: "18 Jul 2008",
    Writer: "Jonathan Nolan, Christopher Nolan",
    Country: "United States, United Kingdom",
    Language: "English"
  },
  {
    imdbID: "tt0071562",
    Title: "The Godfather Part II",
    Year: "1974",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop",
    Plot: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son Michael expands and tightens his grip on the family crime syndicate.",
    Genre: "Crime, Drama",
    Director: "Francis Ford Coppola",
    Actors: "Al Pacino, Robert Duvall, Diane Keaton",
    Runtime: "202 min",
    imdbRating: "9.0",
    Released: "20 Dec 1974",
    Writer: "Francis Ford Coppola, Mario Puzo",
    Country: "United States",
    Language: "English"
  },
  {
    imdbID: "tt0050083",
    Title: "12 Angry Men",
    Year: "1957",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
    Plot: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
    Genre: "Crime, Drama",
    Director: "Sidney Lumet",
    Actors: "Henry Fonda, Lee J. Cobb, Martin Balsam",
    Runtime: "96 min",
    imdbRating: "9.0",
    Released: "10 Jul 1957",
    Writer: "Reginald Rose",
    Country: "United States",
    Language: "English"
  },
  {
    imdbID: "tt0108052",
    Title: "Schindler's List",
    Year: "1993",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=450&fit=crop",
    Plot: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    Genre: "Biography, Drama, History",
    Director: "Steven Spielberg",
    Actors: "Liam Neeson, Ralph Fiennes, Ben Kingsley",
    Runtime: "195 min",
    imdbRating: "8.9",
    Released: "04 Feb 1994",
    Writer: "Thomas Keneally, Steven Zaillian",
    Country: "United States",
    Language: "English"
  },
  {
    imdbID: "tt0167260",
    Title: "The Lord of the Rings: The Return of the King",
    Year: "2003",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
    Plot: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    Genre: "Action, Adventure, Drama",
    Director: "Peter Jackson",
    Actors: "Elijah Wood, Viggo Mortensen, Ian McKellen",
    Runtime: "201 min",
    imdbRating: "8.9",
    Released: "17 Dec 2003",
    Writer: "J.R.R. Tolkien, Fran Walsh, Philippa Boyens, Peter Jackson",
    Country: "New Zealand, United States",
    Language: "English"
  },
  {
    imdbID: "tt0110912",
    Title: "Pulp Fiction",
    Year: "1994",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1489599849000-e62c6acf3b7b?w=300&h=450&fit=crop&q=80&auto=format",
    Plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    Genre: "Crime, Drama",
    Director: "Quentin Tarantino",
    Actors: "John Travolta, Uma Thurman, Samuel L. Jackson",
    Runtime: "154 min",
    imdbRating: "8.9",
    Released: "14 Oct 1994",
    Writer: "Quentin Tarantino, Roger Avary",
    Country: "United States",
    Language: "English"
  },
  {
    imdbID: "tt0120737",
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    Year: "2001",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop&q=80&auto=format",
    Plot: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    Genre: "Action, Adventure, Drama",
    Director: "Peter Jackson",
    Actors: "Elijah Wood, Ian McKellen, Orlando Bloom",
    Runtime: "178 min",
    imdbRating: "8.8",
    Released: "19 Dec 2001",
    Writer: "J.R.R. Tolkien, Fran Walsh, Philippa Boyens, Peter Jackson",
    Country: "New Zealand, United States",
    Language: "English"
  },
  {
    imdbID: "tt0137523",
    Title: "Fight Club",
    Year: "1999",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop&q=80&auto=format",
    Plot: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into an anarchist organization.",
    Genre: "Drama",
    Director: "David Fincher",
    Actors: "Brad Pitt, Edward Norton, Meat Loaf",
    Runtime: "139 min",
    imdbRating: "8.8",
    Released: "15 Oct 1999",
    Writer: "Chuck Palahniuk, Jim Uhls",
    Country: "United States",
    Language: "English"
  },
  {
    imdbID: "tt0080684",
    Title: "Star Wars: The Empire Strikes Back",
    Year: "1980",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop&q=80&auto=format",
    Plot: "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda.",
    Genre: "Action, Adventure, Fantasy",
    Director: "Irvin Kershner",
    Actors: "Mark Hamill, Harrison Ford, Carrie Fisher",
    Runtime: "124 min",
    imdbRating: "8.7",
    Released: "20 Jun 1980",
    Writer: "Leigh Brackett, Lawrence Kasdan, George Lucas",
    Country: "United States",
    Language: "English"
  },
  {
    imdbID: "tt0102926",
    Title: "The Silence of the Lambs",
    Year: "1991",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop&q=80&auto=format",
    Plot: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    Genre: "Crime, Drama, Thriller",
    Director: "Jonathan Demme",
    Actors: "Jodie Foster, Anthony Hopkins, Scott Glenn",
    Runtime: "118 min",
    imdbRating: "8.6",
    Released: "14 Feb 1991",
    Writer: "Thomas Harris, Ted Tally",
    Country: "United States",
    Language: "English"
  }
];


export const searchMovies = async (query: string, page: number = 1): Promise<{ movies: Movie[], totalResults: number }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Combine both Hollywood and Bollywood movies
  const allMovies = [...staticMovies];

  // Filter by title only, and ensure valid image
  const filteredMovies = allMovies.filter(movie => 
    movie.Title.toLowerCase().includes(query.toLowerCase()) &&
    movie.Poster && movie.Poster !== 'N/A'
  ).map(movie => ({
    ...movie,
    Poster: movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'
  }));
  
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
  
  return {
    movies: paginatedMovies,
    totalResults: filteredMovies.length
  };
};

export const getMovieDetails = async (id: string): Promise<Movie | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const movie = staticMovies.find(movie => movie.imdbID === id);
  return movie || null;
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return first 8 movies as "popular"
  return staticMovies.slice(0, 8);
};
