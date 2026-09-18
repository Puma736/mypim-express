# 🎨 Frontend — MY PIM EXPRESS v2.0
**React 18 + Vite + Tailwind CSS · Salones de Belleza SCZ · HACKBIZ 2026**

---

## Descripción

Interfaz web Mobile-First para estilistas y propietarias de salones de belleza
en Santa Cruz de la Sierra, Bolivia. Implementa los 3 bloques de la UI:

- **Bloque 1 UI:** Formulario de registro del salón (`RegistroEsteticaForm`)
- **Bloque 2A UI:** Simulador RTS con tabla de rangos SIN (`SimuladorRTS`)
- **Bloque 2B UI:** Calculadora de precio de servicios (`CosteoServicioForm`)
- **Bloque 3 UI:** Tarjetas de resultado + botón WhatsApp (`ResultadoRTSCard`, `ResultadoCosteoCard`, `WhatsAppButton`)

---

## Levantar el frontend

```bash
# Desde la carpeta frontend/
npm install
npm run dev      # Desarrollo → http://localhost:3000
npm run build    # Build de producción
npm run preview  # Preview del build
```

---

## Estructura de carpetas

```
frontend/
├── index.html
├── package.json
├── vite.config.js         ← Proxy /api → localhost:5000
├── tailwind.config.js     ← Paleta: rose, gold, charcoal, cream
├── postcss.config.js
└── src/
    ├── main.jsx           ← Entry point React
    ├── App.jsx            ← Router de tabs + estado global (localStorage)
    ├── index.css          ← Tailwind + Google Fonts + animaciones CSS
    │
    ├── utils/
    │   ├── rtsEngine.js         ← calcularRTS() + colorClasses() — sin llamada al backend
    │   └── costingEngine.js     ← calcularPrecioServicio() + formatBs() + generarMensajeWhatsApp()
    │
    └── components/
        ├── Header.jsx             ← Navbar sticky + menú hamburguesa (mobile)
        ├── LandingHero.jsx        ← Página de inicio: stats, features, CTAs
        ├── RegistroEsteticaForm.jsx  ← Formulario Bloque 1: datos del salón
        ├── SimuladorRTS.jsx          ← Calculadora Bloque 2A + tabla referencia RTS
        ├── CosteoServicioForm.jsx    ← Calculadora Bloque 2B con slider de margen
        ├── ResultadoRTSCard.jsx      ← Tarjeta resultado con semáforo de color
        ├── ResultadoCosteoCard.jsx   ← Tarjeta con precio sugerido en grande
        └── WhatsAppButton.jsx        ← Botón final: envía reporte a WhatsApp
```

---

## Módulos de la App (Tabs)

| Tab | Ruta | Componente | Descripción |
|-----|------|-----------|-------------|
| `landing` | Inicio | `LandingHero` | Página de bienvenida |
| `dashboard` | Dashboard | `App` (inline) | KPIs y accesos rápidos |
| `registro` | Mi Salón | `RegistroEsteticaForm` | Registrar/editar salón |
| `rts` | Impuesto RTS | `SimuladorRTS` | Simular categoría tributaria |
| `costeo` | Costeo | `CosteoServicioForm` | Calcular precio de servicio |
| `whatsapp` | Enviar Reporte | `WhatsAppButton` | Reporte completo por WhatsApp |

---

## Paleta de colores

| Token | Hex | Uso |
|-------|-----|-----|
| `rose-500` | `#f43f74` | Color primario — identidad del salón |
| `gold-500` | `#f59e0b` | Acento dorado — premium |
| `charcoal-900` | `#111827` | Textos y fondos oscuros |
| `cream-50` | `#fdfaf7` | Fondo general de la app |

---

## Persistencia de datos

El frontend guarda el estado en `localStorage` (sin backend requerido para el MVP):

| Key | Contenido |
|-----|-----------|
| `mypim_estetica` | Perfil del salón (objeto único) |
| `mypim_servicios` | Últimos 20 servicios calculados (array) |

---

## Lógica de los motores (cliente)

Los motores corren **directamente en React** sin llamadas al backend, para respuesta instantánea:

```js
// rtsEngine.js
import { calcularRTS } from './utils/rtsEngine.js';
const resultado = calcularRTS(25000);
// → { categoria_rts: "Categoría 4", pago_bimestral: 158, alerta_color: "yellow", ... }

// costingEngine.js
import { calcularPrecioServicio } from './utils/costingEngine.js';
const precio = calcularPrecioServicio({
  nombre_tratamiento: 'Tinte raíz',
  costo_insumos: 45,
  horas_trabajadas: 2,
  mano_obra_por_hora: 25,
  margen_deseado_porcentaje: 50
});
// → { precio_sugerido: 220, ganancia_por_servicio: 110, ... }
```

---

## WhatsApp (Bloque 3)

El botón de WhatsApp genera una URL con el mensaje pre-formateado:

```
https://wa.me/59176000000?text=💄 *MY PIM EXPRESS — Reporte*%0A...
```

Para cambiar el número de soporte, editar la prop `numeroSoporte` en `App.jsx`:

```jsx
<WhatsAppButton
  estetica={estetica}
  servicio={ultimoServicio}
  rts={rts}
  numeroSoporte="59176000000"   // ← Cambiar por el número real del equipo
/>
```
