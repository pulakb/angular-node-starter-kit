# The `src/app` Directory

## Overview

```
src/
  |- app/
  |  |- module-1/
  |  |- module-2/
  |  |- app.js
  |  |- app.spec.js
```

The `src/app` directory contains all code specific to this application. Apart
from `app.js` and its accompanying tests (discussed below), this directory is
filled with subdirectories corresponding to high-level sections of the
application, often corresponding to top-level routes. Each directory can have as
many subdirectories as it needs, and the build system will understand what to
do. For example, a top-level route might be "module-1", which would be a folder
within the `src/app` directory that conceptually corresponds to the top-level
route `/module-1`, though this is in no way enforced. Products may then have
subdirectories for "create", "view", "search", etc. The "view" submodule may
then define a route of `/module-1/:id`, ad infinitum.

## `app.js`

This is our main app configuration file. It kickstarts the whole process by
requiring all the modules from `src/app` that we need. We must load these now to
ensure the routes are loaded. If as in our "module-1" example there are
subroutes, we only require the top-level module, and allow the submodules to
require their own submodules.

As a matter of course, we also require the template modules that are generated
during the build.

However, the modules from `src/common` should be required by the app
submodules that need them to ensure proper dependency handling. These are
app-wide dependencies that are required to assemble your app.

```js
angular.module( 'ngAppName', [
  'templates-app',
  'templates-common',
  'ngAppName.module-1',
  'ngAppName.module-2'
  'ui.router',
  'ui.route'
])
```

With app modules broken down in this way, all routing is performed by the
submodules we include, as that is where our app's functionality is really
defined.  So all we need to do in `app.js` is specify a default route to follow,
which route of course is defined in a submodule. In this case, our `module-1` module
is where we want to start, which has a defined route for `/module-1` in
`src/app/module-1/module-1.js`.

```js
.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/module-1' );
})
```

Use the main applications run method to execute any code after services
have been instantiated.

```js
.run( function run () {
})
```

And then we define our main application controller. This is a good place for logic
not specific to the template or route, such as menu logic or page title wiring.

```js
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }
  });
})
```

### Testing

One of the design philosophies of `ngBoilerplate` is that tests should exist
alongside the code they test and that the build system should be smart enough to
know the difference and react accordingly. As such, the unit test for `app.js`
is `app.spec.js`, though it is quite minimal.