# Octopus App

Octopus App es un blog, que permite registrarse y generar posteos, los cuales pueden ser vistos y comentados por otros usuarios.

El stack de Octopus App esta compuesto por NodeJs, MongoDB y Express, a continuacion detallo las dependencias usadas:

"bcryptjs": Es una biblioteca optimizada escrita en javascript que permite trabajar con hash bcrypt de forma simple y eficiente. 

"connect-flash": Paquete para Express que permite mostrar mensajes en pantalla bajo ciertas condiciones. En este caso fue usado para los mensajes de comprobacion y de error. 

"dotenv": Para manejar las variables de entorno.

"express-handlebars": Es un sistema de templates que permite generar codigo HTML en base a plantillas de facil mantenimiento.

"express-session": Utilizado para configurar las sesiones.

"method-override": Middleware que permite usar verbos HTTP como PUT y DELETE con clientes que no lo admiten.

"mongoose": Para conectar con la base de datos MongoDB, permite definir el esquema donde se indica la configuración de los documentos para una colección de MongoDB.

"passport": Es un middleware de autenticación para NodeJs utilizado para la administración de sesiones.

"passport-local": Es la estrategia "local" (localStrategy) utilizada por "passport" para la autenticacion de usuarios.




## Clonar el repositorio para correr Octopus App de manera local 

1- Abre la Git Bash

2-Cambia el directorio de trabajo actual a la ubicación en donde quieres clonar el directorio.

3- Una vez adentro del directorio de trabajo, ejecutar el siguiente comando:

```bash
git clone https://github.com/emicancinos/octopus.git
```

## Levantar Octopus app con Docker

### Para esto sera necesario crear una red virtual:

1- Abrir Simbolo de sistema o CMD.

2- Cambiar el directorio de trabajo actual a la ubicacion de la carpea que contiene la aplicacion.

3- Ejecutar el siguiente comando para crear la red virtual, que se llamara en este caso 'blog-environment': 

```bash
docker network create blog-environment
```

4- Una vez creada la red virtual, se debe crear el Docker de mongo para adjuntarlo a dicha red virtual:

```bash
docker create --name mongodb --network blog-environment --publish 27017:27017 mongo
```

5- Luego se debe crear el Container de Octopus App, que en este caso se va a llamar 'blog': 

```bash
docker build -t blog . --publish 27017:27017 mongo
```

6- Y por ultimo añadirlo a la red virtual ya creada:

```bash
docker run -it -p 3000:3000 --network blog-environment blog
```

