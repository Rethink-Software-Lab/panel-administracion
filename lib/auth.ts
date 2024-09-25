import { jwtVerify } from 'jose';

interface UserJwtPayload {
  username: string;
  exp: number;
  origIat: number;
  id: number;
  rol: string;
  area_venta: number | null;
}

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret || secret.length === 0) {
    throw new Error('No se ha definido la variable de entorno JWT_SECRET_KEY');
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
      { algorithms: ['HS256'] }
    );
    return verified.payload;
  } catch (error) {
    throw new Error('Error al verificar el token');
  }
};
