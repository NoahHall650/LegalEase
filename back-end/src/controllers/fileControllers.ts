import { RequestHandler } from "express";
import { File } from "../models/file";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";
import * as path from "path";
import fs from "fs";

export const getFiles: RequestHandler = async (req, res, next) => {
   // We have this on most thing and its purpose is to check if a valid token is in local storage and if not then it
   // catches it and returns an unauthorized 403 error.
   let user: User | null = await verifyUser(req);
   if (!user) {
      return res.status(403).send();
   }
   // This is finding all the files that have the same userId as the signedin user.
   let files = await File.findAll({ where: { userId: user.userId } });
   res.status(200).json(files);
};

export const createFile: RequestHandler = async (req: any, res, next) => {
   let user: User | null = await verifyUser(req);
   if (!user) {
      return res.status(403).send();
   }
   // This is making a request to the field name in the body of the document that was submitted.
   const file = req.file;

   console.log(file);
   // If there is a file it will execute the following code but if the document isn't field name type file it will give a 400 error.
   if (file) {
      const md5File = require("md5-file");
   // This part was done by Isaac it's for checking if the file you are uploading has been uploaded before, this uses md5file which gives back a hash that symbolizes
   // the file and if you give it the same file it will give back the same hash you got previously.
      const hash = md5File.sync(
         path.resolve(__dirname, "../../userFiles", file.filename)
      );
      // This is comparing the hash of the file you are attempting to upload and the files that already exist this is also checking if the userId's match
      // because you don't want to compair with other users files
      let currentFile = await File.findOne({
         where: { hash: hash, userId: user.userId },
      });

      if (currentFile) {
         res.json({ file: "file already exists" });
      } else {
      // This is setting the diffrent values for the file table then creating the file 
         let newFile: File = req.body;
         newFile.userId = user.userId;
         newFile.storedName = file.filename;
         newFile.fileName = file.originalname;
         newFile.hash = hash;
         newFile.createdAt = newFile.updatedAt = new Date();
         let created = await File.create(newFile);
         res.status(201).json(created);
      }
   } else {
      res.status(400).send();
   }
};

export const getOneFile: RequestHandler = async (req, res, next) => {
   let user: User | null = await verifyUser(req);
   if (!user) {
      return res.status(403).send();
   }
   // This searches by the primary key of the file 
   let fileId = req.params.fileId;
   let fileFound = await File.findByPk(fileId);
   if (fileFound) {
      res.status(200).json(fileFound);
   } else {
      res.status(404).json({});
   }
};

export const downloadOneFile: RequestHandler = async (req, res, next) => {
   let fileId = req.params.fileId;
   let fileFound = await File.findOne({ where: { storedName: fileId } });
   if (fileFound) {
      res.set(
         "Content-Disposition",
         `attachment; filename="${fileFound.fileName}"`
      );
      res.sendFile(
         path.join(__dirname, "../../userFiles/", fileFound.storedName)
      );
   } else {
      res.status(404).send("File does not exist");
   }
};

export const editFile: RequestHandler = async (req, res, next) => {
   let user: User | null = await verifyUser(req);
   if (!user) {
      return res.status(403).send();
   }
   let fileId = req.params.fileId;
   let newFile: File = req.body;
   let fileFound = await File.findByPk(fileId);
   if (
      fileFound &&
      fileFound.fileId == newFile.fileId &&
      newFile.fileName &&
      newFile.description
   ) {
      await File.update(newFile, {
         where: { fileId: fileId },
      });
      res.status(200).json();
   } else {
      res.status(400).json();
   }
};

export const deleteFile: RequestHandler = async (req, res, next) => {
   let user: User | null = await verifyUser(req);
   if (!user) {
      return res.status(403).send();
   }
   let fileId = req.params.fileId;
   let fileFound = await File.findByPk(fileId);
   console.log("fileFound", fileFound?.dataValues.storedName);

   let storedName = fileFound?.dataValues.storedName;

   // Get the parent directory
   const parentDirectory = path.resolve(__dirname, "../..");

   const filePath = path.join(parentDirectory, "userFiles", `${storedName}`);

   console.log("filePath: ", filePath);

   if (fileFound) {

      await File.destroy({
         where: { fileId: fileId },
      });
      fs.unlink(`${filePath}`, function (err: any) {
         if (err) throw err;
         console.log("deleted");
      });
      res.status(200).json({ success: "file deleted" });
   } else {
      res.status(404).json({ failed: "error occured" });
   }
};
