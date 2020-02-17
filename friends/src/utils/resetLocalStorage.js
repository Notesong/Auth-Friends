export const resetLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("loggedIn")
}