import { MethodsHttpEnum } from "../utils/enums/request-api.enum"

type ParamsRequestfilter = Omit<IParamsRequest, "method" | "url" | "body">

export const useRequestApi = () => {
    const request = async <T>(params: IParamsRequest) => {
        const { method, url, contentType = "application/json", body, options = {} } = params

        const headers: Record<string, string> =
            contentType !== null
                ? {
                      "Content-Type": contentType,
                  }
                : {}

        const config = useRuntimeConfig()

        const baseURL = config.public.apiGateway as string

        const user = useCookie<UserType>("user")

        if (user?.value?.accessToken) {
            headers.Authorization = `Bearer ${user.value.accessToken}`
        }

        return $fetch<T>(url, {
            baseURL,
            ...options,
            method,
            headers: {
                ...headers,
                ...options.headers,
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJkMzIxNTM1LTBmNGUtNGIwNC04YTY1LWJmMGRjZWEzMzNjMyIsImlhdCI6MTc0ODk1NzM5NywiZXhwIjoxNzQ5MDQzNzk3fQ.bz3cYZo3y-G96ZopfHGEy1IqxZqtKxKRF2OHat7dKtw",
            },
            body,
        })
    }

    return {
        get: <T>(url: string, params: ParamsRequestfilter = {}) =>
            request<T>({ method: MethodsHttpEnum.GET, url, ...params }),
        post: <T>(url: string, body: BodyType, params: ParamsRequestfilter = {}) =>
            request<T>({
                method: MethodsHttpEnum.POST,
                url,
                body,
                ...params,
            }),
        put: <T>(url: string, body: BodyType, params: ParamsRequestfilter = {}) =>
            request<T>({
                method: MethodsHttpEnum.PUT,
                url,
                body,
                ...params,
            }),
        patch: <T>(url: string, body: BodyType, params: ParamsRequestfilter = {}) =>
            request<T>({
                method: MethodsHttpEnum.PATCH,
                url,
                body,
                ...params,
            }),
        delete: <T>(url: string, body: BodyType, params: ParamsRequestfilter = {}) =>
            request<T>({ method: MethodsHttpEnum.DELETE, url, body, ...params }),
    }
}
