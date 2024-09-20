import { useEffect } from "react";
import { useState } from "react";

export const useGeoLocation = (option) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const handleSuccess = (position) => {
    const { latitude, longitude, city, countryName, postCode } =
      position.coords;

    setLocation({
      latitude,
      longitude,
      city,
      countryName,
      postCode,
    });
  };

  const handelError = (err) => {
    setError(err.message);
  };

  useEffect(() => {
    const { geoLocation } = navigator;

    if (!geoLocation) {
      setError("Geolocation is not supported!");
      return;
    }
    geoLocation.getCurrentPosition(handleSuccess, handelError, option);
  }, [option]);
  return { location, error };
};
