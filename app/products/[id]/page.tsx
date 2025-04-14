"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import { useCart } from "@/lib/cart";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === params.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(
    product?.options?.[0] || null
  );

  // Get related products (same category)
  const relatedProducts = product
    ? products
        .filter(
          (p) =>
            p.id !== product.id &&
            p.categories.some((cat) => product.categories.includes(cat))
        )
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[50vh] px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">
          The gift box you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-4">
          <Link href="/products">Back to all gift boxes</Link>
        </Button>
      </div>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedOption,
    });
  };

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-md bg-muted"
              >
                <Image
                  src={product.image || "/placeholder.svg?height=150&width=150"}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
            {product.compareAtPrice && (
              <p className="text-sm text-muted-foreground line-through">
                ${product.compareAtPrice.toFixed(2)}
              </p>
            )}
          </div>

          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="mt-2 text-muted-foreground">
                {product.description}
              </p>
            </div>

            {product.options && product.options.length > 0 && (
              <div>
                <h3 className="font-medium">Options</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.options.map((option) => (
                    <Button
                      key={option}
                      variant={
                        selectedOption === option ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedOption(option)}
                    >
                      {selectedOption === option && (
                        <Check className="mr-2 h-4 w-4" />
                      )}
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-medium">Quantity</h3>
              <div className="mt-2 flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
              <Button size="icon" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Free shipping over $100</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Gift message available</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="contents">What's Inside</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Gift Box Details</h3>
            <p className="text-muted-foreground">{product.description}</p>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Beautifully packaged in our signature box</li>
              <li>Includes a personalized message card</li>
              <li>Premium quality items sourced from local artisans</li>
              <li>Perfect for {product.occasions.join(", ")}</li>
            </ul>
          </TabsContent>
          <TabsContent value="contents" className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">What's Inside</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              {product.contents?.map((item, index) => (
                <li key={index}>{item}</li>
              )) || (
                <>
                  <li>Premium item 1</li>
                  <li>Artisanal item 2</li>
                  <li>Handcrafted item 3</li>
                  <li>Luxury item 4</li>
                </>
              )}
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Customer Reviews</h3>
            <div className="space-y-4">
              {product.reviews?.map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{review.name}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </div>
              )) || <p className="text-muted-foreground">No reviews yet.</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold">You might also like</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
