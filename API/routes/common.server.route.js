import express from 'express';
import * as UserController from '../controllers/user.controller';
import * as CustomerController from '../controllers/customer.controller';
const router = express.Router();
//===============Admin signup public router here start ================
 router.route('/email-check').post(UserController.emailCheckUser);
 router.route('/contact-check').post(UserController.contactCheckUser);
 router.route('/signup').post(UserController.addUser);
 router.route('/user-verify').post(UserController.userVerifyWithToken);
 router.route('/signin').post(UserController.validateAdmin);

 //===================customer signup route here ======================
 router.route('/customer-email-check').post(UserController.customerEmailCheckUser);
 router.route('/customer-signup').post(UserController.addCustomerData);

 //Customer data get this routes and must be authorized
 router.route('/customer-list').get(UserController.loginRequired(null),CustomerController.getCustomerData);
 router.route('/customer-list/:id').get(UserController.loginRequired(null),CustomerController.getCustomerWithGuestData);
 router.route('/customer-email-list/:email').get(UserController.loginRequired(null),CustomerController.getDataByEmailRead);
//Guest data get this routes and must be authorized
router.route('/guest-list/:customerId').get(UserController.loginRequired(null),CustomerController.getGuestData);
 
 export default router;
