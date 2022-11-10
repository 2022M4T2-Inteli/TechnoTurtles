import { Router } from "express";
import { createTable, insertDevice, updateDevice, selectDevices, selectDevice, deleteDevice  } from './Controller/device.js';


export const routes = Router();
