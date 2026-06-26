-- 1:1
CREATE TABLE usuarios(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50)
);

CREATE TABLE perfiles(
  id SERIAL PRIMARY KEY,
  biografia TEXT,
  usuario_id INT UNIQUE, -- Esto garantiza que es 1:1
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


-- 1:N
CREATE TABLE clientes(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50)
);

CREATE TABLE pedidos(
  id SERIAL PRIMARY KEY,
  producto VARCHAR(100),
  cliente_id INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- N:N
CREATE TABLE estudiante(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50)
);

CREATE TABLE cursos(
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100)
);

CREATE TABLE inscripciones(
  estudiante_id INT,
  curso_id INT, 
  PRIMARY KEY (estudiante_id, curso_id),
  FOREIGN KEY (estudiante_id) REFERENCES estudiante(id),
  FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

INSERT INTO usuarios (nombre) VALUES 
('Ana Gómez'),
('Carlos Pérez'),
('María López'),
('Juan Martínez'),
('Sofía Rodríguez');

INSERT INTO perfiles (biografia, usuario_id) VALUES 
('Desarrolladora backend amante del café.', 1),
('Fotógrafo de paisajes y editor de video.', 2),
('Estudiante de ciencia de datos y apasionada del tenis.', 3),
('Chef profesional especializado en comida italiana.', 4),
('Diseñadora UI/UX enfocada en accesibilidad web.', 5);