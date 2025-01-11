export const validarSchema = (schema) => (req, res, next) => {

    try {
        schema.parse(req.body);
        console.log("Schema cachado!\nFinalizando");
        next();
    } catch (error) {
        console.log("Se ecnontró un error!");
        console.log(error);
        return res.status(400).json({
            Error: error.issues.map((error) => 
                
                error.message
                //error.code
            )
        });

    }

};