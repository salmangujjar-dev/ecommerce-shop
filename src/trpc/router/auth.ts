import { compare, hash } from 'bcrypt-ts';

import {
  loginSchema,
  registerSchema,
} from '@app/(application)/(authentication)/validation';

import prisma from '@lib/prisma';
import { createTRPCRouter, publicProcedure } from '@lib/trpc';

import { JWTService } from '@services/JWT';

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const { name, email, password } = input;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const hashedPassword = await hash(password, 10);

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          username: email.split('@')[0],
          isActive: true,
        },
      });

      return {
        success: true,
        message: 'Registration Successful',
      };
    }),
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const { email, password, rememberMe } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User with this email doesn't exists");
    }

    if (!(await compare(password, user.password))) {
      throw new Error('Incorrect Credentials');
    }

    const token = await JWTService.encrypt({ id: user.id }, { rememberMe });

    return {
      success: true,
      message: 'Login Successful',
      accessToken: token,
    };
  }),
});
