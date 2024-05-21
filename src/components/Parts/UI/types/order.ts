export interface Order {
    id: number
    title: string
    safe: boolean
    // avatar: string
    // url: string
    tags: string[]
    client: string
    budget: string
    category: string
    date: string
    deadline: string
    worker?: string
    description?: string
}