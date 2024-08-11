import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { signIn } from 'next-auth/react';
import React from 'react';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import Image from 'next/image';

interface Props {
  open: boolean;
  onClose: () => void;
}

function AuthModal({ open, onClose }: Props) {
  const [type, setType] = React.useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <Image
              width={24}
              height={24}
              alt="GitHub logo"
              src="https://github.githubassets.com/favicons/favicon.svg"
            />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <Image
              width={24}
              height={24}
              alt="Google logo"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
        </div>
        <Button type="button" variant="outline" className="h-12" onClick={onSwitchType}>
          {type === 'login' ? 'Зарегистрироваться' : 'Войти'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
