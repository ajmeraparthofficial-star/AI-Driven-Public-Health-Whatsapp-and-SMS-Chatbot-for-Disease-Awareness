import React from 'react';

const TEAM_MEMBERS = [
    "Parth Ajmera",
    "Yashvardhan Dobhal",
    "Aashu Joshi",
    "Anshika Bijalwan",
];

export const Footer: React.FC = () => {
  return (
    <footer className="p-3 bg-[#1a1a1a] text-center text-xs text-gray-500 border-t border-pink-500/10">
      <p className="font-semibold text-gray-400">Team: Matrix Mavericks</p>
      <p>{TEAM_MEMBERS.join(' | ')}</p>
    </footer>
  );
};