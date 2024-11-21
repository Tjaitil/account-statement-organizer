<template>
    <PrimeAccordion value="1">
        <PresenterCategoryWrapper v-for="category in categories" :category :key="category.name" />
    </PrimeAccordion>
</template>

<script setup lang="ts">
import PrimeAccordion from "primevue/accordion";
import { TransactionGroup } from "../../types/Statements";
import PresenterCategoryWrapper from "./PresenterCategoryWrapper.vue";

interface Props {
    categories: TransactionGroup[];
}

defineProps<Props>();
</script>
