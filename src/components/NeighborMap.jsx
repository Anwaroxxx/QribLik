import { useEffect, useRef, useState } from 'react'
import {
  FiX, FiMapPin, FiPhone, FiMail, FiUsers,
  FiRepeat, FiSearch, FiCalendar, FiMusic,
  FiMonitor, FiNavigation, FiFilter,
} from 'react-icons/fi'
import { MdSportsSoccer, MdOutlineFoodBank, MdOutlineNaturePeople, MdChildCare } from 'react-icons/md'
import { RiHandHeartLine } from 'react-icons/ri'


const CATEGORIES = [
  { label: 'Sport',          icon: MdSportsSoccer,        color: '#8B3FDE' },
  { label: 'Trading',        icon: FiRepeat,              color: '#C837AB' },
  { label: 'Lost and Found', icon: FiSearch,              color: '#FF6B35' },
  { label: 'Swap Skills',    icon: RiHandHeartLine,       color: '#8B3FDE' },
  { label: 'Events',         icon: FiCalendar,            color: '#C837AB' },
  { label: 'Food',           icon: MdOutlineFoodBank,     color: '#FF6B35' },
  { label: 'Gardening',      icon: MdOutlineNaturePeople, color: '#8B3FDE' },
  { label: 'Music',          icon: FiMusic,               color: '#C837AB' },
  { label: 'Tech Help',      icon: FiMonitor,             color: '#FF6B35' },
  { label: 'Childcare',      icon: MdChildCare,           color: '#8B3FDE' },
]


const NEIGHBORS = [
  { id: 'u01', name: 'Anwar El Mansouri', email: 'anwar.elmansouri@gmail.com', phone: '+212 677 866 959', avatar: 'https://i.pravatar.cc/150?img=3',  neighborhood: 'North End',       categories: ['Sport', 'Trading', 'Events'],              lat: 33.615, lng: -7.632 },
  { id: 'u02', name: 'Sofia Tazi',        email: 'sofia.tazi@gmail.com',       phone: '+212 661 234 567', avatar: 'https://i.pravatar.cc/150?img=47', neighborhood: 'Sunset District', categories: ['Music', 'Events', 'Food'],                 lat: 33.592, lng: -7.618 },
  { id: 'u03', name: 'Karim Berrada',     email: 'karim.berrada@gmail.com',    phone: '+212 655 987 321', avatar: 'https://i.pravatar.cc/150?img=12', neighborhood: 'Park Ridge',      categories: ['Sport', 'Tech Help', 'Swap Skills'],      lat: 33.608, lng: -7.652 },
  { id: 'u04', name: 'Leila Moussaoui',   email: 'leila.moussaoui@gmail.com',  phone: '+212 669 111 222', avatar: 'https://i.pravatar.cc/150?img=44', neighborhood: 'Central Square',  categories: ['Gardening', 'Food', 'Childcare'],         lat: 33.628, lng: -7.601 },
  { id: 'u05', name: 'Omar Chakir',       email: 'omar.chakir@gmail.com',      phone: '+212 672 444 888', avatar: 'https://i.pravatar.cc/150?img=15', neighborhood: 'Eastside',        categories: ['Trading', 'Sport', 'Lost and Found'],     lat: 33.581, lng: -7.641 },
  { id: 'u06', name: 'Yasmine Filali',    email: 'yasmine.filali@gmail.com',   phone: '+212 660 777 333', avatar: 'https://i.pravatar.cc/150?img=49', neighborhood: 'Westgate',        categories: ['Sport', 'Events', 'Swap Skills'],         lat: 33.644, lng: -7.668 },
  { id: 'u07', name: 'Bilal Lahlou',      email: 'bilal.lahlou@gmail.com',     phone: '+212 676 555 999', avatar: 'https://i.pravatar.cc/150?img=8',  neighborhood: 'Harbor View',     categories: ['Music', 'Tech Help', 'Sport'],            lat: 33.598, lng: -7.589 },
  { id: 'u08', name: 'Nadia Senhaji',     email: 'nadia.senhaji@gmail.com',    phone: '+212 663 222 777', avatar: 'https://i.pravatar.cc/150?img=36', neighborhood: 'Old Town',        categories: ['Childcare', 'Gardening', 'Food'],         lat: 33.619, lng: -7.676 },
  { id: 'u09', name: 'Hamza Ziani',       email: 'hamza.ziani@gmail.com',      phone: '+212 658 888 444', avatar: 'https://i.pravatar.cc/150?img=18', neighborhood: 'Maplewood',       categories: ['Sport', 'Trading'],                       lat: 33.572, lng: -7.622 },
  { id: 'u10', name: 'Rania Kadiri',      email: 'rania.kadiri@gmail.com',     phone: '+212 671 333 666', avatar: 'https://i.pravatar.cc/150?img=41', neighborhood: 'Riverside',       categories: ['Swap Skills', 'Music', 'Events'],         lat: 33.634, lng: -7.593 },
  { id: 'u11', name: 'Mehdi Naciri',      email: 'mehdi.naciri@gmail.com',     phone: '+212 665 444 111', avatar: 'https://i.pravatar.cc/150?img=22', neighborhood: 'Cedar Hill',      categories: ['Sport', 'Food', 'Lost and Found'],        lat: 33.607, lng: -7.609 },
  { id: 'u12', name: 'Zineb Fassi',       email: 'zineb.fassi@gmail.com',      phone: '+212 668 666 222', avatar: 'https://i.pravatar.cc/150?img=29', neighborhood: 'Lakefront',       categories: ['Gardening', 'Childcare', 'Sport'],        lat: 33.587, lng: -7.660 },
]

const ME = { lat: 33.608, lng: -7.632, name: 'Alex Neighbor', neighborhood: 'Sunset District' };

//TODO ==> khassni n dir function li t affichi lia cards w n ajouti ta users f map ..
// w ndir profiles dialhom as rounded-full w 3lihom shi border rounded tahowaaa 
// khassni njm3 ga3 user dataa f json (ash dani l hedhsy)