import prisma from "../../lib/prisma";

async function postRecognition (req, res) {
  if (req.method === "POST") {
    const { body } = req;
    const data = JSON.parse(body);
    const recognition = await prisma.recognition.create({
      data,
    });
    res.json(recognition);
  } else {
    return res.status(405).json({message:'Post Method not allowed'})
  }
}

async function GetUser(){
  const user= await prisma.user.findMany()
  return user
}

async function updateUser(req, res){
  const updatedData = req.body
  if(req.method !== 'PATCH'){
      return res.status(405).json({message:'Method not allowed'})
  }
  const userUpdate = await prisma.user.update({
      where:{
          id:updatedData.id
      },
      data:{
        receivedVillagerPoints : updatedData.receivedVillagerPoints,
        receivedExplorerPoints : updatedData.receivedExplorerPoints,
        remainingVillagerPointsToGive : updatedData.remainingVillagerPointsToGive,
        remainingExplorerPointsToGive : updatedData.remainingExplorerPointsToGive
      }
  })
  res.status(200).json({message: 'User updated successfully.', user: userUpdate })
}

export default function postRecognitionAndUpdateUserPoints() {
}