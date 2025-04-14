"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductSorterProps {
  sortOption: string;
  setSortOption: (option: string) => void;
}

export function ProductSorter({
  sortOption,
  setSortOption,
}: ProductSorterProps) {
  const sortOptions = [
    { id: "featured", label: "Featured" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "newest", label: "Newest" },
    { id: "bestselling", label: "Best Selling" },
  ];

  const currentOption =
    sortOptions.find((option) => option.id === sortOption)?.label || "Featured";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-[180px] justify-between"
        >
          {currentOption}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => setSortOption(option.id)}
            className="flex items-center justify-between"
          >
            {option.label}
            {option.id === sortOption && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
