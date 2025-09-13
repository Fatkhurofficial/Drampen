import axios from "axios";

// function getToken() {
const token = async () => {
    try {
    const res = await axios.get("https://dramabox-token.vercel.app/token");
    return res.data;
    } catch (error) {
    throw error;
}
}

export { token };
export default { token };
