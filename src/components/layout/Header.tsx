import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEnvironment } from '../../hooks/useEnvironment';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { info } = useEnvironment();

  return (
    <header className="header-neon">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 text-text-secondary hover:text-neon-cyan transition-colors rounded-lg hover:bg-white/[0.06]"
            onClick={onMenuToggle}
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-0.5">
            {'PeteDio Labs'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="text-lg font-bold"
                style={{
                  background: 'linear-gradient(90deg, var(--theme-accent-secondary), var(--theme-accent-primary), var(--theme-accent-tertiary), var(--theme-accent-secondary))',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.08,
                }}
                whileHover={{
                  scale: 1.2,
                  transition: { type: 'spring', stiffness: 500, damping: 15 },
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {info && info.environment !== 'prod' && (
            <div className="flex items-center gap-3">
              <span className="badge-dev text-[10px]">
                {info.environment.toUpperCase()}
              </span>
              <span className="text-xs text-text-muted hidden sm:inline">
                {info.name} v{info.version}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
