import Address from "@/components/shop/address";
import cktImg from "../../assets/checkout.png";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "@/components/shop/cart-items";
import { useEffect, useState } from "react";
import { getCartItems } from "@/store/shop/cart-slice";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/store/shop/order-slice";
import { useToast } from "@/hooks/use-toast";
import { RotateCwIcon } from "lucide-react";

const Checkout = () => {
    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.shopCart);
    const { approvalUrl } = useSelector(state => state.shopOrder);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isPaymentStart, setIsPaymentStart] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();

    const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0
        ? cartItems.items.reduce((acc, item) => acc + ((item.salePrice > 0 ? item.salePrice : item.price) * item.quantity), 0)
        : 0;

    function handlePayment() {
        if (cartItems.length === 0) {
            toast({
                title: "Your cart is empty!",
                variant: "destructive"
            });
            return;
        }

        if (selectedAddress === null) {
            toast({
                title: "Please select address to proceed!",
                variant: "destructive"
            });
            return;
        }

        setBtnLoading(true);

        const orderData = {
            userId: user?.id,
            cartId: cartItems?._id,
            cartItems: cartItems.items.map(item => ({
                productId: item?.productId,
                title: item?.title,
                image: item?.image,
                price: item?.salePrice > 0 ? item?.salePrice : item?.price,
                quantity: item?.quantity
            })),
            addressInfo: {
                addressId: selectedAddress?._id,
                address: selectedAddress?.address,
                city: selectedAddress?.city,
                pincode: selectedAddress?.pincode,
                phone: selectedAddress?.phone,
                notes: selectedAddress?.notes
            },
            totalAmount: totalCartAmount,
            paymentId: "",
            payerId: "",
            paymentMethod: "paypal",
            paymentStatus: "pending",
            orderStatus: "pending"
        };

        dispatch(createOrder(orderData)).then(data => {
            console.log("Data: ", data);
            if (data.payload.success) {
                setIsPaymentStart(true);
            } else {
                setIsPaymentStart(false);
            }
        });
    }

    if (approvalUrl) {
        window.location.href = approvalUrl;
    }

    useEffect(() => {
        dispatch(getCartItems(user?.id));
    }, [dispatch]);

    // console.log(isPaymentStart);

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
                    <Address selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
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
                                <Button className="mt-3" disabled={btnLoading} onClick={handlePayment}>{btnLoading ? <><RotateCwIcon className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Pay with PayPal"}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;