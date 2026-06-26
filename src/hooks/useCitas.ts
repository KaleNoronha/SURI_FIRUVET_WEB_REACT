import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@auth/index";
import { citaService, mascotaService, catalogoService } from "@services/index";
import type { Cita, Mascota, TipoCita, Clinica } from "@appTypes";

export function useCitas() {
  const { idCliente } = useAuth();
  const [citas, setCitas]       = useState<Cita[]>([]);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [tiposCita, setTiposCita] = useState<TipoCita[]>([]);
  const [clinicas, setClinicas]   = useState<Clinica[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  // Catálogos SOAP — en background
  useEffect(() => {
    Promise.all([
      catalogoService.getTiposCita(),
      catalogoService.getClinicas(),
    ]).then(([tipos, cls]) => {
      setTiposCita(tipos.map(t => ({ ...t, id: Number(t.id) })));
      setClinicas(cls.map(c => ({ ...c, id: Number(c.id) })));
    }).catch(() => {});
  }, []);

  const recargar = useCallback(async () => {
    if (!idCliente) return;
    const data = await citaService.getByCliente(idCliente);
    setCitas(data);
  }, [idCliente]);

  useEffect(() => {
    if (!idCliente) { setLoading(false); return; }
    Promise.all([
      citaService.getByCliente(idCliente),
      mascotaService.getByCliente(idCliente),
    ]).then(([c, m]) => { setCitas(c); setMascotas(m); })
      .catch(e => setError(e instanceof Error ? e.message : "Error al cargar citas"))
      .finally(() => setLoading(false));
  }, [idCliente]);

  return { citas, mascotas, tiposCita, clinicas, loading, error, recargar, idCliente };
}
