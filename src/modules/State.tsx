import React, { createContext, useEffect, useReducer } from "react";
import { Storage } from "@ionic/storage";

const store = new Storage();
// await store.create();

let AppContext = createContext({});

const initialState = {
  photos: [],
  favorites: [],
};

let reducer = (state: any, action: { type: string; data: any }) => {
  switch (action.type) {
    case "set-photos": {
      return {
        ...state,
        photos: action.data,
      };
    }
    case "add-favorite": {
      return { ...state, favorites: [...state.favorites, action.data] };
    }
    case "remove-favorite": {
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite: any) => favorite.id !== action.data.id
        ),
      };
    }
  }
  return state;
};

function AppContextProvider(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  const fullInitialState = {
    ...initialState,
  };

  let [state, dispatch] = useReducer(reducer, fullInitialState);
  let value = { state, dispatch };

  const saveFavorites = async () => {
    await store.set("favorites", state.favorites);
    console.log({ store: store.get("favorites") });
  };

  useEffect(() => {
    saveFavorites();
  }, [state.favorites]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
