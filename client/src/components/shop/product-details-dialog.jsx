import { SendHorizonalIcon, StarHalfIcon, StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { setProductDetails } from "@/store/shop/products-slice";

const ProductDetailsDialog = ({ openDetails, setOpenDetails, productDetails, handleAddToCart }) => {
    const dispatch = useDispatch();

    function handleDialogClose() {
        dispatch(setProductDetails());
        setOpenDetails(false);
    }

    return (
        <Dialog open={openDetails} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] rounded-lg">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={500}
                        height={500}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="grid gap-6 py-4">
                    <div>
                        <div className="flex gap-2 items-center mb-1">
                            <span className="text-xs text-muted-foreground capitalize">{productDetails?.brand}</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-lg"></span>
                            <span className="text-xs text-muted-foreground capitalize">{productDetails?.category}</span>
                        </div>
                        <DialogHeader className="text-left">
                            <DialogTitle>
                                <h1 className="text-xl md:text-2xl font-extrabold">{productDetails?.title}</h1>
                            </DialogTitle>
                            <DialogDescription>
                                <ScrollArea className={`${productDetails?.description.length > 200 ? "h-36 pr-2 mb-3" : "pr-2 mb-3"}`}>
                                    <p className="text-muted-foreground text-sm md:text-base">{productDetails?.description}</p>
                                </ScrollArea>
                            </DialogDescription>
                        </DialogHeader>
                        {
                            productDetails?.totalStock !== 0 &&
                            <div className="flex gap-2 items-center mb-3">
                                <span className={`${productDetails?.salePrice > 0 ? "line-through text-lg text-muted-foreground" : "text-xl text-green-600"} font-bold`}>${productDetails?.price}</span>
                                {productDetails?.salePrice > 0 && <span className="text-xl font-bold text-green-600">${productDetails?.salePrice}</span>}
                            </div>
                        }

                        <div className="flex items-center gap-2 mb-5">
                            <div className="flex items-center gap-0.5">
                                <StarIcon className="w-4 h-4 fill-primary" />
                                <StarIcon className="w-4 h-4 fill-primary" />
                                <StarIcon className="w-4 h-4 fill-primary" />
                                <StarIcon className="w-4 h-4 fill-primary" />
                                <StarHalfIcon className="w-4 h-4 fill-primary" />
                            </div>
                            <span className="text-muted-foreground text-[12px]">(4.5)</span>
                        </div>

                        {
                            productDetails?.totalStock !== 0 &&
                            <div className="mb-5">
                                <div className="flex items-center gap-2 w-full">
                                    <Button className="text-sm w-full" onClick={() => handleAddToCart(productDetails?._id)}>Add to cart</Button>
                                    {/* <Button className="text-sm w-full" disabled>Buy now</Button> */}
                                </div>
                            </div>
                        }
                        <Separator className="mb-3 md:mb-4" />
                        <div className="max-h-[300px] overflow-auto">
                            <h2 className="text-sm md:text-base font-bold mb-3">Reviews</h2>
                            <div className="grid gap-6">

                                <div className="flex gap-1.5">
                                    <Avatar className="w-5 h-5 border">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback className="text-[9px] font-bold">B</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xs font-semibold">Bala Krishnan</h3>
                                            <span className="w-0.5 h-0.5 bg-gray-600 rounded-lg"></span>
                                            <span className="text-[9px]">2w ago</span>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <StarIcon className="w-2.5 h-2.5 fill-primary" />
                                            <StarIcon className="w-2.5 h-2.5 fill-primary" />
                                            <StarIcon className="w-2.5 h-2.5 fill-primary" />
                                            <StarIcon className="w-2.5 h-2.5 fill-primary" />
                                            <StarHalfIcon className="w-2.5 h-2.5 fill-primary" />
                                        </div>
                                        <p className="text-[11px] font-medium text-muted-foreground">This is an awesome product.. I like it!</p>
                                    </div>
                                </div>

                                <div className="flex gap-1.5">
                                    <Avatar className="w-5 h-5 border">
                                        <AvatarImage src="https://github.com/shadcn.pngd" alt="@shadcn" />
                                        <AvatarFallback className="text-[9px] font-bold">J</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xs font-semibold">John Doe</h3>
                                            <span className="w-0.5 h-0.5 bg-gray-600 rounded-lg"></span>
                                            <span className="text-[9px]">1m ago</span>
                                        </div>

                                        <div className="flex items-center gap-0.5">
                                            <StarIcon className="w-2.5 h-2.5 fill-primary" />
                                            <StarIcon className="w-2.5 h-2.5 fill-primary" />
                                            <StarIcon className="w-2.5 h-2.5 fill-primary" />
                                            <StarHalfIcon className="w-2.5 h-2.5 fill-primary" />
                                        </div>
                                        <p className="text-[11px] font-medium text-muted-foreground">Average Product...</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-1">
                                    <Avatar className="w-6 h-6 border">
                                        <AvatarImage src="https://github.com/shadcn.pngd" alt="@shadcn" />
                                        <AvatarFallback className="text-[11px] font-bold">K</AvatarFallback>
                                    </Avatar>
                                    <Input placeholder="Write a review..." className="h-7 text-xs" />
                                    <Button variant="ghost" size="icon" className="h-4 w-4"><SendHorizonalIcon /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog;