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
})({"src/scripts/paginationjs/dist/pagination.js":[function(require,module,exports) {
var global = arguments[3];
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * pagination.js 2.1.4
 * A jQuery plugin to provide simple yet fully customisable pagination.
 * https://github.com/superRaytin/paginationjs
 *
 * Homepage: http://pagination.js.org
 *
 * Copyright 2014-2100, superRaytin
 * Released under the MIT license.
 */
(function (global, $) {
  if (typeof $ === 'undefined') {
    throwError('Pagination requires jQuery.');
  }

  var pluginName = 'pagination';
  var pluginHookMethod = 'addHook';
  var eventPrefix = '__pagination-'; // Conflict, use backup

  if ($.fn.pagination) {
    pluginName = 'pagination2';
  }

  $.fn[pluginName] = function (options) {
    if (typeof options === 'undefined') {
      return this;
    }

    var container = $(this);
    var attributes = $.extend({}, $.fn[pluginName].defaults, options);
    var pagination = {
      initialize: function initialize() {
        var self = this; // Cache attributes of current instance

        if (!container.data('pagination')) {
          container.data('pagination', {});
        }

        if (self.callHook('beforeInit') === false) return; // Pagination has been initialized, destroy it

        if (container.data('pagination').initialized) {
          $('.paginationjs', container).remove();
        } // Whether to disable Pagination at the initialization


        self.disabled = !!attributes.disabled; // Model will be passed to the callback function

        var model = self.model = {
          pageRange: attributes.pageRange,
          pageSize: attributes.pageSize
        }; // dataSource`s type is unknown, parse it to find true data

        self.parseDataSource(attributes.dataSource, function (dataSource) {
          // Currently in asynchronous mode
          self.isAsync = Helpers.isString(dataSource);

          if (Helpers.isArray(dataSource)) {
            model.totalNumber = attributes.totalNumber = dataSource.length;
          } // Currently in asynchronous mode and a totalNumberLocator is specified


          self.isDynamicTotalNumber = self.isAsync && attributes.totalNumberLocator; // There is only one page

          if (attributes.hideWhenLessThanOnePage) {
            if (self.getTotalPage() <= 1) return;
          }

          var el = self.render(true); // Add extra className to the pagination element

          if (attributes.className) {
            el.addClass(attributes.className);
          }

          model.el = el; // Append/prepend pagination element to the container

          container[attributes.position === 'bottom' ? 'append' : 'prepend'](el); // Bind events

          self.observer(); // Pagination is currently initialized

          container.data('pagination').initialized = true; // Will be invoked after initialized

          self.callHook('afterInit', el);
        });
      },
      render: function render(isBoot) {
        var self = this;
        var model = self.model;
        var el = model.el || $('<div class="paginationjs"></div>');
        var isForced = isBoot !== true;
        self.callHook('beforeRender', isForced);
        var currentPage = model.pageNumber || attributes.pageNumber;
        var pageRange = attributes.pageRange;
        var totalPage = self.getTotalPage();
        var rangeStart = currentPage - pageRange;
        var rangeEnd = currentPage + pageRange;

        if (rangeEnd > totalPage) {
          rangeEnd = totalPage;
          rangeStart = totalPage - pageRange * 2;
          rangeStart = rangeStart < 1 ? 1 : rangeStart;
        }

        if (rangeStart <= 1) {
          rangeStart = 1;
          rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
        }

        el.html(self.generateHTML({
          currentPage: currentPage,
          pageRange: pageRange,
          rangeStart: rangeStart,
          rangeEnd: rangeEnd
        }));
        self.callHook('afterRender', isForced);
        return el;
      },
      // Generate HTML content from the template
      generateHTML: function generateHTML(args) {
        var self = this;
        var currentPage = args.currentPage;
        var totalPage = self.getTotalPage();
        var rangeStart = args.rangeStart;
        var rangeEnd = args.rangeEnd;
        var totalNumber = self.getTotalNumber();
        var showPrevious = attributes.showPrevious;
        var showNext = attributes.showNext;
        var showPageNumbers = attributes.showPageNumbers;
        var showNavigator = attributes.showNavigator;
        var showGoInput = attributes.showGoInput;
        var showGoButton = attributes.showGoButton;
        var pageLink = attributes.pageLink;
        var prevText = attributes.prevText;
        var nextText = attributes.nextText;
        var ellipsisText = attributes.ellipsisText;
        var goButtonText = attributes.goButtonText;
        var classPrefix = attributes.classPrefix;
        var activeClassName = attributes.activeClassName;
        var disableClassName = attributes.disableClassName;
        var ulClassName = attributes.ulClassName;
        var html = '';
        var goInput = '<input type="text" class="J-paginationjs-go-pagenumber">';
        var goButton = '<input type="button" class="J-paginationjs-go-button" value="' + goButtonText + '">';
        var formattedString;
        var i;
        var formatNavigator = $.isFunction(attributes.formatNavigator) ? attributes.formatNavigator(currentPage, totalPage, totalNumber) : attributes.formatNavigator;
        var formatGoInput = $.isFunction(attributes.formatGoInput) ? attributes.formatGoInput(goInput, currentPage, totalPage, totalNumber) : attributes.formatGoInput;
        var formatGoButton = $.isFunction(attributes.formatGoButton) ? attributes.formatGoButton(goButton, currentPage, totalPage, totalNumber) : attributes.formatGoButton;
        var autoHidePrevious = $.isFunction(attributes.autoHidePrevious) ? attributes.autoHidePrevious() : attributes.autoHidePrevious;
        var autoHideNext = $.isFunction(attributes.autoHideNext) ? attributes.autoHideNext() : attributes.autoHideNext;
        var header = $.isFunction(attributes.header) ? attributes.header(currentPage, totalPage, totalNumber) : attributes.header;
        var footer = $.isFunction(attributes.footer) ? attributes.footer(currentPage, totalPage, totalNumber) : attributes.footer; // Whether to display header

        if (header) {
          formattedString = self.replaceVariables(header, {
            currentPage: currentPage,
            totalPage: totalPage,
            totalNumber: totalNumber
          });
          html += formattedString;
        }

        if (showPrevious || showPageNumbers || showNext) {
          html += '<div class="paginationjs-pages">';

          if (ulClassName) {
            html += '<ul class="' + ulClassName + '">';
          } else {
            html += '<ul>';
          } // Whether to display the Previous button


          if (showPrevious) {
            if (currentPage <= 1) {
              if (!autoHidePrevious) {
                html += '<li class="' + classPrefix + '-prev ' + disableClassName + '"><a>' + prevText + '<\/a><\/li>';
              }
            } else {
              html += '<li class="' + classPrefix + '-prev J-paginationjs-previous" data-num="' + (currentPage - 1) + '" title="Previous page"><a href="' + pageLink + '">' + prevText + '<\/a><\/li>';
            }
          } // Whether to display the pages


          if (showPageNumbers) {
            if (rangeStart <= 3) {
              for (i = 1; i < rangeStart; i++) {
                if (i == currentPage) {
                  html += '<li class="' + classPrefix + '-page J-paginationjs-page ' + activeClassName + '" data-num="' + i + '"><a>' + i + '<\/a><\/li>';
                } else {
                  html += '<li class="' + classPrefix + '-page J-paginationjs-page" data-num="' + i + '"><a href="' + pageLink + '">' + i + '<\/a><\/li>';
                }
              }
            } else {
              if (attributes.showFirstOnEllipsisShow) {
                html += '<li class="' + classPrefix + '-page ' + classPrefix + '-first J-paginationjs-page" data-num="1"><a href="' + pageLink + '">1<\/a><\/li>';
              }

              html += '<li class="' + classPrefix + '-ellipsis ' + disableClassName + '"><a>' + ellipsisText + '<\/a><\/li>';
            }

            for (i = rangeStart; i <= rangeEnd; i++) {
              if (i == currentPage) {
                html += '<li class="' + classPrefix + '-page J-paginationjs-page ' + activeClassName + '" data-num="' + i + '"><a>' + i + '<\/a><\/li>';
              } else {
                html += '<li class="' + classPrefix + '-page J-paginationjs-page" data-num="' + i + '"><a href="' + pageLink + '">' + i + '<\/a><\/li>';
              }
            }

            if (rangeEnd >= totalPage - 2) {
              for (i = rangeEnd + 1; i <= totalPage; i++) {
                html += '<li class="' + classPrefix + '-page J-paginationjs-page" data-num="' + i + '"><a href="' + pageLink + '">' + i + '<\/a><\/li>';
              }
            } else {
              html += '<li class="' + classPrefix + '-ellipsis ' + disableClassName + '"><a>' + ellipsisText + '<\/a><\/li>';

              if (attributes.showLastOnEllipsisShow) {
                html += '<li class="' + classPrefix + '-page ' + classPrefix + '-last J-paginationjs-page" data-num="' + totalPage + '"><a href="' + pageLink + '">' + totalPage + '<\/a><\/li>';
              }
            }
          } // Whether to display the Next button


          if (showNext) {
            if (currentPage >= totalPage) {
              if (!autoHideNext) {
                html += '<li class="' + classPrefix + '-next ' + disableClassName + '"><a>' + nextText + '<\/a><\/li>';
              }
            } else {
              html += '<li class="' + classPrefix + '-next J-paginationjs-next" data-num="' + (currentPage + 1) + '" title="Next page"><a href="' + pageLink + '">' + nextText + '<\/a><\/li>';
            }
          }

          html += '<\/ul><\/div>';
        } // Whether to display the navigator


        if (showNavigator) {
          if (formatNavigator) {
            formattedString = self.replaceVariables(formatNavigator, {
              currentPage: currentPage,
              totalPage: totalPage,
              totalNumber: totalNumber
            });
            html += '<div class="' + classPrefix + '-nav J-paginationjs-nav">' + formattedString + '<\/div>';
          }
        } // Whether to display the Go input


        if (showGoInput) {
          if (formatGoInput) {
            formattedString = self.replaceVariables(formatGoInput, {
              currentPage: currentPage,
              totalPage: totalPage,
              totalNumber: totalNumber,
              input: goInput
            });
            html += '<div class="' + classPrefix + '-go-input">' + formattedString + '</div>';
          }
        } // Whether to display the Go button


        if (showGoButton) {
          if (formatGoButton) {
            formattedString = self.replaceVariables(formatGoButton, {
              currentPage: currentPage,
              totalPage: totalPage,
              totalNumber: totalNumber,
              button: goButton
            });
            html += '<div class="' + classPrefix + '-go-button">' + formattedString + '</div>';
          }
        } // Whether to display footer


        if (footer) {
          formattedString = self.replaceVariables(footer, {
            currentPage: currentPage,
            totalPage: totalPage,
            totalNumber: totalNumber
          });
          html += formattedString;
        }

        return html;
      },
      // Find totalNumber from the remote response
      // Only available in asynchronous mode
      findTotalNumberFromRemoteResponse: function findTotalNumberFromRemoteResponse(response) {
        var self = this;
        self.model.totalNumber = attributes.totalNumberLocator(response);
      },
      // Go to the specified page
      go: function go(number, callback) {
        var self = this;
        var model = self.model;
        if (self.disabled) return;
        var pageNumber = number;
        pageNumber = parseInt(pageNumber); // Page number is out of bounds

        if (!pageNumber || pageNumber < 1) return;
        var pageSize = attributes.pageSize;
        var totalNumber = self.getTotalNumber();
        var totalPage = self.getTotalPage(); // Page number is out of bounds

        if (totalNumber > 0) {
          if (pageNumber > totalPage) return;
        } // Pick data fragment in synchronous mode


        if (!self.isAsync) {
          render(self.getDataFragment(pageNumber));
          return;
        }

        var postData = {};
        var alias = attributes.alias || {};
        postData[alias.pageSize ? alias.pageSize : 'pageSize'] = pageSize;
        postData[alias.pageNumber ? alias.pageNumber : 'pageNumber'] = pageNumber;
        var ajaxParams = $.isFunction(attributes.ajax) ? attributes.ajax() : attributes.ajax;
        var formatAjaxParams = {
          type: 'get',
          cache: false,
          data: {},
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          dataType: 'json',
          async: true
        };
        $.extend(true, formatAjaxParams, ajaxParams);
        $.extend(formatAjaxParams.data, postData);
        formatAjaxParams.url = attributes.dataSource;

        formatAjaxParams.success = function (response) {
          if (self.isDynamicTotalNumber) {
            self.findTotalNumberFromRemoteResponse(response);
          } else {
            self.model.totalNumber = attributes.totalNumber;
          }

          render(self.filterDataByLocator(response));
        };

        formatAjaxParams.error = function (jqXHR, textStatus, errorThrown) {
          attributes.formatAjaxError && attributes.formatAjaxError(jqXHR, textStatus, errorThrown);
          self.enable();
        };

        self.disable();
        $.ajax(formatAjaxParams);

        function render(data) {
          // Will be invoked before paging
          if (self.callHook('beforePaging', pageNumber) === false) return false; // Pagination direction

          model.direction = typeof model.pageNumber === 'undefined' ? 0 : pageNumber > model.pageNumber ? 1 : -1;
          model.pageNumber = pageNumber;
          self.render();

          if (self.disabled && self.isAsync) {
            // enable pagination
            self.enable();
          } // cache model data


          container.data('pagination').model = model; // format result data before callback invoked

          if (attributes.formatResult) {
            var cloneData = $.extend(true, [], data);

            if (!Helpers.isArray(data = attributes.formatResult(cloneData))) {
              data = cloneData;
            }
          }

          container.data('pagination').currentPageData = data; // invoke callback

          self.doCallback(data, callback);
          self.callHook('afterPaging', pageNumber); // pageNumber now is the first page

          if (pageNumber == 1) {
            self.callHook('afterIsFirstPage');
          } // pageNumber now is the last page


          if (pageNumber == self.getTotalPage()) {
            self.callHook('afterIsLastPage');
          }
        }
      },
      doCallback: function doCallback(data, customCallback) {
        var self = this;
        var model = self.model;

        if ($.isFunction(customCallback)) {
          customCallback(data, model);
        } else if ($.isFunction(attributes.callback)) {
          attributes.callback(data, model);
        }
      },
      destroy: function destroy() {
        // Before destroy
        if (this.callHook('beforeDestroy') === false) return;
        this.model.el.remove();
        container.off(); // Remove style element

        $('#paginationjs-style').remove(); // After destroyed

        this.callHook('afterDestroy');
      },
      previous: function previous(callback) {
        this.go(this.model.pageNumber - 1, callback);
      },
      next: function next(callback) {
        this.go(this.model.pageNumber + 1, callback);
      },
      disable: function disable() {
        var self = this;
        var source = self.isAsync ? 'async' : 'sync'; // Before disabled

        if (self.callHook('beforeDisable', source) === false) return;
        self.disabled = true;
        self.model.disabled = true; // After disabled

        self.callHook('afterDisable', source);
      },
      enable: function enable() {
        var self = this;
        var source = self.isAsync ? 'async' : 'sync'; // Before enabled

        if (self.callHook('beforeEnable', source) === false) return;
        self.disabled = false;
        self.model.disabled = false; // After enabled

        self.callHook('afterEnable', source);
      },
      refresh: function refresh(callback) {
        this.go(this.model.pageNumber, callback);
      },
      show: function show() {
        var self = this;
        if (self.model.el.is(':visible')) return;
        self.model.el.show();
      },
      hide: function hide() {
        var self = this;
        if (!self.model.el.is(':visible')) return;
        self.model.el.hide();
      },
      // Parse variables in the template
      replaceVariables: function replaceVariables(template, variables) {
        var formattedString;

        for (var key in variables) {
          var value = variables[key];
          var regexp = new RegExp('<%=\\s*' + key + '\\s*%>', 'img');
          formattedString = (formattedString || template).replace(regexp, value);
        }

        return formattedString;
      },
      // Get data fragment
      getDataFragment: function getDataFragment(number) {
        var pageSize = attributes.pageSize;
        var dataSource = attributes.dataSource;
        var totalNumber = this.getTotalNumber();
        var start = pageSize * (number - 1) + 1;
        var end = Math.min(number * pageSize, totalNumber);
        return dataSource.slice(start - 1, end);
      },
      // Get total number
      getTotalNumber: function getTotalNumber() {
        return this.model.totalNumber || attributes.totalNumber || 0;
      },
      // Get total page
      getTotalPage: function getTotalPage() {
        return Math.ceil(this.getTotalNumber() / attributes.pageSize);
      },
      // Get locator
      getLocator: function getLocator(locator) {
        var result;

        if (typeof locator === 'string') {
          result = locator;
        } else if ($.isFunction(locator)) {
          result = locator();
        } else {
          throwError('"locator" is incorrect. (String | Function)');
        }

        return result;
      },
      // Filter data by "locator"
      filterDataByLocator: function filterDataByLocator(dataSource) {
        var locator = this.getLocator(attributes.locator);
        var filteredData; // Datasource is an Object, use "locator" to locate the true data

        if (Helpers.isObject(dataSource)) {
          try {
            $.each(locator.split('.'), function (index, item) {
              filteredData = (filteredData ? filteredData : dataSource)[item];
            });
          } catch (e) {}

          if (!filteredData) {
            throwError('dataSource.' + locator + ' is undefined.');
          } else if (!Helpers.isArray(filteredData)) {
            throwError('dataSource.' + locator + ' must be an Array.');
          }
        }

        return filteredData || dataSource;
      },
      // Parse dataSource
      parseDataSource: function parseDataSource(dataSource, callback) {
        var self = this;

        if (Helpers.isObject(dataSource)) {
          callback(attributes.dataSource = self.filterDataByLocator(dataSource));
        } else if (Helpers.isArray(dataSource)) {
          callback(attributes.dataSource = dataSource);
        } else if ($.isFunction(dataSource)) {
          attributes.dataSource(function (data) {
            if (!Helpers.isArray(data)) {
              throwError('The parameter of "done" Function should be an Array.');
            }

            self.parseDataSource.call(self, data, callback);
          });
        } else if (typeof dataSource === 'string') {
          if (/^https?|file:/.test(dataSource)) {
            attributes.ajaxDataType = 'jsonp';
          }

          callback(dataSource);
        } else {
          throwError('Unexpected type of "dataSource".');
        }
      },
      callHook: function callHook(hook) {
        var paginationData = container.data('pagination');
        var result;
        var args = Array.prototype.slice.apply(arguments);
        args.shift();

        if (attributes[hook] && $.isFunction(attributes[hook])) {
          if (attributes[hook].apply(global, args) === false) {
            result = false;
          }
        }

        if (paginationData.hooks && paginationData.hooks[hook]) {
          $.each(paginationData.hooks[hook], function (index, item) {
            if (item.apply(global, args) === false) {
              result = false;
            }
          });
        }

        return result !== false;
      },
      observer: function observer() {
        var self = this;
        var el = self.model.el; // Go to specified page number

        container.on(eventPrefix + 'go', function (event, pageNumber, done) {
          pageNumber = parseInt($.trim(pageNumber));
          if (!pageNumber) return;

          if (!$.isNumeric(pageNumber)) {
            throwError('"pageNumber" is incorrect. (Number)');
          }

          self.go(pageNumber, done);
        }); // Page number button click

        el.delegate('.J-paginationjs-page', 'click', function (event) {
          var current = $(event.currentTarget);
          var pageNumber = $.trim(current.attr('data-num'));
          if (!pageNumber || current.hasClass(attributes.disableClassName) || current.hasClass(attributes.activeClassName)) return; // Before page button clicked

          if (self.callHook('beforePageOnClick', event, pageNumber) === false) return false;
          self.go(pageNumber); // After page button clicked

          self.callHook('afterPageOnClick', event, pageNumber);
          if (!attributes.pageLink) return false;
        }); // Previous button click

        el.delegate('.J-paginationjs-previous', 'click', function (event) {
          var current = $(event.currentTarget);
          var pageNumber = $.trim(current.attr('data-num'));
          if (!pageNumber || current.hasClass(attributes.disableClassName)) return; // Before previous clicked

          if (self.callHook('beforePreviousOnClick', event, pageNumber) === false) return false;
          self.go(pageNumber); // After previous clicked

          self.callHook('afterPreviousOnClick', event, pageNumber);
          if (!attributes.pageLink) return false;
        }); // Next button click

        el.delegate('.J-paginationjs-next', 'click', function (event) {
          var current = $(event.currentTarget);
          var pageNumber = $.trim(current.attr('data-num'));
          if (!pageNumber || current.hasClass(attributes.disableClassName)) return; // Before next clicked

          if (self.callHook('beforeNextOnClick', event, pageNumber) === false) return false;
          self.go(pageNumber); // After next clicked

          self.callHook('afterNextOnClick', event, pageNumber);
          if (!attributes.pageLink) return false;
        }); // Go button click

        el.delegate('.J-paginationjs-go-button', 'click', function (event) {
          var pageNumber = $('.J-paginationjs-go-pagenumber', el).val(); // Before Go button clicked

          if (self.callHook('beforeGoButtonOnClick', event, pageNumber) === false) return false;
          container.trigger(eventPrefix + 'go', pageNumber); // After Go button clicked

          self.callHook('afterGoButtonOnClick', event, pageNumber);
        }); // go input enter

        el.delegate('.J-paginationjs-go-pagenumber', 'keyup', function (event) {
          if (event.which === 13) {
            var pageNumber = $(event.currentTarget).val(); // Before Go input enter

            if (self.callHook('beforeGoInputOnEnter', event, pageNumber) === false) return false;
            container.trigger(eventPrefix + 'go', pageNumber); // Regains focus

            $('.J-paginationjs-go-pagenumber', el).focus(); // After Go input enter

            self.callHook('afterGoInputOnEnter', event, pageNumber);
          }
        }); // Previous page

        container.on(eventPrefix + 'previous', function (event, done) {
          self.previous(done);
        }); // Next page

        container.on(eventPrefix + 'next', function (event, done) {
          self.next(done);
        }); // Disable

        container.on(eventPrefix + 'disable', function () {
          self.disable();
        }); // Enable

        container.on(eventPrefix + 'enable', function () {
          self.enable();
        }); // Refresh

        container.on(eventPrefix + 'refresh', function (event, done) {
          self.refresh(done);
        }); // Show

        container.on(eventPrefix + 'show', function () {
          self.show();
        }); // Hide

        container.on(eventPrefix + 'hide', function () {
          self.hide();
        }); // Destroy

        container.on(eventPrefix + 'destroy', function () {
          self.destroy();
        }); // Whether to load the default page

        var validTotalPage = Math.max(self.getTotalPage(), 1);
        var defaultPageNumber = attributes.pageNumber; // Default pageNumber should be 1 when totalNumber is dynamic

        if (self.isDynamicTotalNumber) {
          defaultPageNumber = 1;
        }

        if (attributes.triggerPagingOnInit) {
          container.trigger(eventPrefix + 'go', Math.min(defaultPageNumber, validTotalPage));
        }
      }
    }; // Pagination has been initialized

    if (container.data('pagination') && container.data('pagination').initialized === true) {
      // Handle events
      if ($.isNumeric(options)) {
        // eg: container.pagination(5)
        container.trigger.call(this, eventPrefix + 'go', options, arguments[1]);
        return this;
      } else if (typeof options === 'string') {
        var args = Array.prototype.slice.apply(arguments);
        args[0] = eventPrefix + args[0];

        switch (options) {
          case 'previous':
          case 'next':
          case 'go':
          case 'disable':
          case 'enable':
          case 'refresh':
          case 'show':
          case 'hide':
          case 'destroy':
            container.trigger.apply(this, args);
            break;
          // Get selected page number

          case 'getSelectedPageNum':
            if (container.data('pagination').model) {
              return container.data('pagination').model.pageNumber;
            } else {
              return container.data('pagination').attributes.pageNumber;
            }

          // Get total page

          case 'getTotalPage':
            return Math.ceil(container.data('pagination').model.totalNumber / container.data('pagination').model.pageSize);
          // Get data of selected page

          case 'getSelectedPageData':
            return container.data('pagination').currentPageData;
          // Whether pagination has been disabled

          case 'isDisabled':
            return container.data('pagination').model.disabled === true;

          default:
            throwError('Unknown action: ' + options);
        }

        return this;
      } else {
        // Uninstall the old instance before initializing a new one
        uninstallPlugin(container);
      }
    } else {
      if (!Helpers.isObject(options)) throwError('Illegal options');
    } // Check parameters


    parameterChecker(attributes);
    pagination.initialize();
    return this;
  }; // Instance defaults


  $.fn[pluginName].defaults = {
    // Data source
    // Array | String | Function | Object
    //dataSource: '',
    // String | Function
    //locator: 'data',
    // Find totalNumber from remote response, the totalNumber will be ignored when totalNumberLocator is specified
    // Function
    //totalNumberLocator: function() {},
    // Total entries
    totalNumber: 0,
    // Default page
    pageNumber: 1,
    // entries of per page
    pageSize: 10,
    // Page range (pages on both sides of the current page)
    pageRange: 2,
    // Whether to display the 'Previous' button
    showPrevious: true,
    // Whether to display the 'Next' button
    showNext: true,
    // Whether to display the page buttons
    showPageNumbers: true,
    showNavigator: false,
    // Whether to display the 'Go' input
    showGoInput: false,
    // Whether to display the 'Go' button
    showGoButton: false,
    // Page link
    pageLink: '',
    // 'Previous' text
    prevText: '&laquo;',
    // 'Next' text
    nextText: '&raquo;',
    // Ellipsis text
    ellipsisText: '...',
    // 'Go' button text
    goButtonText: 'Go',
    // Additional className for Pagination element
    //className: '',
    classPrefix: 'paginationjs',
    // Default active class
    activeClassName: 'active',
    // Default disable class
    disableClassName: 'disabled',
    //ulClassName: '',
    // Whether to insert inline style
    inlineStyle: true,
    formatNavigator: '<%= currentPage %> / <%= totalPage %>',
    formatGoInput: '<%= input %>',
    formatGoButton: '<%= button %>',
    // Pagination element's position in the container
    position: 'bottom',
    // Auto hide previous button when current page is the first page
    autoHidePrevious: false,
    // Auto hide next button when current page is the last page
    autoHideNext: false,
    //header: '',
    //footer: '',
    // Aliases for custom pagination parameters
    //alias: {},
    // Whether to trigger pagination at initialization
    triggerPagingOnInit: true,
    // Whether to hide pagination when less than one page
    hideWhenLessThanOnePage: false,
    showFirstOnEllipsisShow: true,
    showLastOnEllipsisShow: true,
    // Pagination callback
    callback: function callback() {}
  }; // Hook register

  $.fn[pluginHookMethod] = function (hook, callback) {
    if (arguments.length < 2) {
      throwError('Missing argument.');
    }

    if (!$.isFunction(callback)) {
      throwError('callback must be a function.');
    }

    var container = $(this);
    var paginationData = container.data('pagination');

    if (!paginationData) {
      container.data('pagination', {});
      paginationData = container.data('pagination');
    }

    !paginationData.hooks && (paginationData.hooks = {}); //paginationData.hooks[hook] = callback;

    paginationData.hooks[hook] = paginationData.hooks[hook] || [];
    paginationData.hooks[hook].push(callback);
  }; // Static method


  $[pluginName] = function (selector, options) {
    if (arguments.length < 2) {
      throwError('Requires two parameters.');
    }

    var container; // 'selector' is a jQuery object

    if (typeof selector !== 'string' && selector instanceof jQuery) {
      container = selector;
    } else {
      container = $(selector);
    }

    if (!container.length) return;
    container.pagination(options);
    return container;
  }; // ============================================================
  // helpers
  // ============================================================


  var Helpers = {}; // Throw error

  function throwError(content) {
    throw new Error('Pagination: ' + content);
  } // Check parameters


  function parameterChecker(args) {
    if (!args.dataSource) {
      throwError('"dataSource" is required.');
    }

    if (typeof args.dataSource === 'string') {
      if (args.totalNumberLocator === undefined) {
        if (args.totalNumber === undefined) {
          throwError('"totalNumber" is required.');
        } else if (!$.isNumeric(args.totalNumber)) {
          throwError('"totalNumber" is incorrect. (Number)');
        }
      } else {
        if (!$.isFunction(args.totalNumberLocator)) {
          throwError('"totalNumberLocator" should be a Function.');
        }
      }
    } else if (Helpers.isObject(args.dataSource)) {
      if (typeof args.locator === 'undefined') {
        throwError('"dataSource" is an Object, please specify "locator".');
      } else if (typeof args.locator !== 'string' && !$.isFunction(args.locator)) {
        throwError('' + args.locator + ' is incorrect. (String | Function)');
      }
    }

    if (args.formatResult !== undefined && !$.isFunction(args.formatResult)) {
      throwError('"formatResult" should be a Function.');
    }
  } // uninstall plugin


  function uninstallPlugin(target) {
    var events = ['go', 'previous', 'next', 'disable', 'enable', 'refresh', 'show', 'hide', 'destroy']; // off events of old instance

    $.each(events, function (index, value) {
      target.off(eventPrefix + value);
    }); // reset pagination data

    target.data('pagination', {}); // remove old

    $('.paginationjs', target).remove();
  } // Object type detection


  function getObjectType(object, tmp) {
    return ((tmp = _typeof(object)) == "object" ? object == null && "null" || Object.prototype.toString.call(object).slice(8, -1) : tmp).toLowerCase();
  }

  $.each(['Object', 'Array', 'String'], function (index, name) {
    Helpers['is' + name] = function (object) {
      return getObjectType(object) === name.toLowerCase();
    };
  });
  /*
   * export via AMD or CommonJS
   * */

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return $;
    });
  }
})(this, window.jQuery);
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
},{}]},{},["../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/scripts/paginationjs/dist/pagination.js"], null)
//# sourceMappingURL=/pagination.9691a3fc.js.map