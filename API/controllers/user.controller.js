const crypto = require('crypto');
var jwt = require('jsonwebtoken');
import { smtpTransport,fromEmail } from '../config/mail';
import { SENDGRID_API_KEY } from '../config';
import { createClient } from '../helper';
import { addErrorLog } from './errorLog.controller';
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(SENDGRID_API_KEY)

//Check user e-mail exists or not
export const emailCheckUser = async (req, res) => {
    try {
        var reqEmail = req.body.email;
        var client = await createClient();
        client.connect();
        //Check E-mail already exists in table
        var result = await client.query(`select * FROM m_users WHERE LOWER(email) = LOWER($1)`, [reqEmail]);
        await client.end();
        if (result.rowCount > 0) {
            return res.json({ 'success': true, 'message': 'Email Already Exist' })
        } else {
            return res.json({ 'success': false, 'message': 'Email does not Exist' });
        }

    } catch (err) {
        await client.end();
        addErrorLog(err);
        return res.json({ 'success': false, 'message': err.message });
    }
}



//Check Customer e-mail exists or not
export const customerEmailCheckUser = async (req, res) => {
    try {
        var reqEmail = req.body.email;
        var client = await createClient();
        client.connect();
        //Check E-mail already exists in table
        var result = await client.query(`select * FROM m_customer WHERE LOWER(email) = LOWER($1)`, [reqEmail]);
        await client.end();
        if (result.rowCount > 0) {
            return res.json({ 'success': true, 'message': 'Email Already Exist' })
        } else {
            return res.json({ 'success': false, 'message': 'Email does not Exist' });
        }

    } catch (err) {
        await client.end();
        addErrorLog(err);
        return res.json({ 'success': false, 'message': err.message });
    }
}

