<template>
    <div class="task-item">
        <span class="task-id"># {{ task?.id }}</span>
        <span class="task-id">{{ task?.title }}</span>
        <!-- <span class="task-status">{{ textStatus }}</span> -->
        <button
            class="btn-toggle"
            @click="toggleDone"
        >
            {{ btnToggleText }}
        </button>
        <button
            class="btn-remove"
            @click="removeTask"
        >
            Remover
        </button>
    </div>
</template>

<script>
    export default {
        name: 'TaskItem',
        props: {
            task: {
                type: Object,
                required: true
            }
        },
        methods: {
            toggleDone() {
                this.$emit('toggle-done', this.task.id)
            },
            removeTask() {
                this.$emit('remove-task', this.task.id)
            }
        },
        computed: {
            btnToggleText() {
                return this.task?.done
                    ? 'Desfazer'
                    : 'Concluir'
            }
        },
        beforeMount() {
            console.log('TaskItem será montado!')
        },
        mounted() {
            console.log('TaskItem: ' + this.task.title + ' foi montada!')
        },
        beforeUnmount() {
            console.log('A tarefa: ' + this.task.title + ' vai ser desmontada!')
        },
        unmounted() {
            console.log('A tarefa: ' + this.task.title + ' foi desmontada!')
        }
    }
</script>

<style>
.task-item {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 4px;
    background-color: white;
    border: 1px solid #ddd;
    transition: all 0.3s;
}

.task-id {
    font-weight: bold;
    margin-right: 10px;
    color: #7fBcBd;
}

.task-status {
    flex-grow: 1;
}

.btn-toggle {
    background-color: #ff9e2f;
    color: white;
    margin-right: 5px;
}

.btn-toggle:hover {
    background-color: #ffb157;
}

.btn-remove {
    background-color: #ff2600;
    color: white;
}

.btn-remove:hover {
    background-color: #f05135;
}
</style>
