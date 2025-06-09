
interface BallProps {
  value: string | null;
  onClick?: () => void;
  size?: 'small' | 'large';
}

const MastermindBall = ({ value, onClick, size }: BallProps) => {
  const baseClasses = `rounded-full flex items-center justify-center ${size === 'small' ? 'w-4 h-4' : 'w-6 h-6'}`;

  let ballClasses = '';

  if (value === null) {
    ballClasses = `border border-gray-300 ${baseClasses}`;
  } else {
    ballClasses = `${value} ${baseClasses}`;
  }

  return (
    <button
      className={`p-0 border-0 bg-transparent flex items-center justify-center ${
        onClick ? 'cursor-pointer' : 'cursor-default'
      }`}
      onClick={onClick}
      disabled={!onClick}
    >
      <div className={ballClasses}></div>
    </button>
  );
};

export default MastermindBall; 