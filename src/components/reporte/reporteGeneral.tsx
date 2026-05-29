import SaldoReporte from "@/components/cuentas/saldoReporte";
import GastosReporte from "@/components/gastos/gastosReporte";
import { fechaCorta } from "@/helpers/formatoFecha";
import MetasReporte from "@/components/metas/metasReporte";
import PresupuestosReporte from "@/components/presupuestos/presupuestosReporte";
import Historial from "@/components/reporte/historial";
import { useEffect, useState } from "react";
import Destacados from "./destacados";
import { useAppContext } from "@/context/useAppContext";
import type { ResumenCuentasType } from "@/types";

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

function ReporteGeneral() {
  const { cuentas } = useAppContext();
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
    <div className="flex flex-col items-end w-204 p-12 shadow-lg">
      <div className="py-8">
        <h2 className="text-md font-medium">Reporte general de Mis Finanzas</h2>
        <p className="text-sm">{fechaCorta(new Date().toISOString())}</p>
      </div>

      <SaldoReporte cartera={cartera} />
      <GastosReporte setCategoriaTop={setCategoriaTop} />
      <Historial setCarteraAnterior={setCarteraAnterior} />
      <div className="flex gap-4 w-full mt-24">
        <MetasReporte setMetaTop={setMetaTop} />
        {/* <div className="border-r-2"></div> */}
        <PresupuestosReporte setPresupuestoTop={setPresupuestoTop} />
      </div>
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

export default ReporteGeneral;
