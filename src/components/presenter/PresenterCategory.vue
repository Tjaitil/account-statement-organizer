<template>
  <div class="flex w-full flex-row justify-between">
    <div class="inline-flex flex-grow place-items-center gap-2">
      <Icon :icon="getIconFromCategory(category.name)" width="24" />
      <span>{{ ucWords(t(category.name)) }}</span>
    </div>
    <span
      class="min-w-20 px-2 text-right"
      :class="getColorFromAmount(totalAmount)"
      >{{ addDelimiter(totalAmount) }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { getColorFromAmount } from '../../utils/getColorAmount';
import { TransactionGroup } from '../../types/Statements';
import { ucWords } from '../../utils/ucwords';
import { addDelimiter } from '../../utils/addDelimiter';
import { useI18n } from 'vue-i18n';
import { getIconFromCategory } from '../../utils/getIconFromCategory';
import { computed } from 'vue';
import { getTotalAmount } from '../../utils/getTotalAmount';

interface Props {
  category: TransactionGroup;
}
const { category } = defineProps<Props>();

const { t } = useI18n();

const totalAmount = computed(() => {
  return getTotalAmount(category);
});
</script>
