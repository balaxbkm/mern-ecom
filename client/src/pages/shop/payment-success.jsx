import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Placed!</CardTitle>
                <p>Payment completed! Your order has been placed successfully!</p>
                <Link to={"/shop/home"}>Continue Shopping</Link>
            </CardHeader>
        </Card>
    )
}

export default PaymentSuccess;