export interface Transaction {
    id: number;
    amount: number;
    date: string;
    description: string;
    name: string;
    type: string;
    isIncomming: boolean;
    category: TransactionCategory;
}

export interface TransactionGroup {
    name: TransactionGroupName;
    amount: number;
    categories?: TransactionGroup[];
    transactions: Transaction[];
}

export interface TransactionMap {
    category: TransactionCategory;
    name: TransactionGroupName;
    priority: number;
    patterns: string[];
}

export type TransactionCategory = keyof TransactionCategories & string;
export type TransactionGroupName =
    | "living"
    | "savings"
    | "fixed"
    | "income"
    | "other"
    | "groceries"
    | "transport"
    | "entertainment"
    | "restaurants & cafe"
    | "health & wellbeing"
    | "clothes & shoes"
    | "home & garden"
    | "vehicle"
    | "toll & parking"
    | "charging"
    | "charity"
    | "phone, tv & internet"
    | "loan"
    | "municipality costs";


export interface TransactionCategories {
    living: TransactionGroup;
    savings: TransactionGroup;
    fixed: TransactionGroup;
    income: TransactionGroup;
    other: TransactionGroup;
}

export interface OrganizedStatement {
    dateRange: {
        from: string;
        to: string;
    } | null;
    categories: TransactionGroup[];
    balance: number;
}

export type StatementFormat<K extends string> = {
    id: number;
    columns: EntryTransactionFormat<K>[];
};
export type EntryTransactionFormat<T extends string = string> = Record<T, string>;

export type EntryFormatOne = StatementFormat<"Dato" | "Type" | "Beløp" | "Beskrivelse">;
export type EntryFormatUnknown = StatementFormat<"">;
export type EntryFormat = EntryFormatOne | EntryFormatUnknown;

export function isEntryFormatOne(format: EntryFormat["columns"]): format is EntryFormatOne["columns"] {
    return Array.isArray(format) && format.length > 0 && "Beløp" in format[0];
}

export type UncategorizedTransaction = Omit<Transaction, "category" | "name">;
