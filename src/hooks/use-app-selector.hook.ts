import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "../store";

const useHook: TypedUseSelectorHook<AppState> = useSelector;

export default useHook;
