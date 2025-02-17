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

export type StatementFormat<K extends EntryTransactionFormat> = {
    id: number;
    columns: K[];
};
export type EntryTransactionFormat<T extends string = string> = Record<T, string>;

export type EntryTransactionFormatOne = EntryTransactionFormat<"Dato" | "Type" | "Beløp" | "Beskrivelse">;
export type EntryFormatOne = StatementFormat<EntryTransactionFormatOne>;

export type EntryTransactionFormatTwo = EntryTransactionFormat<"Utført dato" | "Bokført dato" | "Rentedato" | "Beskrivelse" | "Type" | "Undertype" | "Fra konto" | "Avsender" | "Til konto" | "Mottakernavn" | "Beløp inn" | "Beløp ut" | "Valuta" | "Status" | "Melding/KID/Fakt.nr">;
export type EntryFormatTwo = StatementFormat<EntryTransactionFormatTwo>;
export type StatementFormatUnknown = EntryTransactionFormat<"">;
export type EntryFormatUnknown = StatementFormat<EntryTransactionFormat<"">>;

export type StatementFormats = EntryFormatOne | EntryFormatTwo | EntryFormatUnknown; 
export type EntryFormat = EntryFormatOne | EntryFormatTwo | EntryFormatUnknown;

export function isEntryFormatOne(format: EntryFormat["columns"]): format is EntryFormatOne["columns"] {
    return Array.isArray(format) && format.length > 0 && "Beløp" in format[0];
}

export function isEntryFormatTwo(format: EntryFormat["columns"]): format is EntryFormatTwo["columns"] {
    return Array.isArray(format) && format.length > 0 && "Utført dato" in format[0];
}

export function isTransactionFormatOne(format: EntryTransactionFormatOne | EntryTransactionFormatTwo | StatementFormatUnknown): format is EntryTransactionFormatOne {
    return "Dato" in format;
}

export function isTransactionFormatTwo(format: EntryTransactionFormatOne | EntryTransactionFormatTwo | StatementFormatUnknown): format is EntryTransactionFormatTwo {
    return "Utført dato" in format;
}

export type UncategorizedTransaction = Omit<Transaction, "category" | "name">;
