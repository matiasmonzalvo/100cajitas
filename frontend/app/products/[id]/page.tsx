"use client";

import { useState, useEffect } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProductCard } from "@/components/product-card";
import { ProductCustomizer } from "@/components/product-customizer";
import { products } from "@/lib/data";
import { useCart, ItemCustomization } from "@/lib/cart";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  itemId?: string;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === params.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(
    product?.options?.[0] || null
  );
  const [customizations, setCustomizations] = useState<ItemCustomization[]>([]);
  const [isCustomizationComplete, setIsCustomizationComplete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [productImages, setProductImages] = useState(product?.images || []);

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

  useEffect(() => {
    if (!product || !product.items) {
      setIsCustomizationComplete(true);
      return;
    }

    const customizableItems = product.items.filter(
      (item) => item.customizable && item.options
    );
    if (customizableItems.length === 0) {
      setIsCustomizationComplete(true);
      return;
    }

    const isComplete = customizableItems.every((item) => {
      const itemCustomization = customizations.find(
        (c) => c.itemId === item.id
      );
      if (!itemCustomization) return false;

      return Object.entries(item.options || {}).every(
        ([optionKey, optionData]) => {
          return (
            !optionData.required ||
            (itemCustomization.options[optionKey] &&
              itemCustomization.options[optionKey] !== "")
          );
        }
      );
    });

    setIsCustomizationComplete(isComplete);
  }, [product, customizations]);

  // Update product images based on customizations
  useEffect(() => {
    if (!product) return;

    const updatedImages = [...product.images];

    customizations.forEach((customization) => {
      const item = product.items?.find((i) => i.id === customization.itemId);
      if (!item || !item.customizable) return;

      const imageIndex = updatedImages.findIndex(
        (img) => img.itemId === customization.itemId
      );
      if (imageIndex === -1) return;

      let newImageUrl;

      // Handle special case for t-shirt (model + color)
      if (
        customization.itemId === "tshirt" &&
        customization.options.model &&
        customization.options.color
      ) {
        newImageUrl =
          product.variantImages.tshirt[customization.options.model]?.[
            customization.options.color
          ];
      }
      // Handle other items
      else if (customization.options.design) {
        newImageUrl =
          product.variantImages[customization.itemId]?.[
            customization.options.design
          ];
      } else if (customization.options.model) {
        newImageUrl =
          product.variantImages[customization.itemId]?.[
            customization.options.model
          ];
      }

      if (newImageUrl) {
        updatedImages[imageIndex] = {
          ...updatedImages[imageIndex],
          url: newImageUrl,
        };
      }
    });

    setProductImages(updatedImages);
  }, [product, customizations]);

  const handleCustomizationsChange = (
    newCustomizations: ItemCustomization[]
  ) => {
    setCustomizations(newCustomizations);
  };

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
    if (!isCustomizationComplete) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    addToCart({
      ...product,
      quantity,
      selectedOption,
      customizations,
    });

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleItemSelect = (itemId: string): void => {
    const imageIndex = product.images.findIndex(
      (img: ProductImage) => img.itemId === itemId
    );
    if (imageIndex !== -1) {
      setSelectedImage(imageIndex);
    }
  };

  return (
    <div className="container px-4 py-8 md:px-2 md:py-20">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={productImages[selectedImage]?.url || "/placeholder.svg"}
              alt={productImages[selectedImage]?.alt || product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            {productImages.slice(0, 5).map((image, i) => (
              <div
                key={image.id}
                className={`relative aspect-square overflow-hidden rounded-md bg-muted cursor-pointer ${
                  selectedImage === i ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedImage(i)}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
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

            {product.items && (
              <ProductCustomizer
                items={product.items}
                onCustomizationsChange={handleCustomizationsChange}
                onItemSelect={handleItemSelect}
                productImages={product.images}
              />
            )}

            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Button
                size="lg"
                className={`flex-1 cursor-pointer ${
                  !isCustomizationComplete ? "opacity-80" : ""
                }`}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Agregar al Carrito
              </Button>
              <Button size="icon" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Envío gratis por encima de $100</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Pago seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Mensaje de regalo disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Soporte al cliente 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="contents">Contenido</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">
              Detalles de la Caja de Regalo
            </h3>
            <p className="text-muted-foreground">{product.description}</p>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Bellamente empaquetado en nuestra caja signature</li>
              <li>Incluye una tarjeta de mensaje personalizada</li>
              <li>Productos de calidad premium de artesanos locales</li>
              <li>Perfecto para {product.occasions.join(", ")}</li>
            </ul>
          </TabsContent>
          <TabsContent value="contents" className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Contenido</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              {product.contents?.map((item, index) => (
                <li key={index}>{item}</li>
              )) || (
                <>
                  <li>Producto premium 1</li>
                  <li>Producto artesanal 2</li>
                  <li>Producto hecho a mano 3</li>
                  <li>Producto de lujo 4</li>
                </>
              )}
            </ul>
          </TabsContent>
        </Tabs>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold">También te puede gustar</h2>
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
