# My PiM Express (Cosmetics & Beauty Edition) - Especificación Funcional Completa

**My PiM Express** es una plataforma web "Plataforma como Servicio" (SaaS) de orientación RegTech y consultoría financiera para microemprendedores en Bolivia, adaptada para la **Edición Especial de Cosmética, Dermocosmética, Maquillaje y Estética** (Hackatón **HACKBIZ 2026 - UAGRM**).

---

## 1. Descripción General del Proyecto
Plataforma web orientada a emprendedores y formuladores artesanales de cosmética natural, dermocosmética y estética en Bolivia (Santa Cruz de la Sierra, La Paz, Cochabamba y El Alto).
Centraliza en un solo lugar 3 grandes áreas:
1. **Asesoría y Orientación Legal (RegTech)**: Ruta paso a paso para SEPREC, SIN (NIT), GAM (Alcaldía), BPM Simplificadas de Taller y Notificación Sanitaria Obligatoria (NSO) ante AGEMED bajo la normativa andina (Decisiones CAN 516 y 833).
2. **Estructura y Análisis de Costos**: Motor reactivo de costeo por lote con mermas de producción (3%-8%), packaging, mano de obra ($MOD$), costos indirectos ($CIF$), $CUP$, $PVP$ $B2C/B2B$ y Punto de Equilibrio.
3. **Educación Financiera y Contable**: Microcápsulas educativas (Sueldo del fundador vs. Ganancias, método PEPS para aceites e hidrolatos) y simulador interactivo de Combos y Kits de Belleza.

---

## 2. Objetivo de la Plataforma Web
Permitir a un emprendedor cosmético:
- Crear una cuenta personal y registrar su perfil de marca.
- Seleccionar su subrubro técnico cosmético (`SR-01` a `SR-04`).
- Monitorear su avance mediante el **Termómetro de Formalización Legal**.
- Generar y previsualizar en vivo la **Ficha de Etiquetado e INCI** conforme a la norma de rotulado de AGEMED.
- Calcular con cero desfase el costo por lote y precio sugerido en Bolivianos ($Bs.$).
- Acceder a contenidos educativos de finanzas y simular kits de venta para ferias artesanales.
- Guardar información en su catálogo local/servidor y exportar Fichas Técnicas de Costos en PDF.

---

## 3. Estructura General de la Página

### Página Principal (Landing Page & Embudo)
- **Cabecera**: Título *MY PIM EXPRESS (Cosmetics & Beauty Edition)*.
- **Propuesta de Valor & Triple Impacto**:
  - *Sostenibilidad*: Uso responsable de botánicos amazónicos/chiquitanos y control de mermas.
  - *Empleo Juvenil y Femenino*: Valoración justa de mano de obra ($MOD$).
  - *Formalización*: Orientación en trámites ante AGEMED y municipios.
- **Sección "Acerca de Nosotros"**: Concepto del proyecto y visión Hackatón HACKBIZ 2026 UAGRM.
- **Acceso Rápido**: Botones de "Iniciar Sesión", "Crear Cuenta" y acceso directo a la Calculadora de Costos.

---

## 4. Registro de Usuario y Perfil de Marca

### Datos Personales
- Nombre y Apellido del emprendedor / fundador.
- Correo electrónico.
- Número de Teléfono / WhatsApp.
- Contraseña.

### Datos Básicos del Emprendimiento Cosmético
- Nombre comercial de la marca (ej: *BioCosmética Bolivia S.R.L.*).
- Subrubro técnico (`SR-01` a `SR-04`).
- Ciudad de Bolivia (Santa Cruz de la Sierra, La Paz, Cochabamba, El Alto).
- Etapa de formalización (Inicial, Taller Operativo, En Notificación AGEMED).

---

## 5. Menú Principal del Usuario (Dashboard)

Una vez iniciada la sesión, la pantalla presenta:
1. **Termómetro de Formalización Legal (%)**: Barra de progreso interactiva del avance en el checklist normativo.
2. **Resumen de Métricas KPI**: Fórmulas creadas, margen promedio $B2C$ (%), estado de Notificación Sanitaria AGEMED.
3. **Módulos Principales**:
   - ⚖️ **1. ASESORÍA LEGAL & NSO AGEMED**: Requisitos SEPREC, SIN, GAM, BPM y Generador de Etiquetas INCI.
   - 📊 **2. ESTRUCTURA DE COSTOS**: Motor reactivo por lote de producción.
   - 📚 **3. EDUCACIÓN FINANCIERA & KITS**: Microcápsulas y Simulador de Combos para Ferias.

