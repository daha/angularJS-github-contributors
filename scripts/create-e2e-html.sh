#!/bin/sh

infile=$1
dir=`dirname $infile`
outfile=$dir/index-e2e.html

sed -e 's/ng-app="ghContrib"/ng-app="ghContribE2E"/' \
    -e '/lib\/angular\/angular.js/a \
        <script src="../test/lib/angular/angular-mocks.js"></script>
' -e '/js\/app.js/a \
        <script src="../test/e2e/github-responses.js"></script>
' -e '/js\/app.js/a \
        <script src="js/app-e2e.js"></script>
' $infile > $outfile
