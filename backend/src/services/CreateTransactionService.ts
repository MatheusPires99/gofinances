import { getCustomRepository, getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Transaction from "../models/Transaction";
import Category from "../models/Category";

import TransactionRepository from "../repositories/TransactionsRepository";

interface Request {
  title: string;
  type: "income" | "outcome";
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionRepository);
    const categoriesRepository = getRepository(Category);

    if (!["income", "outcome"].includes(type)) {
      throw new Error("Invalid balace type");
    }

    const { total } = await transactionsRepository.getBalance();

    if (type === "outcome" && total < value) {
      throw new AppError("You do not have enough balance");
    }

    let transactionCategory = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!transactionCategory) {
      transactionCategory = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(transactionCategory);
    }

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category: transactionCategory,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
