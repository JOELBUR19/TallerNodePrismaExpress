import prisma from "../prismaClient.js";

// No se crean los usuarios aqui dado que se crean desde el register

export const getAllUsers = async (req, res) => { // Buscar todos los usuarios existentes en la base de datos
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const updateUser = async (req, res) => { // Actualizar usuario existente
  const { id } = req.params;
  const { name, email, password } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      name,
      email,
      password,
    },
  });

  res.status(200).json(updatedUser);
};

export const deleteUser = async (req, res) => { // Eliminar un usuario
  const { id } = req.params;

  await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.status(204).send();
};