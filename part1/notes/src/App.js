function Hello(props) {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

function App() {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(now, a+b);

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+10}/>
      <Hello name="Daisy"/>
      <p>{['Peter', 'Maya']}</p>
    </div>
  );
}

export default App;
