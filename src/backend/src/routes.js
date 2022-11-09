import { Router } from "express";
import { createTable, insertDevice, updateDevice, selectDevices, selectDevice, deleteDevice  } from './Controller/device.js';

const routes = Router();

routes.get('/devices', selectDevices)

export default routes;