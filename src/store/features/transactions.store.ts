import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

export interface TransactionState {
  id: string;
  shouldImport: boolean;
  name: string;
  type: "ganho" | "despesa" | "investimento";
  finalValue: number;
  date: string;
}

const initialState: TransactionState[] = [];

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<TransactionState[]>) => {
      return action.payload;
    },
    addTransaction: (state, action: PayloadAction<TransactionState>) => {
      state.push(action.payload);
    },
    toggleShouldImport: (state, action: PayloadAction<string>) => {
      const newState = state.map((transaction) => {
        if (transaction.id == action.payload) {
          transaction.shouldImport = !transaction.shouldImport;
        }
        return transaction;
      });

      state = newState;
    },
    updateTransaction: (state, action: PayloadAction<TransactionState>) => {
      state = state.map((transaction) => {
        if (transaction.id == action.payload.id) {
          transaction.name = action.payload.name;
          transaction.date = action.payload.date;
          transaction.finalValue = action.payload.finalValue;
        }
        return transaction;
      });
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  toggleShouldImport,
  updateTransaction,
} = transactionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTransaction = (state: RootState) => state.transaction.values;

export default transactionSlice.reducer;
