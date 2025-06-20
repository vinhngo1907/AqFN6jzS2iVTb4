import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
    // {
    //   title: 'dashboard',
    //   path: '/dashboard/app',
    //   icon: getIcon(pieChart2Fill)
    // },
    {
        title: 'user',
        path: '/dashboard/user',
        icon: getIcon(peopleFill)
    },
    {
        title: 'course',
        path: '/dashboard/courses',
        icon: getIcon(shoppingBagFill)
    }
    // {
    //   title: 'blog',
    //   path: '/dashboard/blog',
    //   icon: getIcon(fileTextFill)
    // },
    // {
    //   title: 'login',
    //   path: '/login',
    //   icon: getIcon(lockFill)
    // },
    // {
    //   title: 'register',
    //   path: '/register',
    //   icon: getIcon(personAddFill)
    // },
    // {
    //   title: 'Not found',
    //   path: '/404',
    //   icon: getIcon(alertTriangleFill)
    // }
];

export default sidebarConfig;