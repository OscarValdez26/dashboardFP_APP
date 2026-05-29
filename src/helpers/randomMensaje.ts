export const randomMensaje = (tipo: string, porcentaje: number) => {
  const mensajes = {
    saludable: [
      "Excelente control financiero esta semana 👌",
      "Tus gastos están bajo control",
      "Buen trabajo, estás cuidando tu dinero",
      "Vas por buen camino hacia tus metas",
      "Tu balance se mantiene saludable 📈",
      "Sigues gastando menos de lo que ingresas",
      "Tu cartera respira tranquila hoy 😌",
      "Buen equilibrio entre ingresos y gastos",
      "Tus hábitos financieros se ven sólidos",
      "Estás construyendo estabilidad financiera",
    ],
    normal: [
      "Tus movimientos se mantienen estables",
      "Todo parece estar en equilibrio",
      "Sin cambios importantes en tus finanzas",
      "Tu flujo de dinero luce normal",
      "Mantienes un balance aceptable",
      "Tus gastos siguen dentro de lo esperado",
      "Aún tienes margen financiero disponible",
      "Continúa monitoreando tus movimientos",
      "Tu actividad financiera se mantiene constante",
    ],
    advertencia: [
      "Tus gastos aumentaron recientemente ⚠️",
      "Estás usando una mayor parte de tus ingresos",
      "Considera moderar algunos gastos",
      "Tu margen de ahorro está disminuyendo",
      "Podrías ahorrar más este periodo",
      "Tus gastos están creciendo",
      "Mantén atención en tus gastos variables",
      "Tu balance sigue positivo, pero más ajustado",
      "Algunos gastos están consumiendo más de lo habitual",
    ],
    critico: [
      "Tus gastos superan tus ingresos 🚨",
      "Atención: estás entrando en números rojos",
      "Tu balance actual no es sostenible",
      "Necesitas reducir gastos cuanto antes",
      "El flujo financiero actual es negativo",
      "Tu cartera está bajo presión",
      "Considera pausar gastos innecesarios",
      "Tu nivel de gasto es demasiado alto",
      "Podrías tener problemas de liquidez pronto",
      "Es momento de reorganizar tus finanzas",
    ],
    ahorro: [
      "Cada ahorro te acerca a tus objetivos 🎯",
      // "Tu meta está avanzando correctamente",
      "Aún puedes acelerar tu progreso",
      //"Buen ritmo de ahorro para tus metas",
      "Tu disciplina financiera dará resultados",

      "Pequeños ahorros crean grandes resultados 💰",
      "Tu yo del futuro te lo agradecerá",
      "Ahorrar hoy es invertir en tranquilidad",
      "Cada peso guardado suma libertad",
      "Vas construyendo estabilidad paso a paso",

      "La constancia vale más que la cantidad",
      // "Tus hábitos financieros están mejorando 📈",
      "Todo gran patrimonio empieza con un ahorro",
      "No subestimes el poder de ahorrar constantemente",
      "Tu esfuerzo financiero está dará frutos",

      "Ahorrar también es una forma de cuidarte",
      //"Tu meta está más cerca de lo que parece",
      "Cada avance cuenta, aunque sea pequeño",
      "La paciencia financiera siempre recompensa",
      // "Tus finanzas se están fortaleciendo 🔥",

      "Un buen ahorro abre nuevas oportunidades",
      "La disciplina de hoy será tranquilidad mañana",
      // "Estás construyendo una base financiera sólida",
      // "Tus decisiones inteligentes están sumando",
      "Cada semana de ahorro es progreso real",

      "Mantener el hábito es la verdadera victoria",
      "Tus metas merecen este esfuerzo",
      // "Vas por un camino financiero saludable",
      // "Tu control financiero está mejorando cada día",
      "Ahorrar es darte más opciones en el futuro",

      // "Tu compromiso con tus metas se nota 💪",
      "Incluso los pequeños avances tienen impacto",
      "La estabilidad financiera se construye así",
      // "Sigue así, tu progreso es real",
      //"Estás desarrollando excelentes hábitos financieros",

      "Cada moneda guardada trabaja para tu futuro",
      "Tu ahorro es una inversión en tranquilidad",
      "La mejor forma de avanzar es ser constante",
      "Tu esfuerzo de hoy será libertad mañana ✨",
      "Las metas grandes se logran paso a paso",
    ],
    metaInicial: [
      "Tu meta aún está comenzando 🚀",
      "Cada pequeño ahorro cuenta",
      "Aún estás lejos de tu objetivo, pero ya diste el primer paso",
      "Es buen momento para aumentar tus aportaciones",
      "Tu meta necesita un poco más de impulso",
      "Todavía hay mucho camino por recorrer",
      "Puedes acelerar tu progreso con pequeños ajustes",
      "Mantén la constancia y verás resultados",
      "Tu objetivo sigue en construcción 🛠️",
      "Aún tienes margen para ahorrar más este periodo",
    ],
    metaMedia: [
      "Estás avanzando de forma constante 📈",
      "Tu meta ya muestra buen progreso",
      "Vas por un excelente camino",
      "Tus esfuerzos comienzan a notarse",
      "Mantienes un ritmo de ahorro saludable",
      "Ya recorriste una buena parte del camino",
      "Continúa así y alcanzarás tu objetivo",
      "Tu disciplina financiera está funcionando",
      "Estás más cerca de lo que parece",
      "Buen trabajo, tu meta sigue creciendo 🎯",
    ],
    metaAlta: [
      "Tu meta está muy cerca 👀",
      "Has logrado un progreso impresionante",
      "Solo falta un último esfuerzo",
      "Ya puedes ver la meta al final del camino",
      "Estás entrando en la recta final",
      "Muy pronto alcanzarás tu objetivo 🎉",
      "Tu constancia está dando grandes resultados",
      "Estás a pocos pasos de completar tu meta",
      "Has mantenido un excelente ritmo de ahorro",
      "Falta muy poco para lograrlo",
    ],
    metaFinal: [
      "¡Tu meta está prácticamente completada! 🏆",
      "Solo necesitas un pequeño empujón final",
      "Estás a nada de conseguirlo",
      "Tu objetivo está al alcance de tu mano",
      "Excelente trabajo, casi terminas 🎯",
      "Has sido muy constante con tus ahorros",
      "La meta está prácticamente asegurada",
      "Ya puedes comenzar a pensar en tu siguiente objetivo",
      "Estás cerrando esta meta con éxito",
      "El esfuerzo valió la pena 💪",
    ],
    metaCumplida: [
      "¡Meta completada con éxito! 🎉",
      "Superaste tu objetivo financiero 🏆",
      "Excelente trabajo, lo lograste",
      "Tus hábitos financieros dieron resultado",
      "Has alcanzado una meta importante",
      "Tu disciplina financiera está dando frutos",
      "Objetivo cumplido exitosamente ✅",
      "Ya puedes comenzar una nueva meta",
      "Lograste lo que te propusiste 🚀",
      "Gran trabajo administrando tu dinero",
    ],
    presupuestoSaludable: [
      "Tus gastos están completamente bajo control ✅",
      "Excelente manejo de tu presupuesto",
      "Aún tienes bastante margen disponible 💸",
      "Tu ritmo de gasto es muy saludable",
      "Vas administrando tu dinero correctamente",
      "Buen trabajo, tus finanzas se ven estables",
      "Estás gastando con mucha disciplina",
      "Tu presupuesto sigue en una zona segura",
      "Mantienes un gran equilibrio financiero ⚖️",
      "Tus hábitos financieros van por buen camino",
    ],

    presupuestoMedio: [
      "Tu presupuesto comienza a ajustarse 👀",
      "Aún estás en control, pero vigila tus gastos",
      "Vas bien, aunque es momento de moderarte",
      "Tus gastos están aumentando poco a poco",
      "Todavía tienes margen disponible",
      "Buen avance, pero evita gastos innecesarios",
      "Tu presupuesto entra en una zona de atención ⚠️",
      "Conviene revisar tus próximos movimientos",
      "Mantén cuidado para no excederte",
      "Aún puedes equilibrar tus finanzas fácilmente",
    ],

    presupuestoCritico: [
      "Tu presupuesto está cerca del límite 🚨",
      "Es momento de reducir gastos innecesarios",
      "Tus gastos están entrando en zona crítica",
      "Cuidado, podrías exceder tu presupuesto pronto",
      "Tu margen disponible es muy bajo ⚠️",
      "Conviene pausar algunos gastos por ahora",
      "Tu presupuesto necesita atención inmediata",
      "Estás muy cerca de superar el límite",
      "Controlar tus próximos gastos será importante",
      "Tu presupuesto está bajo mucha presión 💳",
    ],
    presupuestoExcedido: [
      "Has superado tu presupuesto 🚫",
      "Tus gastos ya rebasaron el límite establecido",
      "Es momento de reajustar tus finanzas",
      "Tu presupuesto quedó completamente agotado",
      "Conviene detener gastos no esenciales inmediatamente",
      "Tus gastos están fuera del rango planeado ⚠️",
      "Necesitas reorganizar este presupuesto cuanto antes",
      "El límite fue superado, revisa tus movimientos",
      "Tu presupuesto requiere una corrección urgente",
      "Este presupuesto ya no tiene margen disponible 💸",
    ],
  };
  if (tipo === "cartera" && porcentaje > 0) {
    if (porcentaje <= 40) {
      return mensajes.saludable[
        Math.floor(Math.random() * mensajes.saludable.length)
      ];
    }
    if (porcentaje > 40 && porcentaje <= 70) {
      return mensajes.normal[
        Math.floor(Math.random() * mensajes.normal.length)
      ];
    }
    if (porcentaje > 70 && porcentaje < 100) {
      return mensajes.advertencia[
        Math.floor(Math.random() * mensajes.advertencia.length)
      ];
    }
    if (porcentaje >= 100) {
      return mensajes.critico[
        Math.floor(Math.random() * mensajes.critico.length)
      ];
    }
  }
  if (tipo === "ahorro") {
    return mensajes.ahorro[Math.floor(Math.random() * mensajes.ahorro.length)];
  }
  if (tipo === "meta" && porcentaje >= 0) {
    if (porcentaje <= 30) {
      return mensajes.metaInicial[
        Math.floor(Math.random() * mensajes.metaInicial.length)
      ];
    }
    if (porcentaje > 30 && porcentaje <= 70) {
      return mensajes.metaMedia[
        Math.floor(Math.random() * mensajes.metaMedia.length)
      ];
    }
    if (porcentaje > 70 && porcentaje < 90) {
      return mensajes.metaAlta[
        Math.floor(Math.random() * mensajes.metaAlta.length)
      ];
    }
    if (porcentaje >= 90 && porcentaje < 100) {
      return mensajes.metaFinal[
        Math.floor(Math.random() * mensajes.metaFinal.length)
      ];
    }
    if (porcentaje === 100) {
      return mensajes.metaCumplida[
        Math.floor(Math.random() * mensajes.metaCumplida.length)
      ];
    }
  }
  if (tipo === "presupuesto" && porcentaje >= 0) {
    if (porcentaje === 0) {
      return "No hay gastos en esta categoría";
    }
    if (porcentaje <= 30) {
      return mensajes.presupuestoSaludable[
        Math.floor(Math.random() * mensajes.presupuestoSaludable.length)
      ];
    }
    if (porcentaje > 30 && porcentaje < 70) {
      return mensajes.presupuestoMedio[
        Math.floor(Math.random() * mensajes.presupuestoMedio.length)
      ];
    }
    if (porcentaje > 70 && porcentaje < 100) {
      return mensajes.presupuestoCritico[
        Math.floor(Math.random() * mensajes.presupuestoCritico.length)
      ];
    }
    if (porcentaje === 100) {
      return mensajes.presupuestoExcedido[
        Math.floor(Math.random() * mensajes.presupuestoExcedido.length)
      ];
    }
  }
  return "";
};
