import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

export default function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <Layout>
      <div class="h-screen bg-gray-300">
        <div class="py-12">
          <div class="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
            <div class="md:flex ">
              <div class="w-full p-4 px-5 py-5">
                  <div class="col-span-2 p-5">
                    <h1 className="mb-4 text-xl text-center">Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                      <div className="text-center font-semibold">Cart is empty.</div>
                    ) : (
                      <div className="grid md:grid-cols-4 md-gap-5">
                        <div className="overflow-x-auto md:col-span-3">
                          <table className="min-w-full">
                            <thead className="border-b">
                              <tr>
                                <th className="p-5 text-left">Item</th>
                                <th className="p-5 text-right">Quantity</th>
                                <th className="p-5 text-right">Price</th>
                                <th className="p-5">Remove</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cartItems.map((item) => (
                                <tr key={item.slug} className="border-b">
                                  <td>
                                    <Link href={`/product/${item.slug}`}>
                                      {item.name}
                                    </Link>
                                  </td>
                                  <td className="p-5 text-right">
                                    {item.quantity}
                                  </td>
                                  <td className="p-5 text-right">
                                    {item.price} kr
                                  </td>
                                  <td className="p-5 text-center">
                                    <button
                                      onClick={() => removeItemHandler(item)}
                                    >
                                      <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="p-5">
                          <ul>
                            <li>
                              <div className="pb-3 text-xl font-bold">
                                Subtotal (
                                {cartItems.reduce((a, c) => a + c.quantity, 0)})
                                :{" "}
                                {cartItems.reduce(
                                  (a, c) => a + c.quantity * c.price,
                                  0
                                )}{" "}
                                kr
                              </div>
                            </li>
                            <li>
                              <button
                                onClick={() => router.push("/shipping")}
                                className="my-8 px-12 py-3 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-xl text-white/80 font-semibold drop-shadow-lg w-full rounded-md"
                              >
                                Check Out
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
}
