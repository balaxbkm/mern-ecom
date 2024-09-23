import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import moment from 'moment-timezone';
import { formatDistanceToNow } from 'date-fns';

const Product = ({ product, setFormData, setEditId, setOpenAPF, handleDelete }) => {
    const createdAt = moment(product?.createdAt).tz("Asia/Kolkata").format("MMM D, YYYY, h:mm A");
    const updatedAt = moment(product?.updatedAt).tz("Asia/Kolkata").format("MMM D, YYYY, h:mm A");

    return (
        <div className="flex flex-col-reverse">
            <div className="bg-gray-300 mx-3 px-3 py-0.5 rounded-b-lg z-0 flex items-center justify-between cursor-pointer">
                <span className="text-[10px] font-semibold text-gray-700">{createdAt}</span>
                <span className="text-[10px] font-semibold text-gray-700" title={updatedAt}>Updated {formatDistanceToNow(updatedAt, { addSuffix: true })}</span>
            </div>
            <Card className="w-full mx-auto z-10">
                <CardContent className="flex items-center justify-between gap-3 p-2">
                    <div className="flex items-center gap-3">
                        <img src={product?.image} alt={product?.title} className="h-24 w-24 object-cover rounded-l-md" />

                        <div className="flex flex-col justify-between">
                            <div className="flex gap-2 items-center">
                                <span className="text-xs text-muted-foreground capitalize">{product?.brand}</span>
                                <span className="w-1 h-1 bg-gray-600 rounded-lg"></span>
                                <span className="text-xs text-muted-foreground capitalize">{product?.category}</span>
                            </div>
                            <h2 className="text-base font-medium mb-1 w-72 overflow-hidden overflow-ellipsis text-nowrap" title={product?.title}>{product?.title}</h2>
                            <span className={`text-[10px] font-semibold capitalize mb-1 w-fit px-1 rounded-[2px] ${product?.totalStock > 5 ? "text-blue-600 bg-blue-100" : product?.totalStock > 0 ? "text-amber-600 bg-amber-100" : "text-red-600 bg-red-100"}`}>{product?.totalStock} Stocks</span>
                            <div className="flex gap-2 items-center">
                                <span className={`${product?.salePrice > 0 ? "line-through text-sm text-muted-foreground" : "text-base text-green-600"} font-semibold`}>${product?.price}</span>
                                {product?.salePrice > 0 && <span className="text-base font-semibold text-green-600">${product?.salePrice}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3.5">
                        <Button variant="outline" size="icon" onClick={() => {
                            setEditId(product?._id)
                            setOpenAPF(true)
                            setFormData(product)
                        }}>
                            <PencilIcon size={18} className="text-blue-700" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(product?._id)}>
                            <Trash2Icon size={18} className="text-red-700" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Product;