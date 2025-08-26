"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          full_name: fullName,       // ✅ matches Strapi field
          phone_number: phoneNumber, // ✅ matches Strapi field
        }),
      }
    );

    const data = await res.json();

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } else {
      alert(data.error?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-10 right-10"></div>
      </div>

      {/* Signup card */}
      <form
        onSubmit={handleSignup}
        className="relative z-10 w-full max-w-sm bg-black/40 backdrop-blur-xl text-white p-8 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.25)] border border-green-500/40"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-green-400">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-800/70 border border-gray-600 focus:border-green-400 focus:ring-1 focus:ring-green-500 outline-none transition"
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-800/70 border border-gray-600 focus:border-green-400 focus:ring-1 focus:ring-green-500 outline-none transition"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-800/70 border border-gray-600 focus:border-green-400 focus:ring-1 focus:ring-green-500 outline-none transition"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-800/70 border border-gray-600 focus:border-green-400 focus:ring-1 focus:ring-green-500 outline-none transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-gray-800/70 border border-gray-600 focus:border-green-400 focus:ring-1 focus:ring-green-500 outline-none transition"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-green-500/40 transition-transform transform hover:scale-[1.02]"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-400 mt-5 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-400 hover:text-green-300 hover:underline transition"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
