import ProductImageUpload from "@/components/admin/image-upload";
import Product from "@/components/admin/product";
import RenderForm from "@/components/common/render-form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, fetchAllProducts, updateProduct } from "@/store/admin/products-slice";
import { PlusIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: ""
};

const Products = () => {
    const [openAPF, setOpenAPF] = useState(false);
    const [formData, setFormData] = useState(initData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [editId, setEditId] = useState(null);

    const { products } = useSelector(state => state.adminProducts);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(e) {
        e.preventDefault();

        editId !== null
            ? dispatch(updateProduct({
                id: editId, formData: formData
            })).then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setEditId(null);
                    setFormData(initData);
                    setOpenAPF(false);
                    toast({
                        title: data.payload.message
                    })
                }
            })
            : dispatch(addNewProduct({
                ...formData, image: uploadedImageUrl
            })).then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setImageFile(null);
                    setUploadedImageUrl("");
                    setFormData(initData);
                    setOpenAPF(false);
                    toast({
                        title: data.payload.message
                    })
                }
            });
    }

    function handleDelete(id) {
        dispatch(deleteProduct(id)).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                toast({
                    title: data.payload.message
                })
            }
        });
    }

    function isFormValid() {
        return Object.keys(formData).map(key => formData[key] !== "").every(item => item);
    }

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    // console.log("formData:", formData);

    return (
        <Fragment>
            <div className="mb-6 flex justify-between w-full">
                <h1 className="text-2xl font-semibold mt-0.5">Manage Products</h1>
                <Button className="flex items-center gap-2" onClick={() => setOpenAPF(true)}>
                    <PlusIcon /> New Product
                </Button>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {
                    products && products.length > 0 ? products.map((product, i) => (
                        <Product
                            key={i}
                            product={product}
                            setFormData={setFormData}
                            setEditId={setEditId}
                            setOpenAPF={setOpenAPF}
                            handleDelete={handleDelete}
                        />
                    )) : <div>No Products</div>
                }
            </div>
            <Sheet open={openAPF} onOpenChange={() => {
                setOpenAPF(false);
                setEditId(null);
                setFormData(initData);
            }}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader className="mt-3">
                        <SheetTitle className="text-left">{editId ? "Edit Product" : "Add New Product"}</SheetTitle>
                    </SheetHeader>
                    {!editId && <ProductImageUpload
                        file={imageFile}
                        setFile={setImageFile}
                        fileUrl={uploadedImageUrl}
                        setFileUrl={setUploadedImageUrl}
                        uploading={uploading}
                        setUploading={setUploading}
                    />}
                    <div className="py-2">
                        <RenderForm
                            formControls={addProductFormElements}
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={onSubmit}
                            buttonText={editId ? "Update Product" : "Add Product"}
                            isButtonDisabled={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default Products;