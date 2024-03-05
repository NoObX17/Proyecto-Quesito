export interface DecodedToken {
    iss: string;
    aud: string;
    iat: number;
    nbf: number;
    exp: number;
    data: {
        dni: string;
        nombre: string;
        apellido1: string;
        apellido2: string;
        Email: string;
        ciclo: string;
    };
}
