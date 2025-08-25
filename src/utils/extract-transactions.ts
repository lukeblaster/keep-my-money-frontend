"use client";
import { Ofx } from "ofx-data-extractor";

interface ExtractTransactionsProps {
  fileString: string;
}

export const extractTransactions = async ({
  fileString,
}: ExtractTransactionsProps) => {
  const ofx = new Ofx(fileString);

  const transactionsSummary = ofx.getCreditCardTransferList();

  const transactions = transactionsSummary.map((transaction) => {
    const finalValue = transaction.TRNAMT.toString().replace("-", "");
    return {
      id: transaction.FITID,
      shouldImport: true,
      name: transaction.MEMO,
      type: transaction.TRNTYPE == "DEBIT" ? "despesa" : "ganho",
      finalValue: Number(finalValue),
      date: transaction.DTPOSTED,
    };
  });

  return transactions;
};
