export const TASKS_KEY = "tasks";
// Foi utilizado desta forma, pois, o projeto esta configurado
// apenas para permitir sintaxe que pode ser completamente removida durante a compilação
// para JS e o enum, acaba gerando um objeto em tempo de execução, o que quebraria essa regra.
export type TaskState = 'creating' | 'created';

export const TaskState = {
    Creating: 'creating',
    Created: 'created',
} as const;

export type Task = {
    id: string;
    title: string;
    concluded?: boolean;
    state?: TaskState;
};