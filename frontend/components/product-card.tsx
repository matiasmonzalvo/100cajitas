"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    coverImage?: string;
    isNew?: boolean;
    isOnSale?: boolean;
    categories: string[];
    occasions: string[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      quantity: 1,
    });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.coverImage || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-green-600 hover:bg-green-700">New</Badge>
            )}
            {product.isOnSale && (
              <Badge className="bg-rose-600 hover:bg-rose-700">Sale</Badge>
            )}
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div>
            <span className="font-medium">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="cursor-pointer"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
