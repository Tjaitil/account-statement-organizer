<template>
    <PrimeDialog v-model:visible="store.showMoveTransactionDialog" modal :header="t('Move transaction')" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ t("Select your category") }}</span>
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-wrap gap-4">
                <div v-for="categoryName in categoryNames" :key="categoryName" class="w-full flex col-2 gap-2">
                    <PrimeRadioButton
                        v-model="selectedCategory"
                        :inputId="`category-${categoryName}`"
                        name="category"
                        :value="categoryName"
                    />
                    <label for="`category-${category}`">{{ ucWords(t(categoryName)) }}</label>
                </div>
            </div>
            <div class="flex justify-end gap-2">
                <PrimeButton
                    type="button"
                    label="Cancel"
                    severity="secondary"
                    @click="store.showMoveTransactionDialog = false"
                ></PrimeButton>
                <PrimeButton type="submit">{{
                    t("Save")
                }}</PrimeButton>
            </div>
        </form>
    </PrimeDialog>
    <div></div>
</template>

<script setup lang="ts">
import PrimeDialog from "primevue/dialog";
import PrimeButton from "primevue/button";
import PrimeRadioButton from "primevue/radiobutton";
import { useStatementStore } from "../stores/StatementStore";
import { useI18n } from "vue-i18n";
import { TransactionGroupName } from "../types/Statements";
import { ref } from "vue";
import { ucWords } from "../utils/ucwords";

const store = useStatementStore();

const { t } = useI18n();
const selectedCategory = ref<TransactionGroupName | null>(null);

const handleSubmit = () => {
    store.showMoveTransactionDialog = false;
    if (selectedCategory.value === null) {
        return;
    }
    store.moveTransactionsToCategory(selectedCategory.value);
};

const categoryNames: TransactionGroupName[] = [
    "charging",
    "charity",
    "clothes & shoes",
    "entertainment",
    "fixed",
    "groceries",
    "health & wellbeing",
    "home & garden",
    "income",
    "living",
    "loan",
    "municipality costs",
    "other",
    "phone, tv & internet",
    "restaurants & cafe",
    "savings",
    "toll & parking",
    "transport",
];
</script>
