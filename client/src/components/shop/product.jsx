import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const Product = ({ product, handleGetProductDetails, handleAddToCart }) => {
    return (
        <Card className="w-full max-w-sm mx-auto cursor-pointer">
            <div onClick={() => handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img src={product?.image} alt={product?.title} className="w-full h-[240px] object-cover rounded-t-lg" />
                    {
                        product?.salePrice > 0 && product?.totalStock !== 0
                            ? <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-700">Sale</Badge>
                            : <Badge className={`absolute top-2 left-2 ${product?.totalStock !== 0 && product?.totalStock <= 3 ? "bg-orange-500 hover:bg-orange-700" : "bg-red-600 hover:bg-red-700"} empty:hidden`}>
                                {product?.totalStock > 3 ? null : product?.totalStock !== 0 && product?.totalStock <= 3 ? "Few Stocks" : "Out of Stock"}
                            </Badge>
                    }
                </div>
            </div>
            <CardContent className="p-4" onClick={() => handleGetProductDetails(product?._id)}>
                <div className="flex gap-2 items-center">
                    <span className="text-xs text-muted-foreground capitalize">{product?.brand}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-lg"></span>
                    <span className="text-xs text-muted-foreground capitalize">{product?.category}</span>
                </div>
                <h2 className="text-lg font-bold mb-1 w-48 overflow-hidden overflow-ellipsis text-nowrap" title={product?.title}>{product?.title}</h2>
                {
                    product?.totalStock !== 0 ?
                        <div className="flex gap-2 items-center">
                            <span className={`${product?.salePrice > 0 ? "line-through text-sm text-muted-foreground" : "text-base text-green-600"} font-semibold`}>${product?.price}</span>
                            {product?.salePrice > 0 && <span className="text-base font-semibold text-green-600">${product?.salePrice}</span>}
                        </div>
                        :
                        <div className="flex gap-2 items-center">
                            <span className="text-sm text-gray-600 font-medium w-56 overflow-hidden overflow-ellipsis line-clamp-4">{product?.description}</span>
                        </div>
                }
            </CardContent>
            {product?.totalStock !== 0 && <CardFooter className="p-4 pt-0">
                <div className="flex items-center gap-2 justify-between w-full">
                    <Button className="text-sm w-full" onClick={() => handleAddToCart(product?._id, product?.totalStock)}>Add to cart</Button>
                    {/* <Button className="text-sm w-full" disabled>Buy now</Button> */}
                </div>
            </CardFooter>}
        </Card>
    )
}

export default Product;