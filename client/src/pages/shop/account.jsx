import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Orders from "@/components/shop/orders";
import Address from "@/components/shop/address";

const Account = () => {
    return (
        <div className="flex flex-col">
            <div className="relative w-full h-[160px] md:h-[360px] overflow-hidden">
                <img
                    src={accImg}
                    alt="Image"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="container mx-auto grid grid-cols-1 gap-8 py-2 md:py-8">
                <div className="flex flex-col rounded-lg bg-background p-6">
                    <Tabs defaultValue="orders">
                        <TabsList>
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="address">Address</TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders">
                            <Orders />
                        </TabsContent>
                        <TabsContent value="address">
                            <Address />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Account;