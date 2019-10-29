# babel-plugin-jsx-auto-test-id

Automatically adds data-test id's to every component host element. Useful to E2E tests.

## Usage

Via `.babelrc`:

```json
{
  "plugins": ["jsx-auto-test-id"]
}
```

If you want to set a custom attribute name:

```json
{
  "plugins": ["jsx-auto-test-id", { "attributeName": "data-my-custom-test-id" }]
}
```

## Example

### Input (React)

```jsx
function App() {
  return (
    <div>
      <p>foo</p>
      <p>bar</p>
    </div>
  )
}
```

### Output

```html
<div data-test="App">
  <p>foo</p>
  <p>bar</p>
</div>
```
