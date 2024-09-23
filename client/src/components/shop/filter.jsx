import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { SlidersHorizontalIcon } from "lucide-react";
import { Separator } from "../ui/separator";

const ProductFilter = ({ filters, handleFilter }) => {
    return (
        <div className="bg-background shadow-sm md:min-h-screen border-b md:border-r">
            <div className="flex items-center gap-2 p-4 border-b">
                <SlidersHorizontalIcon strokeWidth={2.5} size={18} />
                <h2 className="text-base font-bold">Filters</h2>
            </div>
            <div className="flex items-start md:flex-col gap-5 p-4">
                {
                    Object.keys(filterOptions).map((keyItem, i) => (
                        <Fragment key={i}>
                            <div>
                                <h3 className="text-sm font-semibold capitalize">{keyItem}</h3>
                                <div className="grid gap-2 mt-3">
                                    {
                                        filterOptions[keyItem].map((option, i) => (
                                            <Label key={i} className="flex items-center gap-2 font-medium ml-2">
                                                <Checkbox
                                                    checked={
                                                        filters && Object.keys(filters).length > 0 && filters[keyItem] && filters[keyItem].indexOf(option.id) > -1
                                                    }
                                                    onCheckedChange={() => handleFilter(keyItem, option.id)} />
                                                {option.label}
                                            </Label>
                                        ))
                                    }
                                </div>
                            </div>
                            <Separator className="hidden md:block last:hidden" />
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductFilter;