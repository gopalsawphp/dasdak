const pg = require("pg");

var createClient = async function () {
    var connectionString = "postgres://postgres:admin@localhost:5432/sports";
    return new pg.Client(connectionString);
}

exports.createClient = createClient;
