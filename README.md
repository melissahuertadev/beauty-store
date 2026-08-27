# Haru Beauty Studio

MVP de reservas para manicura y pedicura. Incluye:

- Wizard de cliente con cotización dinámica.
- Panel de artista con ficha e historial de clientas.
- Panel de administración para servicios, precios y duración.

## Ejecutar

Instala Node.js LTS (20 o superior), abre una terminal en esta carpeta y ejecuta:

```powershell
npm install
npm run dev
```

Luego abre la dirección que Vite muestre en la terminal, normalmente `http://localhost:5173`.

## Alcance del MVP

Actualmente la información vive en el navegador para validar el flujo y la experiencia. El siguiente hito es conectar Supabase para persistir reservas, fotos, agenda, usuarios/roles y notificaciones por WhatsApp.
