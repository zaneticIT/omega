CREATE DATABASE omega;

USE omega;

CREATE TABLE kupoprodajni_ugovori (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kupac VARCHAR(255) NOT NULL,
    broj_ugovora VARCHAR(50) NOT NULL,
    datum_akonotacije DATE,
    rok_isporuke DATE,
    status VARCHAR(50)
);

CREATE TABLE artikli (
    id INT PRIMARY KEY AUTO_INCREMENT,
    naziv VARCHAR(255) NOT NULL,
    dobavljac VARCHAR(255) NOT NULL,
    status VARCHAR(50)
);

INSERT INTO kupoprodajni_ugovori (kupac, broj_ugovora, datum_akonotacije, rok_isporuke, status)
VALUES
    ('Petra Kranjčar', '1/2024', '2024-01-04', '2024-04-20', 'KREIRANO'),
    ('Franko Kasun', '2/2024', '2024-03-01', '2024-05-01', 'ISPORUČENO'),
    ('Stjepan Babić', '3/2024', '2024-03-03', '2024-04-15', 'NARUČENO'),
    ('Tia Janković', '4/2024', '2024-03-14', '2024-08-13', 'KREIRANO');

INSERT INTO artikli (naziv, dobavljač, status)
VALUES
    ('Perilica posuđa ugradbena Electrolux EEA27200L', 'Sancta Domenica', 'KREIRANO'),
    ('Napa ugradbena Gorenje TH60E3X', 'Sancta Domenica', 'NARUČENO'),
    ('Ploča ugradbena kombinirana Gorenje GCE691BSC', 'Bijela tehnika', 'ISPORUČENO');
