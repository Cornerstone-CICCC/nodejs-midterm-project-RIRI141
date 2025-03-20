import { Request, Response } from "express";
import { User } from "../types/user"
import userModel from "../models/user.model";



/**
 * Get all users
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
const getUsers = (req: Request, res: Response) => {
    const users = userModel.findAll();
    if (!users) {
        res.status(500).json({
          message: "No users",
        });
    }    
    res.status(200).json(users);
  };
/**
 * Add new User
 * 
 * @param {Request<{id: string}>} req
 * @param {Response} res
 * @returns {void}
 */
const createUser = async ( req:Request<{},{}, Omit<User, "id" | "favorite" | "rate" >>, res: Response) => {
const { username, password } = req.body
if(!username || !password) {
    return res.status(400).send("Username and Password are required")
}
const user = await userModel.createUser({ username, password })
if(!user) {
    res.status(400).send("Username already exists")
    return
}
res.status(201).send(user)
}

/**
 * Login User 
 * 
 * @param {Request<{}, {}, Omit<User, 'id' | "rate">>} req
 * @param {Response} res
 * @returns {void}
 */
const loginUser = async ( req: Request<{}, {}, Omit<User, 'id' | 'rate'>>, res: Response) => {
  const { username, password } = req.body
  if(!username || !password) {
      res.status(500).json({
          error: "Username/password is wrong"
      })
      return
  }
  const user = await userModel.checkUserPass(username, password)
  if(!user) {
      res.status(500).json({
          error: "Login infomation is wrong"
      })
      return 
  }
  if(req.session) {
      req.session.isLoggedIn = true
      req.session.username = user.username
  }
  res.status(200).send("You Logged in")
}

/**
 * Edit user by ID
 *
 * @param {Request<{id: string}, {}, Partial<User>>} req
 * @param {Response} res
 * @returns {void}
 */
const editUserById = async (req: Request<{ id: string }, {}, Partial<User>>, res: Response) => {
    const { id } = req.params;
    const { username, password, favorite } = req.body;
    try {
        const user = await userModel.editUserById(id, { username, password, favorite });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};


export default {
getUsers,
createUser,
loginUser,
editUserById
}