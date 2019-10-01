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
})({"src/scripts/pagination.min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * pagination.js 2.1.4
 * A jQuery plugin to provide simple yet fully customisable pagination
 * https://github.com/superRaytin/paginationjs

 * Homepage: http://pagination.js.org
 *
 * Copyright 2014-2100, superRaytin
 * Released under the MIT license.
*/
!function (a, b) {
  function c(a) {
    throw new Error("Pagination: " + a);
  }

  function d(a) {
    a.dataSource || c('"dataSource" is required.'), "string" == typeof a.dataSource ? void 0 === a.totalNumberLocator ? void 0 === a.totalNumber ? c('"totalNumber" is required.') : b.isNumeric(a.totalNumber) || c('"totalNumber" is incorrect. (Number)') : b.isFunction(a.totalNumberLocator) || c('"totalNumberLocator" should be a Function.') : i.isObject(a.dataSource) && (void 0 === a.locator ? c('"dataSource" is an Object, please specify "locator".') : "string" == typeof a.locator || b.isFunction(a.locator) || c(a.locator + " is incorrect. (String | Function)")), void 0 === a.formatResult || b.isFunction(a.formatResult) || c('"formatResult" should be a Function.');
  }

  function e(a) {
    var c = ["go", "previous", "next", "disable", "enable", "refresh", "show", "hide", "destroy"];
    b.each(c, function (b, c) {
      a.off(h + c);
    }), a.data("pagination", {}), b(".paginationjs", a).remove();
  }

  function f(a, b) {
    return ("object" == (b = _typeof(a)) ? null == a && "null" || Object.prototype.toString.call(a).slice(8, -1) : b).toLowerCase();
  }

  void 0 === b && c("Pagination requires jQuery.");
  var g = "pagination",
      h = "__pagination-";
  b.fn.pagination && (g = "pagination2"), b.fn[g] = function (f) {
    if (void 0 === f) return this;
    var j = b(this),
        k = b.extend({}, b.fn[g].defaults, f),
        l = {
      initialize: function initialize() {
        var a = this;

        if (j.data("pagination") || j.data("pagination", {}), !1 !== a.callHook("beforeInit")) {
          j.data("pagination").initialized && b(".paginationjs", j).remove(), a.disabled = !!k.disabled;
          var c = a.model = {
            pageRange: k.pageRange,
            pageSize: k.pageSize
          };
          a.parseDataSource(k.dataSource, function (b) {
            if (a.isAsync = i.isString(b), i.isArray(b) && (c.totalNumber = k.totalNumber = b.length), a.isDynamicTotalNumber = a.isAsync && k.totalNumberLocator, !(k.hideWhenLessThanOnePage && a.getTotalPage() <= 1)) {
              var d = a.render(!0);
              k.className && d.addClass(k.className), c.el = d, j["bottom" === k.position ? "append" : "prepend"](d), a.observer(), j.data("pagination").initialized = !0, a.callHook("afterInit", d);
            }
          });
        }
      },
      render: function render(a) {
        var c = this,
            d = c.model,
            e = d.el || b('<div class="paginationjs"></div>'),
            f = !0 !== a;
        c.callHook("beforeRender", f);
        var g = d.pageNumber || k.pageNumber,
            h = k.pageRange,
            i = c.getTotalPage(),
            j = g - h,
            l = g + h;
        return l > i && (l = i, j = i - 2 * h, j = j < 1 ? 1 : j), j <= 1 && (j = 1, l = Math.min(2 * h + 1, i)), e.html(c.generateHTML({
          currentPage: g,
          pageRange: h,
          rangeStart: j,
          rangeEnd: l
        })), c.callHook("afterRender", f), e;
      },
      generateHTML: function generateHTML(a) {
        var c,
            d,
            e = this,
            f = a.currentPage,
            g = e.getTotalPage(),
            h = a.rangeStart,
            i = a.rangeEnd,
            j = e.getTotalNumber(),
            l = k.showPrevious,
            m = k.showNext,
            n = k.showPageNumbers,
            o = k.showNavigator,
            p = k.showGoInput,
            q = k.showGoButton,
            r = k.pageLink,
            s = k.prevText,
            t = k.nextText,
            u = k.ellipsisText,
            v = k.goButtonText,
            w = k.classPrefix,
            x = k.activeClassName,
            y = k.disableClassName,
            z = k.ulClassName,
            A = "",
            B = '<input type="text" class="J-paginationjs-go-pagenumber">',
            C = '<input type="button" class="J-paginationjs-go-button" value="' + v + '">',
            D = b.isFunction(k.formatNavigator) ? k.formatNavigator(f, g, j) : k.formatNavigator,
            E = b.isFunction(k.formatGoInput) ? k.formatGoInput(B, f, g, j) : k.formatGoInput,
            F = b.isFunction(k.formatGoButton) ? k.formatGoButton(C, f, g, j) : k.formatGoButton,
            G = b.isFunction(k.autoHidePrevious) ? k.autoHidePrevious() : k.autoHidePrevious,
            H = b.isFunction(k.autoHideNext) ? k.autoHideNext() : k.autoHideNext,
            I = b.isFunction(k.header) ? k.header(f, g, j) : k.header,
            J = b.isFunction(k.footer) ? k.footer(f, g, j) : k.footer;

        if (I && (c = e.replaceVariables(I, {
          currentPage: f,
          totalPage: g,
          totalNumber: j
        }), A += c), l || n || m) {
          if (A += '<div class="paginationjs-pages">', A += z ? '<ul class="' + z + '">' : "<ul>", l && (f <= 1 ? G || (A += '<li class="' + w + "-prev " + y + '"><a>' + s + "</a></li>") : A += '<li class="' + w + '-prev J-paginationjs-previous" data-num="' + (f - 1) + '" title="Previous page"><a href="' + r + '">' + s + "</a></li>"), n) {
            if (h <= 3) for (d = 1; d < h; d++) {
              A += d == f ? '<li class="' + w + "-page J-paginationjs-page " + x + '" data-num="' + d + '"><a>' + d + "</a></li>" : '<li class="' + w + '-page J-paginationjs-page" data-num="' + d + '"><a href="' + r + '">' + d + "</a></li>";
            } else k.showFirstOnEllipsisShow && (A += '<li class="' + w + "-page " + w + '-first J-paginationjs-page" data-num="1"><a href="' + r + '">1</a></li>'), A += '<li class="' + w + "-ellipsis " + y + '"><a>' + u + "</a></li>";

            for (d = h; d <= i; d++) {
              A += d == f ? '<li class="' + w + "-page J-paginationjs-page " + x + '" data-num="' + d + '"><a>' + d + "</a></li>" : '<li class="' + w + '-page J-paginationjs-page" data-num="' + d + '"><a href="' + r + '">' + d + "</a></li>";
            }

            if (i >= g - 2) for (d = i + 1; d <= g; d++) {
              A += '<li class="' + w + '-page J-paginationjs-page" data-num="' + d + '"><a href="' + r + '">' + d + "</a></li>";
            } else A += '<li class="' + w + "-ellipsis " + y + '"><a>' + u + "</a></li>", k.showLastOnEllipsisShow && (A += '<li class="' + w + "-page " + w + '-last J-paginationjs-page" data-num="' + g + '"><a href="' + r + '">' + g + "</a></li>");
          }

          m && (f >= g ? H || (A += '<li class="' + w + "-next " + y + '"><a>' + t + "</a></li>") : A += '<li class="' + w + '-next J-paginationjs-next" data-num="' + (f + 1) + '" title="Next page"><a href="' + r + '">' + t + "</a></li>"), A += "</ul></div>";
        }

        return o && D && (c = e.replaceVariables(D, {
          currentPage: f,
          totalPage: g,
          totalNumber: j
        }), A += '<div class="' + w + '-nav J-paginationjs-nav">' + c + "</div>"), p && E && (c = e.replaceVariables(E, {
          currentPage: f,
          totalPage: g,
          totalNumber: j,
          input: B
        }), A += '<div class="' + w + '-go-input">' + c + "</div>"), q && F && (c = e.replaceVariables(F, {
          currentPage: f,
          totalPage: g,
          totalNumber: j,
          button: C
        }), A += '<div class="' + w + '-go-button">' + c + "</div>"), J && (c = e.replaceVariables(J, {
          currentPage: f,
          totalPage: g,
          totalNumber: j
        }), A += c), A;
      },
      findTotalNumberFromRemoteResponse: function findTotalNumberFromRemoteResponse(a) {
        this.model.totalNumber = k.totalNumberLocator(a);
      },
      go: function go(a, c) {
        function d(a) {
          if (!1 === e.callHook("beforePaging", g)) return !1;

          if (f.direction = void 0 === f.pageNumber ? 0 : g > f.pageNumber ? 1 : -1, f.pageNumber = g, e.render(), e.disabled && e.isAsync && e.enable(), j.data("pagination").model = f, k.formatResult) {
            var d = b.extend(!0, [], a);
            i.isArray(a = k.formatResult(d)) || (a = d);
          }

          j.data("pagination").currentPageData = a, e.doCallback(a, c), e.callHook("afterPaging", g), 1 == g && e.callHook("afterIsFirstPage"), g == e.getTotalPage() && e.callHook("afterIsLastPage");
        }

        var e = this,
            f = e.model;

        if (!e.disabled) {
          var g = a;

          if ((g = parseInt(g)) && !(g < 1)) {
            var h = k.pageSize,
                l = e.getTotalNumber(),
                m = e.getTotalPage();

            if (!(l > 0 && g > m)) {
              if (!e.isAsync) return void d(e.getDataFragment(g));
              var n = {},
                  o = k.alias || {};
              n[o.pageSize ? o.pageSize : "pageSize"] = h, n[o.pageNumber ? o.pageNumber : "pageNumber"] = g;
              var p = b.isFunction(k.ajax) ? k.ajax() : k.ajax,
                  q = {
                type: "get",
                cache: !1,
                data: {},
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                dataType: "json",
                async: !0
              };
              b.extend(!0, q, p), b.extend(q.data, n), q.url = k.dataSource, q.success = function (a) {
                e.isDynamicTotalNumber ? e.findTotalNumberFromRemoteResponse(a) : e.model.totalNumber = k.totalNumber, d(e.filterDataByLocator(a));
              }, q.error = function (a, b, c) {
                k.formatAjaxError && k.formatAjaxError(a, b, c), e.enable();
              }, e.disable(), b.ajax(q);
            }
          }
        }
      },
      doCallback: function doCallback(a, c) {
        var d = this,
            e = d.model;
        b.isFunction(c) ? c(a, e) : b.isFunction(k.callback) && k.callback(a, e);
      },
      destroy: function destroy() {
        !1 !== this.callHook("beforeDestroy") && (this.model.el.remove(), j.off(), b("#paginationjs-style").remove(), this.callHook("afterDestroy"));
      },
      previous: function previous(a) {
        this.go(this.model.pageNumber - 1, a);
      },
      next: function next(a) {
        this.go(this.model.pageNumber + 1, a);
      },
      disable: function disable() {
        var a = this,
            b = a.isAsync ? "async" : "sync";
        !1 !== a.callHook("beforeDisable", b) && (a.disabled = !0, a.model.disabled = !0, a.callHook("afterDisable", b));
      },
      enable: function enable() {
        var a = this,
            b = a.isAsync ? "async" : "sync";
        !1 !== a.callHook("beforeEnable", b) && (a.disabled = !1, a.model.disabled = !1, a.callHook("afterEnable", b));
      },
      refresh: function refresh(a) {
        this.go(this.model.pageNumber, a);
      },
      show: function show() {
        var a = this;
        a.model.el.is(":visible") || a.model.el.show();
      },
      hide: function hide() {
        var a = this;
        a.model.el.is(":visible") && a.model.el.hide();
      },
      replaceVariables: function replaceVariables(a, b) {
        var c;

        for (var d in b) {
          var e = b[d],
              f = new RegExp("<%=\\s*" + d + "\\s*%>", "img");
          c = (c || a).replace(f, e);
        }

        return c;
      },
      getDataFragment: function getDataFragment(a) {
        var b = k.pageSize,
            c = k.dataSource,
            d = this.getTotalNumber(),
            e = b * (a - 1) + 1,
            f = Math.min(a * b, d);
        return c.slice(e - 1, f);
      },
      getTotalNumber: function getTotalNumber() {
        return this.model.totalNumber || k.totalNumber || 0;
      },
      getTotalPage: function getTotalPage() {
        return Math.ceil(this.getTotalNumber() / k.pageSize);
      },
      getLocator: function getLocator(a) {
        var d;
        return "string" == typeof a ? d = a : b.isFunction(a) ? d = a() : c('"locator" is incorrect. (String | Function)'), d;
      },
      filterDataByLocator: function filterDataByLocator(a) {
        var d,
            e = this.getLocator(k.locator);

        if (i.isObject(a)) {
          try {
            b.each(e.split("."), function (b, c) {
              d = (d || a)[c];
            });
          } catch (a) {}

          d ? i.isArray(d) || c("dataSource." + e + " must be an Array.") : c("dataSource." + e + " is undefined.");
        }

        return d || a;
      },
      parseDataSource: function parseDataSource(a, d) {
        var e = this;
        i.isObject(a) ? d(k.dataSource = e.filterDataByLocator(a)) : i.isArray(a) ? d(k.dataSource = a) : b.isFunction(a) ? k.dataSource(function (a) {
          i.isArray(a) || c('The parameter of "done" Function should be an Array.'), e.parseDataSource.call(e, a, d);
        }) : "string" == typeof a ? (/^https?|file:/.test(a) && (k.ajaxDataType = "jsonp"), d(a)) : c('Unexpected type of "dataSource".');
      },
      callHook: function callHook(c) {
        var d,
            e = j.data("pagination"),
            f = Array.prototype.slice.apply(arguments);
        return f.shift(), k[c] && b.isFunction(k[c]) && !1 === k[c].apply(a, f) && (d = !1), e.hooks && e.hooks[c] && b.each(e.hooks[c], function (b, c) {
          !1 === c.apply(a, f) && (d = !1);
        }), !1 !== d;
      },
      observer: function observer() {
        var a = this,
            d = a.model.el;
        j.on(h + "go", function (d, e, f) {
          (e = parseInt(b.trim(e))) && (b.isNumeric(e) || c('"pageNumber" is incorrect. (Number)'), a.go(e, f));
        }), d.delegate(".J-paginationjs-page", "click", function (c) {
          var d = b(c.currentTarget),
              e = b.trim(d.attr("data-num"));
          if (e && !d.hasClass(k.disableClassName) && !d.hasClass(k.activeClassName)) return !1 !== a.callHook("beforePageOnClick", c, e) && (a.go(e), a.callHook("afterPageOnClick", c, e), !!k.pageLink && void 0);
        }), d.delegate(".J-paginationjs-previous", "click", function (c) {
          var d = b(c.currentTarget),
              e = b.trim(d.attr("data-num"));
          if (e && !d.hasClass(k.disableClassName)) return !1 !== a.callHook("beforePreviousOnClick", c, e) && (a.go(e), a.callHook("afterPreviousOnClick", c, e), !!k.pageLink && void 0);
        }), d.delegate(".J-paginationjs-next", "click", function (c) {
          var d = b(c.currentTarget),
              e = b.trim(d.attr("data-num"));
          if (e && !d.hasClass(k.disableClassName)) return !1 !== a.callHook("beforeNextOnClick", c, e) && (a.go(e), a.callHook("afterNextOnClick", c, e), !!k.pageLink && void 0);
        }), d.delegate(".J-paginationjs-go-button", "click", function (c) {
          var e = b(".J-paginationjs-go-pagenumber", d).val();
          if (!1 === a.callHook("beforeGoButtonOnClick", c, e)) return !1;
          j.trigger(h + "go", e), a.callHook("afterGoButtonOnClick", c, e);
        }), d.delegate(".J-paginationjs-go-pagenumber", "keyup", function (c) {
          if (13 === c.which) {
            var e = b(c.currentTarget).val();
            if (!1 === a.callHook("beforeGoInputOnEnter", c, e)) return !1;
            j.trigger(h + "go", e), b(".J-paginationjs-go-pagenumber", d).focus(), a.callHook("afterGoInputOnEnter", c, e);
          }
        }), j.on(h + "previous", function (b, c) {
          a.previous(c);
        }), j.on(h + "next", function (b, c) {
          a.next(c);
        }), j.on(h + "disable", function () {
          a.disable();
        }), j.on(h + "enable", function () {
          a.enable();
        }), j.on(h + "refresh", function (b, c) {
          a.refresh(c);
        }), j.on(h + "show", function () {
          a.show();
        }), j.on(h + "hide", function () {
          a.hide();
        }), j.on(h + "destroy", function () {
          a.destroy();
        });
        var e = Math.max(a.getTotalPage(), 1),
            f = k.pageNumber;
        a.isDynamicTotalNumber && (f = 1), k.triggerPagingOnInit && j.trigger(h + "go", Math.min(f, e));
      }
    };

    if (j.data("pagination") && !0 === j.data("pagination").initialized) {
      if (b.isNumeric(f)) return j.trigger.call(this, h + "go", f, arguments[1]), this;

      if ("string" == typeof f) {
        var m = Array.prototype.slice.apply(arguments);

        switch (m[0] = h + m[0], f) {
          case "previous":
          case "next":
          case "go":
          case "disable":
          case "enable":
          case "refresh":
          case "show":
          case "hide":
          case "destroy":
            j.trigger.apply(this, m);
            break;

          case "getSelectedPageNum":
            return j.data("pagination").model ? j.data("pagination").model.pageNumber : j.data("pagination").attributes.pageNumber;

          case "getTotalPage":
            return Math.ceil(j.data("pagination").model.totalNumber / j.data("pagination").model.pageSize);

          case "getSelectedPageData":
            return j.data("pagination").currentPageData;

          case "isDisabled":
            return !0 === j.data("pagination").model.disabled;

          default:
            c("Unknown action: " + f);
        }

        return this;
      }

      e(j);
    } else i.isObject(f) || c("Illegal options");

    return d(k), l.initialize(), this;
  }, b.fn[g].defaults = {
    totalNumber: 0,
    pageNumber: 1,
    pageSize: 10,
    pageRange: 2,
    showPrevious: !0,
    showNext: !0,
    showPageNumbers: !0,
    showNavigator: !1,
    showGoInput: !1,
    showGoButton: !1,
    pageLink: "",
    prevText: "&laquo;",
    nextText: "&raquo;",
    ellipsisText: "...",
    goButtonText: "Go",
    classPrefix: "paginationjs",
    activeClassName: "active",
    disableClassName: "disabled",
    inlineStyle: !0,
    formatNavigator: "<%= currentPage %> / <%= totalPage %>",
    formatGoInput: "<%= input %>",
    formatGoButton: "<%= button %>",
    position: "bottom",
    autoHidePrevious: !1,
    autoHideNext: !1,
    triggerPagingOnInit: !0,
    hideWhenLessThanOnePage: !1,
    showFirstOnEllipsisShow: !0,
    showLastOnEllipsisShow: !0,
    callback: function callback() {}
  }, b.fn.addHook = function (a, d) {
    arguments.length < 2 && c("Missing argument."), b.isFunction(d) || c("callback must be a function.");
    var e = b(this),
        f = e.data("pagination");
    f || (e.data("pagination", {}), f = e.data("pagination")), !f.hooks && (f.hooks = {}), f.hooks[a] = f.hooks[a] || [], f.hooks[a].push(d);
  }, b[g] = function (a, d) {
    arguments.length < 2 && c("Requires two parameters.");
    var e;
    if (e = "string" != typeof a && a instanceof jQuery ? a : b(a), e.length) return e.pagination(d), e;
  };
  var i = {};
  b.each(["Object", "Array", "String"], function (a, b) {
    i["is" + b] = function (a) {
      return f(a) === b.toLowerCase();
    };
  }), "function" == typeof define && define.amd && define(function () {
    return b;
  });
}(this, window.jQuery);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62400" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/scripts/pagination.min.js"], null)
//# sourceMappingURL=/pagination.min.d173a32e.js.map