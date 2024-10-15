import { LogOutIcon, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        // dispatch(logoutUser());
        dispatch(resetTokenAndCredentials());
        sessionStorage.clear();
        navigate('/auth/login');
    }

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
            <Button variant="outline" size="icon" className="lg:hidden sm:block" onClick={() => setOpen(true)}>
                <MenuIcon />
                <span className="sr-only"></span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow" onClick={handleLogout}>
                    <LogOutIcon />
                    Logout
                </Button>
            </div>
        </header>
    );
}

export default AdminHeader;