import { ResolvableTo, ScreensConfig } from 'tailwindcss/types/config';

import tailwindConfig from '../../tailwind.config';

const screen : ResolvableTo<ScreensConfig> = tailwindConfig.theme.screens;
type screenType = keyof typeof screen;


export function useBreakpointValue(breakpointValue: screenType) {
    
}

