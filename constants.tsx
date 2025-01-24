import Image from 'next/image';
import Icons from './Theme/Icons';
import { SideNavItem } from './types';


export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Image src={Icons.DashboardIcon} alt=""
      width={24}
      height={21.82}
      quality={100} />,
    activeIcon: <Image src={Icons.DashboardActiveIcon} alt=""
      width={24}
      height={21.82}
      quality={100} />,
  },
  {
    title: 'Students',
    path: '/dashboard/students',
    icon: <Image src={Icons.StudentIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
    activeIcon: <Image src={Icons.StudentActIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
    // submenu: true,
    // subMenuItems: [
    //   { title: 'All', path: '/dashboard/projects' },
    //   { title: 'Web Design', path: '/dashboard/projects/web-design' },
    //   { title: 'Graphic Design', path: '/dashboard/projects/graphic-design' },
    // ],
  },
  {
    title: 'School',
    path: '/dashboard/school',
    icon: <Image src={Icons.SchoolIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
    activeIcon: <Image src={Icons.SchoolActIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
  },
  {
    title: 'Teachers',
    path: '/dashboard/teachers',
    icon: <Image src={Icons.TeacherIcon} alt=""
      width={24}
      height={21.6}
      quality={100} />,
    activeIcon: <Image src={Icons.TeacherActIcon} alt=""
      width={24}
      height={21.6}
      quality={100} />,
  },
  {
    title: 'Staff Members',
    path: '/dashboard/staffMember',
    icon: <Image src={Icons.StaffIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
    activeIcon: <Image src={Icons.StaffActIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
  },
  {
    title: 'Guardians',
    path: '/dashboard/guardians',
    icon: <Image src={Icons.GaurdiansIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
    activeIcon: <Image src={Icons.GuardianActIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
  },
  {
    title: 'Attendance',
    path: '/dashboard/attendance',
    icon: <Image src={Icons.AttendanceIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
    activeIcon: <Image src={Icons.AttendanceActIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
  },
  {
    title: 'Class',
    path: '/dashboard/class',
    icon: <Image src={Icons.ClassIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
    activeIcon: <Image src={Icons.ClassActIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
  },
  {
    title: 'Subject',
    path: '/dashboard/subject',
    icon: <Image src={Icons.SubjectIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
    activeIcon: <Image src={Icons.SubjectActIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
  },
  {
    title: 'Fee Accounts',
    path: '/dashboard/feeAccount',
    icon: <Image src={Icons.FeeIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
    activeIcon: <Image src={Icons.FeeActIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
  },
  {
    title: 'Notice',
    path: '/dashboard/notice',
    icon: <Image src={Icons.NoticeIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
    activeIcon: <Image src={Icons.NoticeActIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
  },
  {
    title: 'Support',
    path: '/dashboard/support',
    icon: <Image src={Icons.SupportIcon} alt=""
      width={22}
      height={22}
      quality={100} />,
    activeIcon: <Image src={Icons.SupportActIcon} alt=""
      width={24}
      height={24}
      quality={100} />,
  },
];
