import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import OrderDetails from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, getOrders, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import { camelCaseToCapitalized } from "@/lib/utils";

const Orders = () => {
    const [openDetails, setOpenDetails] = useState(false);
    const { user } = useSelector(state => state.auth);
    const { orders, order } = useSelector(state => state.shopOrder);
    const dispatch = useDispatch();

    function viewDetails(orderId) {
        console.log(orderId);

        dispatch(getOrderDetails({ userId: user?.id, orderId }));
        setOpenDetails(true);
    }

    useEffect(() => {
        dispatch(getOrders(user?.id));
    }, [dispatch]);

    useEffect(() => {
        if (order !== null) {
            setOpenDetails(true);
        }
    }, [order]);

    console.log(order);

    return (orders && orders.length > 0
        ? <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>{item._id}</TableCell>
                                <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                                <TableCell>${item.totalAmount}</TableCell>
                                <TableCell>
                                    <Badge className={`capitalize text-nowrap ${item.orderStatus === "completed" ? "bg-green-600" : (item.orderStatus === "pending" ? "bg-amber-500" : (item.orderStatus === "rejected" ? "bg-red-600" : (item.orderStatus === "cancelled" ? "bg-red-300" : (item.orderStatus === "inProgress" ? "bg-blue-600" : "bg-gray-600"))))}`}>{camelCaseToCapitalized(item.orderStatus)}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Dialog open={openDetails} onOpenChange={() => { setOpenDetails(false); dispatch(resetOrderDetails()) }}>
                                        <DialogTrigger asChild>
                                            <Button className="h-8 px-3 text-xs" onClick={() => viewDetails(item?._id)}>View Details</Button>
                                        </DialogTrigger>
                                        <OrderDetails order={order} />
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </CardContent>
        </Card>
        : <Card>
            <CardHeader>
                <CardTitle>No orders</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default Orders;