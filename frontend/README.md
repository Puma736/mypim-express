# 🎨 Frontend - My PiM Express

Esta carpeta contiene todo el código del lado del cliente (Interfaz de Usuario) para My PiM Express.

## Responsabilidades del Programador Frontend
- Diseñar y desarrollar la interfaz Mobile-First.
- Crear la Landing Page y el embudo de "Crear Cuenta".
- Maquetar la calculadora financiera y sus resultados dinámicos.
- Consumir la API REST desarrollada por el equipo Backend.

## Instrucciones para Empezar
Aquí deberás inicializar el proyecto Frontend usando tu framework favorito (por ejemplo, React, Next.js o Vite).

1. Abre tu terminal en esta ruta (`mypim-express/frontend`).
2. Ejecuta el comando de instalación de tu framework (Ej: `npx create-next-app@latest .` o `npm create vite@latest .`).
3. Actualiza este archivo `README.md` con los comandos específicos para levantar tu servidor de desarrollo (Ej: `npm run dev`).

> **Nota para la integración:** Mientras el backend no esté construido, usa JSONs locales o datos "falsos" (mocks) para probar que tus pantallas funcionen correctamente.

---

## 🛠️ Flujo de Trabajo en Git (Repositorio Compartido)

**Regla de Oro:** 🚫 NUNCA guardes cambios (`commit` o `push`) directamente en la rama `main`. 

Sigue siempre estos pasos para cada tarea:

1. **Asegúrate de estar al día:** (Antes de crear nada, baja lo último del equipo)
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Crea tu propia rama de trabajo:** (Por ejemplo: `feat/landing-page` o `ui/calculadora`)
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
