import { css } from '@emotion/react';

const GenderButton = ({ gender, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      css={css`
        ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}
        rounded-lg px-4 py-2 text-lg font-medium focus:outline-none
        transition-colors duration-200 ease-in-out hover:bg-blue-500 hover:text-white
      `}
    >
      {gender}
    </button>
  );
};

export default GenderButton;
