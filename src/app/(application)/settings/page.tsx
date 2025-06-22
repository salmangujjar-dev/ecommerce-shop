'use client';

import { useState } from 'react';

import { Button } from '@ui/button';
import { Input } from '@ui/input';

import { useSession } from '@lib/session/provider';

import { trpc } from '../../../trpc/client';

export default function SettingsPage() {
  const { user } = useSession();
  const [name, setName] = useState(user?.name || '');
  const [nameMsg, setNameMsg] = useState<string | null>(null);
  const [nameLoading, setNameLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwMsg, setPwMsg] = useState<string | null>(null);
  const [pwLoading, setPwLoading] = useState(false);

  const utils = trpc.useUtils();
  const updateName = trpc.users.updateName.useMutation({
    onSuccess: () => {
      setNameMsg('Name updated successfully.');
      utils.users.getById.invalidate();
    },
    onError: (e: unknown) => {
      let msg = 'Failed to update name.';
      if (
        typeof e === 'object' &&
        e &&
        'message' in e &&
        typeof (e as { message?: unknown }).message === 'string'
      ) {
        msg = (e as { message: string }).message;
      }
      setNameMsg(msg);
    },
    onSettled: () => setNameLoading(false),
  });
  const updatePassword = trpc.users.updatePassword.useMutation({
    onSuccess: () => {
      setPwMsg('Password updated successfully.');
      setOldPassword('');
      setNewPassword('');
    },
    onError: (e: unknown) => {
      let msg = 'Failed to update password.';
      if (
        typeof e === 'object' &&
        e &&
        'message' in e &&
        typeof (e as { message?: unknown }).message === 'string'
      ) {
        msg = (e as { message: string }).message;
      }
      setPwMsg(msg);
    },
    onSettled: () => setPwLoading(false),
  });

  if (!user) return <div className='py-10 text-center'>Not logged in.</div>;

  return (
    <div className='max-w-lg mx-auto py-10 px-4 w-full'>
      <h1 className='text-2xl font-bold mb-6'>Account Settings</h1>
      <div className='bg-white rounded-lg shadow p-6 mb-8'>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Name</label>
          <div className='flex gap-2'>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={nameLoading}
            />
            <Button
              onClick={() => {
                setNameLoading(true);
                setNameMsg(null);
                updateName.mutate({ name });
              }}
              disabled={nameLoading || name === user.name || !name.trim()}
            >
              Save
            </Button>
          </div>
          {nameMsg && (
            <div className='text-sm mt-1 text-green-600'>{nameMsg}</div>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Email</label>
          <Input value={user.email} disabled />
        </div>
      </div>
      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-lg font-semibold mb-4'>Change Password</h2>
        <div className='mb-3'>
          <label className='block text-sm font-medium mb-1'>
            Current Password
          </label>
          <Input
            type='password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={pwLoading}
            autoComplete='current-password'
          />
        </div>
        <div className='mb-3'>
          <label className='block text-sm font-medium mb-1'>New Password</label>
          <Input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={pwLoading}
            autoComplete='new-password'
          />
        </div>
        <Button
          onClick={() => {
            setPwLoading(true);
            setPwMsg(null);
            updatePassword.mutate({ oldPassword, newPassword });
          }}
          disabled={pwLoading || !oldPassword || !newPassword}
        >
          Change Password
        </Button>
        {pwMsg && (
          <div
            className={`text-sm mt-2 ${
              pwMsg.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {pwMsg}
          </div>
        )}
      </div>
    </div>
  );
}
