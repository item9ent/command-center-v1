import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  Factory,
  FileText, 
  CheckSquare, 
  AlertTriangle,
  BarChart3,
  Truck
} from "lucide-react";

export function Sidebar() {
  const navigation = [
    { name: "Command Center", href: "/", icon: LayoutDashboard },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Sales & Customers", href: "/sales", icon: Users },
    { name: "Orders & Quotes", href: "/orders", icon: ShoppingCart },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Fulfillment & Shipping", href: "/fulfillment", icon: Truck },
    { name: 'My Workstation', href: '/workstation', icon: LayoutDashboard },
    { name: 'Manufacturing', href: '/manufacturing', icon: Factory },
    { name: 'HR & Labor', href: '/hr', icon: Users },
    { name: 'CRM', href: '/crm', icon: Users },
    { name: "Documents", href: "/documents", icon: FileText },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Alerts & Approvals", href: "/alerts", icon: AlertTriangle },
    { name: "Master Data", href: "/settings", icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-6">
        <h1 className="font-semibold text-lg tracking-tight text-primary">ENHAZED OS</h1>
        <p className="text-xs text-subtle mt-1">Command Center</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border-color/10">
        <div className="flex items-center gap-3 px-3 py-2 text-sm text-subtle hover:text-text-primary cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full bg-accent-color flex items-center justify-center text-white font-semibold">
            US
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate font-medium text-text-primary">User</p>
            <p className="truncate text-xs">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
