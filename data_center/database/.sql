BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Shops" (
	"id"	varchar(15),
	"time"	datetime,
	"provider" varchar(12),
	"state"	int,
	"type"	int,
	"price"	varchar(10),
	"iva"	varchar(10),
	"total"	varchar(10),
	"details"	varchar(255),
	"company"	varchar(20),
	PRIMARY KEY("id"),
	FOREIGN KEY("company") REFERENCES "Users",
	FOREIGN KEY("provider") REFERENCES "Providers"
);
CREATE TABLE IF NOT EXISTS "Backups" (
	"key"	TEXT NOT NULL,
	"time"	datetime,
	"company"	varchar(20),
	PRIMARY KEY("key"),
	FOREIGN KEY("company") REFERENCES "Users"
);
CREATE TABLE IF NOT EXISTS "Historial" (
	"key"	varchar(12) NOT NULL,
	"company"	varchar(20) NOT NULL,
	"action"	varchar(35) NOT NULL,
	"responsable"	varchar(45) NOT NULL,
	"details"	varchar(255) NOT NULL,
	"state"	int NOT NULL,
	"time"	datetime NOT NULL,
	PRIMARY KEY("key"),
	FOREIGN KEY("company") REFERENCES "Users"
);
CREATE TABLE IF NOT EXISTS "Providers" (
	"id"	varchar(12),
	"name"	varchar(45),
	"address"	varchar(255),
	"tel"	varchar(10),
	"rfc"	varchar(14),
	"contact"	varchar(35),
	"email"	varchar(35),
	"codepostal"	varchar(5),
	"credits_day"	int,
	"photo"	varchar(255),
	"company"	varchar(35),
	"active"	int,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "Menu" (
	"key"	varchar(15),
	"name"	varchar(25),
	"desc"	varchar(255),
	"price"	varchar(6),
	"ingredients"	varchar(255),
	"company"	varchar(20),
	"category"	int,
	"photo"	varchar(100),
	"active"	int,
	PRIMARY KEY("key"),
	FOREIGN KEY("company") REFERENCES "Users"
);
CREATE TABLE IF NOT EXISTS "Inventory" (
	"company"	varchar(20),
	"ingredient"	varchar(15),
	"amount"	int,
	"active"	int,
	PRIMARY KEY("company","ingredient")
);
CREATE TABLE IF NOT EXISTS "Ingredients" (
	"key"	varchar(15),
	"name"	varchar(20),
	PRIMARY KEY("key")
);
CREATE TABLE IF NOT EXISTS "Employee" (
	"email"	varchar(35),
	"name"	varchar(35),
	"password"	varchar(18),
	"gender"	int,
	"position"	varchar(20),
	"cellphone"	varchar(10),
	"company"	varchar(20),
	"photo"	varchar(100),
	"active"	int,
	PRIMARY KEY("email"),
	FOREIGN KEY("company") REFERENCES "Users"
);
CREATE TABLE IF NOT EXISTS "Users" (
	"company"	varchar(20),
	"username"	varchar(25),
	"password"	varchar(35),
	"cellphone"	varchar(10),
	"gender"	int,
	"company_turn"	varchar(20),
	"email"	varchar(35),
	"rfc"	varchar(13),
	"address"	varchar(50),
	"colony"	varchar(35),
	"postal_code"	varchar(5),
	"active"	int,
	PRIMARY KEY("company")
);
COMMIT;
