import QRView from '@/components/qr-view.component';
import Base from '@/components/base.component';
import Login from '@/components/auth/login.component';
import Register from '@/components/auth/register.component';
import RoomLayout from '@/components/room-layout.component';

export const routes = [
  {
    path: '/',
    name: 'base',
    component: Base,
    redirect: to => 'qr-view',
    children: [
      {
        path: '/qr-view',
        name: 'qrview',
        component: QRView
      },
      {
        path: '/room-layout',
        name: 'roomlayout',
        component: RoomLayout
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
];
