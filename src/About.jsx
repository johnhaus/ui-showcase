import { useState } from 'react';

function About() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>About Page</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>About Page</p>
      </div>
      <p>Test setup for a second page</p>
    </>
  );
}

export default About;
