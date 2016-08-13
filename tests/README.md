# Tests

## Running in the browser
1. Add the source files that will be tested to the `SpecRunner.html`
2. Add the test files to the same `SpecRunner.html`
3. Open the `SpecRunner.html` with a browser
> The `tests/lib/` folder contains **jasmine's** standalone package

## Running using `karma`
1. Install `karma-cli` (`npm install -g karma-cli`)
2. Install `karma` related dev-dependencies:
    ```
    npm install --save-dev jasmine-core karma karma-jasmine karma-phantomjs-launcher
    ```
3. Configure `karma`
    * to create new configuration run `karma init`
    * or if there is existing cofig file - `karma.conf.js`
    you can use it instead
4. *I have added the `test` command to the `package.json`*
