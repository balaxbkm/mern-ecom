import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useLocation } from "react-router-dom";

const PayPalReturn = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");

    useEffect(() => {
        if (paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
            dispatch(capturePayment({ orderId, paymentId, payerId })).then(data => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem("currentOrderId");
                    window.location.href = "/shop/payment-success";
                }
            })
        }
    }, [paymentId, payerId, dispatch]);

    // console.log(paymentId, payerId);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Processing payment... Please wait!</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PayPalReturn;