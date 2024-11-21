<template>
    <li class="flex flex-row-reverse gap-6 items-center py-2">
        <PrimeCheckbox v-model="isSelected" binary />
        <span class="min-w-20 flex flex-row justify-end">
            <span
                >{{ addDelimiter(transaction.amount) }}
                <span class="ml-2">{{ getCurrency() }}</span>
            </span>
        </span>
        <span class="overflow-ellipsis flex-grow" :title="transaction.description">
            <span class="text-xs">{{ transaction.date }}</span><br>
            <span>
                {{ transaction.name || transaction.description }}
            </span>
        </span>
    </li>
</template>

<script setup lang="ts">
import { Transaction } from "../../types/Statements";
import PrimeCheckbox from "primevue/checkbox";
import { addDelimiter } from "../../utils/addDelimiter";
import { getCurrency } from "../../utils/getCurrency";
import { ref, watch } from "vue";

interface Props {
    transaction: Transaction;
}

const { transaction } = defineProps<Props>();
const isSelected = ref<boolean>(false);
const emit = defineEmits<{
    select: [id: number];
}>();

watch(() => isSelected.value, () => {
    emit("select", transaction.id);
});
</script>
