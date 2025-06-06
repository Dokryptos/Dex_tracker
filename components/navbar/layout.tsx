"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <nav className="p-4">
        <div className="flex w-full justify-between">
          <Link href="/" className="text-black font-bold">
            Dashboard
          </Link>
          <div>
            <Link href="/login" className="text-black mr-4">
              Login
            </Link>
            <Link href="/register" className="text-black mr-4">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
