DROP DATABASE omega;

CREATE DATABASE omega;

USE omega;

CREATE TABLE kupoprodajni_ugovori (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kupac VARCHAR(255) NOT NULL,
    broj_ugovora VARCHAR(6) NOT NULL,
    datum_akonotacije DATE  NOT NULL,
    rok_isporuke DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT "KREIRANO"
);

CREATE TABLE artikli (
    id INT PRIMARY KEY auto_increment,
    ugovor_id INT NOT NULL,
    naziv VARCHAR(255) NOT NULL,
    dobavljac VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT "KREIRANO",
    FOREIGN KEY (ugovor_id) REFERENCES kupoprodajni_ugovori(id) ON DELETE CASCADE
);

INSERT INTO kupoprodajni_ugovori (kupac, broj_ugovora, datum_akonotacije, rok_isporuke, status)
VALUES
    ('Petra Kranjčar', '1/2024', '2024-01-04', '2024-04-20', 'KREIRANO');
    /*('Franko Kasun', '2/2024', '2024-03-01', '2024-05-01', 'ISPORUČENO'),
    ('Stjepan Babić', '3/2024', '2024-03-03', '2024-04-15', 'NARUČENO'),
    ('Tia Janković', '4/2024', '2024-03-14', '2024-08-13', 'KREIRANO');*/

INSERT INTO artikli (ugovor_id, naziv, dobavljac, status)
VALUES
    (last_insert_id(), 'Perilica posuđa ugradbena Electrolux EEA27200L', 'Sancta Domenica', 'KREIRANO'),
    (last_insert_id(), 'Napa ugradbena Gorenje TH60E3X', 'Sancta Domenica', 'NARUČENO'),
    (last_insert_id(), 'Ploča ugradbena kombinirana Gorenje GCE691BSC', 'Bijela tehnika', 'ISPORUČENO');

START TRANSACTION;

INSERT INTO kupoprodajni_ugovori (kupac, broj_ugovora, datum_akonotacije, rok_isporuke, status)
VALUES
    ('Petra Kranjčar', '1/2024', '2024-01-04', '2024-04-20', 'KREIRANO');

INSERT INTO artikli (ugovor_id, naziv, dobavljac, status)
VALUES
    (last_insert_id(), 'Perilica posuđa ugradbena Electrolux EEA27200L', 'Sancta Domenica', 'KREIRANO');

COMMIT;



select * from kupoprodajni_ugovori;
select * from artikli where ugovor_id = 1;
/*
DELETE FROM kupoprodajni_ugovori WHERE id = 1;

//TODO - transactions with prepared statements, normalized databases, appropriate tables and tablenames for everything