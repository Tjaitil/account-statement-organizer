<template>
    <div class="flex flex-col gap-y-2">
        <PresenterCategoryContainer :categories="category.categories" v-if="category.categories" />
        <ul>
            <PresenterTransaction
                @select="store.selectTransaction(transaction.id, category.name)"
                v-for="transaction in category.transactions"
                :key="transaction.id"
                :transaction
            />
        </ul>
        <div class="min-h-9" v-if="category.transactions.length > 0">
            <div v-if="store.selectedTransactions.length > 0 && store.selectedCategoryName === category.name">
                <PrimeButton size="small" @click="store.showMoveTransactionDialog = true">{{ t("Move") }}</PrimeButton>
                <PrimeButton size="small" severity="danger" @click="store.deleteTransactions(category.name)">{{
                    t("Archive")
                }}</PrimeButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import PresenterCategoryContainer from "./PresenterCategoryContainer.vue";
import PrimeButton from "primevue/button";
import PresenterTransaction from "./PresenterTransaction.vue";
import { useI18n } from "vue-i18n";
import { useStatementStore } from "../../stores/StatementStore";
import { TransactionGroup } from "../../types/Statements";

interface Props {
    category: TransactionGroup;
}
defineProps<Props>();

const { t } = useI18n();
const store = useStatementStore();
</script>
