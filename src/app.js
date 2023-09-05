import express from "express";
import cors from 'cors'
import db from "./utils/dataBase.js";
import todos from "./models/todos.model.js";

const PORT = 3000;

todos;
db.authenticate()
    .then(res => console.log(res))
    .catch(err => console.log(err))
db.sync()
    .then(res => console.log('conected to database'))
    .catch(err => console.log(err))

const app = express();

app.use(cors());

//utilizar json
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Servidor en funcionamiento!');
});

app.get('/todos', async (req, res) => {

    try {

        const tareas = await todos.findAll();

        if (!tareas) {

            res.status(404).json({ message: 'tarea not found' })
        }

        res.json(tareas);

    } catch (err) {
        res.status(201).json(err);
        console.log(err);
    }
})

app.get('/todos/:id', async (req, res) => {

    try {

        const tareaId = req.params.id;

        const tarea = await todos.findByPk(tareaId);

        if (!tarea) {
            return res.status(404).json({ message: 'not found' });
        }
        res.json(tarea);

    } catch (err) {
        res.status(201).json({ err: 'ocurrió un error' });
        console.log(err);
    }

})

app.post('/todos/', async (req, res) => {

    try {
        const { title, description, completed } = req.body

        const newTarea = await todos.create({ title, description, completed });

        res.json({ message: 'tarea agregada' })

    } catch (err) {
        res.status(201).json({ err: 'ocurrió un error' });
        console.log(err);
    }
})

app.put('/todos/:id', async (req, res) => {

    try {

        const tareaId = req.params.id

        const { title, description, completed } = req.body

        const tarea = await todos.findByPk(tareaId)

        if (!tarea) {

            res.status(404).json({ message: 'tarea not found' })
        }

        await todos.update({ title, description, completed }, { where: { id: tareaId } })
        res.json({ message: 'added' });

    } catch (err) {
        res.status(201).json({ err: 'ocurrió un error' });
        console.log(err);
    }
})

app.delete('/todos/:id', async (req, res) => {

    try {
        const tareaId = req.params.id

        const { title, description, completed } = req.body

        const tarea = await todos.findByPk(tareaId)


        if (!tarea) {

            res.status(404).json({ message: 'tarea not found' })
        }

        await tarea.destroy()

        res.json({ message: 'work destroyed' })


    } catch (err) {
        res.status(201).json({ err: 'ocurrió un error' });
        console.log(err);
    }


})

app.listen(PORT, () => {

    console.log(`listen on port ${PORT}`)
})