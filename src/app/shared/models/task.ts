export interface Task {
    id: string;
    title: string;
    description?: string;
    createdDate: Date | null;
    dueDate?: string;
    status:string;
}

