import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Film, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { getPopularMovies, Movie } from '@/services/movieApi';

const Index = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedMovies = async () => {
      try {
        const movies = await getPopularMovies();
        setFeaturedMovies(movies);
      } catch (error) {
        console.error('Error loading featured movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedMovies();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-red-950/20 via-background to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Film className="h-16 w-16 mx-auto mb-6 text-red-600" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
              MovieHunt
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Discover, explore, and rate your favorite movies from the world's largest movie database
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg">
              <Link to="/movies" className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Start Searching</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 rounded-lg bg-card border border-border/50">
              <Search className="h-12 w-12 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-muted-foreground">Find movies instantly with our intelligent search and auto-complete features</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-border/50">
              <Film className="h-12 w-12 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-2">Rich Details</h3>
              <p className="text-muted-foreground">Get comprehensive information about cast, crew, plot, and more</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-border/50">
              <Star className="h-12 w-12 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-2">Personal Ratings</h3>
              <p className="text-muted-foreground">Rate movies and keep track of your personal favorites</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      {!loading && featuredMovies.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Movies</h2>
              <Button asChild variant="outline">
                <Link to="/movies">View All Movies</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {featuredMovies.slice(0, 8).map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
