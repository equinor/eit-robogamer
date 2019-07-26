export const boardWidth = 16;
export const boardHeight = 9; 

export const botWidthMm = 70; //mm
export const botHeightMm = 60; //mm

export const boardWidthMm = 1440; //mm
export const mmPerUnit = boardWidthMm / boardWidth;

export const botWidth = botWidthMm / mmPerUnit;
export const botHeight = botHeightMm / mmPerUnit;