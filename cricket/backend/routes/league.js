const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createConnection(config.mysql);

router.get("/", (req, res) => {
    var query =
        "SELECT League.league_id as league_id, League.season as season, League_Type.league_name as league_name from League join League_Type on League.league_type_id=League_Type.league_type_id;";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).send(result);
    });
});

router.post("/", (req, res) => {
    const {
        league_type_id,
        startdate,
        enddate,
        number_of_teams,
        country,
        season,
        winner,
    } = req.body;
    
    //milliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    const duration = Math.round(
        Math.abs((new Date(startdate) - new Date(enddate)) / oneDay)
    );
    var query = `INSERT INTO League (league_type_id, startdate, enddate, duration, number_of_teams, country, season, winner) \
    VALUES (${league_type_id}, "${startdate}", "${enddate}", ${duration}, ${number_of_teams}, "${country}", ${season}, ${winner})`;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).send(result);
    });
});

module.exports = router;