/** Reemplazo del paquete `ws` en el navegador (Supabase / dependencias). El stub de Vite lanza si se usa; acá delegamos al WebSocket nativo. */
export default globalThis.WebSocket;
