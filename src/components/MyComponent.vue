<template>
    <q-card class="q-pa-md">
        <q-card-section>
            <div class="text-h6">{{ title }}</div>
            <p>{{ description }}</p>
        </q-card-section>
        <q-card-actions align="right">
            <q-btn :label="buttonLabel" color="primary" @click="handleClick" />
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    title: String,
    description: String,
    buttonLabel: { type: String, default: "Click Me" }
});

const emit = defineEmits(["button-click"]);

const handleClick = () => {
    emit("button-click", props.title);
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>