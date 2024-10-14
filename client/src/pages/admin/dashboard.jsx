import { CircleXIcon } from "lucide-react";
import ProductImageUpload from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from "@/store/common/feature-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
    const { featureImages } = useSelector(state => state.commonFeatures);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function uploadFeatureImage() {
        dispatch(addFeatureImage(uploadedImageUrl)).then(data => {
            // console.log(data);
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
                setImageFile(null);
                setUploadedImageUrl("");
                toast({
                    title: "Image Uploaded!"
                });
            }
        });
    }

    function handleDeleteFeatureImage(id) {
        console.log(id);
        dispatch(deleteFeatureImage(id)).then(data => {
            // console.log(data);
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
                toast({
                    title: data?.payload?.message
                });
            }
        });
    }

    useEffect(() => {
        dispatch(getFeatureImages());
    }, [dispatch]);

    // console.log(featureImages);

    return (
        <Fragment>
            <div className="mb-6 flex justify-between w-full">
                <h1 className="text-2xl font-semibold mt-0.5">Dashboard</h1>
            </div>

            <div className="mb-4">
                <ProductImageUpload
                    file={imageFile}
                    setFile={setImageFile}
                    fileUrl={uploadedImageUrl}
                    setFileUrl={setUploadedImageUrl}
                    uploading={uploading}
                    setUploading={setUploading}
                />
                <Button className="mt-5" onClick={uploadFeatureImage}>Upload</Button>
            </div>

            <div className="mb-3 flex flex-col gap-4">
                {
                    featureImages && featureImages.length > 0 ?
                        featureImages.map((item, i) => (
                            <div key={i} className="relative">
                                <img src={item.image} alt="Image" className="bg-gray-200" />
                                <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-5 w-5" onClick={() => handleDeleteFeatureImage(item._id)}>
                                    <CircleXIcon />
                                </Button>
                            </div>
                        )) : null
                }
            </div>
        </Fragment>
    );
}

export default Dashboard;