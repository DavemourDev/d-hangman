export default (request, response) => {
    
    // TODO: Reemplazar por llamada a base de datos

    /**
     * REGLAS DE LAS PALABRAS:
     * - Esta lista es para palabras en castellano. Para usar otros idiomas, crear otro endpoint.
     * - Una palabra es un objeto con 4 propiedades:
     *      - word: Palabra en sí
     *      - definitions: lista de definiciones de la palabra.
     *      - synonims: lista de posibles sinónimos de la palabra.
     *      - antonyms: lista de posibles antónimos de la palabra.
     * 
     * - Es obligatorio que todas las palabras tengan al menos una definición.
     * - No es necesario que una palabra tenga sinónimos y/o antónimos. Sin embargo, deben ser una lista aunque sea vacía.
     * - Se recomienda que la palabra no sea contenida en su definición ni en sus sinónimos/antónimos.
     */
    response.status(200).json({
        words: [ ]
    });
};