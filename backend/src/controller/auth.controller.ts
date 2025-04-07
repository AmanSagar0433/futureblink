import { Request, Response } from "express";

import {
  getUserByNumber,
  createUser,
} from "../db/repositories/user.respository";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../helpers/auth.helper";
import { UserResponse } from "../models/user.model";
import { LoginResponse, LoginStatusResponse, SignupResponse } from "../types/response.types";

export const login = async (req: Request, res: Response<LoginResponse>) => {
  try {
    const { number, password } = req.body;

    if (!number || !password) {
      return res.status(400).json({
        message: "Number and password are required."
      });
    }

    const user = await getUserByNumber(number).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "User not found."
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Invalid password."
      });
    }

    const userResponse: UserResponse = {
      _id: user.id,
      number: user.number,
      name: user.name,
    };
    const { accessToken } = await generateToken(userResponse);

    res.cookie("Authorization", `Bearer ${accessToken}`, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "strict",
      secure: true,
      path: "/",
      httpOnly: true,
    });


    return res.sendStatus(200);

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `Internal Server Error`
    });
  }
};

export const register = async (req: Request, res: Response<SignupResponse>) => {
  try {
    const { name, number, password } = req.body;
    if (!name || !number || !password) {
      return res.status(400).json({
        message: "Name, number and password are required."
      });
    }

    const existingUser = await getUserByNumber(number);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist."
      });
    }

    const newUser = await createUser({
      name,
      number,
      password: password,
    });

    if (!newUser) {
      return res.status(400).json({
        message: "Failed to create user"
      });
    }

    return res.status(200).json({ message: "Sign-up successful. Please log in." });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isUserLoggedIn = async (req: Request, res: Response<LoginStatusResponse>) => {
  const authorization = req.cookies.Authorization;

  if (!authorization) {
    return res.status(200).json({
      data: { isUserLoggedIn: false }
    });
  }

  const accessToken = authorization.split(" ")[1];

  if (!accessToken) {
    return res.status(200).json({
      data: { isUserLoggedIn: false }
    });
  }

  const isValidToken = verifyToken(accessToken);
  if (!isValidToken) {
    return res.status(200).json({
      data: { isUserLoggedIn: false }
    });
  }


  return res.status(200).json({
    data: { isUserLoggedIn: true }
  });
};


export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("Authorization", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};