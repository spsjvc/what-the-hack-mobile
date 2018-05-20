import QRView from '@/components/qr-view.component';
import Base from '@/components/base.component';
import Login from '@/components/auth/login.component';
import Register from '@/components/auth/register.component';
import RoomLayout from '@/components/room-layout.component';
import RoomsList from '@/components/rooms-list.component';
import MyReservations from '@/components/my-reservations.component';
import MyProfile from '@/components/my-profile.component';

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
      },
      {
        path: '/rooms-list',
        name: 'roomslist',
        component: RoomsList
      },
      {
        path: '/my-reservations',
        name: 'myreservations',
        component: MyReservations
      },
      {
        path: '/my-profile',
        name: 'myprofile',
        component: MyProfile
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true
    }
  }
];
