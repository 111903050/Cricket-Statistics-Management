const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.get("/", (req, res) => {
    var query = "SELECT * from Teams";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(400).send("Failed to fetch teams");
        }
        return res.status(200).send(result);
    });
});

router.post("/", async (req, res) => {
    try {
        const { team_name, logo_link } = req.body;
        var query = `INSERT INTO Teams (team_name, logo_link) VALUES ("${team_name}", "${logo_link}")`;
        var main = await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send("Team added !");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;