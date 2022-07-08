import { theme } from '../contants';
import { Text, TextProps } from './Themed';

export function ThemeText(props: TextProps) {
  return <Text {...props} style={[props.style, { color: theme.colors.secondary }]} />;
}
