<template>
            <button :disabled="disabled" @click="$emit('update')">
                {{ title }}
            </button>
        </template>
        
        <script>
            export default {
                name: 'MyButton',
                props: {
                    title: {
                        type: String,
                        default: '+1'
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    }
                }
            }
        </script>
        
        <style scoped>
            button {
                padding: 10px 20px;
                background-color: rgb(1, 89, 253);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
            }
            button:hover {
                background-color: rgb(126, 157, 219);
            }
            button:disabled {
                background-color: #cccccc;
                color: #666666;
                cursor: not-allowed;
            }
            button:disabled:hover {
                background-color: #cccccc; /* Mantém a cor de fundo cinza ao passar o mouse */
            }
        </style>