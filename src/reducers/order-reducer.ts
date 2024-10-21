import { TMenuItem, TOrderItem } from "../types";

export type OrderActions =
  | { type: "add-item"; payload: { item: TMenuItem } }
  | { type: "remove-item"; payload: { id: TMenuItem["id"] } }
  | { type: "place-order" }
  | { type: "add-tip"; payload: { value: number } };

export type OrderState = {
  tip: number;
  order: TOrderItem[];
};
export const initialState: OrderState = {
  tip: 0,
  order: [],
};

export const orderReducer = (
  state: OrderState = initialState,
  action: OrderActions
) => {
  if (action.type === "add-item") {
    const itemExist = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );

    let order: TOrderItem[] = [];
    if (itemExist) {
      order = state.order.map((orderItem) =>
        orderItem.id === action.payload.item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      const newItem: TOrderItem = { ...action.payload.item, quantity: 1 };
      order = [...state.order, newItem];
    }
    return {
      ...state,
      order,
    };
  }

  if (action.type === "remove-item") {
    const order = state.order.filter((item) => item.id !== action.payload.id);
    return {
      ...state,
      order,
    };
  }

  if (action.type === "add-tip") {
    const tip = action.payload.value;
    return {
      ...state,
      tip,
    };
  }

  if (action.type === "place-order") {
    return {
      ...state,
      tip: 0,
      order: [],
    };
  }

  return state;
};
