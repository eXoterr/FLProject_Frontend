import { APIResponse, APITokenResponse, GenericAPIReponse, LoginRequestPayload, RefreshRequestPayload, RegisterRequestPayload, TokenPair, URLParams } from "./types/api"

const BASE_URL = "https://domain.com/api"

export const useApi = (token?: string) => {
    return new API(token)
}

class API {
    private token?: string

    constructor(token?: string) {
        this.token = token
    }

    async doLogin(email: string, password: string): Promise<APITokenResponse> {
        const payload: LoginRequestPayload = {
            email,
            password
        }

        const result = await this.doRequest<TokenPair>(payload, '/auth/login')
        if (result.status != "ok"){
            throw result.payload
        }

        return result
    }

    async doRegister(email: string, password: string, name: string, surname: string): Promise<GenericAPIReponse> {
        const payload: RegisterRequestPayload = {
            email,
            password,
            name,
            surname
        }

        const result = await this.doRequest(payload, '/auth/register')
        if (result.status != "ok"){
            throw result.payload
        }

        return result
    }

    async doRefresh(refreshToken: string): Promise<APITokenResponse> {
        const payload: RefreshRequestPayload = {
            token: refreshToken
        }

        const result = await this.doRequest<TokenPair>(payload, '/auth/refresh')

        this.token = result.payload?.token

        return result
    }

    private async doRequest<T>(payload: unknown, appendixUrl: string): Promise<APIResponse<T>> {
        const url = BASE_URL + appendixUrl
        try {
            const respRaw = await fetch(url, { method: 'post', body: JSON.stringify(payload) })
            const res = await respRaw.json()
            return res
        } catch (error) {
            throw error
        }
    }

    private async reqWithToken<T>(appendixUrl: string, params: URLParams, method: string) {
        const route = BASE_URL + appendixUrl
        const url = new URL(route)
        for (const param of Object.keys(params)) {
            url.searchParams.append(param, params[param])
        }

        const respRaw = await fetch(url.toString(), { method: method, headers: { 'Authorization': `Bearer ${this.token}` } })
        const resp: APIResponse<T> = await respRaw.json()

        return resp
    }
}