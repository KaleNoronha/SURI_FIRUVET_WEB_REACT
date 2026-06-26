import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@auth/index";
import { mascotaService, catalogoService } from "@services/index";
import type { Mascota, TipoMascota } from "@appTypes";

export function useMascotas() {
  const { idCliente } = useAuth();
  const [mascotas, setMascotas]         = useState<Mascota[]>([]);
  const [tiposMascota, setTiposMascota] = useState<TipoMascota[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);

  // Catálogos — independiente de idCliente
  useEffect(() => {
    catalogoService.getTiposMascota()
      .then(tipos => setTiposMascota(tipos.map(t => ({ ...t, id: Number(t.id) }))))
      .catch(() => {});
  }, []);

  const recargar = useCallback(async () => {
    if (!idCliente) return;
    const data = await mascotaService.getByCliente(idCliente);
    setMascotas(data);
  }, [idCliente]);

  useEffect(() => {
    if (!idCliente) { setLoading(false); return; }
    mascotaService.getByCliente(idCliente)
      .then(setMascotas)
      .catch(e => setError(e instanceof Error ? e.message : "Error al cargar mascotas"))
      .finally(() => setLoading(false));
  }, [idCliente]);

  return { mascotas, tiposMascota, loading, error, recargar, idCliente };
}
