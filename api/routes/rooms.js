import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom); //CREATE
router.put("/:id", verifyAdmin, updateRoom); //UPDATE
router.put("/availability/:id", updateRoomAvailability); //UPDATE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom); //DELETE
router.get("/:id", getRoom); //GET
router.get("/", getRooms); //GET ALL

export default router;
