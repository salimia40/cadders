'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as storage from '../storage';
import { prisma } from '../db';
import { getCurrentUserId } from '../getCurrentUser';

// my genius is beyond me.
const genrateUniqueId = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const getExtension = (fileName: string) => fileName.split('.').pop();

const generateFileName = (fileName: string) =>
  `${genrateUniqueId()}.${getExtension(fileName)}`;

const generateFileUrl = (folderId: string, fileName: string) =>
  `/${folderId}/${generateFileName(fileName)}`;

export const createFolder = async (data: {
  title: string;
  description: string;
}) => {
  const userId = await getCurrentUserId();
  if (!userId)
    return {
      success: false,
      message: 'error',
      error: 'not logged in',
    };

  const folder = await prisma.folder.create({
    data: {
      userId,
      title: data.title,
      description: data.description,
    },
  });

  const folderId = folder.id;

  revalidatePath(`/panel/folders/${folderId}`);
  revalidatePath(`/panel/folders`);
  revalidatePath(`/dashboard/freefolders`);

  return {
    success: true,
    message: 'پروژه شما با موفقیت ایجاد شد',
    id: folderId,
  };
};

export const updateFolder = async ({
  folderId,
  title,
  description,
  fee,
}: {
  folderId: string;
  title: string;
  description: string;
  fee?: number;
}) => {
  await prisma.folder.update({
    where: { id: folderId },
    data: {
      title,
      description,
      fee,
    },
  });
  revalidatePath(`/panel/myprojects/${folderId}`);
};

// This code snippet defines an asynchronous function named createFileItem. It accepts two parameters: data, an object with properties folderId, title, and description, and formData, an instance of FormData.

// Inside the function, it calls an asynchronous function getCurrentUserId to get the current user's ID. If the user ID is falsy (null, undefined, etc.), it returns an object indicating failure with a message and error.

// Next, it retrieves two files from the formData object: cadFile and imageFile. If either of these files is falsy (null, undefined, etc.), it returns an object indicating failure with a message and error.

// Then, it generates two URLs using the generateFileUrl function based on the folderId and the names of the cadFile and imageFile.

// After that, it uploads the cadFile and imageFile using the uploadFile function, passing the respective URLs, file buffers, and content types.

// Next, it creates a fileItem using the prisma.fileItem.create function, with properties based on the data object and the uploaded files.

// Finally, it calls the revalidatePath function with a specific path and returns an object indicating success with a message and the created fileItem.
export const createFileItem = async (
  data: {
    folderId: string;
    title: string;
    description: string;
  },
  formData: FormData
) => {
  const userId = await getCurrentUserId();
  if (!userId)
    return {
      success: false,
      message: 'error',
      error: 'not logged in',
    };

  const cadFile = formData.get('cadFile') as File;
  const imageFile = formData.get('imageFile') as File;

  if (!cadFile || !imageFile) {
    return {
      success: false,
      message: 'error',
      error: 'فایل مورد نظر را انتخاب کنید',
    };
  }

  const cadUrl = generateFileUrl(data.folderId, cadFile.name);
  const imageUrl = generateFileUrl(data.folderId, imageFile.name);

  storage.uploadFile(
    cadUrl,
    Buffer.from(await cadFile.arrayBuffer()),
    'application/acad'
  );

  storage.uploadFile(
    imageUrl,
    Buffer.from(await imageFile.arrayBuffer()),
    'image/jpeg'
  );

  const fileItem = await prisma.fileItem.create({
    data: {
      folderId: data.folderId,
      title: data.title,
      description: data.description,
      files: {
        create: [
          {
            fileName: cadFile.name,
            type: 'cad',
            size: cadFile.size,
            folderId: data.folderId,
            ext: getExtension(cadFile.name),
            url: cadUrl,
            isInitial: true,
          },
          {
            fileName: imageFile.name,
            type: 'image',
            size: imageFile.size,
            ext: getExtension(imageFile.name),
            folderId: data.folderId,
            url: imageUrl,
            isInitial: true,
          },
        ],
      },
    },
  });

  revalidatePath(`/panel/myproject/${data.folderId}`);
  return {
    success: true,
    message: 'فایل اضافه شد',
    data: fileItem,
  };
};

