import { createConnection, Connection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => { 
    const defaultOptions = await getConnectionOptions() // captura todas informaçoes do ormconfig
    
    return createConnection(
        // pega o objeto e consigo mudar uma variavel daquela opcoes importadas pela variavel ambiente
        Object.assign(defaultOptions, { 
            database: process.env.NODE_ENV === 'test' ? './src/database/database.test.sqlite' : defaultOptions.database
         })
    );
}