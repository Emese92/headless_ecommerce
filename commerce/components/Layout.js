import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Store } from "../utils/Store";

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <Head>
        <title>{title ? title + "- Consid" : "Consid"}</title>
        <meta name="description" content="Ecommerce" />
      </Head>
      <div>
        <header>
          <nav>
            <div className="md:ml-auto flex flex-wrap items-center justify-center font-semibold pl-7 py-3 text-white/70 bg-gradient-to-r from-gray-500 to-gray-800 shadow-md">
              <Link href="/" className="hover:underline mr-6 text-xl">
                Home
              </Link>
              <Link href="/about" className="hover:underline mr-6 text-xl">
                About
              </Link>
              <Link
                href="/product/products"
                className="hover:underline mr-6 text-xl"
              >
                Products
              </Link>
              <Link href="/cart" className="hover:underline mr-6 text-xl">
                Cart
                {cart.cartItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
}
