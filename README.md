# SalesPoint Server

## Project setup
### Install dependencies
```
With Yarn
yarn install

With npm
npm install
```

### Run server
```
node app.js
```
## bugs
```
Inicio de sesion: 
    - borrar la linea de login[].type = ...
Registro: 
    - verificar los campos al momento de corregirlos, ya que cuando sucede un error en el formato de rfc, este marca el error correctamente
            pero al momento de corregirlo el mensaje sigue apareciendo aunque la casilla ya este bien escrita
    - Desactivar caracteres que no sean letras, numeros, puntos o arroba.
Proveedores:
    - cambiar de lugar rfc y persona fisica o moral, para que al momento de verificar el rfc ya se haya seleccionado bien el tipo de persona
    - una vez ingresado el proveedor cambiar la etiqueta de "guardar" en vez de "agregar "
    - Alinear el boton de agregar con el boton de eliminar del otro proveedor
    - Desactivar caracteres que no sean letras, numeros, puntos o arroba.
Ingredientes:
    - Agregar lo que platicamos.
    - no dejar cantidades negativas.
Productos:
    - Desactivar caracteres que no sean letras, numeros, puntos o arroba.
    - La cantidad no acepta decimales.
    - la cantidad de un ingrediente de al menos 1
    - eliminar negativos
    - solo se agrega un ingrediente, si agrego varios solo se queda el primero y si lo modifico, se elimina y ya no puedo poner ingredientes
    - al seleccionar un producto que cambie la etiqueta de agregar a guardar
```


## suggestions
```
General:
    - formularios, agregar un boton que te limpie los campos
    - Avisar si un producto ya no tiene ingrediente en inventario porque en ese caso marcaria numeros negativos
Inicio:
    - Si no hay nada en los menus, mostrar un mensaje como las etiquetas la principo de las opciones de configuracion
Configuracion:
    - Desactivar campos que todavia no pueden ser utilizados por estar ligados a otros.(Si no hya proveedores, no hay ingreidntes; si no hay ingredientes no hay productos.)
Productos:
    - Cuando se eligen los ingredientes si eligo 2 veces pan se ponen 2 etiquetas de pan en vez de sumarse, pero no creo que vaya hacer eso

