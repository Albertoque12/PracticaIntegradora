import { Router } from "express";
import usersManager from '../dao/users.manager.js'

const uRouter = Router()

uRouter.get('/', async (req, res, next) => {
    try {
      const users = await usersManager.getAll();
      res.send({ users });
    } catch (error) {
      next(error);
    }
  });

  uRouter.post('/', async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await usersManager.save(data);
      res.send({ user: newUser });
    } catch (error) {
      next(error);
    }
  });

export default uRouter