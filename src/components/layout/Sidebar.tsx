import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Home, FileText, Search, Tag, ChevronDown, ClipboardList } from 'lucide-react';
import clsx from 'clsx';
import { useTags } from '../../hooks/useTags';
import { useEnvironment } from '../../hooks/useEnvironment';
import { adminService } from '../../services/adminService';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const { tags } = useTags();
  const { info } = useEnvironment();
  const [tagsOpen, setTagsOpen] = useState(true);
  const [draftCount, setDraftCount] = useState<number | null>(null);

  // Fetch draft count (fails silently if network-gated)
  useEffect(() => {
    adminService
      .getDrafts(1, 1)
      .then((res) => setDraftCount(res.pagination.totalElements))
      .catch(() => setDraftCount(null));
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLink = (href: string, label: string, Icon: typeof Home) => (
    <Link
      key={href}
      to={href}
      onClick={onClose}
      className={clsx(
        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
        isActive(href)
          ? 'bg-neon-cyan/15 text-neon-cyan shadow-lg shadow-neon-cyan/20'
          : 'text-text-secondary hover:bg-white/[0.06] hover:text-neon-cyan'
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 glass-panel border-r border-neon-cyan/20 z-40',
          'transition-transform duration-300 ease-in-out flex flex-col',
          open ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0'
        )}
      >
        <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
          {navLink('/', 'Home', Home)}
          {navLink('/posts', 'Blog', FileText)}
          {navLink('/search', 'Search', Search)}

          {/* Tags section */}
          {tags.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setTagsOpen(!tagsOpen)}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider hover:text-text-secondary transition-colors"
              >
                <Tag className="h-3.5 w-3.5" />
                Tags
                <ChevronDown
                  className={clsx(
                    'h-3 w-3 ml-auto transition-transform',
                    tagsOpen && 'rotate-180'
                  )}
                />
              </button>
              {tagsOpen && (
                <div className="flex flex-col gap-0.5 ml-3">
                  {tags.map((tag) => (
                    <Link
                      key={tag.id}
                      to={`/tags/${tag.slug}`}
                      onClick={onClose}
                      className={clsx(
                        'flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-all duration-200',
                        pathname === `/tags/${tag.slug}`
                          ? 'text-neon-cyan bg-neon-cyan/10'
                          : 'text-text-secondary hover:text-neon-cyan hover:bg-white/[0.04]'
                      )}
                    >
                      <span>{tag.name}</span>
                      <span className="text-xs text-text-muted">{tag.postCount}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Admin: Drafts (hidden in prod or if network-gated) */}
          {info && info.environment !== 'prod' && draftCount !== null && (
            <>
              <div className="my-3 border-t border-neon-cyan/10" />
              <Link
                to="/admin/drafts"
                onClick={onClose}
                className={clsx(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive('/admin/drafts')
                    ? 'bg-warning/15 text-warning shadow-lg shadow-warning/20'
                    : 'text-text-secondary hover:bg-white/[0.06] hover:text-warning'
                )}
              >
                <ClipboardList className="h-4 w-4" />
                Drafts
                {draftCount > 0 && (
                  <span className="ml-auto text-xs bg-warning/20 text-warning px-2 py-0.5 rounded-full">
                    {draftCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-neon-cyan/10">
          <p className="text-xs text-text-muted text-center">
            &copy; {new Date().getFullYear()} PeteDillo.com
          </p>
          <p className="text-xs text-text-muted text-center mt-1">
            This site uses anonymous session analytics. No personal data is collected.
          </p>
        </div>
      </aside>
    </>
  );
}
