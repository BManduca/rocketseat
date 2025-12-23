<template>
    <div class="box">
        <p>
            {{aux}}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'MyBox',
        props: {
            aux: String
        }
    }
</script>

<style>
p {
    color: white;   
}
.box {
    width: 30px;
    height: 30px;
    background-color: red;
    align-items: center;
    justify-content: center;
    display: flex;
}
</style>