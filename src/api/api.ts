import { clearAccessToken, getAccessToken, setAccessToken } from "./auth";

const URL = import.meta.env.VITE_BACKEND_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const apiRequest = async (
  method: HttpMethod,
  path: string,
  json?: object,
) => {
  try {
    const sendRequest = (token?: string) => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      const accessToken = token || getAccessToken();
      if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
      const options: RequestInit = {
        method: method,
        headers: headers,
        credentials: "include",
      };
      if (json && method !== "GET") options.body = JSON.stringify(json);
      return fetch(`${URL}${path}`, options);
    };

    let respuesta = await sendRequest();
    try {
      if (respuesta.status === 401) {
        const nuevoToken = await refreshAccessToken();
        setAccessToken(nuevoToken);
        respuesta = await sendRequest(nuevoToken);
      }
    } catch {
      clearAccessToken();
      localStorage.clear();
      window.location.replace("/login");
      throw new Error("Sesion expirada");
    }

    if (!respuesta.ok) {
      const errorText = await respuesta.json();
      throw new Error(errorText.message || "Algo fallo al consultar API");
    }
    const data = await respuesta.json();
    const resultado = {
      success: true,
      data: data,
    };
    return resultado;
  } catch (error) {
    console.error(error);
    const resultado = {
      success: false,
      data: error,
    };
    return resultado;
  }
};

export const refreshAccessToken = async () => {
  const response = await fetch(`${URL}usuarios/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Sesion expirada");
  }

  const data = await response.json();

  return data.accessToken;
};
