import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import OrderDetails from "./order-details";

const Orders = () => {
    const [openDetails, setOpenDetails] = useState(false);

    return (
        <Card>
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
                        <TableRow>
                            <TableCell>21332</TableCell>
                            <TableCell>Sep 21, 2024</TableCell>
                            <TableCell>$199</TableCell>
                            <TableCell>In progress</TableCell>
                            <TableCell>
                                <Dialog open={openDetails} onOpenChange={setOpenDetails}>
                                    <DialogTrigger asChild>
                                        <Button className="h-8 px-3 text-xs" onClick={() => setOpenDetails(true)}>View Details</Button>
                                    </DialogTrigger>
                                    <OrderDetails />
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default Orders;