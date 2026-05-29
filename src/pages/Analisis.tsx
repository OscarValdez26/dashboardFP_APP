import ReporteGeneral from "@/components/reporte/reporteGeneral";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { fechaSinDia } from "@/helpers/formatoFecha";
import { Spinner } from "@/components/ui/spinner";

function Analisis() {
  const reporteRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const exportarPDF = async () => {
    setLoading(true);
    if (!reporteRef.current) return;

    const dataUrl = await toPng(reporteRef.current, {
      cacheBust: true,
      pixelRatio: 2,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
    });

    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      const pdfWidth = 216;
      const pdfHeight = (img.height * pdfWidth) / img.width;

      const pageHeight = 279;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;

        pdf.addPage();

        pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);

        heightLeft -= pageHeight;
      }

      pdf.save(`Reporte finanzas ${fechaSinDia(new Date().toISOString())}.pdf`);
      setLoading(false);
    };
  };
  return (
    <div className="flex flex-col items-center">
      <Label className="text-xl font-semibold p-4 justify-center">
        Analisis
      </Label>
      <div className="flex justify-end w-204 py-4">
        <Button variant="secondary" onClick={exportarPDF}>
          {loading && <Spinner data-icon="inline-start" />}
          {loading ? "Generando" : "Exportar PDF"}
        </Button>
      </div>

      <div ref={reporteRef}>
        <ReporteGeneral />
      </div>
    </div>
  );
}

export default Analisis;
