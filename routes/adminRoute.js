var express = require("express");
var router = express.Router();
const Login = require("../src/Login/login.controller");
// const JWT = require("./jwtAuth/jwtAuth");
const ROLE = require("../src/admin/role.controller");
const JWT = require("./jwtAuth/jwtAuth")

router.post("/adminLogin", Login.Login);
router.post("/forgotPassword", Login.forgotPassword);
router.post("/verifyOtp", Login.verifyOtp);
router.post("/changePassword", Login.changePassword);
router.post("/getNewAccessToken", JWT.NewAccessToken);
router.post("/getRoleList", JWT.VerifyToken, ROLE.GetRoleList);
module.exports = router;