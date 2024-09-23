import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItems from "./cart-items";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const CartWrapper = ({ cartItems, setOpenCart }) => {
	const navigate = useNavigate();
	// console.log(cartItems);

	const totalCartAmount = cartItems && cartItems.length > 0
		? cartItems.reduce((acc, item) => acc + ((item.salePrice > 0 ? item.salePrice : item.price) * item.quantity), 0)
		: 0;

	return (
		<SheetContent className="max-w-sm">
			<SheetHeader>
				<SheetTitle>Your Cart</SheetTitle>
			</SheetHeader>
			<div className="flex flex-col justify-between h-full">
				<ScrollArea className="mt-8 h-10/12">
					<div className="space-y-4">
						{
							cartItems && cartItems.length > 0
								? cartItems.map((item, i) => <CartItems key={i} cartItem={item} />)
								: null
						}
					</div>
				</ScrollArea>

				<div className="mt-12 space-y-4 mb-6">
					<div className="flex justify-between">
						<span className="font-bold">Total</span>
						<span className="font-bold">${totalCartAmount.toFixed(2)}</span>
					</div>
					<Button className="w-full mt-6" onClick={() => { setOpenCart(false); navigate("/shop/checkout"); }}>Checkout</Button>
				</div>
			</div>
		</SheetContent>
	)
}

export default CartWrapper;