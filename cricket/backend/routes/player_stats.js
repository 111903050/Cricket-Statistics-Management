const router = require("express").Router();
const mysql = require("mysql");
const config = require("../config");

const db = mysql.createPool(config.mysql);

router.post("/", async (req, res) => {
    try {
        const {
            player_id,
            league_id,
            matches_played,
            runs_scored,
            hundreds,
            fifties,
            high_score,
            not_outs,
            strike_rate,
            overs,
            wickets,
            economy,
            best_bowling,
            catches,
            run_outs,
            ducks,
            outs,
        } = req.body;

        var query = `INSERT INTO Player_Stats VALUES (${player_id}, ${league_id}, ${matches_played}, ${runs_scored}, \
            ${hundreds}, ${fifties}, ${high_score}, ${not_outs}, ${strike_rate}, ${overs}, ${wickets}, ${economy},
            "${best_bowling}", ${catches}, ${run_outs}, ${ducks}, ${outs}
            );`;

        await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send("Player Stats Added");
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const player_id = req.query.player_id;
        const league_id = req.query.league_id
        var main = await new Promise((resolve, reject) => {
            var query = `SELECT * FROM Player_Stats WHERE player_id = ${player_id} and league_id = ${league_id}`;
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        res.status(200).send(main);
    } catch (err) {
        res.status(400).send(err.message);
    }
});


module.exports = router;
