
# Fly-by-Wire components common to Instructor and Students (web + mobile)


## Development installation
```
git clone https://github.com/wombats-writing-code/fbw-platform-common.git
```

## Development

### Unit tests
Unit tests are for selectors and reducers --- most of the functions there are pure and simple to test. Just run:

```
npm test
```

and mocha will run all files named `*.unit-spec.js`.


### UI component tests
Component tests are for components that go into both apps. To run the test suite:
```
npm run karma
```
The karma runner will run all files named `*.spec.js`, compile them using webpack and launch the Chrome window. Each test has automatic cleanup but if you want to see the component visually in the browser, just comment out the `after()` block.

*Run both suites after making a change!* because changes impact both apps.
