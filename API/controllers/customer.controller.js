import { createClient } from '../helper';
import { addErrorLog } from './errorLog.controller';
const sgMail = require('@sendgrid/mail')
import { SENDGRID_API_KEY } from '../config';
sgMail.setApiKey(SENDGRID_API_KEY);
import { smtpTransport,fromEmail } from '../config/mail';
var pdf = require('html-pdf');
var fs = require('fs');
var path = require('path');
const Mustache = require('mustache');
const b = require('based-blob');
//Get all customer data from m_customer table
export const getCustomerData = async function (req, res) {
    try {
        var client = await createClient();
        client.connect();
        const sql = `SELECT * FROM m_customer order by id DESC`;
        const cusData = await client.query(sql);
        await client.end();
        if (cusData.rowCount > 0) {
            return res.json({ 'success': true, 'data': cusData.rows });
        } else {
            return res.json({ 'success': false, 'message': 'Records not found' });
        }
    } catch (err) {
        await client.end();
        addErrorLog(err);
        return res.json({ 'success': false, 'message': err.message });
    }
}



export const getGuestData = async function (req, res) {
    try {
        var client = await createClient();
        client.connect();
        const sql = `SELECT * FROM m_guests WHERE user_id=$1`;
        const params = [req.params.customerId];
        const guestData = await client.query(sql,params);
        await client.end();
        if (guestData.rowCount > 0) {
            return res.json({ 'success': true, 'data': guestData.rows });
        } else {
            return res.json({ 'success': false, 'message': 'Records not found' });
        }
    } catch (err) {
        await client.end();
        addErrorLog(err);
        return res.json({ 'success': false, 'message': err.message });
    }
}



//Get all customer with guest data
export const getCustomerWithGuestData = async function (req, res) {
    try {

           await sendEmail();
           return true;
     
        // var dataObj = {};
        // var client = await createClient();
        // client.connect();
        // const sql = `SELECT * FROM m_customer WHERE id=$1`;
        // let params = [req.params.id];
        // const cusData = await client.query(sql,params);
        // let ParentId = cusData.rows[0].id;
        // const sqlGuest = `SELECT * FROM m_guests WHERE user_id=$1`;
        // let paramsGuest = [ParentId];
        // const guestData = await client.query(sqlGuest,paramsGuest);
        // dataObj.customerData = (cusData.rows[0]); 
        // dataObj.guestsData = (guestData.rows);
        // await client.end();
        // if (dataObj) {
        //     return res.json({ 'success': true, 'data': dataObj});
        // } else {
        //     return res.json({ 'success': false, 'message': 'Records not found' });
        // }

    } catch (err) {
         console.log(err.message);
        //  await client.end();
        //  addErrorLog(err);
        //  return res.json({ 'success': false, 'message': err.message });
    }
}
// Customer list by email
export const getDataByEmailRead = async function (req, res) {
    try {
        var filterData = '';
        if (req.params.email) {
            filterData = req.params.email;
        } else {
            filterData = '';
        }
        var client = await createClient();
        client.connect();
        const sql = `SELECT * FROM m_customer where email like LOWER($1)`;
        const params = ["%" + filterData + "%"];
        const cusData = await client.query(sql, params);
        await client.end();
        if (cusData.rowCount > 0) {
            return res.json({ 'success': true, 'data': cusData.rows });
        } else {
            return res.json({ 'success': false, 'message': 'Records not found' });
        }
    } catch (err) {
        await client.end();
        addErrorLog(err);
        return res.json({ 'success': false, 'message': err.message });
    }
}

const sendEmail = async() => {
    var client = await createClient();
    client.connect();
    const sql = `SELECT * FROM m_customer order by id DESC`;
    const cusData = await client.query(sql);
    await client.end();

    var finalData = {
        cusData: cusData.rows,
        EmailHeader: path.join('file://', __dirname, '../template/EmailHeader.jpg'),
        PepsiGraphic: path.join('file://', __dirname, '../template/PepsiGraphic.gif'),
        Barcode: path.join('file://',__dirname, '../template/Barcode.png'),
        EmailBody1: path.join('file://',__dirname, '../template/EmailBody1.jpg'),
        EmailBody2: path.join('file://',__dirname, '../template/EmailBody2.jpg'),
        EmailBody3: path.join('file://',__dirname, '../template/EmailBody3.jpg'),
        EmailBody4: path.join('file://',__dirname, '../template/EmailBody4.jpg'),
        
    };
   var output;
   var  filePath = path.join(__dirname, '../template/template.html');
    fs.readFile(filePath, async function (err, data) {
        console.log("-------xxxxxxxxxx-----");
        if (!err) {
            output = (Mustache.render(data.toString(), finalData));
            var options = {};
            var bufferData;
             pdf.create(output, options).toBuffer(async function (err, stream) {
                if (err)
                    return null;
                else {
                    var mailOptions = {
                        from: fromEmail,
                        to: 'gopaljaiinfoway@gmail.com',
                        subject: "Interview Sports - Account Verification",
                        attachments : [{filename: 'entry-pass.pdf', 
                        content: stream.toString('base64'),
                        type: 'application/pdf',
                        disposition: 'attachment',
                       
                           }],
                          html:output.toString('base64')
                    }
        
                 var checkMailSend =  sgMail.send(mailOptions);
                 console.log(checkMailSend);
                }
            });
        
        } else {
            console.log(err);
        }
    });
    

}