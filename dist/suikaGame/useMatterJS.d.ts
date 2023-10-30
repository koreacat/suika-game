import { SetStateAction } from "react";
import { Fruit } from "./object/Fruit";
interface UseMatterJSProps {
    score: number;
    setScore: React.Dispatch<SetStateAction<number>>;
    nextItem: Fruit;
    setNextItem: React.Dispatch<SetStateAction<Fruit>>;
    isGameOver: boolean;
    setIsGameOver: React.Dispatch<SetStateAction<boolean>>;
}
declare const useMatterJS: (props: UseMatterJSProps) => {
    clear: () => void;
};
export default useMatterJS;
