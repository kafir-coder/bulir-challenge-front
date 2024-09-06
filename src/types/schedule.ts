export type ScheduleProps = {
  id: string,
  created_at: string,
  updated_at: string,
  deletedAt: null,
  bookingDate: string,
  status: string,
  client: {
    id: string,
    created_at: string,
    updated_at: string,
    deletedAt: null,
    fullName: string,
    nif: string,
    email: string,
    password: string,
    role: string,
    balance: number
  },
  serviceProvider: {
    id: string,
    created_at: string,
    updated_at: string,
    deletedAt: null,
    fullName: string,
    nif: string,
    email: string,
    password: string,
    role: string,
    balance: number
  },
  service: {
    id: string,
    created_at: string,
    updated_at: string,
    deletedAt: null,
    name: string,
    description: string,
    fee: string
  }
}