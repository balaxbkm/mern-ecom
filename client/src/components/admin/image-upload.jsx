import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CircleXIcon, CloudUploadIcon, FileImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({ file, setFile, fileUrl, setFileUrl, uploading, setUploading }) {
    const inputRef = useRef(null);

    function handleFileChange(e) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setFile(selectedFile);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) setFile(droppedFile);
    }

    function handleRemoveFile() {
        setFile(null);
        if (inputRef.current) inputRef.current.value = "";
    }

    async function uploadImageToCloudinary() {
        setUploading(true);
        const data = new FormData();
        data.append("my_file", file);
        const response = await axios.post("http://localhost:8000/api/admin/products/upload-image", data);
        // console.log(response.data);
        if (response.data?.success) {
            setFileUrl(response.data.result.url);
            setUploading(false);
        }
    }

    useEffect(() => {
        if (file !== null) uploadImageToCloudinary();
    }, [file]);

    return (
        <div className="w-full mx-auto mt-5">
            <Label className="font-semibold mb-2 block">Upload Image</Label>
            <div className="mt-3" onDragOver={handleDragOver} onDrop={handleDrop}>
                <Input type="file" id="image-upload" className="hidden" ref={inputRef} onChange={handleFileChange} />
                {
                    !file ? (
                        <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-48 cursor-pointer border border-dashed border-2 rounded-lg">
                            <CloudUploadIcon className="w-10 h-10 text-muted-foreground mb-2" />
                            <span>Drag & drop or Click to upload image</span>
                        </Label>
                    ) : uploading ? (
                        <Skeleton className="h-10 bg-gray-100" />
                    ) : (
                        <div className="flex items-center justify-between bg-gray-200 pl-2 rounded-md">
                            <div className="flex items-center">
                                <FileImageIcon className="w-5 h-5 text-primary mr-2" />
                                <p className="text-sm font-medium w-64 overflow-hidden text-nowrap overflow-ellipsis" title={file.name}>{file.name}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveFile}>
                                <CircleXIcon className="w-4 h-4 " />
                                <span className="sr-only">Remove File</span>
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ProductImageUpload;