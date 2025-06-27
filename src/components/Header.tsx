
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Film className="h-8 w-8 text-red-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            CineSearch
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-red-600 ${
              location.pathname === '/' ? 'text-red-600' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/movies" 
            className={`text-sm font-medium transition-colors hover:text-red-600 ${
              location.pathname === '/movies' ? 'text-red-600' : 'text-muted-foreground'
            }`}
          >
            Movies
          </Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
};

export default Header;
