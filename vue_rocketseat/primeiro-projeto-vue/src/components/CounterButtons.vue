<template>
    <div class="buttons">
        <MyButton title="Soma" @update="$emit('change-count', 'increment', 1)" />
        <MyButton title="Subtração" @update="$emit('change-count', 'decrement', 1)" />
        <MyButton title="Resetar" @update="$emit('change-count', 'reset')" />
    </div>
</template>

<script>
import MyButton from './MyButton.vue';

    export default {
        name: 'CounterButtons',
        emits: ['change-count'],
        components: {
            MyButton
        }
    }
</script>

<style>
    .buttons {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
</style>