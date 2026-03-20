import React from 'react';
import { Link } from 'react-router';

const NotFound: React.FC = () => {
  return (
    <div className="text-center py-16 md:py-24">
      <h1 className="text-6xl font-bold text-neon-cyan">404</h1>
      <h2 className="mt-4 heading-neon-secondary">Page Not Found</h2>
      <p className="mt-2 text-lg text-text-primary">
        Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.
      </p>
      <div className="mt-8">
        <Link to="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