const _updateFile = async (
  fileItemId: string,
  folderId: string,
  formdata: FormData,
  isInitial: boolean,
  type: 'cad' | 'image'
) => {
  const imageFile = formdata.get('imageFile') as File;
  const img = await prisma.file.findFirst({
    where: {
      fileItemId,
      isInitial,
      type,
    },
  });
  if (img) {
    storage.deleteFile(img.url!);
    const imageUrl = generateFileUrl(folderId, imageFile.name);
    storage.uploadFile(
      imageUrl,
      Buffer.from(await imageFile.arrayBuffer()),
      type === 'cad' ? 'application/acad' : 'image/jpeg'
    );
    await prisma.file.update({
      where: {
        id: img.id,
      },
      data: {
        url: imageUrl,
        fileName: imageFile.name,
        ext: getExtension(imageFile.name),
        size: imageFile.size,
      },
    });
  } else {
    const imageUrl = generateFileUrl(folderId, imageFile.name);
    storage.uploadFile(
      imageUrl,
      Buffer.from(await imageFile.arrayBuffer()),
      type === 'cad' ? 'application/acad' : 'image/jpeg'
    );
    await prisma.file.create({
      data: {
        url: imageUrl,
        ext: getExtension(imageFile.name),
        fileName: imageFile.name,
        size: imageFile.size,
        folderId,
        fileItemId,
        isInitial,
        type,
      },
    });
  }
};

export const submitFolder = async ({ folderId }: { folderId: string }) => {
  await prisma.folder.update({
    where: { id: folderId },
    data: { isFinalize: true },
  });

  revalidatePath(`/panel/myprojects/${folderId}`);
  return {
    success: true,
    message: 'پروژه با موفقیت ثبت شد',
  };
};

export const updateFileItem = async (
  data: {
    folderId: string;
    title: string;
    description: string;
    fileItemId: string;
    imageChanged?: boolean;
    cadChanged?: boolean;
    finalImageChanged?: boolean;
    finalCadChanged?: boolean;
  },
  formData: FormData
) => {
  const userId = await getCurrentUserId();
  if (!userId)
    return {
      success: false,
      message: 'error',
      error: 'not logged in',
    };

  if (data.imageChanged) {
    await _updateFile(data.fileItemId, data.folderId, formData, false, 'image');
  }
  if (data.cadChanged) {
    await _updateFile(data.fileItemId, data.folderId, formData, false, 'cad');
  }
  if (data.finalImageChanged) {
    await _updateFile(data.fileItemId, data.folderId, formData, true, 'image');
  }
  if (data.finalCadChanged) {
    await _updateFile(data.fileItemId, data.folderId, formData, true, 'cad');
  }

  await prisma.fileItem.update({
    where: { id: data.fileItemId },
    data: {
      title: data.title,
      description: data.description,
    },
  });

  return {
    success: true,
    message: 'فایل با موفقیت ویرایش شد',
  };
};

export const assignToMe = async ({ folderId }: { folderId: string }) => {
  const userId = await getCurrentUserId();

  await prisma.folder.update({
    where: { id: folderId },
    data: { assigneeId: userId },
  });

  return {
    success: true,
    message: 'پروژه به شما اختصاص داده شد',
  };
};

export const doneProject = async ({ folderId }: { folderId: string }) => {
  await prisma.folder.update({
    where: { id: folderId },
    data: { isClosed: true, isFinalize: true },
  });

  return {
    success: true,
    message: 'پروژه با موفقیت انجام شد',
  };
};

export const payProject = async (formData: FormData) => {
  const folderId = formData.get('folderId') as string;
  await prisma.folder.update({
    where: { id: folderId },
    data: {
      paid: true,
    },
  });

  revalidatePath(`/panel/folders/${folderId}`);
  redirect(`/panel/folders/${folderId}`);
};

export const deleteFileItem = async ({
  fileItemId,
  folderId,
}: {
  fileItemId: string;
  folderId: string;
}) => {
  const files = await prisma.file.findMany({
    where: { fileItemId },
    select: { id: true, url: true },
  });

  for (const file of files) {
    await storage.deleteFile(file.url!);
  }

  await prisma.fileItem.delete({
    where: { id: fileItemId },
  });

  revalidatePath(`/panel/myprojects/${folderId}`);
};

export const deleteFolder = async ({ folderId }: { folderId: string }) => {
  // delete files

  const files = await prisma.file.findMany({
    where: { folderId },
    select: { id: true, url: true },
  });

  for (const file of files) {
    await storage.deleteFile(file.url!);
  }

  await prisma.file.deleteMany({
    where: { folderId },
  });

  await prisma.folder.delete({
    where: { id: folderId },
  });

  revalidatePath('/panel/folders');
  redirect(`/panel/folders`);
};

export const returnFolder = async ({ folderId }: { folderId: string }) => {
  await prisma.folder.update({
    where: { id: folderId },
    data: {
      isClosed: false,
      isFinalize: false,
    },
  });

  revalidatePath(`/panel/folders/${folderId}`);
  revalidatePath(`/dashboard/assignedfolders`);
};
