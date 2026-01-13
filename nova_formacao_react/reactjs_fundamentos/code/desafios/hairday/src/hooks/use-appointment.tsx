import useLocalStorage from "use-local-storage"
import { APPOINTMENTS_KEY, type Appointment } from "../models/appointments"

export default function useAppointment() {
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>(
    APPOINTMENTS_KEY,
    []
  )

  function createAppointment({ client, datetime }: Omit<Appointment, "id">) {
    setAppointments([
      ...appointments,
      {
        id: Math.random().toString(36).substring(2, 9),
        client,
        datetime,
      },
    ])
  }

  function deleteAppointment(id: string) {
    setAppointments(appointments.filter((appointment) => appointment.id !== id))
  }

  return {
    createAppointment,
    deleteAppointment,
  }
}
