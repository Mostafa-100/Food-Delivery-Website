import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Admin Login Attempted", { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-center text-orange-600 text-2xl font-bold mb-4">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-orange-700 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500" />
              <input
                type="email"
                placeholder="Enter your email"
                className="pl-10 w-full border border-orange-400 focus:ring-orange-500 p-2 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-orange-700 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500" />
              <input
                type="password"
                placeholder="Enter your password"
                className="pl-10 w-full border border-orange-400 focus:ring-orange-500 p-2 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
