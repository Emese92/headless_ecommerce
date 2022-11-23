import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function shipping() {
  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-md mx-auto bg-gray-200 shadow-lg rounded-lg  md:max-w-5xl">
          <div className="md:flex ">
            <div className="w-full p-4 px-5 py-5">
              <div className="col-span-2 p-5">
                <div className="text-center">
                  <CheckCircleIcon className="text-green-600 w-16 h-16 mx-auto my-6"></CheckCircleIcon>

                  <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                    Payment Done!
                  </h3>
                  <p className="text-gray-600 my-2">
                    Thank you for completing your secure online payment.
                  </p>
                  <p> Have a great day! </p>
                  <div className="py-10 text-center">
                    <Link
                      href="/"
                      className="px-12 py-3 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-lg text-white/80 font-semibold drop-shadow-lg rounded-md"
                    >
                      GO BACK
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
