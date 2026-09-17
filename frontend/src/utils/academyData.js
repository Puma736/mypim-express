/**
 * Academia Financiera y Simulador de Kits para Creadores de Belleza en Bolivia
 * Hackatón HACKBIZ 2026 - MY PIM EXPRESS
 */

export const ACADEMY_LESSONS = [
  {
    id: 'lesson-1',
    category: 'Gestión Financiera de la Creadora',
    title: 'Sueldo del Fundador vs. Ganancias de la Empresa',
    readTime: '3 min',
    summary: 'El error #1 en emprendimientos de belleza es pagar gastos personales con el dinero de las ventas del día.',
    content: `
### ¿Por qué debes fijarte un sueldo mensual?
Muchos emprendedores artesanales cometen el error de sacar dinero de la caja para pagar el almuerzo, el transporte o compras personales. Esto destruye la visibilidad financiera del negocio.

#### La regla de oro en cosmética:
1. **Tu Sueldo (MOD/Honorario):** Se incluye dentro del costo de producción ($MOD$) como un costo variable de mano de obra o como una asignación fija mensual. Ese dinero es tuyo para tus gastos personales.
2. **La Ganancia de la Marca:** El margen remanente después de pagar materias primas, empaques, impuestos y tu sueldo pertenece a la **microempresa**. Se destina al fondo de reserva, compra de nueva maquinaria (batidoras, moldes, tanques) y registros ante AGEMED.

> **Ejemplo Práctico:** Si cobras 25 Bs/hora y te toma 2 horas hacer un lote de 20 sérums, te pagas 50 Bs por ese lote. El resto de la ganancia se queda en la cuenta de la marca.
    `,
    takeaway: 'Tú eres una empleada productiva de tu propia marca: asígnate una tarifa por hora o un sueldo fijo.'
  },
  {
    id: 'lesson-2',
    category: 'Control de Inventario y Materia Prima',
    title: 'Método PEPS para Aceites y Principios Activos',
    readTime: '4 min',
    summary: 'Los aceites vegetales, hidrolatos y conservantes tienen fecha de expiración. Aprende a no perder dinero por enranciamiento.',
    content: `
### ¿Qué es el método PEPS (Primeras Entradas, Primeras Salidas)?
En cosmética natural y dermocosmética, trabajamos con insumos orgánicos sensibles a la luz, el oxígeno y la temperatura. Aceites como el de rosa mosqueta o almendras pueden enranciarse (oxidarse) si no se rotan adecuadamente.

#### Pasos para aplicar PEPS en tu taller:
1. **Etiquetado de Recepción:** Al recibir un frasco de aceite o ácido hialurónico, pega una cinta con la **Fecha de Entrada** y la **Fecha de Vencimiento del Proveedor**.
2. **Organización en Estante:** Coloca los insumos más antiguos adelante (Primeros en entrar) y los recién comprados atrás.
3. **Uso Obligatorio:** Utiliza siempre el frasco de adelante para tus lotes actuales.

> **Alerta de Merma:** Si un aceite se enrancia, no solo pierdes el dinero del insumo, sino que arruinas todo el lote de producto terminado.
    `,
    takeaway: 'Lo primero que entra a tu taller debe ser lo primero que usas en tu formulación.'
  },
  {
    id: 'lesson-3',
    category: 'Estrategia de Ventas y Ferias',
    title: 'Fijación de Precios en Ferias Artesanales y Festivales',
    readTime: '3 min',
    summary: 'Cómo calcular el precio correcto en ferias locales sin regalar tu trabajo ni quedar fuera del mercado.',
    content: `
### El mito del "Precio de Feria" barato
En eventos y ferias gastronómicas o artesanales de Santa Cruz, La Paz o Cochabamba, es habitual tentar la rebaja. Sin embargo, en la feria tus costos aumentan (costo del stand, transporte, viáticos, muestras gratis).

#### Fórmula para vender con margen real en feria:
* **Costos Directos del Evento:** Stand + Pasajes + Muestras (Tester) + Empaque especial.
* **Prorrateo de Feria:** Divide el costo del stand entre la cantidad proyectada de unidades a vender.
* **Estrategia de Kits:** En lugar de hacer rebajas en productos individuales (que devalúan tu marca), crea **Combos y Kits de Belleza** combinando un producto estrella con alto margen y un complemento.

> **Efecto Psicológico:** El cliente prefiere llevarse un "Kit Rutina Anti-Edad" con un obsequio pequeño que recibir un descuento de 5 Bs que arruina tu margen.
    `,
    takeaway: 'No descuentes tu producto individual: agrupa en combos atractivos manteniendo tu margen mínimo.'
  }
];

export const SAMPLE_KIT_PRODUCTS = [
  { id: 'kp1', name: 'Sérum Facial Ácido Hialurónico (30ml)', cup: 16.50, defaultPvp: 42.00 },
  { id: 'kp2', name: 'Jabón Artesanal de Miel & Avena (100g)', cup: 6.20, defaultPvp: 18.00 },
  { id: 'kp3', name: 'Bálsamo Labial Cacao del Beni (5g)', cup: 3.80, defaultPvp: 12.00 },
  { id: 'kp4', name: 'Tónico Facial de Hidrolato Rosas (100ml)', cup: 9.40, defaultPvp: 28.00 }
];
