import { getCustomRepository } from "typeorm";

import AppError from "../errors/AppError";

import TransactionsRepository from "../repositories/TransactionsRepository";

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) {
      throw new AppError("Transaction does not exists");
    }

    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
