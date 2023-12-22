const pool = require("../../src/config/database");

exports.getRoleList = async () => {
  return new Promise((resolve, reject) => {
    const Query =
      "Select * from admin_role_table where admin_role_name='super_category_admin' ";

    pool.query(Query, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};
