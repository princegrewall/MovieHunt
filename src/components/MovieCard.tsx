
import { Link } from 'react-router-dom';
import { Calendar, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Movie } from '@/services/movieApi';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg';

  return (
    <Link to={`/movies/${movie.imdbID}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 bg-card border-border/50">
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-red-600 transition-colors">
            {movie.Title}
          </h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{movie.Year}</span>
            </div>
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{movie.imdbRating}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
