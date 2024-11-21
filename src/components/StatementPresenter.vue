<template>
    <div class="flex flex-col gap-y-2">
        <h1 class="text-3xl">{{ t("Spending") }}</h1>
        <TransactionsActionMenu />
        <PrimeAccordion>
            <PrimeAccordionPanel
                :value="index"
                v-for="(category, index) in store.organizedStatement?.categories"
                :key="category.name"
            >
                <PrimeAccordionHeader>
                    <PresenterCategory :category="category" />
                </PrimeAccordionHeader>
                <PrimeAccordionContent>
                    <PresenterCategoryContent :category="category" />
                </PrimeAccordionContent>
            </PrimeAccordionPanel>
        </PrimeAccordion>
        <div class="mt-4">
            <h1 class="text-lg font-bold">{{ t("Result") }}</h1>
            <p>
                <span class="mr-2">=</span
                ><span :class="getColorFromAmount(mainBalance)">
                    {{ mainBalance }}
                </span>
            </p>
        </div>
    </div>
    <div class="mt-8 flex flex-row justify-end">
        <PrimeButton size="small" severity="danger" variant="outlined" @click="emit('reset-to-upload')">{{
            t("Reset to upload")
        }}</PrimeButton>
    </div>
</template>

<script lang="ts" setup>
import PrimeButton from "primevue/button";
import PrimeAccordion from "primevue/accordion";
import PrimeAccordionPanel from "primevue/accordionpanel";
import PrimeAccordionHeader from "primevue/accordionheader";
import PrimeAccordionContent from "primevue/accordioncontent";
import { computed } from "vue";
import PresenterCategoryContent from "./presenter/PresenterCategoryContent.vue";
import PresenterCategory from "./presenter/PresenterCategory.vue";
import { getColorFromAmount } from "../utils/getColorAmount";
import { useI18n } from "vue-i18n";
import TransactionsActionMenu from "./TransactionsActionMenu.vue";
import { useStatementStore } from "../stores/StatementStore";
import { getTotalAmount } from "../utils/getTotalAmount";

const { t } = useI18n();
const store = useStatementStore();

const mainBalance = computed(() => {
    let balance = 0;
    store.organizedStatement?.categories.forEach((element) => {
        balance += getTotalAmount(element);
    });

    return balance;
});

const emit = defineEmits<{
    "reset-to-upload": [];
}>();
</script>
