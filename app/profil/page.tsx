"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return alert(error.message);

    router.push("/watchlist");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-4 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="w-full border p-2 mb-4 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
      >
        Se connecter
      </button>
    </div>
  );
}
