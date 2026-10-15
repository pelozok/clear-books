// Suscripción genérica con limpieza. `key` identifica la suscripción (null = inactiva);
// `subscribe(ok, fail)` debe devolver la función de desuscripción de onSnapshot.
import { useEffect, useState } from "react";

const IDLE = { data: null, loading: false, error: null };

export function useLive(key, subscribe) {
  const [state, setState] = useState({ key: null, data: null, loading: true, error: null });
  useEffect(() => {
    if (!key) return undefined;
    return subscribe(
      (data) => setState({ key, data, loading: false, error: null }),
      (error) => setState({ key, data: null, loading: false, error }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  if (!key) return IDLE;
  if (state.key !== key) return { data: null, loading: true, error: null };
  return { data: state.data, loading: state.loading, error: state.error };
}
