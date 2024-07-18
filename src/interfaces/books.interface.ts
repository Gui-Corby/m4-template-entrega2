export interface Ibook {
    id: number;
    name: string;
    pages: string;
    category?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type TCreateBody = Omit<Ibook, "id" | "createdAt" | "updatedAt">;
export type TUpdateBody = Partial<TCreateBody>;
