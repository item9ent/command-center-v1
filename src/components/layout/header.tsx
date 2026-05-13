import { Bell, Search, Menu } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="app-header glass-nav justify-between px-4 md:px-6">
      <div className="flex items-center flex-1 max-w-lg gap-2 md:gap-4">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-text-primary md:hidden hover:bg-black/5 dark:hover:bg-white/5 rounded-md"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
          <input 
            type="text" 
            placeholder="Search records, tasks, or ask AI..." 
            className="w-full bg-black/5 dark:bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-color/50 transition-shadow"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 ml-4">
        <button className="relative p-2 text-subtle hover:text-text-primary transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger-color border-2 border-bg-secondary"></span>
        </button>
      </div>
    </header>
  );
}
