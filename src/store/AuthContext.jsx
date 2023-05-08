import { createContext, useEffect, useReducer } from "react";
import { productData } from "../utils/products";

export const AuthContext = createContext();

const initialState = {
  product: JSON.parse(localStorage.getItem("product")) || productData,
};

const storeReducer = (state, { type, payload }) => {
  switch (type) {
    case "addProduct":
      return {
        ...state,
        product: state.product.map((el) => {
          if (el.id === payload) {
            return {
              ...el,
              quantity: el.quantity + 1,
              price: el.price + el.staticPrice,
            };
          }
          return el;
        }),
      };

    case "incrementProduct":
      return {
        ...state,
        product: state.product.map((el) => {
          if (el.id === payload) {
            return {
              ...el,
              quantity: el.quantity++,
              price: el.price + el.staticPrice,
            };
          }
          return el;
        }),
      };

    case "decrementProduct":
      return {
        ...state,
        product: state.product.map((el) => {
          if (el.id === payload && el.quantity !== 1) {
            return {
              ...el,
              quantity: el.quantity--,
              price: el.price - el.staticPrice,
            };
          }
          return el;
        }),
      };

    case "deleteProduct":
      return {
        ...state,
        product: state.product.map((el) => {
          if (el.id === payload && el.quantity !== 0) {
            return {
              ...el,
              quantity: (el.quantity = 0),
              price: el.staticPrice,
            };
          }
          return el;
        }),
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [store, dispatchStore] = useReducer(storeReducer, initialState);

  const addProductHandler = (id) => {
    dispatchStore({ type: "addProduct", payload: id });
  };

  const incrementProductHandler = (id) => {
    dispatchStore({ type: "incrementProduct", payload: id });
  };

  const decrementProductHandler = (id) => {
    dispatchStore({ type: "decrementProduct", payload: id });
  };

  const deleteProductHandler = (id) => {
    dispatchStore({ type: "deleteProduct", payload: id });
  };

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(store.product));
  }, [store.product]);

  const value = {
    store,
    addProductHandler,
    incrementProductHandler,
    decrementProductHandler,
    deleteProductHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
