

import { Label } from "@radix-ui/react-label";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import RenderForm from "../common/render-form";
import { useState } from "react";

const initData = {
    status: ""
}

const OrderDetails = () => {
    const [formData, setFormData] = useState(initData);

    function onSubmit(e) {
        e.preventDefault();
        //
    }

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
                        <Label>#54334</Label>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Order Date</p>
                        <Label>23 Aug, 2024</Label>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Price</p>
                        <Label>$199.00</Label>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Status</p>
                        <Label>In progress</Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-semibold">Product Info</div>
                        <ul className="grid gap-2">
                            <li className="flex items-center justify-between">
                                <span>Product One</span>
                                <span>3 X $89.00</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Sample Product Two</span>
                                <span>2 X $18.00</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-semibold">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>John Doe</span>
                            <span>232, Wodar St,</span>
                            <span>Defalrx - 36423</span>
                            <span>Ph: (545) 788 6765</span>
                        </div>
                        <p>Notes here...</p>
                    </div>
                </div>

                <div className="">
                    <RenderForm
                        formControls={[
                            {
                                label: "Order Status",
                                name: "status",
                                element: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProgress", label: "In Progress" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "completed", label: "Completed" },
                                    { id: "rejected", label: "Rejected" }
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