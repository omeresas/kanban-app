import { create } from "zustand";
import { redux, devtools } from "zustand/middleware";
import initialState from "./initialState.json";
import { kanbanReducer } from "./reducer";

const useKanbanStore = create(devtools(redux(kanbanReducer, initialState)));

// const useKanbanStore = () => {
//   const state = kanbanStore((state) => state);
//   const dispatch = kanbanStore((state) => state.dispatch);
//   return [state, dispatch];
// };

export default useKanbanStore;
