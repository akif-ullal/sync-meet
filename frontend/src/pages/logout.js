export const logout = (navigate, setToken) => {

    localStorage.removeItem("token");

    setToken(null);   // 🔥 UI update

    navigate("/");
};