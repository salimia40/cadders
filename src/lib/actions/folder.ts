"use server"

import { uploadFile } from "../storage"
import { prisma } from '../db'
import { redirect } from "next/navigation"
import { getCurrentUserId } from "../getCurrentUser"
import { revalidatePath } from "next/cache"

type Result = {
    success: boolean,
    message: string,
    error?: string | undefined,
    id?: string | undefined,
    continue?: boolean

}

export const createFolder = async (prevState: Result | undefined, data: {
    title: string,
    description: string,
}) => {

    const userId = await getCurrentUserId()
    if (!userId) return {
        success: false,
        message: "error",
        error: "not logged in",

    }

    const folder = await prisma.folder.create({
        data: {
            userId,
            title: data.title,
            description: data.description
        }
    })

    const folderId = folder.id

    return {
        success: true,
        message: "folder created",
        id: folderId,
    }
}

export const addFile = async (prevState: Result | undefined, formData: FormData) => {
    const userId = await getCurrentUserId()
    if (!userId) return {
        success: false,
        message: "error",
        error: "not logged in",
    }
    const bucketName = `user-${userId}`
    const folderId = formData.get("folderId") as string
    const cadFile = formData.get("cadFile") as File
    const imageFile = formData.get("imageFile") as File


    uploadFile(
        `/${bucketName}/${folderId}/${cadFile.name}`,
        Buffer.from(await cadFile.arrayBuffer()),
        'application/acad',
    )


    uploadFile(
        `/${bucketName}/${folderId}/${imageFile.name}`,
        Buffer.from(await imageFile.arrayBuffer()),
        'image/jpeg',
    )

    await prisma.file.create({
        data: {
            folderId,
            fileName: formData.get("name") as string,
            intialDwgFile: `/${bucketName}/${folderId}/${cadFile.name}`,
            intialJpgFile: `/${bucketName}/${folderId}/${imageFile.name}`,
        }
    })

    revalidatePath(`/panel/folders/${folderId}`)
    return {
        success: true,
        message: "file added",
        continue: formData.get('continue') === 'true'
    }
}

export const submitFile = async ({ folderId }: {
    folderId: string
}) => {

    await prisma.folder.update({
        where: { id: folderId },
        data: { isFinalize: true }
    })

    revalidatePath(`/panel/folders/${folderId}`)
    return ({
        success: true,
        message: "Folder submitted"
    })
}

export const editFile = async (formData: FormData) => {

    const userId = await getCurrentUserId()
    if (!userId) return {
        success: false,
        message: "error",
        error: "not logged in",
    }
    const bucketName = `user-${userId}`
    const folderId = formData.get("folderId") as string
    const cadFile = formData.get("cadFile") as File
    const imageFile = formData.get("imageFile") as File

    uploadFile(
        `/${bucketName}/${folderId}/${cadFile.name}`,
        Buffer.from(await cadFile.arrayBuffer()),
        'application/acad',
    )
    uploadFile(
        `/${bucketName}/${folderId}/${imageFile.name}`,
        Buffer.from(await imageFile.arrayBuffer()),
        'image/jpeg',
    )

    await prisma.file.update({
        where: {
            id:
                formData.get("fileId") as string
        },
        data: {
            finalDwgFile: `/${bucketName}/${folderId}/${cadFile.name}`,
            finalJpgFile: `/${bucketName}/${folderId}/${imageFile.name}`,
        }
    })

    revalidatePath(`/panel/folders/${folderId}`)
    return ({
        success: true,
        message: "Folder submitted"
    })
}

export const assignToMe = async ({ folderId }: {
    folderId: string
}) => {
    const userId = await getCurrentUserId()

    await prisma.folder.update({
        where: { id: folderId },
        data: { assigneeId: userId }
    })

    revalidatePath(`/panel/folders/${folderId}`)
    revalidatePath(`/dashboard/assignedfolders`)
    revalidatePath(`/dashboard/freefolders`)
    return ({
        success: true,
        message: "Folder assigned"
    })
}

export const doneProject = async ({
    folderId, fee
}: {
    folderId: string, fee: number
}) => {
    await prisma.folder.update({
        where: { id: folderId },
        data: { isClosed: true, fee }
    })

    revalidatePath(`/panel/folders/${folderId}`)
    revalidatePath(`/dashboard/assignedfolders`)
    return ({
        success: true,
        message: "Project finished"
    })
}

export const payProject = async (formData: FormData) => {
    const folderId = formData.get("folderId") as string
    await prisma.folder.update({
        where: { id: folderId },
        data: {
            paid: true
        }
    })

    revalidatePath(`/panel/folders/${folderId}`)
    redirect(`/panel/folders/${folderId}`)
}

export const deleteFile = async ({
    fileId, folderId
}: {
    fileId: string,
    folderId: string
}
) => {
    await prisma.file.delete({
        where: { id: fileId }
    })

    revalidatePath(`/panel/folders/${folderId}`)
    return redirect(`/panel/folders/${folderId}`)
}

export const deleteFolder = async ({
    folderId
}: {
    folderId: string
}) => {

    // delete files
    await prisma.file.deleteMany({
        where: { folderId }
    })

    await prisma.folder.delete({
        where: { id: folderId }
    })

    revalidatePath('/panel/folders')
    redirect(`/panel/folders`)
}