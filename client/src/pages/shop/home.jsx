import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { AmphoraIcon, AnchorIcon, BabyIcon, BananaIcon, BikeIcon, BinocularsIcon, CherryIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightningIcon, DumbbellIcon, FootprintsIcon, ShirtIcon, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProducts } from "@/store/shop/products-slice";
import Product from "@/components/shop/product";
import { useNavigate } from "react-router-dom";
import ProductDetailsDialog from "@/components/shop/product-details-dialog";
import { addToCart, getCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightningIcon },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: FootprintsIcon },
    { id: "gadgets", label: "Gadgets", icon: DumbbellIcon },
];

const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: AnchorIcon },
    { id: "adidas", label: "Adidas", icon: AmphoraIcon },
    { id: "puma", label: "Puma", icon: BananaIcon },
    { id: "levi", label: "Levi's", icon: BikeIcon },
    { id: "zara", label: "Zara", icon: BinocularsIcon },
    { id: "h&m", label: "H&M", icon: CherryIcon },
];

const Home = () => {
    const slides = [bannerOne, bannerTwo, bannerThree];
    const [currentSlide, setCurrentSlide] = useState(0);
    const { user } = useSelector(state => state.auth);
    const { products, productDetails } = useSelector(state => state.shopProducts);
    const [openDetails, setOpenDetails] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    function navigateListingPage(item, type) {
        sessionStorage.removeItem("filters");
        const currentFilter = {
            [type]: [item.id]
        }
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        navigate("/shop/listing");
    }

    function handleGetProductDetails(id) {
        // console.log(id);
        dispatch(getProduct(id));
    }

    function handleAddToCart(productId) {
        // console.log(productId);
        dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then((data) => {
            if (data.payload.success) {
                dispatch(getCartItems(user?.id));
                toast({
                    title: data.payload.message
                });
            }
        });
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 12000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        dispatch(getProducts({ filterParams: {}, sortParam: "price-lowtohigh" }));
    }, [dispatch]);

    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetails(true);
        }
    }, [productDetails]);

    // console.log("products: ", products);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[240px] md:h-[600px] overflow-hidden">
                {
                    slides.map((slide, i) => (
                        <img key={i}
                            src={slide}
                            alt="Slide"
                            className={`${i === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                        />
                    ))
                }
                <Button
                    variant="outline"
                    size="icon"
                    className="w-7 h-7 md:w-10 md:h-10 absolute top-1/2 left-3 md:left-8 transform -translate-y-1/2 bg-white/80"
                    onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
                >
                    <ChevronLeftIcon className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="w-7 h-7 md:w-10 md:h-10 absolute top-1/2 right-3 md:right-8 transform -translate-y-1/2 bg-white/80"
                    onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
                >
                    <ChevronRightIcon className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
            </div>

            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {
                            categoriesWithIcon.map((item, i) => (
                                <Card key={i} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigateListingPage(item, "category")}>
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        <item.icon className="w-12 h-12 mb-4 text-primary" />
                                        <span className="font-bold">{item.label}</span>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">Featured Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {
                            products && products.length > 0
                                ? products.map((product, i) => <Product key={i} product={product} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} />)
                                : null
                        }
                        <ProductDetailsDialog openDetails={openDetails} setOpenDetails={setOpenDetails} productDetails={productDetails} handleAddToCart={handleAddToCart} />
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">Shop by Brand</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {
                            brandsWithIcon.map((item, i) => (
                                <Card key={i} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigateListingPage(item, "brand")}>
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        <item.icon className="w-12 h-12 mb-4 text-primary" />
                                        <span className="font-bold">{item.label}</span>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;