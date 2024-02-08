import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel); //CREATE
router.put("/:id", verifyAdmin, updateHotel); //UPDATE
router.delete("/:id", verifyAdmin, deleteHotel); //DELETE
router.get("/find/:id", getHotel); //GET
router.get("/", getHotels); //GET ALL

router.get("/countByCity", countByCity); //GET WITH THE SPECIFIED CITIES

router.get("/countByType", countByType); //GET ALL
router.get("/room/:id", getHotelRooms); //GET HOTEL ROOM

export default router;
