import { Folder } from "@prisma/client";

export const getFolderStatus = (folder: Folder) => {
    const { isFinalize, isClosed, paid, assigneeId } = folder
    if (!isFinalize) return "Draft"
    if (!assigneeId) return "Submitted"
    if (!isClosed) return "Reviewed"
    if (!paid) return "Pending Paiment"
    return "Finished"
}