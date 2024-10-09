import { LogOutIcon, MenuIcon, SearchIcon, ShoppingCartIcon, StoreIcon, UserCogIcon } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shopMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { useEffect, useState } from "react";
import CartWrapper from "./cart-wrapper";
import { getCartItems } from "@/store/shop/cart-slice";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Label } from "../ui/label";

function MenuItems({ setOpenMenu }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    function navigateListingPage(item) {
        setOpenMenu(false);
        sessionStorage.removeItem("filters");
        const currentFilter = item.id !== "home" && item.id !== "products" && item.id !== "search" ? { category: [item.id] } : null;
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));

        location.pathname.includes("listing") && currentFilter !== null ?
            setSearchParams(new URLSearchParams(`?category=${item.id}`)) :
            navigate(item.path);
    }

    return (
        <nav className="flex flex-col lg:flex-row mb-3 lg:mb-0 lg:items-center gap-6">
            {shopMenuItems.map((menuItem, i) => <Label key={i} onClick={() => navigateListingPage(menuItem)} className="text-sm font-medium cursor-pointer">{menuItem.label}</Label>)}
        </nav>
    );
}

function CartOption({ setOpenCart, cartCount }) {
    return (
        <Button variant="ghost" size="icon" className="relative" onClick={() => setOpenCart(true)}>
            {
                cartCount > 0
                    ? <span className="absolute bg-red-600 text-white text-[9px] font-semibold w-[15px] h-[15px] flex items-center justify-center top-1 right-2.5 rounded-lg shadow" title={cartCount}>{cartCount > 9 ? "9+" : cartCount}</span>
                    : null
            }
            <ShoppingCartIcon className="w-6 h-6" />
            <span className="sr-only">User Cart</span>
        </Button>
    );
}

function UserAvatar({ user, setOpenMenu }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleNavigate(path) {
        setOpenMenu(false);
        navigate(path);
    }

    function handleLogout() {
        dispatch(logoutUser());
    }

    // console.log(user);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-black w-9 h-9 cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback className="bg-black text-white text-base font-semibold">{user?.userName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>
                    <div className="flex flex-col">
                        Logged in as {user?.userName}
                        <span className="text-xs font-medium hidden lg:block capitalize">{user?.role}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigate("/shop/account")} className="cursor-pointer">
                    <UserCogIcon className="mr-2 h-4 w-4" />
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const ShopHeader = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.shopCart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartItems(user?.id));
    }, [dispatch]);

    // console.log(cartItems);

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-5">
                <Link to={"/shop/home"} className="flex items-center gap-3">
                    <StoreIcon strokeWidth={2.5} className="h-6 w-6" />
                    <span className="text-xl font-bold">Mern <span className="text-slate-600">Ecom</span></span>
                </Link>

                <div className="flex items-center gap-3 lg:hidden">
                    <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
                        <Link to={"/shop/search"}><SearchIcon /></Link>
                        <CartOption setOpenCart={setOpenCart} cartCount={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.length : 0} />
                        <CartWrapper cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} setOpenCart={setOpenCart} />
                    </Sheet>

                    <Sheet open={openMenu} onOpenChange={setOpenMenu}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpenMenu(true)}>
                                <MenuIcon className="h-6 w-6" />
                                <span className="sr-only">Toggle Header Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 mx-w-xs">
                            <SheetHeader className="hidden">
                                <VisuallyHidden.Root>
                                    <SheetDescription>Description goes here</SheetDescription>
                                </VisuallyHidden.Root>
                            </SheetHeader>
                            <div className="flex items-center gap-3 mb-5 pb-5 border-b">
                                <UserAvatar user={user} setOpenMenu={setOpenMenu} />
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold">{user?.userName}</p>
                                    <span className="text-[11px] capitalize">{user?.role}</span>
                                </div>
                            </div>
                            <MenuItems setOpenMenu={setOpenMenu} />
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="hidden lg:flex items-center gap-5">
                    <MenuItems setOpenMenu={setOpenMenu} />
                    <Link to={"/shop/search"}><SearchIcon /></Link>
                </div>
                <div className="hidden lg:block">
                    <div className="flex items-center gap-4">
                        <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
                            <CartOption setOpenCart={setOpenCart} cartCount={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.length : 0} />
                            <CartWrapper cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} setOpenCart={setOpenCart} />
                        </Sheet>
                        <UserAvatar user={user} setOpenMenu={setOpenMenu} />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default ShopHeader;