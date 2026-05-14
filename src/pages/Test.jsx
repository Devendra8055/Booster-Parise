import { useEffect } from "react";
import API from "../services/api";

export default function Test() {
  useEffect(() => {
    API.get("/")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <h1>Backend Connection Test</h1>;
}