"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function AuthDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // ✅ Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <Link
        href="/login"
        className="bg-green-600 px-4 py-1 rounded-full text-white font-semibold hover:bg-green-700 transition"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-gray-100 text-black rounded flex items-center gap-1"
      >
        {user.username} <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded">
          {(user?.role?.name === "Admin" || user?.role?.name === "Caller") && (
            <Link
              href="/admin/users"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              My Dashboard
            </Link>
          )}
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
