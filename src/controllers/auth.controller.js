import { model } from "mongoose";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/env.js";
import { generateToken } from "../utils/jwt.js";

export default {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "",
          data: null,
        });
      }

      // apakah ada email yang sama?
      const exitingUserEmail = await userModel.findOne({ email });
      if (exitingUserEmail) {
        return res.status(400).json({
          success: false,
          message: "Email has already used!",
          data: null,
        });
      }

      // encryps password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        success: true,
        message: "Akun Anda telah Terdaftar!",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Mohon Isi Seluruh Field!",
          data: null,
        });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Pengguna tidak di temukan",
          data: null,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      //jika tidak match maka kembalikan status 400 dan message password salah
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Password Salah",
          data: null,
        });
      }

      // generate token pake jwt variable token, jwt.sign(objek id user, secret jwt dari env, objek expired: berapa hari),
      const token = generateToken(user)
      
      // response, status 200 json, success true, message "Berhasil Login!", data: token, dan user(id, nama,email)
      res.status(200).json({
        success: true,
        message: "Berhasil Login!",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `error server: ${error.message}`,
        data: null,
      });
    }
  },

  async me(req, res) {
    try {
      // user dari request get object user
      // result lalu query berdasarkan user get: id
      const result = await userModel.findById(req.user.id);
      // response status cek aja coba
      res.status(200).json({
        success: true,
        message: "Success get profile!",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `error server: ${error.message}`,
        data: null,
      });
    }
  },

  dummy(req, res) {
    res.json({ message: "Success!", data: req.headers });
  },
};
