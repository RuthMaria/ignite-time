import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

/* serve para tipar as nossas cores, dá inteligência a IDE para selecionar as cores do theme */

type ThemeType = typeof defaultTheme;

/* sobrescrevendo a tipagem de DefaultTheme*/

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
