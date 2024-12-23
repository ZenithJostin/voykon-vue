import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

const useRestaurantById = async (id) => {
  try {
    const response = await axios.get(apiBaseUrl + "/api/restaurant/" + id);
    return response.data;
  } catch (error) {
    return null;
  }
}

export default useRestaurantById;