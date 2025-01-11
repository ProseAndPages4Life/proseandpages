DROP DATABASE prosenpages;
CREATE DATABASE prosenpages;
USE prosenpages;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(13) NOT NULL,
    Nombre VARCHAR(50), 
    Apellido VARCHAR(50),
    Nacim DATE,
    Creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    -- Direccion VARCHAR(200),
    -- login INT, -- Login
    -- direccion1 INT,-- Direccion id 1
    -- direccion2 int,-- Direccion id 2 
    -- tarjeta1 int,-- Tarjeta
    -- tarjeta2 int,-- Tarjeta
    CONSTRAINT Tipo CHECK (Tipo IN ('Cliente', 'Administrador', 'Inventario'))
);

CREATE TABLE Login (
	id INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(50) UNIQUE,
    Contraseña VARCHAR(100),
    Actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UltimoLogin TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Direccion (
	Id INT AUTO_INCREMENT PRIMARY KEY,
    Usuario_id INT,-- Un usuario puede tener varias direcciones --id 2
	Calle VARCHAR(20) NOT NULL,
    Numero INT NOT NULL,
    Colonia VARCHAR(30) NOT NULL,
    Estado VARCHAR(30) NOT NULL,
    CP INT NOT NULL,
    Refer VARCHAR(200)
);  -- ID 1,  Manzanas 32, Usuario: 2
    -- ID 2,Pascales 43, Usuario: 2

CREATE TABLE Tarjeta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT, -- ID del usuario al que le pertenece esta tarjeta. Un usuario puede tener varias tarjetas
    Name VARCHAR(50),
    Num VARCHAR(50),
    Venc VARCHAR(50)
    CVV VARCHAR(3),
    CONSTRAINT fkarjeta FOREIGN KEY (Usuario_id) REFERENCES Usuarios(id)
);
-- Titulo, Autor, Formato, Editorial, Año, Idioma, NumPag, Encudernacion, ISBN, Categoria, Precio, Portada, Stock
CREATE TABLE Libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(50) NOT NULL,
    Autor VARCHAR(50) NOT NULL,
    Formato VARCHAR(7) NOT NULL,
    Editorial VARCHAR(50) NOT NULL,
    Año INT NOT NULL,
    Idioma VARCHAR(10) NOT NULL,
    NumPag INT NOT NULL,
    Encudernacion VARCHAR(11) NOT NULL,
    ISBN VARCHAR(13) NOT NULL,
    Categoria VARCHAR(16) NOT NULL,
    Precio INT NOT NULL,
    Portada VARCHAR(50) NOT NULL,
    Stock TINYINT NOT NULL,
    CONSTRAINT Formato CHECK (Formato IN ('Físico', 'Digital')),
    CONSTRAINT Encudernacion CHECK (Encudernacion IN ('Tapa blanda', 'Tapa dura', 'No aplica')),
    CONSTRAINT Categoria CHECK (Categoria IN ('Fantasía', 'Ciencia Ficción', 'Romance', 'Suspenso', 'Poesía', 'Infantiles'))
);

CREATE TABLE Compras (
	Id int auto_increment primary key,
     numCompra VARCHAR(12),
    fecha TIMESTAMP default now(),--
    usuario int,-- Usuario
    libro int,-- Libro
    cantidad int,
    direccion int,-- Direccion
	tarjeta int-- Tarjeta
);

CREATE TABLE Carrito (
	Id int auto_increment primary key,
    libro_id int,
    cantidad int,
    usuario int,-- Usuario
    fecha TIMESTAMP default now()--
);

SELECT * FROM Usuarios;
SELECT * FROM Login;
SELECT * FROM Direccion;
SELECT * FROM Tarjeta;
SELECT * FROM Libros;
SELECT * FROM Compras;

INSERT INTO Libros (id, Titulo, Autor, Formato, Editorial, Año, Idioma, NumPag, Encudernacion, ISBN, Categoria, Precio, Portada, Stock) VALUES
(1, 'El señor de los anillos', 'J.R.R. Tolkien', 'Físico', 'Allen & Unwin', 1954, 'Inglés', 1178, 'Tapa blanda', '9780544003415', 'Fantasía', 350, './src/img/portadas/img1.png', 20);