interface GameOverModalProps {
    isVisible: boolean;
    onClick: () => void;
    score: number;
}
declare const GameOverModal: ({ isVisible, onClick, score }: GameOverModalProps) => import("react/jsx-runtime").JSX.Element | null;
export default GameOverModal;
