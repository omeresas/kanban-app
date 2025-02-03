import { create } from "zustand";
import { redux, devtools } from "zustand/middleware";
import initialState from "@/store/initialState.json";
import { kanbanReducer } from "@/store/reducer";

const useKanbanStore = create(devtools(redux(kanbanReducer, initialState)));

export default useKanbanStore;
