import SunHorizon from '../assets/icons/SunHorizon.svg?react'
import CloudSun from '../assets/icons/CloudSun.svg?react'
import MoonStars from '../assets/icons/MoonStars.svg?react'
import type React from "react"
import Icon from "../components/icon"
import Text from "../components/text"

const periods = {
  morning: {
    title: "Manhã",
    icon: SunHorizon,
    time: "9h-12h",
  },
  afternoon: {
    title: "Tarde",
    icon: CloudSun,
    time: "13h-18h",
  },
  night: {
    title: "Noite",
    icon: MoonStars,
    time: "19h-21h",
  },
} as const

interface Props {
  period: keyof typeof periods
  children: React.ReactNode
}

export default function PeriodList({ period, children }: Props) {
  return (
    <section className="rounded-lg border border-gray-600">
      <div className="flex items-center justify-between gap-6 border-gray-600 border-b px-5 py-3">
        <div className="flex items-center gap-2">
          <Icon className="size-5 fill-yellow" svg={periods[period].icon} />
          <Text as="h3" className="text-gray-300" variant={"text-sm"}>
            {periods[period].title}
          </Text>
        </div>

        <Text className="text-gray-400" variant={"text-md"}>
          {periods[period].time}
        </Text>
      </div>
      <ul className="flex flex-col gap-0.5 p-5">{children}</ul>
    </section>
  )
}
