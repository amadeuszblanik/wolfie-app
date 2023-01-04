import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

const useHook: () => AppDispatch = useDispatch;

export default useHook;
