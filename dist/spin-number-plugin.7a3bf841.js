// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/blocks/dropdown-guests/spin-number-plugin.js":[function(require,module,exports) {
(function ($) {
  $.fn.htmlNumberSpinner = function () {
    /* creating the counter buttons */
    $(this).append("<div class='btn decrementer'>-</div> <input class='number-input' type='number'/> <div class='btn incrementer'>+</div>");
    /* default value and variables and jquery elements*/

    var defaultValue = 0,
        inputValue;
    var numberInput$ = $(this).find('.number-input');
    var incrementerEl$ = $(this).find('.incrementer');
    var decrementerEl$ = $(this).find('.decrementer');
    /* hide the default number input spinner */

    $(this).append("<style>" + "input[type=number]::-webkit-inner-spin-button, \n" + "input[type=number]::-webkit-outer-spin-button { \n" + "    -webkit-appearance: none;\n" + "    -moz-appearance: none;\n" + "    appearance: none;\n" + "    margin: 0; \n" + "}</style>");
    /* styling the counter buttons */
    // $(this).find('.btn').css({"display":"inline-block", "width":"50px", "height":"30px", "font-size":"25px", "text-align":"center", "vertical-align":"middle", "line-height":"1", "cursor":"pointer", "user-select":"none"});
    // incrementerEl$.css({"background-color":"slateblue", "color":"white", "border": "1px solid slateblue"});
    // decrementerEl$.css({"background-color":"hotpink", "color":"white", "font-size":"25px", "border": "1px solid hotpink"});
    // numberInput$.css({
    //     "background-color":"white",
    //     "border": "1px solid",
    //     "color":"black",
    //     "text-align":"center",
    //     "width":"55px",
    //     "font-size":"18px",
    //     "line-height":"normal",
    //     "padding":"0",
    //     "outline":"none",
    //     "border-left-color": "hotpink",
    //     "border-right-color": "slateblue",
    //     "border-top-color": "lightblue",
    //     "border-bottom-color": "lightblue"
    // });

    /* props - dynamic attributes */

    var minAttributeValue = $(this).attr("min");
    var maxAttributeValue = $(this).attr("max");
    var stepAttributeValue = $(this).attr("step");

    if (minAttributeValue) {
      numberInput$.attr("min", +minAttributeValue);
    }

    if (maxAttributeValue) {
      numberInput$.attr("max", +maxAttributeValue);
    }

    if (stepAttributeValue) {
      numberInput$.attr("step", +stepAttributeValue);
    }
    /* set the default value into the input */


    inputValue = minAttributeValue ? minAttributeValue : defaultValue;
    numberInput$.val(inputValue);
    /* incrementer functionality */

    incrementerEl$.click(function () {
      var parentEl = $(this).parent();
      inputValue = parentEl.find('.number-input').val();

      if (maxAttributeValue) {
        if (maxAttributeValue == inputValue) {
          return;
        }
      }

      if (stepAttributeValue) {
        inputValue = parentEl.find('.number-input').val();
        parentEl.find('.number-input').val(+inputValue + +stepAttributeValue);
        return;
      }

      inputValue = parentEl.find('.number-input').val();
      parentEl.find('.number-input').val(++inputValue);
    });
    /* decrementer functionality */

    decrementerEl$.click(function () {
      var parentEl = $(this).parent();
      inputValue = parentEl.find('.number-input').val();

      if (minAttributeValue) {
        if (minAttributeValue == inputValue) {
          return;
        }
      }

      if (stepAttributeValue) {
        inputValue = parentEl.find('.number-input').val();
        parentEl.find('.number-input').val(+inputValue - +stepAttributeValue);
        return;
      }

      inputValue = parentEl.find('.number-input').val();
      parentEl.find('.number-input').val(--inputValue);
    });
    numberInput$.change(function () {
      if (!maxAttributeValue || !minAttributeValue) return;
      var currentValue = $(this).val();

      if (+currentValue > +maxAttributeValue) {
        $(this).val(maxAttributeValue);
        return;
      }

      if (+currentValue < +minAttributeValue) {
        $(this).val(minAttributeValue);
        return;
      }
    });
  };

  $.fn.getSpinnerValue = function () {
    return $(this).find('.number-input').val();
  }; // if((parentEl.find('.number-input').val(0));{
  //     decrementerEl$.css({"opacity": "0.38"})
  // };
  // else {decrementerEl$.css({"opacity": "0"})   };
  // if ($.fn.getSpinnerValue =0){
  //     decrementerEl$.css({"opacity": "0.38"})
  // };

})(jQuery);
},{}],"../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64566" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/blocks/dropdown-guests/spin-number-plugin.js"], null)
//# sourceMappingURL=/spin-number-plugin.7a3bf841.js.map