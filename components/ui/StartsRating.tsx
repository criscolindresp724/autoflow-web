"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { Star } from "lucide-react";
import { useState } from "react";

type StarRatingProps = {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
};

export default function StarRating({
  value = 0,
  onChange,
  max = 5,
}: StarRatingProps) {
  const [rating, setRating] = useState(value);

  const handleChange = (val: string) => {
    const newValue = Number(val);
    setRating(newValue);
    onChange?.(newValue);
  };

  return (
    <RadioGroup.Root
      className="flex gap-2"
      value={rating.toString()}
      onValueChange={handleChange}
    >
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        return (
          <RadioGroup.Item
            key={starValue}
            value={starValue.toString()}
            className="cursor-pointer"
          >
            <Star
              className={`h-8 w-8 transition-colors ${
                starValue <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
}
