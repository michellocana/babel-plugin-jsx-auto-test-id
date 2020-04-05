# babel-plugin-jsx-auto-test-id &middot; [![package version](https://img.shields.io/github/package-json/v/michellocana/babel-plugin-jsx-auto-test-id)](https://www.npmjs.com/package/babel-plugin-jsx-auto-test-id) [![tests](https://github.com/michellocana/babel-plugin-jsx-auto-test-id/workflows/tests/badge.svg?branch=master)](https://github.com/michellocana/babel-plugin-jsx-auto-test-id/actions?query=workflow%3Atests)

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
