import { useState } from "react";
import RenderForm from "../common/render-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, getAddress, updateAddress } from "@/store/shop/address-slice";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import AddressCard from "./address-card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const initData = {
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: ""
};

const Address = () => {
    const [formData, setFormData] = useState(initData);
    const [editId, setEditId] = useState(null);
    const { addressList } = useSelector(state => state.shopAddress);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function handleSubmit(e) {
        e.preventDefault();
        if (editId !== null) {
            dispatch(updateAddress({ userId: user.id, addressId: editId, formData })).then(data => {
                console.log(data);
                if (data?.payload?.success) {
                    dispatch(getAddress(user.id));
                    setFormData(initData);
                    setEditId(null);
                    toast({
                        title: data.payload.message
                    });
                }
            });
        } else {
            if (addressList.length === 3) {
                toast({
                    title: "Notice",
                    description: "You cannot add more than three addresses!",
                    variant: "destructive"
                });
                return;
            }

            dispatch(addAddress({ ...formData, userId: user.id })).then(data => {
                console.log(data);
                if (data?.payload?.success) {
                    dispatch(getAddress(user.id));
                    setFormData(initData);
                    toast({
                        title: data.payload.message
                    });
                }
            });
        }
    }

    function isFormValid() {
        return Object.keys(formData).map(key => formData[key].trim() !== "").every(item => item);
    }

    function handleAddressEdit(addressInfo) {
        setEditId(addressInfo?._id);
        setFormData({
            address: addressInfo.address,
            city: addressInfo.city,
            pincode: addressInfo.pincode,
            phone: addressInfo.phone,
            notes: addressInfo.notes
        });
    }

    function handleAddressDelete(addressId) {
        // console.log(addressId);
        dispatch(deleteAddress({ userId: user?.id, addressId })).then(data => {
            console.log(data);
            if (data?.payload?.success) {
                dispatch(getAddress(user.id));
                toast({
                    title: data.payload.message
                });
            }
        })
    }

    useEffect(() => {
        dispatch(getAddress(user?.id));
    }, [dispatch]);

    // console.log(address);

    return (
        <div className="flex flex-col gap-4 md:w-1/2">
            <div>
                <ScrollArea className="w-full whitespace-nowrap mt-2">
                    <div className="flex w-max space-x-4">
                        {
                            addressList && addressList.length > 0
                                ? [...addressList].reverse().map((item, i) => <AddressCard key={i} addressInfo={item} handleAddressEdit={handleAddressEdit} handleAddressDelete={handleAddressDelete} />)
                                : null
                        }
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{editId ? "Edit Address" : "Add New Address"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <RenderForm
                        formControls={addressFormControls}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={editId ? "Update" : "Add"}
                        onSubmit={handleSubmit}
                        isButtonDisabled={!isFormValid()}
                    />
                </CardContent>
            </Card>
        </div>

    )
}

export default Address;