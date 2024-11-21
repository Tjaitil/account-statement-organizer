<template>
    <PrimeAccordionPanel value="1">
        <PrimeAccordionHeader>
            <PresenterCategory :category="category" />
        </PrimeAccordionHeader>
        <PrimeAccordionContent>
            <PresenterCategoryContent :category="category" />
        </PrimeAccordionContent>
    </PrimeAccordionPanel>
</template>

<script setup lang="ts">
import PrimeAccordionPanel from "primevue/accordionpanel";
import PrimeAccordionHeader from "primevue/accordionheader";
import PrimeAccordionContent from "primevue/accordioncontent";
import { TransactionGroup } from "../../types/Statements";
import PresenterCategory from "./PresenterCategory.vue";
import { useStatementStore } from "../../stores/StatementStore";
import PresenterCategoryContent from "./PresenterCategoryContent.vue";

interface Props {
    category: TransactionGroup;
}

defineProps<Props>();

const store = useStatementStore();
</script>
