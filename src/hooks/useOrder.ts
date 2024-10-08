import { useState } from "react";
import type { TOrderItem, TMenuItem } from "../types";

export default function useOrder() {
  const [order, setOrder] = useState<TOrderItem[]>([]);

  const [tip, setTip] = useState(0);

  const addItem = (item: TMenuItem) => {
    const orderExists = order.find((orderItem) => orderItem.id === item.id);

    if (orderExists) {
      const updateOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
      setOrder(updateOrder);
    } else {
      const newItem = { ...item, quantity: 1 };
      setOrder([...order, newItem]);
    }
  };

  const removeItem = (id: TMenuItem["id"]) => {
    setOrder(order.filter((item) => item.id !== id));
  };

  const placeOrder = () => {
    setOrder([]);
    setTip(0);
  };

  return {
    order,
    tip,
    setTip,
    addItem,
    removeItem,
    placeOrder,
  };
}
