export type URLParams = {
    [x: string]: string
}

export interface APIResponse<T> {
    status: string,
    payload: T,
    status_code: number
}

export interface LoginRequestPayload {
    email: string
    password: string
}

export interface RegisterRequestPayload {
    email: string
    password: string
    name: string
    surname: string
}

export interface RefreshRequestPayload {
    token: string
}

export type APITokenResponse = APIResponse<TokenPair>
export type GenericAPIReponse = APIResponse<unknown>

export interface TokenPair {
    refresh: string
    token: string
}