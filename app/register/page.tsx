"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { useAppDispatch } from "@/flux/hook";
import { setUser } from "@/flux/user/slice";

export default function Register() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      dispatch(setUser(email));
      alert("Compte créé, vérifie ton email !");
      router.push("/login");
    }
  };

  return (
    <div className="p-8">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>S’inscrire</button>
    </div>
  );
}
