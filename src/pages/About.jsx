import React from 'react';
import { GiCardExchange } from 'react-icons/gi';
import { IoMdSwap } from 'react-icons/io';
import { MdOutlineEventNote, MdOutlineSportsHandball } from 'react-icons/md';
import { TbReportSearch } from 'react-icons/tb';

const About = () => {
    const features = [
        { icon : <IoMdSwap/> , title : "Trading Hub" , description : "what you don't need or find your next treasure. Whether it's tech, books, or furniture, our Trading Hub lets you swap items directly with people in your neighborhood. It's sustainable, local, and built on trust."} , 
        { icon : <MdOutlineEventNote/> , title : "Events" , description : "Never head out alone. From cinema nights and coffee meetups to gallery visits, post your plans and find like-minded people to join you. Turn every outing into a shared experience and build new friendships."} , 
        { icon : <TbReportSearch/> , title : "Lost & Found" , description : "A dedicated space to reconnect people with their belongings. If you've lost something or found an item in your area, post it here. Our community works together to make sure everything finds its way back home."} ,
        { icon : <MdOutlineSportsHandball/> , title : "Sports" , description : "Find your perfect workout partner. Whether you're looking for a running buddy, a football team, or a gym mate, the Sport category connects you with active neighbors to keep you motivated and healthy."} ,
        { icon : <GiCardExchange/> , title : "Skill Swap" , description : "Share what you know and learn what you don't. Trade your Photoshop skills for web development lessons, or cooking tips for language practice. It's a knowledge-sharing economy where everyone has something valuable to offer."} ,
    ]
    return (
        <div>
            
        </div>
    );
};

export default About;
