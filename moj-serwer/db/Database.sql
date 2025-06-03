-- Tworzenie bazy danych
CREATE DATABASE IF NOT EXISTS Test_DB;
USE Test_DB;

-- Tworzenie tabeli klientów
CREATE TABLE IF NOT EXISTS Client_Table (
  ID_Client INT AUTO_INCREMENT PRIMARY KEY,
  Imie VARCHAR(50) NOT NULL,
  Nazwisko VARCHAR(50) NOT NULL,
  Adres VARCHAR(100),
  Numer_Telefonu VARCHAR(15)
);

-- Tworzenie tabeli zamówień
CREATE TABLE IF NOT EXISTS Orders_Table (
  ID_Order INT AUTO_INCREMENT PRIMARY KEY,
  ID_Client INT NOT NULL,
  Nazwa_uslugi VARCHAR(100) NOT NULL,
  Data_zamowienia DATE NOT NULL,
  Termin_Do_wykonania DATE,
  Status_Zam VARCHAR(100) NOT NULL,
  FOREIGN KEY (ID_Client) REFERENCES Client_Table(ID_Client)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Wstawianie przykładowych klientów
INSERT INTO Client_Table (Imie, Nazwisko, Adres, Numer_Telefonu) VALUES
('Anna', 'Nowak', 'Warszawa, ul. Kwiatowa 1', '500123456'),
('Jan', 'Kowalski', 'Kraków, ul. Leśna 7', '501234567'),
('Maria', 'Wiśniewska', 'Łódź, ul. Polna 3', '502345678'),
('Piotr', 'Wójcik', 'Wrocław, ul. Główna 10', '503456789'),
('Karolina', 'Kamińska', 'Poznań, ul. Zielona 5', '504567890'),
('Marek', 'Zieliński', 'Gdańsk, ul. Morska 2', '505678901'),
('Ewa', 'Dąbrowska', 'Lublin, ul. Słoneczna 6', '506789012'),
('Tomasz', 'Lewandowski', 'Szczecin, ul. Spacerowa 8', '507890123'),
('Joanna', 'Szymańska', 'Bydgoszcz, ul. Różana 4', '508901234'),
('Paweł', 'Kozłowski', 'Katowice, ul. Wiosenna 9', '509012345');

-- Wstawianie przykładowych zamówień
INSERT INTO Orders_Table (ID_Client, Nazwa_uslugi, Data_zamowienia, Termin_Do_wykonania, Status_Zam) VALUES
(1, 'Naprawa laptopa', '2025-05-20', '2025-05-21', 'Zrealizowane'),
(1, 'Instalacja systemu', '2025-05-25', NULL,'W toku'),
(2, 'Czyszczenie komputera', '2025-05-19', '2025-05-19','Zrealizowane'),
(3, 'Wymiana dysku SSD', '2025-05-22', '2025-05-23','Zrealizowane'),
(4, 'Konfiguracja sieci Wi-Fi', '2025-05-21', '2025-05-21','Zrealizowane'),
(5, 'Diagnoza usterek', '2025-05-18', '2025-05-19','Zrealizowane'),
(6, 'Odzyskiwanie danych', '2025-05-17', NULL,'W toku'),
(7, 'Montaż komputera', '2025-05-20', '2025-05-22','Zrealizowane'),
(8, 'Aktualizacja BIOS', '2025-05-23', '2025-05-23','Zrealizowane'),
(9, 'Naprawa zasilacza', '2025-05-24', NULL,'W toku'),
(10, 'Instalacja drukarki', '2025-05-25', NULL,'W toku'),
(3, 'Czyszczenie układu chłodzenia', '2025-05-22', '2025-05-22','Zrealizowane');