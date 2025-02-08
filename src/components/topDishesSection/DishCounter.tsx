import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type DishCounterProps = {
  id: number;
  numberOfItem: number | undefined;
};

function DishCounter({ id, numberOfItem }: DishCounterProps) {
  const [numOfItem, setNumOfItem] = useState(1);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (numberOfItem) {
      setNumOfItem(numberOfItem);
    }
  }, [isLoggedIn]);

  async function editItemQuantity(id: number, quantity: number) {
    if (numOfItem === 1 && quantity === -1) return;
    try {
      await apiClient.post("/api/edit-quantity", {
        dishId: id,
        quantity: quantity,
      });
      setNumOfItem((prev) => prev + quantity);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex items-center gap-x-2 bg-white rounded-full p-2">
      <button
        className="flex items-center justify-center size-8 p-2 rounded-full bg-red-300 text-red-500"
        onClick={() => editItemQuantity(id, -1)}
      >
        -
      </button>
      <div className="font-medium">{numOfItem}</div>
      <button
        className="flex items-center justify-center size-8 p-2 rounded-full bg-green-300 text-green-500"
        onClick={() => editItemQuantity(id, 1)}
      >
        +
      </button>
    </div>
  );
}

export default DishCounter;
