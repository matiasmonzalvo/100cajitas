"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ItemCustomization } from "@/lib/cart";
import { products } from "@/lib/data";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    selectedOption?: string | null;
    customizations?: ItemCustomization[];
  };
  updateQuantity: (
    id: string,
    quantity: number,
    option?: string | null,
    customizations?: ItemCustomization[]
  ) => void;
  removeFromCart: (
    id: string,
    option?: string | null,
    customizations?: ItemCustomization[]
  ) => void;
}

export function CartItem({
  item,
  updateQuantity,
  removeFromCart,
}: CartItemProps) {
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(
        item.id,
        item.quantity - 1,
        item.selectedOption,
        item.customizations
      );
    }
  };

  const increaseQuantity = () => {
    updateQuantity(
      item.id,
      item.quantity + 1,
      item.selectedOption,
      item.customizations
    );
  };

  const handleRemove = () => {
    removeFromCart(item.id, item.selectedOption, item.customizations);
  };

  // Helper function to get readable customization details
  const getCustomizationDetails = () => {
    if (!item.customizations || item.customizations.length === 0) return null;

    const product = products.find((p) => p.id === item.id);
    if (!product) return null;

    return item.customizations
      .map((customization) => {
        const productItem = product.items?.find(
          (i) => i.id === customization.itemId
        );
        if (!productItem || !productItem.options) return null;

        const optionDetails = Object.entries(customization.options)
          .map(([optionKey, optionValue]) => {
            if (!optionValue || !(optionKey in productItem.options))
              return null;

            const option =
              productItem.options[
                optionKey as keyof typeof productItem.options
              ];

            const value = option?.values.find((v) => v.id === optionValue);

            if (!value) return null;

            return {
              label: option?.label,
              value: value.name,
            };
          })
          .filter(Boolean);

        return {
          itemName: productItem.name,
          options: optionDetails,
        };
      })
      .filter(Boolean);
  };

  const customizationDetails = getCustomizationDetails();

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-md bg-muted">
          <Image
            src={item.image || "/placeholder.svg?height=100&width=100"}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex justify-between">
            <Link
              href={`/products/${item.id}`}
              className="font-medium hover:underline"
            >
              {item.name}
            </Link>
            <span className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            ${item.price.toFixed(2)} each
          </p>
          {item.selectedOption && (
            <p className="text-sm text-muted-foreground">
              Opción: {item.selectedOption}
            </p>
          )}

          {customizationDetails && customizationDetails.length > 0 && (
            <div className="mt-1">
              {customizationDetails.map((detail, index) => (
                <div
                  key={index}
                  className="text-xs bg-muted/30 p-1 rounded mt-1"
                >
                  <p className="font-medium text-xs">{detail?.itemName}</p>
                  <div className="grid grid-cols-2 gap-x-2 text-muted-foreground">
                    {detail?.options.map((option, optIdx) => (
                      <div key={optIdx} className="text-xs flex items-center">
                        <span className="text-xs">{option?.label}:</span>
                        <span className="text-xs ml-1 font-medium">
                          {option?.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={decreaseQuantity}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="flex h-8 w-10 items-center justify-center border-y border-input bg-background text-sm">
                {item.quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={increaseQuantity}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleRemove}
            >
              <Trash2 className="mr-2 h-3 w-3" />
              Remove
            </Button>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}
