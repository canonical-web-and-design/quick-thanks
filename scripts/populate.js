import fetch from 'node-fetch'

/**
 * 
 * @param {string} url launchpad api url
 * @returns list of webteam members
 */
const getWebTeamMembers = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    return data.entries.map(member => {
        return {
            launchpadName: member.name,
            fullName: member.display_name,
        }
    })
}

/**
 * Populate database (todo)
 */
async function init() {
    const LAUNCHPAD_URL = 'https://api.launchpad.net/1.0/~canonical-webmonkeys/members'
    
    const members = await getWebTeamMembers(LAUNCHPAD_URL)    

    console.log(members)
}

init()
