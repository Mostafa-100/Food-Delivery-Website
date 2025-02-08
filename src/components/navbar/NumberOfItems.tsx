import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setNumOfItems } from "../../redux/cart";

import { useEffect } from "react";

import apiClient from "../../api/apiClient";
import { AxiosError } from "axios";

function NumberOfItems() {
  const dispatch = useDispatch();

  const { numOfItems } = useSelector((state: RootState) => state.cart);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  async function setNumberOfCartItems() {
    try {
      const response = await apiClient.get("/api/number-of-cart-items");

      dispatch(setNumOfItems(response.data.numberOfItems));
    } catch (error) {
      if (error instanceof AxiosError) {
        if ((error.response?.status as number) !== 401) {
          console.error(error);
        }
      }
    }
  }

  useEffect(() => {
    setNumberOfCartItems();
  }, [isLoggedIn]);

  if (numOfItems > 0) {
    return (
      <span className="flex justify-center items-center text-xs p-px px-1.5 rounded-full bg-orange-600 text-white  -ml-2 -mb-2">
        {numOfItems}
      </span>
    );
  }
}

export default NumberOfItems;
