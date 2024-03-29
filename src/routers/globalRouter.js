import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
  githubLogin,
  postGithubLogin,
  getMe,
  facebookLogin,
  postFacebookLogin
} from "../controller/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    successFlash: "Welcome to MY Wetube with Github ❤️",
    failureFlash: "Can't log in at this time",
    failureRedirect: "/login"
  }),
  postGithubLogin
);
globalRouter.get(routes.me, getMe);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", {
    successFlash: "Welcome to MY Wetube with Facebook ❤️",
    failureFlash: "Can't log in at this time",
    failureRedirect: "/login"
  }),
  postFacebookLogin
);

export default globalRouter;
