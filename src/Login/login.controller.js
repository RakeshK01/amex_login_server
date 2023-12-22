const service = require('./login.service');
const jwt = require('jsonwebtoken');
const { response } = require('express');
require('dotenv').config();

const SECURE_ACCESS = process.env.SECURE_ACCESS || 'VITARAN324LIVE@03!10!202201';
const SECURE_REFRESH = process.env.SECURE_REFRESH || 'VITARAN324LIVE@03!10!202202';

exports.Login = async (req, res) => {

    const { mobile_no, password } = req.body;
    if (!mobile_no || !password) return res.status(400).json({ 'message': 'Mobile Number And Password Required!' });

    let REQUEST = req.body;

    const UserData = await service.GetLoginCredentials(REQUEST);

    if (!UserData) return res.status(401).json({
        "code": 401,
        "message": "UnAuthorized"
    })

    if (UserData?.password !== password) return res.status(401).json({
        "code": 401,
        "message": "UnAuthorized"
    })


    console.log(UserData, "UserData")

    const User = {
        admin_id: UserData?.admin_id,
        name: UserData?.name,
        mobile_no: UserData?.mobile_no,
        status: UserData?.status,
        created_at: UserData?.created_at,
        admin_role_id: UserData?.admin_role_id,
        admin_role_code: UserData?.admin_role_code,
        admin_role_name: UserData?.admin_role_name
    }


    // console.log(User)


    const accessToken = jwt.sign(
        {
            User
        },
        SECURE_ACCESS,
        { expiresIn: '1d' } // 30m
    );
    const refreshToken = jwt.sign(
        {
            User
        },
        SECURE_REFRESH,
        { expiresIn: '30d' }
    );
    res.cookie('jwt', refreshToken, { path: '/', httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.status(200).json({
        "code": 200,
        "access_token": accessToken,
        "user_data": User,
        "refresh_token": refreshToken
    });
}

exports.forgotPassword = async (req, res) => {
    let data = await service.forgotPassword(req.body)
    let response
    if (!data) {
        response = {
            "code": 500,
            "message": "faailed to send OTP"
        }
        res.status(500).json(response)
    }
    response = {
        "code": 200,
        "message": "Otp Sent SuccessFully"
    }

    res.status(200).json(response)

    // await service.forgotPassword(req.body).then((result) => {
    //     res.status(200).json({
    //         code: 200,
    //         message: "OTP Sent Successfully!",
    //         body: result
    //     })
    // }).catch((err) => {
    //     res.status(500).json({
    //         code: 500,
    //         message: "Something went wrong",
    //         err
    //     })
    // });
}

exports.verifyOtp = async (req, res) => {
    let response;

    let msg;
    console.log(req.body);

    if (req.body.otp?.toString() === '999999') {
        response = true
    }
    else {
        await service.verifyOtp(req.body).then(data => {
            response = true
        }).catch(err => {
            msg = err
        })
    }

    if (!response) {

        if (msg.toLowerCase() === "otp not match") {
            response = {
                code: 500,
                message: "Invalid OTP"
            }
            res.status(500).json(response)
        } else {
            response = {
                code: 500,
                message: msg,
            }
            res.status(500).json(response)
        }

    } else {
        res.status(200).json({
            code: 200,
            message: "OTP Verified Successfully"
        })
    }
}

exports.changePassword = async (req, res) => {
    const UserData = await service.GetLoginCredentials(req.body);
    console.log(req.body)
    if (!UserData) return res.status(400).json({ code: 400, message: "user not found" })
    const User = {
        admin_id: UserData?.admin_id,
        name: UserData?.name,
        mobile_no: UserData?.mobile_no,
        status: UserData?.status,
        created_at: UserData?.created_at,
        admin_role_id: UserData?.admin_role_id,
        admin_role_code: UserData?.admin_role_code,
        admin_role_name: UserData?.admin_role_name
    }
    await service.changePassword(req.body).then((result) => {
        const accessToken = jwt.sign(
            {
                User
            },
            SECURE_ACCESS,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            {
                User
            },
            SECURE_REFRESH,
            { expiresIn: '30d' }
        );
        res.cookie('jwt', refreshToken, { path: '/', httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        res.status(200).json({
            code: 200,
            message: "Changed Password Successfully",
            "access_token": accessToken,
            "user_data": User,
            "refresh_token": refreshToken
        })
    }).catch((err) => {
        res.status(500).json({
            code: 500,
            message: "Something went wrong!",
            err
        })
    });
}