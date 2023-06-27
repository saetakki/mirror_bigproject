import { useState } from 'react';
import { Controller } from '@organisms';
import { Container } from '@styles'

const Tts = () => {
  const [count, setCount] = useState(0)
  return (
    <Container>
      <div>
        <Controller />
      </div>
    </Container>
  );
}

export default Tts