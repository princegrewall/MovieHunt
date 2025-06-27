
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { searchMovies, getPopularMovies, Movie } from '@/services/movieApi';

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setHasSearched(false);
    } catch (error) {
      console.error('Error loading popular movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string, page: number = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setSearchQuery(query);
    setCurrentPage(page);
    setHasSearched(true);

    try {
      const { movies: searchResults, totalResults: total } = await searchMovies(query, page);
      setMovies(page === 1 ? searchResults : [...movies, ...searchResults]);
      setTotalResults(total);
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (searchQuery && !loading) {
      handleSearch(searchQuery, currentPage + 1);
    }
  };

  const hasMoreResults = hasSearched && movies.length < totalResults;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-center mb-8">
            {hasSearched ? `Search Results` : 'Discover Movies'}
          </h1>
          <SearchBar
            onSearch={(query) => handleSearch(query, 1)}
            placeholder="Search for movies..."
            className="w-full"
          />
          {hasSearched && (
            <div className="text-center mt-4">
              <p className="text-muted-foreground">
                {totalResults > 0 
                  ? `Found ${totalResults} results for "${searchQuery}"`
                  : `No results found for "${searchQuery}"`
                }
              </p>
              <Button
                variant="ghost"
                onClick={loadPopularMovies}
                className="mt-2 text-red-600 hover:text-red-700"
              >
                Show Popular Movies
              </Button>
            </div>
          )}
        </div>

        {/* Movies Grid */}
        {loading && movies.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-red-600" />
              <p className="text-muted-foreground">Loading movies...</p>
            </div>
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMoreResults && (
              <div className="text-center">
                <Button
                  onClick={loadMore}
                  disabled={loading}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    'Load More Movies'
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold mb-4">No movies found</h3>
              <p className="text-muted-foreground mb-6">
                Try searching with different keywords or browse our popular movies.
              </p>
              <Button onClick={loadPopularMovies} variant="outline">
                Show Popular Movies
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
