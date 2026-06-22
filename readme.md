# Bootcamp de Javascript

Este es un repositorio donde se almacenarán mis proyectos realizados dentro de este Bootcamp

# Lenguajes
- HTML
- JavaScript

***
***
# Comandos básicos de Git

## *git --version*
Consulta y muestra la versión instalada de Git en el sistema.
### Ejemplo de uso

```bash
> git --version
git version 2.54.0.windows.1
```
***
## *git init*
Inicializa un repositorio de Git nuevo en el directorio actual.
### Ejemplo de uso

```bash
> git init
Initialized empty Git repository in C:/Users/<usuario>/<Directorio>/ .git/
```
***
## *git add*
Le indica a Git qué archivos se quieren incluir en la próxima versión.
### Ejemplo de uso

```bash
> git add hola.txt
```
***
## *git commit*
Guarda de forma permanente en el historial del proyecto los archivos que han sido preparados en *__git add__*. Se requiere un mensaje descriptivo sobre los cambios.
### Ejemplo de uso

```bash
> git commit -m "Se corrigió el color del background en el footer"
[master (root-commit) 382806c] Se corrigió el color del background en el footer
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 hola.txt
```
***
## *git status*
Muestra el estado actual de los archivos, revisa cuáles fueron modificados, cuáles se encuentran listos para ser guardados y cuáles son completamente nuevos.
### Ejemplo de uso

```bash
> git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be comiitted)
        adios.txt
```