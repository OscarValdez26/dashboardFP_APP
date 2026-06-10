import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const iniciarTutorial = () => {
  const driverObj = driver({
    showProgress: true,
    allowClose: false,

    steps: [
      {
        element: "#app",
        popover: {
          title: "Bienvenido a tu app de control de finanzas",
          description:
            "Esta app tiene como proposito ayudarte a llevar un control de tus ingresos y gastos realizados en el mes para que sepas en que estas utilizando tu dinero ademas de ayudarte a administrar presupuestos y objetivos financieros específicos",
          nextBtnText: "Continuar",
          prevBtnText: "Regresar",
        },
      },
      {
        element: "#boton-menu",
        popover: {
          title: "Menú",
          description:
            "Aquí encontraras opciones para crear movimientos, realizar transferencias o cerrar sesión",
          nextBtnText: "Continuar",
          prevBtnText: "Regresar",
        },
      },
      {
        element: "#boton-nuevo-movimiento",
        popover: {
          title: "Nuevo movimiento",
          description:
            "Aquí puedes crear nuevos movimientos de dinero, ingresos para dinero entrante a tus cuentas o gastos por categoría",
          nextBtnText: "Continuar",
          prevBtnText: "Regresar",
        },
      },

      {
        element: "#boton-nueva-transferencia",
        popover: {
          title: "Nueva transferencia",
          description:
            "Mueve dinero entre tus cuentas, por ejemplo de tu cuenta principal llamada Cartera a tu cuenta de ahorro",
          nextBtnText: "Continuar",
          prevBtnText: "Regresar",
        },
      },
      {
        element: "#saldo-card",
        popover: {
          title: "Resumen de saldos",
          description:
            "Visualiza el saldo de tus cuentas, la principal o Cartera, la de ahorro y las relacionadas con metas",
          nextBtnText: "Continuar",
          prevBtnText: "Regresar",
        },
      },
      {
        element: "#gastos-mes",
        popover: {
          title: "Gráfica de gastos",
          description:
            "Los gastos registrados en el mes actual se clasifican por categoría y se pueden ver por medio de una gráfica en este espacio ",
          nextBtnText: "Continuar",
          prevBtnText: "Regresar",
        },
      },
      {
        element: "#metas-card",
        popover: {
          title: "Tus metas",
          description:
            "Crea metas financieras en la pestaña Metas, para las objetivos que quieras lograr, elige un monto objetivo, una fecha limite y podras realizar transferencias a esa meta",
          nextBtnText: "Continuar",
          prevBtnText: "Regresar",
        },
      },
      {
        element: "#presupuestos-card",
        popover: {
          title: "Tus presupuestos",
          description:
            "Asigna presupuestos por categoría en la pestaña de Presupuestos, para saber si gastas más o menos de lo planeado en el mes",
          nextBtnText: "Continuar",
          prevBtnText: "Regresar",
        },
      },
      {
        element: "#tabla-movimientos",
        popover: {
          title: "Ultimos movimientos",
          description:
            "Revisa los ultimos 20 movimientos registrados, si deseas consultar un rango en especifico visita la pestaña Movimientos",
          nextBtnText: "Continuar",
          prevBtnText: "Regresar",
        },
      },
      {
        element: "#app",
        popover: {
          title: "Gracias por usar esta app",
          description:
            "No olvides registrar todos tus movimientos financieros (ingresos y gastos) para que esta app te pueda ser de utilidad",
          prevBtnText: "Anterior",
          doneBtnText: "Finalizar",
        },
      },
    ],
  });

  driverObj.drive();
};
