const { RoleMgt } = require('../../routes/RoleAuth/AllowedRoles');
const service = require('./role.service');


exports.GetRoleList = async (req, res) => {
    try {
       
        let UserData = req.decoded.User
        const Arr = RoleMgt[parseInt(UserData.admin_role_code)]
        const data = await service.getRoleList()
        if(!data) return res.status(400).json({code:400,message:"failed to fetch record"})
        const NewArr = data.filter(item=>!Arr.includes(parseInt(item.admin_role_code)))
        return res.status(200).json({
            code:200,
            message:"success",
            role_list : NewArr
        })

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal Server Error",
            err: error
        })
    }
}