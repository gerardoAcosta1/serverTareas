import { Sequelize } from "sequelize"

const db = new Sequelize(
    {
        host: 'localhost',
        username: 'postgres',
        database: 'tareas',
        port: '5432',
        password: 'root',
        dialect: 'postgres'
    }
);

export default db