import { defineStore } from 'pinia';
import {
  OrganizedStatement,
  Transaction,
  TransactionGroupName,
} from '../types/Statements';

interface State {
  organizedStatement: OrganizedStatement | null;
  selectedTransactions: number[];
  selectedCategoryName: TransactionGroupName | null;
  showMoveTransactionDialog: boolean;
}
export const useStatementStore = defineStore('statement', {
  state: (): State => ({
    organizedStatement: null,
    selectedTransactions: [],
    selectedCategoryName: null,
    showMoveTransactionDialog: false,
  }),

  actions: {
    setOrganizeStatement(statement: OrganizedStatement) {
      this.organizedStatement = statement;
    },
    moveTransactionsToCategory(categoryName: TransactionGroupName) {
      if (!this.organizedStatement || !this.selectedCategoryName) return;

      const transactionToMove: Transaction[] = [];
      const currentCategoryIndex = this.organizedStatement.categories.findIndex(
        category => category.name === this.selectedCategoryName,
      );
      let currentCategory;
      if (currentCategoryIndex === -1) {
        const { mainCategoryIndex, childCategoryIndex } =
          this.findMainAndChildCategoryIndex(this.selectedCategoryName);
        if (
          mainCategoryIndex !== null &&
          childCategoryIndex !== null &&
          Array.isArray(
            this.organizedStatement.categories[mainCategoryIndex].categories,
          )
        ) {
          currentCategory =
            this.organizedStatement.categories[mainCategoryIndex].categories[
              childCategoryIndex
            ];

          for (const transaction of currentCategory.transactions) {
            if (this.selectedTransactions.includes(transaction.id)) {
              transactionToMove.push(transaction);
            }
          }

          this.organizedStatement.categories[mainCategoryIndex].categories[
            childCategoryIndex
          ].transactions = currentCategory.transactions.filter(
            transaction => !this.selectedTransactions.includes(transaction.id),
          );
        }
      } else {
        currentCategory =
          this.organizedStatement.categories[currentCategoryIndex];
        for (const transaction of currentCategory.transactions) {
          if (this.selectedTransactions.includes(transaction.id)) {
            transactionToMove.push(transaction);
          }
        }

        this.organizedStatement.categories[currentCategoryIndex].transactions =
          currentCategory.transactions.filter(
            transaction => !this.selectedTransactions.includes(transaction.id),
          );
      }

      const newCategoryIndex = this.organizedStatement.categories.findIndex(
        category => category.name === categoryName,
      );
      if (newCategoryIndex === -1) {
        const { mainCategoryIndex, childCategoryIndex } =
          this.findMainAndChildCategoryIndex(categoryName);

        if (
          mainCategoryIndex !== null &&
          childCategoryIndex !== null &&
          Array.isArray(
            this.organizedStatement.categories[mainCategoryIndex].categories,
          )
        ) {
          this.organizedStatement.categories[mainCategoryIndex].categories[
            childCategoryIndex
          ].transactions.push(...transactionToMove);
        }
      } else {
        this.organizedStatement.categories[newCategoryIndex].transactions.push(
          ...transactionToMove,
        );
      }
    },
    deleteTransactions(categoryName: TransactionGroupName) {
      if (!this.organizedStatement) return;

      const foundCategoryIndex = this.organizedStatement.categories.findIndex(
        category => category.name === categoryName,
      );

      if (foundCategoryIndex !== -1) {
        const category = this.organizedStatement.categories[foundCategoryIndex];

        this.organizedStatement.categories[foundCategoryIndex].transactions =
          category.transactions.filter(
            transaction => !this.selectedTransactions.includes(transaction.id),
          );
      } else {
        const { mainCategoryIndex, childCategoryIndex } =
          this.findMainAndChildCategoryIndex(categoryName);

        if (
          mainCategoryIndex !== null &&
          childCategoryIndex !== null &&
          Array.isArray(
            this.organizedStatement.categories[mainCategoryIndex].categories,
          )
        ) {
          this.organizedStatement.categories[mainCategoryIndex].categories[
            childCategoryIndex
          ].transactions = this.organizedStatement.categories[
            mainCategoryIndex
          ].categories[childCategoryIndex].transactions.filter(
            transaction => !this.selectedTransactions.includes(transaction.id),
          );
        }
      }
    },
    selectTransaction(transactionId: number, category: TransactionGroupName) {
      if (this.selectedCategoryName !== category) {
        this.selectedTransactions = [];
        this.selectedCategoryName = category;
      }

      if (this.selectedTransactions.includes(transactionId)) {
        const index = this.selectedTransactions.indexOf(transactionId);
        if (index > -1) {
          this.selectedTransactions.splice(index, 1);
        }
      } else {
        this.selectedTransactions.push(transactionId);
      }
    },
    findMainCategoryIndex(categoryName: TransactionGroupName): number | null {
      let mainCategoryIndex = null;
      if (this.organizedStatement) {
        mainCategoryIndex = this.organizedStatement.categories.findIndex(
          category => category.name === categoryName,
        );
      }
      return mainCategoryIndex;
    },

    findMainAndChildCategoryIndex(categoryName: TransactionGroupName): {
      mainCategoryIndex: number | null;
      childCategoryIndex: number | null;
    } {
      let childCategoryIndex = null;
      let mainCategoryIndex = null;
      if (this.organizedStatement) {
        for (const [
          index,
          value,
        ] of this.organizedStatement.categories.entries()) {
          if (value.categories) {
            childCategoryIndex = value.categories.findIndex(
              category => category.name === categoryName,
            );
            if (
              childCategoryIndex !== -1 &&
              this.organizedStatement.categories[index].categories != null
            ) {
              mainCategoryIndex = index;
              break;
            }
          }
        }
      }
      return {
        mainCategoryIndex,
        childCategoryIndex,
      };
    },
  },
});
