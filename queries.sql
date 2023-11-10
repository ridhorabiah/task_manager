CREATE DATABASE task_manager;

USE task_manager;

CREATE TABLE users (
    user_id SMALLINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(30),
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME,
    CONSTRAINT user_pk PRIMARY KEY (user_id)
);

CREATE TABLE tasks (
    task_id SMALLINT UNSIGNED AUTO_INCREMENT,
    user_id SMALLINT UNSIGNED,
    title VARCHAR(30),
    description VARCHAR(255),
    is_done BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME,
    CONSTRAINT task_pk PRIMARY KEY (task_id),
    CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (user_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO users (name, email, password) VALUES
    ("John Doe", "johndoe@example.com", "plain_password"),
    ("Emma Turner", "emmaturner@example.com", "plain_password"),
    ("Daniel Miller", "danielmiller@example.com", "plain_password");

INSERT INTO tasks (user_id, title, description, is_done) VALUES
    (1, "Refactor Code", "Rewrite redundant functions.", 1),
    (1, "Write Documentation", "Create comprehensive API documentation.", 0),
    (2, "UI/UX Enhancement", "Improve user interface design.", 1),
    (3, "Write Tests", "Create unit tests for backend.", 1),
    (3, "Create Login System", "Implement secure user authentication.", 0);
