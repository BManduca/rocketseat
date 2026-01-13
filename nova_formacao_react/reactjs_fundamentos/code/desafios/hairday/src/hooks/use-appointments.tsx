import dayjs from "dayjs"
import React from "react"
import useLocalStorage from "use-local-storage"
import { APPOINTMENTS_KEY, type Appointment } from "../models/appointments"

interface Props {
  filters: {
    date?: Date
  }
}

type AppointmentFormatted = Appointment & {
  time: string
}

export default function useAppointments({ filters }: Props = { filters: {} }) {
  const [appointments] = useLocalStorage<Appointment[]>(APPOINTMENTS_KEY, [])

  const [
    morningAppointments,
    afternoonAppointments,
    nightAppointments,
    usedTimeSlots,
  ] = React.useMemo(() => {
    const [
      morningAppointments,
      afternoonAppointments,
      nightAppointments,
      usedTimeSlots,
    ] = appointments.reduce<
      [
        AppointmentFormatted[],
        AppointmentFormatted[],
        AppointmentFormatted[],
        string[],
      ]
    >(
      (acc, appointment) => {
        const date = dayjs(appointment.datetime)
        const isSameDay = date.isSame(dayjs(filters.date), "d")

        if (filters.date && !isSameDay) {
          return acc
        }

        const hour = new Date(appointment.datetime).getHours()
        const time = dayjs(appointment.datetime).format("HH:mm")

        if (hour >= 6 && hour <= 12) {
          acc[0].push({ ...appointment, time })
        } else if (hour >= 13 && hour <= 18) {
          acc[1].push({ ...appointment, time })
        } else {
          acc[2].push({ ...appointment, time })
        }

        acc[3].push(time)

        return acc
      },
      [[], [], [], []]
    )

    morningAppointments.sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    )
    afternoonAppointments.sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    )
    nightAppointments.sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    )

    // console.log(usedTimeSlots)

    return [
      morningAppointments,
      afternoonAppointments,
      nightAppointments,
      usedTimeSlots,
    ]
  }, [appointments, filters.date])

  return {
    morningAppointments,
    afternoonAppointments,
    nightAppointments,
    usedTimeSlots,
  }
}
