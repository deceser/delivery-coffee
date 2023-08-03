import React from "react";
import { toast } from "react-toastify";

const useLocationData = () => {
  const [loading, setLoading] = React.useState(false);
  const [latitude, setLatitude] = React.useState<number | null>(null);
  const [longitude, setLongitude] = React.useState<number | null>(null);
  const [locationData, setLocationData] = React.useState<any | null>(null);

  const saveLocationDataToLocalStorage = (data: any) => {
    try {
      localStorage.setItem("locationData", JSON.stringify(data));
    } catch (error) {
      console.error("Error while saving location data to local storage:", error);
    }
  };

  const getLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoading(false);
          getCityAndCountry(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error while getting location:", error.message);
          toast.error("Error while getting location");
          setLoading(false);
        },
      );
    } else {
      console.error("Geolocation is not available in this browser.");
      toast.error("Geolocation is not available in this browser.");
      setLoading(false);
    }
  };

  const getCityAndCountry = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
      );
      const data = await response.json();
      saveLocationDataToLocalStorage(data);
      setLocationData(data);
    } catch (error) {
      console.error("Error while getting city and country:", error);
      toast.warn("Error while getting city and country");
    }
  };

  return { loading, latitude, longitude, locationData, getLocation };
};

export default useLocationData;
