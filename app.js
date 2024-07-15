function Buscar() {
    let Busqueda = document.getElementById("Busqueda").value;
    if (Busqueda) {
        Busqueda = Busqueda.charAt(0).toUpperCase() + Busqueda.slice(1);
    }
    document.getElementById('Busquedas').textContent = Busqueda;
    fetch('https://api.mercadolibre.com/sites/MLA/search?q=' + Busqueda)
        .then(res => res.json())
        .then(res => {
            console.log(res.results);
            const resultadoContainer = document.getElementById('Resultado');
            const cantidadResultados = document.getElementById('cantidadResultados');

            resultadoContainer.innerHTML = ''; // Limpiar resultados anteriores

            // Mostrar la cantidad de productos encontrados
            cantidadResultados.textContent = `${res.results.length} resultados`;

            res.results.forEach(item => {
                const itemLink = document.createElement('a');
                itemLink.href = item.permalink;
                itemLink.target = '_blank';
                itemLink.className = 'result-item-link';
            
                const itemDiv = document.createElement('div');
                itemDiv.className = 'result-item';
            
                // Crear y agregar contenido al contenedor del resultado
                const title = document.createElement('h3');
                title.textContent = item.title;
                itemDiv.appendChild(title);
            
                const image = document.createElement('img');
                image.src = item.thumbnail;
                itemDiv.appendChild(image);
            
                const price = document.createElement('p');
                price.textContent = `Precio: $${item.price}`;
                itemDiv.appendChild(price);

                const quantity = document.createElement('p');
                quantity.textContent = `Cantidad disponible: ${item.available_quantity}`;
                itemDiv.appendChild(quantity);
                              
                // Agregar el contenedor del resultado al enlace
                itemLink.appendChild(itemDiv);
            
                // Agregar el enlace al contenedor principal
                resultadoContainer.appendChild(itemLink);
            });
        })
        .catch(err => console.error(err));
}
