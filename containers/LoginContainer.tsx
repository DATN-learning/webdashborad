import { authContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { toast } from "react-toastify";
const LoginContainer = () => {
  const { user, login, isLoadingLogin } = authContext();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatedEmail(email)) {
      toast.error("Email is not valid");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    login(email, password);
  };
  const validatedEmail = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white w-96 rounded-lg shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-6">
            {isLoadingLogin ? (
              <div className="flex items-center justify-center">
                <img
                  src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif"
                  alt="loading"
                  className="w-24 h-2w-24"
                />
              </div>
            ) : (
              <button
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                type="submit"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginContainer;
