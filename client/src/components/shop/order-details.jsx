import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
// import { camelCaseToCapitalized } from "@/lib/utils";

const OrderDetails = ({ order }) => {
    const { user } = useSelector(state => state.auth);

    return (
        <DialogContent className="sm:max-w-[600px] rounded-lg">
            <DialogHeader className="text-left">
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 mt-4">
                <div className="grid gap-2">
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Order ID</p>
                        <Label>{order?._id}</Label>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Order Date</p>
                        <Label>{order?.createdAt}</Label>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Price</p>
                        <Label>${order?.totalAmount.toFixed(2)}</Label>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Payment Status</p>
                        <Label className="capitalize">
                            {order?.paymentStatus}
                            {
                                order?.paymentStatus === "paid" && <><span className="lowercase"> via</span> {order?.paymentMethod}</>
                            }
                        </Label>
                    </div>
                    {order?.paymentId && <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Txn ID</p>
                        <Label>{order?.paymentId}</Label>
                    </div>}
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Status</p>
                        <Badge className={`capitalize text-nowrap ${order?.orderStatus === "completed" ? "bg-green-600" : (order?.orderStatus === "pending" ? "bg-amber-500" : (order?.orderStatus === "rejected" ? "bg-red-600" : (order?.orderStatus === "cancelled" ? "bg-red-300" : (order?.orderStatus === "inProgress" ? "bg-blue-600" : "bg-gray-600"))))}`}>{order?.orderStatus}</Badge>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-semibold">Product Info</div>
                        <ul className="grid gap-2">
                            {
                                order?.cartItems.length > 0 ?
                                    order?.cartItems.map((item, i) => (
                                        <li key={i} className="flex items-center justify-between">
                                            <span>{item.title}</span>
                                            <span>{item.quantity} X ${item.price}</span>
                                        </li>
                                    ))
                                    : null
                            }
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-semibold">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>{user?.userName}</span>
                            <span>{order?.addressInfo?.address},</span>
                            <span>{order?.addressInfo?.city} - {order?.addressInfo?.pincode}.</span>
                            <span>Ph: {order?.addressInfo?.phone}</span>
                        </div>
                        <p>{order?.addressInfo?.notes}</p>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default OrderDetails;