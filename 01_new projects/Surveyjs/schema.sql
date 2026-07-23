-- schema.sql
-- Run this in your MySQL client (phpMyAdmin, CLI, etc.) to create the
-- table that the survey form writes to.

CREATE TABLE IF NOT EXISTS survey_responses (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    first_name     VARCHAR(100)  NOT NULL,
    last_name      VARCHAR(100)  NOT NULL,
    email          VARCHAR(255)  NOT NULL,
    phone          VARCHAR(30)   DEFAULT '',
    contact_method VARCHAR(30)   NOT NULL,
    department     VARCHAR(100)  DEFAULT '',
    newsletter     TINYINT(1)    DEFAULT 0,
    satisfaction   VARCHAR(5)    DEFAULT '',
    comments       TEXT          DEFAULT '',
    submitted_at   DATETIME      DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
