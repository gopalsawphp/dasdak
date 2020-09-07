import { createClient } from '../helper';
import { errorTypeEnum } from '../config/common';
// Make new logs entry if error occured
var addErrorLog = async function (error) {
  try {
    var client = await createClient();
    client.connect();
     //Insert error information
    var sql = 'INSERT INTO t_error_logs(error_type_id, error_title, error_detail, error_date) VALUES($1, $2, $3, $4) RETURNING *';
    var params = [
      errorTypeEnum.Error,
      error.message,
      error.stack,
      new Date()
    ];
    await client.query(sql, params);
    await client.end();
    return true;
  } catch (err) {
    await client.end();
    return false;
  }
}
exports.addErrorLog = addErrorLog;
