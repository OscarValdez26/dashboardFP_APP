import { apiRequest } from "@/api/api";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { fechaSinDia } from "@/helpers/formatoFecha";
import { useMobile } from "@/hooks/useMobile";

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

function GastosChart() {
  const [chartData, setChartData] = useState<DatosChartType[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const isMobile = useMobile();
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
            label: dato.categoria,
          };
        });
        setChartData(data);
        setChartConfig(config);
      }
    };
    obtenerGastos();
  }, []);
  return (
    <Card className="card-principal">
      <CardHeader className="items-center pt-4 pb-0">
        <CardTitle>Gastos del mes</CardTitle>
        <CardDescription>
          {fechaSinDia(new Date().toDateString())}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData.length > 0 && (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-70"
          >
            <PieChart>
              {!isMobile && (
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      nameKey="categoria"
                      hideLabel
                      className="w-42"
                    />
                  }
                />
              )}
              <Pie
                data={chartData}
                dataKey="totalGastado"
                nameKey="categoria"
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="categoria" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        )}
        {/* <div className="flex flex-col gap-2 text-sm">
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
        </div> */}
        {chartData.length === 0 && (
          <div className="w-full h-full flex justify-center items-center font-normal">
            Sin datos
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default GastosChart;
