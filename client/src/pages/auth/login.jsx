import RenderForm from "@/components/common/render-form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
    email: "",
    password: ""
};

const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(e) {
        e.preventDefault();
        dispatch(loginUser(formData)).then((data) => {
            console.log(data);

            if (data?.payload?.success) {
                toast({
                    title: "Success!",
                    description: data?.payload?.message,
                });
            } else {
                toast({
                    title: "Error!",
                    description: data?.payload?.message,
                    variant: "destructive"
                });
            }
        });
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign In</h1>
                <p className="mt-2">Don't have an account?
                    <Link to="/auth/register" className="font-medium text-primary hover:underline ml-2">Sign Up</Link>
                </p>
                <RenderForm
                    formControls={loginFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                    buttonText={"Sign In"}
                />
            </div>
        </div>
    );
}

export default Login;