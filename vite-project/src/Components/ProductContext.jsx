import { createContext, useContext, useReducer } from 'react';

// Definir el contexto
const ProductContext = createContext();

// Estado inicial
const initialState = {
  products: [],
};

// Reducer para manejar acciones relacionadas con los productos
const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    // Otros casos de acción pueden incluir actualización, eliminación, etc.
    default:
      return state;
  }
};

// Componente proveedor que envuelve la aplicación y proporciona el contexto
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useProductContext = () => useContext(ProductContext);
