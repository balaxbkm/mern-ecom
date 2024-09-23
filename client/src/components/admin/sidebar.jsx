import { CommandIcon, ShoppingBasketIcon, BadgeCheckIcon, BoltIcon, LayoutDashboardIcon } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const menuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboardIcon size={21} />
    },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: <ShoppingBasketIcon size={21} />
    },
    {
        id: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <BadgeCheckIcon size={21} />
    },
    {
        id: "settings",
        label: "Settings",
        path: "/admin/settings",
        icon: <BoltIcon size={21} />
    }
];

const AdminSidebar = ({ open, setOpen }) => {
    const navigate = useNavigate();

    function SidebarMenu() {
        return (
            <>
                <nav className="mt-6 flex-col flex gap-3">
                    {menuItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer text-base text-muted-foreground hover:text-foreground hover:bg-muted" onClick={() => {
                            navigate(item.path);
                            open ? setOpen(false) : null;
                        }}>
                            {item.icon}
                            {item.label}
                        </div>
                    ))}
                </nav>
            </>
        );
    }

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex items-center gap-2 mb-5">
                                <CommandIcon />
                                Admin Panel
                            </SheetTitle>
                        </SheetHeader>
                        <SidebarMenu />
                    </div>
                </SheetContent>
            </Sheet>

            <aside className="hidden lg:flex w-64 flex-col border-r bg-background p-6">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
                    <CommandIcon />
                    <h1 className="text-xl font-medium">Admin Panel</h1>
                </div>
                <SidebarMenu />
            </aside>
        </Fragment>
    );
}

export default AdminSidebar;