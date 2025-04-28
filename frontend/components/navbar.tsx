"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  Gift,
  Package,
  Cake,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 sm:px-6 mx-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-xl"
              >
                <div className="w-10 h-10 relative">
                  <Image
                    src="/logo.png"
                    alt="100 Cajitas logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                100 Cajitas
              </Link>
              <Separator />
              <Link href="/products" className="text-lg font-medium">
                TIENDA
              </Link>
              <Link
                href="/products?category=fathers-day"
                className="text-lg font-medium"
              >
                DÍA DEL PADRE
              </Link>
              <Link
                href="/products?category=mothers-day"
                className="text-lg font-medium"
              >
                DÍA DE LA MADRE
              </Link>
              <Link
                href="/products?category=birthday"
                className="text-lg font-medium"
              >
                CUMPLEAÑOS
              </Link>
              <Link href="/contact" className="text-lg font-medium">
                CONTACTO
              </Link>
              <Link href="/shipping" className="text-lg font-medium">
                ENVIOS
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-1 mr-6">
          <div className="w-8 h-8 relative">
            <Image
              src="/logo.png"
              alt="100 Cajitas logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-bold text-xl tracking-tighter mt-1">
            100 Cajitas
          </span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium">
                TIENDA
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] grid-cols-2 p-4 gap-3">
                  <Link
                    href="/products"
                    className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">
                        Todos los productos
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Explora nuestra colección completa de cajitas
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/products?category=fathers-day"
                    className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Día del padre</h3>
                      <p className="text-xs text-muted-foreground">
                        Regalos especiales para papá
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/products?category=mothers-day"
                    className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Día de la madre</h3>
                      <p className="text-xs text-muted-foreground">
                        Sorprende a mamá con algo especial
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/products?category=birthday"
                    className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Cake className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Cumpleaños</h3>
                      <p className="text-xs text-muted-foreground">
                        Celebra con nuestras cajitas de regalo
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/products?category=friends-day"
                    className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Día del amigo</h3>
                      <p className="text-xs text-muted-foreground">
                        Demuestra tu amistad con un detalle único
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/products?category=kids-day"
                    className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Día del niño</h3>
                      <p className="text-xs text-muted-foreground">
                        Cajitas especiales para los más pequeños
                      </p>
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products?category=fathers-day" passHref>
                DÍA DEL PADRE
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products?category=mothers-day" passHref>
                DÍA DE LA MADRE
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products?category=birthday" passHref>
                CUMPLEAÑOS
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" passHref>
                CONTACTO
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/shipping" passHref>
                ENVIOS
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-2">
          <form className="hidden lg:block relative w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-full pl-8"
            />
          </form>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favoritos</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
            <span className="sr-only">Cuenta</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrito</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
