import { createContext, useReducer, Dispatch } from "react";

type StateType = {
  cart: {
    cartItems: any[];
  };
};

const initialState: StateType = {
  cart: {
    cartItems: [],
  },
};

type ActionType = {
  type: string;
  payload?: any;
};

type ContextType = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((x) => x._id === newItem._id);

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === newItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      console.log(cartItems);
      return { ...state, cart: { ...state.cart, cartItems } };

    default:
      return state;
  }
};

export const Store = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

type Props = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};
