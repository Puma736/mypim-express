# My PiM Express - Especificación Funcional (MVP)

**My PiM Express** se desarrollará bajo una estrategia de "Plataforma como Servicio" (SaaS) educativa y de diagnóstico, diseñada específicamente para el contexto informal/formal de Bolivia. Esta plataforma no será solo una página web informativa; se convertirá en el primer consultor virtual interactivo de bolsillo para el ecosistema emprendedor del país.

A continuación, se detalla la estructura base unificada y accionable sobre la cual iniciaremos el desarrollo del proyecto, dividida en 4 grandes capas:

## 1. Capa de Diseño (UX/UI y Enfoque Visual)
El desarrollo visual priorizará la utilidad y la velocidad por encima de animaciones pesadas o elementos que distraigan.

* **Diseño Mobile-First:** En Bolivia, la gran mayoría de los microemprendedores gestionan su día a día desde el celular. La interfaz debe priorizar pantallas verticales, botones grandes y textos legibles bajo el sol.
* **Arquitectura Limpia:** La pantalla de inicio (Landing Page) será un embudo directo: explicación corta de la propuesta de valor -> botón gigante de "Crear Cuenta". Nada de menús infinitos.
* **Micro-interacciones:** Elementos visuales que guíen al usuario de manera intuitiva (ej. barras de progreso en la guía legal o alertas de color verde/rojo en los resultados de la calculadora).

## 2. Capa de Desarrollo Técnico (Sistemas y Base de Datos)
Transformación del bosquejo en un sistema real e interactivo:

* **Base de Datos Relacional y Escalable:** Estructurada para guardar datos del usuario (perfil) vinculados a sus respuestas de forma eficiente. 
  * *Ejemplo: Usuario A -> Rubro: Cafetería -> Paso legal actual: 2 -> Datos guardados en calculadora: [Variables financieras de su último intento].*
* **Módulo de Autenticación Seguro:** Registro simple (idealmente con validación de correo o integración rápida con Google) que garantice la privacidad de los datos financieros del emprendimiento.
* **Backend de Cálculo Dinámico:** Programar las funciones matemáticas de la calculadora de costos para que operen al instante cuando el usuario llene los campos.
* **Panel de Administración (CMS):** Un sistema interno para que el equipo pueda subir, editar o actualizar las guías legales y las lecciones educativas sin necesidad de volver a programar la web.

## 3. Capa de Contenido y Datos (Los Pendientes Técnicos)
Esta es la "materia prima" de la plataforma. Para que la web funcione, se deben ejecutar tres mesas de trabajo en paralelo:

* **Mesa Legal (Bolivia):** Definir los primeros 3 o 5 rubros piloto (ej. Gastronomía, Comercio Minorista, Servicios Digitales). Mapear la ruta exacta de formalización: SEPREC, Impuestos Nacionales (NIT), Licencias de Funcionamiento Municipales (adecuadas a alcaldías principales como Santa Cruz, La Paz o Cochabamba), patentes, costos reales en Bolivianos (Bs) y tiempos de espera.
* **Mesa Financiera:** Validar las fórmulas matemáticas base. La calculadora necesitará como mínimo:
  * **Inputs (Entradas):** Costos Fijos Mensuales, Costo Variable por Unidad, Precio de Venta Estimado.
  * **Outputs (Resultados):** Margen de Utilidad, Punto de Equilibrio en Unidades/Dinero y Utilidad Neta Mensual Proyectada.
* **Mesa Educativa:** Diseñar micro-contenido (píldoras de aprendizaje de máximo 3 minutos de lectura) adaptadas a la realidad boliviana (usando ejemplos locales como "la pensión de almuerzos", "la tienda de barrio" o "el taller de confección").

## 4. Capa de Negocio y Conectividad (El Futuro del Proyecto)
Aunque el MVP es una guía automatizada, la plataforma esconde un potente canal de negocios:

* **Estrategia de Captación de Leads:** Al registrar el WhatsApp y la ubicación de los emprendedores, la plataforma genera una base de datos valiosísima.
* **Conversión a Servicio Premium:** El "Pack Completo" o la "Atención Personalizada" abren la puerta para la monetización. Si un emprendedor se traba en un trámite legal de formalización, la plataforma le ofrecerá un botón de "Hablar con un asesor legal en vivo (de pago)" para resolver su caso mediante consultoría tradicional.

---

## 🗺️ Plan de Ruta Sugerido para el Desarrollo (Roadmap)

Para pasar del papel a la realidad, seguiremos este orden cronológico para el desarrollo del software:

1. **📊 FASE 1: Definición (1-2 semanas)**
   * Resolver los pendientes: Fórmulas matemáticas de la calculadora y los primeros 3 rubros legales bien definidos.
2. **🎨 FASE 2: Diseño UX/UI (2-3 semanas)**
   * Crear el prototipo visual (en herramientas como Figma) enfocado 100% en celulares (Mobile-first).
3. **💻 FASE 3: Programación (4-6 semanas)**
   * Desarrollar la base de datos, el sistema de registro de usuarios, la lógica de la calculadora y el panel administrador (CMS).
4. **🚀 FASE 4: Carga de Contenido y Lanzamiento (2 semanas)**
   * Subir los textos legales, las lecciones de educación financiera y lanzar el Producto Mínimo Viable (MVP) al mercado boliviano.

---

## 🏗️ Arquitectura de Carpetas y Trabajo en Equipo (Monorepo)

Para facilitar el trabajo en paralelo de dos programadores, el proyecto se divide en dos entornos completamente independientes dentro del mismo repositorio. Esto permite que ambos avancen sin generar conflictos, para luego integrar los sistemas.

### Estructura de Directorios

```text
mypim-express/
│
├── frontend/               # 🎨 Espacio del Programador Frontend
│   ├── README.md           # Instrucciones y comandos del frontend
│   └── (Aquí se inicializará el proyecto cliente: React, Next.js, etc.)
│
├── backend/                # ⚙️ Espacio del Programador Backend
│   ├── README.md           # Instrucciones y comandos del backend
│   └── (Aquí se inicializará el servidor: Node.js, Express, Python, etc.)
│
└── README.md               # Este documento base
```

### Flujo de Trabajo Recomendado

1. **Independencia Total (Trabajo en Paralelo):** 
   * El **Programador Frontend** trabajará EXCLUSIVAMENTE dentro de la carpeta `frontend/`. Desarrollará las interfaces, la vista móvil y la experiencia de usuario. Mientras el backend no esté listo, usará datos de prueba (mocks) para simular respuestas.
   * El **Programador Backend** trabajará EXCLUSIVAMENTE dentro de la carpeta `backend/`. Diseñará la base de datos, creará la lógica matemática de la calculadora y desarrollará la **API REST** (los endpoints que entregarán y recibirán datos).
2. **El Puente (La Integración a través de la API):** 
   * Una vez que el Backend tenga listos sus "endpoints" (ej. un link como `http://localhost:3000/api/calculadora`), le pasará la documentación de esa API al Frontend.
   * El Frontend conectará sus pantallas a la API real, eliminando los datos de prueba.
3. **Control de Versiones y Ramas (Git):** 
   * Para no estorbarse, cada uno debe trabajar en "ramas" (branches) separadas. 
   * El Frontend podría usar comandos como: `git checkout -b frontend/landing-page`
   * El Backend podría usar comandos como: `git checkout -b backend/auth-api`
   * Al terminar una funcionalidad, la unen a la rama `main` a través de *Pull Requests*.
