import { createContext, useReducer, Dispatch } from "react";

type ShippingAddressType = {
  fullName: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
};

type StateType = {
  userInfo: any;
  cart: {
    itemsPrice: number;
    totalPrice: number;
    taxPrice: number;
    shippingPrice: number;
    shippingAddress: ShippingAddressType | any;
    cartItems: any[];
    paymentMethod: "PayPal" | "Stripe" | "";
  };
};

const initialState: StateType = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress") as string)
      : {},
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") as string)
      : [],
    paymentMethod: localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod") as string)
      : "",
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    itemsPrice: 0,
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
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "USER_SIGNIN": {
      return { ...state, userInfo: action.payload };
    }
    case "USER_SIGNOUT": {
      return {
        ...state,
        userInfo: null,
        cart: {
          ...state.cart,
          shippingAddress: {},
          cartItems: [],
          paymentMethod: "",
        },
      };
    }
    case "SAVE_SHIPPING_ADDRESS": {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    }
    case "SAVE_PAYMENT_METHOD": {
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    }
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
