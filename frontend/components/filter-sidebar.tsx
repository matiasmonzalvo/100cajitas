"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

interface FilterSidebarProps {
  activeFilters: {
    category: string
    priceRange: string
    occasion: string
  }
  setActiveFilters: React.Dispatch<
    React.SetStateAction<{
      category: string
      priceRange: string
      occasion: string
    }>
  >
}

export function FilterSidebar({ activeFilters, setActiveFilters }: FilterSidebarProps) {
  const categories = [
    { id: "all", label: "All Categories" },
    { id: "fathers-day", label: "Father's Day" },
    { id: "mothers-day", label: "Mother's Day" },
    { id: "birthday", label: "Birthday" },
    { id: "christmas", label: "Christmas" },
    { id: "for-gamers", label: "For Gamers" },
    { id: "for-cooks", label: "For Cooks" },
    { id: "for-football-fans", label: "For Football Fans" },
    { id: "for-mate-drinkers", label: "For Mate Drinkers" },
  ]

  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "under-50", label: "Under $50" },
    { id: "50-100", label: "Between $50 - $100" },
    { id: "over-100", label: "Over $100" },
  ]

  const occasions = [
    { id: "all", label: "All Occasions" },
    { id: "birthday", label: "Birthday" },
    { id: "anniversary", label: "Anniversary" },
    { id: "wedding", label: "Wedding" },
    { id: "graduation", label: "Graduation" },
    { id: "housewarming", label: "Housewarming" },
    { id: "thank-you", label: "Thank You" },
    { id: "congratulations", label: "Congratulations" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium">Categories</h3>
        <Separator className="my-2" />
        <RadioGroup
          value={activeFilters.category}
          onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, category: value }))}
        >
          <div className="space-y-2 mt-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={`category-${category.id}`} />
                <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium">Price Range</h3>
        <Separator className="my-2" />
        <RadioGroup
          value={activeFilters.priceRange}
          onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, priceRange: value }))}
        >
          <div className="space-y-2 mt-2">
            {priceRanges.map((range) => (
              <div key={range.id} className="flex items-center space-x-2">
                <RadioGroupItem value={range.id} id={`price-${range.id}`} />
                <Label htmlFor={`price-${range.id}`}>{range.label}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium">Occasions</h3>
        <Separator className="my-2" />
        <RadioGroup
          value={activeFilters.occasion}
          onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, occasion: value }))}
        >
          <div className="space-y-2 mt-2">
            {occasions.map((occasion) => (
              <div key={occasion.id} className="flex items-center space-x-2">
                <RadioGroupItem value={occasion.id} id={`occasion-${occasion.id}`} />
                <Label htmlFor={`occasion-${occasion.id}`}>{occasion.label}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
