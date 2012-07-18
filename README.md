AngularJS GitHub Contributors
=============================

This project is a port of the YUI 3.5 app
[GitHub Contributors] to [AngularJS].

The CSS has been taken unchanged from the original app. The html
structure has also been taken from the original app, but it has been
modified to work with [AngularJS].

Known differenses between this port and the original app:

* No pluralization of the word _contributor_ in the on hover title, of
  the contributors thumbs.
* One more json query to GitHub, 4 instead of 3.
* Fewer lines of javascript code, 93 compared to 387, excluding lines
  with comments and empty lines!

Demo
----
View the app [AngularJS GitHub Contributors].

Licenses
--------
* All my code is licensed under the [Modified BSD License], excluding
  the lib directories.
* The html code in the partials directory is also licensed under the same
  [BSD License] as the original app.

[GitHub Contributors]: http://yuilibrary.com/yui/docs/app/app-contributors.html
[AngularJS]: http://angularjs.org/
[AngularJS GitHub Contributors]: http://daha.github.com/angularJS-github-contributors
[Modified BSD License]: https://github.com/daha/angularJS-github-contributors/blob/master/LICENSE
[BSD License]: http://yuilibrary.com/license/
