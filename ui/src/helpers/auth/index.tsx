import Cookies from "js-cookie";
import { initializeApp } from "@firebase/app";

export const setAuthToken = (token: string) => {
  return Cookies.set("authToken", token);
};

export const clearAuthToken = () => {
  return Cookies.remove("authToken");
};

export const config = {
  appId: "247175206356:web:d05662cf36df115ba7b241",
  measurementId: "G-NKP68JX977",
  messagingSenderId: "247175206356",
  storageBucket: "app-users-341801.appspot.com",
  projectId: "app-users-341801",
  apiKey: "AIzaSyCSZhBUF0JmiiFbzHQgPfC1F-XUwej5KLk",
  authDomain: "app-users-341801.firebaseapp.com",
};

export const firebaseClient = initializeApp(config);
