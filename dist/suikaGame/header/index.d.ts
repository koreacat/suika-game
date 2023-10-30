import { Fruit } from '../object/Fruit';
interface HeaderProps {
    bestScore: number;
    score: number;
    nextItem: null | Fruit;
}
declare const Header: ({ score, bestScore, nextItem }: HeaderProps) => import("react/jsx-runtime").JSX.Element;
export default Header;
