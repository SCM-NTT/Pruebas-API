// src/components/Profile.tsx
import { useEffect, useState } from "react";
import { fetchUserData } from "../services/tasks";
import type { ApiResponse, UserProfile } from "../types/auth";

export function Profile() {
  const [data, setData] = useState<ApiResponse<UserProfile> | null>(null);

  useEffect(() => {
    fetchUserData()
      .then((result) => {
        console.log("Datos recibidos:", result);
        setData(result);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  useEffect(() => {
    
      console.log("Estado actualizado:", data);

  }, [data]);



  if (!data) return <p>Cargando…</p>;
  else {
    return (
      <div>
        <p>{data.message}</p>
        <p>Hola, {data.user.name}</p>
      </div>
    );
  }
}
