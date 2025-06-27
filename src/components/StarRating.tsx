
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  movieId: string;
  onRatingChange?: (rating: number) => void;
}

const StarRating = ({ movieId, onRatingChange }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating_${movieId}`);
    if (savedRating) {
      setRating(parseFloat(savedRating));
    }
  }, [movieId]);

  const handleRating = (newRating: number) => {
    setRating(newRating);
    localStorage.setItem(`rating_${movieId}`, newRating.toString());
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <span className="text-sm font-medium mr-2">Your Rating:</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          className="transition-colors duration-200 hover:scale-110 transform"
        >
          <Star
            className={`h-6 w-6 ${
              star <= (hoveredRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-2 text-sm text-muted-foreground">
          {rating}/5
        </span>
      )}
    </div>
  );
};

export default StarRating;
