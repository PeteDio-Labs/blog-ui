import { useReadingProgress } from '../../hooks/useReadingProgress';

export default function ReadingProgress() {
  const progress = useReadingProgress();

  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-0.5">
      <div
        className="h-full transition-[width] duration-100 ease-out"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, var(--theme-accent-primary), var(--theme-accent-secondary))`,
        }}
      />
    </div>
  );
}
