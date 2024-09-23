import ProductFilter from "@/components/shop/filter";
import Product from "@/components/shop/product";
import ProductDetailsDialog from "@/components/shop/product-details-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addToCart, getCartItems } from "@/store/shop/cart-slice";
import { getProduct, getProducts } from "@/store/shop/products-slice";
import { ArrowDown01Icon, ArrowDown10Icon, ArrowDownAZIcon, ArrowDownZAIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(',');
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }
    return queryParams.join('&');
}

const Listing = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { products, productDetails } = useSelector(state => state.shopProducts);
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState(null);
    const [sortIcon, setSortIcon] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { toast } = useToast();

    function handleFilter(sectionId, currentOption) {
        let copyFilters = { ...filters };
        const sectionIndex = Object.keys(copyFilters).indexOf(sectionId);

        if (sectionIndex === -1) {
            copyFilters = {
                ...copyFilters,
                [sectionId]: [currentOption]
            }
        } else {
            const optionIndex = copyFilters[sectionId].indexOf(currentOption);

            if (optionIndex === -1) {
                copyFilters[sectionId].push(currentOption);
            } else {
                copyFilters[sectionId].splice(optionIndex, 1);
            }
        }

        setFilters(copyFilters);
        sessionStorage.setItem("filters", JSON.stringify(copyFilters));
    }

    function handleSort(value) {
        setSortBy(value);
        sessionStorage.setItem("sort", value);
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
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
        setSortBy(sessionStorage.getItem("sort") || "price-lowtohigh");
    }, []);

    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const queryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(queryString));
        }
    }, [filters]);

    useEffect(() => {
        dispatch(getProducts({ filterParams: filters, sortParam: sortBy }));

        if (sortBy === "price-lowtohigh") setSortIcon(<ArrowDown01Icon />);
        if (sortBy === "price-hightolow") setSortIcon(<ArrowDown10Icon />);
        if (sortBy === "title-atoz") setSortIcon(<ArrowDownAZIcon />);
        if (sortBy === "title-ztoa") setSortIcon(<ArrowDownZAIcon />);

    }, [dispatch, sortBy, filters]);

    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetails(true);
        }
    }, [productDetails]);

    // console.log("Details:", productDetails);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <div className="bg-background w-full">
                <div className="flex items-center justify-between border-b px-4 py-2.5">
                    <h2 className="text-base font-bold">All Products</h2>
                    <div className="flex items-center gap-3">
                        {products && <span className="text-muted-foreground text-sm">{products.length} Products</span>}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                                    {sortIcon}
                                    <span className="text-sm">Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSort}>
                                    {
                                        sortOptions.map((option, i) => (
                                            <DropdownMenuRadioItem key={i} value={option.id}>{option.label}</DropdownMenuRadioItem>
                                        ))
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {
                        products && products.length > 0
                            ? products.map((product, i) => <Product key={i} product={product} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} />)
                            : null
                    }
                    <ProductDetailsDialog openDetails={openDetails} setOpenDetails={setOpenDetails} productDetails={productDetails} handleAddToCart={handleAddToCart} />
                </div>
            </div>
        </div>
    );
}

export default Listing;