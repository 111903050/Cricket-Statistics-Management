const router = require("express").Router();
const mysql = require("mysql");
const db = require("../config");

// Get All Matches
router.get("/all", async (req, res) => {
    try {
        var query = "SELECT * FROM Matches;";
        var main = await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        main = await Promise.all(
            main.map(async (item) => {
                var { team1, team2, won_by } = item;
                team1 = await findTeamDetails(team1);
                team2 = await findTeamDetails(team2);
                won_by = await findTeamDetails(won_by);
                return {
                    ...item,
                    team1,
                    team2,
                    won_by,
                };
            })
        );
        res.status(200).send(main);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get league matches
router.get("/:league_id", async (req, res) => {
    try {
        var league_id = req.params.league_id;
        var query = `SELECT * from Matches WHERE league_id = ${league_id} ORDER BY match_date`;
        var main = await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        main = await Promise.all(
            main.map(async (item) => {
                var { team1, team2, won_by } = item;
                team1 = await findTeamDetails(team1);
                team2 = await findTeamDetails(team2);
                won_by = await findTeamDetails(won_by);
                return {
                    ...item,
                    team1,
                    team2,
                    won_by,
                };
            })
        );
        res.status(200).send(main);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get recent 5 matches
router.get("/", async (req, res) => {
    try {
        var query = "SELECT * from Matches ORDER BY match_date DESC LIMIT 5;";
        var main = await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        main = await Promise.all(
            main.map(async (item) => {
                var { team1, team2, won_by } = item;
                team1 = await findTeamDetails(team1);
                team2 = await findTeamDetails(team2);
                won_by = await findTeamDetails(won_by);
                return {
                    ...item,
                    team1,
                    team2,
                    won_by,
                };
            })
        );
        res.status(200).send(main);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

const findTeamDetails = (id) => {
    return new Promise((resolve, reject) => {
        var query = `SELECT * from Teams WHERE team_id = ${id}`;
        db.query(query, (err, result) => {
            if (err) {
                reject(res);
            }
            resolve(result);
        });
    });
};

// Insert new match
router.post("/", async (req, res) => {
    try {
        const {
            league_id,
            match_number,
            match_date,
            team1,
            team2,
            won_by,
        } = req.body;
        var query = `INSERT INTO Matches (league_id, match_number, match_date, team1, team2, won_by) VALUES \
        (${league_id}, ${match_number}, "${match_date}", ${team1}, ${team2}, ${won_by});
        `;
        await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    console.log(err.message);
                    reject(err.message);
                }
                resolve(result);
            });
        });
        res.status(200).send("Match added");
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/multiple", async (req, res) => {
    try {
        const { data } = req.body;
        var main = await Promise.all(
            data.map(async (item) => {
                const {
                    league_id,
                    match_number,
                    match_date,
                    team1,
                    team2,
                    won_by,
                } = item;
                var query = `INSERT INTO Matches (league_id, match_number, match_date, team1, team2, won_by) VALUES \
                (${league_id}, ${match_number}, "${match_date}", ${team1}, ${team2}, ${won_by});
                `;
                await new Promise((resolve, reject) => {
                    db.query(query, (err, result) => {
                        if (err) {
                            console.log(err.message);
                            reject(err.message);
                        }
                        resolve(result);
                    });
                });
            })
        );
        res.status(200).send("Multiple matches added");
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
