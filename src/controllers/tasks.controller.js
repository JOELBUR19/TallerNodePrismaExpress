import prisma from "../prismaClient.js";

export const createTask = async (req, res) => { // Creación de tarea nueva
  try {
    const { title, description, state, userId } = req.body;

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        state,
        userId,
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear una tarea" });
  }
};

export const getAllTasks = async (req, res) => { // Buscar todas las tareas existentes en la base de datos
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

export const updateTasks = async (req, res) => { // Actualizar tarea especifica
  const { id } = req.params;
  const { title, description, state, userId } = req.body;
  const updateTasks = await prisma.task.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      state,
      userId,
    },
  });
  res.status(200).json(updateTasks)
};

export const deleteTasks = async(req,res) => { // Eliminar una tarea existente 
    const {id} = req.params;
    await prisma.user.delete({
        where: {
            id: parseInt(id),
        }
    })
    res.status(204).send();
}
