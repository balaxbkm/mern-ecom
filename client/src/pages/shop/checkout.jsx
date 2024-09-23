import Address from "@/components/shop/address";
import cktImg from "../../assets/checkout.png";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "@/components/shop/cart-items";
import { useEffect } from "react";
import { getCartItems } from "@/store/shop/cart-slice";
import { Button } from "@/components/ui/button";

const Checkout = () => {
    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.shopCart);
    const dispatch = useDispatch();

    const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0
        ? cartItems.items.reduce((acc, item) => acc + ((item.salePrice > 0 ? item.salePrice : item.price) * item.quantity), 0)
        : 0;

    useEffect(() => {
        dispatch(getCartItems(user?.id));
    }, [dispatch]);

    console.log(cartItems);

    return (
        <div className="flex flex-col">
            <div className="relative w-full h-[160px] md:h-[360px] overflow-hidden">
                <img
                    src={cktImg}
                    alt="Image"
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="container mx-auto py-2 md:py-8">
                <div className="flex flex-col md:flex-row gap-8 p-6">
                    <Address />
                    <div className="flex flex-col gap-4 flex-1 mt-2">
                        {
                            cartItems && cartItems.items && cartItems.items.length > 0
                                ? cartItems.items.map((item, i) => <CartItems key={i} cartItem={item} />)
                                : null
                        }

                        <div className="mt-6 space-y-4 mb-6">
                            <div className="flex flex-col gap-1 items-end">
                                <span className="font-bold text-xs text-muted-foreground">Subtotal</span>
                                <span className="font-bold text-2xl">${totalCartAmount.toFixed(2)}</span>
                                <Button className="mt-3">Pay with PayPal</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;