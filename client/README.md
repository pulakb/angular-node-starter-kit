
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