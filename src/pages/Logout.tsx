import { ToastProps } from "../App";

interface LogoutProps {
  onLogout: { (toast: ToastProps): void };
}

const Logout = ({ onLogout }: LogoutProps) => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    onLogout({ color: "info", message: "You have been disconnected" });
    console.log("tokens removed");
  };

  return (
    <>
      <div onClick={handleLogout}>Logout</div>
    </>
  );
};

export default Logout;
