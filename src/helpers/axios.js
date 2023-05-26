import axios from "axios";

const token = localStorage.getItem("jwtToken");
axios.defaults.baseURL = "http://localhost:5000";

export default axios;
