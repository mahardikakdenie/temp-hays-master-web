'use client';

import type React from 'react';
import Link from 'next/link';
import Input from '@/components/ui/form/Input';
import EyeIcon from '@/components/icons/Eye';
import EyeSlashIcon from '@/components/icons/EyeSlash';
import GoogleIcon from '@/components/icons/Google';
import GithubIcon from '@/components/icons/Github';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import useLogin from './hooks/useLogin.hook';

const LoginView: React.FC = () => {
  const { form, showPassword, onShow, onSubmit } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="flex flex-col items-center gap-2 mb-5 sm:mb-8">
          <h1 className="text-2xl text-center font-bold mb-1">Welcome Back to Web Application!</h1>
          <span className="text-sm text-gray-400">
            Enter your credentials to access your account.
          </span>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
            <ButtonSecondary icon={<GoogleIcon />}>Google</ButtonSecondary>
            <ButtonSecondary icon={<GithubIcon />}>Github</ButtonSecondary>
          </div>
        </div>
        <div className="flex items-center gap-4 py-3 sm:py-5">
          <div className="h-px flex-1 bg-secondary/[16%]" />
          <span className="text-sm py-2">Or</span>
          <div className="h-px flex-1 bg-secondary/[16%]" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <Input
                id="username"
                autoComplete="off"
                label="Username"
                placeholder="Enter your username"
                error={errors.user?.message}
                required
                {...register('user')}
              />
            </div>

            <div>
              <Input
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                icon={
                  <div className="cursor-pointer" onClick={onShow}>
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </div>
                }
                iconPosition="right"
                error={errors.password?.message}
                required
                {...register('password')}
              />
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-primary">
                Forgot password?
              </Link>
            </div>

            <ButtonPrimary type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
              Log in
            </ButtonPrimary>

            <div>
              <p className="text-center text-sm text-gray-400">
                &copy; 2025 Web Application. All Right Reserved
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
