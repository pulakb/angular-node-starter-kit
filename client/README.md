
### Client App

Our client application is a straight HTML/Javascript application but our development process uses a Node.js build tool
[Gulp.js](gulpjs.com).

* Install local dependencies:

    ```
    cd client
    npm install
    cd ..
    ```

  (This will install the dependencies declared in the client/package.json file)

* Install vendor (AngularJS, jQuery and others) dependencies using bower:

  client\vendor folder will have these dependency folders.

    ```
    cd client
    bower install
    ```
  In .bowerrc folder, directory location is set.

  (This will install the dependencies declared in the client/bower.json file)

### Folders structure
At the top level, the repository is split into a client folder and a server folder.  The client folder contains all the client-side AngularJS application.  The server folder contains a very basic Express based webserver that delivers and supports the application.
Within the client folder you have the following structure:
* `node_modules` contains build tasks for gulp along with other, user-installed, Node packages
* `dist` contains build results
* `src` contains application's sources
* `test` contains test sources, configuration and dependencies
* `vendor` contains external dependencies for the application

### Default Build
The default gulp task will build (checks the javascript (lint), runs the unit tests (test:unit) and builds distributable files) and run all unit tests: `gulp` (or `gulp.cmd` on Windows).  The tests are run by karma and need one or more browsers open to actually run the tests.
* `cd client`
* `gulp`
* Open one or more browsers and point them to [http://localhost:8080/__test/].  Once the browsers connect the tests will run and the build will complete.
* If you leave the browsers open at this url then future runs of `gulp` will automatically run the tests against these browsers.

### Continuous Building
The watch gulp task will monitor the source files and run the default build task every time a file changes: `gulp watch`.

### Build without tests
If for some reason you don't want to run the test but just generate the files - not a good idea(!!) - you can simply run the build task: `gulp build`.