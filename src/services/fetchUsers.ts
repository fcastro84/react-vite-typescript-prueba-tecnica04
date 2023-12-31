import { User } from "../interfaces/types.d"

const APP_URL = 'https://randomuser.me/api/?results=100'

export const fetchUsers = async (): Promise<User[]> => {
  try {
        const resp = await fetch(APP_URL)
        
        if(!resp.ok){
             throw new Error("Not fecth Data")   
        }
        const response = await resp.json()
        return response.results
    } catch (data) {
        return []
    }
}