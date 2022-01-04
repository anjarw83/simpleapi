import { Request, Response, Router } from "express";
import authGoogle from "./auth.google";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json("OK");
});

router.get("/success", (req: Request, res: Response) => {
  return res.status(200).json("success");
});

router.get("/error", (req: Request, res: Response) => {
  return res.status(500).json("error");
});

router.get(
  "/google",
  () => {
    authGoogle.googlePassport();
  },
  (req: Request, res: Response) => res.redirect("/auth/success")
);

router.get("/google/redirect", () => {
  authGoogle.redirect();
});

export default router;
