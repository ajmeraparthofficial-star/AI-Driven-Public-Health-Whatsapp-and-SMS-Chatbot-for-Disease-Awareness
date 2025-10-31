import React, { useState, useRef, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface IndiaMapProps {
    data: { state: string; totalCases: number }[];
    onStateClick: (stateName: string) => void;
    selectedState: string | null;
}

// Geographically accurate SVG path data for Indian states and UTs.
const statePaths: { [key: string]: { d: string; name: string } } = {
    "AN": { name: "Andaman and Nicobar Islands", d: "M604.4,249.2l-0.6-2l-0.4,1.9l-0.8-2.2l-0.3,2.2l-0.4-2.1l0.3,2.3l-0.8-2.2l-0.1,2.5l-0.3-2