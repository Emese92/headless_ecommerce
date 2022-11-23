import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Layout({ title, children }) {
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
              <Link href="/contact" className="hover:underline mr-6 text-xl">
                  Contact
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
}
