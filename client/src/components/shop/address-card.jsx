import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({ addressInfo, handleAddressEdit, handleAddressDelete }) => {
    return (
        <Card className="flex items-center">
            <CardContent className="grid gap-2 py-3 px-4 w-56">
                <Label className="text-xs">{addressInfo?.address}</Label>
                <Label className="text-xs">{addressInfo?.city} - {addressInfo?.pincode}</Label>
                <Label className="text-xs">Ph: {addressInfo?.phone}</Label>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-between gap-3 p-3">
                <Button className="w-full h-8 text-xs" onClick={() => handleAddressEdit(addressInfo)}>Edit</Button>
                <Button className="w-full h-8 text-xs" onClick={() => handleAddressDelete(addressInfo?._id)}>Delete</Button>
            </CardFooter>
        </Card >
    )
}

export default AddressCard;