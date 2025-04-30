import type React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import "./globals.css";
import Image from "next/image";
import Navbar from "@/components/navbar";

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
          <Navbar />
          <main className="w-full container mx-auto px-4">{children}</main>
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
