import Product from "@/components/shop/product";
import ProductDetailsDialog from "@/components/shop/product-details-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, getCartItems } from "@/store/shop/cart-slice";
import { getProduct } from "@/store/shop/products-slice";
import { resetSearch, searchProducts } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const { user } = useSelector(state => state.auth);
    const [searchParams, setSearchParams] = useSearchParams();
    const { products } = useSelector(state => state.shopSearch);
    const { productDetails } = useSelector(state => state.shopProducts);
    const { cartItems } = useSelector(state => state.shopCart);
    const [openDetails, setOpenDetails] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function handleGetProductDetails(id) {
        dispatch(getProduct(id));
    }

    function handleAddToCart(productId, totalStock) {
        const cItems = cartItems.items || [];
        if (cItems.length) {
            const currentIndex = cItems.findIndex(item => item.productId === productId);
            if (currentIndex > -1) {
                const quantity = cItems[currentIndex].quantity;
                if (quantity + 1 > totalStock) {
                    toast({
                        title: `Only ${quantity} quantity can be added for this item`,
                        variant: "destructive"
                    });
                    return;
                }
            }
        }

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
        if (keyword.trim().length === 0) {
            setSearchParams(new URLSearchParams(``));
            dispatch(resetSearch());
        }

        if (keyword && keyword.trim() !== '' && keyword.trim().length >= 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(searchProducts(keyword));
            }, 1000);
        }

    }, [dispatch, keyword, setSearchParams]);

    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetails(true);
        }
    }, [productDetails]);

    // console.log(productDetails);

    return (
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input name="keyword" className="px-4 py-6" placeholder="Search Products..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                </div>
            </div>
            <section className="text-sm text-muted-foreground">
                {keyword && <span className="italic pl-2">Search results for {`"${keyword}"`}</span>}

                <div className="py-6 md:py-6">
                    <div className="mx-auto">
                        {products.length === 0 && <h2 className="text-3xl md:text-5xl font-bold text-center mt-16 md:mt-24">No results found!</h2>}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {
                                products && products.length > 0
                                    ? products.map((product, i) => <Product key={i} product={product} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} />)
                                    : null
                            }

                            <ProductDetailsDialog openDetails={openDetails} setOpenDetails={setOpenDetails} productDetails={productDetails} handleAddToCart={handleAddToCart} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Search;