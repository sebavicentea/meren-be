import express, { Request, Response } from "express";
import { Contributor } from "../../models/db/contributor";

const router = express.Router();

router.get("/api/campaign/:campaign", async (req: Request, res: Response) => {
    const { campaign } = req.params;

    const contributors = await Contributor.find({ campaign });

    res.send(contributors);
});

export { router as campaignRouter };
