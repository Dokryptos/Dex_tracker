"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAppDispatch } from "@/flux/hook";
import { setUser } from "@/flux/profiles/slice";
import { useRouter } from "next/navigation";

export default function Register() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async () => {
  const { data: signUpData, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      if (
        error.message.includes("already registered") ||
        error.status === 400
      ) {
        alert("Cet email est déjà enregistré.");
      } else {
        alert(error.message);
      }
    } else {
  const userId = signUpData.user?.id;
  
  const { error: insertError } = await supabase
      .from("profiles")
      .insert([{ id: userId, email, username }]);

    if (insertError) {
      console.error("Erreur d'insertion dans la table 'profiles':", insertError);
      alert("Inscription réussie, mais une erreur est survenue lors de l’enregistrement du profil.");
      return;
    };


  dispatch(setUser({id: userId, email, username}));
  setConfirmation(true);
  router.push("/login");
}
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center mt-20 border-2 border-gray-200 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <div className="w-full mb-2">
        <h2>User :</h2>
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="w-full mb-2">
        <h2>Email :</h2>
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full mb-2">
        <h2>Password :</h2>
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        {confirmation ? (
          <p className="text-green-600 mb-4">
            Un email de confirmation a été envoyé. Veuillez vérifier votre boîte de réception.
          </p>
            ) : null }
      </div>
      <button
        onClick={handleRegister}
        disabled={!email || !password}
        className="w-full bg-black text-white p-2 rounded hover:bg-green-600 hover:text-black disabled:opacity-50 disabled:bg-"
      >
        S’inscrire
      </button>
    </div>
  );
}
