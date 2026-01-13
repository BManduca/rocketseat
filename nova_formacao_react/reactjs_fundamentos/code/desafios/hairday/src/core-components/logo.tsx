/** biome-ignore-all lint/correctness/useImageSize: será utilizado wid e hei da propria imagem */
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import logo from "../assets/logo.svg"

export default function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "rounded-tl-xl rounded-br-xl bg-zinc-700 px-5 py-3",
        className
      )}
      {...props}
    >
      <img alt="Logo aplicação HairDay" src={logo} />
    </div>
  )
}
