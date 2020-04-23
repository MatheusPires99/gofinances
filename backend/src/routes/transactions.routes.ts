import { Router } from "express";
import { getCustomRepository } from "typeorm";
import multer from "multer";

import uploadConfig from "../config/upload";

import TransactionsRepository from "../repositories/TransactionsRepository";
import CreateTransactionService from "../services/CreateTransactionService";
import DeleteTransactionService from "../services/DeleteTransactionService";
import ImportTransactionsService from "../services/ImportTransactionsService";

const transactionsRouter = Router();

const upload = multer(uploadConfig);

transactionsRouter.get("/", async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionRepository.find({
    order: {
      created_at: "DESC",
    },
  });
  const balance = await transactionRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post("/", async (request, response) => {
  const { title, type, value, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    type,
    value,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService();

  await deleteTransaction.execute(id);

  return response.status(204).send();
});

transactionsRouter.post(
  "/import",
  upload.single("file"),
  async (request, response) => {
    const importTransactions = new ImportTransactionsService();

    const transaction = await importTransactions.execute(request.file.path);

    return response.json(transaction);
  },
);

export default transactionsRouter;
