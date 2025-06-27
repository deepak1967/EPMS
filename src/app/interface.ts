export interface Interface {
    projects: Project[]
}
export interface Project {
    id: string
    name: string
    status: string
    startDate: string
    endDate: string
    assignedUsers: any[]
    tasks: Task[]
}

export interface Task {
    id: string
    title: string
    status: string
    dueDate: string
    priority: string
    description: string
}

export interface User {
    id: string
    email: string
    first_name: string
    last_name: string
    role: string
    password: string
    avatar: string
}
