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
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    
    setErrorMessage(""); 

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    };

  const {data, error } = await supabase.auth.signUp({ email, password });
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
  const userId = data.user?.id;

    dispatch(
      setUser({
        id: userId,
        email,
        username: email.split("@")[0],
      })
    );
  setConfirmation(true);
  router.push("/login");
}
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center mt-20 border-2 border-gray-200 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
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
      
      <div className="w-full mb-4">
        <label className="block text-sm font-medium mb-1">Confirmez le mot de passe :</label>
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Répétez le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {errorMessage && (
        <p className="text-red-600  mb-4">{errorMessage}</p>
      )}
      <div>
        {confirmation ? (
          <p className="text-green-600 mb-4">
            Un email de confirmation a été envoyé. Veuillez vérifier votre boîte de réception.
          </p>
            ) : null }
      </div>
      <button
        onClick={handleRegister}
        disabled={!email || !password || !confirmPassword}
        className="w-full bg-black text-white p-2 rounded hover:bg-green-600 hover:text-black disabled:opacity-50 disabled:bg-"
      >
        S’inscrire
      </button>
    </div>
  );
}
