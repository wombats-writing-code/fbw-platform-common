
let path = require('path')
// require('../components/mission/__tests__/mission.spec')

// This gets replaced by karma webpack with the updated files on rebuild
var __karmaWebpackManifest__ = [];

// require all modules ending in "_test" from the
// current directory and all subdirectories
var testsContext = require.context(path.resolve(__dirname, "../components"), true, /__tests__$/);

function inManifest(path) {
  return __karmaWebpackManifest__.indexOf(path) >= 0;
}

var runnable = testsContext.keys().filter(inManifest);

console.log(testsContext.keys());
console.log('runnable', runnable);

// Run all tests if we didn't find any changes
if (!runnable.length) {
  runnable = testsContext.keys();
}

runnable.forEach(testsContext);
