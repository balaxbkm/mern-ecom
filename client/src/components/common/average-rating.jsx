
import { StarHalfIcon, StarIcon } from "lucide-react";

const AverageRating = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(<StarIcon key={i} className="w-4 h-4 fill-primary" />);
        }

        if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars.push(<StarHalfIcon key={i} className="w-4 h-4 fill-primary" />);
        }
    }

    return <div className="flex gap-1">{stars}</div>;
}

export default AverageRating;