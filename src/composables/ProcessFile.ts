import { EntryFormat, EntryTransactionFormat } from "../types/Statements";

export const processFile = async (data: File) => {
    const fileReader = new FileReader();

    const fileType = data.type;

    fileReader.readAsText(data);

    return new Promise<EntryFormat['columns']>((resolve, reject) => {
        fileReader.onload = () => {
            const fileData = fileReader.result;
            let result: EntryFormat['columns'] = [];
            switch (fileType) {
                case "text/csv":
                    if (typeof fileData === "string") {
                        result = mapCSV(fileData);
                    }
                    break;
                default:
                    reject(new Error("File type not supported"));
            }
            resolve(result);
        };

        fileReader.onerror = () => {
            reject(new Error("Error reading file"));
        };
    });
};

const mapCSV = (text: string): EntryTransactionFormat[] => {
    const lines = text.split("\n");
    const headers = lines[0].split(";");

    const transactions = lines.slice(1).map((line) => {
        const transaction: EntryTransactionFormat = {};
        line.split(";").forEach((value, index) => {
            transaction[headers[index]] = value;
        });

        return transaction;
    });

    return transactions;
};
