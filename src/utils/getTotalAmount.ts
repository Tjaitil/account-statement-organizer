import { TransactionGroup } from "../types/Statements";

export const getTotalAmount = (category: TransactionGroup) => {
    let balance = 0;
    if (category.categories) {
        category.categories.forEach(category => {
            balance += category.transactions.reduce((acc, curr) => acc + curr.amount, 0);
        });
    }
    balance += category.transactions.reduce((acc, curr) => acc + curr.amount, 0);

    return balance;
};