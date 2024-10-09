

import { Label } from "@radix-ui/react-label";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import RenderForm from "../common/render-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Badge } from "../ui/badge";
import { getOrderDetails, getOrders, updateOrderStatus } from "@/store/admin/orders-slice";
import { useToast } from "@/hooks/use-toast";
// import { camelCaseToCapitalized } from "@/lib/utils";

const initData = {
    orderStatus: ""
}

const OrderDetails = ({ order }) => {
    const [formData, setFormData] = useState(initData);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(e) {
        e.preventDefault();
        if (order?._id) {
            dispatch(updateOrderStatus({ orderId: order?._id, formData })).then(data => {
                if (data.payload.success) {
                    dispatch(getOrders());
                    dispatch(getOrderDetails(order?._id));
                    toast({
                        title: data.payload.message
                    });
                }
            })
        }
    }

    useEffect(() => {
        setFormData({ orderStatus: order?.orderStatus });
    }, [order]);

    // console.log("formData ", formData);

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
                            {/* <span>{user?.userName}</span> */}
                            <span>{order?.addressInfo?.address},</span>
                            <span>{order?.addressInfo?.city} - {order?.addressInfo?.pincode}.</span>
                            <span>Ph: {order?.addressInfo?.phone}</span>
                        </div>
                        <p>{order?.addressInfo?.notes}</p>
                    </div>
                </div>

                <div className="">
                    <RenderForm
                        formControls={[
                            {
                                label: "Order Status",
                                name: "orderStatus",
                                element: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProgress", label: "In Progress" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "completed", label: "Completed" },
                                    { id: "rejected", label: "Rejected" },
                                    { id: "cancelled", label: "Cancelled" },
                                ],
                                placeholder: "Select Status",
                            },
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={onSubmit}
                        buttonText={"Update Status"}
                    />
                </div>
            </div>
        </DialogContent>
    )
}

export default OrderDetails;