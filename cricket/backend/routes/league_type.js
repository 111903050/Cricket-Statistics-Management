const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createConnection(config.mysql);

router.get("/", (req, res) => {
    var query = "SELECT * from League_Type";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).send(result);
    });
});

router.post("/", (req, res) => {
    const { league_format, league_name, league_logo_link } = req.body;
    var query = `INSERT INTO League_Type (league_format, league_name, league_logo_link) VALUES ("${league_format}", "${league_name}", "${league_logo_link}")`;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).send(result);
    });
});

module.exports = router;