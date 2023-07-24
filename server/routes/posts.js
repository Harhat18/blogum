import expres from "express";
import { getPosts } from "../controllers/posts.js";

const router = expres.Router();

router.get("/", getPosts);

export default router;
