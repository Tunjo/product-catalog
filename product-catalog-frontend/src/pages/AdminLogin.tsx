import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <div className="modal modal-open pointer-events-none">
        <div className="modal-box pointer-events-auto max-w-md p-8 bg-base-100 shadow-2xl rounded-2xl flex flex-col items-center">
          <h3 className="font-bold text-2xl text-primary mb-6">Admin Login</h3>
          <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-1/2 mx-auto mt-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
