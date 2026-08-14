import { getCookie } from "cookies-next"
import ky from "ky"

export const api = ky.create({
  prefix: "http://localhost:3333",
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        let token: string | undefined

        // verificação para ver se a const window existe, caso negativo
        // está rodando no server side
        if (typeof window === "undefined") {
          const { cookies: serverCookies } = await import("next/headers")
          const cookieStore = await serverCookies()
          token = cookieStore.get("token")?.value
        } else {
          token = (await getCookie("token")) as string | undefined
        }

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`)
        }
      },
    ],
  },
})
