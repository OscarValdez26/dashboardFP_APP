import { apiRequest } from "@/api/api";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { fechaSinDia } from "@/helpers/formatoFecha";
import { formatoDivisa } from "@/helpers/formatoDivisa";

type UltimosGastosType = {
  categoria: string;
  totalGastado: string;
  //fill?: string;
};

type DatosChartType = {
  categoria: string;
  totalGastado: number;
  fill: string;
};

type Props = {
  setCategoriaTop: React.Dispatch<React.SetStateAction<CategoriaTop>>;
  altura: string;
};

type CategoriaTop = {
  categoria: string;
  totalGastado: number;
  fill: string;
};

function GastosReporte({ setCategoriaTop, altura }: Props) {
  const [chartData, setChartData] = useState<DatosChartType[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    const obtenerGastos = async () => {
      const resultado = await apiRequest("GET", "movimientos/gastos");
      if (resultado.success) {
        const data: DatosChartType[] = resultado.data.result.map(
          (dato: UltimosGastosType) => ({
            ...dato,
            totalGastado: Number(dato.totalGastado),
            fill: `var(--color-${dato.categoria})`,
          }),
        );
        const config: ChartConfig = {};
        data.forEach((dato: DatosChartType) => {
          config[dato.categoria] = {
            label: `${dato.categoria} ${formatoDivisa(dato.totalGastado)}`,
          };
        });
        data.sort((a, b) => b.totalGastado - a.totalGastado);
        if (data[0]) setCategoriaTop(data[0]);
        setChartData(data);
        setChartConfig(config);
      }
    };
    obtenerGastos();
  }, []);
  return (
    <div className="flex flex-col items-center w-full pb-8">
      <h3 className="text-md font-medium">Gastos del mes</h3>
      <p className="text-sm">{fechaSinDia(new Date().toISOString())}</p>
      {chartData.length > 0 && (
        <div className="grid grid-cols-2 items-center justify-items-center">
          <ChartContainer
            config={chartConfig}
            className={`${altura} aspect-square`}
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="totalGastado"
                nameKey="categoria"
              />
            </PieChart>
          </ChartContainer>
          <div className="flex flex-col gap-2 text-sm">
            {chartData.map((item) => (
              <div
                key={item.categoria}
                className="flex flex-nowrap items-center gap-2"
              >
                <div
                  className="h-3 w-3 rounded-xs"
                  style={{
                    backgroundColor: `var(--color-${item.categoria})`,
                  }}
                />

                <span>{`${item.categoria}: ${formatoDivisa(item.totalGastado)}`}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {chartData.length === 0 && (
        <div className="w-full h-70 flex justify-center items-center font-normal">
          Sin datos
        </div>
      )}
    </div>
  );
}

export default GastosReporte;
