// category admin(dont have access)
//  zone
//  access
//  company
//  sc
//  kyc
//  ticket
//  dashboard

// 1	9999	"root"           "2023-01-19 00:00:00"
// 3	1946	"super_admin"	"2023-01-19 00:00:00"
// 4	3917	"super_category_admin"	"2023-01-19 00:00:00"
// 5	5107	"user"	"2023-01-19 00:00:00"

module.exports = {
  zoneList: [9999, 1946, 3917],
  StateMgt: [9999, 1946, 3917],
  ZoneMgt: [9999, 1946, 3917],
  DistrictMgt: [9999, 1946, 3917],
  HolidayCalender: [9999, 1946, 3917],
  SubscriptionMgt: [3917],
  WalletManagementAdmin: [9999, 1946],
  WalletManagementVP: [9999, 1946, 3917],
  //////////////////////////
  AccessMgmnt: [9999, 1946],
  AccessMgtAdd: [9999, 1946],
  AccessMgtUpdate: [9999, 1946],
  ///////////////////////////////
  Company: [9999, 1946, 3917],
  SuperCategory: [9999, 1946, 3917],
  Category: [9999, 1946, 3917, 5107],
  SKUMgmnt: [9999, 1946, 3917, 5107],
  TransactionMgmnt: [9999, 1946, 3917, 5107],
  KYC: [9999, 1946, 5107],
  Dashboard: [9999, 1946, 5107],
  TicketMgmnt: [9999, 1946, 3917],
  TicketMgmntAccess: [3917],
  VideoAnalytics: [9999, 1946, 3917],

  RoleMgt: {
    9999: [9999],
    1946: [9999, 1946],
    3917: [9999, 1946, 3917],
    5107: [9999, 1946, 3917, 5107],
  },
};
