import styled from 'styled-components';

export default function EnterUser({ onSubmit }) {
  function handleSubmitt(event) {
    event.preventDefault();
    onSubmit(event.target.elements.userInput.value);
  }

  return (
    <Container>
      <Form action="submitt" onSubmit={handleSubmitt}>
        <label htmlFor="usterInput">what is your name?</label>
        <input type="text" name="userInput" id="userInput" required />
        <Button>Start!</Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  display: grid;
  justify-content: center;
`;

const Form = styled.form`
  display: grid;
  width: 300px;
  gap: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  padding: 40px 20px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 100px;
  justify-self: center;
  padding: 8px;
`;
