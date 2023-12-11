interface Iconnection {
  host: string
  port: number
  connectName: string
  connect(): void
}

export default Iconnection
