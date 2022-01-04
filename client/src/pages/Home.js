import React from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";

export default function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  return (
    <DefaultLayout>
      <h1>Home</h1>
      <h1>The lenght of cars array is {cars.length}</h1>
    </DefaultLayout>
  );
}
