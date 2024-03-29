'use server';

import { hash, verify } from 'argon2';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { isPast } from 'date-fns';
import { getCurrentUserId } from '../getCurrentUser';
import { prisma } from '../db';

const AUTH_SECRET = process.env.AUTH_SECRET as unknown as string;

export async function authenticate({
  nationalId,
  password,
}: {
  nationalId: string;
  password: string;
}) {
  const user = await prisma.user.findFirst({
    where: { nationalId },
  });
  if (!user)
    return {
      success: false,
      nationalId: 'کاربری یافت نشد!',
    };
  const passwordsMatch = await verify(user.password, password);
  if (passwordsMatch) {
    cookies().set(
      'loggedIn',
      jwt.sign(
        {
          data: {
            id: user.id,
          },
        },
        AUTH_SECRET,
        { expiresIn: '1d' }
      )
    );

    return {
      success: true,
      verified: user.phoneNumberVerified,
    };
  }
  return {
    password: 'رمز عبور اشتباه است!',
    success: false,
  };
}

export async function register(data: {
  nationalId: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) {
  const _user = await prisma.user.findFirst({
    where: { nationalId: data.nationalId },
  });

  if (_user)
    return {
      success: false,
      nationalId: 'کاربری با این شماره ملی وجود دارد!',
    };

  const user = await prisma.user.create({
    data: {
      ...data,
      password: await hash(data.password),
    },
  });

  cookies().set(
    'loggedIn',
    jwt.sign(
      {
        data: {
          id: user.id,
        },
      },
      AUTH_SECRET,
      { expiresIn: '1d' }
    )
  );
  return {
    success: true,
    verified: user.phoneNumberVerified,
  };
}

export async function logout() {
  cookies().delete('loggedIn');
  redirect('/', RedirectType.replace);
}

export const verifyPhone = async ({ code }: { code: string }) => {
  const userId = await getCurrentUserId();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return {
      success: false,
      message: 'کاربری یافت نشد!',
    };
  if (user.phoneNumberVerified)
    return {
      success: false,
      message: 'کاربر از قبل تایید شده است!',
    };
  const verificationToken = await prisma.verificationToken.findFirst({
    where: { userId: user.id },
  });

  if (verificationToken?.token !== code)
    return {
      success: false,
      message: 'کد اشتباه است!',
    };
  if (isPast(verificationToken.expires))
    return {
      success: false,
      message: 'کد منقضی شده است!',
    };

  await prisma.user.update({
    where: { id: user.id },
    data: {
      phoneNumberVerified: true,
    },
  });
  return {
    success: true,
  };
};

export const generateToken = async () => {
  const userId = await getCurrentUserId();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return {
      success: false,
      message: 'user not found!',
    };
  if (user.phoneNumberVerified)
    return {
      success: false,
      message: 'phone number already verified!',
    };
  const verificationToken = await prisma.verificationToken.findFirst({
    where: { userId: user.id },
  });

  if (verificationToken)
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

  const token = await prisma.verificationToken.create({
    data: {
      userId: user.id,
      token: Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0'),
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  return {
    success: true,
    token: token.token,
  };
};

export const resetPasswordRequest = async (nationalId: string) => {
  const user = await prisma.user.findFirst({ where: { nationalId } });
  if (!user)
    return {
      success: false,
      message: 'user not found!',
    };
  const token = await prisma.verificationToken.create({
    data: {
      userId: user.id,
      token:
        nationalId +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, '0'),
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  return {
    success: true,
    token: token.token,
  };
};

export const resetPassword = async (
  nationalId: string,
  token: string,
  password: string
) => {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: { token: nationalId + token },
  });
  if (!verificationToken)
    return {
      success: false,
      message: 'token not found!',
    };
  if (isPast(verificationToken.expires))
    return {
      success: false,
      message: 'token has expired!',
    };
  const user = await prisma.user.findUnique({
    where: { id: verificationToken.userId },
  });
  if (!user)
    return {
      success: false,
      message: 'user not found!',
    };
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await hash(password),
      phoneNumberVerified: true,
    },
  });
  return {
    success: true,
  };
};
