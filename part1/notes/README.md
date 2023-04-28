```
link: https://fullstackopen.com/en/part1/introduction_to_react
```
# React Components

Components take the form of a function. Your main function is the App component.

```
function App() {
    return (
        <div>
            <p>Hello world</p>
            <Hello name="Maya" age={26+10} />
        </div>
    )
}
```

Additional components can be made and called from the App component with the name capitalized and a closing tag.
Arguments can be provided by using HTML props notation.

```
function Hello(props) {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old.</p>
        </div>
    )
}
```

## Miscellaneous Notes About Components
* Components must be capitalized in React.
* Components must be wrapped in a root node such as a div or an array.
    * This creates extra divs, which can be avoided with empty angle bracket ==fragments==.
```
function Fragments() {
    return(
        <>
            <h1>Greetings from a fragment</h1>
        </>
    )
}
```
* Items in braces must be primitives, so ==no objects!==
