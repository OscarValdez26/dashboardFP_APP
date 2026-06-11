import { useAppContext } from "@/context/useAppContext";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function useTutorial() {
  const { setTutorialActivo } = useAppContext();
  const iniciarTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      allowClose: false,

      steps: [
        {
          element: "#app",
          popover: {
            title: "Bienvenido a tu app de control financiero",
            description:
              "Esta aplicación te ayudará a llevar un control de tus ingresos y gastos para que sepas en qué utilizas tu dinero. También podrás administrar presupuestos y crear metas financieras para alcanzar tus objetivos.",
            nextBtnText: "Continuar",
            prevBtnText: "Regresar",
          },
        },
        {
          element: "#boton-menu",
          popover: {
            title: "Menú principal",
            description:
              "Aquí encontrarás opciones para crear movimientos, realizar transferencias entre cuentas y cerrar sesión.",
            nextBtnText: "Continuar",
            prevBtnText: "Regresar",
          },
          onHighlighted: () => {
            setTutorialActivo(true);
          },
        },
        {
          element: "#boton-nuevo-movimiento",
          popover: {
            title: "Nuevo movimiento",
            description:
              "Registra nuevos movimientos de dinero. Puedes agregar ingresos para dinero que entra a tus cuentas o gastos clasificados por categoría.",
            nextBtnText: "Continuar",
            prevBtnText: "Regresar",
          },
        },

        {
          element: "#boton-nueva-transferencia",
          popover: {
            title: "Nueva transferencia",
            description:
              "Mueve dinero entre tus cuentas. Por ejemplo, puedes transferir fondos de tu cuenta principal a tu cuenta de ahorro.",
            nextBtnText: "Continuar",
            prevBtnText: "Regresar",
          },
        },
        {
          element: "#saldo-card",
          popover: {
            title: "Resumen de saldos",
            description:
              "Consulta el saldo actual de todas tus cuentas, incluyendo tu cuenta principal (Cartera), cuentas de ahorro y cuentas asociadas a metas financieras.",
            nextBtnText: "Continuar",
            prevBtnText: "Regresar",
          },
          onHighlighted: () => {
            setTutorialActivo(false);
          },
        },
        {
          element: "#gastos-mes",
          popover: {
            title: "Gráfica de gastos",
            description:
              "Visualiza cómo se distribuyen tus gastos del mes actual. Los movimientos se agrupan automáticamente por categoría para facilitar su análisis.",
            nextBtnText: "Continuar",
            prevBtnText: "Regresar",
          },
        },
        {
          element: "#metas-card",
          popover: {
            title: "Metas financieras",
            description:
              "Crea metas financieras para los objetivos que deseas alcanzar. Define un monto objetivo, una fecha límite, y realiza aportaciones para dar seguimiento a tu progreso.",
            nextBtnText: "Continuar",
            prevBtnText: "Regresar",
          },
        },
        {
          element: "#presupuestos-card",
          popover: {
            title: "Presupuestos mensuales",
            description:
              "Asigna presupuestos por categoría para controlar tus gastos y comparar cuánto has gastado frente a lo que habías planeado.",
            nextBtnText: "Continuar",
            prevBtnText: "Regresar",
          },
        },
        {
          element: "#tabla-movimientos",
          popover: {
            title: "Últimos movimientos",
            description:
              "Consulta los últimos 20 movimientos registrados. Si deseas buscar movimientos de un período específico, visita la sección Movimientos.",
            nextBtnText: "Continuar",
            prevBtnText: "Regresar",
          },
        },
        {
          element: "#app",
          popover: {
            title: "¡Todo listo!",
            description:
              "Recuerda registrar todos tus ingresos y gastos para aprovechar al máximo las herramientas de análisis, presupuestos y metas financieras de la aplicación.",
            prevBtnText: "Anterior",
            doneBtnText: "Finalizar",
          },
        },
      ],
    });

    driverObj.drive();
  };
  return { iniciarTutorial };
}
