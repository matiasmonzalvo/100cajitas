import type React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col items-center">
          <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container flex h-16 items-center px-4 sm:px-6 mx-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-2 md:hidden"
                  >
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
                      100 Cajitas
                    </Link>
                    <Separator />
                    <Link href="/" className="text-lg font-medium">
                      Home
                    </Link>
                    <Link href="/products" className="text-lg font-medium">
                      All Gift Boxes
                    </Link>
                    <Link
                      href="/products?category=fathers-day"
                      className="text-lg font-medium"
                    >
                      Father's Day
                    </Link>
                    <Link
                      href="/products?category=mothers-day"
                      className="text-lg font-medium"
                    >
                      Mother's Day
                    </Link>
                    <Link
                      href="/products?category=birthday"
                      className="text-lg font-medium"
                    >
                      Birthday
                    </Link>
                    <Link
                      href="/products?category=christmas"
                      className="text-lg font-medium"
                    >
                      Christmas
                    </Link>
                    <Link href="/cart" className="text-lg font-medium">
                      Cart
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <Link
                href="/"
                className="mr-6 flex items-center gap-2 font-bold text-xl"
              >
                100 Cajitas
              </Link>
              <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
                <Link
                  href="/"
                  className="font-medium transition-colors hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="font-medium transition-colors hover:text-primary"
                >
                  All Gift Boxes
                </Link>
                <Link
                  href="/products?category=fathers-day"
                  className="font-medium transition-colors hover:text-primary"
                >
                  Father's Day
                </Link>
                <Link
                  href="/products?category=mothers-day"
                  className="font-medium transition-colors hover:text-primary"
                >
                  Mother's Day
                </Link>
                <Link
                  href="/products?category=birthday"
                  className="font-medium transition-colors hover:text-primary"
                >
                  Birthday
                </Link>
                <Link
                  href="/products?category=christmas"
                  className="font-medium transition-colors hover:text-primary"
                >
                  Christmas
                </Link>
              </nav>
              <div className="ml-auto flex items-center gap-2">
                <form className="hidden lg:block relative w-[200px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full pl-8"
                  />
                </form>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Button>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Cart</span>
                  </Link>
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="w-full container">
            <div className="container px-4 pb-12 md:px-6 lg:pb-16">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 pt-12 md:grid-cols-4 border-t">
                <div>
                  <h3 className="text-lg font-medium">About Us</h3>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Our Story
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Meet the Team
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Testimonials
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Customer Service</h3>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Shipping & Returns
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Gift Boxes</h3>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Bestsellers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        New Arrivals
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Custom Boxes
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Stay Connected</h3>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Instagram
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Pinterest
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 border-t pt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} 100 Cajitas. All rights
                  reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
