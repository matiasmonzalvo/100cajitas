"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProductCard } from "@/components/product-card";
import { FilterSidebar } from "@/components/filter-sidebar";
import { products } from "@/lib/data";
import { ProductSorter } from "@/components/product-sorter";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilters, setActiveFilters] = useState({
    category: categoryParam || "all",
    priceRange: "all",
    occasion: "all",
  });
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (activeFilters.category !== "all") {
      result = result.filter((product) =>
        product.categories.includes(activeFilters.category)
      );
    }

    // Apply price range filter
    if (activeFilters.priceRange !== "all") {
      switch (activeFilters.priceRange) {
        case "under-50":
          result = result.filter((product) => product.price < 50);
          break;
        case "50-100":
          result = result.filter(
            (product) => product.price >= 50 && product.price <= 100
          );
          break;
        case "over-100":
          result = result.filter((product) => product.price > 100);
          break;
      }
    }

    // Apply occasion filter
    if (activeFilters.occasion !== "all") {
      result = result.filter((product) =>
        product.occasions.includes(activeFilters.occasion)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "bestselling":
        result.sort((a, b) => b.soldCount - a.soldCount);
        break;
      // featured is default, no sorting needed
    }

    setFilteredProducts(result);
  }, [activeFilters, sortOption, categoryParam]);

  // Update category filter when URL param changes
  useEffect(() => {
    if (categoryParam) {
      setActiveFilters((prev) => ({
        ...prev,
        category: categoryParam,
      }));
    }
  }, [categoryParam]);

  return (
    <div className="container px-4 pt-16 md:px-6 md:py-20 ">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Gift Boxes</h1>
          <p className="text-muted-foreground">
            Browse our collection of curated gift boxes for every occasion
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <FilterSidebar
                  activeFilters={activeFilters}
                  setActiveFilters={setActiveFilters}
                />
              </SheetContent>
            </Sheet>
            <div className="hidden md:flex">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                {filteredProducts.length} results
              </Button>
            </div>
          </div>

          <ProductSorter
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="hidden md:block md:col-span-3">
            <FilterSidebar
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </div>

          <div className="md:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                <p className="text-xl font-medium">No gift boxes found</p>
                <p className="text-muted-foreground text-center">
                  Try adjusting your filters to find what you're looking for
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setActiveFilters({
                      category: "all",
                      priceRange: "all",
                      occasion: "all",
                    })
                  }
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
