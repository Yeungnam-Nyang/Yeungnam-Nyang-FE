import { useState } from "react";

export const useGeoLocation = (options) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const getLocation = () => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation is not supported!");
      return;
    }

    geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        setError(error.message);
        console.log("geolocation", error);
      },
      options
    );
  };

  return { location, error, getLocation };
};
