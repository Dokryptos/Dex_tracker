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
    <div className="p-8 flex flex-col items-center justify-center mt-20 border-2 border-gray-200 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      <div className="w-full mb-2">
        <h2 className="mb-2">Email :</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full mb-2">
        <h2 className="mb-2">Password :</h2>
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleLogin}
        className="w-full bg-black text-white p-2 rounded hover:bg-green-600"
      >
        Se connecter
      </button>
    </div>
  );
}
