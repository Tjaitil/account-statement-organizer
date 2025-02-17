<template>
    <div class="container flex flex-col gap-4">
        <h3 class="text-3xl">{{ t("Start by uploading a file(s)") }}</h3>
        <form class="flex flex-col gap-4" @submit.prevent="submit()">
            <div class="flex flex-row justify-center gap-2">
                <FileUpload
                    mode="basic"
                    @select="addFiles"
                    customUpload
                    :chooseLabel="t('Choose')"
                    auto
                    severity="secondary"
                    class="p-button-outlined"
                    :multiple="true"
                ></FileUpload>
                <PrimeButton
                    :label="t('Cancel')"
                    severity="danger"
                    variant="outlined"
                    :disabled="files.length === 0"
                    @click="removeFiles"
                />
            </div>
            <PrimeCard class="min-h-20">
                <template #content>
                    <div class="flex flex-row gap-4">
                        <template v-if="files.length > 0">
                            <div v-for="file in files" class="flex flex-col place-content-center">
                                <Icon icon="mdi:file-document-box-outline" width="24" />
                                <span>{{ file.name }}</span>
                            </div>
                        </template>
                        <p v-else>
                            <i>{{ t("No file(s) selected") }}</i>
                        </p>
                    </div>
                </template>
            </PrimeCard>
            <p v-if="hasError">{{ t("Unfortunately an error has occured") }}</p>
            <PrimeButton type="submit" :disabled="files.length === 0">{{ t("Organize") }}</PrimeButton>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import FileUpload, { FileUploadSelectEvent } from "primevue/fileupload";
import PrimeButton from "primevue/button";
import { processFile } from "../composables/ProcessFile";
import {
    EntryFormat,
    isTransactionFormatOne,
    isTransactionFormatTwo,
    UncategorizedTransaction,
} from "../types/Statements";
import { Card as PrimeCard } from "primevue";
import { useI18n } from "vue-i18n";

const files = ref<File[]>([]);
const initialColumns = ref<EntryFormat["columns"]>([]);
const hasError = ref(false);
const { t } = useI18n();

const addFiles = (event: FileUploadSelectEvent) => {
    files.value.push(event.files[0]);
};

const removeFiles = () => {
    files.value = [];
};

const submit = async () => {
    try {
        hasError.value = false;
        if (!files.value) {
            throw new Error("No file selected");
        }

        let results: EntryFormat["columns"] = [];
        for (const element of files.value) {
            let result = await processFile(element);
            results = [...results, ...result] as EntryFormat["columns"];
            initialColumns.value = results;
        }

        const mappedResult = mapFromStatementFormat();

        emit("submit", mappedResult);
    } catch (e) {
        hasError.value = true;
    }
};

const emit = defineEmits<{
    (event: "submit", data: UncategorizedTransaction[]): void;
}>();

const mapFromStatementFormat = () => {
    const mappedTransaction: UncategorizedTransaction[] = [];
    const columns = initialColumns.value;

    columns.forEach((statement, index) => {
        if (isTransactionFormatOne(statement)) {
            let amount = parseInt(statement.Beløp);
            mappedTransaction.push({
                id: index,
                date: statement.Dato,
                description: statement.Beskrivelse,
                amount: amount,
                type: statement.Type,
                isIncomming: amount > 0 ? true : false,
            });
        } else if(isTransactionFormatTwo(statement)) {
            let amount = parseInt(statement["Beløp inn"] || statement["Beløp ut"]);
            let isIncomming = amount > 0 ? true : false;

            if (statement.Beskrivelse != null && statement.Beskrivelse.length > 0) {
                mappedTransaction.push({
                    id: index,
                    date: statement["Bokført dato"],
                    description: statement.Beskrivelse,
                    amount: amount,
                    type: statement.Type,
                    isIncomming,
                });
            }    
        }
    });

    return mappedTransaction;
};
</script>
