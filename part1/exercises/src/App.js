function Header(props){
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}
function Content({arr}){
  console.log(arr);
  // return (
  // <>
  //   <Part {...arr[0]}/>
  //   <Part {...arr[1]}/>
  //   <Part {...arr[2]}/>
  // </>
  // )
  return (
    <>
      {
        arr.map((prop, index) => (
          <Part part={prop.part} ex={prop.ex} key={index} />
        ))
      }
    </>
  )
}
function Part(props){
  return(
    <>
      <p key={props.index}>{ props.part} {props.ex }</p>
    </>
  )
}
function Total(props){
  return(<> <p>Number of exercises {props.total}</p> </>)
}
function App() {
  const course = 'Half stack application development';  
  const part1 = 'Fundamentals of React'
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;
  const contentProps = [{part: part1, ex: exercises1}, {part: part2, ex: exercises2}, {part: part3, ex: exercises3} ] 

  return (
    <div className="body">
      <Header course={course}/>
      <Content arr={contentProps}/>
      <Total total={exercises1+exercises2+exercises3}/>
    </div>
  );
}

export default App;
