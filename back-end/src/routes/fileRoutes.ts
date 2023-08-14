import { Router } from "express";
import {
   createFile,
   getFiles,
   getOneFile,
   editFile,
   deleteFile,
   downloadOneFile,
} from "../controllers/fileControllers";

const multer = require("multer");
const upload = multer({ dest: "userFiles/" });

const router = Router();

router.get("/:fileId", getOneFile);
router.get("/download/:fileId", downloadOneFile);
router.put("/:fileId", editFile);
router.delete("/:fileId", deleteFile);
router.get("/", getFiles);
// This uses a package called multer it can take a file and then store it on disk with easy access to the data.
router.post("/", upload.single("file"), createFile);

export default router;
