import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gift, Package, Star, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";

const categories = [
  { label: "Día del padre", bg: "bg-blue-200" },
  { label: "Día de la madre", bg: "bg-pink-200" },
  { label: "Cumpleaños", bg: "bg-yellow-200" },
  { label: "Navidad", bg: "bg-green-200" },
  { label: "Futbolero", bg: "bg-purple-200" },
  { label: "Cocinero", bg: "bg-red-200" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 h-screen">
        <div className="container px-4 md:px-6 h-full">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center h-full">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Cajas de regalo para cualquier ocasión
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Descubre la caja de regalo perfecta para tus seres queridos.
                  Hechas a mano con cuidado y llenas de artículos de primera
                  calidad.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products?category=bestsellers">
                  <Button variant="outline" size="lg">
                    Elegir tipo de caja
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg">
                    Ver todos los productos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center bg-pink-200 h-full rounded-4xl">
              <div className="relative w-full max-w-[500px] aspect-square">
                {/* <Image
                  src="/box-image.png"
                  alt="Featured gift box"
                  fill
                  className="object-cover rounded-lg"
                  priority
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Elige la caja perfecta
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Encuentra la caja de regalo perfecta para cualquier celebración
                o momento especial.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {categories.map(({ label, bg }) => (
              <Link
                key={label}
                href={`/products?category=${label
                  .toLowerCase()
                  .replace("'", "")
                  .replace(" ", "-")}`}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <div className={`aspect-square relative ${bg}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Gift className="h-12 w-12 text-muted-foreground/60" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-center">{label}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Cajas destacadas
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Nuestras cajas más populares
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"></div>
          <div className="flex justify-center mt-10">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Gift Boxes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                ¿Por qué elegir 100 cajitas?
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Lo que hace a nuestras cajas especiales
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Curated with Care</h3>
                  <p className="text-muted-foreground">
                    Each gift box is thoughtfully curated with premium items
                    that complement each other perfectly.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Premium Quality</h3>
                  <p className="text-muted-foreground">
                    We source only the highest quality products to ensure your
                    gift makes a lasting impression.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Personalized Touch</h3>
                  <p className="text-muted-foreground">
                    Add a personal message or customize your gift box to make it
                    truly special.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
