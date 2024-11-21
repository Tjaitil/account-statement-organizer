<template>
    <div class="flex flex-row justify-between w-full">
        <div class="inline-flex place-items-center flex-grow gap-2">
            <Icon :icon="getIconFromCategory(category.name)" width="24" />
            <span>{{ ucWords(t(category.name)) }}</span>
        </div>
        <span class="min-w-20 text-right px-2" :class="getColorFromAmount(totalAmount)">{{
            addDelimiter(totalAmount)
        }}</span>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { getColorFromAmount } from "../../utils/getColorAmount";
import { TransactionGroup } from "../../types/Statements";
import { ucWords } from "../../utils/ucwords";
import { addDelimiter } from "../../utils/addDelimiter";
import { useI18n } from "vue-i18n";
import { getIconFromCategory } from "../../utils/getIconFromCategory";
import { computed } from "vue";
import { getTotalAmount } from "../../utils/getTotalAmount";

interface Props {
    category: TransactionGroup;
}
const { category } = defineProps<Props>();

const { t } = useI18n();

const totalAmount = computed(() => {
    return getTotalAmount(category);
});
</script>
