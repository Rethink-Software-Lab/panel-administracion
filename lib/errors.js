export class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Error de conexión';
    this.message = 'No se pudo conectar con el servidor';
    this.stack = '';
  }
}
