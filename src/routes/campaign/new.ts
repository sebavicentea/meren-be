import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "@sebavicentea_org/common";
import { Contributor } from "../../models/db/contributor";


const router = express.Router();

router.post(
  "/api/campaign/:campaign",
  [body("name").not().isEmpty().withMessage("Name is required"),
  body("lastname").not().isEmpty().withMessage("Last name is required"),
  body("phone").isInt({min: 0}).withMessage("Phone is required"),
  body("amount").isInt({min: 0}).withMessage("Amount is required"),
  body("installments").isInt({min: 0}).withMessage("Installments is requireed")
],
  validateRequest,
  async (req: Request, res: Response) => {
    const { campaign } = req.params;
    const { name, lastname, phone, amount, installments} = req.body;

    const contributor = Contributor.build({name, lastname, phone, amount, installments, date: new Date(), campaign});
    await contributor.save();

    res.status(201).send(contributor);    
  }
);

export { router as createContributorRouter };
