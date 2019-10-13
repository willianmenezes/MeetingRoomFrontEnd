export interface Token {
    accessToken: string,
    refreshToken: string,
    autenticado: boolean,
    criado: Date,
    expiration: Date,
    mensagem: string
}