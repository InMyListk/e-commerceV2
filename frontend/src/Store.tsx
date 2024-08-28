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
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
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