//Check Mobile already exists or not
export const contactCheckUser = async (req, res) => {
    try {
        var reqMobile = req.body.mobile;
        var client = await createClient();
        client.connect();
        //Check Mobile already exists in table
        var result = await client.query(`select phone_number FROM m_users WHERE phone_number = $1`, [reqMobile]);
        await client.end();
        if (result.rowCount > 0) {
            res.status(200).send({
                'success': true,
                'message': 'Contact Already Exist'
            });
        } else {
            res.status(200).send({
                'success': false,
                'message': 'Contact is ok'
            });
        }


    } catch (err) {
        await client.end();
        addErrorLog(err);
        return res.json({ 'success': false, 'message': err.message });
    }
}
// Register new admin
export const addUser = async (req, res) => {
    var client = await createClient();
    try {
        client.connect();
        var user_email = req.body.emailid.toLowerCase();
        var cur_date = new Date();
        if (!req.body.fname)
            return res.json({ 'success': false, 'message': 'First Name Not Found.' });
        if (!req.body.lname)
            return res.json({'success': false, 'message': 'Last Name Not Found.' });
            if (!req.body.gender)
            return res.json({'success': false, 'message': 'Gender Not Found.' });
        if (!req.body.emailid)
            return res.json({'success': false, 'message': 'E-mail Not Found.'});
        if (!req.body.pass)
            return res.json({'success': false,'message': 'Password Name Not Found.' });
        if (!req.body.cpass)
            return res.json({'success': false,'message': 'canfirm Password  Not Found.' });
            if (!req.body.cont)
            return res.json({'success': false,'message': 'Contact No.  Not Found.' });
        var token;
        function rand(length, current) {
            current = current ? current : '';
            return length ? rand(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + current) : current;
        }
        token = rand(25);
        var name = req.body.fname + " " + req.body.lname;
        //Link for  Signup Verify Page
        var link = "https://localhost:4200/signup-verify?token=" + token;
        var mailOptions = {
            from: fromEmail,
            to: user_email,
            subject: "DASDAK - Account Verification",
            html: `<p><a class="navbar-brand" href="http://gopalsaw.in">
                <table style="text-align: left; margin: 0 auto; padding: 16px;" border="0" width="568" cellspacing="0" cellpadding="0" align="center">
                <tbody>
                <tr>
                <td style="width: 100%; display: block; max-width: 600px !important; text-align: center;" align="left"><span style="font-family: 'Open Sans',Arial,sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; color: #0e1318; text-align: left; margin: 0;">Hello <strong>${name} ,</strong><br />Thank you for registering with DASDAK. Please use below link to activate your account.</span></td>
                </tr>
                </tbody>
                </table>
                <table style="border-collapse: separate; line-height: 100%; width: 292px; padding: 0px 16px; height: 34px;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
                <tbody>
                <tr>
                <td style="border-radius: 4px; color: #ffffff; height: 52px; width: 258px; border: none;" role="presentation" align="center" valign="middle" bgcolor="#00c4cc">
                <a href="${link}" style="text-decoration: none!important;"> <p style="background-color: #00c4cc; color: #ffffff; font-family: 'Open Sans',Arial,sans-serif; font-size: 16px; font-weight: 600; line-height: 24px; text-decoration: none; text-transform: none; border-radius: 4px; margin: 0; padding: 16px 0;">Click here to verify</p>
                </a></td>
                </tr>
                </tbody>
                </table>
                <p>&nbsp;</p>
                <hr />`
        }

        // Strong Password encryption and store in salt and hash variable
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.pbkdf2Sync(req.body.pass, salt, 1000, 64, 'sha512').toString('hex');
        var cdate = new Date();
         let sqlUser = `INSERT into m_users
            (username,fullname, gender, email, phone_number, first_name, last_name, hash, salt, signup_token,active,
                create_on,role_type)
             values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13) RETURNING *`;
            var params = [user_email, name, req.body.gender,user_email, req.body.cont, req.body.fname, req.body.lname, hash, salt, token, false, cdate,1];
        var responseData = await client.query(sqlUser, params);
           //For Mailer 
       // var mailResponse = await smtpTransport.sendMail(mailOptions);
         //For SendGrid
        var checkMailSend = await sgMail.send(mailOptions);
        await client.end();
        return res.json({ 'success': true, 'message': 'User Created' });
    } catch (err) {
        console.log(err)
        addErrorLog(err);
        await client.end();
        return res.json({ 'success': false, 'message': err.message });
    }
}




//Add new customer with guest 

