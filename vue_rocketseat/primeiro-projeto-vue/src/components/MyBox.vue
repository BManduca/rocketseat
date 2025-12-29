<template>
    <div class="box">
        <p>
            {{name_char}} - {{ age }}
        </p>
        <span :class="['status', status]">
             - {{ status }}
        </span>
    </div>
</template>

<script>
    export default {
        name: 'MyBox',
        props: {
            name_char: {
                type: String,
                default: "N/A"
            },
            age: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                validator: value => ['active', 'inactive'].includes(value),
                default: 'active'
            }
        }
    }
</script>

<style>
p {
    color: white;   
}
.active {
    background-color: green;
}
.inactive {
    background-color: red;
}
.box {
    min-width: 30px;
    min-height: 30px;
    background-color: purple;
    align-items: center;
    justify-content: center;
    display: flex;
}
</style>