---

## 6. MÓDULO 1 – ASESORÍA LEGAL & NSO AGEMED

### Subrubros Técnicos del Nicho (`SR-01` a `SR-04`)
- **[SR-01] Cosmética Natural y Artesanal**: Jabonería botánica, champú sólido, aceites de macerado, mantecas corporales.
- **[SR-02] Dermocosmética / Cuidado Facial y Capilar**: Sérums activos, tónicos, cremas antiedad, mascarillas arcillosas.
- **[SR-03] Maquillaje y Pigmentación**: Labiales, rubores ecológicos, sombras minerales.
- **[SR-04] Servicios de Belleza y Cabina**: Lashistas, manicuristas, facialistas, estética.

### Etapas Secuenciales de la Ruta Legal Boliviana
1. **Comercial Base**:
   - **SEPREC**: Registro de Matrícula de Comercio (Unipersonal / SRL).
   - **SIN**: Obtención del NIT en el Padrón Nacional Biométrico Digital (PBD-digital).
   - **GAM (Alcaldía)**: Licencia de Funcionamiento Municipal para taller o cabina (SCZ, LP, CBBA, El Alto).
2. **Sanitaria y Técnica (AGEMED & CAN 516 / 833)**:
   - **BPM Simplificadas**: Buenas Prácticas de Manufactura para talleres artesanales.
   - **AGEMED**: Notificación Sanitaria Obligatoria (NSO) bajo Decisiones CAN 516 y 833.
   - **Estándar de Rotulado e INCI**: Generador interactivo de etiqueta con nomenclatura INCI en orden decreciente, contenido neto ($g/ml$), lote, vencimiento, datos del titular e instrucciones de uso.
   - **Disclaimer Legal Obligatorio**: Orientación metodológica que no sustituye ensayos de laboratorio ni regencia farmacéutica de AGEMED.

---

## 7. MÓDULO 2 – MOTOR MATEMÁTICO REACTIVO DE COSTEO

### Algoritmo Matemático de Costeo por Lote
1. **Conversión Automática de Unidades**:
   - $1\ \text{Kg} = 1000\text{g}$, $1\ \text{L} = 1000\text{ml}$, $1\ \text{gota} = 0.05\text{ml}$ ($20\ \text{gotas} = 1\text{ml}$).
2. **Costo Proporcional de Materia Prima ($MP_i$)**:
   $$\text{Costo MP}_i = \left( \frac{\text{Precio Matriz}_i}{\text{Cantidad Matriz en Unidad Base}_i} \right) \times \text{Cantidad Usada}_i$$
3. **Factor de Merma Física ($FM$)**:
   Configurable entre 3% y 8% (Default 5%):
   $$\text{Costo MP Total con Merma} = \left( \sum_{i=1}^n \text{Costo MP}_i \right) \times (1 + FM)$$
4. **Costo Total de Packaging ($CP$)**:
   $$\text{CP} = \sum \text{Envase Primario} + \text{Gotero/Tapa} + \text{Etiquetas} + \text{Precinto} + \text{Caja Secondary}$$
5. **Mano de Obra Directa ($MOD$)**:
   $$\text{MOD} = \text{Horas Invertidas} \times \text{Tarifa Horaria Estimada (Bs/h)}$$
6. **Costos Indirectos Prorrateados ($CIF$)**: Alquiler, electricidad, agua destilada asignados al lote.
7. **Costo Unitario de Producción ($CUP$)**:
   $$\text{CUP} = \frac{\text{Costo MP con Merma} + \text{CP} + \text{MOD} + \text{CIF}}{U}$$