export const addCustomerData = async (req, res) => {
    var client = await createClient();
    try {
        client.connect();
        var user_email = req.body.main_email.toLowerCase();
        let cur_date = new Date();
            let opt1 = req.body.options[0];
            let opt2 = req.body.options[1];
            let opt3 = req.body.options[2];
            let opt4 = req.body.options[3];
        if (!req.body.firstname)
            return res.json({ 'success': false, 'message': 'First Name Not Found.' });
        if (!req.body.lastname)
            return res.json({'success': false, 'message': 'Last Name Not Found.' });
        if (!req.body.main_email)
            return res.json({'success': false, 'message': 'E-mail Not Found.'});
        if (!req.body.zipcode)
            return res.json({'success': false,'message': 'Password Name Not Found.' });
           //Check customer id exists or not
            var parentId = (req.body.parentId)? req.body.parentId : null;
            await client.query("BEGIN");
            //If customer  id exists then insert only guest table other wise insert both table
            if(!parentId){
                let sqlCustomer = `INSERT into m_customer
                (first_name,last_name,email,zip_code,no_of_guests,free_season_ticket,free_redskins,special_offers,free_redskins_salute,create_on)
                 values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;
                var params = [req.body.firstname,req.body.lastname,user_email,req.body.zipcode,req.body.guests,opt1,opt2,opt3,opt4,cur_date];
            var responseData = await client.query(sqlCustomer, params);
                   //Get customer id reference for guest table
                parentId  = responseData.rows[0].id;
              }
           var friendData = req.body.addedFriend;
                    for(let i=0; i< friendData.length; i++){
                        var guest_email = friendData[i].email.toLowerCase();
                       await client.query(`INSERT INTO m_guests(user_id,first_name,last_name,email)Values($1,$2,$3,$4)`,[parentId,friendData[i].firstname,friendData[i].lastname,guest_email]); 
                    }
                   var totalGuest = await client.query(`SELECT COUNT(gid) FROM m_guests WHERE user_id=$1`,[parentId]);  
                   await client.query(`UPDATE m_customer SET no_of_guests=$1 WHERE id=$2`,[totalGuest.rows[0].count,parentId]);
                   await client.query("COMMIT");
                   await client.end();
                  return res.json({ 'success': true, 'data': parentId});
    } catch (err) {
        console.log(err)
        addErrorLog(err);
        await client.query("ROLLBACK");
        await client.end();
        return res.json({ 'success': false, 'message': err.message });
    }
}













// User verification with token
export const userVerifyWithToken = async (req, res) => {
    try {
        var reqToken = req.body.e_token;
        var client = await createClient();
        var Newtoken;
        function rand(length, current) {
            current = current ? current : '';
            return length ? rand(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + current) : current;
        }
        Newtoken = rand(25);
        client.connect();
        // Check signup token exits
        var result = await client.query(`select * FROM m_users WHERE signup_token =$1`, [reqToken]);
        if (result.rowCount) {
            // Update master table status
            await client.query('update m_users set active = true, signup_token = $1 where signup_token = $2', [Newtoken, reqToken]);
            await client.end();
            res.status(200).send({'success': true,'message': 'Account has been verified'});
        } else {
            await client.end();
            res.send({ 'success': false,'message': 'Invalid Token'});
        }
    } catch (err) {
        console.log(err.message);
        await client.end();
        addErrorLog(err);
        return res.json({ 'success': false, 'message': err.message });
    }
}
// Validate admin user
export const validateAdmin = async function (req, res) {
    try {
        var username = req.body.username;
        var password = req.body.password;
        if (!req.body.username)
            return res.json({'success': false,'message': 'Username  Not Found.'});
        if (!req.body.password)
            return res.json({'success': false,'message': 'Password Not Found.' });
        var client = await createClient();
        client.connect();
        //First Usename check email exits
        var result = await client.query(`SELECT * FROM m_users WHERE LOWER(username) = LOWER($1)`, [username]);
        if (result.rows.length === 0) {
            await client.end();
            return res.json({ 'success': false, 'message': 'Username or Password Invalid' });
        }
        var user = result.rows[0];
        //Function call for validate password
        var passwordResult = validPassword(password, user.salt, user.hash);
        if (!passwordResult) {
            await client.end();
            return res.json({ 'success': false, 'message': 'Username or Password Invalid' });
        }
        if (!user.active) {
            await client.end();
            return res.json({ 'success': false, 'message': 'Verify email to activate account' });
        }
        let userToken = generateJwt(user);
        var responseObj = {
            "token": userToken,
            'fullName': user.fullname,
            'username': user.username,
            'last_login': user.last_login,
            'role_type':user.role_type
        };
        var CurDate = new Date();
        //Update last login date status
        await client.query('update m_users set last_login = $1 where id = $2', [CurDate, user.id]);
        await client.end();
        return res.json({'success': true,'data': responseObj });

    } catch (err) {
        await client.end();
        addErrorLog(err);
        return res.json({ 'success': false, 'message': err.message });

    }

}


//If you call private route then first check user token exits or not
export const loginRequired = (action) => {
    return async function (req, res, next) {
        try{
            if(!req.user) 
            throw new Error('Access Denied');
                return next()
        }catch(err){
            console.log(err.message);
            return res.status(401).json({ message:err.message });
        }
        

    }
}


//Validate password
var validPassword = function (password, salt, hash) {
    var new_hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hash === new_hash;
};
//Store information on JWT for security perpose
var generateJwt = function (user) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        id: user.id,
        username: user.username,
        fullName: user.fullname,
        role_type:user.role_type,
        exp: parseInt(expiry.getTime() / 1000),
    }, 'llp');
};
