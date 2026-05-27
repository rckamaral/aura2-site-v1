import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import donationsRouter from "./donations";
import newsRouter from "./news";
import ticketsRouter from "./tickets";
import partnersRouter from "./partners";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(donationsRouter);
router.use(newsRouter);
router.use(ticketsRouter);
router.use(partnersRouter);

export default router;
