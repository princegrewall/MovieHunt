
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Star, Users, User, Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import StarRating from '@/components/StarRating';
import { getMovieDetails, Movie } from '@/services/movieApi';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const movieData = await getMovieDetails(id);
        if (movieData) {
          setMovie(movieData);
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        console.error('Error loading movie details:', err);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-red-600" />
            <p className="text-muted-foreground">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
            <p className="text-muted-foreground mb-6">{error || 'The requested movie could not be found.'}</p>
            <Button asChild>
              <Link to="/movies">Back to Movies</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg';
  const genres = movie.Genre && movie.Genre !== 'N/A' ? movie.Genre.split(', ') : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/movies" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Movies</span>
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={posterUrl}
                  alt={movie.Title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Basic Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.Title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                {movie.Year && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{movie.Year}</span>
                  </div>
                )}
                {movie.Runtime && movie.Runtime !== 'N/A' && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{movie.Runtime}</span>
                  </div>
                )}
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{movie.imdbRating}/10 IMDb</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="px-3 py-1">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Plot */}
            {movie.Plot && movie.Plot !== 'N/A' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Plot</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {movie.Plot}
                </p>
              </div>
            )}

            <Separator />

            {/* Cast & Crew */}
            <div className="grid md:grid-cols-2 gap-8">
              {movie.Director && movie.Director !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Director</span>
                  </h3>
                  <p className="text-muted-foreground">{movie.Director}</p>
                </div>
              )}

              {movie.Actors && movie.Actors !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Cast</span>
                  </h3>
                  <p className="text-muted-foreground">{movie.Actors}</p>
                </div>
              )}

              {movie.Writer && movie.Writer !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Writer</h3>
                  <p className="text-muted-foreground">{movie.Writer}</p>
                </div>
              )}

              {movie.Country && movie.Country !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Country</span>
                  </h3>
                  <p className="text-muted-foreground">{movie.Country}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Personal Rating */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Rate This Movie</h3>
              <StarRating movieId={movie.imdbID} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
