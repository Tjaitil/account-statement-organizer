<template>
    <div>
        <p class="mb-4">{{ t("Hang tight while we categorize your transactions") }}</p>
        <PrimeProgressBar :value="progress" displayValueTemplate="{value}%" />
    </div>
</template>

<script setup lang="ts">
import PrimeProgressBar from "primevue/progressbar";
import { reactive, ref, onMounted } from "vue";
import {
    OrganizedStatement,
    Transaction,
    TransactionCategory,
    TransactionGroup,
    TransactionGroupName,
    TransactionMap,
    UncategorizedTransaction,
} from "../types/Statements";
import { getTransactionMapping } from "../utils/getTransactionMapping";
import { useI18n } from "vue-i18n";
import { useStatementStore } from "../stores/StatementStore";

interface Props {
    uncategorizedTransactions: UncategorizedTransaction[];
}
const props = defineProps<Props>();
const { t } = useI18n();

const progress = ref(0);
const timeout = ref<number>();

const store = useStatementStore();

const increaseProgress = () => {
    timeout.value = window.setTimeout(() => {
        if (progress.value >= 100) {
            emit("finish", organizedStatement);
            window.clearTimeout(timeout.value);
            return;
        }
        increaseProgress();
    }, 1000);
    if (progress.value < 100) {
        progress.value += 20;
    }
};

onMounted(() => {
    increaseProgress();
});

const emit = defineEmits<{
    finish: [organizedStatement: OrganizedStatement];
}>();

const transactionMap = getTransactionMapping();
const organizedStatement = reactive<OrganizedStatement>({
    dateRange: null,
    balance: 0,
    categories: [
        {
            name: "living",
            transactions: [],
            amount: 0,
            categories: [
                {
                    name: "groceries",
                    transactions: [],
                    amount: 0,
                },
                {
                    name: "restaurants & cafe",
                    transactions: [],
                    amount: 0,
                },
                {
                    name: "health & wellbeing",
                    transactions: [],
                    amount: 0,
                },
                {
                    name: "home & garden",
                    transactions: [],
                    amount: 0,
                },
                {
                    name: "clothes & shoes",
                    transactions: [],
                    amount: 0,
                },
                {
                    name: "transport",
                    transactions: [],
                    amount: 0,
                },
                {
                    name: "charging",
                    transactions: [],
                    amount: 0,
                },
                {
                    name: "toll & parking",
                    transactions: [],
                    amount: 0,
                },
                {
                    name: "charity",
                    transactions: [],
                    amount: 0,
                },
                {
                    name: "entertainment",
                    transactions: [],
                    amount: 0,
                },
            ],
        },
        {
            name: "fixed",
            transactions: [],
            amount: 0,
            categories: [
                {
                    name: "phone, tv & internet",
                    transactions: [],
                    amount: 0,
                },
                {
                    name: "municipality costs",
                    transactions: [],
                    amount: 0,
                },
                {
                    name: "loan",
                    transactions: [],
                    amount: 0,
                },
            ],
        },
        {
            name: "savings",
            transactions: [],
            amount: 0,
        },
        {
            name: "income",
            transactions: [],
            amount: 0,
        },
        {
            name: "other",
            transactions: [],
            amount: 0,
        },
    ]
});

const createTransaction = (
    transaction: UncategorizedTransaction,
    map: TransactionMap | { category: TransactionCategory }
): Transaction => {
    return {
        id: transaction.id,
        isIncomming: transaction.amount > 0,
        category: map.category,
        date: transaction.date,
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        name: "name" in map ? map.name : "",
    };
};

const organize = () => {
    props.uncategorizedTransactions.forEach((uncTransaction) => {
        if (uncTransaction.amount > 0) {
            let category = findCategory("income");
            if (category) {
                category.amount += uncTransaction.amount;
                let categorisedTransaction = createTransaction(uncTransaction, { category: "income" });
                category.transactions.push(categorisedTransaction);
            }

            return;
        }

        let isCategorySet = false;

        for (const map of transactionMap) {
            let match = map.patterns.some((map) => uncTransaction.description.toLowerCase().includes(map));

            if (match) {
                let category = findCategory(map.category);
                if (category) {
                    category.amount += uncTransaction.amount;
                    let categorisedTransaction = createTransaction(uncTransaction, map);
                    category.transactions.push(categorisedTransaction);
                    isCategorySet = true;
                    break;
                }
            }
        }
        if (isCategorySet === false) {
            let mappedTransaction = createTransaction(uncTransaction, { category: "other" });
            let category = findCategory("other");
            if (category) {
                category.amount += uncTransaction.amount;
                category.transactions.push(mappedTransaction);
            }
        }
    });

    store.setOrganizeStatement(organizedStatement);
};

const findCategory = (description: TransactionGroupName): TransactionGroup | undefined => {
    for (const element of organizedStatement.categories) {
        if (element.name === description) {
            return element;
        }
        if (element.categories) {
            const subElement = element.categories.find((subElement) => subElement.name === description);
            if (subElement) {
                return subElement;
            }
        }
    }
    return undefined;
};

organize();
</script>
