export type CashConstantApi = {
    name: string,
    value: string
}

export type CashConstantsApi = {
    list: CashConstantApi[]
} | null
