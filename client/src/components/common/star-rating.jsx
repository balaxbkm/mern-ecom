import _ from "lodash";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="flex gap-3 items-center">
            {
                _.range(1, 6).map((star, i) => (
                    <Button key={i} variant="ghost" size="icon" className={`rounded-full w-8 h-8`} onClick={() => setRating(star)}>
                        <StarIcon className={`w-5 h-5 text-amber-500 ${star <= rating ? "fill-amber-500" : null}`} />
                    </Button>
                ))
            }
        </div>
    );
}

export default StarRating;