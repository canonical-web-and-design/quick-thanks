const axios = require('axios')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const getWebTeamMembers = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data.entries.map(member => {
      return {
          launchpadName: member.name,
          fullName: member.display_name,
      }
    })
  } catch(err) {
    console.error(err)
  }
}

async function main() {
  const LAUNCHPAD_API_URL = "https://api.launchpad.net/1.0/~canonical-webmonkeys/members"
  const teamMembers = await getWebTeamMembers(LAUNCHPAD_API_URL)
  await prisma.user.createMany({
    data: teamMembers,
  });
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })