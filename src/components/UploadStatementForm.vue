<template>
    <div class="container flex flex-col gap-4">
        <h3 class="text-3xl">{{ t("Start by uploading a file(s)") }}</h3>
        <form class="flex flex-col gap-4" @submit.prevent="submit()" role="form">
            <div class="flex flex-row justify-center gap-2">
                <FileUpload
                    name="file"
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
        <PrimeButton @click="invokeDemo" type="submit" class="self-end" severity="info" variant="outlined">{{
            t("Use demo file")
        }}</PrimeButton>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import FileUpload, { FileUploadSelectEvent } from "primevue/fileupload";
import PrimeButton from "primevue/button";
import { processFile } from "../composables/ProcessFile";
import { EntryFormat, UncategorizedTransaction } from "../types/Statements";
import demoFile from "../assets/demo-file.csv?url";
import { Card as PrimeCard } from "primevue";
import { useI18n } from "vue-i18n";
import { mapFromStatementFormat } from "../utils/mapFileToStatementFormat";

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

const invokeDemo = async () => {
    const response = await fetch(demoFile);

    if (!response.ok) {
        return;
    }

    const blob = await response.blob();
    const file = new File([blob], "demo-file.csv", {
        type: "text/csv",
    });

    files.value.push(file);
    submit();
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

        console.log("results", initialColumns.value);

        const mappedResult = mapFromStatementFormat(initialColumns.value);
        emit("submit", mappedResult);
    } catch (e) {
        hasError.value = true;
    }
};

const emit = defineEmits<{
    (event: "submit", data: UncategorizedTransaction[]): void;
}>();
</script>
