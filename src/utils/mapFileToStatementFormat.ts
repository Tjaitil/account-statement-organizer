import {
  EntryFormat,
  isTransactionFormatOne,
  isTransactionFormatTwo,
  UncategorizedTransaction,
} from '../types/Statements';

export const mapFromStatementFormat = (
  initialColumns: EntryFormat['columns'],
) => {
  const mappedTransaction: UncategorizedTransaction[] = [];
  const columns = initialColumns;

  columns.forEach((statement, index) => {
    if (isTransactionFormatOne(statement)) {
      const amount = parseInt(statement.Beløp);
      mappedTransaction.push({
        id: index,
        date: statement.Dato,
        description: statement.Beskrivelse,
        amount: amount,
        type: statement.Type,
        isIncomming: amount > 0 ? true : false,
      });
    } else if (isTransactionFormatTwo(statement)) {
      const amount = parseInt(statement['Beløp inn'] || statement['Beløp ut']);
      const isIncomming = amount > 0 ? true : false;

      if (statement.Beskrivelse != null && statement.Beskrivelse.length > 0) {
        mappedTransaction.push({
          id: index,
          date: statement['Bokført dato'],
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
