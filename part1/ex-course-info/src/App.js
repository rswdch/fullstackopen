function Header(props) {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
}
function Content({ arr }) {
  // console.log(arr);
  // return (
  // <>
  //   <Part {...arr[0]}/>
  //   <Part {...arr[1]}/>
  //   <Part {...arr[2]}/>
  // </>
  // )
  return (
    <>
      {arr.map((prop, index) => (
        <Part part={prop.part} exercises={prop.exercises} key={index} />
      ))}
    </>
  );
}
function Part(props) {
  return (
    <>
      <p key={props.index}>
        {props.part} {props.exercises}
      </p>
    </>
  );
}
function Total({ arr }) {
  console.log("Reduce total ", arr);
  let total = arr.reduce((acc, cur) => acc + cur.exercises, 0);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
}
function App() {
  const course = "Half stack application development";
  const parts = [
    { name: "Fundamentals of React", exercises: 10 },
    { name: "Using props to pass data", exercises: 7 },
    { name: "State of a component", exercises: 14 },
  ];

  return (
    <div className="body">
      <Header course={course} />
      <Content arr={parts} />
      <Total arr={parts} />
    </div>
  );
}

export default App;
