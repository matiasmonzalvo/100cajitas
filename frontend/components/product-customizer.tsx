"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ItemCustomization } from "@/lib/cart";

interface OptionItem {
  id: string;
  name: string;
  image?: string;
  colorCode?: string;
}

interface OptionType {
  label: string;
  required: boolean;
  values: OptionItem[];
}

interface ProductItem {
  id: string;
  name: string;
  description: string;
  customizable: boolean;
  options?: Record<string, OptionType>;
}

interface ProductCustomizerProps {
  items: ProductItem[];
  onCustomizationsChange: (customizations: ItemCustomization[]) => void;
  onItemSelect?: (itemId: string) => void;
  productImages: Array<{ id: string; itemId?: string }>;
}

export function ProductCustomizer({
  items,
  onCustomizationsChange,
  onItemSelect,
  productImages,
}: ProductCustomizerProps) {
  const [customizations, setCustomizations] = useState<ItemCustomization[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [variantImages, setVariantImages] = useState<Record<string, any>>({});

  // Initialize customizations with empty values for required options
  useEffect(() => {
    const initialCustomizations = items
      .filter((item) => item.customizable && item.options)
      .map((item) => {
        const options: Record<string, string> = {};

        if (item.options) {
          Object.entries(item.options).forEach(([optionKey, optionData]) => {
            if (optionData.required) {
              options[optionKey] = "";
            }
          });
        }

        return {
          itemId: item.id,
          options,
        };
      });

    setCustomizations(initialCustomizations);

    // Initially expand the first customizable item
    const firstCustomizable = items.find((item) => item.customizable);
    if (firstCustomizable) {
      setExpandedItem(firstCustomizable.id);
    }

    // Get variant images from data (assuming it's passed with the product)
    try {
      const productData = require("@/lib/data").products[0];
      if (productData && productData.variantImages) {
        setVariantImages(productData.variantImages);
      }
    } catch (error) {
      console.error("Could not load variant images:", error);
    }
  }, [items]);

  // Check if all required options for an item are selected
  const isItemComplete = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item || !item.customizable || !item.options) return true;

    const itemCustomization = customizations.find((c) => c.itemId === itemId);
    if (!itemCustomization) return false;

    for (const [optionKey, optionData] of Object.entries(item.options)) {
      if (
        optionData.required &&
        (!itemCustomization.options[optionKey] ||
          itemCustomization.options[optionKey] === "")
      ) {
        return false;
      }
    }

    return true;
  };

  // Update completed items when customizations change
  useEffect(() => {
    const completed = items
      .filter((item) => item.customizable)
      .filter((item) => isItemComplete(item.id))
      .map((item) => item.id);

    setCompletedItems(completed);
    onCustomizationsChange(customizations);
  }, [customizations, items, onCustomizationsChange]);

  const handleOptionSelect = (
    itemId: string,
    optionKey: string,
    optionValue: string
  ) => {
    setCustomizations((prev) => {
      const newCustomizations = [...prev];
      const itemIndex = newCustomizations.findIndex((c) => c.itemId === itemId);

      if (itemIndex >= 0) {
        newCustomizations[itemIndex] = {
          ...newCustomizations[itemIndex],
          options: {
            ...newCustomizations[itemIndex].options,
            [optionKey]: optionValue,
          },
        };
      }

      return newCustomizations;
    });

    const imageIndex = productImages.findIndex((img) => img.itemId === itemId);
    if (imageIndex !== -1 && onItemSelect) {
      onItemSelect(itemId);
    }
  };

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItem((prev) => (prev === itemId ? null : itemId));
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const customizableItems = items.filter((item) => item.customizable);
    if (customizableItems.length === 0) return 100;

    return Math.round((completedItems.length / customizableItems.length) * 100);
  };

  // Get the image URL for a specific option
  const getOptionImageUrl = (
    itemId: string,
    optionKey: string,
    optionId: string
  ) => {
    // For t-shirts, we need to handle the special case of model + color
    if (itemId === "tshirt" && optionKey === "model") {
      // Find the first color for this model as a default preview
      const colors = Object.keys(variantImages?.tshirt?.[optionId] || {});
      if (colors.length > 0) {
        return variantImages?.tshirt?.[optionId]?.[colors[0]];
      }
      return null;
    }

    // For other items/options
    if (optionKey === "design") {
      return variantImages?.[itemId]?.[optionId];
    } else if (optionKey === "model") {
      return variantImages?.[itemId]?.[optionId];
    }

    return null;
  };

  return (
    <div className="mt-6 border rounded-lg overflow-hidden">
      <div className="bg-white p-4 flex justify-between items-center border-b">
        <h3 className="font-semibold text-lg">Personaliza tu Caja de Regalo</h3>
        <div className="flex items-center">
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden mr-2">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
          <span className="text-sm">{calculateProgress()}%</span>
        </div>
      </div>

      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "transition-all duration-200",
              !item.customizable ? "bg-white" : "",
              expandedItem === item.id ? "bg-card" : "",
              completedItems.includes(item.id)
                ? "border-l-4 border-l-green-500"
                : ""
            )}
          >
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => item.customizable && toggleItemExpansion(item.id)}
            >
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">{item.name}</h4>
                {item.customizable ? (
                  completedItems.includes(item.id) ? (
                    <Badge className="bg-green-100 text-green-700 rounded-full">
                      <Check className="h-3 w-3 mr-1" />
                      Completo
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-700 rounded-full">
                      Personalizar
                    </Badge>
                  )
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-muted text-muted-foreground"
                  >
                    Estándar
                  </Badge>
                )}
              </div>
              {item.customizable &&
                (expandedItem === item.id ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ))}
            </div>

            {item.customizable && expandedItem === item.id && item.options && (
              <div className="p-4 pt-0 space-y-4">
                {Object.entries(item.options).map(([optionKey, optionData]) => {
                  const itemCustomization = customizations.find(
                    (c) => c.itemId === item.id
                  );
                  const selectedValue =
                    itemCustomization?.options[optionKey] || "";

                  return (
                    <div key={optionKey} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h5 className="text-sm font-medium">
                          {optionData.label}
                        </h5>
                        {optionData.required && (
                          <span className="text-red-500 text-xs">*</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {optionData.values.map((value) => {
                          // For color options, keep the original color swatch UI
                          if (optionKey === "color" && value.colorCode) {
                            return (
                              <Button
                                key={value.id}
                                type="button"
                                variant={
                                  selectedValue === value.id
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                className={cn(
                                  "transition-all relative h-8 w-8 p-0 rounded-full cursor-pointer",
                                  selectedValue === value.id &&
                                    "ring-2 ring-primary ring-offset-2"
                                )}
                                style={{
                                  backgroundColor: value.colorCode,
                                  borderColor:
                                    value.colorCode === "#FFFFFF"
                                      ? "#e5e7eb"
                                      : value.colorCode,
                                }}
                                onClick={() =>
                                  handleOptionSelect(
                                    item.id,
                                    optionKey,
                                    value.id
                                  )
                                }
                              >
                                {selectedValue === value.id && (
                                  <Check
                                    className={cn(
                                      "h-4 w-4 absolute",
                                      value.colorCode === "#FFFFFF" ||
                                        value.colorCode === "#FFFFFFF"
                                        ? "text-black"
                                        : "text-white"
                                    )}
                                  />
                                )}
                                <span className="sr-only">{value.name}</span>
                              </Button>
                            );
                          }

                          // For size options, keep the original text button UI
                          if (optionKey === "size") {
                            return (
                              <Button
                                key={value.id}
                                type="button"
                                variant={
                                  selectedValue === value.id
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                className="transition-all cursor-pointer"
                                onClick={() =>
                                  handleOptionSelect(
                                    item.id,
                                    optionKey,
                                    value.id
                                  )
                                }
                              >
                                {selectedValue === value.id && (
                                  <Check className="h-4 w-4 mr-1" />
                                )}
                                {value.name}
                              </Button>
                            );
                          }

                          // For design and model options, show image thumbnails
                          const imageUrl = getOptionImageUrl(
                            item.id,
                            optionKey,
                            value.id
                          );

                          if (imageUrl) {
                            return (
                              <div
                                key={value.id}
                                className={cn(
                                  "relative w-16 h-16 rounded-md overflow-hidden border-2 cursor-pointer transition-all",
                                  selectedValue === value.id
                                    ? "border-primary ring-2 ring-primary ring-offset-1"
                                    : "border-gray-200 hover:border-gray-300"
                                )}
                                onClick={() =>
                                  handleOptionSelect(
                                    item.id,
                                    optionKey,
                                    value.id
                                  )
                                }
                              >
                                <Image
                                  src={imageUrl}
                                  alt={value.name}
                                  fill
                                  className="object-cover"
                                />
                                {selectedValue === value.id && (
                                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                    <Check className="h-5 w-5 text-primary bg-white rounded-full p-0.5" />
                                  </div>
                                )}
                              </div>
                            );
                          }

                          // Fallback to text buttons if no image is available
                          return (
                            <Button
                              key={value.id}
                              type="button"
                              variant={
                                selectedValue === value.id
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className="transition-all"
                              onClick={() =>
                                handleOptionSelect(item.id, optionKey, value.id)
                              }
                            >
                              {selectedValue === value.id && (
                                <Check className="h-4 w-4 mr-1" />
                              )}
                              {value.name}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
