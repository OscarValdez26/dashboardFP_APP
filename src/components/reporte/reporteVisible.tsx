import SaldoReporte from "@/components/cuentas/saldoReporte";
import GastosReporte from "@/components/gastos/gastosReporte";
import { fechaCorta } from "@/helpers/formatoFecha";
import Historial from "@/components/reporte/historial";
import { useEffect, useState } from "react";
import Destacados from "./destacados";
import { useAppContext } from "@/context/useAppContext";
import type { ResumenCuentasType } from "@/types";
import MetasReporte from "../metas/metasReporte";
import PresupuestosReporte from "../presupuestos/presupuestosReporte";
import { useMobile } from "@/hooks/useMobile";

type CategoriaTop = {
  categoria: string;
  totalGastado: number;
  fill: string;
};

type PresupuestoTop = {
  idPresupuesto: number;
  categoria: string;
  tipoPresupuesto: "monto" | "porcentaje";
  cantidadPresupuesto: string;
  porcentaje: number;
};

type MetaTop = {
  nombre: string;
  restante: number;
  progreso: string;
};

type CuentaHistorial = {
  mes: string;
  tipoCuenta: string;
  ingresos: string;
  gastos: string;
  balance: string;
};

function ReporteVisible() {
  const { cuentas } = useAppContext();
  const isMobile = useMobile();
  const [categoriaTop, setCategoriaTop] = useState<CategoriaTop>({
    categoria: "",
    totalGastado: 0,
    fill: "",
  });
  const [presupuestoTop, setPresupuestoTop] = useState<PresupuestoTop>({
    idPresupuesto: 0,
    categoria: "",
    tipoPresupuesto: "monto",
    cantidadPresupuesto: "",
    porcentaje: 0,
  });
  const [metaTop, setMetaTop] = useState<MetaTop>({
    nombre: "",
    restante: 0,
    progreso: "",
  });
  const [cartera, setCartera] = useState<ResumenCuentasType>({
    idCuenta: 0,
    nombre: "",
    saldo: "",
    tipo: "",
    fechaInicio: "",
    fechaFinal: "",
    ingresos: "",
    gastos: "",
    ingresosT: "",
    gastosT: "",
    porcentaje: "",
  });

  const [carteraAnterior, setCarteraAnterior] = useState<CuentaHistorial>({
    mes: "",
    tipoCuenta: "",
    ingresos: "",
    gastos: "",
    balance: "",
  });

  useEffect(() => {
    if (!cuentas) return;
    const cuenta = cuentas?.find((cuenta) => cuenta.tipo === "cartera");
    setCartera(cuenta!);
  }, [cuentas]);
  return (
    <div className="grid-page">
      <div className="py-8 col-span-full">
        <h2 className="text-md font-medium">Reporte general de Mis Finanzas</h2>
        <p className="text-sm">{fechaCorta(new Date().toISOString())}</p>
      </div>

      <SaldoReporte cartera={cartera} />
      {!isMobile && (
        <GastosReporte setCategoriaTop={setCategoriaTop} altura="h-70" />
      )}
      {isMobile && (
        <GastosReporte setCategoriaTop={setCategoriaTop} altura="h-50" />
      )}
      <Historial setCarteraAnterior={setCarteraAnterior} isExportable={false} />
      {!isMobile && <MetasReporte setMetaTop={setMetaTop} />}
      {!isMobile && (
        <PresupuestosReporte setPresupuestoTop={setPresupuestoTop} />
      )}
      <Destacados
        categoriaTop={categoriaTop}
        presupuestoTop={presupuestoTop}
        metaTop={metaTop}
        cartera={cartera}
        carteraAnterior={carteraAnterior}
      />
    </div>
  );
}

export default ReporteVisible;
