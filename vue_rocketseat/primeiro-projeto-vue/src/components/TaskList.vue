<template>
    <div class="task-list-container">
        <h2 v-once>Lista de tarefas</h2>
        <div class="controls">
            <button
                :class="btnAddClass"
                @click="hanndleShowForm"
            >
                {{ btnAddChangeText }}
            </button>

            <button class="btn-toggle-all">
                Marcar todas
            </button>

            <button class="btn-clear">
                Limpar concluídas
            </button>
        </div>

        <div
            v-if="showForm"
            class="add-task-container"
        >
            <input
                v-model="newTaskTitle"
                type="text"
                placeholder="Insira o título da tarefa"
                class="task-input"
            >
            <button class="btn-add" @click="addtask">
                Adicionar
            </button>
        </div>

        <div class="tasks-container">
            <div class="pending-tasks">
                <h3 v-once>Tarefas pendentes</h3>

                <p v-if="pendingTasks.length === 0" >
                    Nenhuma tarefa pendente no momento!
                </p>
                <div v-else>
                    <TaskItem
                        v-for="task in pendingTasks"
                        v-memo="[task.done, task.title]"
                        :key="task.id"
                        :task="task"
                        @toggle-done="toggleTaskDone"
                        @remove-task="removeTask"
                    />
                </div>

            </div>

            <div class="completed-tasks">
                <h3 v-once>Tarefas concluídas</h3>

                <p v-if="completedTasks.length === 0">
                    Não há tarefas concluídas no momento!
                </p>
                <div v-else>
                    <TaskItem
                        v-for="task in completedTasks"
                        v-memo="[task.done, task.title]"
                        :key="task.id"
                        :task="task"
                        @toggle-done="toggleTaskDone"
                        @remove-task="removeTask"
                    />
                </div>

            </div>
        </div>

        <div>
            <h3>Resumo</h3>

            <p v-if="tasks.length === 0">
                Você ainda não possui tarefas!
            </p>

            <p v-else-if="pendingTasks.length > 0 && completedTasks.length === 0">
                Você tem {{ pendingTasks.length }} tarefas pendentes!
            </p>

            <p v-else-if="completedTasks.length > 0 && pendingTasks.length === 0">
                Todas as tarefas foram concluídas!
            </p>

            <p v-else>
                Você tem {{ pendingTasks.length }} tarefa(s) pendente(s) e {{ completedTasks.length }} concluída(s)!
            </p>
        </div>

    </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

    export default {
        name: 'TaskList',
        components : {
            TaskItem
        },
        data() {
            return {
                tasks: [],
                newTaskTitle: '',
                showForm: false
            }
        },
        beforeCreate() {
            console.log('beforeCreate foi chamado!')
            console.log('this.tasks ainda é: ', this.tasks)
        },
        created() {
            console.log('created foi chamado!')
            const savedTasks = localStorage.getItem('taskList')
            if (savedTasks) {
                try {
                    this.tasks = JSON.parse(savedTasks)
                } catch (error) {
                    console.error('Erro ao carrefar as tarefas do LocalStorage', error)
                }
            }
            console.log('Agora this.tasks existe: ', this.tasks)
        },
        beforeMount() {
            console.log('beforeMounted foi chamado!')
        },
        mounted() {
            console.log('mounted foi chamado!')
        },
        beforeUpdate() {
            console.log('TaskList => beforeUpdate')
        },
        updated() {
            console.log('TaskList => updated')
        },
        methods: {
            removeTask(taskId) {
                this.tasks = this.tasks.filter(task => task.id != taskId);
            },
            toggleTaskDone(taskId) {
                const task = this.tasks.find(t => t.id === taskId);
                if (task) {
                    task.done = !task.done;
                }
            },
            addtask() {
                if (this.newTaskTitle.trim() === '') return

                this.tasks.push({
                    id: Date.now(),
                    title: this.newTaskTitle.trim(),
                    done: false
                })

                this.newTaskTitle = '' // limpando form
                this.showForm = false // escondendo o form
            },
            hanndleShowForm() {
                this.showForm = !this.showForm
            }
        },
        watch: {
            tasks: {
                handler(newVal) {
                    try {
                        localStorage.setItem('taskList', JSON.stringify(newVal))
                    } catch (error) {
                        console.log('Erro ao salvar as tarefas no  LocalStorage', error)
                    }
                },
                deep: true,
                immediate: false
            }
        },
        computed: {
            completedTasks() {
                return this.tasks.filter(task => task.done)
            },
            pendingTasks() {
                return this.tasks.filter(task => !task.done)
            },
            btnAddChangeText() {
                return this.showForm
                    ? 'Fechar'
                    : 'Adicionar nova tarefa'
            },
            btnAddClass() {
                return this.showForm ? 'btn-clear' : 'btn-add'
            }
        }
    }
</script>

<style>
.task-list-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

h2 {
    color: #3409db;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e8e7ec;
    text-align: center;
}

.controls {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    flex-wrap: wrap;
    justify-content: center;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
    font-size: 14px;
}

.btn-add {
    background-color: #35a535;
    color: white;
    cursor: pointer;
}

.btn-add:hover {
    background-color: #4db14d;
    transform: translateY(-2px);
}

.btn-toggle-all {
    background-color: #187cce;
    color: white;
}

.btn-toggle-all:hover {
    background-color: #4290cf;
    transform: translateY(-2px);
}

.btn-clear {
    background-color: #db240c;
    color:white;
}

.btn-clear:hover {
    background-color: #df422d;
    transform: translateY(-2px);
}

.task-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;
}

.pending-tasks, .completed-tasks {
    padding: 20px;
    border-radius: 8px;
}

.pending-tasks {
    background-color: #f3f4f5;
    border: 2px solid #c9c8c8;
    margin-bottom: 15px;
}

.completed-tasks {
    background-color: #e4edf7;
    border: 2px solid #c7c8c9;

}

.pending-tasks h2, .completed-tasks h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #2c3e50;
    text-align: center;
}

/* video parado nos 03 minutos finais */

.watch-output {
    background-color: #2c3e50;
    color: white;
    padding: 15px;
    border-radius: 6px;
}

.log-container {
    max-height: 200px;
    overflow-y: auto; /* barra de rolagem automatica */
    background-color: #1a252f;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
    font-family: monospace;
}

.add-task-container {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
}

.task-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 300px;
}

</style>