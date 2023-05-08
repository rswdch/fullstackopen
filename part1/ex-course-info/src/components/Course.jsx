function Course({data}){
  return (
    <div className="body">
      {
        data.map((course) =>
          <li key={course.id}>
            <Header key={course.id+'-header'} course={course.name}/>
            <Content key={course.id+'-content'} arr={course.parts} />
            <Total key={course.id+'-total'} arr={course.parts} />
          </li>
        )
      }
    </div>
  );
}
function Header(props) {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
}
function Content({ arr }) {
  // Iterate through course parts in array
  return (
    <>
      {arr.map((prop, index) => (
        <Part name={prop.name} exercises={prop.exercises} key={index} />
      ))}
    </>
  );
}
function Part(props) {
  // Outputs the name and number of exercises of a single course part item
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  );
}
function Total({ arr }) {
  // Sums all course # of exercises in array of course parts
  // part: {name, exercises, id}
  console.log("Reduce total ", arr);
  let total = arr.reduce((acc, cur) => acc + cur.exercises, 0);
  return (
    <>
      <p className="total-calc">total of {total} exercises</p>
    </>
  );
}

export {Course, Header, Content, Part, Total};
