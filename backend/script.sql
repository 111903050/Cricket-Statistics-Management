DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS League;
DROP TABLE IF EXISTS Teams;

CREATE TABLE Players
(
    player_id int PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    age int,
    career_start DATE,
    player_role varchar(255),
    image_link varchar(255)
);


CREATE TABLE Teams
(
    team_id int PRIMARY KEY AUTO_INCREMENT,
    team_name varchar(255) NOT NULL,
    logo_link varchar(255)
);


CREATE TABLE League
(
    league_id INT PRIMARY KEY AUTO_INCREMENT,
    league_type_id INT,
    startdate DATE,
    enddate DATE,
    duration DOUBLE,
    number_of_teams INT,
    country varchar(255),
    season INT,
    winner INT,
    FOREIGN KEY (league_type_id) REFERENCES League_Type(league_type_id) ON DELETE CASCADE,
    FOREIGN KEY (winner) REFERENCES Teams(team_id)
);
