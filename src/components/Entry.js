import styled from 'styled-components';
import ScreenReaderOnly from './ScreenReaderOnly';

export default function Entry({ text, author, color, id, onDelete }) {
  return (
    <Card>
      {text}
      <Author color={color}>{author}</Author>
      <Delete onClick={() => onDelete(id)}>
        <ScreenReaderOnly>Create new entry</ScreenReaderOnly>{' '}
        <div aria-hidden="true">x</div>
      </Delete>
    </Card>
  );
}

const Card = styled.section`
  display: grid;
  align-content: space-between;
  padding: 20px;
  max-width: 400px;
  border: 1px solid #ddd;
  height: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  position: relative;
`;

const Author = styled.p`
  margin: 0;
  text-transform: uppercase;
  font-size: 1rem;
  color: ${props => props.color};
`;

const Delete = styled.button`
  position: absolute;
  padding: 7px;
  right: 5px;
  border: none;
  background-color: transparent;
`;
