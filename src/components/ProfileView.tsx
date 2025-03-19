
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/lib/db';

interface ProfileViewProps {
  user: User;
}

const ProfileView = ({ user }: ProfileViewProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16 bg-ayush-green text-white text-2xl flex items-center justify-center">
          <span>{user.fullName.charAt(0)}</span>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{user.fullName}</CardTitle>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="grid gap-2">
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p>{user.email}</p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-sm font-medium text-gray-500">Address</h3>
          <p>{user.address}</p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileView;
