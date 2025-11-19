import prisma from "../prismaClient";


export const createTask = async (req, res) => {
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

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

export const updateTasks = async (req, res) => {
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

export const deleteTasks = async(req,res) => {
    const {id} = req.params;
    await prisma.user.delete({
        where: {
            id: parseInt(id),
        }
    })
    res.status(204).send();
}
