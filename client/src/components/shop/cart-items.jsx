import { CircleMinusIcon, CirclePlusIcon, CircleXIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, getCartItems, updateCart } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const CartItems = ({ cartItem }) => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);
	const { toast } = useToast();

	function handleCartItemQtyUpdate(cartItem, actionType) {
		dispatch(updateCart({ userId: user.id, productId: cartItem.productId, quantity: actionType === "minus" ? cartItem.quantity - 1 : cartItem.quantity + 1 })).then(data => {
			if (data.payload.success) {
				// toast({
				// 	title: data.payload.message
				// });
			}
		})
	}

	function handleCartItemDelete(productId) {
		dispatch(deleteCartItem({ userId: user.id, productId })).then(data => {
			if (data.payload.success) {
				toast({
					title: data.payload.message
				});
			}
		});
	}

	return (
		<>
			<div className="flex items-center space-x-4">
				<img src={cartItem.image} alt={cartItem.title} className="w-14 h-14 object-cover rounded-md" />
				<div className="flex-1">
					<h3 className="text-[15px] font-semibold">{cartItem.title}</h3>
					<div className="flex items-center gap-2 mt-2">
						<Button variant="ghost" size="icon" className="w-5 h-5 rounded-full text-muted-foreground" disabled={cartItem.quantity === 1} onClick={() => handleCartItemQtyUpdate(cartItem, "minus")}>
							<CircleMinusIcon />
							<span className="sr-only">Decrease</span>
						</Button>
						<span className="text-xs font-bold">{cartItem.quantity}</span>
						<Button variant="ghost" size="icon" className="w-5 h-5 rounded-full text-muted-foreground" disabled={cartItem.quantity === cartItem.totalStock} onClick={() => handleCartItemQtyUpdate(cartItem, "plus")}>
							<CirclePlusIcon />
							<span className="sr-only">Increase</span>
						</Button>
						<Separator orientation="vertical" className="h-4" />
						<Button variant="ghost" size="icon" className="w-5 h-5 rounded-full text-muted-foreground text-red-600" onClick={() => handleCartItemDelete(cartItem.productId)}>
							<CircleXIcon />
							<span className="sr-only">Remove</span>
						</Button>
					</div>
				</div>
				<div className="flex flex-col items-end">
					<span className="text-[10px] text-muted-foreground">
						${(cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price) + " x " + cartItem.quantity}
					</span>
					<p className="text-sm font-semibold">
						${((cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price) * cartItem.quantity).toFixed(2)}
					</p>
				</div>
			</div>
			<Separator />
		</>
	)
}

export default CartItems;