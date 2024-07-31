export default function manifest() {
  return {
    autor: 'Rethink Software Lab',
    lang: 'es-ES',
    name: 'Panel Administración',
    short_name: 'Panel Administración',
    description:
      'Panel de Administración para facilitar la gestión y supervisión de diversas operaciones dentro de la organización.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0070f0',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