8. **Precios Sugeridos y Punto de Equilibrio**:
   - $\text{PVP Minorista (B2C)} = \frac{\text{CUP}}{1 - \text{Margen B2C (ej. 0.55)}}$
   - $\text{Precio Mayorista (B2B)} = \frac{\text{CUP}}{1 - \text{Margen B2B (ej. 0.30)}}$
   - $\text{Punto de Equilibrio (Unidades/Mes)} = \frac{\text{Costos Fijos Mensuales}}{\text{PVP B2C} - \left(\text{CUP} - \frac{\text{CIF}}{U}\right)}$

---

## 8. MÓDULO 3 – EDUCACIÓN FINANCIERA & SIMULADOR DE KITS

### Microcápsulas Educativas
- **Sueldo del Fundador vs. Ganancias de la Empresa**: Diferencia entre la mano de obra ($MOD$) y las utilidades netas de la marca.
- **Método PEPS para Aceites y Principios Activos**: Control de inventario de insumos botánicos perecederos para evitar enranciamiento.
- **Fijación de Precios en Ferias Artesanales**: Estrategia comercial para evitar descuentos destructivos.

### Simulador Interactivo de Combos y Kits de Belleza
- Selección de productos del catálogo.
- Aplicación de porcentaje de descuento promocional (ej. 15% OFF).
- Cálculo instantáneo del costo combinado del pack, precio regular, precio de combo, ganancia neta en Bolivianos ($Bs.$) y porcentaje de margen resultante.

---

## 9. Flujo Básico de Navegación

```text
LANDING PAGE (Propuesta de Valor & Triple Impacto)
       │
       ├──> Iniciar Sesión / Crear Cuenta (Perfil de Marca)
       │
       └──> DASHBOARD PRINCIPAL (Termómetro de Formalización %)
              │
              ├──> MÓDULO 1: Ruta Legal & Generador de Etiqueta INCI (AGEMED)
              │
              ├──> MÓDULO 2: Calculadora de Costeo por Lote (CUP, PVP, Punto Equilibrio)
              │      └──> Exportación de Ficha Técnica de Costos
              │
              └──> MÓDULO 3: Academia Financiera & Simulador de Kits de Belleza
```

---

## 10. Arquitectura de Código del Monorepo

```text
mypim-express/
│
├── frontend/               # 🎨 Cliente React 18 + Vite + Tailwind CSS + Lucide Icons
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx                 # Barra superior y badge de formalización
│   │   │   ├── LandingHero.jsx            # Presentación Triple Impacto HACKBIZ 2026
│   │   │   ├── Dashboard.jsx              # Panel principal y catálogo de fórmulas
│   │   │   ├── LegalRouteModule.jsx       # Módulo 1 (SEPREC, SIN, GAM, AGEMED)
│   │   │   ├── InciLabelGenerator.jsx     # Generador de Etiqueta INCI con preview en vivo
│   │   │   ├── CostCalculatorModule.jsx   # Módulo 2 (Motor reactivo de costeo)
│   │   │   ├── AcademyModule.jsx          # Módulo 3 (Academia y simulador de combos)
│   │   │   ├── BrandProfileModal.jsx      # Modal de configuración de marca
│   │   │   └── TechnicalSheetModal.jsx    # Modal de Ficha Técnica imprimible
│   │   ├── utils/
│   │   │   ├── costingEngine.js           # Algoritmo matemático y conversión de unidades
│   │   │   ├── legalData.js               # Requisitos SEPREC, SIN, GAM, AGEMED, CAN
│   │   │   └── academyData.js             # Lecciones financieras y datos de combos
│   │   ├── App.jsx                        # Layout principal y enrutado de pestañas
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js                 # Paleta de colores (Sage/Clay/Linen)
│   └── vite.config.js
│
├── backend/                # ⚙️ Servidor Node.js + Express (API REST)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── costing.routes.js          # API REST de cálculo de costeo
│   │   │   ├── legal.routes.js            # API REST de checklist legal
│   │   │   └── profile.routes.js          # API REST de estado y salud
│   │   └── server.js                      # Servidor Express
│   └── package.json
│
└── README.md               # Especificación funcional del proyecto
```

---

## 11. Ejecución del Proyecto en Entorno Local

### Frontend (React + Vite):
```bash
cd frontend
npm install
npm run dev
```
Servidor disponible en: `http://localhost:3000`

### Backend (Node.js + Express):
```bash
cd backend
npm install
npm run dev
```
Servidor API disponible en: `http://localhost:5000`
