import React from 'react';
import { Link } from 'react-router';
import Container from '../components/layout/Container';

const NotFound: React.FC = () => {
  return (
    <Container className="text-center py-16 md:py-24">
      <h1 className="text-6xl font-bold text-neon-cyan">404</h1>
      <h2 className="mt-4 heading-neon-secondary">Page Not Found</h2>
      <p className="mt-2 text-lg text-neon-body">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-8">
        <Link to="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;