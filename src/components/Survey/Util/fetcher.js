import axios from "axios";

const token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);
const fetcher = (url) =>
  axios
    .get(url, {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })
    .then((response) => response.data);

export default fetcher;
