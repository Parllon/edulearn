import { useEffect, useState } from 'react';

/**
 * Executa uma função assíncrona e expõe { data, loading, error }.
 * Reexecuta sempre que `deps` mudar. Padroniza os estados de
 * "Carregando..." e de erro nas páginas que consomem a camada de serviço.
 */
export function useAsync(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    setState({ data: null, loading: true, error: null });

    fn()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (active) {
          const message = err instanceof Error ? err.message : 'Ocorreu um erro ao carregar os dados.';
          setState({ data: null, loading: false, error: message });
        }
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
