import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import Order from "./Order";
import Footer from "../../components/Footer";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useQuery } from "react-query";

import apiClient from "../../api/apiClient";

type OrderProps = {
  id: number;
  description: string;
  montant: number;
  numberOfItems: number;
  status: string;
};

function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sessionCheckoutId = useRef("");

  useEffect(() => {
    sessionCheckoutId.current = searchParams.get("checkout_session_id") ?? "";
    if (!sessionCheckoutId.current) return;
    searchParams.delete("checkout_session_id");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const { data: orders, isLoading } = useQuery(
    ["getOrders"],
    async function () {
      const response = await apiClient.get(
        `/api/orders?checkout_session_id=${sessionCheckoutId.current}`
      );
      return response.data;
    }
  );

  return (
    <>
      <div className="container mx-auto py-5 px-2 h-[calc(100vh-76px)]">
        <div>
          <h2 className="text-2xl mb-6">My Orders</h2>
          <div>
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-xl text-neutral-600" />
            ) : orders.length > 0 ? (
              orders?.map((order: OrderProps) => (
                <Order key={order.id} {...order} />
              ))
            ) : (
              <div className="text-neutral-500 text-center text-lg">
                You dont have any order yet.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Orders;
