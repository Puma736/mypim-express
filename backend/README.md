# ⚙️ Backend - My PiM Express

Esta carpeta contiene todo el código del servidor, la API y la conexión a la Base de Datos para My PiM Express.

## Responsabilidades del Programador Backend
- Diseñar la Base de Datos relacional para almacenar usuarios y sus progresos.
- Desarrollar la lógica matemática segura para la calculadora financiera.
- Crear el sistema de Autenticación.
- Proveer una API REST para que el Frontend la consuma.

## Instrucciones para Empezar
Aquí deberás inicializar el proyecto Backend con el lenguaje y framework acordado (por ejemplo, Node.js + Express, o Python + Django/FastAPI).

1. Abre tu terminal en esta ruta (`mypim-express/backend`).
2. Inicializa tu proyecto (Ej: `npm init -y` si usas Node.js).
3. Instala tus dependencias.
4. Actualiza este archivo `README.md` con los comandos específicos para levantar tu servidor local, instrucciones de la base de datos y cómo leer los endpoints.

> **Nota para la integración:** Documenta bien tus Endpoints (Rutas de tu API, qué datos esperas recibir y qué respondes). Esto es crucial para que el Programador Frontend sepa cómo conectarse a tu sistema.

---

## 🛠️ Flujo de Trabajo en Git (Repositorio Compartido)

**Regla de Oro:** 🚫 NUNCA guardes cambios (`commit` o `push`) directamente en la rama `main`. 

Sigue siempre estos pasos para cada tarea:

1. **Asegúrate de estar al día:** (Antes de crear nada, baja lo último del equipo)
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Crea tu propia rama de trabajo:** (Por ejemplo: `feat/api-auth` o `db/calculadora`)
   ```bash
   git checkout -b feat/nombre-de-tu-tarea
   ```

3. **Guarda tu progreso en TU rama:** (Mientras vas programando)
   ```bash
   git add .
   git commit -m "Descripción de lo que hiciste"
   ```

4. **Sube tu rama a GitHub:**
   ```bash
   git push -u origin feat/nombre-de-tu-tarea
   ```

5. **Unir con el resto del proyecto:**
   Ve a la página de GitHub y crea un **Pull Request (PR)** de tu rama hacia `main`. Una vez aprobado, se integrará al código principal.
