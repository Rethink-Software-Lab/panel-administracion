interface Numero {
  numero: number;
  ids: string;
}

interface Data {
  color: string;
  numeros: Numero[];
}

export interface ResponseCreateEntrada {
  error: string | null;
  data: Data | null;
}
