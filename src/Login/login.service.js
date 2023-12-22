const pool = require('../config/database');
const dotenv = require('dotenv');



exports.GetLoginCredentials = async (json) => {

    return new Promise((resolve, reject) => {
        var QUERY = 'SELECT a.*,art.admin_role_id,art.admin_role_code,art.admin_role_name FROM admin_table AS a LEFT JOIN admin_role_table AS art ON art.admin_role_id = a.role_id where a.mobile_no=$1 AND a.status=$2';

        pool.query(QUERY, [json.mobile_no, true], (err, result) => {
            console.log("error", err)
            if (err) reject(err)
            console.log(result)
            resolve(result.rows[0])
        })
    })
}

exports.forgotPassword = async (json) => {
    return new Promise((resolve, reject) => {
        const mobile = json.mobile_no;
        console.log("Mobile: ", mobile)

        const authkey = process.env.MSG91_AUTH;
        const template_id = process.env.MSG91_template_id;


        var options = {
            'method': 'POST',
            'url': `https://api.msg91.com/api/v5/otp?template_id=${template_id}&mobile=91${mobile}&authkey=${authkey}&otp_length=6`,
            'headers': {
                'Authorization': `key=${authkey}`,
                'Content-Type': 'application/json'
            }
        }


        // console.log('authkey', authkey)
        // console.log('template_id', template_id)
        // console.log('url: ', `https://api.msg91.com/api/v5/otp?template_id=${template_id}&mobile=91${mobile}&authkey=${authkey}&otp_length=6`)

        request.get(options, (error, response, body) => {
            console.log(error,"OTPError")
            console.log(response,"OTPSuccess")

            if (error) {
                reject(error)
            }

            if (response.statusCode === 200) {
                resolve(response.body)
            }
        })
    })
}

exports.verifyOtp = async (json) => {
    return new Promise((resolve, reject) => {
        const mobile = json.mobile_no;
        const otp = json.otp;
        console.log("Mobile: ", mobile)
        console.log("OTP: ", otp)

        const authkey = process.env.MSG91_AUTH;


        var options = {
            'method': 'POST',
            // 'url': `https://api.msg91.com/api/v5/otp?template_id=${template_id}&mobile=91${mobile}&authkey=${authkey}&otp_length=6`,
            'url': `https://api.msg91.com/api/v5/otp/verify?mobile=91${mobile}&otp=${otp}&authkey=${authkey}`,
            'headers': {
                'Authorization': `key=${authkey}`,
                'Content-Type': 'application/json'
            }
        }


        console.log('authkey', authkey)
        console.log('url: ', `https://api.msg91.com/api/v5/otp/verify?mobile=91${mobile}&otp=${otp}&authkey=${authkey}`)

        request.get(options, (error, response, body) => {
            if (error) {
                reject(error)
            }

            let responseBody = JSON.parse(response.body)

            console.log(responseBody)

            console.log(responseBody.message)

            if (responseBody.type == "error") {
                reject(responseBody.message)
            }

            if (responseBody.type == "success") {
                resolve(responseBody)
            }

            reject("Something Went Wrong!")

        })
    })
}

exports.changePassword = async (json) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE admin_table SET password = $1 WHERE mobile_no = $2;"

        pool.query(
            query,
            [json.password, json.mobile_no],
            (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            }
        )
    });
}

exports.getAdminCount = async (json) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT COUNT(admin_id) AS admin_count FROM admin_table WHERE mobile_no = $1;"

        pool.query(
            query,
            [json.mobile_no],
            (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result.rows[0].admin_count)
                }
            }
        )
    });
}