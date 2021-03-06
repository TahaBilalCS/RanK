import axios from "axios";
import history from "../history";
import {
  FETCH_USER,
  FETCH_LISTINGS,
  FETCH_LISTING,
  DELETE_LISTING,
  CREATE_LISTING,
  EDIT_LISTING,
  CHANGE_THEME,
  GET_THEME,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createListing = (values) => async (dispatch) => {
  const res = await axios.post("/api/listings", values);
  history.push("/listings");
  dispatch({ type: CREATE_LISTING, payload: res.data });
};

export const editListing = (id, formValues) => async (dispatch) => {
  const res = await axios.patch(`/api/listing/edit/${id}`, formValues);
  dispatch({ type: EDIT_LISTING, payload: res.data });
  history.push(`/listings/show/${id}`);
};

export const fetchListings = () => async (dispatch) => {
  const res = await axios.get("/api/listings");
  dispatch({ type: FETCH_LISTINGS, payload: res.data });
};

export const fetchListing = (id) => async (dispatch) => {
  const res = await axios.get("/api/listing", { params: { id: id } });
  dispatch({ type: FETCH_LISTING, payload: res.data });
};

export const deleteListing = (id) => async (dispatch) => {
  await axios.delete(`/api/listing/delete/${id}`);
  dispatch({ type: DELETE_LISTING, payload: id });
  history.push("/listings");
};

export const changeTheme = () => async (dispatch) => {
  let dark = localStorage.getItem("dark");
  if (dark === null) {
    localStorage.setItem("dark", "true");
    dark = "true";
  } else if (dark === "true") {
    dark = "false";
    localStorage.setItem("dark", "false");
  } else {
    dark = "true";
    localStorage.setItem("dark", "true");
  }
  dispatch({ type: CHANGE_THEME, payload: dark });
};

export const getTheme = () => async (dispatch) => {
  let dark = localStorage.getItem("dark") || "false";
  dispatch({ type: GET_THEME, payload: dark });
};
