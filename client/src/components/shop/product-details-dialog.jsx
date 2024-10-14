import { SendHorizonalIcon, StarHalfIcon, StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shop/products-slice";
import StarRating from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useToast } from "@/hooks/use-toast";
import _ from "lodash";
import { timeAgo } from "@/lib/utils";
import AverageRating from "../common/average-rating";

const ProductDetailsDialog = ({ openDetails, setOpenDetails, productDetails, handleAddToCart }) => {
    const { user } = useSelector(state => state.auth);
    const { reviews } = useSelector(state => state.shopReview);
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const { toast } = useToast();

    function handleDialogClose() {
        dispatch(setProductDetails());
        setOpenDetails(false);
        setRating(0);
        setComment("");
    }

    function submitReview() {
        console.log(rating, comment);
        if (rating > 0 && comment.trim() !== "") {
            dispatch(addReview({
                productId: productDetails?._id,
                userId: user?.id,
                rating,
                comment
            })).then(data => {
                if (data.payload.success) {
                    dispatch(getReviews(productDetails?._id));
                    console.log(data.payload);
                    toast({
                        title: "Review added!"
                    });
                    setRating(0);
                    setComment("");
                }
            });
        } else {
            toast({
                title: "Both review and star rating fields must not be empty!"
            });
        }
    }

    useEffect(() => {
        dispatch(getReviews(productDetails?._id));
    }, [dispatch, productDetails]);

    console.log(reviews);

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

                        {
                            productDetails?.ratingAverage > 0 &&
                            <div className="flex items-center gap-2 mb-5">
                                <div className="flex items-center gap-0.5">
                                    <AverageRating rating={productDetails?.ratingAverage} />
                                </div>
                                <span className="text-muted-foreground text-[12px]">({productDetails?.ratingAverage})</span>
                            </div>
                        }

                        {
                            productDetails?.totalStock !== 0 &&
                            <div className="mb-5">
                                <div className="flex items-center gap-2 w-full">
                                    <Button className="text-sm w-full" onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}>Add to cart</Button>
                                    {/* <Button className="text-sm w-full" disabled>Buy now</Button> */}
                                </div>
                            </div>
                        }
                        <Separator className="mb-3 md:mb-4" />
                        <div className="max-h-[300px] overflow-auto">
                            <h2 className="text-sm md:text-base font-bold mb-3">Reviews</h2>
                            <div className="grid gap-5">

                                {
                                    reviews && reviews.length > 0
                                        ? reviews.map((review, i) => (
                                            <div key={i} className="flex gap-1.5">
                                                <Avatar className="w-5 h-5 border">
                                                    <AvatarImage src="https://github.com/shadcnw.png" alt="@shadcn" />
                                                    <AvatarFallback className="text-[9px] font-bold">{review.userId.userName[0].toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div className="grid gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-xs font-semibold">{review.userId.userName}</h3>
                                                        <span className="w-0.5 h-0.5 bg-gray-600 rounded-lg"></span>
                                                        <span className="text-[9px]">{timeAgo(review.createdAt)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-0.5">
                                                        {
                                                            _.range(1, review.rating + 1).map((star, i) => <StarIcon key={i} className="w-2.5 h-2.5 fill-primary" />)
                                                        }
                                                    </div>
                                                    <p className="text-[11px] font-medium text-muted-foreground">{review.comment}</p>
                                                </div>
                                            </div>
                                        ))
                                        : null
                                }

                                <div className="flex justify-center my-3">
                                    <StarRating rating={rating} setRating={setRating} />
                                </div>

                                <div className="flex items-center gap-2 mb-1">
                                    <Avatar className="w-6 h-6 border">
                                        <AvatarImage src="https://github.com/shadcn.pngd" alt="@shadcn" />
                                        <AvatarFallback className="text-[11px] font-bold">K</AvatarFallback>
                                    </Avatar>
                                    <Input name="comment" placeholder="Write a review..." className="h-7 text-xs" value={comment} onChange={(e) => setComment(e.target.value)} />
                                    <Button variant="ghost" size="icon" className="h-4 w-4" disabled={comment.trim() === ""} onClick={submitReview}>
                                        <SendHorizonalIcon className="text-blue-700" />
                                    </Button>
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