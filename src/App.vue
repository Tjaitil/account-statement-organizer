<template>
  <section class="flex w-screen place-content-center pt-12">
    <PrimeCard class="w-2/3 max-w-4xl">
      <template #content>
        <div>
          <transition mode="out-in" name="fade">
            <UploadStatementForm
              v-if="step === 1"
              @submit="val => submit(val)"
            />
            <StatementOrganizer
              v-else-if="step === 2"
              :uncategorized-transactions
              @finish="handleFinishOrganize"
            />
            <div v-else-if="step === 3 && store.organizedStatement !== null">
              <StatementPresenter @reset-to-upload="handleResetToUpload" />
            </div>
          </transition>
        </div>
      </template>
    </PrimeCard>
  </section>
</template>
<script setup lang="ts">
import PrimeCard from 'primevue/card';
import UploadStatementForm from './components/UploadStatementForm.vue';
import { ref } from 'vue';
import StatementOrganizer from './components/StatementOrganizer.vue';
import StatementPresenter from './components/StatementPresenter.vue';
import { UncategorizedTransaction } from './types/Statements';
import { useStatementStore } from './stores/StatementStore';

const step = ref(1);
const uncategorizedTransactions = ref<UncategorizedTransaction[]>([]);
const store = useStatementStore();

const submit = (uncategorizedTransaction: UncategorizedTransaction[]) => {
  step.value = 2;

  uncategorizedTransactions.value = uncategorizedTransaction;
};

const handleFinishOrganize = () => {
  step.value = 3;
};

const handleResetToUpload = () => {
  step.value = 1;
  store.organizedStatement = null;
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
