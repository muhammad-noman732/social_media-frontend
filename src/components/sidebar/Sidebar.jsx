import React, { useState } from 'react'
import { FaFlag, FaUsers, FaStore, FaRobot, FaUserFriends, FaClock, FaBookmark, FaRss, FaCalendarAlt, FaChartBar, FaUser, FaVideo } from 'react-icons/fa';
import { 
    MdGroups ,
    MdEvent,
    MdAdd,
    MdCampaign,
    MdDynamicFeed,
    MdManageAccounts,
    MdStorefront,} from 'react-icons/md';
import profile from '../../assets/profile.png'
import SidebarItem from '../sidebarItem/SidebarItem';

const SideBar = () => {
//  it will show on only large screen size 
    return (
        <div className="w-[300px]  my-20 p-4  flex flex-col gap-3 bg-white">
          <div className="flex gap-3 items-center mb-4">
            <img className="w-10 h-10 rounded-full object-cover" src={profile} alt="profile" />
            <p className="text-gray-800 font-semibold">Muhammad Noman</p>
          </div>
          <SidebarItem icon={<FaRobot />} label="Meta AI" />
          <SidebarItem icon={<FaUserFriends />} label="Friends" />
          <SidebarItem icon={<FaClock />} label="Memories" />
          <SidebarItem icon={<FaBookmark />} label="Saved" />
          <SidebarItem icon={<MdGroups />} label="Groups" />
          <SidebarItem icon={<FaVideo />} label="Videos" />
          <SidebarItem icon={<FaStore />} label="Marketplace" />
          <SidebarItem icon={<MdDynamicFeed />} label="Feeds" />
          <SidebarItem icon={<FaCalendarAlt />} label="Events" />
        </div>
      
    
      );
    };


export default SideBar
