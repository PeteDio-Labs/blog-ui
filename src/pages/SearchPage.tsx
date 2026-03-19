import React, { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSearch } from '../hooks/useSearch';
import BlogList from '../components/blog/BlogList';
import Container from '../components/layout/Container';
import { Search } from 'lucide-react';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlQuery = useMemo(() => new URLSearchParams(location.search).get('q') || '', [location.search]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, results, loading, error } = useSearch();

  useEffect(() => {
    setQuery(urlQuery);
    if (inputRef.current) {
      inputRef.current.value = urlQuery;
    }
  }, [urlQuery, setQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim() || '';
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <Container className="py-12">
      <h1 className="heading-neon-primary mb-8 text-center">
        Search Posts
      </h1>
      <form onSubmit={handleSearch} className="relative w-full max-w-lg mx-auto mb-12">
        <input
          ref={inputRef}
          type="search"
          defaultValue={urlQuery}
          className="input-neon w-full pl-12"
          placeholder="Search by title or tag..."
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-blue" />
      </form>

      {query && (
        <div className="mt-8">
            <h2 className="heading-neon-secondary mb-4">
                Results for &ldquo;{query}&rdquo;
            </h2>
            <BlogList posts={results} loading={loading} error={error} />
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
