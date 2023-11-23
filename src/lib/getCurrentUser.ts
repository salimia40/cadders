"use server"
import { cookies } from "next/headers"
import { prisma } from "./db"

import jwt from 'jsonwebtoken'
import { redirect } from "next/navigation"

const AUTH_SECRET = process.env.AUTH_SECRET as unknown as string

export const getCurrentUserId = async () => {
    const token = await cookies().get("loggedIn")?.value
    if (!token) return undefined
    try {
        const decoded = await jwt.verify(token, AUTH_SECRET) as {
            data: {
                id: string
            }
        }
        return decoded.data.id

    } catch (error) {
        redirect('/login')
    }
}

export const getCurrentUser = async () => {
    const userId = await getCurrentUserId()
    if (!userId) return undefined
    const user = await prisma.user.findUnique({ where: { id: userId } })
    return user
}