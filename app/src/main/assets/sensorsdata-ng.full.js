(function(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  } else {
    factory();
  }
}(this, (function() {
  /**
   * @fileoverview sensors analytic javascript sdk
   * @author shengyonggen@sensorsdata.cn
   * 神策数据 www.sensorsdata.cn ，长期招聘 前端SDK开发工程师 ，简历求发送到我邮箱，谢谢
   */

  var sd = {};

  /*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
  (function() {
    // A set of types used to distinguish objects from primitives.
    var objectTypes = {
      "function": true,
      "object": true
    };
    // Use the `global` object exposed by Node (including Browserify via
    // `insert-module-globals`), Narwhal, and Ringo as the default context,
    // and the `window` object in browsers. Rhino exports a `global` function
    // instead.
    var root = objectTypes[typeof window] && window || this;

    // Public: Initializes JSON 3 using the given `context` object, attaching the
    // `stringify` and `parse` functions to the specified `exports` object.
    function runInContext(context, exports) {
      context || (context = root.Object());
      exports || (exports = root.Object());

      // Native constructor aliases.
      var Number = context.Number || root.Number,
        String = context.String || root.String,
        Object = context.Object || root.Object,
        Date = context.Date || root.Date,
        SyntaxError = context.SyntaxError || root.SyntaxError,
        TypeError = context.TypeError || root.TypeError,
        Math = context.Math || root.Math,
        nativeJSON = context.JSON || root.JSON;

      // Delegate to the native `stringify` and `parse` implementations.
      if (typeof nativeJSON == "object" && nativeJSON) {
        exports.stringify = nativeJSON.stringify;
        exports.parse = nativeJSON.parse;
        exports.runInContext = runInContext;
        return exports
      }

      // Convenience aliases.
      var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty = objectProto.hasOwnProperty,
        undefined$1;

      // Internal: Contains `try...catch` logic used by other functions.
      // This prevents other functions from being deoptimized.
      function attempt(func, errorFunc) {
        try {
          func();
        } catch (exception) {
          if (errorFunc) {
            errorFunc();
          }
        }
      }

      // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
      var isExtended = new Date(-3509827334573292);
      attempt(function() {
        // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
        // results for certain dates in Opera >= 10.53.
        isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
          isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
      });

      // Internal: Determines whether the native `JSON.stringify` and `parse`
      // implementations are spec-compliant. Based on work by Ken Snyder.
      function has(name) {
        if (has[name] != null) {
          // Return cached feature test result.
          return has[name];
        }
        var isSupported;
        if (name == "bug-string-char-index") {
          // IE <= 7 doesn't support accessing string characters using square
          // bracket notation. IE 8 only supports this for primitives.
          isSupported = "a" [0] != "a";
        } else if (name == "json") {
          // Indicates whether both `JSON.stringify` and `JSON.parse` are
          // supported.
          isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
        } else if (name == "date-serialization") {
          // Indicates whether `Date`s can be serialized accurately by `JSON.stringify`.
          isSupported = has("json-stringify") && isExtended;
          if (isSupported) {
            var stringify = exports.stringify;
            attempt(function() {
              isSupported =
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            });
          }
        } else {
          var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
          // Test `JSON.stringify`.
          if (name == "json-stringify") {
            var stringify = exports.stringify,
              stringifySupported = typeof stringify == "function";
            if (stringifySupported) {
              // A test function object with a custom `toJSON` method.
              (value = function() {
                return 1;
              }).toJSON = value;
              attempt(function() {
                stringifySupported =
                  // Firefox 3.1b1 and b2 serialize string, number, and boolean
                  // primitives as object literals.
                  stringify(0) === "0" &&
                  // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                  // literals.
                  stringify(new Number()) === "0" &&
                  stringify(new String()) == '""' &&
                  // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                  // does not define a canonical JSON representation (this applies to
                  // objects with `toJSON` properties as well, *unless* they are nested
                  // within an object or array).
                  stringify(getClass) === undefined$1 &&
                  // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                  // FF 3.1b3 pass this test.
                  stringify(undefined$1) === undefined$1 &&
                  // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                  // respectively, if the value is omitted entirely.
                  stringify() === undefined$1 &&
                  // FF 3.1b1, 2 throw an error if the given value is not a number,
                  // string, array, object, Boolean, or `null` literal. This applies to
                  // objects with custom `toJSON` methods as well, unless they are nested
                  // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                  // methods entirely.
                  stringify(value) === "1" &&
                  stringify([value]) == "[1]" &&
                  // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                  // `"[null]"`.
                  stringify([undefined$1]) == "[null]" &&
                  // YUI 3.0.0b1 fails to serialize `null` literals.
                  stringify(null) == "null" &&
                  // FF 3.1b1, 2 halts serialization if an array contains a function:
                  // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                  // elides non-JSON values from objects and arrays, unless they
                  // define custom `toJSON` methods.
                  stringify([undefined$1, getClass, null]) == "[null,null,null]" &&
                  // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                  // where character escape codes are expected (e.g., `\b` => `\u0008`).
                  stringify({
                    "a": [value, true, false, null, "\x00\b\n\f\r\t"]
                  }) == serialized &&
                  // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                  stringify(null, value) === "1" &&
                  stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
              }, function() {
                stringifySupported = false;
              });
            }
            isSupported = stringifySupported;
          }
          // Test `JSON.parse`.
          if (name == "json-parse") {
            var parse = exports.parse,
              parseSupported;
            if (typeof parse == "function") {
              attempt(function() {
                // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                // Conforming implementations should also coerce the initial argument to
                // a string prior to parsing.
                if (parse("0") === 0 && !parse(false)) {
                  // Simple parsing test.
                  value = parse(serialized);
                  parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                  if (parseSupported) {
                    attempt(function() {
                      // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                      parseSupported = !parse('"\t"');
                    });
                    if (parseSupported) {
                      attempt(function() {
                        // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                        // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                        // certain octal literals.
                        parseSupported = parse("01") !== 1;
                      });
                    }
                    if (parseSupported) {
                      attempt(function() {
                        // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                        // points. These environments, along with FF 3.1b1 and 2,
                        // also allow trailing commas in JSON objects and arrays.
                        parseSupported = parse("1.") !== 1;
                      });
                    }
                  }
                }
              }, function() {
                parseSupported = false;
              });
            }
            isSupported = parseSupported;
          }
        }
        return has[name] = !!isSupported;
      }
      has["bug-string-char-index"] = has["date-serialization"] = has["json"] = has["json-stringify"] = has["json-parse"] = null;

      if (!has("json")) {
        // Common `[[Class]]` name aliases.
        var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

        // Detect incomplete support for accessing string characters by index.
        var charIndexBuggy = has("bug-string-char-index");

        // Internal: Normalizes the `for...in` iteration algorithm across
        // environments. Each enumerated key is yielded to a `callback` function.
        var forOwn = function(object, callback) {
          var size = 0,
            Properties, dontEnums, property;

          // Tests for bugs in the current environment's `for...in` algorithm. The
          // `valueOf` property inherits the non-enumerable flag from
          // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
          (Properties = function() {
            this.valueOf = 0;
          }).prototype.valueOf = 0;

          // Iterate over a new instance of the `Properties` class.
          dontEnums = new Properties();
          for (property in dontEnums) {
            // Ignore all properties inherited from `Object.prototype`.
            if (isProperty.call(dontEnums, property)) {
              size++;
            }
          }
          Properties = dontEnums = null;

          // Normalize the iteration algorithm.
          if (!size) {
            // A list of non-enumerable properties inherited from `Object.prototype`.
            dontEnums = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
            // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
            // properties.
            forOwn = function(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                property, length;
              var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
              for (property in object) {
                // Gecko <= 1.0 enumerates the `prototype` property of functions under
                // certain conditions; IE does not.
                if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                  callback(property);
                }
              }
              // Manually invoke the callback for each non-enumerable property.
              for (length = dontEnums.length; property = dontEnums[--length];) {
                if (hasProperty.call(object, property)) {
                  callback(property);
                }
              }
            };
          } else {
            // No bugs detected; use the standard `for...in` algorithm.
            forOwn = function(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                property, isConstructor;
              for (property in object) {
                if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                  callback(property);
                }
              }
              // Manually invoke the callback for the `constructor` property due to
              // cross-environment inconsistencies.
              if (isConstructor || isProperty.call(object, (property = "constructor"))) {
                callback(property);
              }
            };
          }
          return forOwn(object, callback);
        };

        // Public: Serializes a JavaScript `value` as a JSON string. The optional
        // `filter` argument may specify either a function that alters how object and
        // array members are serialized, or an array of strings and numbers that
        // indicates which properties should be serialized. The optional `width`
        // argument may be either a string or number that specifies the indentation
        // level of the output.
        if (!has("json-stringify") && !has("date-serialization")) {
          // Internal: A map of control characters and their escaped equivalents.
          var Escapes = {
            92: "\\\\",
            34: '\\"',
            8: "\\b",
            12: "\\f",
            10: "\\n",
            13: "\\r",
            9: "\\t"
          };

          // Internal: Converts `value` into a zero-padded string such that its
          // length is at least equal to `width`. The `width` must be <= 6.
          var leadingZeroes = "000000";
          var toPaddedString = function(width, value) {
            // The `|| 0` expression is necessary to work around a bug in
            // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
            return (leadingZeroes + (value || 0)).slice(-width);
          };

          // Internal: Serializes a date object.
          var serializeDate = function(value) {
            var getData, year, month, date, time, hours, minutes, seconds, milliseconds;
            // Define additional utility methods if the `Date` methods are buggy.
            if (!isExtended) {
              var floor = Math.floor;
              // A mapping between the months of the year and the number of days between
              // January 1st and the first of the respective month.
              var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
              // Internal: Calculates the number of days between the Unix epoch and the
              // first day of the given month.
              var getDay = function(year, month) {
                return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
              };
              getData = function(value) {
                // Manually compute the year, month, date, hours, minutes,
                // seconds, and milliseconds if the `getUTC*` methods are
                // buggy. Adapted from @Yaffle's `date-shim` project.
                date = floor(value / 864e5);
                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                date = 1 + date - getDay(year, month);
                // The `time` value specifies the time within the day (see ES
                // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                // to compute `A modulo B`, as the `%` operator does not
                // correspond to the `modulo` operation for negative numbers.
                time = (value % 864e5 + 864e5) % 864e5;
                // The hours, minutes, seconds, and milliseconds are obtained by
                // decomposing the time within the day. See section 15.9.1.10.
                hours = floor(time / 36e5) % 24;
                minutes = floor(time / 6e4) % 60;
                seconds = floor(time / 1e3) % 60;
                milliseconds = time % 1e3;
              };
            } else {
              getData = function(value) {
                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              };
            }
            serializeDate = function(value) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                getData(value);
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
                year = month = date = hours = minutes = seconds = milliseconds = null;
              } else {
                value = null;
              }
              return value;
            };
            return serializeDate(value);
          };

          // For environments with `JSON.stringify` but buggy date serialization,
          // we override the native `Date#toJSON` implementation with a
          // spec-compliant one.
          if (has("json-stringify") && !has("date-serialization")) {
            // Internal: the `Date#toJSON` implementation used to override the native one.
            function dateToJSON(key) {
              return serializeDate(this);
            }

            // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
            var nativeStringify = exports.stringify;
            exports.stringify = function(source, filter, width) {
              var nativeToJSON = Date.prototype.toJSON;
              Date.prototype.toJSON = dateToJSON;
              var result = nativeStringify(source, filter, width);
              Date.prototype.toJSON = nativeToJSON;
              return result;
            };
          } else {
            // Internal: Double-quotes a string `value`, replacing all ASCII control
            // characters (characters with code unit values between 0 and 31) with
            // their escaped equivalents. This is an implementation of the
            // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
            var unicodePrefix = "\\u00";
            var escapeChar = function(character) {
              var charCode = character.charCodeAt(0),
                escaped = Escapes[charCode];
              if (escaped) {
                return escaped;
              }
              return unicodePrefix + toPaddedString(2, charCode.toString(16));
            };
            var reEscape = /[\x00-\x1f\x22\x5c]/g;
            var quote = function(value) {
              reEscape.lastIndex = 0;
              return '"' +
                (
                  reEscape.test(value) ?
                  value.replace(reEscape, escapeChar) :
                  value
                ) +
                '"';
            };

            // Internal: Recursively serializes an object. Implements the
            // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
            var serialize = function(property, object, callback, properties, whitespace, indentation, stack) {
              var value, type, className, results, element, index, length, prefix, result;
              attempt(function() {
                // Necessary for host object support.
                value = object[property];
              });
              if (typeof value == "object" && value) {
                if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date.prototype.toJSON) {
                  value = serializeDate(value);
                } else if (typeof value.toJSON == "function") {
                  value = value.toJSON(property);
                }
              }
              if (callback) {
                // If a replacement function was provided, call it to obtain the value
                // for serialization.
                value = callback.call(object, property, value);
              }
              // Exit early if value is `undefined` or `null`.
              if (value == undefined$1) {
                return value === undefined$1 ? value : "null";
              }
              type = typeof value;
              // Only call `getClass` if the value is an object.
              if (type == "object") {
                className = getClass.call(value);
              }
              switch (className || type) {
                case "boolean":
                case booleanClass:
                  // Booleans are represented literally.
                  return "" + value;
                case "number":
                case numberClass:
                  // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                  // `"null"`.
                  return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
                case "string":
                case stringClass:
                  // Strings are double-quoted and escaped.
                  return quote("" + value);
              }
              // Recursively serialize objects and arrays.
              if (typeof value == "object") {
                // Check for cyclic structures. This is a linear search; performance
                // is inversely proportional to the number of unique nested objects.
                for (length = stack.length; length--;) {
                  if (stack[length] === value) {
                    // Cyclic structures cannot be serialized by `JSON.stringify`.
                    throw TypeError();
                  }
                }
                // Add the object to the stack of traversed objects.
                stack.push(value);
                results = [];
                // Save the current indentation level and indent one additional level.
                prefix = indentation;
                indentation += whitespace;
                if (className == arrayClass) {
                  // Recursively serialize array elements.
                  for (index = 0, length = value.length; index < length; index++) {
                    element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                    results.push(element === undefined$1 ? "null" : element);
                  }
                  result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
                } else {
                  // Recursively serialize object members. Members are selected from
                  // either a user-specified list of property names, or the object
                  // itself.
                  forOwn(properties || value, function(property) {
                    var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                    if (element !== undefined$1) {
                      // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                      // is not the empty string, let `member` {quote(property) + ":"}
                      // be the concatenation of `member` and the `space` character."
                      // The "`space` character" refers to the literal space
                      // character, not the `space` {width} argument provided to
                      // `JSON.stringify`.
                      results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                    }
                  });
                  result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
                }
                // Remove the object from the traversed object stack.
                stack.pop();
                return result;
              }
            };

            // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
            exports.stringify = function(source, filter, width) {
              var whitespace, callback, properties, className;
              if (objectTypes[typeof filter] && filter) {
                className = getClass.call(filter);
                if (className == functionClass) {
                  callback = filter;
                } else if (className == arrayClass) {
                  // Convert the property names array into a makeshift set.
                  properties = {};
                  for (var index = 0, length = filter.length, value; index < length;) {
                    value = filter[index++];
                    className = getClass.call(value);
                    if (className == "[object String]" || className == "[object Number]") {
                      properties[value] = 1;
                    }
                  }
                }
              }
              if (width) {
                className = getClass.call(width);
                if (className == numberClass) {
                  // Convert the `width` to an integer and create a string containing
                  // `width` number of space characters.
                  if ((width -= width % 1) > 0) {
                    if (width > 10) {
                      width = 10;
                    }
                    for (whitespace = ""; whitespace.length < width;) {
                      whitespace += " ";
                    }
                  }
                } else if (className == stringClass) {
                  whitespace = width.length <= 10 ? width : width.slice(0, 10);
                }
              }
              // Opera <= 7.54u2 discards the values associated with empty string keys
              // (`""`) only if they are used directly within an object member list
              // (e.g., `!("" in { "": 1})`).
              return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
            };
          }
        }

        // Public: Parses a JSON source string.
        if (!has("json-parse")) {
          var fromCharCode = String.fromCharCode;

          // Internal: A map of escaped control characters and their unescaped
          // equivalents.
          var Unescapes = {
            92: "\\",
            34: '"',
            47: "/",
            98: "\b",
            116: "\t",
            110: "\n",
            102: "\f",
            114: "\r"
          };

          // Internal: Stores the parser state.
          var Index, Source;

          // Internal: Resets the parser state and throws a `SyntaxError`.
          var abort = function() {
            Index = Source = null;
            throw SyntaxError();
          };

          // Internal: Returns the next token, or `"$"` if the parser has reached
          // the end of the source string. A token may be a string, number, `null`
          // literal, or Boolean literal.
          var lex = function() {
            var source = Source,
              length = source.length,
              value, begin, position, isSigned, charCode;
            while (Index < length) {
              charCode = source.charCodeAt(Index);
              switch (charCode) {
                case 9:
                case 10:
                case 13:
                case 32:
                  // Skip whitespace tokens, including tabs, carriage returns, line
                  // feeds, and space characters.
                  Index++;
                  break;
                case 123:
                case 125:
                case 91:
                case 93:
                case 58:
                case 44:
                  // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                  // the current position.
                  value = charIndexBuggy ? source.charAt(Index) : source[Index];
                  Index++;
                  return value;
                case 34:
                  // `"` delimits a JSON string; advance to the next character and
                  // begin parsing the string. String tokens are prefixed with the
                  // sentinel `@` character to distinguish them from punctuators and
                  // end-of-string tokens.
                  for (value = "@", Index++; Index < length;) {
                    charCode = source.charCodeAt(Index);
                    if (charCode < 32) {
                      // Unescaped ASCII control characters (those with a code unit
                      // less than the space character) are not permitted.
                      abort();
                    } else if (charCode == 92) {
                      // A reverse solidus (`\`) marks the beginning of an escaped
                      // control character (including `"`, `\`, and `/`) or Unicode
                      // escape sequence.
                      charCode = source.charCodeAt(++Index);
                      switch (charCode) {
                        case 92:
                        case 34:
                        case 47:
                        case 98:
                        case 116:
                        case 110:
                        case 102:
                        case 114:
                          // Revive escaped control characters.
                          value += Unescapes[charCode];
                          Index++;
                          break;
                        case 117:
                          // `\u` marks the beginning of a Unicode escape sequence.
                          // Advance to the first character and validate the
                          // four-digit code point.
                          begin = ++Index;
                          for (position = Index + 4; Index < position; Index++) {
                            charCode = source.charCodeAt(Index);
                            // A valid sequence comprises four hexdigits (case-
                            // insensitive) that form a single hexadecimal value.
                            if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                              // Invalid Unicode escape sequence.
                              abort();
                            }
                          }
                          // Revive the escaped character.
                          value += fromCharCode("0x" + source.slice(begin, Index));
                          break;
                        default:
                          // Invalid escape sequence.
                          abort();
                      }
                    } else {
                      if (charCode == 34) {
                        // An unescaped double-quote character marks the end of the
                        // string.
                        break;
                      }
                      charCode = source.charCodeAt(Index);
                      begin = Index;
                      // Optimize for the common case where a string is valid.
                      while (charCode >= 32 && charCode != 92 && charCode != 34) {
                        charCode = source.charCodeAt(++Index);
                      }
                      // Append the string as-is.
                      value += source.slice(begin, Index);
                    }
                  }
                  if (source.charCodeAt(Index) == 34) {
                    // Advance to the next character and return the revived string.
                    Index++;
                    return value;
                  }
                  // Unterminated string.
                  abort();
                default:
                  // Parse numbers and literals.
                  begin = Index;
                  // Advance past the negative sign, if one is specified.
                  if (charCode == 45) {
                    isSigned = true;
                    charCode = source.charCodeAt(++Index);
                  }
                  // Parse an integer or floating-point value.
                  if (charCode >= 48 && charCode <= 57) {
                    // Leading zeroes are interpreted as octal literals.
                    if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                      // Illegal octal literal.
                      abort();
                    }
                    isSigned = false;
                    // Parse the integer component.
                    for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                    // Floats cannot contain a leading decimal point; however, this
                    // case is already accounted for by the parser.
                    if (source.charCodeAt(Index) == 46) {
                      position = ++Index;
                      // Parse the decimal component.
                      for (; position < length; position++) {
                        charCode = source.charCodeAt(position);
                        if (charCode < 48 || charCode > 57) {
                          break;
                        }
                      }
                      if (position == Index) {
                        // Illegal trailing decimal.
                        abort();
                      }
                      Index = position;
                    }
                    // Parse exponents. The `e` denoting the exponent is
                    // case-insensitive.
                    charCode = source.charCodeAt(Index);
                    if (charCode == 101 || charCode == 69) {
                      charCode = source.charCodeAt(++Index);
                      // Skip past the sign following the exponent, if one is
                      // specified.
                      if (charCode == 43 || charCode == 45) {
                        Index++;
                      }
                      // Parse the exponential component.
                      for (position = Index; position < length; position++) {
                        charCode = source.charCodeAt(position);
                        if (charCode < 48 || charCode > 57) {
                          break;
                        }
                      }
                      if (position == Index) {
                        // Illegal empty exponent.
                        abort();
                      }
                      Index = position;
                    }
                    // Coerce the parsed value to a JavaScript number.
                    return +source.slice(begin, Index);
                  }
                  // A negative sign may only precede numbers.
                  if (isSigned) {
                    abort();
                  }
                  // `true`, `false`, and `null` literals.
                  var temp = source.slice(Index, Index + 4);
                  if (temp == "true") {
                    Index += 4;
                    return true;
                  } else if (temp == "fals" && source.charCodeAt(Index + 4) == 101) {
                    Index += 5;
                    return false;
                  } else if (temp == "null") {
                    Index += 4;
                    return null;
                  }
                  // Unrecognized token.
                  abort();
              }
            }
            // Return the sentinel `$` character if the parser has reached the end
            // of the source string.
            return "$";
          };

          // Internal: Parses a JSON `value` token.
          var get = function(value) {
            var results, hasMembers;
            if (value == "$") {
              // Unexpected end of input.
              abort();
            }
            if (typeof value == "string") {
              if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                // Remove the sentinel `@` character.
                return value.slice(1);
              }
              // Parse object and array literals.
              if (value == "[") {
                // Parses a JSON array, returning a new JavaScript array.
                results = [];
                for (;;) {
                  value = lex();
                  // A closing square bracket marks the end of the array literal.
                  if (value == "]") {
                    break;
                  }
                  // If the array literal contains elements, the current token
                  // should be a comma separating the previous element from the
                  // next.
                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();
                      if (value == "]") {
                        // Unexpected trailing `,` in array literal.
                        abort();
                      }
                    } else {
                      // A `,` must separate each array element.
                      abort();
                    }
                  } else {
                    hasMembers = true;
                  }
                  // Elisions and leading commas are not permitted.
                  if (value == ",") {
                    abort();
                  }
                  results.push(get(value));
                }
                return results;
              } else if (value == "{") {
                // Parses a JSON object, returning a new JavaScript object.
                results = {};
                for (;;) {
                  value = lex();
                  // A closing curly brace marks the end of the object literal.
                  if (value == "}") {
                    break;
                  }
                  // If the object literal contains members, the current token
                  // should be a comma separator.
                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();
                      if (value == "}") {
                        // Unexpected trailing `,` in object literal.
                        abort();
                      }
                    } else {
                      // A `,` must separate each object member.
                      abort();
                    }
                  } else {
                    hasMembers = true;
                  }
                  // Leading commas are not permitted, object property names must be
                  // double-quoted strings, and a `:` must separate each property
                  // name and value.
                  if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                    abort();
                  }
                  results[value.slice(1)] = get(lex());
                }
                return results;
              }
              // Unexpected token encountered.
              abort();
            }
            return value;
          };

          // Internal: Updates a traversed object member.
          var update = function(source, property, callback) {
            var element = walk(source, property, callback);
            if (element === undefined$1) {
              delete source[property];
            } else {
              source[property] = element;
            }
          };

          // Internal: Recursively traverses a parsed JSON object, invoking the
          // `callback` function for each value. This is an implementation of the
          // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
          var walk = function(source, property, callback) {
            var value = source[property],
              length;
            if (typeof value == "object" && value) {
              // `forOwn` can't be used to traverse an array in Opera <= 8.54
              // because its `Object#hasOwnProperty` implementation returns `false`
              // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
              if (getClass.call(value) == arrayClass) {
                for (length = value.length; length--;) {
                  update(getClass, forOwn, value, length, callback);
                }
              } else {
                forOwn(value, function(property) {
                  update(value, property, callback);
                });
              }
            }
            return callback.call(source, property, value);
          };

          // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
          exports.parse = function(source, callback) {
            var result, value;
            Index = 0;
            Source = "" + source;
            result = get(lex());
            // If a JSON string contains multiple tokens, it is invalid.
            if (lex() != "$") {
              abort();
            }
            // Reset the parser state.
            Index = Source = null;
            return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
          };
        }
      }

      exports.runInContext = runInContext;
      return exports;
    }


    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
      previousJSON = root.JSON3,
      isRestored = false;

    var JSON3 = runInContext(root, (root.JSON3 = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function() {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root.JSON3 = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };

  }).call(window);

  // https://github.com/MaxArt2501/base64-js/blob/master/base64.js

  /* eslint-disable no-useless-escape */
  (function(root, factory) {
    factory(root);
  })(window, function(root) {
    if (root.atob) {
      // Some browsers' implementation of atob doesn't support whitespaces
      // in the encoded string (notably, IE). This wraps the native atob
      // in a function that strips the whitespaces.
      // The original function can be retrieved in atob.original
      try {
        root.atob(' ');
      } catch (e) {
        root.atob = (function(atob) {
          var func = function(string) {
            return atob(String(string).replace(/[\t\n\f\r ]+/g, ''));
          };
          func.original = atob;
          return func;
        })(root.atob);
      }
      return;
    }

    // base64 character set, plus padding character (=)
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      // Regular expression to check formal correctness of base64 encoded strings
      /* eslint-disable no-useless-escape */
      b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;

    root.btoa = function(string) {
      string = String(string);
      var bitmap, a, b, c,
        result = '',
        i = 0,
        rest = string.length % 3; // To determine the final padding

      for (; i < string.length;) {
        if ((a = string.charCodeAt(i++)) > 255 ||
          (b = string.charCodeAt(i++)) > 255 ||
          (c = string.charCodeAt(i++)) > 255) {
          return '';
        }

        bitmap = (a << 16) | (b << 8) | c;
        result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63) +
          b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
      }

      // If there's need of padding, replace the last 'A's with equal signs
      return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result;
    };

    root.atob = function(string) {
      // atob can work with strings with whitespaces, even inside the encoded part,
      // but only \t, \n, \f, \r and ' ', which can be stripped.
      string = String(string).replace(/[\t\n\f\r ]+/g, '');
      if (!b64re.test(string)) {
        return '';
      }
      // Adding the padding if missing, for semplicity
      string += '=='.slice(2 - (string.length & 3));
      var bitmap, result = '',
        r1, r2, i = 0;
      for (; i < string.length;) {
        bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 |
          (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

        result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
          r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
          String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
      }
      return result;
    };
  });

  (function() {
    //polyfill
    if (!String.prototype.replaceAll) {
      String.prototype.replaceAll = function(str, newStr) {
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
          return this.replace(str, newStr);
        }
        return this.replace(new RegExp(str, 'g'), newStr);
      };
    }
  })();

  /** 检测传入参数是否是函数
   * @category Util
   * @param {*} arg 传入参数
   * @returns 是否是函数
   * @function isFunction
   * @example 
   * isFunction (function(){}) //=> true
   */
  function isFunction(arg) {
    if (!arg) {
      return false;
    }
    var type = Object.prototype.toString.call(arg);
    return type == '[object Function]' || type == '[object AsyncFunction]';
  }

  /** 获取当前时间相对于 1970-01-01 00:00:00 经过的毫秒数
   * @category Util
   * @function now
   * @returns {Number} 返回当前时间相对于 1970-01-01 00:00:00 经过的毫秒数
   * @example 
   * now() // 1646122486530
   */
  function now() {
    if (Date.now && isFunction(Date.now)) {
      return Date.now();
    }
    return new Date().getTime();
  }

  var logFn;

  /** wrench 库的日志打印模块，可以通过 setup 设置自定义日志打印方式
   * @category Util
   * @exports logger
   */
  var logger = {
    /** 自定义工具库的日志函数，默认使用控制台输出
     * 
     * @param {Function} logger 日志函数
     * @example
     * function myLog(arg){
     *    console.log(arg);
     *    alert(arg);
     * }
     * logger.setup(myLog); // 使用 myLog 作为日志输出 
     */
    setup: function(logger) {
      logFn = logger;
    },
    /**
     * 使用自定义的日志函数输出日志
     * 
     * @example
     * logger.log('hello world','1234');
     */
    log: function() {
      (logFn || (console && console.log) || function() {}).apply(null, arguments);
    }
  };

  /** 一个封装了 localStorage 的对象
   * @category Bom
   * @exports localStorage
   */
  var _localStorage = {
    /** 获取 localStorage 值
     * 
     * @param {String} key 传入存储值的键 key
     * @returns {String} 返回值
     * @example
     * localStorage.set('key1','value1');
     * localStorage.get('key1'); //=> value1
     */
    get: function(key) {
      return window.localStorage.getItem(key);
    },
    /** 获取 localStorage 值并且通过 JSON.parse 解析为 JS 对象
     * 如果无法成功解析，则返回字符串值
     * @param {String} key 传入存储值的键 key
     * @returns {Object} 返回值
     * @example
     * localStorage.set('key2',JSON.stringify({a:1}));
     * localStorage.parse('key2'); //=> {a:1}
     */
    parse: function(key) {
      var storedValue;
      try {
        storedValue = JSON.parse(_localStorage.get(key)) || null;
      } catch (err) {
        logger.log(err);
      }
      return storedValue;
    },
    /** 设置 localStorage 键值
     * 
     * @param {String} key 传入存储值的键 key
     * @param {String} value 传入存储值的值 value
     * @example
     *  localStorage.set('key1','value1');
     *  localStorage.get('key1'); //=> value1
     */
    set: function(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (err) {
        logger.log(err);
      }
    },
    /** 删除 localStorage 键值
     * 
     * @param {*} key 传入存储值的键 key
     * @example
     * localStorage.remove('key2');
     * localStorage.get('key2') //=> null
     */
    remove: function(key) {
      window.localStorage.removeItem(key);
    },
    /** 检测当前浏览器是否支持 localStorage 存储
     * 
     * @returns {Boolean} 返回当前浏览器是否支持 localStorage 存储
     * @example
     * // 在支持 localStorage 的浏览器中
     * localStorage.isSupport() //=> true
     */
    isSupport: function() {
      var supported = true;
      try {
        var supportName = '__local_store_support__';
        var val = 'testIsSupportStorage';
        _localStorage.set(supportName, val);
        if (_localStorage.get(supportName) !== val) {
          supported = false;
        }
        _localStorage.remove(supportName);
      } catch (err) {
        supported = false;
      }
      return supported;
    }
  };

  /** 检测传入参数是否是对象类型
   * @category Util
   * @param {*} arg 传入参数
   * @returns {Boolean} 是否是对象类型
   * @function isObject
   * @example 
   * isObject({}) //=> true
   * isObject(1) //=> false
   */
  function isObject(arg) {
    if (arg == null) {
      return false;
    } else {
      return Object.prototype.toString.call(arg) == '[object Object]';
    }
  }

  /** 获取指定数字范围内的随随机数
   * @param {Number} max 随机数最大值
   * @category Math
   * @function getRandomBasic
   * @return 指定数字范围内的随机数
   * 
   * @example
   * getRandomBasic(100) //=> 85
   */
  var getRandomBasic = (function() {
    var today = new Date();
    var seed = today.getTime();

    function rnd() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280.0;
    }
    return function rand(number) {
      return Math.ceil(rnd() * number);
    };
  })();

  /** 安全的 js 随机数生成方式,返回与原生 Math.random 类似的 0-1 的随机数值
   * @function getRandom
   * @category Math
   * @returns {Number} 一个介于 0 -1 的数字
   *
   * @example
   * getRandom() //=> 0.8368784293552812
   */
  function getRandom() {
    if (typeof Uint32Array === 'function') {
      var cry = '';
      if (typeof crypto !== 'undefined') {
        cry = crypto;
      } else if (typeof msCrypto !== 'undefined') {
        // eslint-disable-next-line no-undef
        cry = msCrypto;
      }
      if (isObject(cry) && cry.getRandomValues) {
        var typedArray = new Uint32Array(1);
        var randomNumber = cry.getRandomValues(typedArray)[0];
        var integerLimit = Math.pow(2, 32);
        return randomNumber / integerLimit;
      }
    }
    return getRandomBasic(10000000000000000000) / 10000000000000000000;
  }

  /** 对传入字符串进行安全的 JSON 反序列化操作，如果反序列化失败则返回 null
   * @category Encoding
   * @param {String} str 传入字符串
   * @returns {Object} 反序列化后的对象
   * @function safeJSONParse
   * 
   * @example
   * safeJSONParse('{\"a\":124}') //=> {a: 124}
   */
  function safeJSONParse(str) {
    var val = null;
    try {
      val = JSON.parse(str);
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return val;
  }

  /** ConcurrentStorage 构造函数
   * @category Util
   * @param {String} lockGetPrefix get 方法，锁前缀
   * @param {String} lockSetPrefix set 方法，锁前缀
   * @returns {Undefined} 没有返回值
   * @function ConcurrentStorage
   * @example 
   * new ConcurrentStorage('123', '123') //=> undefined
   */
  function ConcurrentStorage(lockGetPrefix, lockSetPrefix) {
    this.lockGetPrefix = lockGetPrefix || 'lock-get-prefix';
    this.lockSetPrefix = lockSetPrefix || 'lock-set-prefix';
  }

  /** 是用 lock 的方式从 localStorage 中读取，解决多 Tab 竞争，某一对 key-value 只会被一个 Tab 读取，并在读取后删除
   * @category Util
   * @param {String} key 读取的键
   * @param {Number} lockTimeout 加锁时长
   * @param {Number} checkTime 加锁后校验随机数时长
   * @param {Function} callback 读取 key 回调，如果 key-value 不归属于当前 Tab 则 callback(null)
   * @returns {Undefined} 没有返回值
   * @function LocalStorage.prototype.get
   * @example 
   * let lock = new ConcurrentStorage('123'); lock.get('123', 10000, 1000, function() {}) //=> undefined
   */
  ConcurrentStorage.prototype.get = function(key, lockTimeout, checkTime, callback) {
    if (!key) throw new Error('key is must');
    lockTimeout = lockTimeout || 10000;
    checkTime = checkTime || 1000;
    callback = callback || function() {};
    var lockKey = this.lockGetPrefix + key;
    var lock = _localStorage.get(lockKey);
    var randomNum = String(getRandom());
    if (lock) {
      lock = safeJSONParse(lock) || {
        randomNum: 0,
        expireTime: 0
      };
      if (lock.expireTime > now()) {
        return callback(null);
      }
    }
    _localStorage.set(lockKey, JSON.stringify({
      randomNum: randomNum,
      expireTime: now() + lockTimeout
    }));
    setTimeout(function() {
      lock = safeJSONParse(_localStorage.get(lockKey)) || {
        randomNum: 0,
        expireTime: 0
      };
      if (lock && lock.randomNum === randomNum) {
        callback(_localStorage.get(key));
        _localStorage.remove(key);
        _localStorage.remove(lockKey);
      } else {
        callback(null);
      }
    }, checkTime);
  };

  /** 是用 lock 的方式往 localStorage 中存值，解决多 Tab 竞争，对某个 key 设置 value，最终只有一个 Tab 的 value 会生效
   * @category Util
   * @param {String} key 设置的 key
   * @param {String} val 设置的 value
   * @param {Number} lockTimeout 加锁时长
   * @param {Number} checkTime 加锁后随机数校验时长，决定 key 的归属
   * @param {Function} callback 设置 key 的回调，如果 key 不归属当前 tab，则 callback({ status: 'fail', reason: 'This key is locked' })
   * @returns {Undefined} 没有返回值
   * @function LocalStorage.prototype.set
   * @example
   * let lock = new ConcurrentStorage('123'); lock.set('123', '123', 10000, 1000, function() {}) //=> undefined
   */
  ConcurrentStorage.prototype.set = function(key, val, lockTimeout, checkTime, callback) {
    if (!key || !val) throw new Error('key and val is must');
    lockTimeout = lockTimeout || 10000;
    checkTime = checkTime || 1000;
    callback = callback || function() {};
    var lockKey = this.lockSetPrefix + key;
    var lock = _localStorage.get(lockKey);
    var randomNum = String(getRandom());
    if (lock) {
      lock = safeJSONParse(lock) || {
        randomNum: 0,
        expireTime: 0
      };
      if (lock.expireTime > now()) {
        return callback({
          status: 'fail',
          reason: 'This key is locked'
        });
      }
    }
    _localStorage.set(lockKey, JSON.stringify({
      randomNum: randomNum,
      expireTime: now() + lockTimeout
    }));
    setTimeout(function() {
      lock = safeJSONParse(_localStorage.get(lockKey)) || {
        randomNum: 0,
        expireTime: 0
      };
      if (lock.randomNum === randomNum) {
        _localStorage.set(key, val) && callback({
          status: 'success'
        });
      } else {
        callback({
          status: 'fail',
          reason: 'This key is locked'
        });
      }
    }, checkTime);
  };

  function isValidListener(listener) {
    if (typeof listener === 'function') {
      return true;
    } else if (listener && typeof listener === 'object') {
      return isValidListener(listener.listener);
    } else {
      return false;
    }
  }

  /**
   * @class EventEmitter
   * @category Event
   * @example
   * var e = new EventEmitter()
   * e.on('HelloEvent',function(data){
   *  console.log('Hello Event happens',data);
   * })
   * 
   * e.emit('HelloEvent',123);
   * // Hello Event happens , 123
   */
  function EventEmitter() {
    this._events = {};
  }

  /**
   * 添加事件
   * @param  {String} eventName 事件名称
   * @param  {Function} listener 监听器函数
   * @return {Object} 可链式调用
   */
  EventEmitter.prototype.on = function(eventName, listener) {
    if (!eventName || !listener) {
      return false;
    }

    if (!isValidListener(listener)) {
      throw new Error('listener must be a function');
    }

    this._events[eventName] = this._events[eventName] || [];
    var listenerIsWrapped = typeof listener === 'object';

    this._events[eventName].push(
      listenerIsWrapped ?
      listener :
      {
        listener: listener,
        once: false
      }
    );

    return this;
  };

  /**
   * 添加事件到事件回调函数列表头
   * @param  {String} eventName 事件名称
   * @param  {Function} listener 监听器函数
   * @return {Object} 可链式调用
   */
  EventEmitter.prototype.prepend = function(eventName, listener) {
    if (!eventName || !listener) {
      return false;
    }

    if (!isValidListener(listener)) {
      throw new Error('listener must be a function');
    }

    this._events[eventName] = this._events[eventName] || [];
    var listenerIsWrapped = typeof listener === 'object';

    this._events[eventName].unshift(
      listenerIsWrapped ?
      listener :
      {
        listener: listener,
        once: false
      }
    );

    return this;
  };

  /**
   * 添加事件到事件回调函数列表头，回调只执行一次
   * @param  {String} eventName 事件名称
   * @param  {Function} listener 监听器函数
   * @return {Object} 可链式调用
   */
  EventEmitter.prototype.prependOnce = function(eventName, listener) {
    return this.prepend(eventName, {
      listener: listener,
      once: true
    });
  };

  /**
   * 添加事件，该事件只能被执行一次
   * @param  {String} eventName 事件名称
   * @param  {Function} listener 监听器函数
   * @return {Object} 可链式调用
   */
  EventEmitter.prototype.once = function(eventName, listener) {
    return this.on(eventName, {
      listener: listener,
      once: true
    });
  };

  /**
   * 删除事件
   * @param  {String} eventName 事件名称
   * @param  {Function} listener 监听器函数
   * @return {Object} 可链式调用
   */
  EventEmitter.prototype.off = function(eventName, listener) {
    var listeners = this._events[eventName];
    if (!listeners) {
      return false;
    }
    if (typeof listener === 'number') {
      listeners.splice(listener, 1);
    } else if (typeof listener === 'function') {
      for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] && listeners[i].listener === listener) {
          listeners.splice(i, 1);
        }
      }
    }
    return this;
  };

  /**
   * 触发事件
   * @param  {String} eventName 事件名称
   * @param  {Array} args 传入监听器函数的参数，使用数组形式传入
   * @return {Object} 可链式调用
   */
  EventEmitter.prototype.emit = function(eventName, args) {
    var listeners = this._events[eventName];
    if (!listeners) {
      return false;
    }

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      if (listener) {
        listener.listener.call(this, args || {});
        if (listener.once) {
          this.off(eventName, i);
        }
      }
    }

    return this;
  };

  /**
   * 删除某一个类型的所有事件或者所有事件
   * @param  {String[]} eventName 事件名称
   */
  EventEmitter.prototype.removeAllListeners = function(eventName) {
    if (eventName && this._events[eventName]) {
      this._events[eventName] = [];
    } else {
      this._events = {};
    }
  };

  /**
   * 返回某一个类型的所有事件或者所有事件
   * @param  {String[]} eventName 事件名称
   */
  EventEmitter.prototype.listeners = function(eventName) {
    if (eventName && typeof eventName === 'string') {
      return this._events[eventName];
    } else {
      return this._events;
    }
  };

  /**  具备异常处理的 URIComponent 解码方法
   * @category Bom
   * @param {String} uri 传入的 uri 字符串
   * @returns {String}  解码后的 uri，如果出现异常则返回原始传入值
   * @function decodeURIComponent
   * @example
   * decodeURIComponent('%2Fhello%E4%B8%96%E7%95%8C') //=> 'hello世界'
   */
  function _decodeURIComponent(uri) {
    var result = uri;
    try {
      result = decodeURIComponent(uri);
    } catch (e) {
      result = uri;
    }
    return result;
  }

  /**
   * 解析传入查询参数到一个含有查询参数列表的 key/value 对象
   * @param {string} queryString - 以问号开头的查询参数字符串
   * @return {Object} 一个含有参数列表的 key/value 对象
   *
   * @example
   * var url = _.getURLSearchParams('?project=testproject&query1=test&silly=willy&field[0]=zero&field[2]=two#test=hash&chucky=cheese');
   *
   * url.project; // => testproject
   * @category Bom
   * @function getURLSearchParams
   */
  function getURLSearchParams(queryString) {
    queryString = queryString || '';
    var args = {}; // Start with an empty object
    var query = queryString.substring(1); // Get query string, minus '?'
    var pairs = query.split('&'); // Split at ampersands
    for (var i = 0; i < pairs.length; i++) {
      // For each fragment
      var pos = pairs[i].indexOf('='); // Look for "name=value"
      if (pos === -1) continue; // If not found, skip it
      var name = pairs[i].substring(0, pos); // Extract the name
      var value = pairs[i].substring(pos + 1); // Extract the value
      name = _decodeURIComponent(name); // Decode the name
      value = _decodeURIComponent(value); // Decode the value
      args[name] = value; // Store as a property
    }
    return args; // Return the parsed arguments
  }

  /** 检测传入参数是否是字符串
   * 
   * @param {*} arg 传入参数
   * @returns {Boolean} 是否是字符串
   * @category Util
   * @function isString
   * @example
   * isString('1234') //=> true
   */
  function isString(arg) {
    return Object.prototype.toString.call(arg) == '[object String]';
  }

  /** 去除字符串开头和结尾的空白字符串
   * 
   * @param {String} str 输入字符串
   * @returns {String} 去除头尾空格后的结果
   * @function trim
   * @category String
   * @example 
   * const str = ' hello world ';
   * const val = trim (str); // val equals "hello world"
   */
  function trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }

  /**
   * @typedef {Object} URLParser URL 解析器对象，用于添加查询参数，和重新获取添加查询参数后的 URL 字符串
   * @property {Function} setUrl <strong>setUrl(url:String)->void</strong><br>重新设置需要解析的 url
   * @property {Function} addQueryString <strong>addQueryString(obj:Object)->string</strong><br>添加查询参数、传入参数是一个 Key/Value 键值对对象
   * @property {Function} getUrl <strong>getUrl()->string</strong><br>重新获取 URL 字符串
   */

  /** 传入 URL 返回一个 URL 解析对象，用于添加查询参数，和重新获取添加查询参数后的 URL 字符串
   * @category Bom
   * @param {String} url 传入需要添加查询参数的的 URL 字符串
   * @returns {URLParser} 一个 URL 解析对象，用于添加查询参数，和重新获取添加查询参数后的 URL 字符串
   * @function urlParse
   * @example
   * let url = 'https://example.com'
   * let u = urlParse(url);
   * u.addQueryString({name:'Alice'});
   * u.getUrl(); // 'https://example.com?name=Alice'
   */
  function urlParse(url) {
    var URLParser = function(url) {
      this._fields = {
        Username: 4,
        Password: 5,
        Port: 7,
        Protocol: 2,
        Host: 6,
        Path: 8,
        URL: 0,
        QueryString: 9,
        Fragment: 10
      };
      this._values = {};
      //eslint-disable-next-line
      this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

      if (typeof url != 'undefined') {
        this._parse(url);
      }
    };

    URLParser.prototype.setUrl = function(url) {
      this._parse(url);
    };

    URLParser.prototype._initValues = function() {
      for (var a in this._fields) {
        this._values[a] = '';
      }
    };

    URLParser.prototype.addQueryString = function(queryObj) {
      if (typeof queryObj !== 'object') {
        return false;
      }
      var query = this._values.QueryString || '';
      for (var i in queryObj) {
        if (new RegExp(i + '[^&]+').test(query)) {
          query = query.replace(new RegExp(i + '[^&]+'), i + '=' + queryObj[i]);
        } else {
          if (query.slice(-1) === '&') {
            query = query + i + '=' + queryObj[i];
          } else {
            if (query === '') {
              query = i + '=' + queryObj[i];
            } else {
              query = query + '&' + i + '=' + queryObj[i];
            }
          }
        }
      }
      this._values.QueryString = query;
    };

    URLParser.prototype.getUrl = function() {
      var url = '';
      url += this._values.Origin;
      url += this._values.Port ? ':' + this._values.Port : '';
      url += this._values.Path;
      url += this._values.QueryString ? '?' + this._values.QueryString : '';
      url += this._values.Fragment ? '#' + this._values.Fragment : '';
      return url;
    };

    URLParser.prototype._parse = function(url) {
      this._initValues();

      var b = this._regex.exec(url);
      if (!b) {
        logger.log('URLParser::_parse -> Invalid URL');
      }

      var urlTmp = url.split('#');
      var urlPart = urlTmp[0];
      var hashPart = urlTmp.slice(1).join('#');
      b = this._regex.exec(urlPart);
      for (var c in this._fields) {
        if (typeof b[this._fields[c]] != 'undefined') {
          this._values[c] = b[this._fields[c]];
        }
      }
      this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '');
      this._values['Origin'] = this._values['Protocol'] + '://' + this._values['Hostname'];
      this._values['Fragment'] = hashPart;
    };

    return new URLParser(url);
  }

  /**
   * @typedef SearchParams
   * @property {Function} get <strong>get(key:String)->String<strong> <br> 获取指定 key 的查询参数值
   */

  /**
   * @typedef URLObject  URL 普通对象
   * @property {String} hash url 中的 hash 值 （#后的值）
   *  @property {String} host url 中的主机地址
   *  @property {String} href url 完整链接
   *  @property {String} password url 中包含的主机账户密码
   *  @property {String} pathname url 中的路径名
   *  @property {String} port  ulr 中的端口号
   *  @property {String} search url 中的查询参数 （?后的值）
   *  @property {String} username url 中包含的主机用户名
   *  @property {String} hostname  url 中的主机名
   *  @property {String} protocol  url 的 协议，如 http: ，https
   *  @property {String} origin  url 的地址，只包含域名和端口
   *  @property {SearchParams} searchParams url 查询参数对象，可以通过其 get 方法获取指定的查询参数的值
   */

  /**
   * 兼容解析URL<br>
   * 如果浏览器原生支持 URL 类则返回原生 URL 对象 <br>
   * 否则返回兼容实现的 URL 解析对象 ( 参见 URLObject)
   * @param {String} url url 格式的字符串
   * @returns {URL|URLObject} 一个原生 URL 对象或者普通JS对象( 参见 URLObject)
   *
   * @example
   * var url = URL('http://www.domain.com:8080/path/index.html?project=testproject&query1=test&silly=willy&field[0]=zero&field[2]=two#test=hash&chucky=cheese');
   *
   * url.hostname; // => www.domain.com
   * url.searchParams.get('project'); // => testproject
   * @category Bom
   * @function URL
   */
  function _URL(url) {
    var result = {};
    //var basicProps = ['hash', 'host', 'hostname', 'href', 'origin', 'password', 'pathname', 'port', 'protocol', 'search', 'username'];
    // Some browsers allow objects to be created via URL constructor, but instances do not have the expected url properties.
    // See https://www.caniuse.com/#feat=url
    var isURLAPIWorking = function() {
      var url;
      try {
        url = new URL('http://modernizr.com/');
        return url.href === 'http://modernizr.com/';
      } catch (e) {
        return false;
      }
    };
    if (typeof window.URL === 'function' && isURLAPIWorking()) {
      result = new URL(url);
      if (!result.searchParams) {
        result.searchParams = (function() {
          var params = getURLSearchParams(result.search);
          return {
            get: function(searchParam) {
              return params[searchParam];
            }
          };
        })();
      }
    } else {
      if (!isString(url)) {
        url = String(url);
      }
      url = trim(url);
      var _regex = /^https?:\/\/.+/;
      if (_regex.test(url) === false) {
        logger.log('Invalid URL');
        return;
      }
      var instance = urlParse(url);
      result.hash = instance._values.Fragment;
      result.host = instance._values.Host ? instance._values.Host + (instance._values.Port ? ':' + instance._values.Port : '') : '';
      result.href = instance._values.URL;
      result.password = instance._values.Password;
      result.pathname = instance._values.Path;
      result.port = instance._values.Port;
      result.search = instance._values.QueryString ? '?' + instance._values.QueryString : '';
      result.username = instance._values.Username;
      result.hostname = instance._values.Hostname;
      result.protocol = instance._values.Protocol ? instance._values.Protocol + ':' : '';
      result.origin = instance._values.Origin ? instance._values.Origin + (instance._values.Port ? ':' + instance._values.Port : '') : '';
      result.searchParams = (function() {
        var params = getURLSearchParams('?' + instance._values.QueryString);
        return {
          get: function(searchParam) {
            return params[searchParam];
          }
        };
      })();
    }
    return result;
  }

  /** 浏览器环境的生成唯一 ID 的算法
   * @function UUID
   * @category Util
   * @returns {String} 唯一 ID
   * @example
   * UUID() //=> '17f44206897991-078fdaeab826c4c-37677a09-3686400-17f44206898caa'
   */

  var UUID = (function() {
    var T = function() {
      var d = 1 * new Date(),
        i = 0;
      while (d == 1 * new Date()) {
        i++;
      }
      return d.toString(16) + i.toString(16);
    };
    var R = function() {
      return getRandom().toString(16).replace('.', '');
    };
    var UA = function() {
      var ua = navigator.userAgent,
        i,
        ch,
        buffer = [],
        ret = 0;

      function xor(result, byte_array) {
        var j,
          tmp = 0;
        for (j = 0; j < byte_array.length; j++) {
          tmp |= buffer[j] << (j * 8);
        }
        return result ^ tmp;
      }

      for (i = 0; i < ua.length; i++) {
        ch = ua.charCodeAt(i);
        buffer.unshift(ch & 0xff);
        if (buffer.length >= 4) {
          ret = xor(ret, buffer);
          buffer = [];
        }
      }

      if (buffer.length > 0) {
        ret = xor(ret, buffer);
      }

      return ret.toString(16);
    };

    return function() {
      // 有些浏览器取个屏幕宽度都异常...
      var se = String(screen.height * screen.width);
      if (se && /\d{5,}/.test(se)) {
        se = se.toString(16);
      } else {
        se = String(getRandom() * 31242)
          .replace('.', '')
          .slice(0, 8);
      }
      var val = T() + '-' + R() + '-' + UA() + '-' + se + '-' + T();
      if (val) {
        return val;
      } else {
        return (String(getRandom()) + String(getRandom()) + String(getRandom())).slice(2, 15);
      }
    };
  })();

  /** 检测传入参数是否一个 Dom 元素
   * 
   * @param {*} arg 传入参数
   * @returns {Boolean} 是否是 Dom 元素
   * @function isElement
   * @category Util
   * @example
   * var d = document.body;
   * isElement(d); //=> true
   */
  function isElement(arg) {
    return !!(arg && arg.nodeType === 1);
  }

  /** 检测传入参数是否等于 undefined
   * @category Util
   * @param {*} arg 传入参数
   * @returns {Boolean} 是否是 undefined 值
   * @function isUndefined
   * @example
   * isUndefined(undefined) //=> true
   * isUndefined(null) //=> false
   */
  function isUndefined(arg) {
    return arg === void 0;
  }

  /** 检测传入参数是否是数组类型
   * @category Util
   * @param {*} arg 传入参数
   * @function isArray
   * @returns {Boolean} 是否是数组类型
   * 
   * @example 
   * isArray([])//=> true
   */
  function isArray(arg) {
    if (Array.isArray && isFunction(isArray)) {
      return Array.isArray(arg);
    }
    return Object.prototype.toString.call(arg) === '[object Array]';
  }

  /**
   * @typedef {Object} DomElementInfo 包含了 Dom 信息获取和设置方法的对象
   * @property {Function} addClass <strong>addClass (className:String)->void</strong><br>为 Dom 元素添加样式类名
   * @property {Function} removeClass <strong>removeClass(className:String)->void</strong><br>为 Dom 元素删除样式类名
   * @property {Function} hasClass <strong>hasClass(className:String)->Boolean </strong><br>检测 Dom 元素是否具有指定样式类名
   * @property {Function} attr <strong>attr(key:String,?value:String)->String|null </strong><br>获取和设置 Dom 元素属性。当只传 key 不传 value 时，方法获取元素中名为 key 的属性值。当传了 key 和 value 时，方法为 dom 元素设置名为 key 值为 value 的属性。
   * @property {Function} offset <strong>offset()->{left:Number,top:Number} </strong><br>获取 Dom 元素相对浏览器窗口左上角的偏移位置
   * @property {Function} getSize <strong>getSize()->{width:NUmber, height:Number} </strong><br>获取 Dom 元素的宽高
   * @property {Function} getStyle <strong>getStyle(property:String)->String </strong><br>获取 Dom 元素的指定样式的值，如: getStyle('width')
   */

  /**
   * @category Dom
   * @param {Element} dom 传入的 dom 元素
   * @returns {DomElementInfo} 元素信息对象，用于获取元素信息
   * @function ry
   * @example
   * var a =  document.getElementById('banner');
   * var b =ry(a);
   * b.addClass('banner-style');
   * // => <h1 id='banner' class='banner-style'> hello world </h1>
   */
  function ry(dom) {
    return new DomElementInfo(dom);
  }

  var DomElementInfo = function(dom) {
    this.ele = dom;
  };

  var siblings = function(n, elem) {
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }

    return matched;
  };

  DomElementInfo.prototype = {
    addClass: function(para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') === -1) {
        this.ele.className = this.ele.className + (this.ele.className === '' ? '' : ' ') + para;
      }
      return this;
    },
    removeClass: function(para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        this.ele.className = classes.replace(' ' + para + ' ', ' ').slice(1, -1);
      }
      return this;
    },
    hasClass: function(para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        return true;
      } else {
        return false;
      }
    },
    attr: function(key, value) {
      if (typeof key === 'string' && isUndefined(value)) {
        return this.ele.getAttribute(key);
      }
      if (typeof key === 'string') {
        value = String(value);
        this.ele.setAttribute(key, value);
      }
      return this;
    },
    offset: function() {
      var rect = this.ele.getBoundingClientRect();
      if (rect.width || rect.height) {
        var doc = this.ele.ownerDocument;
        var docElem = doc.documentElement;

        return {
          top: rect.top + window.pageYOffset - docElem.clientTop,
          left: rect.left + window.pageXOffset - docElem.clientLeft
        };
      } else {
        return {
          top: 0,
          left: 0
        };
      }
    },
    getSize: function() {
      if (!window.getComputedStyle) {
        return {
          width: this.ele.offsetWidth,
          height: this.ele.offsetHeight
        };
      }
      try {
        var bounds = this.ele.getBoundingClientRect();
        return {
          width: bounds.width,
          height: bounds.height
        };
      } catch (e) {
        return {
          width: 0,
          height: 0
        };
      }
    },
    getStyle: function(value) {
      if (this.ele.currentStyle) {
        return this.ele.currentStyle[value];
      } else {
        return this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(value);
      }
    },
    wrap: function(elementTagName) {
      var ele = document.createElement(elementTagName);
      this.ele.parentNode.insertBefore(ele, this.ele);
      ele.appendChild(this.ele);
      return ry(ele);
    },
    getCssStyle: function(prop) {
      var result = this.ele.style.getPropertyValue(prop);
      if (result) {
        return result;
      }
      var rules = null;
      if (typeof window.getMatchedCSSRules === 'function') {
        rules = window.getMatchedCSSRules(this.ele);
      }
      if (!rules || !isArray(rules)) {
        return null;
      }
      for (var i = rules.length - 1; i >= 0; i--) {
        var r = rules[i];
        result = r.style.getPropertyValue(prop);
        if (result) {
          return result;
        }
      }
    },
    sibling: function(cur, dir) {
      //eslint-disable-next-line
      while ((cur = cur[dir]) && cur.nodeType !== 1) {}
      return cur;
    },
    next: function() {
      return this.sibling(this.ele, 'nextSibling');
    },
    prev: function() {
      return this.sibling(this.ele, 'previousSibling');
    },
    siblings: function() {
      return siblings((this.ele.parentNode || {}).firstChild, this.ele);
    },
    children: function() {
      return siblings(this.ele.firstChild);
    },
    parent: function() {
      var parent = this.ele.parentNode;
      parent = parent && parent.nodeType !== 11 ? parent : null;
      return ry(parent);
    },
    // 兼容原生不支持 previousElementSibling 的旧版浏览器
    previousElementSibling: function() {
      var el = this.ele;
      if ('previousElementSibling' in document.documentElement) {
        return ry(el.previousElementSibling);
      } else {
        while ((el = el.previousSibling)) {
          if (el.nodeType === 1) {
            return ry(el);
          }
        }
        return ry(null);
      }
    },
    // 得到和当前元素相同类型的同级元素
    getSameTypeSiblings: function() {
      var element = this.ele;
      var parentNode = element.parentNode;
      var tagName = element.tagName.toLowerCase();
      var arr = [];
      for (var i = 0; i < parentNode.children.length; i++) {
        var child = parentNode.children[i];
        if (child.nodeType === 1 && child.tagName.toLowerCase() === tagName) {
          arr.push(parentNode.children[i]);
        }
      }
      return arr;
    },
    //获取元素 path
    getParents: function() {
      try {
        var element = this.ele;
        if (!isElement(element)) {
          return [];
        }
        var pathArr = [element];
        if (element === null || element.parentElement === null) {
          return [];
        }
        while (element.parentElement !== null) {
          element = element.parentElement;
          pathArr.push(element);
        }
        return pathArr;
      } catch (err) {
        return [];
      }
    }
  };

  /** 兼容低版本 IE 的事件注册方法
   * @category Event
   * @param {HTMLElement|Window} target 事件源，window 或 DOM 元素
   * @param {String} eventName 事件名，如 load、click、mousedown
   * @param {Function} eventHandler 事件处理函数
   * @param {Boolean} ?useCapture 是否使用事件捕获、默认值为 true
   * @example
   * addEvent(window, 'hashchange', function(){
   *  console.log('hash changed.');
   * };
   * @function addEvent
   */
  function addEvent(target, eventName, eventHandler, useCapture) {
    function fixEvent(event) {
      if (event) {
        event.preventDefault = fixEvent.preventDefault;
        event.stopPropagation = fixEvent.stopPropagation;
        event._getPath = fixEvent._getPath;
      }
      return event;
    }
    fixEvent._getPath = function() {
      var ev = this;
      return this.path || (this.composedPath && this.composedPath()) || ry(ev.target).getParents();
    };

    fixEvent.preventDefault = function() {
      this.returnValue = false;
    };
    fixEvent.stopPropagation = function() {
      this.cancelBubble = true;
    };

    var register_event = function(element, type, handler) {
      if (useCapture === undefined && type === 'click') {
        useCapture = true;
      }
      if (element && element.addEventListener) {
        element.addEventListener(
          type,
          function(e) {
            e._getPath = fixEvent._getPath;
            handler.call(this, e);
          },
          useCapture
        );
      } else {
        var ontype = 'on' + type;
        var old_handler = element[ontype];
        element[ontype] = makeHandler(element, handler, old_handler, type);
      }
    };

    function makeHandler(element, new_handler, old_handlers, type) {
      var handler = function(event) {
        event = event || fixEvent(window.event);
        if (!event) {
          return undefined;
        }
        event.target = event.srcElement;

        var ret = true;
        var old_result, new_result;
        if (typeof old_handlers === 'function') {
          old_result = old_handlers(event);
        }
        new_result = new_handler.call(element, event);
        // ie浏览器在 beforeunload时不能用返回值 如有返回 会自动弹出一个系统弹窗
        if (type !== 'beforeunload') {
          if (false === old_result || false === new_result) {
            ret = false;
          }
          return ret;
        }
      };
      return handler;
    }

    register_event.apply(null, arguments);
  }

  /** 监听页面哈希变化或页面历史变化
   * @category Event
   * @param {*} callback 页面哈希变化或页面历史变化时触发的回调函数
   * @function addHashEvent
   * @example
   * addHashEvent(function(){
   *   console.log('page changed');
   * })
   */
  function addHashEvent(callback) {
    var hashEvent = 'pushState' in window.history ? 'popstate' : 'hashchange';
    addEvent(window, hashEvent, callback);
  }

  /** 兼容低版本 IE 的 XMLHttpRequest 的实例化方法
   * @category Bom
   * @param {Boolean} cors 请求是否需要支持跨域
   * @returns {ActiveXObject|XMLHttpRequest} XMLHttpRequest 的实例
   * @function xhr
   */
  function xhr(cors) {
    if (cors) {
      if (typeof window.XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest()) {
        return new XMLHttpRequest();
      } else if (typeof XDomainRequest !== 'undefined') {
        // eslint-disable-next-line no-undef
        return new XDomainRequest();
      } else {
        return null;
      }
    } else {
      if (typeof window.XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
      }
      if (window.ActiveXObject) {
        try {
          // eslint-disable-next-line no-undef
          return new ActiveXObject('Msxml2.XMLHTTP');
        } catch (d) {
          try {
            // eslint-disable-next-line no-undef
            return new ActiveXObject('Microsoft.XMLHTTP');
          } catch (d) {
            logger.log(d);
          }
        }
      }
    }
  }

  var nativeForEach = Array.prototype.forEach;
  var hasOwnProperty$2 = Object.prototype.hasOwnProperty;

  /** 迭代器回调
   * @callback iteratorCallback
   * @param {*} value 当前迭代值
   * @param {Number} index 当前迭代值的下标
   * @param {Object} sourceArray 迭代源数组或对象
   */

  /** 对传入数组或对象的每个属性应用迭代器方法进行执行，
   * @param {Object|Array} obj 传入对象
   * @param {iteratorCallback} iterator 迭代器方法
   * @param {Object} context 迭代器方法的执行上下文
   * @category Array
   * @function each
   *
   * @example
   * each([1,2,3],function(v,i,arr){console.log(v,i,arr)})
   * //1,0,[1, 2, 3]
   * //2,1,[1, 2, 3]
   * //3,2,[1, 2, 3]
   *
   */
  function each(obj, iterator, context) {
    if (obj == null) {
      return false;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        i in obj && iterator.call(context, obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty$2.call(obj, key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    }
  }

  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  /** 使用源对象对目标对象进行扩展,
   * 只扩展第一层,<br>
   * 如果遇到目标对象已经存在的属性，则直接覆盖目标对象原来的属性值
   * @param {Object} obj 目标扩展对象
   * @param {Object} ext 源对象
   * @returns 扩展后的目标对象
   * @function extend
   * @category Util
   * 
   * @example 
   * var a = {
   *   name:'Alice',
   *   age:18,
   *   address:{
   *     addr1: 'BeiJing' 
   *   }
   *  }
   *  
   *  var b = {
   *   name: 'Bob',
   *   favor: 'Apple',
   *   address:{
   *     addr1: 'TianJing'
   *   }
   *  }
   *  
   *  extend(a,b);
   *  a //=> 
   *  // {
   *  //    name: "Bob",
   *  //    age: 18,
   *  //    favor: "Apple",
   *  //    address:{
   *  //      addr1: 'TianJing'
   *  //    }
   *  //  }
   * 
   */
  function extend(obj) {
    each(Array.prototype.slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (hasOwnProperty$1.call(source, prop) && source[prop] !== void 0) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }

  /** Ajax 请求成功回调
   * @callback ajaxSuccessCallback
   * @param {Object} data 请求成功后数据结果
   */

  /** Ajax 请求失败回调
   * @callback ajaxErrorCallback
   * @param {Object} error 请求失败的异常结果
   * @param {Number} status 错误代码，如 404
   */

  /**
   * @typedef {Object} AjaxRequestArg Ajax 请求参数
   * @property {String} url 请求目标地址
   * @property {Number} timeout 请求超时时间，若超时请求将终止
   * @property {Boolean} credentials 标识是否携带 cookie
   * @property {Boolean} cors 标识是否支持跨域
   * @property {String} type 标识请求类型，如 'GET','POST'
   * @property {ajaxSuccessCallback} success 请求成功回调
   * @property {ajaxErrorCallback} error 请求失败的回调
   * @property {object} header 请求头，Key/Value 键值对对象
   * @property {Object} data 请求体，Key/Value 键值对对象
   */

  /** 发起一个 Ajax 请求
   * @category Bom
   * @function ajax
   * @param {AjaxRequestArg} para 请求参数
   * 
   * @example
   * ajax({
   *   url:'/example',
   *   timeout:15000,
   *   credentials:true,
   *   cors:true,
   *   type:'POST',
   *   success:function (data) { console.log(data)},
   *   error:function (data) { console.log(error)},
   *   header:{ExtraHeader:'TestValue'},
   *   data:{ name:'Alice', age:18 },
   * })
   */
  function ajax(para) {
    para.timeout = para.timeout || 20000;

    para.credentials = typeof para.credentials === 'undefined' ? true : para.credentials;

    function getJSON(data) {
      if (!data) {
        return '';
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        return {};
      }
    }

    var g = xhr(para.cors);

    if (!g) {
      return false;
    }

    if (!para.type) {
      para.type = para.data ? 'POST' : 'GET';
    }
    para = extend({
        success: function() {},
        error: function() {}
      },
      para
    );

    var oldsuccess = para.success;
    var olderror = para.error;
    var errorTimer;

    function abort() {
      try {
        if (g && typeof g === 'object' && g.abort) {
          g.abort();
        }
      } catch (error) {
        logger.log(error);
      }

      //如果 g.abort 未生效，手动执行 error
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
        para.error && para.error();
        g.onreadystatechange = null;
        g.onload = null;
        g.onerror = null;
      }
    }

    para.success = function(data) {
      oldsuccess(data);
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
      }
    };
    para.error = function(err) {
      olderror(err);
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
      }
    };
    errorTimer = setTimeout(function() {
      abort();
    }, para.timeout);

    // eslint-disable-next-line no-undef
    if (typeof XDomainRequest !== 'undefined' && g instanceof XDomainRequest) {
      //XDomainRequest success callback
      g.onload = function() {
        para.success && para.success(getJSON(g.responseText));
        g.onreadystatechange = null;
        g.onload = null;
        g.onerror = null;
      };
      //XDomainRequest error callback
      g.onerror = function() {
        para.error && para.error(getJSON(g.responseText), g.status);
        g.onreadystatechange = null;
        g.onerror = null;
        g.onload = null;
      };
    }
    g.onreadystatechange = function() {
      try {
        if (g.readyState == 4) {
          if ((g.status >= 200 && g.status < 300) || g.status == 304) {
            para.success(getJSON(g.responseText));
          } else {
            para.error(getJSON(g.responseText), g.status);
          }
          g.onreadystatechange = null;
          g.onload = null;
        }
      } catch (e) {
        g.onreadystatechange = null;
        g.onload = null;
      }
    };

    g.open(para.type, para.url, true);

    try {
      if (para.credentials) {
        g.withCredentials = true;
      }
      if (isObject(para.header)) {
        each(para.header, function(v, i) {
          g.setRequestHeader && g.setRequestHeader(i, v);
        });
      }

      if (para.data) {
        if (!para.cors) {
          //XDomainRequest no custom headers may be added to the request
          g.setRequestHeader && g.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        if (para.contentType === 'application/json') {
          g.setRequestHeader && g.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        } else {
          g.setRequestHeader && g.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
      }
    } catch (e) {
      logger.log(e);
    }

    g.send(para.data || null);
  }

  /** 对传入数组的每个值执行映射方法，并返映射后值一个新的数组
   * 
   * @param {Array} obj 传入对象
   * @param {iteratorCallback} iterator 迭代器映射方法
   * @returns 源数组每个元素执行映射方法后的的结果组成的新数组
   * @category Array
   * @function map
   * @example
   * var v =map([1,2,3],function(v,i,arr){
   *   console.log(v,i,arr);
   *   return v+10;
   * })
   * // 1 0 [1, 2, 3]
   * // 2 1 [1, 2, 3]
   * // 3 2 [1, 2, 3]
   * v // [11,12,13]
   */
  function map(obj, iterator) {
    var results = [];
    // Not using strict equality so that this acts as a
    // shortcut to checking for `null` and `undefined`.
    if (obj == null) {
      return results;
    }
    if (Array.prototype.map && obj.map === Array.prototype.map) {
      return obj.map(iterator);
    }
    each(obj, function(value, index, list) {
      results.push(iterator(value, index, list));
    });
    return results;
  }

  /** base64 解码，该方法会自动处理 Unicode 字符，
   * 对等的应使用 base64Encode 方法进行编码
   * @param {String} str 传入待解码字符串
   * @category Encoding
   * @function base64Decode
   * @returns 解码后的字符串
   * 
   * @example
   * base64Decode('aGVsbG/kuJbnlYw=')//=> 'hello世界'
   */
  function base64Decode(str) {
    var arr = [];
    try {
      arr = map(atob(str).split(''), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      });
    } catch (e) {
      arr = [];
    }

    try {
      return decodeURIComponent(arr.join(''));
    } catch (e) {
      return arr.join('');
    }
  }

  /** base64 编码码，该方法会自动处理 Unicode 字符，
   * 对等的应使用 base64Decode 方法进行解码
   * @param {*} str 传入待编码字符串
   * @function base64Encode
   * @category Encoding
   * @returns base64 编码后的字符串
   * 
   * @example
   * base64Encode('hello世界') //=> 'aGVsbG/kuJbnlYw='
   */
  function base64Encode(str) {
    var result = '';
    try {
      result = btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
          return String.fromCharCode('0x' + p1);
        })
      );
    } catch (e) {
      result = str;
    }
    return result;
  }

  /**
   * @callback bindReadyCallback
   * @param {Event|String} e  DOMContentLoaded 或 readystatechange 时间回调参数<br>
   * 当页面已经加载完成时，e 的值为 'lazy' 字符串
   */


  /** 监听页面加载完成，页面加载完成时执行回调。
   * 通过 <br>
   * 1. 监听 readystatechange 事件，在事件回调中检测当 readyState 值为 complete 时执行回调<br>
   * 2. 监听 DOMContentLoaded 事件，在事件回调中检测当 readyState 值为 complete 时执行回调<br>
   * 3. 监听 load 事件，在事件回调中检测当 readyState 值为 complete 时执行回调<br>
   * 三个监听任何一个达成回调值行逻辑后取消所有监听 <br>
   * 页面加载完成时调用该方法，会立刻回调，并收到 lazy 回调值
   * @param {bindReadyCallback} fn 页面加载完成回调
   * @param {Window} win 指定 Window
   * @function bindReady
   * @category Event
   * @example
   * bindReady(function()
   * {
   *    console.log('page load complete')
   * });
   */
  function bindReady(fn, win) {
    win = win || window;
    var done = false,
      top = true,
      doc = win.document,
      root = doc.documentElement,
      modern = doc.addEventListener,
      add = modern ? 'addEventListener' : 'attachEvent',
      rem = modern ? 'removeEventListener' : 'detachEvent',
      pre = modern ? '' : 'on',
      init = function(e) {
        if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
        (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true)) fn.call(win, e.type || e);
      },
      poll = function() {
        try {
          root.doScroll('left');
        } catch (e) {
          setTimeout(poll, 50);
          return;
        }
        init('poll');
      };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
      if (!modern && root.doScroll) {
        try {
          top = !win.frameElement;
        } catch (e) {
          logger.log(e);
        }
        if (top) poll();
      }
      doc[add](pre + 'DOMContentLoaded', init, false);
      doc[add](pre + 'readystatechange', init, false);
      win[add](pre + 'load', init, false);
    }
  }

  /** 获取和设置 cookie 的模块
   * @category Bom
   * @exports cookie
   */
  var cookie = {
    /** 根据传入的 cookie 名获取 cookie 值
     * 
     * @param {*} name 要获取的 cookie 名
     * @returns 传入 cookie 名的值
     * @example 
     * cookie.set('key1','value1')
     * cookie.get('key1');//=> value1
     */
    get: function(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          return _decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    },
    /** 根据传入信息设置 cookie
     * 
     * @param {String} name 要设置的 cookie 名
     * @param {String} value 要设置的 cookie 值
     * @param {Number} days 以天为单位的过期时间
     * @param {Boolean} cross_subdomain 是否支持跨子域恭共享，即将 cookie 写入最顶层域名
     * 例如在 a.example.com 中的 cookie 的 domain 将写为 example.com,这样
     * b.example.com 也能读取 a.example 的 cookie，达成 cookie 共享
     * @param {String} cookie_samesite 是否允许跨站请求携带 cookie，可选值有 Lax，Strict，None
     * @param {Boolean} is_secure 是否允许 http 请求携带 cookie，设置为 true 后 cookie 只能通过 https 发送
     * @param {String} domain 设置 cookie 存储的 domain 值
     * 
     * @example 
     * cookie.set('key2','value2',10,true,true,true)
     * cookie.get('key2');//=> value2
     */
    set: function(name, value, days, cross_subdomain, cookie_samesite, is_secure, domain) {
      var cdomain = domain,
        expires = '',
        secure = '',
        samesite = '';
      days = days == null ? 73000 : days;

      // 0 session
      // -1 马上过期
      if (days !== 0) {
        var date = new Date();
        // 默认是天，可以是秒
        if (String(days).slice(-1) === 's') {
          date.setTime(date.getTime() + Number(String(days).slice(0, -1)) * 1000);
        } else {
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        }

        expires = '; expires=' + date.toGMTString();
      }
      if (isString(cookie_samesite) && cookie_samesite !== '') {
        samesite = '; SameSite=' + cookie_samesite;
      }
      if (is_secure) {
        secure = '; secure';
      }

      function getValid(data) {
        if (data) {
          return data.replaceAll(/\r\n/g, '');
        } else {
          return false;
        }
      }
      var valid_name = '';
      var valid_value = '';
      var valid_domain = '';
      if (name) {
        valid_name = getValid(name);
      }
      if (value) {
        valid_value = getValid(value);
      }
      if (cdomain) {
        valid_domain = getValid(cdomain);
      }
      if (valid_name && valid_value) {
        document.cookie = valid_name + '=' + encodeURIComponent(valid_value) + expires + '; path=/' + valid_domain + samesite + secure;
      }
    },
    /** 删除指定 cookie 名的 cookie 值
     * 
     * @param {*} name 要删除的 cookie 名
     * @returns 传入 cookie 名的值
     * @example 
     * cookie.remove('key1','value1')
     * cookie.get('key1');//=> null
     */
    remove: function(name, cross_subdomain) {
      this.set(name, '1', -1, cross_subdomain);
    },
    /** 通过传入的测试 key 和 value 来判断当前环境是否支持 cookie 存储
     * 
     * @param {String} testKey  测试键值
     * @param {String} testValue 测试值
     * @returns {Boolean} 当前环境是否支持 cookie 存储
     * @example
     * cookie.isSupport('a','1') // => true / false
     */
    isSupport: function(testKey, testValue) {
      testKey = testKey || 'cookie_support_test';
      testValue = testValue || '1';
      var self = this;

      function accessNormal() {
        self.set(testKey, testValue);
        var val = self.get(testKey);
        if (val !== testValue) return false;
        self.remove(testKey);
        return true;
      }
      return navigator.cookieEnabled && accessNormal();
    }
  };

  /** 使用源对象对目标对象进行扩展，
   * 如果目标已经有该属性则不覆盖,如果没有的属性加进来
   * @param {Object} obj 目标扩展对象
   * @param {Object} ext 源对象
   * @returns 扩展后的目标对象
   * @function coverExtend
   * @category Util
   * 
   * @example
   * var a = {
   *  name:'Alice',
   *  age:18
   * }
   * 
   * var b = {
   *  name: 'Bob',
   *  favor: 'Apple'
   * }
   * 
   * coverExtend(a,b);
   * a //=> { name: "Alice",age: 18,favor: "Apple"}
   * b //=> { name:'Bob',favor:'Apple'}
   */
  function coverExtend(obj) {
    each(Array.prototype.slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0 && obj[prop] === void 0) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }

  /** 具备异常处理的 URI 解码方法
   * @category Bom
   * @param {String} uri 传入的 uri 字符串
   * @returns {String} 解码后的 uri，如果出现异常则返回原始传入值
   * @function decodeURI
   * @example
   * decodeURI('/hello%E4%B8%96%E7%95%8C') //=> '/hello世界'
   */
  function _decodeURI(uri) {
    var result = uri;
    try {
      result = decodeURI(uri);
    } catch (e) {
      result = uri;
    }
    return result;
  }

  /** 对输入字符串进行乱序混淆，对混淆后的结果再次执行该方法则返回原来输入的值，
   * 只支持大小写字母和数字，其他符号将不作处理
   * @param {String} str 输入字符串
   * @returns 混淆后的值
   * @category Encoding
   * @function dfmapping
   * 
   * @example
   * dfmapping('hello world') //=> 'zrkkm MmekV'
   * dfmapping('zrkkm MmekV') //=> 'hello world'
   * 
   */
  function dfmapping(str) {
    var dfk = 't6KJCZa5pDdQ9khoEM3Tj70fbP2eLSyc4BrsYugARqFIw1mzlGNVXOHiWvxUn8';
    var len = dfk.length - 1;
    var relation = {};
    var i = 0;
    for (i = 0; i < dfk.length; i++) {
      relation[dfk.charAt(i)] = dfk.charAt(len - i);
    }
    var newStr = '';
    for (i = 0; i < str.length; i++) {
      if (str.charAt(i) in relation) {
        newStr += relation[str.charAt(i)];
      } else {
        newStr += str.charAt(i);
      }
    }
    return newStr;
  }

  /** 检测传入参数是否是日期对象
   * @category Util
   * @param {*} arg 传入参数
   * @returns {Boolean} 是否是日期类型
   * @function isDate
   * @example
   * isDate(new Date()) //=> true
   */
  function isDate(arg) {
    return Object.prototype.toString.call(arg) == '[object Date]';
  }

  /** 根据传入的 date 对象返回行如 YYYY-MM-DD HH:MM:SS.sss 的字符串，
   * 如：'2020-02-02 20:20:02.20'
   * @param {Date} date 传入的 date 对象
   * @returns 型如 YYYY-MM-DD:HH:MM:SS.ssssss 的字符串
   * @category Util
   * @function formatDate
   * @example 
   * formatDate(new Date('2020-2-2 8:0:12')) //=> '2020-02-02 08:00:12.00'
   */
  function formatDate(date) {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) + '.' + pad(date.getMilliseconds());
  }

  /** 将传入对象中的所有 Date 类型的值转换为格式为 YYYY-MM-DD HH:MM:SS.sss
   * 的字符串
   * @param {Object} obj 传入的对象
   * @returns {String} 传入对象，所有原有 Date 类型的值均已转换为 格式为 YYYY-MM-DD HH:MM:SS.sss 的字符串
   * @category Util
   * @function encodeDates
   * @example
   * var v =  encodeDates(
   * {
   *   a:new Date('2020-02-02 8:0:12')
   * }) 
   * v //=> {a: '2020-02-02 08:00:12.00'}
   */
  function encodeDates(obj) {
    each(obj, function(v, k) {
      if (isDate(v)) {
        obj[k] = formatDate(v);
      } else if (isObject(v)) {
        obj[k] = encodeDates(v); // recurse
      }
    });
    return obj;
  }

  /** 使用源对象对目标对象进行扩展,
   * 允许扩展到第二级
   * @param {Object} obj 目标扩展对象
   * @param {Object} ext 源对象
   * @returns 扩展后的目标对象
   * @function extend2Lev
   * @category Util
   * 
   * @example
   * var a = {
   *  name:'Alice',
   *  age:18,
   *  address:{
   *    addr1: 'BeiJing',
   *    addr2: 'HeiBei'
   *  }
   * }
   * 
   * var b = {
   *  name: 'Bob',
   *  favor: 'Apple',
   *  address:{
   *    addr1: 'TianJing'
   *  }
   * }
   * 
   * extend2Lev(a,b);
   * 
   * a //=>
   * //{ 
   * // name: 'Bob',
   * // age: 18,
   * // favor: 'Apple',
   * // address:{
   * //   addr1: 'TianJing'
   * //   addr2: 'HeiBei'
   * // }
   * //}
   */

  function extend2Lev(obj) {
    each(Array.prototype.slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0) {
          if (isObject(source[prop]) && isObject(obj[prop])) {
            extend(obj[prop], source[prop]);
          } else {
            obj[prop] = source[prop];
          }
        }
      }
    });
    return obj;
  }

  /**
   * @callback filterCallback filter 过滤函数
   * @param {Object} value 数组中的一项数据
   * @param {Number} index 该项数据的下标
   * @param {Array} sourceArray 源数组
   * @returns {Boolean} 是否通过校验，返回 true 则该数据项会被进入 filter 函数返回的新数组中，否则不会
   */

  /** 使用指定过滤函数在指定源数组每一项上执行，返回一个新的数组包含指定过滤函数返回真值的数组项
   *
   * @param {Array} arr 指定源数组
   * @param {filterCallback} fn 指定过滤函数
   * @param {Object}  context 指定过滤函数执行上下文
   * @returns {Array} 新的数组，包含指定过滤函数值行返回真值的源数组项
   * @category Array
   * @function filter
   *
   * @example
   * filter([1,2,3,4,5,6],
   * function(v,i,arr)
   * {
   *   console.log(v,i,arr);
   *    return v>=4
   * });
   * //=>
   * // 1 0 [1, 2, 3, 4, 5, 6]
   * // 2 1 [1, 2, 3, 4, 5, 6]
   * // 3 2 [1, 2, 3, 4, 5, 6]
   * // 4 3 [1, 2, 3, 4, 5, 6]
   * // 5 4 [1, 2, 3, 4, 5, 6]
   * // 6 5 [1, 2, 3, 4, 5, 6]
   * // [4,5,6] // return value
   */
  function filter(arr, fn, context) {
    var hasOwn = Object.prototype.hasOwnProperty;
    if (arr.filter) {
      return arr.filter(fn);
    }
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
      if (!hasOwn.call(arr, i)) {
        continue;
      }
      var val = arr[i];
      if (fn.call(context, val, i, arr)) {
        ret.push(val);
      }
    }
    return ret;
  }

  /** 指定两个空格作为缩进，对传入对象进行 JSON 字符串转换
   * 
   * @param {Object} obj 传入对象
   * @returns 转换后的 JSON 字符串
   * @function formatJsonString
   * @category Encoding
   * @example 
   * formatJsonString({a:1}) // => '{\n  "a": 1\n}'
   */
  function formatJsonString(obj) {
    try {
      return JSON.stringify(obj, null, '  ');
    } catch (e) {
      return JSON.stringify(obj);
    }
  }

  /**
   * 
   * @param {String} hostname 
   * 传入 hostname，返回一个经过安全校验的 hostname
   * @returns {String}
   */
  function getSafeHostname(hostname) {
    //eslint-disable-next-line
    if (typeof hostname === 'string' && hostname.match(/^[a-zA-Z0-9\u4e00-\u9fa5\-\.]+$/)) {
      return hostname;
    } else {
      return '';
    }
  }

  /** 获取指定域名的顶级域名， 例如在 a.example.com 中调用该方法，将返回 example.com
   * 
   * @param {String} ?hostname 指定域名，缺省值为当前域名
   * @param {String} ?testFlag 指定 cookie 测试方法，获取顶层域名的原理是通过不断尝试在当前域名的上一层域名进行 cookie 读写测试，
   * 来确定最终可以安全读写 cookie 的顶层域名，testFlag 为这个测试 cookie 的名字，如果不填写，将使用 domain_test 作为 testFlag
   * @returns {String} 指定域名的顶级域名
   * @function getCookieTopLevelDomain
   * @category Bom
   * 
   * @example
   * // 在 www.example.com 域名下
   * getCookieTopLevelDomai() //=> example.com
   */
  function getCookieTopLevelDomain(hostname, testFlag) {
    hostname = hostname || location.hostname;
    testFlag = testFlag || 'domain_test';

    var new_hostname = getSafeHostname(hostname);

    var splitResult = new_hostname.split('.');
    if (isArray(splitResult) && splitResult.length >= 2 && !/^(\d+\.)+\d+$/.test(new_hostname)) {
      var domainStr = '.' + splitResult.splice(splitResult.length - 1, 1);
      while (splitResult.length > 0) {
        domainStr = '.' + splitResult.splice(splitResult.length - 1, 1) + domainStr;
        document.cookie = testFlag + '=true; path=/; domain=' + domainStr;

        if (document.cookie.indexOf(testFlag + '=true') !== -1) {
          var nowDate = new Date();
          nowDate.setTime(nowDate.getTime() - 1000);

          document.cookie = testFlag + '=true; expires=' + nowDate.toGMTString() + '; path=/; SameSite=Lax; domain=' + domainStr;

          return domainStr;
        }
      }
    }
    return '';
  }

  /** 通过选择器获取 dom 元素
   * 
   * @param {String} selector 选择器
   * @returns {Element} 与选择器匹配的 dom 元素
   * @category Dom
   * @function getDomBySelector
   */
  function getDomBySelector(selector) {
    if (!isString(selector)) {
      return null;
    }
    var arr = selector.split('>');
    var el = null;

    function getDom(selector, parent) {
      selector = trim(selector);
      var node;
      if (selector === 'body') {
        return document.getElementsByTagName('body')[0];
      }
      if (selector.indexOf('#') === 0) {
        //如果是id选择器 #login
        selector = selector.slice(1);
        node = document.getElementById(selector);
      } else if (selector.indexOf(':nth-of-type') > -1) {
        //div:nth-of-type(1)
        var arr = selector.split(':nth-of-type');
        if (!(arr[0] && arr[1])) {
          //格式不正确，返回空
          return null;
        }
        var tagname = arr[0];
        var indexArr = arr[1].match(/\(([0-9]+)\)/);
        if (!(indexArr && indexArr[1])) {
          //没有匹配到正确的标签序号，返回空
          return null;
        }
        var num = Number(indexArr[1]); //标签序号
        if (!(isElement(parent) && parent.children && parent.children.length > 0)) {
          return null;
        }
        var child = parent.children;

        for (var i = 0; i < child.length; i++) {
          if (isElement(child[i])) {
            var name = child[i].tagName.toLowerCase();
            if (name === tagname) {
              num--;
              if (num === 0) {
                node = child[i];
                break;
              }
            }
          }
        }
        if (num > 0) {
          //子元素列表中未找到
          return null;
        }
      }
      if (!node) {
        return null;
      }
      return node;
    }

    function get(parent) {
      var tagSelector = arr.shift();
      var element;
      if (!tagSelector) {
        return parent;
      }
      try {
        element = getDom(tagSelector, parent);
      } catch (error) {
        logger.log(error);
      }
      if (!(element && isElement(element))) {
        return null;
      } else {
        return get(element);
      }
    }
    el = get();
    if (!(el && isElement(el))) {
      return null;
    } else {
      return el;
    }
  }

  /** 获取元素的文本内容
   * 
   * @param {Element} element dom 元素
   * @param {String} tagName 元素的标签名
   * @returns {String} 元素文本内容
   * @function getElementContent
   * @category Dom
   * 
   * @example
   * var button = document.getElementById('btn1'); // <button id='btn1'>test</button>
   * getElementContent(button,'button'); //=> test
   */
  function getElementContent(element, tagName) {
    var textContent = '';
    var element_content = '';
    if (element.textContent) {
      textContent = trim(element.textContent);
    } else if (element.innerText) {
      textContent = trim(element.innerText);
    }
    if (textContent) {
      textContent = textContent
        .replace(/[\r\n]/g, ' ')
        .replace(/[ ]+/g, ' ')
        .substring(0, 255);
    }
    element_content = textContent || '';

    if (tagName === 'input' || tagName === 'INPUT') {
      element_content = element.value || '';
    }
    return element_content;
  }

  /** 获取指定 url 的域名
   * 
   * @param {String} url 传入指定的 url 
   * @param {String} defaultValue 域名默认值，如果解析失败则返回该默认值
   * @returns 解析到的 url 的域名
   * @category Bom
   * @function getHostname
   * @example getHostname('https://www.example.com') //=> 'www.example.com'
   */
  function getHostname(url, defaultValue) {
    if (!defaultValue || typeof defaultValue !== 'string') {
      defaultValue = 'hostname解析异常';
    }
    var hostname = null;
    try {
      hostname = _URL(url).hostname;
    } catch (e) {
      logger.log('getHostname传入的url参数不合法！');
    }
    return hostname || defaultValue;
  }

  /** 通过调用 Navigator.appVersion 获取 ios 系统版本号
   * @function getIOSVersion
   * @category Bom
   * @returns {String} IOS 设备的系统版本号,如果获取失败则返回空字符串
   */
  function getIOSVersion() {
    try {
      var version = navigator.appVersion.match(/OS (\d+)[._](\d+)[._]?(\d+)?/);
      return version && version[1] ? Number.parseInt(version[1], 10) : '';
    } catch (e) {
      return '';
    }
  }

  /** 获取 url 中指定查询参数的值
   * 
   * @param {String} url 传入 url
   * @param {String} key 指定需要获取的查询参数的 key
   * @returns {String} url 查询参数中指定 key 的值
   * @function getQueryParam
   * @category Bom
   * @example
   * var val = getQueryParam('https://a.b.com?a=1&b=2','b');
   * console.log(val); // => 2
   */
  function getQueryParam(url, key) {
    //eslint-disable-next-line
    key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    url = _decodeURIComponent(url);
    var regexS = '[\\?&]' + key + '=([^&#]*)',
      regex = new RegExp(regexS),
      results = regex.exec(url);
    if (results === null || (results && typeof results[1] !== 'string' && results[1].length)) {
      return '';
    } else {
      return _decodeURIComponent(results[1]);
    }
  }

  /**
   * 解析传入 url 中查询参数到一个含有查询参数列表的 key/value 对象
   * @param {string} url - 传入 url 字符串
   * @return {Object} 一个含有参数列表的 key/value 对象
   *
   * @example
   * var url = _.getQueryParamsFromUrl('https://a.b.com?project=testproject&query1=test&silly=willy&field[0]=zero&field[2]=two#test=hash&chucky=cheese');
   *
   * url.project; // => testproject
   * @category Bom
   * @function getQueryParamsFromUrl
   */

  function getQueryParamsFromUrl(url) {
    var result = {};
    var arr = url.split('?');
    var queryString = arr[1] || '';
    if (queryString) {
      result = getURLSearchParams('?' + queryString);
    }
    return result;
  }

  /** 检测是否支持媒体查询
   * @function mediaQueriesSupported
   * @category Bom
   * @returns {Boolean}  是否支持媒体查询
   * @example
   * // 支持媒体查询的浏览器中
   * mediaQueriesSupported()// => true
   */
  function mediaQueriesSupported() {
    return typeof window.matchMedia != 'undefined' || typeof window.msMatchMedia != 'undefined';
  }

  /** 返回当前屏幕方向，可能值 ['未取到值', 'landscape', 'portrait']
   * 经过以下测试：<br>
   * IE 6 => '未取到值'<br>
   * Opera 15 on macOS<br>
   * Firefox 68 on macOS<br>
   * Safari 12.1 on macOS<br>
   * Chrome 75 on macOS<br>
   * Safari on iPhone X<br>
   * Chrome on Google Pixel 2<br>
   * @category Bom
   * @function getScreenOrientation
   * @returns 屏幕方向，可能值 ['未取到值', 'landscape', 'portrait']
   * @example getScreenOrientation() //=> 'landscape'
   */
  function getScreenOrientation() {
    // Screen Orientation API
    var screenOrientationAPI = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;
    var screenOrientation = '未取到值';
    if (screenOrientationAPI) {
      screenOrientation = screenOrientationAPI.indexOf('landscape') > -1 ? 'landscape' : 'portrait';
    } else if (mediaQueriesSupported()) {
      // matchMedia
      var matchMediaFunc = window.matchMedia || window.msMatchMedia;
      if (matchMediaFunc('(orientation: landscape)').matches) {
        screenOrientation = 'landscape';
      } else if (matchMediaFunc('(orientation: portrait)').matches) {
        screenOrientation = 'portrait';
      }
    }
    return screenOrientation;
  }

  /**
   * @typedef BrowserInfo 浏览器信息
   * @property {Number} ?opera 欧朋版本号
   * @property {Number} ?ie IE 版本号
   * @property {Number} ?edge Edge 版本号
   * @property {Number} ?firefox Firefox 版本号
   * @property {Number} ?chrome Chrome 版本号
   * @property {Number} ?safari Safari 版本号
   */

  /** 通过浏览器 UserAgent 获取当前浏览器型号和版本
   * @category Bom
   * @returns {BrowserInfo} 浏览器型号和版本
   * @function getUA
   * @example
   * var browserInfo = getUA();
   * console.log(browserInfo); // => {chrome: 98}
   */
  function getUA() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    if ((s = ua.match(/ qq\/([\d.]+)/))) {
      Sys.qqBuildinBrowser = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/mqqbrowser\/([\d.]+)/))) {
      Sys.qqBrowser = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/opera.([\d.]+)/))) {
      Sys.opera = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/msie ([\d.]+)/))) {
      Sys.ie = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/edge.([\d.]+)/))) {
      Sys.edge = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/firefox\/([\d.]+)/))) {
      Sys.firefox = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/chrome\/([\d.]+)/))) {
      Sys.chrome = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/version\/([\d.]+).*safari/))) {
      Sys.safari = Number(s[1].match(/^\d*.\d*/));
    } else if ((s = ua.match(/trident\/([\d.]+)/))) {
      Sys.ie = 11;
    }
    return Sys;
  }

  /** 对传入的 url 字符串进行头尾空格去除，并进行 decodeURI 解码<br>
   * 若未传入 url 则对当前页面的地址进行 decodeURI 解码并返回
   * @param {String} ?url 传入 url 字符串
   * @returns 返回解码后的 url 或 decodeURI 解码后的当前页面地址
   * @category Bom
   * @function getURL
   * 
   * @example
   * // 在 https://www.example.com
   * getURL() //=> https://www.example.com
   */
  function getURL(url) {
    if (isString(url)) {
      url = trim(url);
      return _decodeURI(url);
    } else {
      return _decodeURI(location.href);
    }
  }

  /** 对传入的 url_path 字符串进行头尾空格去除，并进行 decodeURI 解码<br>
   * 若未传入 url_path 则对当前页面 URL 的路径部分进行 decodeURI 解码并返回
   * @param {String} ?url_path 传入 url_path 字符串
   * @returns 返回解码后的 url_path 或 decodeURI 解码后的当前页面 URL 的路径部分
   * @category Bom
   * @function getURLPath
   *
   * @example
   * // 在 "http://localhost:8080/世界.html"
   * getURLPath() //=> "/世界.html"
   */
  function getURLPath(url_path) {
    if (isString(url_path)) {
      url_path = trim(url_path);
      return _decodeURI(url_path);
    } else {
      return _decodeURI(location.pathname);
    }
  }

  /** 检测是否具有指定属性名的属性
   * @category Dom
   * @param {Element} ele 传入 dom 元素
   * @param {String} attrName 属性名
   * @returns {Boolean} 是否具有指定属性名的属性
   * @function hasAttribute
   * 
   * @example
   * var d = document.getElementById('sp1'); //<div id='sp1' test='123'></div>
   * hasAttribute(d,'test') //=> true
   */
  function hasAttribute(ele, attrName) {
    if (ele.hasAttribute) {
      return ele.hasAttribute(attrName);
    } else if (ele.attributes) {
      return !!(ele.attributes[attrName] && ele.attributes[attrName].specified);
    }
  }

  /** 检测传入 Dom 元素是否具有指定属性名数组中有至少一个属性
   * @category Dom
   * @param {Element} ele 传入 Dom 元素
   * @param {Array} attrNames 传入属性名字符串数组
   * @returns Dom 元素是否具有指定属性名数组中有至少一个属性
   * @function hasAttributes
   * 
   * @example
   * var d = document.getElementById('sp1'); //<div id='sp1' test='123' test2='345'></div>
   * hasAttribute(d,['test']) //=> true
   */
  function hasAttributes(ele, attrNames) {
    if (typeof attrNames === 'string') {
      return hasAttribute(ele, attrNames);
    } else if (isArray(attrNames)) {
      var result = false;
      for (var i = 0; i < attrNames.length; i++) {
        var testResult = hasAttribute(ele, attrNames[i]);
        if (testResult) {
          result = true;
          break;
        }
      }
      return result;
    }
  }

  /** 对传入字符串做哈希计算,取值范围为 ±1E10
   * @category Encoding
   * @param {*} str 传入字符串 
   * @returns 传入字符串的 hash 值
   * @function hashCode 
   * 
   * @example
   * hasdCode('hello world') //=> 1794106052
   */
  function hashCode(str) {
    if (typeof str !== 'string') {
      return 0;
    }
    var hash = 0;
    var char = null;
    if (str.length == 0) {
      return hash;
    }
    for (var i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }

  /** 对传入字符串进行 hash 计算，哈希值范围为 JS 可表示的安全值范围 ±9E15
   * @category Encoding
   * @param {String} str 传入字符串
   * @returns {Number} 传入字符串的哈希值
   * @function hashCode53
   * 
   * @example
   * hashCode53('hello world') //=> -5975507814869267
   */
  function hashCode53(str) {
    var max53 = 9007199254740992;
    var min53 = -9007199254740992;
    var factor = 31;
    var hash = 0;
    if (str.length > 0) {
      var val = str.split('');
      for (var i = 0; i < val.length; i++) {
        var aVal = val[i].charCodeAt();
        var nextHash = factor * hash + aVal;
        if (nextHash > max53) {
          hash = min53 + hash;
          while (((nextHash = factor * hash + aVal), nextHash < min53)) {
            hash = hash / 2 + aVal;
          }
        }
        if (nextHash < min53) {
          hash = max53 + hash;
          while (((nextHash = factor * hash + aVal), nextHash > max53)) {
            hash = hash / 2 + aVal;
          }
        }
        hash = factor * hash + aVal;
      }
    }
    return hash;
  }

  /** 在指定数组中查找目标对象的位置，若没有找到则返回 -1
   * 
   * @param {Array} arr 传入数组
   * @param {Object} target 查找目标
   * @returns 查找目标的下标
   * @function indexOf
   * @category Array
   * 
   * @example
   * indexOf([1,2,3,4],2) //=> 1
   */
  function indexOf(arr, target) {
    var indexof = arr.indexOf;
    if (indexof) {
      return indexof.call(arr, target);
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (target === arr[i]) {
          return i;
        }
      }
      return -1;
    }
  }

  /** 简单的原型链继承
   * @category Util
   * @function inherit
   * @param {Function} subclass 子类构造函数
   * @param {Function} superclass 父类构造函数
   * @returns {Function} 继承父类后的字类
   * 
   * @example
   * function A (){
   *  this.say = function (arg){
   *    console.log('say: ' + arg);
   *  }
   * }
   * 
   * function B(){
   *  this.sing = function (arg){
   *    console.log('sing: ' +  arg);
   *  }
   * }
   * 
   * inherit(A,B);
   * 
   * var a =new A();
   * a.say('hello'); // say: hello
   * a.sing('hello'); // sing: hello
   */
  function inherit(subclass, superclass) {
    subclass.prototype = new superclass();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
    return subclass;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /**检测是否是函数内部 arguments 对象
   * @category Util
   * @param {*} arg 传入参数 
   * @returns {Boolean} 是否是函数内部 arguments 对象
   * @function isArguments
   * 
   * @example 
   * (
   * function(){
   * var v = isArguments(arguments); 
   * console.log(v) //=> true
   * }()
   * )
   */
  function isArguments(arg) {
    return !!(arg && hasOwnProperty.call(arg, 'callee'));
  }

  /**检测是否是布尔值
   * @category Util
   * @param {*} arg 传入参数
   * @returns {Boolean} 是否是布尔类型
   * @function isBoolean
   * 
   * @example
   * isBoolean(true) //=> true
   */
  function isBoolean(arg) {
    return Object.prototype.toString.call(arg) == '[object Boolean]';
  }

  /** 检测传入参数是否是空对象
   * @category Util
   * @param {*} arg 传入参数
   * @returns {Boolean} 是否是空对象
   * @function isEmptyObject
   * @example
   * isEmptyObject({}) //=> true
   */
  function isEmptyObject(arg) {
    if (isObject(arg)) {
      for (var key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  /** 检测传入字符串是否是 http 或 https 地址
   * @category Util
   * @param {String} str 传入字符串
   * @returns {Boolean} 是否是 http 或 https 地址
   * @function isHttpUrl
   * 
   * @example
   * isHttpUrl('https://www.example.com') //=> true
   */
  function isHttpUrl(str) {
    if (typeof str !== 'string') return false;
    var _regex = /^https?:\/\/.+/;
    if (_regex.test(str) === false) {
      logger.log('Invalid URL');
      return false;
    }
    return true;
  }

  /** 检测是否是 iOS 系统
   * @category Bom
   * @function isIOS
   * @returns {Boolean} 是否是 iOS 系统
   * 
   * @example
   * // 在 iOS 设备中
   * isIOS() //=> true
   */
  function isIOS() {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  }

  /** 检测传入参数是否是合法 JSON 字符串
   * @category Util
   * @param {String} arg 传入字符串
   * @returns {Boolean} 是否是合法 JSON 字符串类型
   * @function isJSONString
   * @example
   * isJSONString("{\"a\":123}") //=> true
   */
  function isJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  /** 检测传入参数是否是数字
   * @category Util
   * @param {*} arg 传入参数
   * @returns {Boolean} 是否是数字类型
   * @function isNumber
   * 
   * @example
   * isNumber(1234) //=> true
   */
  function isNumber(arg) {
    /* eslint-disable-next-line */
    return Object.prototype.toString.call(arg) == '[object Number]' && /[\d\.]+/.test(String(arg));
  }

  /** 检测是否支持 Beacon 数据发送
   * @category Bom
   * @function isSupportBeaconSend
   * @returns {Boolean} 是否支持 Beacon 数据发送
   * @example 
   * // 再支持 beacon 的浏览器中
   * isSupportBeaconSend()//=> true
   */
  function isSupportBeaconSend() {
    var supported = false;
    if (typeof navigator !== 'object' || typeof navigator.sendBeacon !== 'function') {
      return supported;
    }

    var Sys = getUA();
    var ua = navigator.userAgent.toLowerCase();
    //sendBeacon 浏览器兼容性检测
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      //iOS 上的 Safari11.1–12 无法向未访问的来源发送信号，已在iOS13中修复。
      var reg = /os [\d._]*/gi;
      var verinfo = ua.match(reg);
      var version = (verinfo + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
      var ver = version.split('.');
      if (typeof Sys.safari === 'undefined') {
        Sys.safari = ver[0];
      }
      if (ver[0] && (Sys.qqBuildinBrowser || Sys.qqBrowser)) {
        supported = false;
      } else if (ver[0] && ver[0] < 13) {
        if (Sys.chrome > 41 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 12) {
          supported = true;
        }
      } else if (Sys.chrome > 41 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 11.3) {
        supported = true;
      }
    } else {
      if (Sys.chrome > 38 || Sys.edge > 13 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 11.0) {
        supported = true;
      }
    }
    return supported;
  }

  /** 检测是否支持跨域的 ajax 数据发送
   * @category Bom
   * @function isSupportCors
   * @returns {Boolean}
   * @example 
   * // 在支持跨域请求的浏览器中 
   * isSupportCors()//=> true
   */
  function isSupportCors() {
    if (typeof window.XMLHttpRequest === 'undefined') {
      return false;
    }
    //Detect browser support for CORS
    if ('withCredentials' in new XMLHttpRequest()) {
      /* supports cross-domain requests */
      return true;
    } else if (typeof XDomainRequest !== 'undefined') {
      //Use IE-specific "CORS" code with XDR
      return true;
    } else {
      //Time to retreat with a fallback or polyfill
      return false;
    }
  }

  /**
   * @callback jsonpSuccessCallback  jsonp 请求成功回调
   * @param {Object} data jsonp 请求成功回调数据
   */

  /**
   * @callback jsonpErrorCallback jsonp 请求失败回调
   * @param {Object} error jsonp 请求失败回调数据
   */

  /**
   * @typedef {Object} JsonpRequestArg jsonp 请求参数
   * @property {String} url 请求地址
   * @property {String} callbackName jsonp 数据回调函数，需要与服务端一致
   * @property {Object} data 服务端需要的其他参数，会拼接在 url 后
   * @property {jsonpSuccessCallback} success 请求成功回调函数
   * @property {jsonpErrorCallback} error 请求异常回调函数
   * @property {Number} timeout 超时时间
   */

  /** 发起 jsonp 请求
   *  
   * @param {JsonpRequestArg} obj  jsonp 请求参数体
   * @category Bom
   * @function jsonp
   * @example
   * _.jsonp({
   *   url:'https://example.com',
   *   callbackName:'myDataCallback',
   *   data:{name:'Alice'}, //服务端需要的其他参数，拼接在url后
   *   success:function(data){console.log(data)},
   *   error:function(err){console.error(err)},
   *   timeout:3000
   * });
   */
  function jsonp(obj) {
    if (!(isObject(obj) && isString(obj.callbackName))) {
      logger.log('JSONP 请求缺少 callbackName');
      return false;
    }
    obj.success = isFunction(obj.success) ? obj.success : function() {};
    obj.error = isFunction(obj.error) ? obj.error : function() {};
    obj.data = obj.data || '';
    var script = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    var timer = null;
    var isError = false; //防止失败逻辑重复触发
    head.appendChild(script);
    if (isNumber(obj.timeout)) {
      timer = setTimeout(function() {
        if (isError) {
          return false;
        }
        obj.error('timeout');
        window[obj.callbackName] = function() {
          logger.log('call jsonp error');
        };
        timer = null;
        head.removeChild(script);
        isError = true;
      }, obj.timeout);
    }
    window[obj.callbackName] = function() {
      clearTimeout(timer);
      timer = null;
      obj.success.apply(null, arguments);
      window[obj.callbackName] = function() {
        logger.log('call jsonp error');
      };
      head.removeChild(script);
    };
    if (obj.url.indexOf('?') > -1) {
      obj.url += '&callbackName=' + obj.callbackName;
    } else {
      obj.url += '?callbackName=' + obj.callbackName;
    }
    if (isObject(obj.data)) {
      var arr = [];
      each(obj.data, function(value, key) {
        arr.push(key + '=' + value);
      });
      obj.data = arr.join('&');
      obj.url += '&' + obj.data;
    }
    script.onerror = function(err) {
      if (isError) {
        return false;
      }
      window[obj.callbackName] = function() {
        logger.log('call jsonp error');
      };
      clearTimeout(timer);
      timer = null;
      head.removeChild(script);
      obj.error(err);
      isError = true;
    };
    script.src = obj.url;
  }

  /**
   * @typedef listenPageStateArg 监听页面状态变化参数
   * @property {callback} visible 页面从不见到可见回调
   * @property {callback} hidden 页面从可见到不可见对调
   */

  /** 监听页面状态变化，包括页面隐藏、显示、切换、获取焦点、丢失焦点<br>
   * 暴露 visible 和 hidden 回调，详细参见 listenPageStateArg <br>
   * <strong>触发 visible 回调的时机:</strong> 获取焦点、或 visibilitychange 事件发生且当前页面可见 <br>
   * <strong>触发 hidden 回调的时机:</strong>丢失焦点、或 visibilitychange 事件发生且当前页面不可见 <br>
   * @param {listenPageStateArg} obj 监听页面传参数、详细参见 listenPageStateArg
   * @category Event
   * @function listenPageState
   * 
   * @example
   * listenPageState({
   *  visible:function(){
   *   console.log('Page shows');
   *  },
   *  hidden:function(){
   *   console.log('Page hides');
   *  }
   * })
   */
  function listenPageState(obj) {
    var visibilystore = {
      visibleHandler: isFunction(obj.visible) ? obj.visible : function() {},
      hiddenHandler: isFunction(obj.hidden) ? obj.hidden : function() {},
      visibilityChange: null,
      hidden: null,
      isSupport: function() {
        return typeof document[this.hidden] !== 'undefined';
      },
      init: function() {
        if (typeof document.hidden !== 'undefined') {
          this.hidden = 'hidden';
          this.visibilityChange = 'visibilitychange';
        } else if (typeof document.mozHidden !== 'undefined') {
          this.hidden = 'mozHidden';
          this.visibilityChange = 'mozvisibilitychange';
        } else if (typeof document.msHidden !== 'undefined') {
          this.hidden = 'msHidden';
          this.visibilityChange = 'msvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
          this.hidden = 'webkitHidden';
          this.visibilityChange = 'webkitvisibilitychange';
        }
        this.listen();
      },
      listen: function() {
        if (!this.isSupport()) {
          addEvent(window, 'focus', this.visibleHandler);
          addEvent(window, 'blur', this.hiddenHandler);
        } else {
          var _this = this;
          addEvent(
            document,
            this.visibilityChange,
            function() {
              if (!document[_this.hidden]) {
                _this.visibleHandler();
              } else {
                _this.hiddenHandler();
              }
            },
            1
          );
        }
      }
    };
    visibilystore.init();
  }

  /**
   * @typedef {Object} loadScriptArg 加载脚本参数
   * @property {String} url 脚本的网络地址
   * @property {String} type 脚本类型，可选值有 js、css
   * @property {callback} success 脚本加载成功回调
   * @property {callback} error 脚本加载失败回调
   */

  /** 加载 javascript 脚本或 css 脚本
   * @category Dom
   * @function loadScript
   * @param {loadScriptArg} para 加载脚本的参数，指定加载脚本类型及回调
   * 
   * @example
   * loadScript({
   *   url:'/test.js',
   *   type:'js',
   *   success:function(){console.log('js script load succeed')}
   * })
   */
  function loadScript(para) {
    para = extend({
        success: function() {},
        error: function() {},
        appendCall: function(g) {
          document.getElementsByTagName('head')[0].appendChild(g);
        }
      },
      para
    );

    var g = null;
    if (para.type === 'css') {
      g = document.createElement('link');
      g.rel = 'stylesheet';
      g.href = para.url;
    }
    if (para.type === 'js') {
      g = document.createElement('script');
      g.async = 'async';
      g.setAttribute('charset', 'UTF-8');
      g.src = para.url;
      g.type = 'text/javascript';
    }
    g.onload = g.onreadystatechange = function() {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        para.success();
        g.onload = g.onreadystatechange = null;
      }
    };
    g.onerror = function() {
      para.error();
      g.onerror = null;
    };
    // if iframe
    para.appendCall(g);
  }

  /** 删除传入字符串开头的 'javascript'
   * 
   * @param {String} str 传入字符串
   * @returns 删除字符串头部 'javascript' 后的字符串
   * 
   * @example
   * removeScriptProtocol('javascript:alert(123)');//=>':alert(123)'
   */
  function removeScriptProtocol(str) {
    if (typeof str !== 'string') return '';
    var _regex = /^\s*javascript/i;
    while (_regex.test(str)) {
      str = str.replace(_regex, '');
    }
    return str;
  }

  /** 对传入字符串进行 rot13 加密
   * @category Encoding
   * @param {String} str 传入字符串
   * @returns {String} 进行 rot13 加密后的字符串
   * @function rot13obfs
   * @example
   * rot13obfs('hello') //=> 'uryy|'
   */
  function rot13obfs(str, key) {
    str = String(str);
    key = typeof key === 'number' ? key : 13;
    var n = 126;

    var chars = str.split('');

    for (var i = 0, len = chars.length; i < len; i++) {
      var c = chars[i].charCodeAt(0);

      if (c < n) {
        chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + key) % n);
      }
    }

    return chars.join('');
  }

  /**
   * 对传入字符串进行 rot13 解密
   * @function rot13defs
   * @category Encoding
   * @param {String} str 传入待加密的字符串
   * @return {String} rot13 解密后的字符串
   * 
   * @example
   * rot13defs('uryy|') //=> hello
   */
  function rot13defs(str) {
    var key = 13,
      n = 126;
    str = String(str);

    return rot13obfs(str, n - key);
  }

  /** 将传入对象中的所有 Date 类型的值转换为格式为 YYYY-MM-DD HH:MM:SS.sss
   * 的字符串
   * 
   * @param {Object} obj 传入对象
   * @returns {String} 传入对象，所有原有 Date 类型的值均已转换为 格式为 YYYY-MM-DD HH:MM:SS.sss 的字符串
   * @category Util
   * @function searchObjDate
   * @example
   * var v =  encodeDates(
   * {
   *   a:new Date('2020-02-02 8:0:12')
   * }) 
   * v //=> {a: '2020-02-02 08:00:12.00'}
   */
  function searchObjDate(o) {
    if (isObject(o)) {
      each(o, function(a, b) {
        if (isObject(a)) {
          searchObjDate(o[b]);
        } else {
          if (isDate(a)) {
            o[b] = formatDate(a);
          }
        }
      });
    }
  }

  /** 一个封装了 sessionStorage 的对象 <br>
   * 目前只提供检测是否支持 sessionStorage 的方法
   * @category Bom
   * @exports sessionStorage
   */
  var _sessionStorage = {
    /** 检测当前浏览器是否支持 sessionStorage 存储
     * @returns {Boolean} 返回当前浏览器是否支持 sessionStorage 存储
     * @example 
     * // 在支持 sessionStorage 的浏览器中
     * sessionStorage.isSupport() //=> true
     */
    isSupport: function() {
      var supported = true;
      var supportName = '__session_storage_support__';
      var val = 'testIsSupportStorage';
      try {
        if (sessionStorage && sessionStorage.setItem) {
          sessionStorage.setItem(supportName, val);
          sessionStorage.removeItem(supportName, val);
          supported = true;
        } else {
          supported = false;
        }
      } catch (e) {
        supported = false;
      }
      return supported;
    }
  };

  /** 创建 style 标签，填入传入 css 样式字符串
   * @function setCssStyle
   * @category Dom
   * @param {String} css 传入样式字符串
   * @example 
   * setCssStyle(
   *  `body
   *   { 
   *     background :red
   *   }
   * `)
   * // html head 中将插入 
   * // <style>
   * //   body 
   * //   { 
   * //     background:red
   * //   }
   * // </style>
   */
  function setCssStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    try {
      style.appendChild(document.createTextNode(css));
    } catch (e) {
      style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName('head')[0];
    var firstScript = document.getElementsByTagName('script')[0];
    if (head) {
      if (head.children.length) {
        head.insertBefore(style, head.children[0]);
      } else {
        head.appendChild(style);
      }
    } else {
      firstScript.parentNode.insertBefore(style, firstScript);
    }
  }

  /** 将传入字符串转换为 unicode 编码
   * @category Encoding
   * @param {String} str 传入字符串
   * @returns {String} 传入字符串的 unicode 编码
   * @function strToUnicode
   * @example 
   * strToUnicode('hello 世界') // => '\\68\\65\\6c\\6c\\6f\\20\\4e16\\754c'
   */
  function strToUnicode(str) {
    if (typeof str !== 'string') {
      logger.log('转换unicode错误', str);
      return str;
    }
    var nstr = '';
    for (var i = 0; i < str.length; i++) {
      nstr += '\\' + str.charCodeAt(i).toString(16);
    }
    return nstr;
  }

  /** 传入一个函数返回该函数的防抖函数
   * @category Util
   * @param {Function} func 需要进行防抖的函数值行体
   * @param {Number} wait 防抖阈值，毫秒单位
   * @returns 传入函数的防抖函数
   * @function throttle
   * 
   * @example
   * 
   * function log(){
   *   console.log('hello');
   * }
   * 
   * var throttleLog = throttle(log,1000);
   * setInterval(throttleLog,100);
   * // 每个间隔一秒打印一次 hello
   * hello
   * hello // 1s later
   * hello // 1s later
   * ...
   */
  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var nowtime = now();
      if (!previous && options.leading === false) previous = nowtime;
      var remaining = wait - (nowtime - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = nowtime;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  /** 将传入对象中所有属性的值通过一个数组返回
   * @category Array
   * @param {*} obj 传入对象
   * @returns {Array} 一个包含了传入对象所有属性值的数组
   * @function values
   * 
   * @example
   * var a={
   *  a:1,
   *  b:2,
   *  c:'hello'
   * }
   * var b = values (a)
   * b //=> [1,2,'hello']
   */
  function values(obj) {
    var results = [];
    if (obj == null) {
      return results;
    }
    each(obj, function(value) {
      results[results.length] = value;
    });
    return results;
  }

  /** 将传入的对象或类数组转换为数组
   * @category Array
   * @param {Array|Object} iterable 传入的对象或类数组
   * @returns {Array} 包含对象或类数组的成员的数组
   * @function toArray
   * @example
   * toArray({a:1,b:2})// =>[1, 2]
   * toArray([1,2]) // =>[1, 2]
   */
  function toArray(iterable) {
    if (!iterable) {
      return [];
    }
    if (iterable.toArray) {
      return iterable.toArray();
    }
    if (isArray(iterable) || isArguments(iterable)) {
      return Array.prototype.slice.call(iterable);
    }
    return values(iterable);
  }

  /** 对传入数组进行去重，返回新的数组
   * @category Array
   * @param {Array} arr 传入数组参数
   * @returns {Array} 去重后的数组
   * @function unique
   * 
   * @example
   * var a = [1,1,2,3,3,4,5]
   * var b = unique(a);
   * b //=> [1,2,3,4,5,]
   */
  function unique(arr) {
    var temp,
      n = [],
      o = {};
    for (var i = 0; i < arr.length; i++) {
      temp = arr[i];
      if (!(temp in o)) {
        o[temp] = true;
        n.push(temp);
      }
    }
    return n;
  }

  var ENC = {
    '+': '-',
    '/': '_',
    '=': '.'
  };
  var DEC = {
    '-': '+',
    _: '/',
    '.': '='
  };

  /** 安全的 base64 编码, 将 base64 中的 '+', '/', '=' 分别替换为 '-', '_', '.' <br>
   * 以此避免 base64 编码值被代码扫描工具识别为有害代码
   * @exports urlSafeBase64
   * @category Encoding
   */
  var urlSafeBase64 = {
    /**
     * 对 base64 编码字符串进行再编码， 将字符串中的 '+', '/', '=' 分别替换为 '-', '_', '.'
     * @param {String} base64  base64 编码后的字符串
     * @return {String} 执行替换后的 base64 字符串
     */
    encode: function(base64) {
      return base64.replace(/[+/=]/g, function(m) {
        return ENC[m];
      });
    },

    /**
     * 对安全再编码后的 base64 字符串进行解码， 将字符串中的  '-', '_', '.' 分别替换为 '+', '/', '='
     * @param {String} safe 再编码后的 base64 字符串
     * @return {String} 执行解码还原后的 base64 字符串
     */
    decode: function(safe) {
      return safe.replace(/[-_.]/g, function(m) {
        return DEC[m];
      });
    },

    /**
     * 去除 base64 编码后的字符串中的 '=' 和 '.'
     * @param {String} string base64  编码后的字符串
     * @return {String} 去除 base64 编码字符串中的 '=' 和 '.' 后的字符串
     */
    trim: function(string) {
      return string.replace(/[.=]{1,2}$/, '');
    },

    /**
     * 检测传入字符串是否是 base64 编码的字符串
     * @param {String} string 传入字符串
     * @return {Boolean} 是否是 base64 编码的字符串
     */
    isBase64: function(string) {
      return /^[A-Za-z0-9+/]*[=]{0,2}$/.test(string);
    },

    /**
     * 检测传入字符串是否是安全的 base64 编码的字符串
     * @param {String} string 传入字符串
     * @return {Boolean}  是否是安全 base64 编码的字符串
     */
    isUrlSafeBase64: function(string) {
      return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(string);
    }
  };

  var W = {
    __proto__: null,
    ConcurrentStorage: ConcurrentStorage,
    EventEmitter: EventEmitter,
    URL: _URL,
    UUID: UUID,
    addEvent: addEvent,
    addHashEvent: addHashEvent,
    ajax: ajax,
    base64Decode: base64Decode,
    base64Encode: base64Encode,
    bindReady: bindReady,
    cookie: cookie,
    coverExtend: coverExtend,
    decodeURI: _decodeURI,
    decodeURIComponent: _decodeURIComponent,
    dfmapping: dfmapping,
    each: each,
    encodeDates: encodeDates,
    extend: extend,
    extend2Lev: extend2Lev,
    filter: filter,
    formatDate: formatDate,
    formatJsonString: formatJsonString,
    getCookieTopLevelDomain: getCookieTopLevelDomain,
    getDomBySelector: getDomBySelector,
    getElementContent: getElementContent,
    getHostname: getHostname,
    getIOSVersion: getIOSVersion,
    getQueryParam: getQueryParam,
    getQueryParamsFromUrl: getQueryParamsFromUrl,
    getRandom: getRandom,
    getRandomBasic: getRandomBasic,
    getScreenOrientation: getScreenOrientation,
    getUA: getUA,
    getURL: getURL,
    getURLPath: getURLPath,
    getURLSearchParams: getURLSearchParams,
    hasAttribute: hasAttribute,
    hasAttributes: hasAttributes,
    hashCode: hashCode,
    hashCode53: hashCode53,
    indexOf: indexOf,
    inherit: inherit,
    isArguments: isArguments,
    isArray: isArray,
    isBoolean: isBoolean,
    isDate: isDate,
    isElement: isElement,
    isEmptyObject: isEmptyObject,
    isFunction: isFunction,
    isHttpUrl: isHttpUrl,
    isIOS: isIOS,
    isJSONString: isJSONString,
    isNumber: isNumber,
    isObject: isObject,
    isString: isString,
    isSupportBeaconSend: isSupportBeaconSend,
    isSupportCors: isSupportCors,
    isUndefined: isUndefined,
    jsonp: jsonp,
    listenPageState: listenPageState,
    loadScript: loadScript,
    localStorage: _localStorage,
    logger: logger,
    map: map,
    mediaQueriesSupported: mediaQueriesSupported,
    now: now,
    removeScriptProtocol: removeScriptProtocol,
    rot13defs: rot13defs,
    rot13obfs: rot13obfs,
    ry: ry,
    safeJSONParse: safeJSONParse,
    searchObjDate: searchObjDate,
    sessionStorage: _sessionStorage,
    setCssStyle: setCssStyle,
    strToUnicode: strToUnicode,
    throttle: throttle,
    toArray: toArray,
    trim: trim,
    unique: unique,
    urlParse: urlParse,
    urlSafeBase64: urlSafeBase64,
    values: values,
    xhr: xhr
  };

  // sd 的核心配置对象
  var sdPara = {};

  // 默认配置
  var defaultPara = {
    preset_properties: {
      search_keyword_baidu: false,
      latest_utm: true,
      latest_traffic_source_type: true,
      latest_search_keyword: true,
      latest_referrer: true,
      latest_referrer_host: false,
      latest_landing_page: false,
      latest_wx_ad_click_id: undefined,
      url: true,
      title: true
    },
    encrypt_cookie: false,
    enc_cookie: false,
    img_use_crossorigin: false,
    //scrollmap:{delay:6000}

    name: 'sa',
    // referrer字符串截取
    max_referrer_string_length: 200,
    //通用字符串截取，超过7000的字符串会导致url超长发不出去，所以限制长度
    max_string_length: 500,
    // distinct_id 最大长度
    max_id_length: 255,
    // 事件名称 最大长度
    max_key_length: 100,
    //    send_error_event: true,
    cross_subdomain: true,
    show_log: false,
    is_debug: false,
    debug_mode: false,
    debug_mode_upload: false,

    //来源参数名字
    source_channel: [],
    sdk_id: '',

    send_type: 'image',

    // 七鱼过滤id
    vtrack_ignore: {},

    auto_init: true,

    is_track_single_page: false,

    is_single_page: false,

    batch_send: false,

    // 如果要设置，设置数组
    source_type: {},
    callback_timeout: 200,
    datasend_timeout: 8000,
    is_track_device_id: false,
    ignore_oom: true,
    app_js_bridge: false
  };

  function sdLog() {
    if ((_sessionStorage.isSupport() && sessionStorage.getItem('sensorsdata_jssdk_debug') === 'true') || sdPara.show_log) {
      if (isObject(arguments[0]) && (sdPara.show_log === true || sdPara.show_log === 'string' || sdPara.show_log === false)) {
        arguments[0] = formatJsonString(arguments[0]);
      }

      if (typeof console === 'object' && console.log) {
        try {
          return console.log.apply(console, arguments);
        } catch (e) {
          console.log(arguments[0]);
        }
      }
    }
  }

  // 偏移加密标记
  var flag = 'data:enc;';
  // 字符映射加密标记
  var flag_dfm = 'dfm-enc-';

  /**
   * 解密
   *
   * @export
   * @param { String } v
   * @return { String }
   */
  function decrypt(v) {
    if (v.indexOf(flag) === 0) {
      v = v.substring(flag.length);
      v = rot13defs(v);
    } else if (v.indexOf(flag_dfm) === 0) {
      v = v.substring(flag_dfm.length);
      v = dfmapping(v);
    }
    return v;
  }
  /**
   * 根据加密内容使用不同的解密方法解密
   *
   * @export
   * @param { String } cross
   * @return { String }
   */
  function decryptIfNeeded(cross) {
    if (isString(cross) && (cross.indexOf(flag) === 0 || cross.indexOf(flag_dfm) === 0)) {
      cross = decrypt(cross);
    }
    return cross;
  }

  /**
   * 加密
   *
   * @export
   * @param { String } v
   * @return { String }
   */
  function encrypt(v) {
    return flag_dfm + dfmapping(v);
  }

  var source_channel_standard = 'utm_source utm_medium utm_campaign utm_content utm_term';
  var sdkversion_placeholder = '1.23.3';
  var domain_test_key = 'sensorsdata_domain_test';

  var IDENTITY_KEY = {
    EMAIL: '$identity_email',
    MOBILE: '$identity_mobile',
    LOGIN: '$identity_login_id'
  };

  function getCurrentDomain(url) {
    var sdDomain = sdPara.current_domain;
    switch (typeof sdDomain) {
      case 'function':
        var resultDomain = sdDomain();
        if (resultDomain === '' || trim(resultDomain) === '') {
          return 'url解析失败';
        } else if (resultDomain.indexOf('.') !== -1) {
          return resultDomain;
        } else {
          return 'url解析失败';
        }
      case 'string':
        if (sdDomain === '' || trim(sdDomain) === '') {
          return 'url解析失败';
        } else if (sdDomain.indexOf('.') !== -1) {
          return sdDomain;
        } else {
          return 'url解析失败';
        }
      default:
        var cookieTopLevelDomain = getCookieTopLevelDomain(null, domain_test_key);
        if (url === '') {
          return 'url解析失败';
        } else if (cookieTopLevelDomain === '') {
          return 'url解析失败';
        } else {
          return cookieTopLevelDomain;
        }
    }
  }

  var saCookie = {
    get: function(name) {
      return cookie.get(name);
    },
    set: function(name, value, days, cross_subdomain) {
      var cdomain = '';
      cross_subdomain = isUndefined(cross_subdomain) ? sdPara.cross_subdomain : cross_subdomain;

      if (cross_subdomain) {
        var domain = getCurrentDomain(location.href);
        if (domain === 'url解析失败') {
          domain = '';
        }
        cdomain = domain ? '; domain=' + domain : '';
      }

      return cookie.set(name, value, days, cross_subdomain, sdPara.set_cookie_samesite, sdPara.is_secure_cookie, cdomain);
    },
    remove: function(name, cross_subdomain) {
      cross_subdomain = isUndefined(cross_subdomain) ? sdPara.cross_subdomain : cross_subdomain;
      return cookie.remove(name, cross_subdomain);
    },
    isSupport: function(testKey, testValue) {
      testKey = testKey || 'sajssdk_2015_cookie_access_test';
      testValue = testValue || '1';
      return cookie.isSupport(testKey, testValue);
    }
  };

  function isBaiduTraffic() {
    var referer = document.referrer;
    var endsWith = 'baidu.com';
    if (!referer) {
      return false;
    }

    try {
      var hostname = _URL(referer).hostname;
      return hostname && hostname.substring(hostname.length - endsWith.length) === endsWith;
    } catch (e) {
      return false;
    }
  }

  var getBaiduKeyword = {
    data: {},
    id: function() {
      if (this.data.id) {
        return this.data.id;
      } else {
        this.data.id = getReferrerEqid();
        return this.data.id;
      }
    },
    type: function() {
      if (this.data.type) {
        return this.data.type;
      } else {
        this.data.type = getReferrerEqidType();
        return this.data.type;
      }
    }
  };

  function getReferrerEqidType() {
    var query = getQueryParamsFromUrl(document.referrer);
    if (isEmptyObject(query) || !query.eqid) {
      var url = getQueryParamsFromUrl(location.href);
      if (query.ck || url.utm_source) {
        return 'baidu_sem_keyword_id';
      }
      return 'baidu_other_keyword_id';
    }
    return 'baidu_seo_keyword_id';
  }

  function getReferrerEqid() {
    var query = getQueryParamsFromUrl(document.referrer);
    if (isEmptyObject(query) || !query.eqid) {
      return UUID().replace(/-/g, '');
    }
    return query.eqid;
  }

  function getReferrer(referrer, full) {
    referrer = referrer || document.referrer;
    if (!isString(referrer)) {
      return '取值异常_referrer异常_' + String(referrer);
    }
    referrer = trim(referrer);
    referrer = _decodeURI(referrer);
    if (referrer.indexOf('https://www.baidu.com/') === 0 && !full) {
      referrer = referrer.split('?')[0];
    }
    referrer = referrer.slice(0, sdPara.max_referrer_string_length);
    return isString(referrer) ? referrer : '';
  }

  function isReferralTraffic(refererstring) {
    refererstring = refererstring || document.referrer;
    if (refererstring === '') {
      return true;
    }

    return getCookieTopLevelDomain(getHostname(refererstring), domain_test_key) !== getCookieTopLevelDomain(null, domain_test_key);
  }

  function getKeywordFromReferrer(referrerUrl, activeValue) {
    referrerUrl = referrerUrl || document.referrer;
    var search_keyword = sdPara.source_type.keyword;
    if (document && isString(referrerUrl)) {
      if (referrerUrl.indexOf('http') === 0) {
        var searchEngine = getReferSearchEngine(referrerUrl);
        var query = getQueryParamsFromUrl(referrerUrl);
        if (isEmptyObject(query)) {
          if (sdPara.preset_properties.search_keyword_baidu && isBaiduTraffic()) {
            return;
          } else {
            return '未取到值';
          }
        }
        var temp = null;
        for (var i in search_keyword) {
          if (searchEngine === i) {
            if (isObject(query)) {
              temp = search_keyword[i];
              if (isArray(temp)) {
                for (i = 0; i < temp.length; i++) {
                  var _value = query[temp[i]];
                  if (_value) {
                    if (activeValue) {
                      return {
                        active: _value
                      };
                    } else {
                      return _value;
                    }
                  }
                }
              } else if (query[temp]) {
                if (activeValue) {
                  return {
                    active: query[temp]
                  };
                } else {
                  return query[temp];
                }
              }
            }
          }
        }
        if (sdPara.preset_properties.search_keyword_baidu && isBaiduTraffic()) {
          return;
        } else {
          return '未取到值';
        }
      } else {
        if (referrerUrl === '') {
          return '未取到值_直接打开';
        } else {
          return '未取到值_非http的url';
        }
      }
    } else {
      return '取值异常_referrer异常_' + String(referrerUrl);
    }
  }

  function getReferSearchEngine(referrerUrl) {
    var hostname = getHostname(referrerUrl);
    if (!hostname || hostname === 'hostname解析异常') {
      return '';
    }
    var searchEngineUrls = {
      baidu: [/^.*\.baidu\.com$/],
      bing: [/^.*\.bing\.com$/],
      google: [/^www\.google\.com$/, /^www\.google\.com\.[a-z]{2}$/, /^www\.google\.[a-z]{2}$/],
      sm: [/^m\.sm\.cn$/],
      so: [/^.+\.so\.com$/],
      sogou: [/^.*\.sogou\.com$/],
      yahoo: [/^.*\.yahoo\.com$/]
    };
    for (var prop in searchEngineUrls) {
      var urls = searchEngineUrls[prop];
      for (var i = 0, len = urls.length; i < len; i++) {
        if (urls[i].test(hostname)) {
          return prop;
        }
      }
    }
    return '未知搜索引擎';
  }

  var debug = {
    distinct_id: function() {
      /*
                  var relation = {
                    'e-0': '未知错误',
                    'e-1': 'toState()传值的数据中缺少distinct_id，SDK自动分配distinct_id',
                    'e-2': 'toState()传值的数据不是一个有效的JSON字符串，SDK自动分配distinct_id'
                  };
                  var debug_info = relation['e-' + key] || relation['e-0'];
                  if (sdPara.is_debug === true || sdPara.is_debug.distinct_id === true) {
                    sdLog(debug_info);
                    this._sendDebug('distinct_id-' + key + '-' + JSON.stringify(data));
                  }
                  */
    },
    jssdkDebug: function() {
      /*
                  if (sdPara.is_debug === true) {
                    if(_.isString(recevie_prop)){
                      this._sendDebug(recevie_prop);
                    }else{
                      var cookie = store.getCookieName();
                      var match = document.cookie.match(new RegExp(cookie + '[^;]+'));
                      if(match && match[0] ){
                        cookie = match[0];
                      }else{
                        cookie = '';
                      }
                      recevie_prop._jssdk_debug_info = '(' + cookie + ')' + navigator.userAgent;
                      this._sendDebug(JSON.stringify(recevie_prop));
                    }
                  }
                  */
    },
    // eslint-disable-next-line no-unused-vars
    _sendDebug: function(debugString) {
      // sd.track('_sensorsdata2019_debug', {
      //   _jssdk_debug_info: debugString
      // });
    },
    apph5: function(obj) {
      var name = 'app_h5打通失败-';
      var relation = {
        1: name + 'use_app_track为false',
        2: name + 'Android或者iOS，没有暴露相应方法',
        3.1: name + 'Android校验server_url失败',
        3.2: name + 'iOS校验server_url失败',
        4.1: name + 'H5 校验 iOS server_url 失败',
        4.2: name + 'H5 校验 Android server_url 失败'
      };
      var output = obj.output;
      var step = obj.step;
      var data = obj.data || '';
      // 控制台输出
      if (output === 'all' || output === 'console') {
        sdLog(relation[step]);
      }
      // 代码输出
      if ((output === 'all' || output === 'code') && isObject(sdPara.is_debug) && sdPara.is_debug.apph5) {
        if (!data.type || data.type.slice(0, 7) !== 'profile') {
          data.properties._jssdk_debug_info = 'apph5-' + String(step);
        }
      }
    },
    defineMode: function(type) {
      var debugList = {
        1: {
          title: '当前页面无法进行可视化全埋点',
          message: 'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 App SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
        },
        2: {
          title: '当前页面无法进行可视化全埋点',
          message: 'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 Web JS SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
        },
        3: {
          title: '当前页面无法进行可视化全埋点',
          message: 'Web JS SDK 没有开启全埋点配置，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html'
        },
        4: {
          title: '当前页面无法进行可视化全埋点',
          message: 'Web JS SDK 配置的数据校验地址与 App SDK 配置的数据校验地址不一致，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
        }
      };
      if (type && debugList[type]) {
        return debugList[type];
      } else {
        return false;
      }
    },
    protocol: {
      protocolIsSame: function(url1, url2) {
        try {
          if (_URL(url1).protocol !== _URL(url2).protocol) {
            return false;
          }
        } catch (error) {
          sdLog('不支持 _.URL 方法');
          return false;
        }
        return true;
      },
      serverUrl: function() {
        //由于个别浏览器安全限制协议不一致可能发送失败
        if (isString(sdPara.server_url) && sdPara.server_url !== '' && !this.protocolIsSame(sdPara.server_url, location.href)) {
          sdLog('SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。\n因为：1、https 下面发送 http 的图片请求会失败。2、http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。');
        }
      },
      ajax: function(url) {
        //埋点请求不校验
        if (url === sdPara.server_url) {
          return false;
        }
        //其他业务如abtest使用ajax的校验
        if (isString(url) && url !== '' && !this.protocolIsSame(url, location.href)) {
          sdLog('SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。因为 http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。');
        }
      }
    }
  };

  var pageInfo = {
    initPage: function() {
      var referrer = getReferrer();
      var url = getURL();
      var url_domain = getCurrentDomain(url);
      if (!url_domain) {
        debug.jssdkDebug('url_domain异常_' + url + '_' + url_domain);
      }

      this.pageProp = {
        referrer: referrer,
        referrer_host: referrer ? getHostname(referrer) : '',
        url: url,
        url_host: getHostname(url, 'url_host取值异常'),
        url_domain: url_domain
      };
    },
    //当前页面的一些属性，在store初始化是生成
    pageProp: {},

    campaignParams: function() {
      return sd.kit.getUtmData();
    },
    campaignParamsStandard: function(prefix, prefix_add) {
      prefix = prefix || '';
      prefix_add = prefix_add || '';
      var utms = pageInfo.campaignParams();
      var $utms = {},
        otherUtms = {};
      each(utms, function(v, i, utms) {
        if ((' ' + source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms[prefix + i] = utms[i];
        } else {
          otherUtms[prefix_add + i] = utms[i];
        }
      });
      return {
        $utms: $utms,
        otherUtms: otherUtms
      };
    },
    // 预置属性
    properties: function() {
      var viewportHeightValue = window.innerHeight || document.documentElement.clientHeight || (document.body && document.body.clientHeight) || 0;
      var viewportWidthValue = window.innerWidth || document.documentElement.clientWidth || (document.body && document.body.clientWidth) || 0;
      // var scrollHeightValue = document.documentElement.scrollHeight || 0;
      var propertiesObj = {
        $timezone_offset: new Date().getTimezoneOffset(),
        $screen_height: Number(screen.height) || 0,
        $screen_width: Number(screen.width) || 0,
        $viewport_height: viewportHeightValue,
        $viewport_width: viewportWidthValue,
        // $page_height: Math.max(viewportHeightValue, scrollHeightValue) || 0,
        // 我说两遍写的重复，佳捷说就写两遍
        $lib: 'js',
        $lib_version: sdkversion_placeholder
      };
      return propertiesObj;
    },
    // 保存临时的一些变量，只针对当前页面有效
    currentProps: {},
    register: function(obj) {
      extend(pageInfo.currentProps, obj);
    }
  };

  function getNewUserFlagKey(name_prefix, url) {
    var sub = '';
    url = url || location.href;
    if (sdPara.cross_subdomain === false) {
      try {
        sub = _URL(url).hostname;
      } catch (e) {
        sdLog(e);
      }
      if (typeof sub === 'string' && sub !== '') {
        sub = 'sajssdk_2015_' + sdPara.sdk_id + name_prefix + '_' + sub.replace(/\./g, '_');
      } else {
        sub = 'sajssdk_2015_root_' + sdPara.sdk_id + name_prefix;
      }
    } else {
      sub = 'sajssdk_2015_cross_' + sdPara.sdk_id + name_prefix;
    }
    return sub;
  }

  // compatible the old usage : cookie.getNewUser
  saCookie.getNewUser = isNewUser;

  function isNewUser() {
    var prefix = 'new_user';
    if (saCookie.isSupport()) {
      if (saCookie.get('sensorsdata_is_new_user') !== null || saCookie.get(getNewUserFlagKey(prefix)) !== null) {
        return true;
      }
      return false;
    } else {
      if (memory.get(memory.getNewUserFlagMemoryKey(prefix)) !== null) return true;
      return false;
    }
  }

  var memory = {
    data: {},

    get: function(name) {
      var value = this.data[name];
      if (value === undefined) return null;
      if (value._expirationTimestamp_ !== undefined) {
        if (new Date().getTime() > value._expirationTimestamp_) {
          return null;
        }
        return value.value;
      }
      return value;
    },

    set: function(name, value, days) {
      if (days) {
        var date = new Date();
        var expirationTimestamp;
        if (String(days).slice(-1) === 's') {
          expirationTimestamp = date.getTime() + Number(String(days).slice(0, -1)) * 1000;
        } else {
          expirationTimestamp = date.getTime() + days * 24 * 60 * 60 * 1000;
        }
        value = {
          value: value,
          _expirationTimestamp_: expirationTimestamp
        };
      }
      this.data[name] = value;
    },

    getNewUserFlagMemoryKey: function(name_prefix) {
      return 'sajssdk_2015_' + sdPara.sdk_id + name_prefix;
    }
  };

  // 检查是否是新用户（第一次种 cookie，且在8个小时内的）
  var saNewUser = {
    checkIsAddSign: function(data) {
      if (data.type === 'track') {
        if (isNewUser()) {
          data.properties.$is_first_day = true;
        } else {
          data.properties.$is_first_day = false;
        }
      }
    },
    is_first_visit_time: false,
    // 新增加页面级首次
    is_page_first_visited: false,
    checkIsFirstTime: function(data) {
      if (data.type === 'track' && data.event === '$pageview') {
        if (this.is_first_visit_time) {
          data.properties.$is_first_time = true;
          this.is_first_visit_time = false;
        } else {
          data.properties.$is_first_time = false;
        }
      }
    },
    setDeviceId: function(uuid, store) {
      // deviceid必须跨子域
      var device_id = null;
      var ds = saCookie.get('sensorsdata2015jssdkcross' + sd.para.sdk_id);
      ds = decryptIfNeeded(ds);
      var state = {};
      if (ds != null && isJSONString(ds)) {
        state = JSON.parse(ds);
        if (state.$device_id) {
          device_id = state.$device_id;
        }
      }

      device_id = device_id || uuid;

      if (sd.para.cross_subdomain === true) {
        store.set('$device_id', device_id);
      } else {
        state.$device_id = device_id;
        state = JSON.stringify(state);
        if (sd.para.encrypt_cookie) {
          state = encrypt(state);
        }
        saCookie.set('sensorsdata2015jssdkcross' + sd.para.sdk_id, state, null, true);
      }

      if (sd.para.is_track_device_id) {
        pageInfo.currentProps.$device_id = device_id;
      }
    },
    storeInitCheck: function() {
      // 如果是新用户，种 cookie
      if (sd.is_first_visitor) {
        var date = new Date();
        var obj = {
          h: 23 - date.getHours(),
          m: 59 - date.getMinutes(),
          s: 59 - date.getSeconds()
        };
        if (saCookie.isSupport()) {
          saCookie.set(getNewUserFlagKey('new_user'), '1', obj.h * 3600 + obj.m * 60 + obj.s + 's');
        } else {
          memory.set(memory.getNewUserFlagMemoryKey('new_user'), '1', obj.h * 3600 + obj.m * 60 + obj.s + 's');
        }
        // 如果是is_first_visit_time，且第一次，那就发数据
        this.is_first_visit_time = true;
        this.is_page_first_visited = true;
      } else {
        // 如果没有这个 cookie，肯定不是首日
        if (!isNewUser()) {
          this.checkIsAddSign = function(data) {
            if (data.type === 'track') {
              data.properties.$is_first_day = false;
            }
          };
        }
        // 如果不是第一次打开的用户，肯定不是首次访问
        this.checkIsFirstTime = function(data) {
          if (data.type === 'track' && data.event === '$pageview') {
            data.properties.$is_first_time = false;
          }
        };
      }
    }
  };

  function saAddEvent(target, eventName, evenHandler) {
    var useCapture = isObject(sdPara.heatmap) && sdPara.heatmap.useCapture ? true : false;
    if (isObject(sdPara.heatmap) && isUndefined(sdPara.heatmap.useCapture) && eventName === 'click') {
      useCapture = true;
    }
    return addEvent(target, eventName, evenHandler, useCapture);
  }

  var EventEmitterSa = function() {
    this._events = [];
    this.pendingEvents = [];
  };

  EventEmitterSa.prototype = {
    emit: function(type) {
      var args = [].slice.call(arguments, 1);

      each(this._events, function(val) {
        if (val.type !== type) {
          return;
        }
        val.callback.apply(val.context, args);
      });

      this.pendingEvents.push({
        type: type,
        data: args
      });
      this.pendingEvents.length > 20 ? this.pendingEvents.shift() : null;
    },
    on: function(event, callback, context, replayAll) {
      if (!isFunction(callback)) {
        return;
      }
      this._events.push({
        type: event,
        callback: callback,
        context: context || this
      });

      replayAll = replayAll === false ? false : true;
      if (this.pendingEvents.length > 0 && replayAll) {
        each(this.pendingEvents, function(val) {
          if (val.type === event) {
            callback.apply(context, val.data);
          }
        });
      }
    },
    tempAdd: function(event, data) {
      if (!data || !event) {
        return;
      }
      return this.emit(event, data);
    },
    isReady: function() {}
  };

  function getSourceFromReferrer() {
    function getMatchStrFromArr(arr, str) {
      for (var i = 0; i < arr.length; i++) {
        if (str.split('?')[0].indexOf(arr[i]) !== -1) {
          return true;
        }
      }
    }

    var utm_reg = '(' + sdPara.source_type.utm.join('|') + ')\\=[^&]+';
    var search_engine = sdPara.source_type.search;
    var social_engine = sdPara.source_type.social;

    var referrer = document.referrer || '';
    var url = pageInfo.pageProp.url;
    if (url) {
      var utm_match = url.match(new RegExp(utm_reg));
      if (utm_match && utm_match[0]) {
        return '付费广告流量';
      } else if (getMatchStrFromArr(search_engine, referrer)) {
        return '自然搜索流量';
      } else if (getMatchStrFromArr(social_engine, referrer)) {
        return '社交网站流量';
      } else if (referrer === '') {
        return '直接流量';
      } else {
        return '引荐流量';
      }
    } else {
      return '获取url异常';
    }
  }

  function getWxAdIdFromUrl(url) {
    var click_id = getQueryParam(url, 'gdt_vid');
    var hash_key = getQueryParam(url, 'hash_key');
    var callbacks = getQueryParam(url, 'callbacks');
    var obj = {
      click_id: '',
      hash_key: '',
      callbacks: ''
    };
    if (isString(click_id) && click_id.length) {
      obj.click_id = click_id.length == 16 || click_id.length == 18 ? click_id : '参数解析不合法';

      //click_id 解析成功的情况下才会解析hashkey和callbacks
      if (isString(hash_key) && hash_key.length) {
        obj.hash_key = hash_key;
      }
      if (isString(callbacks) && callbacks.length) {
        obj.callbacks = callbacks;
      }
    }

    return obj;
  }

  /**
   * 执行属性中的函数，并且过滤掉不符合条件的属性
   *
   * @param { JSON } data
   */
  function parseSuperProperties(data) {
    var obj = data.properties;
    var copyData = JSON.parse(JSON.stringify(data));
    if (isObject(obj)) {
      each(obj, function(objVal, key) {
        if (isFunction(objVal)) {
          try {
            obj[key] = objVal(copyData);
            if (isFunction(obj[key])) {
              sdLog('您的属性- ' + key + ' 格式不满足要求，我们已经将其删除');
              delete obj[key];
            }
          } catch (e) {
            delete obj[key];
            sdLog('您的属性- ' + key + ' 抛出了异常，我们已经将其删除');
          }
        }
      });
    }
  }

  // 去除$option的配置数据
  function searchConfigData(data) {
    if (isObject(data) && data.$option) {
      var data_config = data.$option;
      delete data.$option;
      return data_config;
    } else {
      return {};
    }
  }

  // 去掉undefined和null
  function strip_empty_properties(p) {
    var ret = {};
    each(p, function(v, k) {
      if (v != null) {
        ret[k] = v;
      }
    });
    return ret;
  }

  function addReferrerHost(data) {
    var isNotProfileType = !data.type || data.type.slice(0, 7) !== 'profile';
    var defaultHost = '取值异常';
    if (isObject(data.properties)) {
      if (data.properties.$first_referrer) {
        data.properties.$first_referrer_host = getHostname(data.properties.$first_referrer, defaultHost);
      }
      if (isNotProfileType) {
        if ('$referrer' in data.properties) {
          data.properties.$referrer_host = data.properties.$referrer === '' ? '' : getHostname(data.properties.$referrer, defaultHost);
        }
        if (sdPara.preset_properties.latest_referrer && sdPara.preset_properties.latest_referrer_host) {
          data.properties.$latest_referrer_host = data.properties.$latest_referrer === '' ? '' : getHostname(data.properties.$latest_referrer, defaultHost);
        }
      }
    }
  }

  function addPropsHook(data) {
    var isNotProfileType = !data.type || data.type.slice(0, 7) !== 'profile';
    var isSatisfy = sdPara.preset_properties && isNotProfileType;
    if (isSatisfy && sdPara.preset_properties.url && isUndefined(data.properties.$url)) {
      data.properties.$url = getURL();
    }
    if (isSatisfy && sdPara.preset_properties.title && isUndefined(data.properties.$title)) {
      data.properties.$title = document.title;
    }
  }

  // 获取元素的一些信息
  function getEleInfo(obj) {
    if (!obj.target) {
      return false;
    }

    var target = obj.target;
    var tagName = target.tagName.toLowerCase();

    var props = {};

    props.$element_type = tagName;
    props.$element_name = target.getAttribute('name');
    props.$element_id = target.getAttribute('id');
    props.$element_class_name = isString(target.className) ? target.className : null;
    props.$element_target_url = target.getAttribute('href');
    props.$element_content = getElementContent$1(target, tagName);
    props = strip_empty_properties(props);
    props.$url = getURL();
    props.$url_path = getURLPath();
    props.$title = document.title;

    return props;
  }

  // 针对 input 默认只采集 button 和 submit 非名感的词汇。可以自定义（银联提）
  function getInputElementValue(inputEle) {
    var allowCollectInputVal = sdPara.heatmap && isFunction(sdPara.heatmap.collect_input) && sdPara.heatmap.collect_input(inputEle);
    if (inputEle.type === 'button' || inputEle.type === 'submit' || allowCollectInputVal) {
      return inputEle.value || '';
    }
    return '';
  }

  function getElementContent$1(element, tagName) {
    if (isString(tagName) && tagName.toLowerCase() === 'input') {
      return getInputElementValue(element);
    }
    return getElementContent(element, tagName);
  }

  function ajax$1(para) {
    //校验url与location.href协议是否一致
    debug.protocol.ajax(para.url);
    return ajax(para);
  }



  var business = {
    __proto__: null,
    addEvent: saAddEvent,
    EventEmitterSa: EventEmitterSa,
    encrypt: encrypt,
    decryptIfNeeded: decryptIfNeeded,
    cookie: saCookie,
    info: pageInfo,
    getReferrer: getReferrer,
    getCurrentDomain: getCurrentDomain,
    isBaiduTraffic: isBaiduTraffic,
    getReferrerEqid: getReferrerEqid,
    getReferrerEqidType: getReferrerEqidType,
    getBaiduKeyword: getBaiduKeyword,
    isReferralTraffic: isReferralTraffic,
    getKeywordFromReferrer: getKeywordFromReferrer,
    getReferSearchEngine: getReferSearchEngine,
    getSourceFromReferrer: getSourceFromReferrer,
    getWxAdIdFromUrl: getWxAdIdFromUrl,
    parseSuperProperties: parseSuperProperties,
    searchConfigData: searchConfigData,
    strip_empty_properties: strip_empty_properties,
    getEleInfo: getEleInfo,
    getElementContent: getElementContent$1,
    ajax: ajax$1
  };

  var events = new EventEmitterSa();

  /*eslint no-prototype-builtins: "off"*/

  var store = {
    requests: [],
    _sessionState: {},
    _state: {
      distinct_id: '',
      first_id: '',
      props: {},
      identities: {
        // $identity_cookie_id: '',
        // $login_id: '',
        // $identity_anonymous_id: '',
      }
    },
    getProps: function() {
      return this._state.props || {};
    },
    getSessionProps: function() {
      return this._sessionState;
    },
    getOriginDistinctId: function() {
      return this._state._distinct_id || this._state.distinct_id;
    },
    // id3兼容修改，获取login_id和anonymous_id必须用此方法
    getOriginUnionId: function(state) {
      var obj = {};
      state = state || this._state;
      var firstId = state._first_id || state.first_id,
        distinct_id = state._distinct_id || state.distinct_id;
      if (firstId && distinct_id) {
        obj.login_id = distinct_id;
        obj.anonymous_id = firstId;
      } else {
        obj.anonymous_id = distinct_id;
      }
      return obj;
    },
    getDistinctId: function() {
      // 兼容 id3 值域名
      var unionId = this.getUnionId();
      return unionId.login_id || unionId.anonymous_id;
    },
    getUnionId: function(state) {
      // 兼容 id3 值域名
      var obj = this.getOriginUnionId(state);
      if (obj.login_id && this._state.history_login_id && this._state.history_login_id.name && this._state.history_login_id.name !== IDENTITY_KEY.LOGIN) {
        obj.login_id = this._state.history_login_id.name + '+' + obj.login_id;
      }
      return obj;
    },
    getFirstId: function() {
      return this._state._first_id || this._state.first_id;
    },
    initSessionState: function() {
      var ds = saCookie.get('sensorsdata2015session');
      ds = decryptIfNeeded(ds);
      var state = null;
      if (ds !== null && typeof(state = safeJSONParse(ds)) === 'object') {
        this._sessionState = state || {};
      }
    },

    setOnce: function(a, b) {
      if (!(a in this._state)) {
        this.set(a, b);
      }
    },
    set: function(name, value) {
      this._state = this._state || {};
      var pre_id = this._state.distinct_id;
      this._state[name] = value;
      // 如果set('first_id') 或者 set('distinct_id')，删除对应的临时属性
      if (name === 'first_id') {
        delete this._state._first_id;
      } else if (name === 'distinct_id') {
        delete this._state._distinct_id;
      }
      this.save();
      //之前distinctid有值视为change
      if (name === 'distinct_id' && pre_id) {
        events.tempAdd('changeDistinctId', value);
      }
    },
    // 针对当前页面修改
    change: function(name, value) {
      // 为临时属性名增加前缀 _ (下划线)
      this._state['_' + name] = value;
    },
    setSessionProps: function(newp) {
      var props = this._sessionState;
      extend(props, newp);
      this.sessionSave(props);
    },
    setSessionPropsOnce: function(newp) {
      var props = this._sessionState;
      coverExtend(props, newp);
      this.sessionSave(props);
    },
    setProps: function(newp, isCover) {
      var props = {};
      if (!isCover) {
        props = extend(this._state.props || {}, newp);
      } else {
        props = newp;
      }
      for (var key in props) {
        if (typeof props[key] === 'string') {
          props[key] = props[key].slice(0, sd.para.max_referrer_string_length);
        }
      }
      this.set('props', props);
    },
    setPropsOnce: function(newp) {
      var props = this._state.props || {};
      coverExtend(props, newp);
      this.set('props', props);
    },
    clearAllProps: function(arr) {
      this._sessionState = {};
      var i;
      if (isArray(arr) && arr.length > 0) {
        for (i = 0; i < arr.length; i++) {
          if (isString(arr[i]) && arr[i].indexOf('latest_') === -1 && isObject(this._state.props) && arr[i] in this._state.props) {
            delete this._state.props[arr[i]];
          }
        }
      } else {
        if (isObject(this._state.props)) {
          for (i in this._state.props) {
            if (i.indexOf('latest_') !== 1) {
              delete this._state.props[i];
            }
          }
        }
      }
      this.sessionSave({});
      this.save();
    },
    sessionSave: function(props) {
      this._sessionState = props;
      var sessionStateStr = JSON.stringify(this._sessionState);
      if (sd.para.encrypt_cookie) {
        sessionStateStr = encrypt(sessionStateStr);
      }
      saCookie.set('sensorsdata2015session', sessionStateStr, 0);
    },
    save: function() {
      // 深拷贝避免修改原对象
      var copyState = JSON.parse(JSON.stringify(this._state));
      // 删除临时属性避免写入cookie
      delete copyState._first_id;
      delete copyState._distinct_id;

      if (copyState.identities) {
        copyState.identities = base64Encode(JSON.stringify(copyState.identities));
      }

      var stateStr = JSON.stringify(copyState);
      if (sd.para.encrypt_cookie) {
        stateStr = encrypt(stateStr);
      }
      saCookie.set(this.getCookieName(), stateStr, 73000, sd.para.cross_subdomain);
    },
    getCookieName: function() {
      var sub = '';
      if (sd.para.cross_subdomain === false) {
        try {
          sub = _URL(location.href).hostname;
        } catch (e) {
          sd.log(e);
        }
        if (typeof sub === 'string' && sub !== '') {
          sub = 'sa_jssdk_2015_' + sd.para.sdk_id + sub.replace(/\./g, '_');
        } else {
          sub = 'sa_jssdk_2015_root' + sd.para.sdk_id;
        }
      } else {
        sub = 'sensorsdata2015jssdkcross' + sd.para.sdk_id;
      }
      return sub;
    },
    init: function() {
      //兼容3.0的初始化用户方案
      function compatibleWith3(state) {
        var identitiesprop;
        if (state.identities) {
          // 如果是以前rot13加密的identities开头是这个特征
          if (state.identities.indexOf('\n/') === 0) {
            state.identities = safeJSONParse(rot13defs(state.identities));
          } else {
            state.identities = safeJSONParse(base64Decode(state.identities));
          }
        }

        var unionId = store.getOriginUnionId(state);

        if (state.identities && isObject(state.identities) && !isEmptyObject(state.identities)) {
          // identities 存在但是升级导致异常
          if (state.identities.$identity_anonymous_id && state.identities.$identity_anonymous_id !== unionId.anonymous_id) {
            state.identities.$identity_anonymous_id = unionId.anonymous_id;
          }
        } else {
          // identities 不存在的话
          state.identities = {};
          state.identities.$identity_anonymous_id = unionId.anonymous_id;
          state.identities.$identity_cookie_id = UUID();
        }

        // 已经保证 state.identites 是对象且存在

        // 本地存在登陆id
        //初始化 state.history_login_id
        state.history_login_id = state.history_login_id || {};
        var history_login_id = state.history_login_id;
        var old_login_id_name = history_login_id.name;

        if (unionId.login_id) {
          // 有id2 login_id ，且id3 有login
          if (old_login_id_name && state.identities.hasOwnProperty(old_login_id_name)) {
            // id2 的login_id 不等于 id3 的 login_id 时候，以 id2 为准
            if (state.identities[old_login_id_name] !== unionId.login_id) {
              state.identities[old_login_id_name] = unionId.login_id;
              for (identitiesprop in state.identities) {
                if (state.identities.hasOwnProperty(identitiesprop)) {
                  if (identitiesprop !== '$identity_cookie_id' && identitiesprop !== old_login_id_name) {
                    delete state.identities[identitiesprop];
                  }
                }
              }
              state.history_login_id.value = unionId.login_id;
            }
          } else {
            // 有id2 login_id，但是 id3 没有login()
            var currentLoginKey = old_login_id_name || IDENTITY_KEY.LOGIN;
            state.identities[currentLoginKey] = unionId.login_id;
            for (identitiesprop in state.identities) {
              if (state.identities.hasOwnProperty(identitiesprop)) {
                if (identitiesprop !== '$identity_cookie_id' && identitiesprop !== currentLoginKey) {
                  delete state.identities[identitiesprop];
                }
              }
            }
            state.history_login_id = {
              name: currentLoginKey,
              value: unionId.login_id
            };
          }
        } else {
          //没有 id2 登陆 id

          // 处理 3.0 降到 2.0 后调用 logout 但是 3.0 的登录 ID 依旧存在的情况
          if (state.identities.hasOwnProperty('$identity_login_id') || state.identities.hasOwnProperty(old_login_id_name)) {
            for (identitiesprop in state.identities) {
              if (state.identities.hasOwnProperty(identitiesprop)) {
                if (identitiesprop !== '$identity_cookie_id' && identitiesprop !== '$identity_anonymous_id') {
                  delete state.identities[identitiesprop];
                }
              }
            }
          }
          state.history_login_id = {
            name: '',
            value: ''
          };
        }

        return state;
      }

      // cookie 存在异常，需要重新生成id
      function cookieExistExpection(uuid) {
        store.set('distinct_id', uuid);
        store.set('identities', {
          $identity_cookie_id: uuid
        });
        store.set('history_login_id', {
          name: '',
          value: ''
        });
      }
      this.initSessionState();
      var uuid = UUID();
      var cross, cookieJSON;
      // 解析加密的cookie
      if (saCookie.isSupport()) {
        cross = saCookie.get(this.getCookieName());
        // 解析加密的cookie
        cross = decryptIfNeeded(cross);
        cookieJSON = safeJSONParse(cross);
      }
      if (!saCookie.isSupport() || cross === null || !isJSONString(cross) || !isObject(cookieJSON) || (isObject(cookieJSON) && !cookieJSON.distinct_id)) {
        // null肯定是首次，非null，看是否有distinct_id
        sd.is_first_visitor = true;
        cookieExistExpection(uuid);
      } else {
        // corss必须是可以JSON的且是对象
        // 兼容3.0的2.0+3.0初始化逻辑
        store._state = extend(compatibleWith3(cookieJSON));
        store.save();
      }
      // 如果没有跨域的cookie，且没有当前域cookie，那当前域的cookie和跨域cookie一致
      saNewUser.setDeviceId(uuid, this);
      //判断新用户
      saNewUser.storeInitCheck();
    },
    saveObjectVal: function(name, value) {
      if (!isString(value)) {
        value = JSON.stringify(value);
      }
      if (sd.para.encrypt_cookie == true) {
        value = encrypt(value);
      }
      _localStorage.set(name, value);
    },
    readObjectVal: function(name) {
      var value = _localStorage.get(name);
      if (!value) return null;
      value = decryptIfNeeded(value);
      return safeJSONParse(value);
    }
  };

  var checkLog = {
    string: function(str) {
      sdLog(str + ' must be string');
    },
    emptyString: function(str) {
      sdLog(str + '\'s is empty');
    },
    regexTest: function(str) {
      sdLog(str + ' is invalid');
    },
    idLength: function(str) {
      sdLog(str + ' length is longer than ' + sdPara.max_id_length);
    },
    keyLength: function(str) {
      sdLog(str + ' length is longer than ' + sdPara.max_key_length);
    },
    stringLength: function(str) {
      sdLog(str + ' length is longer than ' + sdPara.max_string_length);
    },
    voidZero: function(str) {
      sdLog(str + '\'s is undefined');
    },
    reservedLoginId: function(str) {
      sdLog(str + ' is invalid');
    },
    reservedBind: function(str) {
      sdLog(str + ' is invalid');
    },
    reservedUnbind: function(str) {
      sdLog(str + ' is invalid');
    }
  };
  var ruleOption = {
    regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_tag.*|^user_group.*)[a-zA-Z_$][a-zA-Z\d_$]*)$/i,
    loginIDReservedNames: ['$identity_anonymous_id', '$identity_cookie_id'],
    bindReservedNames: ['$identity_login_id', '$identity_anonymous_id', '$identity_cookie_id'],
    unbindReservedNames: ['$identity_anonymous_id', IDENTITY_KEY.LOGIN],
    string: function(str) {
      if (!isString(str)) {
        return false;
      }
      return true;
    },
    emptyString: function(str) {
      if (!isString(str) || trim(str).length === 0) {
        return false;
      }
      return true;
    },
    regexTest: function(str) {
      if (!isString(str) || !this.regName.test(str)) {
        return false;
      }
      return true;
    },
    idLength: function(str) {
      if (!isString(str) || str.length > sdPara.max_id_length) {
        return false;
      }
      return true;
    },
    keyLength: function(str) {
      if (!isString(str) || str.length > sdPara.max_key_length) {
        return false;
      }
      return true;
    },
    stringLength: function(str) {
      if (!isString(str) || str.length > sdPara.max_string_length) {
        return false;
      }
      return true;
    },
    voidZero: function(str) {
      if (str === void 0) {
        return false;
      }
      return true;
    },
    reservedLoginId: function(str) {
      if (indexOf(this.loginIDReservedNames, str) > -1) {
        return false;
      }
      return true;
    },
    reservedUnbind: function(str) {
      if (indexOf(this.unbindReservedNames, str) > -1) {
        return false;
      }
      return true;
    },
    reservedBind: function(str) {
      var historyId = store._state.history_login_id;
      if (historyId && historyId.name && historyId.name === str) {
        return false;
      }
      if (indexOf(this.bindReservedNames, str) > -1) {
        return false;
      }
      return true;
    }
  };

  var checkOption = {
    distinct_id: {
      rules: ['string', 'emptyString', 'idLength'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'Id';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
          // 大于 255 上报
          if (rule_type === 'idLength') {
            return true;
          }
        }

        return status;
      }
    },
    event: {
      // String -> 非空 -> 未超长 -> 正则检测
      rules: ['string', 'emptyString', 'keyLength', 'regexTest'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'eventName';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
        }
        return true;
      }
    },
    propertyKey: {
      // String -> 非空 -> 未超长 -> 正则检测
      rules: ['string', 'emptyString', 'keyLength', 'regexTest'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'Property key';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
        }
        return true;
      }
    },
    propertyValue: {
      // String -> 非空 -> 未超长 -> 正则检测
      rules: ['voidZero'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          val = 'Property Value';
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
        }
        return true;
      }
    },
    properties: function(p) {
      if (isObject(p)) {
        each(p, function(s, k) {
          // key
          check({
            propertyKey: k
          });

          // value undefined 校验
          var onComplete = function(status, val, rule_type) {
            if (!status) {
              val = k + '\'s Value';
              isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
            }
            return true;
          };
          check({
            propertyValue: s
          }, onComplete);
        });
      } else if (ruleOption.voidZero(p)) {
        sdLog('properties可以没有，但有的话必须是对象');
      }
      return true;
    },
    propertiesMust: function(p) {
      if (!(p === undefined || !isObject(p) || isEmptyObject(p))) {
        this.properties.call(this, p);
      } else {
        sdLog('properties必须是对象');
      }
      return true;
    },
    item_type: {
      // String -> 非空 -> 未超长 -> 正则检测
      rules: ['string', 'emptyString', 'keyLength', 'regexTest'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'item_type';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
        }
        return true;
      }
    },
    item_id: {
      // 字符串 -> 非空 -> 未超长
      rules: ['string', 'emptyString', 'stringLength'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'item_id';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
        }
        return true;
      }
    },
    loginIdKey: {
      // 字符串 -> 非空 -> 未超长
      rules: ['string', 'emptyString', 'keyLength', 'regexTest', 'reservedLoginId'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'login_id_key';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
          if (rule_type === 'keyLength') {
            return true;
          }
        }
        return status;
      }
    },
    bindKey: {
      // 字符串 -> 非空 -> 未超长
      rules: ['string', 'emptyString', 'keyLength', 'regexTest', 'reservedBind'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'Key';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
          if (rule_type === 'keyLength') {
            return true;
          }
        }
        return status;
      }
    },
    unbindKey: {
      // 字符串 -> 非空 -> 未超长
      rules: ['string', 'emptyString', 'keyLength', 'regexTest', 'reservedUnbind'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'Key';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
          if (rule_type === 'keyLength') {
            return true;
          }
        }
        return status;
      }
    },
    bindValue: {
      rules: ['string', 'emptyString', 'idLength'],
      onComplete: function(status, val, rule_type) {
        if (!status) {
          if (rule_type === 'emptyString') {
            val = 'Value';
          }
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
          // 大于 255 上报
          if (rule_type === 'idLength') {
            return true;
          }
        }
        return status;
      }
    },

    check: function(a, b, onComplete) {
      var checkRules = this[a];
      if (isFunction(checkRules)) {
        return checkRules.call(this, b);
      } else if (!checkRules) {
        return false;
      }
      for (var i = 0; i < checkRules.rules.length; i++) {
        var rule = checkRules.rules[i];
        var status = ruleOption[rule](b);
        // 有自定义 onComplete 则使用自定义 onComplete。否则使用默认 onComplete
        var result = isFunction(onComplete) ? onComplete(status, b, rule) : checkRules.onComplete(status, b, rule);
        if (!status) {
          return result;
        }
      }
      return true;
    }
  };

  function check(p, onComplete) {
    for (var i in p) {
      if (Object.prototype.hasOwnProperty.call(p, i) && !checkOption.check(i, p[i], onComplete)) {
        return false;
      }
    }
    return true;
  }

  var dataStageImpl = {
    stage: null,
    init: function(stage) {
      this.stage = stage;
    }
  };

  function processAddCustomProps(data) {
    return dataStageImpl.stage.process('addCustomProps', data);
  }

  function processFormatData(data) {
    return dataStageImpl.stage.process('formatData', data);
  }

  var saEvent = {};

  saEvent.check = check;

  saEvent.sendItem = function(p) {
    var data = {
      lib: {
        $lib: 'js',
        $lib_method: 'code',
        $lib_version: String(sd.lib_version)
      },
      time: new Date() * 1
    };

    extend(data, p);
    // trigger process [fortmatData]
    dataStageImpl.stage.process('formatData', data);
    sd.kit.sendData(data);
  };

  saEvent.send = function(p, callback) {
    var data = sd.kit.buildData(p);
    sd.kit.sendData(data, callback);
  };

  // 发送debug数据请求
  saEvent.debugPath = function(data) {
    var _data = data; //存数据
    var url = '';
    if (sd.para.debug_mode_url.indexOf('?') !== -1) {
      url = sd.para.debug_mode_url + '&' + sd.kit.encodeTrackData(data);
    } else {
      url = sd.para.debug_mode_url + '?' + sd.kit.encodeTrackData(data);
    }

    ajax$1({
      url: url,
      type: 'GET',
      cors: true,
      header: {
        'Dry-Run': String(sd.para.debug_mode_upload)
      },
      success: function(data) {
        // debug 模式下 提示框
        isEmptyObject(data) === true ? alert('debug数据发送成功' + _data) : alert('debug失败 错误原因' + JSON.stringify(data));
      }
    });
  };

  function IdentityManager() {
    this.getIdentitiesBySchema = function getIdentitiesBySchema(schema) {
      if (schema === 'users') {
        return {
          get: function() {
            return store._state.identities;
          }
        };
      }
      return {
        get: function() {}
      };
    };
  }

  // 多实例后再导出构造函数，现在先导出实例
  var identityManager = new IdentityManager();

  function CancellationToken(canceled) {
    this.cancel = function() {
      canceled = true;
    };
    this.getCanceled = function() {
      return canceled || false;
    };
  }

  function InterceptorContext(data, pos, sd) {
    var originalData = null;
    try {
      originalData = JSON.parse(JSON.stringify(data || null));
    } catch (e) {
      sdLog(e);
    }
    this.getOriginalData = function() {
      return originalData;
    };
    this.getPosition = function() {
      return pos;
    };
    this.cancellationToken = new CancellationToken();
    this.sensors = sd;
  }

  function Stage(processDef) {
    if (!isObject(processDef)) {
      throw 'error: Stage constructor requires arguments.';
    }
    this.processDef = processDef;
    this.registeredInterceptors = {};
  }

  Stage.prototype.process = function(proc, data) {
    if (!proc || !(proc in this.processDef)) {
      sdLog('process [' + proc + '] is not supported');
      return;
    }

    var itcptrs = this.registeredInterceptors[proc];
    if (itcptrs && isArray(itcptrs) && itcptrs.length > 0) {
      var pos = {
        current: 0,
        total: itcptrs.length
      };
      var context = new InterceptorContext(data, pos, sd);

      for (var i = 0; i < itcptrs.length; i++) {
        try {
          pos.current = i + 1;
          data = itcptrs[i].call(null, data, context) || data;
          if (context.cancellationToken.getCanceled()) {
            break;
          }
        } catch (e) {
          sdLog('interceptor error:' + e);
        }
      }
    }

    // check and trigger next process
    if (this.processDef[proc] && this.processDef[proc] in this.processDef) {
      data = this.process(this.processDef[proc], data);
    }
    return data;
  };

  Stage.prototype.registerStageImplementation = function(stageImpl) {
    if (!stageImpl || !stageImpl.init || !isFunction(stageImpl.init)) {
      return;
    }
    stageImpl.init(this);
    stageImpl.interceptor && this.registerInterceptor(stageImpl.interceptor);
  };

  Stage.prototype.registerInterceptor = function(interceptor) {
    if (!interceptor) {
      return;
    }
    for (var i in interceptor) {
      var itcptr = interceptor[i];
      if (!itcptr || !isObject(itcptr) || !isFunction(itcptr.entry)) {
        continue;
      }

      if (!isNumber(itcptr.priority)) {
        // if not assigned, set it to very low priority
        itcptr.priority = Number.MAX_VALUE;
      }

      if (!this.registeredInterceptors[i]) {
        this.registeredInterceptors[i] = [];
      }

      var curIts = this.registeredInterceptors[i];
      itcptr.entry.priority = itcptr.priority;
      curIts.push(itcptr.entry);

      curIts.sort(function(ita, itb) {
        return ita.priority - itb.priority;
      });
    }
  };

  var processDef = {
    addCustomProps: null,
    formatData: null
  };

  var dataStage = new Stage(processDef);

  var processDef$1 = {
    beforeSend: 'send',
    send: 'afterSend',
    afterSend: null
  };

  var sendStage = new Stage(processDef$1);

  var processDef$2 = {
    getUtmData: null,
    callSchema: null
  };

  var businessStage = new Stage(processDef$2);

  var processDef$3 = {
    webClickEvent: null,
    webStayEvent: null
  };

  var viewStage = new Stage(processDef$3);

  function registerFeature(feature) {
    feature && feature.dataStage && dataStage.registerStageImplementation(feature.dataStage);
    feature && feature.businessStage && businessStage.registerStageImplementation(feature.businessStage);
    feature && feature.sendStage && sendStage.registerStageImplementation(feature.sendStage);
    feature && feature.viewStage && viewStage.registerStageImplementation(feature.viewStage);
  }

  var interceptorRegisters = {
    dataStage: function registerDataStageInterceptor(interceptor) {
      interceptor && dataStage.registerInterceptor(interceptor);
    },
    businessStage: function registerBusinessInterceptor(interceptor) {
      interceptor && businessStage.registerInterceptor(interceptor);
    },
    sendStage: function registerSendStageInterceptor(interceptor) {
      interceptor && sendStage.registerInterceptor(interceptor);
    },
    viewStage: function registerViewInterceptor(interceptor) {
      interceptor && viewStage.registerInterceptor(interceptor);
    }
  };

  function registerInterceptor(stage, interceptor) {
    if (interceptorRegisters[stage]) {
      interceptorRegisters[stage](interceptor);
    }
  }

  // custom property process interceptor
  var customPropsItcptr = {
    addCustomProps: {
      priority: 0,
      entry: handleTrackData
    }
  };

  var registered = [];

  function getNGRegistered() {
    return registered.slice(0);
  }

  // ng register API implement
  function ngRegister(arg) {
    if (isObject(arg) || isFunction(arg)) {
      registered.push(arg);
      return;
    }
    sdLog('error: argument must be key-value object or a function that returns a key-value object.');
  }

  // Receive the track data, and add any you want to the track data
  // The following code won't run if it is APP bridge env.
  function handleTrackData(data) {
    var copyData = extend2Lev({
      properties: {}
    }, data);
    var customProps = {};
    registered.length &&
      each(registered, function(v) {
        if (isObject(v) && data.type && data.type.indexOf('track') > -1) {
          customProps = extend(customProps, v);
        }

        if (isFunction(v)) {
          try {
            customProps = extend(customProps, v(copyData));
            // eslint-disable-next-line no-empty
          } catch (e) {}
        }
      });

    data.properties = extend({}, data.properties, customProps);
    return data;
  }

  // register the custom property process interceptor
  registerInterceptor('dataStage', customPropsItcptr);

  var config = {
    disabled: false
  };

  function disableSDK() {
    config.disabled = true;
    sd.register = function() {};
  }

  function enableSDK() {
    config.disabled = false;
    sd.register = ngRegister;
  }

  var businessStageImpl = {
    stage: null,
    init: function(stage) {
      this.stage = stage;
    }
  };

  function processGetUtmData() {
    return businessStageImpl.stage && businessStageImpl.stage.process('getUtmData');
  }

  function processCallSchema(data) {
    if (config.disabled) {
      sdLog('sdk is disabled.');
      return;
    }
    return businessStageImpl.stage && businessStageImpl.stage.process('callSchema', data);
  }

  var empty = {
    setProfile: function() {},
    setOnceProfile: function() {},
    unsetProfile: function() {},
    deleteProfile: function() {},
    incrementProfile: function() {},
    appendProfile: function() {},
    getIdentities: function() {}
  };

  function User(schema) {
    if (!schema) {
      schema = 'users';
    }

    if (!isString(schema)) {
      sdLog('error: schema must be string');
      return empty;
    }
    this.schema = schema;
  }

  User.prototype.setProfile = function(p) {
    dispatchProtocol(this.schema, 'setProfile', p);
  };

  User.prototype.setOnceProfile = function(p) {
    dispatchProtocol(this.schema, 'setOnceProfile', p);
  };

  User.prototype.unsetProfile = function(p) {
    if (isArray(p) || isString(p)) {
      if (isString(p)) {
        p = [p];
      }
      processCallSchema({
        className: 'UserSchema',
        schema: this.schema,
        method: 'unsetProfile',
        args: [p]
      });
    } else {
      sdLog('unsetProfile arguments must be array or string');
    }
  };

  User.prototype.deleteProfile = function() {
    processCallSchema({
      className: 'UserSchema',
      schema: this.schema,
      method: 'deleteProfile',
      args: null
    });
  };

  User.prototype.incrementProfile = function(p) {
    var tmp = p;
    if (isString(tmp)) {
      p = {};
      p[tmp] = 1;
    }

    function isChecked(p) {
      for (var i in p) {
        if (Object.prototype.hasOwnProperty.call(p, i) && !/-*\d+/.test(String(p[i]))) {
          return false;
        }
      }
      return true;
    }

    if (isChecked(p)) {
      dispatchProtocol(this.schema, 'incrementProfile', p);
    } else {
      sdLog('profile_increment argument must be number');
    }
  };

  User.prototype.appendProfile = function(p) {
    each(p, function(value, key) {
      if (isString(value)) {
        p[key] = [value];
      } else if (isArray(value)) {
        p[key] = value;
      } else {
        delete p[key];
        sdLog('appendProfile argument properties must be string or array');
      }
    });

    if (!isEmptyObject(p)) {
      dispatchProtocol(this.schema, 'appendProfile', p);
    }
  };

  User.prototype.getIdentities = function() {
    return identityManager.getIdentitiesBySchema(this.schema).get();
  };

  function dispatchProtocol(schema, method, p) {
    var rule = {
      propertiesMust: p
    };
    if (check(rule)) {
      processCallSchema({
        className: 'UserSchema',
        schema: schema,
        method: method,
        args: p ? [p] : null
      });
    }
  }

  function handleUserAPICall(protocol) {
    var sendProfile = getSendProfileFn(protocol);
    switch (protocol.method) {
      case 'setProfile':
        sendProfile('profile_set');
        break;
      case 'setOnceProfile':
        sendProfile('profile_set_once');
        break;
      case 'incrementProfile':
        sendProfile('profile_increment');
        break;
      case 'appendProfile':
        sendProfile('profile_append');
        break;
      case 'unsetProfile':
        sendProfile('profile_unset');
        break;
      case 'deleteProfile':
        sendProfile('profile_delete');
        store.set('distinct_id', UUID());
        store.set('first_id', '');
        break;
    }
  }

  function fixUnsetProfileArgs(p) {
    var arg = {};
    isArray(p) &&
      each(p, function(v) {
        if (isString(v)) {
          arg[v] = true;
        } else {
          sdLog('values in the array argument must be string, invalid value is removed', v);
        }
      });
    return arg;
  }

  function getSendProfileFn(protocol) {
    var schema = protocol.schema;
    var p = protocol.args && protocol.args[0];

    return function sendProfile(t) {
      if (protocol.method === 'unsetProfile') {
        p = fixUnsetProfileArgs(p);
      }
      if (protocol.method === 'deleteProfile') {
        p = void 0;
      }
      var data = {
        schema: schema,
        type: t,
        properties: p
      };
      saEvent.send(data);
    };
  }

  function loginBody(obj, sendSignup) {
    var id = obj.id;
    var callback = obj.callback;
    var name = obj.name;

    var firstId = store.getFirstId();
    var distinctId = store.getOriginDistinctId();

    // id 合法
    if (!check({
        distinct_id: id
      })) {
      sdLog('login id is invalid');
      return false;
    }
    // 未登录
    if (id === store.getOriginDistinctId() && !firstId) {
      sdLog('login id is equal to distinct_id');
      return false;
    }
    // 如果已登录，再次调用 login() 传入的是匿名 id，忽略本次调用
    // eslint-disable-next-line no-prototype-builtins
    if (isObject(store._state.identities) && store._state.identities.hasOwnProperty(name) && id === store._state.first_id) {
      return false;
    }

    var isNewLoginId = store._state.history_login_id.name !== name || id !== store._state.history_login_id.value;
    // 3.0 新增
    if (isNewLoginId) {
      store._state.identities[name] = id;
      store.set('history_login_id', {
        name: name,
        value: id
      });

      if (!firstId) {
        store.set('first_id', distinctId);
      }

      sendSignup(id, '$SignUp', {}, callback);

      // 重置 identities
      var tempObj = {
        $identity_cookie_id: store._state.identities.$identity_cookie_id
      };
      tempObj[name] = id;
      resetIdentities(tempObj);
      return true;
    }
    return false;
  }

  /*
     重置 id3 中的 identities
     @para {retain:'保留什么属性'}
    */
  function resetIdentities(resetObj) {
    var identities = {};
    for (var i in resetObj) {
      identities[i] = resetObj[i];
    }
    store._state.identities = identities;
    store.save();
  }

  function deleteBindIDData(name, value) {
    if (!check({
        unbindKey: name,
        bindValue: value
      })) {
      return false;
    }

    // eslint-disable-next-line no-prototype-builtins
    if (isObject(store._state.identities) && store._state.identities.hasOwnProperty(name) && store._state.identities[name] === value) {
      // 如果 login_id = itemName+itemValue 需要清除用户
      var loginID = store.getUnionId().login_id;
      if (loginID && name + '+' + value === loginID) {
        store._state.distinct_id = store._state.first_id;
        store._state.first_id = '';
        store.set('history_login_id', {
          name: '',
          value: ''
        });
      }

      // 如果是 $identity_cookie_id 本地不删除，只有服务器解绑
      if (name !== '$identity_cookie_id') {
        delete store._state.identities[name];
        store.save();
      }
    }

    var identities = {};
    identities[name] = value;
    return identities;
  }

  /**
   * safe 相关，为安全设计
   */
  function getSafeHttpProtocol() {
    var protocol = location.protocol;
    if (protocol === 'http:' || protocol === 'https:') {
      return protocol;
    } else {
      return 'http:';
    }
  }

  var viewStageImpl = {
    stage: null,
    init: function(stage) {
      this.stage = stage;
    }
  };

  function processWebClickEvent(data) {
    return viewStageImpl.stage.process('webClickEvent', data);
  }

  function processWebStayEvent(data) {
    return viewStageImpl.stage.process('webStayEvent', data);
  }

  var vtrackBase = {};
  /**
   * 初始化serverURL、pageUrl。
   * @returns false 初始化失败
   * @returns object url信息解析对象
   */
  vtrackBase.initUrl = function() {
    var url_info = {
      server_url: {
        project: '',
        host: ''
      },
      page_url: {
        host: '',
        pathname: ''
      }
    };
    //server_url必须解析成功
    var serverParse;
    if (!isHttpUrl(sd.para.server_url)) {
      sd.log('----vcollect---server_url必须为有效 URL 字符串');
      return false;
    }
    try {
      serverParse = _URL(sd.para.server_url);
      url_info.server_url.project = serverParse.searchParams.get('project') || 'default';
      url_info.server_url.host = serverParse.host;
    } catch (error) {
      sd.log('----vcollect---server_url解析异常', error);
      return false;
    }

    //location.href必须解析成功（配置下发hostname）
    var urlParse;
    try {
      urlParse = _URL(location.href);
      url_info.page_url.host = urlParse.hostname; //可视化虚拟事件筛选条件使用不带端口号的域名
      url_info.page_url.pathname = urlParse.pathname;
    } catch (error) {
      sd.log('----vcollect---页面地址解析异常', error);
      return false;
    }
    return url_info;
  };

  /**
   * 根据element_path或者element_selector判断是否是div
   * @param {*} obj  element_path 或者 element_selector
   * @returns
   */
  vtrackBase.isDiv = function(obj) {
    if (obj.element_path) {
      var pathArr = obj.element_path.split('>');
      var lastPath = trim(pathArr.pop());
      if (lastPath.slice(0, 3) !== 'div') {
        return false;
      }
    }
    return true;
  };

  vtrackBase.configIsMatchNew = function(properties, eventConf) {
    if (isString(properties.$element_selector) && isString(eventConf.element_selector)) {
      if (eventConf.element_field === 'element_selector' && eventConf['function'] === 'equal') {
        return properties.$element_selector === eventConf.element_selector;
      }
      if (eventConf.element_field === 'element_selector' && eventConf['function'] === 'contain') {
        return properties.$element_selector.indexOf(eventConf.element_selector) > -1;
      }
    }
    if (isString(properties.$element_path) && isString(eventConf.element_path)) {
      if (eventConf.element_field === 'element_path' && eventConf['function'] === 'equal') {
        return properties.$element_path === eventConf.element_path;
      }
      if (eventConf.element_field === 'element_path' && eventConf['function'] === 'contain') {
        return properties.$element_path.indexOf(eventConf.element_path) > -1;
      }
    }
    return false;
  };

  /**
   * 校验配置是否与点击事件匹配
   * @param {*} properties {$element_path:'',$element_position:'',$element_content:''}
   * @param {*} eventConf events[i].event
   * return true满足，false不满足
   */
  vtrackBase.configIsMatch = function(properties, eventConf) {
    if (eventConf.limit_element_content) {
      if (eventConf.element_content !== properties.$element_content) {
        return false;
      }
    }
    if (eventConf.limit_element_position) {
      if (eventConf.element_position !== String(properties.$element_position)) {
        return false;
      }
    }

    if (eventConf.element_field && eventConf['function']) {
      return vtrackBase.configIsMatchNew(properties, eventConf);
    } else {
      // 兼容sdg老版本，日后可删除
      return vtrackBase.configIsMatchOldVersion(properties, eventConf);
    }
  };

  /**
   * 校验配置是否与点击事件匹配
   * @param {*} properties {$element_path:'',$element_position:'',$element_content:''}
   * @param {*} eventConf events[i].event
   * return true满足，false不满足
   */
  vtrackBase.configIsMatchOldVersion = function(properties, eventConf) {
    if (!eventConf.element_path) {
      return false;
    }
    //筛选path
    if (properties.$element_position !== undefined) {
      //列表内元素使用等于校验 element_path
      if (eventConf.element_path !== properties.$element_path) {
        return false;
      }
    } else {
      //列表外元素，检查配置是否是div，如果是div，那么是包含，如果不是div就是等于
      if (vtrackBase.isDiv({
          element_path: eventConf.element_path
        })) {
        if (properties.$element_path.indexOf(eventConf.element_path) < 0) {
          return false;
        }
      } else {
        //其他的元素是等于
        if (eventConf.element_path !== properties.$element_path) {
          return false;
        }
      }
    }
    return true;
  };

  /**
   * 筛选配置获取埋点数据匹配的list
   * @param {*} data 埋点数据
   * @param {*} events 配置中的events字段
   * @param {*} page_url 页面url信息包括host、pathname
   * @returns [] 所有匹配的配置
   */
  vtrackBase.filterConfig = function(data, events, page_url) {
    var arr = [];
    if (!page_url) {
      var urlinfo = vtrackBase.initUrl();
      if (!urlinfo) {
        return [];
      } else {
        page_url = urlinfo.page_url;
      }
    }
    if (data.event === '$WebClick') {
      each(events, function(item) {
        if (isObject(item) && (item.event_type === 'webclick' || item.event_type === 'appclick') && isObject(item.event)) {
          //内嵌h5event_type是appclick
          if (item.event.url_host === page_url.host && item.event.url_path === page_url.pathname) {
            if (vtrackBase.configIsMatch(data.properties, item.event)) {
              arr.push(item);
            }
          }
        }
      });
    }
    return arr;
  };

  //根据list_selector在当前li中查找对应元素
  vtrackBase.getPropElInLi = function(li, list_selector) {
    if (!(li && isElement(li) && isString(list_selector))) {
      return null;
    }
    if (li.tagName.toLowerCase() !== 'li') {
      return null;
    }
    var li_selector = sd.heatmap.getDomSelector(li);
    var selector;
    if (li_selector) {
      selector = li_selector + list_selector;
      var target = getDomBySelector(selector);
      if (target) {
        return target;
      } else {
        return null;
      }
    } else {
      sd.log('----custom---获取同级属性元素失败，selector信息异常', li_selector, list_selector);
      return null;
    }
  };

  /**
   * 根据属性规则获取属性值
   * @param {*} propConf
   */
  vtrackBase.getProp = function(propConf, data) {
    if (!isObject(propConf)) {
      return false;
    }
    //校验属性名，非空字符串
    if (!(isString(propConf.name) && propConf.name.length > 0)) {
      sd.log('----vcustom----属性名不合法,属性抛弃', propConf.name);
      return false;
    }

    var result = {};
    var value;
    var regResult;

    if (propConf.method === 'content') {
      var el;
      //获取属性元素
      if (isString(propConf.element_selector) && propConf.element_selector.length > 0) {
        //单个属性元素
        el = getDomBySelector(propConf.element_selector);
      } else if (data && isString(propConf.list_selector)) {
        //列表内属性元素,使用当前li路径+列表内元素路径
        var clickTarget = getDomBySelector(data.properties.$element_selector);
        if (clickTarget) {
          var closeli = sd.heatmap.getClosestLi(clickTarget);
          el = vtrackBase.getPropElInLi(closeli, propConf.list_selector);
        } else {
          sd.log('----vcustom----点击元素获取异常，属性抛弃', propConf.name);
          return false;
        }
      } else {
        sd.log('----vcustom----属性配置异常，属性抛弃', propConf.name);
        return false;
      }

      if (el && isElement(el)) {
        //input作为属性元素直接采集内容不用加开关同app
        if (el.tagName.toLowerCase() === 'input') {
          value = el.value || '';
        } else if (el.tagName.toLowerCase() === 'select') {
          var sid = el.selectedIndex;
          if (isNumber(sid) && isElement(el[sid])) {
            value = getElementContent$1(el[sid], 'select');
          }
        } else {
          value = getElementContent$1(el, el.tagName.toLowerCase());
        }
      } else {
        sd.log('----vcustom----属性元素获取失败，属性抛弃', propConf.name);
        return false;
      }

      //规则处理
      if (propConf.regular) {
        try {
          regResult = new RegExp(propConf.regular).exec(value);
        } catch (error) {
          sd.log('----vcustom----正则处理失败，属性抛弃', propConf.name);
          return false;
        }

        if (regResult === null) {
          sd.log('----vcustom----属性规则处理，未匹配到结果,属性抛弃', propConf.name);
          return false;
        } else {
          if (!(isArray(regResult) && isString(regResult[0]))) {
            sd.log('----vcustom----正则处理异常，属性抛弃', propConf.name, regResult);
            return false;
          }
          value = regResult[0];
        }
      }

      if (propConf.type === 'STRING') {
        result[propConf.name] = value;
      } else if (propConf.type === 'NUMBER') {
        if (value.length < 1) {
          //上报数字内容的数字类型，没有内容，不上报
          sd.log('----vcustom----未获取到数字内容，属性抛弃', propConf.name, value);
          return false;
        }
        if (!isNaN(Number(value))) {
          result[propConf.name] = Number(value);
        } else {
          sd.log('----vcustom----数字类型属性转换失败，属性抛弃', propConf.name, value);
          return false;
        }
      }

      return result;
    } else {
      sd.log('----vcustom----属性不支持此获取方式', propConf.name, propConf.method);
      return false;
    }
  };

  /**
   * 从总数据中筛选出当前页面符合条件的配置
   * @param {*} func 筛选函数，true代表选中
   * @returns [] 符合条件的所有event配置
   */
  vtrackBase.getAssignConfigs = function(func, config) {
    var url_info = vtrackBase.initUrl();
    if (!(url_info && url_info.page_url)) {
      return [];
    }
    if (!isObject(config)) {
      return [];
    }
    var arr = [];
    // 打平debug模式的数据和拉取配置的数据
    config.events = config.events || config.eventList;

    if (!(isArray(config.events) && config.events.length > 0)) {
      return [];
    }

    each(config.events, function(event) {
      if (isObject(event) && isObject(event.event) && event.event.url_host === url_info.page_url.host && event.event.url_path === url_info.page_url.pathname) {
        if (func(event)) {
          arr.push(event);
        }
      }
    });

    return arr;
  };

  var unlimitedDiv = {
    events: [],
    init: function(data) {
      this.filterWebClickEvents(data);
    },
    filterWebClickEvents: function(data) {
      this.events = vtrackcollect.getAssignConfigs(function(event) {
        if (isObject(event) && event.event.unlimited_div === true && event.event_type === 'webclick') {
          return true;
        } else {
          return false;
        }
      }, data);
    },
    isTargetEle: function(ele) {
      var prop = sd.heatmap.getEleDetail(ele);

      if (!isObject(prop) || !isString(prop.$element_path)) {
        return false;
      }

      for (var i = 0; i < this.events.length; i++) {
        if (isObject(this.events[i]) && isObject(this.events[i].event) && vtrackcollect.configIsMatch(prop, this.events[i].event)) {
          return true;
        }
      }

      return false;
    }
  };

  var customProp = {
    events: [],
    //配置开关，有配置开关开启
    configSwitch: false,
    //功能是否开启
    collectAble: function() {
      return this.configSwitch && isObject(sd.para.heatmap) && sd.para.heatmap.get_vtrack_config;
    },
    updateEvents: function(data) {
      this.events = vtrackcollect.getAssignConfigs(function(event) {
        if (isObject(event) && isArray(event.properties) && event.properties.length > 0) {
          return true;
        } else {
          return false;
        }
      }, data);
      if (this.events.length) {
        this.configSwitch = true;
      } else {
        this.configSwitch = false;
      }
    },
    //根据配置添加自定义属性
    getVtrackProps: function(data) {
      var props = {};
      if (!this.collectAble()) {
        return {};
      }
      if (data.event === '$WebClick') {
        props = this.clickCustomPropMaker(data, this.events);
      }
      return props;
    },
    //获取点击事件的自定义属性
    clickCustomPropMaker: function(data, events, configs) {
      var _this = this;
      configs = configs || this.filterConfig(data, events, vtrackcollect.url_info.page_url);
      var props = {};
      if (!configs.length) {
        return {};
      }
      each(configs, function(config) {
        if (isArray(config.properties) && config.properties.length > 0) {
          each(config.properties, function(propConf) {
            var prop = _this.getProp(propConf, data);
            if (isObject(prop)) {
              extend(props, prop);
            }
          });
        }
      });
      return props;
    },
    /**
     * 根据属性规则获取属性值
     * @param {*} propConf
     */
    getProp: vtrackBase.getProp,
    //根据 list_selector在li中找到对应元素
    getPropElInLi: vtrackBase.getPropElInLi,

    /**
     * 筛选配置获取埋点数据匹配的list
     * @param {*} data 埋点数据
     * @param {*} events 配置中的events字段
     * @param {*} page_url 页面url信息包括host、pathname
     * @returns [] 所有匹配的配置
     */
    filterConfig: vtrackBase.filterConfig
  };

  var vtrackcollect = {
    unlimitedDiv: unlimitedDiv,
    config: {},
    storageEnable: true,
    storage_name: 'webjssdkvtrackcollect',
    para: {
      session_time: 30 * 60 * 1000,
      timeout: 5000,
      update_interval: 30 * 60 * 1000
      // update_interval: 30 * 1000
    },
    url_info: {},
    timer: null,
    update_time: null,
    //自定义属性功能
    customProp: customProp,
    initUrl: function() {
      var info = vtrackBase.initUrl();
      if (info) {
        //拼接API请求地址
        var apiParse;
        try {
          apiParse = new urlParse(sd.para.server_url);
          apiParse._values.Path = '/config/visualized/Web.conf';
          info.api_url = apiParse.getUrl();
        } catch (error) {
          sd.log('----vtrackcollect---API地址解析异常', error);
          return false;
        }
        this.url_info = info;
      }
      return info;
    },
    //初始化可视化配置
    init: function() {
      //根据开关决定是否请求配置
      if (!(isObject(sd.para.heatmap) && sd.para.heatmap.get_vtrack_config)) {
        //sd.log('----vtrackcustom----初始化失败，get_vtrack_config开关未开启');
        return false;
      }

      if (!_localStorage.isSupport()) {
        this.storageEnable = false;
      }
      //初始化APIURL，serverurl、pageurl不合法就结束
      if (!this.initUrl()) {
        sd.log('----vtrackcustom----初始化失败，url信息解析失败');
        return false;
      }

      if (!this.storageEnable) {
        this.getConfigFromServer();
      } else {
        var data = store.readObjectVal(this.storage_name);
        if (!(isObject(data) && isObject(data.data))) {
          //本地没有，拉取最新的
          this.getConfigFromServer();
        } else if (!this.serverUrlIsSame(data.serverUrl)) {
          //数据接收地址不一致，更新数据
          this.getConfigFromServer();
        } else {
          //本地有，先使用本地的
          this.config = data.data;
          this.update_time = data.updateTime;
          this.updateConfig(data.data);
          var now_time = new Date().getTime();
          var duration = now_time - this.update_time;
          if (!(isNumber(duration) && duration > 0 && duration < this.para.session_time)) {
            //本地数据不是30分钟内的，更新数据
            this.getConfigFromServer();
          } else {
            var next_time = this.para.update_interval - duration;
            this.setNextFetch(next_time);
          }
        }
      }
      this.pageStateListenner();
    },
    //校验本地数据的serverurl与当前serverurl是否一致
    serverUrlIsSame: function(obj) {
      if (!isObject(obj)) {
        return false;
      }
      if (obj.host === this.url_info.server_url.host && obj.project === this.url_info.server_url.project) {
        return true;
      }
      return false;
    },
    getConfigFromServer: function() {
      var _this = this;
      var success = function(code, data) {
        _this.update_time = new Date().getTime();
        var serverData = {};
        if (code === 200) {
          if (data && isObject(data) && data.os === 'Web') {
            //配置成功返回
            serverData = data;
            _this.updateConfig(serverData);
          }
        } else if (code === 205) {
          _this.updateConfig(serverData);
        } else if (code === 304) {
          //远程配置与本地相同
          serverData = _this.config;
        } else {
          sd.log('----vtrackcustom----数据异常', code);
          _this.updateConfig(serverData);
        }
        _this.updateStorage(serverData);
        _this.setNextFetch();
      };
      var error = function(err) {
        _this.update_time = new Date().getTime();
        sd.log('----vtrackcustom----配置拉取失败', err);
        _this.setNextFetch();
      };
      this.sendRequest(success, error);
    },
    //设置更新定时器
    setNextFetch: function(time) {
      var _this = this;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      time = time || this.para.update_interval;
      this.timer = setTimeout(function() {
        _this.getConfigFromServer();
      }, time);
    },
    //页面隐藏停止定时拉取计时器，页面显示时重新计算
    pageStateListenner: function() {
      var _this = this;
      listenPageState({
        visible: function() {
          var time = new Date().getTime();
          var duration = time - _this.update_time;
          if (isNumber(duration) && duration > 0 && duration < _this.para.update_interval) {
            var next_time = _this.para.update_interval - duration;
            _this.setNextFetch(next_time);
          } else {
            _this.getConfigFromServer();
          }
        },
        hidden: function() {
          if (_this.timer) {
            clearTimeout(_this.timer);
            _this.timer = null;
          }
        }
      });
    },
    updateConfig: function(data) {
      if (!isObject(data)) {
        return false;
      }
      this.config = data;
      this.customProp.updateEvents(data);
      this.unlimitedDiv.init(data);
    },
    updateStorage: function(data) {
      if (!this.storageEnable) {
        return false;
      }
      if (!isObject(data)) {
        return false;
      }
      var server_url;
      if (!this.url_info.server_url) {
        var urlinfo = vtrackcollect.initUrl();
        if (!urlinfo) {
          return false;
        } else {
          server_url = urlinfo.server_url;
        }
      } else {
        server_url = this.url_info.server_url;
      }
      var obj = {
        updateTime: new Date().getTime(),
        data: data,
        serverUrl: server_url
      };
      store.saveObjectVal(this.storage_name, obj);
    },
    sendRequest: function(suc, err) {
      var _this = this;
      var data = {
        app_id: this.url_info.page_url.host
      };
      if (this.config.version) {
        data.v = this.config.version;
      }
      jsonp({
        url: _this.url_info.api_url,
        callbackName: 'saJSSDKVtrackCollectConfig',
        data: data,
        timeout: _this.para.timeout, //影响window.onload
        success: function(code, data) {
          suc(code, data);
        },
        error: function(error) {
          err(error);
        }
      });
    },
    /**
     * 从总数据中筛选出当前页面符合条件的配置
     * @param {*} func 筛选函数，true代表选中
     * @returns [] 符合条件的所有event配置
     */

    getAssignConfigs: vtrackBase.getAssignConfigs,

    /**
     * 校验配置是否与点击事件匹配
     * @param {*} properties {$element_path:'',$element_position:'',$element_content:''}
     * @param {*} eventConf events[i].event
     * return true满足，false不满足
     */
    configIsMatch: vtrackBase.configIsMatch
  };

  /*
  点击图和触达图数据采集的功能
  */

  // 支持无限层级的标签字典
  var UNLIMITED_TAGS_MAP = {
    label: false,
    li: false,
    a: true,
    button: true
  };

  var heatmap = {
    otherTags: [],
    /**
     * 初始化无限层级的标签 label, li 只有配置了collect_tags才可采集
     */
    initUnlimitedTags: function() {
      each(heatmap.otherTags, function(tagName) {
        if (tagName in UNLIMITED_TAGS_MAP) {
          UNLIMITED_TAGS_MAP[tagName] = true;
        }
      });
    },
    // 判断是否是支持无限层级的标签元素 (a, button, data-sensors-click)
    isUnlimitedTag: function(el) {
      if (!el || el.nodeType !== 1) return false;
      var tagName = el.nodeName.toLowerCase();
      return UNLIMITED_TAGS_MAP[tagName] || hasAttributes(el, sd.para.heatmap.track_attr);
    },
    getTargetElement: function(element, e) {
      var that = this;
      var target = element;
      if (typeof target !== 'object') {
        return null;
      }
      if (typeof target.tagName !== 'string') {
        return null;
      }
      var tagName = target.tagName.toLowerCase();
      if (tagName.toLowerCase() === 'body' || tagName.toLowerCase() === 'html') {
        return null;
      }
      if (!target || !target.parentNode || !target.parentNode.children) {
        return null;
      }

      var parent_ele = target.parentNode;

      var otherTags = that.otherTags;

      if (tagName === 'a' || tagName === 'button' || tagName === 'input' || tagName === 'textarea') {
        return target;
      }
      if (indexOf(otherTags, tagName) > -1) {
        return target;
      }
      if (tagName === 'area' && parent_ele.tagName.toLowerCase() === 'map' && ry(parent_ele).prev().tagName && ry(parent_ele).prev().tagName.toLowerCase() === 'img') {
        return ry(parent_ele).prev();
      }
      if (tagName === 'div' && sd.para.heatmap.collect_tags.div && that.isDivLevelValid(target)) {
        var max_level = (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level) || 1;
        if (max_level > 1 || that.isCollectableDiv(target)) {
          return target;
        }
      }
      if (that.isStyleTag(tagName) && sd.para.heatmap.collect_tags.div) {
        var parentTrackDiv = that.getCollectableParent(target);
        if (parentTrackDiv && that.isDivLevelValid(parentTrackDiv)) {
          return parentTrackDiv;
        }
      }
      // 遍历查看父级是否存在 支持无限层级的元素 (a, button, label, li, data-sensors-click)
      var unlimitedTag = that.hasElement({
        event: (e && e.originalEvent) || e,
        element: element
      }, function(target) {
        return that.isUnlimitedTag(target);
      });
      return unlimitedTag || null;
    },
    // 两个 div 之间的层级数目
    getDivLevels: function(element, rootElement) {
      var path = heatmap.getElementPath(element, true, rootElement);
      var pathArr = path.split(' > ');
      var ans = 0;
      each(pathArr, function(tag) {
        if (tag === 'div') {
          ans++;
        }
      });
      return ans;
    },
    isDivLevelValid: function(element) {
      var max_level = (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level) || 1;

      var allDiv = element.getElementsByTagName('div');
      for (var i = allDiv.length - 1; i >= 0; i--) {
        if (heatmap.getDivLevels(allDiv[i], element) > max_level) {
          return false;
        }
      }
      return true;
    },
    // 得到元素的 $element_path
    getElementPath: function(element, ignoreID, rootElement) {
      var names = [];
      while (element.parentNode) {
        if (element.id && !ignoreID && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(element.id)) {
          names.unshift(element.tagName.toLowerCase() + '#' + element.id);
          break;
        } else {
          if (rootElement && element === rootElement) {
            names.unshift(element.tagName.toLowerCase());
            break;
          } else if (element === document.body) {
            names.unshift('body');
            break;
          } else {
            names.unshift(element.tagName.toLowerCase());
          }
          element = element.parentNode;
        }
      }
      return names.join(' > ');
    },
    // 得到元素最近的 li 元素
    getClosestLi: function(element) {
      // 得到符合指定选择器的最近的元素
      var getClosest = function(elem, selector) {
        // Get closest match
        for (; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode) {
          // If selector is a tag
          if (elem.tagName.toLowerCase() === selector) {
            return elem;
          }
        }
        return null;
      };
      return getClosest(element, 'li');
    },
    // 得到元素的 $element_position 属性
    getElementPosition: function(element, elementPath, ignoreID) {
      var closestLi = sd.heatmap.getClosestLi(element);
      if (!closestLi) {
        return null;
      }
      var tag = element.tagName.toLowerCase();
      var sameTypeTags = closestLi.getElementsByTagName(tag);
      var sameTypeTagsLen = sameTypeTags.length;
      var arr = [];
      // 如果 li 中存在多个相同类型的元素
      if (sameTypeTagsLen > 1) {
        for (var i = 0; i < sameTypeTagsLen; i++) {
          var elepath = sd.heatmap.getElementPath(sameTypeTags[i], ignoreID);
          if (elepath === elementPath) {
            arr.push(sameTypeTags[i]);
          }
        }
        if (arr.length > 1) {
          // 以当前元素在相同类型元素列表中的位置作为 position
          return indexOf(arr, element);
        }
      }

      function _getPosition(element) {
        var parentNode = element.parentNode;
        if (!parentNode) {
          return '';
        }
        var sameTypeSiblings = ry(element).getSameTypeSiblings();
        var typeLen = sameTypeSiblings.length;
        if (typeLen === 1) {
          return 0;
        }
        for (var i = 0, e = element; ry(e).previousElementSibling().ele; e = ry(e).previousElementSibling().ele, i++);
        return i;
      }
      // 默认以上级 li 的位置作为元素的 position
      return _getPosition(closestLi);
    },
    // 设置错误提示
    setNotice: function(web_url) {
      sd.is_heatmap_render_mode = true;

      if (!sd.para.heatmap) {
        sd.errorMsg = '您SDK没有配置开启点击图，可能没有数据！';
      }
      if (web_url) {
        if (web_url.slice(0, 5) === 'http:' && location.protocol === 'https:') {
          sd.errorMsg = '您的当前页面是https的地址，神策分析环境也必须是https！';
        }
      }
      if (!sd.para.heatmap_url) {
        sd.para.heatmap_url = getSafeHttpProtocol() + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/heatmap.min.js';
      }
    },
    getDomIndex: function(el) {
      if (!el.parentNode) return -1;
      var i = 0;
      var nodeName = el.tagName;
      var list = el.parentNode.children;
      for (var n = 0; n < list.length; n++) {
        if (list[n].tagName === nodeName) {
          if (el === list[n]) {
            return i;
          } else {
            i++;
          }
        }
      }
      return -1;
    },
    selector: function(el, notuseid) {
      var i = el.parentNode && 9 == el.parentNode.nodeType ? -1 : this.getDomIndex(el);
      if (el.getAttribute && el.getAttribute('id') && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(el.getAttribute('id')) && (!sd.para.heatmap || (sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id')) && !notuseid) {
        return '#' + el.getAttribute('id');
      } else {
        return el.tagName.toLowerCase() + (~i ? ':nth-of-type(' + (i + 1) + ')' : '');
      }
    },
    getDomSelector: function(el, arr, notuseid) {
      if (!el || !el.parentNode || !el.parentNode.children) {
        return false;
      }
      arr = arr && arr.join ? arr : [];
      var name = el.nodeName.toLowerCase();
      if (!el || name === 'body' || 1 != el.nodeType) {
        arr.unshift('body');
        return arr.join(' > ');
      }
      arr.unshift(this.selector(el, notuseid));
      if (el.getAttribute && el.getAttribute('id') && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(el.getAttribute('id')) && sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id' && !notuseid) return arr.join(' > ');
      return this.getDomSelector(el.parentNode, arr, notuseid);
    },
    na: function() {
      var a = document.documentElement.scrollLeft || window.pageXOffset;
      return parseInt(isNaN(a) ? 0 : a, 10);
    },
    i: function() {
      var a = 0;
      try {
        //eslint-disable-next-line
        (a = (o.documentElement && o.documentElement.scrollTop) || m.pageYOffset), (a = isNaN(a) ? 0 : a);
      } catch (b) {
        a = 0;
      }
      return parseInt(a, 10);
    },
    getBrowserWidth: function() {
      var a = window.innerWidth || document.body.clientWidth;
      return isNaN(a) ? 0 : parseInt(a, 10);
    },
    getBrowserHeight: function() {
      var a = window.innerHeight || document.body.clientHeight;
      return isNaN(a) ? 0 : parseInt(a, 10);
    },
    getScrollWidth: function() {
      var a = parseInt(document.body.scrollWidth, 10);
      return isNaN(a) ? 0 : a;
    },
    getEleDetail: function(target) {
      var selector = this.getDomSelector(target);
      var prop = getEleInfo({
        target: target
      });
      prop.$element_selector = selector ? selector : '';
      prop.$element_path = sd.heatmap.getElementPath(target, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
      var element_position = sd.heatmap.getElementPosition(target, prop.$element_path, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
      if (isNumber(element_position)) {
        prop.$element_position = element_position;
      }
      return prop;
    },
    getPointerEventProp: function(ev, target) {
      if (!ev) {
        return {};
      }

      function getScroll() {
        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft || 0;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop || 0;
        return {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        };
      }

      function getElementPosition(target) {
        if (document.documentElement.getBoundingClientRect) {
          var targetEle = target.getBoundingClientRect();
          return {
            targetEleX: targetEle.left + getScroll().scrollLeft || 0,
            targetEleY: targetEle.top + getScroll().scrollTop || 0
          };
        }
      }

      function toFixedThree(val) {
        return Number(Number(val).toFixed(3));
      }
      // 获取鼠标在页面的位置，处理浏览器兼容性
      function getPage(ev) {
        var pageX = ev.pageX || ev.clientX + getScroll().scrollLeft || ev.offsetX + getElementPosition(target).targetEleX || 0;
        var pageY = ev.pageY || ev.clientY + getScroll().scrollTop || ev.offsetY + getElementPosition(target).targetEleY || 0;
        return {
          $page_x: toFixedThree(pageX),
          $page_y: toFixedThree(pageY)
        };
      }
      return getPage(ev);
    },
    start: function(ev, target, tagName, customProps, callback) {
      var basicEleInfo = heatmap.getBasicEleInfo(ev, target, tagName, customProps, callback);
      processWebClickEvent(basicEleInfo);
    },
    getBasicEleInfo: function(ev, target, tagName, customProps, callback) {
      var userCustomProps = isObject(customProps) ? customProps : {};
      var userCallback = isFunction(callback) ? callback : isFunction(customProps) ? customProps : undefined;
      if (sd.para.heatmap && sd.para.heatmap.collect_element && !sd.para.heatmap.collect_element(target)) {
        return false;
      }

      var prop = this.getEleDetail(target);

      if (sd.para.heatmap && sd.para.heatmap.custom_property) {
        var customP = sd.para.heatmap.custom_property(target);
        if (isObject(customP)) {
          prop = extend(prop, customP);
        }
      }
      prop = extend(prop, this.getPointerEventProp(ev, target), userCustomProps);
      return {
        event: ev,
        target: target,
        props: prop,
        tagName: tagName,
        callback: userCallback
      };
    },
    // 去除window
    hasElement: function(obj, func) {
      var path;
      if (obj.event) {
        var e = obj.event;
        path = e.path || (e._getPath && e._getPath());
      } else if (obj.element) {
        path = ry(obj.element).getParents();
      }

      if (path) {
        if (isArray(path) && path.length > 0) {
          for (var i = 0; i < path.length; i++) {
            // 去除 widnow 非节点类型
            if (typeof path[i] === 'object' && path[i].nodeType === 1 && func(path[i])) {
              return path[i];
            }
          }
        }
      }
    },
    isStyleTag: function(tagname, isVisualMode) {
      var defaultTag = ['a', 'div', 'input', 'button', 'textarea'];
      var ignore_tags_default = ['mark', '/mark', 'strong', 'b', 'em', 'i', 'u', 'abbr', 'ins', 'del', 's', 'sup'];
      if (indexOf(defaultTag, tagname) > -1) {
        return false;
      }
      if (isVisualMode && (!sd.para.heatmap || !sd.para.heatmap.collect_tags || !sd.para.heatmap.collect_tags.div)) {
        return indexOf(ignore_tags_default, tagname) > -1;
      } else if (isObject(sd.para.heatmap) && isObject(sd.para.heatmap.collect_tags) && isObject(sd.para.heatmap.collect_tags.div) && isArray(sd.para.heatmap.collect_tags.div.ignore_tags) && indexOf(sd.para.heatmap.collect_tags.div.ignore_tags, tagname) > -1) {
        return true;
      }
      return false;
    },
    isCollectableDiv: function(target, isVisualMode) {
      try {
        if (target.children.length === 0) {
          return true;
        } else {
          for (var i = 0; i < target.children.length; i++) {
            if (target.children[i].nodeType !== 1) {
              continue;
            }
            var tag = target.children[i].tagName.toLowerCase();
            var max_level = sd.para && sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level;
            if ((tag === 'div' && max_level > 1) || this.isStyleTag(tag, isVisualMode)) {
              if (!this.isCollectableDiv(target.children[i], isVisualMode)) {
                return false;
              }
            } else {
              return false;
            }
          }
          return true;
        }
      } catch (error) {
        sd.log(error);
      }
      return false;
    },
    getCollectableParent: function(target, isVisualMode) {
      try {
        var parent = target.parentNode;
        var parentName = parent ? parent.tagName.toLowerCase() : '';
        if (parentName === 'body') {
          return false;
        }
        var max_level = sd.para && sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level;
        if (parentName && parentName === 'div' && (max_level > 1 || this.isCollectableDiv(parent, isVisualMode))) {
          return parent;
        } else if (parent && this.isStyleTag(parentName, isVisualMode)) {
          return this.getCollectableParent(parent, isVisualMode);
        }
      } catch (error) {
        sd.log(error);
      }
      return false;
    },
    // 监听单页面 url 变化
    listenUrlChange: function(callback) {
      callback();
      sd.ee.spa.on('switch', function() {
        callback();
      });
    },
    initScrollmap: function() {
      if (!isObject(sd.para.heatmap) || sd.para.heatmap.scroll_notice_map !== 'default') {
        return false;
      }
      // 当前页面是否可采集
      var isPageCollect = true;
      if (sd.para.scrollmap && isFunction(sd.para.scrollmap.collect_url)) {
        this.listenUrlChange(function() {
          isPageCollect = !!sd.para.scrollmap.collect_url();
        });
      }

      var interDelay = function(param) {
        var interDelay = {};
        interDelay.timeout = param.timeout || 1000;
        interDelay.func = param.func;
        interDelay.hasInit = false;
        interDelay.inter = null;
        interDelay.main = function(para, isClose) {
          this.func(para, isClose);
          this.inter = null;
        };
        interDelay.go = function(isNoDelay) {
          var para = {};
          if (!this.inter) {
            para.$viewport_position = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
            para.$viewport_position = Math.round(para.$viewport_position) || 0;
            //para.$screen_orientation = _.getScreenOrientation();
            //para.$device_pixel_ratio = (isNaN(window.devicePixelRatio) ? 1 : window.devicePixelRatio);
            if (isNoDelay) {
              interDelay.main(para, true);
            } else {
              this.inter = setTimeout(function() {
                interDelay.main(para);
              }, this.timeout);
            }
          }
        };
        return interDelay;
      };

      var delayTime = interDelay({
        timeout: 1000,
        func: function(para, isClose) {
          var offsetTop = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
          var current_time = new Date();
          var delay_time = current_time - this.current_time;
          if ((delay_time > sd.para.heatmap.scroll_delay_time && offsetTop - para.$viewport_position !== 0) || isClose) {
            para.$url = getURL();
            para.$title = document.title;
            para.$url_path = getURLPath();
            para.event_duration = Math.min(sd.para.heatmap.scroll_event_duration, parseInt(delay_time) / 1000);
            para.event_duration = para.event_duration < 0 ? 0 : para.event_duration;
            processWebStayEvent(para);
          }
          this.current_time = current_time;
        }
      });

      delayTime.current_time = new Date();

      saAddEvent(window, 'scroll', function() {
        if (!isPageCollect) {
          return false;
        }
        delayTime.go();
      });

      saAddEvent(window, 'unload', function() {
        if (!isPageCollect) {
          return false;
        }
        delayTime.go('notime');
      });
    },
    initHeatmap: function() {
      var that = this;
      // 当前页面是否可采集
      var isPageCollect = true;
      if (!isObject(sd.para.heatmap) || sd.para.heatmap.clickmap !== 'default') {
        return false;
      }

      // 验证url，function成功就行，非function认为都是全部
      if (isFunction(sd.para.heatmap.collect_url)) {
        this.listenUrlChange(function() {
          isPageCollect = !!sd.para.heatmap.collect_url();
        });
      }

      if (sd.para.heatmap.collect_elements === 'all') {
        sd.para.heatmap.collect_elements = 'all';
      } else {
        sd.para.heatmap.collect_elements = 'interact';
      }
      // 历史遗留，以后不支持
      if (sd.para.heatmap.collect_elements === 'all') {
        saAddEvent(document, 'click', function(e) {
          if (!isPageCollect) return false;
          var ev = e || window.event;
          if (!ev) {
            return false;
          }
          var target = ev.target || ev.srcElement;
          if (typeof target !== 'object') {
            return false;
          }
          if (typeof target.tagName !== 'string') {
            return false;
          }
          var tagName = target.tagName.toLowerCase();
          if (tagName === 'body' || tagName === 'html') {
            return false;
          }
          if (!target || !target.parentNode || !target.parentNode.children) {
            return false;
          }
          var parent_ele = target.parentNode.tagName.toLowerCase();
          if (parent_ele === 'a' || parent_ele === 'button') {
            that.start(ev, target.parentNode, parent_ele);
          } else {
            that.start(ev, target, tagName);
          }
        });
      } else {
        saAddEvent(document, 'click', function(e) {
          if (!isPageCollect) return false;
          var ev = e || window.event;
          if (!ev) {
            return false;
          }
          var target = ev.target || ev.srcElement;
          var theTarget = sd.heatmap.getTargetElement(target, e);
          if (theTarget) {
            that.start(ev, theTarget, theTarget.tagName.toLowerCase());
          } else if (isElement(target) && target.tagName.toLowerCase() === 'div' && isObject(sd.para.heatmap) && sd.para.heatmap.get_vtrack_config && unlimitedDiv.events.length > 0) {
            // 是否是想要的元素
            if (unlimitedDiv.isTargetEle(target)) {
              that.start(ev, target, target.tagName.toLowerCase(), {
                $lib_method: 'vtrack'
              });
            }
          }
        });
      }
    }
  };

  function getSendUrl(url, data) {
    var dataStr = sd.kit.encodeTrackData(data);
    if (url.indexOf('?') !== -1) {
      return url + '&' + dataStr;
    }
    return url + '?' + dataStr;
  }

  function getSendData(data) {
    return sd.kit.encodeTrackData(data);
  }

  var ImageSender = function(para) {
    this.callback = para.callback;
    this.img = document.createElement('img');
    this.img.width = 1;
    this.img.height = 1;
    // 如果后端没有配置 access-allow-origin 会导致请求错误
    if (sd.para.img_use_crossorigin) {
      this.img.crossOrigin = 'anonymous';
    }
    this.data = para.data;
    this.server_url = getSendUrl(para.server_url, para.data);
  };

  ImageSender.prototype.start = function() {
    var me = this;
    if (sd.para.ignore_oom) {
      this.img.onload = function() {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
      this.img.onerror = function() {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
      this.img.onabort = function() {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
    }
    this.img.src = this.server_url;
  };

  ImageSender.prototype.lastClear = function() {
    var sys = getUA();
    if (sys.ie !== undefined) {
      this.img.src = 'about:blank';
    } else {
      this.img.src = '';
    }
  };

  var AjaxSender = function(para) {
    this.callback = para.callback;
    this.server_url = para.server_url;
    this.data = getSendData(para.data);
  };

  AjaxSender.prototype.start = function() {
    var me = this;
    ajax$1({
      url: this.server_url,
      type: 'POST',
      data: this.data,
      credentials: false,
      timeout: sd.para.datasend_timeout,
      cors: true,
      success: function() {
        me.isEnd();
      },
      error: function() {
        me.isEnd();
      }
    });
  };

  var BeaconSender = function(para) {
    this.callback = para.callback;
    this.server_url = para.server_url;
    this.data = getSendData(para.data);
  };

  BeaconSender.prototype.start = function() {
    var me = this;
    if (typeof navigator === 'object' && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(this.server_url, this.data);
    }
    setTimeout(function() {
      me.isEnd();
    }, 40);
  };

  function getSendType(data) {
    var supportedSendTypes = ['image', 'ajax', 'beacon'];
    var sendType = supportedSendTypes[0];

    if (data.config && indexOf(supportedSendTypes, data.config.send_type) > -1) {
      sendType = data.config.send_type;
    } else {
      sendType = sd.para.send_type;
    }

    if (sendType === 'beacon' && isSupportBeaconSend() === false) {
      sendType = 'image';
    }

    if (sendType === 'ajax' && isSupportCors() === false) {
      sendType = 'image';
    }

    return sendType;
  }

  function getSender(data) {
    var sendType = getSendType(data);
    switch (sendType) {
      case 'image':
        return new ImageSender(data);
      case 'ajax':
        return new AjaxSender(data);
      case 'beacon':
        return new BeaconSender(data);
      default:
        return new ImageSender(data);
    }
  }

  function getRealtimeInstance(data) {
    var obj = getSender(data);
    // 代理模式，重置原方法，统一设置超时
    var start = obj.start;
    obj.start = function() {
      var me = this;
      start.apply(this, arguments);
      setTimeout(function() {
        me.isEnd(true);
      }, sd.para.callback_timeout);
    };
    obj.end = function() {
      this.callback && this.callback();
      var self = this;
      setTimeout(function() {
        self.lastClear && self.lastClear();
      }, sd.para.datasend_timeout - sd.para.callback_timeout);
    };
    obj.isEnd = function() {
      if (!this.received) {
        this.received = true;
        this.end();
      }
    };
    return obj;
  }

  function prepareServerUrl(requestData) {
    if (typeof requestData.config === 'object' && requestData.config.server_url) {
      sendCall(requestData, requestData.config.server_url, requestData.callback);
    } else if (isArray(sd.para.server_url) && sd.para.server_url.length) {
      for (var i = 0; i < sd.para.server_url.length; i++) {
        sendCall(requestData, sd.para.server_url[i]);
      }
    } else if (typeof sd.para.server_url === 'string' && sd.para.server_url !== '') {
      sendCall(requestData, sd.para.server_url, requestData.callback);
    } else {
      sd.log('当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！');
    }
  }

  function sendCall(requestData, server_url, callback) {
    var data = {
      server_url: server_url,
      data: JSON.stringify(requestData.data),
      callback: callback,
      config: requestData.config
    };
    if (isObject(sd.para.jsapp) && !sd.para.jsapp.isOnline && typeof sd.para.jsapp.setData === 'function') {
      delete data.callback;
      data = JSON.stringify(data);
      sd.para.jsapp.setData(data);
    } else {
      realtimeSend(data);
    }
  }

  function realtimeSend(data) {
    var instance = getRealtimeInstance(data);
    instance.start();
  }

  function getClassifiedUtms() {
    var utms = pageInfo.campaignParams();
    var $utms = {};
    each(utms, function(v, i, utms) {
      if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
        $utms['$' + i] = utms[i];
      } else {
        $utms[i] = utms[i];
      }
    });
    return $utms;
  }

  function sendFirstProfile(setOnceProfileFn, fullReferrer) {
    var is_set_profile = !sd.para.not_set_profile;
    if (sd.para.not_set_profile) {
      delete sd.para.not_set_profile;
    }
    if (sd.is_first_visitor && is_set_profile) {
      var eqidObj = {};

      if (sd.para.preset_properties.search_keyword_baidu && isReferralTraffic(document.referrer) && isBaiduTraffic()) {
        eqidObj['$search_keyword_id'] = getBaiduKeyword.id();
        eqidObj['$search_keyword_id_type'] = getBaiduKeyword.type();
        eqidObj['$search_keyword_id_hash'] = hashCode53(eqidObj['$search_keyword_id']);
      }

      setOnceProfileFn(
        extend({
            // 暂时隐藏，等extractor都部署上去 $first_landing_page: pageInfo.pageProp.url.slice(0, sd.para.max_referrer_string_length),
            $first_visit_time: new Date(),
            $first_referrer: getReferrer(null, fullReferrer),
            $first_browser_language: isString(navigator.language) ? navigator.language.toLowerCase() : '取值异常',
            $first_browser_charset: isString(document.charset) ? document.charset.toUpperCase() : '取值异常',
            $first_traffic_source_type: getSourceFromReferrer(),
            $first_search_keyword: getKeywordFromReferrer()
          },
          getClassifiedUtms(),
          eqidObj
        )
      );
      sd.is_first_visitor = false;
    }
  }

  function addSinglePageEvent(callback) {
    var current_url = location.href;
    var historyPushState = window.history.pushState;
    var historyReplaceState = window.history.replaceState;

    //调用方法导致的url切换
    if (isFunction(window.history.pushState)) {
      window.history.pushState = function() {
        historyPushState.apply(window.history, arguments);
        callback(current_url);
        current_url = location.href;
      };
    }

    if (isFunction(window.history.replaceState)) {
      window.history.replaceState = function() {
        historyReplaceState.apply(window.history, arguments);
        callback(current_url);
        current_url = location.href;
      };
    }

    // 前进后退导致的url切换
    var singlePageEvent;
    if (window.document.documentMode) {
      // This is IE8+, use hashchange instead
      singlePageEvent = 'hashchange';
    } else {
      singlePageEvent = historyPushState ? 'popstate' : 'hashchange';
    }

    addEvent(window, singlePageEvent, function() {
      callback(current_url);
      current_url = location.href;
    });
  }

  var spa = new EventEmitter();
  var sdk = new EventEmitter();
  var ee = {};

  /**
   * @description 单页面切换
   * switch
   */
  ee.spa = spa;

  /**
   * @description SDK 的周期事件
   * afterLoad
   * beforeInit
   * afterInit
   */
  ee.sdk = sdk;

  ee.initSystemEvent = function() {
    addSinglePageEvent(function(url) {
      spa.emit('switch', url);
    });
  };

  ee.EVENT_LIST = {
    spaSwitch: ['spa', 'switch'],
    sdkAfterInitPara: ['sdk', 'afterInitPara'],
    sdkBeforeInit: ['sdk', 'beforeInit'],
    sdkAfterInit: ['sdk', 'afterInit']
  };

  /**
   * @description  事件触发外观 eventEmitterFacade对外暴露，用来快捷监听事件
   */
  function eventEmitterFacade(event_type, callback) {
    var splitEvent = [];
    if (typeof event_type === 'string' && event_type in ee.EVENT_LIST) {
      splitEvent = ee.EVENT_LIST[event_type];
      ee[splitEvent[0]].on(splitEvent[1], callback);
    }
  }

  /*eslint no-prototype-builtins: "off"*/

  function initPara(para) {
    extend(sdPara, para || sd.para || {});

    // 默认配置
    sd.para = sdPara;

    var latestObj = {};
    if (isObject(sd.para.is_track_latest)) {
      for (var latestProp in sd.para.is_track_latest) {
        latestObj['latest_' + latestProp] = sd.para.is_track_latest[latestProp];
      }
    }
    // 预置属性
    sd.para.preset_properties = extend({}, defaultPara.preset_properties, latestObj, sd.para.preset_properties || {});

    // 合并配置
    var i;
    for (i in defaultPara) {
      if (sd.para[i] === void 0) {
        sd.para[i] = defaultPara[i];
      }
    }
    // 修复没有配置协议的问题，自动取当前页面的协议
    if (typeof sd.para.server_url === 'string') {
      sd.para.server_url = trim(sd.para.server_url);
      if (sd.para.server_url) {
        if (sd.para.server_url.slice(0, 3) === '://') {
          sd.para.server_url = location.protocol.slice(0, -1) + sd.para.server_url;
        } else if (sd.para.server_url.slice(0, 2) === '//') {
          sd.para.server_url = location.protocol + sd.para.server_url;
        } else if (sd.para.server_url.slice(0, 4) !== 'http') {
          sd.para.server_url = '';
        }
      }
    }

    if (typeof sd.para.web_url === 'string' && (sd.para.web_url.slice(0, 3) === '://' || sd.para.web_url.slice(0, 2) === '//')) {
      if (sd.para.web_url.slice(0, 3) === '://') {
        sd.para.web_url = location.protocol.slice(0, -1) + sd.para.web_url;
      } else {
        sd.para.web_url = location.protocol + sd.para.web_url;
      }
    }

    if (sd.para.send_type !== 'image' && sd.para.send_type !== 'ajax' && sd.para.send_type !== 'beacon') {
      sd.para.send_type = 'image';
    }

    //校验serverurl与location.href的协议是否一致
    debug.protocol.serverUrl();

    // 初始化打通参数
    sd.bridge && sd.bridge.initPara();

    var batch_send_default = {
      datasend_timeout: 6000,
      send_interval: 6000
    };

    if (_localStorage.isSupport() && isSupportCors() && typeof localStorage === 'object') {
      if (sd.para.batch_send === true) {
        sd.para.batch_send = extend({}, batch_send_default);
      } else if (typeof sd.para.batch_send === 'object') {
        sd.para.batch_send = extend({}, batch_send_default, sd.para.batch_send);
      }
    } else {
      sd.para.batch_send = false;
    }

    var utm_type = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    var search_type = ['www.baidu.', 'm.baidu.', 'm.sm.cn', 'so.com', 'sogou.com', 'youdao.com', 'google.', 'yahoo.com/', 'bing.com/', 'ask.com/'];
    var social_type = ['weibo.com', 'renren.com', 'kaixin001.com', 'douban.com', 'qzone.qq.com', 'zhihu.com', 'tieba.baidu.com', 'weixin.qq.com'];
    var search_keyword = {
      baidu: ['wd', 'word', 'kw', 'keyword'],
      google: 'q',
      bing: 'q',
      yahoo: 'p',
      sogou: ['query', 'keyword'],
      so: 'q',
      sm: 'q'
    };

    if (typeof sd.para.source_type === 'object') {
      sd.para.source_type.utm = isArray(sd.para.source_type.utm) ? sd.para.source_type.utm.concat(utm_type) : utm_type;
      sd.para.source_type.search = isArray(sd.para.source_type.search) ? sd.para.source_type.search.concat(search_type) : search_type;
      sd.para.source_type.social = isArray(sd.para.source_type.social) ? sd.para.source_type.social.concat(social_type) : social_type;
      sd.para.source_type.keyword = isObject(sd.para.source_type.keyword) ? extend(search_keyword, sd.para.source_type.keyword) : search_keyword;
    }
    var collect_tags_default = {
      div: false
    };
    var ignore_tags_default = ['mark', '/mark', 'strong', 'b', 'em', 'i', 'u', 'abbr', 'ins', 'del', 's', 'sup'];
    // 如果heatmap配置了，但不是标准的空对象，也就是不支持的参数，那就变成空对象
    if (sd.para.heatmap && !isObject(sd.para.heatmap)) {
      sd.para.heatmap = {};
    }
    if (isObject(sd.para.heatmap)) {
      sd.para.heatmap.clickmap = sd.para.heatmap.clickmap || 'default';
      sd.para.heatmap.scroll_notice_map = sd.para.heatmap.scroll_notice_map || 'default';
      sd.para.heatmap.scroll_delay_time = sd.para.heatmap.scroll_delay_time || 4000;
      sd.para.heatmap.scroll_event_duration = sd.para.heatmap.scroll_event_duration || 18000; // The max value of $event_duration property for $WebStay event, in seconds (5 Hours).
      sd.para.heatmap.renderRefreshTime = sd.para.heatmap.renderRefreshTime || 1000;
      sd.para.heatmap.loadTimeout = sd.para.heatmap.loadTimeout || 1000;

      if (sd.para.heatmap.get_vtrack_config !== true) {
        sd.para.heatmap.get_vtrack_config = false; //可视化获取配置开关默认关闭
      }

      var trackAttrs = isArray(sd.para.heatmap.track_attr) ?
        filter(sd.para.heatmap.track_attr, function(v) {
          return v && typeof v === 'string';
        }) :
        [];
      trackAttrs.push('data-sensors-click');
      sd.para.heatmap.track_attr = trackAttrs;

      if (isObject(sd.para.heatmap.collect_tags)) {
        if (sd.para.heatmap.collect_tags.div === true) {
          sd.para.heatmap.collect_tags.div = {
            ignore_tags: ignore_tags_default,
            max_level: 1
          };
        } else if (isObject(sd.para.heatmap.collect_tags.div)) {
          if (sd.para.heatmap.collect_tags.div.ignore_tags) {
            if (!isArray(sd.para.heatmap.collect_tags.div.ignore_tags)) {
              sd.log('ignore_tags 参数必须是数组格式');
              sd.para.heatmap.collect_tags.div.ignore_tags = ignore_tags_default;
            }
          } else {
            sd.para.heatmap.collect_tags.div.ignore_tags = ignore_tags_default;
          }
          if (sd.para.heatmap.collect_tags.div.max_level) {
            var supportedDivLevel = [1, 2, 3];
            if (indexOf(supportedDivLevel, sd.para.heatmap.collect_tags.div.max_level) === -1) {
              sd.para.heatmap.collect_tags.div.max_level = 1;
            }
          }
        } else {
          sd.para.heatmap.collect_tags.div = false;
        }
      } else {
        sd.para.heatmap.collect_tags = collect_tags_default;
      }
    }
    // 优化配置
    if (isArray(sd.para.server_url) && sd.para.server_url.length) {
      for (i = 0; i < sd.para.server_url.length; i++) {
        //eslint-disable-next-line
        if (!/sa\.gif[^\/]*$/.test(sd.para.server_url[i])) {
          //eslint-disable-next-line
          sd.para.server_url[i] = sd.para.server_url[i].replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
        }
      }
    }
    //eslint-disable-next-line
    else if (!/sa\.gif[^\/]*$/.test(sd.para.server_url) && typeof sd.para.server_url === 'string') {
      //eslint-disable-next-line
      sd.para.server_url = sd.para.server_url.replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
    }
    if (typeof sd.para.server_url === 'string') {
      sd.para.debug_mode_url = sd.para.debug_mode_url || sd.para.server_url.replace('sa.gif', 'debug');
    }
    // 是否需要非cache，等于每次请求文件
    if (sd.para.noCache === true) {
      sd.para.noCache = '?' + new Date().getTime();
    } else {
      sd.para.noCache = '';
    }

    if (sd.para.callback_timeout > sd.para.datasend_timeout) {
      sd.para.datasend_timeout = sd.para.callback_timeout;
    }

    // 设置自定义采集标签
    if (sd.para.heatmap && sd.para.heatmap.collect_tags && isObject(sd.para.heatmap.collect_tags)) {
      each(sd.para.heatmap.collect_tags, function(val, key) {
        if (key !== 'div' && val) {
          sd.heatmap.otherTags.push(key);
        }
      });
    }
    if (sd.para.heatmap && sd.para.heatmap.clickmap === 'default') {
      // 初始化无限层级标签
      sd.heatmap.initUnlimitedTags();
    }
  }

  function register(props) {
    if (check({
        properties: props
      })) {
      store.setProps(props);
    } else {
      sd.log('register输入的参数有误');
    }
  }

  function logout(isChangeId) {
    var firstId = store.getFirstId();
    if (firstId) {
      store.set('first_id', '');
      if (isChangeId === true) {
        var uuid = UUID();
        store.set('distinct_id', uuid);
      } else {
        store.set('distinct_id', firstId);
      }
    }
    // 更新 identities
    resetIdentities({
      $identity_cookie_id: store._state.identities.$identity_cookie_id
    });

    store.set('history_login_id', {
      name: '',
      value: ''
    });
  }

  function track(e, p, schemaName, identities) {
    if (check({
        event: e,
        properties: p
      })) {
      saEvent.send({
        type: 'track',
        event: e,
        properties: extend({}, identities, p),
        schema: schemaName
      });
    }
  }

  function getElementTrackProps(target, props) {
    if (target && target.tagName) {
      return heatmap.getBasicEleInfo(null, target, target.tagName, props);
    }
  }

  function getPageViewTrackProps(para) {
    para = isObject(para) ? para : {};
    var $utms = getClassifiedUtms();
    var pvInfo = {
      $referrer: getReferrer(null, true),
      $url: getURL(),
      $url_path: getURLPath(),
      $title: document.title
    };
    return extend(pvInfo, $utms, para);
  }

  var empty$1 = {
    login: function() {},
    bind: function() {},
    loginWithKey: function() {},
    unbind: function() {},
    logout: function() {},
    track: function() {},
    trackWebClick: function() {},
    trackPageView: function() {}
  };

  function UserEvent(schema, user) {
    // 不传参数
    if (arguments.length === 0) {
      this.schema = 'events';
      this.user = new User();
      return;
    }
    if (arguments.length === 2 && isString(schema) && user instanceof sd.UserSchema) {
      this.schema = schema;
      this.user = user;
      return;
    }
    sdLog('error: UserEventSchema constructor arguments error');
    return empty$1;
  }

  UserEvent.prototype.login = function(val) {
    if (isNumber(val)) {
      val = String(val);
    }
    dispatchProtocol$1('login', [val], this);
  };

  UserEvent.prototype.loginWithKey = function(name, val) {
    if (isNumber(name)) {
      name = String(name);
    }
    if (isNumber(val)) {
      val = String(val);
    }
    // 如果id不合法
    if (!check({
        loginIdKey: name
      })) {
      return false;
    }
    dispatchProtocol$1('loginWithKey', [name, val], this);
  };

  UserEvent.prototype.bind = function(name, val) {
    if (!check({
        bindKey: name,
        bindValue: val
      })) {
      return false;
    }
    dispatchProtocol$1('bind', [name, val], this);
  };

  UserEvent.prototype.unbind = function(name, val) {
    dispatchProtocol$1('unbind', [name, val], this);
  };

  UserEvent.prototype.logout = function() {
    dispatchProtocol$1('logout', null, this);
  };

  UserEvent.prototype.track = function(e, p) {
    dispatchProtocol$1('track', [e, p], this);
  };

  UserEvent.prototype.trackWebClick = function(target, props) {
    var data = getElementTrackProps(target, props);
    this.track('$WebClick', data.props);
  };

  UserEvent.prototype.trackPageView = function(para) {
    var data = getPageViewTrackProps(para);
    this.track('$pageview', data);
    var that = this;
    sendFirstProfile(function(p) {
      that.user.setOnceProfile(p);
    });
  };

  function dispatchProtocol$1(method, args, instance) {
    var schema = instance.schema,
      userSchema = instance.user.schema;
    processCallSchema({
      className: 'UserEventSchema',
      schema: schema,
      user: {
        className: 'UserSchema',
        schema: userSchema
      },
      method: method,
      args: isArray(args) ? args : args === null ? [] : [args],
      instance: instance
    });
  }

  function handleUserEventAPICall(protocol) {
    var schema = protocol.schema;
    var args = protocol.args;
    var userEventInstance = protocol.instance;

    switch (protocol.method) {
      case 'login':
        loginKV(IDENTITY_KEY.LOGIN, args[0], schema, userEventInstance.user.getIdentities());
        break;
      case 'loginWithKey':
        loginKV(args[0], args[1], schema, userEventInstance.user.getIdentities());
        break;
      case 'bind':
        bindKV(args[0], args[1], schema, userEventInstance.user.getIdentities());
        break;
      case 'unbind':
        var identities = deleteBindIDData(args[0], args[1]);
        unbindKV(schema, identities);
        break;
      case 'logout':
        logout(args[0]);
        break;
      case 'track':
        track(args[0], args[1], schema, {
          identities: userEventInstance.user.getIdentities(),
          distinct_id: store.getDistinctId()
        });
        break;
    }
  }

  function loginKV(name, value, schema, identities) {
    loginBody({
        name: name,
        id: value,
        callback: null
      },
      function sendSignup(id, e) {
        store.set('distinct_id', id);
        saEvent.send({
          original_id: store.getFirstId() || store.getDistinctId(),
          type: 'track_signup',
          event: e,
          properties: {
            identities: identities,
            distinct_id: store.getDistinctId()
          },
          schema: schema
        });
      }
    );
  }

  function bindKV(name, value, schema, identities) {
    store._state.identities[name] = value;
    store.save();
    saEvent.send({
      type: 'track_id_bind',
      event: '$BindID',
      properties: {
        identities: identities,
        distinct_id: store.getDistinctId()
      },
      schema: schema
    });
  }

  function unbindKV(schema, identities) {
    saEvent.send({
      type: 'track_id_unbind',
      event: '$UnbindID',
      properties: {
        identities: identities,
        distinct_id: store.getDistinctId()
      },
      schema: schema
    });
  }

  function sendItem(id, type, schema, p) {
    var prop = {
      type: type,
      schema: schema,
      id: id,
      properties: p
    };
    saEvent.sendItem(prop);
  }

  function checkItem(id, p) {
    var rule = {
      item_id: id
    };
    if (p) {
      rule.properties = p;
    }
    return check(rule);
  }

  var empty$2 = {
    setItem: function() {},
    deleteItem: function() {}
  };

  function Item(schema, id) {
    if (!schema || !id) {
      sdLog('error: item schema name and item id are required');
      return empty$2;
    }

    if (!isString(schema) || !isString(id)) {
      sdLog('error: item schema name and item id should be string');
      return empty$2;
    }

    this.schema = schema;
    this.id = id;
  }

  Item.prototype.setItem = function(p) {
    if (checkItem(this.id, p)) {
      dispatchProtocol$2(this.schema, this.id, 'setItem', p);
    }
  };

  Item.prototype.deleteItem = function() {
    if (checkItem(this.id)) {
      dispatchProtocol$2(this.schema, this.id, 'deleteItem', null);
    }
  };

  function dispatchProtocol$2(schema, id, method, p) {
    processCallSchema({
      className: 'ItemSchema',
      schema: schema,
      id: id,
      method: method,
      args: p ? [p] : null
    });
  }

  function handleItemAPICall(protocol) {
    var schema = protocol.schema;
    var id = protocol.id;
    switch (protocol.method) {
      case 'setItem':
        sendItem(id, 'item_set', schema, protocol.args[0]);
        break;
      case 'deleteItem':
        sendItem(id, 'item_delete', schema);
        break;
    }
  }

  var empty$3 = {
    track: function() {},
    trackWebClick: function() {},
    trackPageView: function() {}
  };

  function ItemEvent(schema, item, itemIDField) {
    if (!schema || !item) {
      sdLog('error: schema and item instance are required');
      return empty$3;
    }
    if (!isString(schema)) {
      sdLog('error: schema must be string');
      return empty$3;
    }
    if (!isString(itemIDField)) {
      sdLog('error: itemIDField must be string');
      return empty$3;
    }
    if (!(item instanceof sd.ItemSchema) && !(item instanceof sd.UserItemSchema)) {
      sdLog('error: wrong item instance.');
      return empty$3;
    }

    this.schema = schema;
    this.itemIDField = itemIDField;
    this.item = item;
  }

  ItemEvent.prototype.track = function(e, p) {
    if (!isObject(p)) {
      p = {};
    }
    var idKv = {};
    idKv[this.itemIDField] = this.item.id;
    dispatchProtocol$3('track', [e, p], this);
  };

  ItemEvent.prototype.trackWebClick = function(target, props) {
    var data = getElementTrackProps(target, props);
    this.track('$WebClick', data.props);
  };

  ItemEvent.prototype.trackPageView = function(para) {
    var props = getPageViewTrackProps(para);
    this.track('$pageview', props);
  };

  function dispatchProtocol$3(method, args, itemEvent) {
    processCallSchema({
      className: 'ItemEventSchema',
      schema: itemEvent.schema,
      itemIDField: itemEvent.itemIDField,
      item: {
        className: 'ItemSchema',
        schema: itemEvent.item.schema,
        id: itemEvent.item.id
      },
      method: method,
      args: isArray(args) ? args : [args]
    });
  }

  function handleItemEventAPICall(protocol) {
    switch (protocol.method) {
      case 'track':
        var itemIdObj = {};
        itemIdObj[protocol.itemIDField] = protocol.item.id;
        track(protocol.args[0], protocol.args[1], protocol.schema, itemIdObj);
        break;
    }
  }

  function User$1() {
    return empty;
  }

  function UserEvent$1() {
    return empty$1;
  }

  function UserItem() {
    return empty$2;
  }

  function Item$1() {
    return empty$2;
  }

  function ItemEvent$1() {
    return empty$3;
  }

  logger.setup(sdLog);
  var _ = extend({}, W, business);

  var sendStageImpl = {
    stage: null,
    init: function(stage) {
      this.stage = stage;
    },
    interceptor: {
      send: {
        entry: function(data, context) {
          var sd = context.sensors;
          var callback = data.callback;

          if (!sd.para.app_js_bridge) {
            debug.apph5({
              data: data.data,
              step: '1',
              output: 'code'
            });
            prepareServerUrl(data);
            return data;
          }

          if (!sd.para.app_js_bridge.is_mui) {
            if (sd.para.app_js_bridge.is_send === true) {
              debug.apph5({
                data: data.data,
                step: '2',
                output: 'all'
              });
              prepareServerUrl(data);
              return data;
            }
            sd._.isFunction(callback) && callback();
            return data;
          }

          if (sd.para.app_js_bridge.is_mui) {
            if (window.plus && window.plus.SDAnalytics && window.plus.SDAnalytics.trackH5Event) {
              window.plus.SDAnalytics.trackH5Event(data);
              sd._.isFunction(callback) && callback();
              return data;
            }

            if (sd.para.app_js_bridge.is_send === true) {
              prepareServerUrl(data);
              return data;
            }

            sd._.isFunction(callback) && callback();
            return data;
          }
        }
      }
    }
  };

  function processBeforeSend(requestData) {
    sendStageImpl.stage && sendStageImpl.stage.process('beforeSend', requestData);
  }

  var dataStoragePrefix = 'sawebjssdk-';
  var tabStoragePrefix = 'tab-sawebjssdk-';

  function BatchSend() {
    this.sendTimeStamp = 0;
    this.timer = null;
    this.serverUrl = '';
    this.hasTabStorage = false;
  }

  BatchSend.prototype = {
    batchInterval: function() {
      if (this.serverUrl === '') this.getServerUrl();
      if (!this.hasTabStorage) {
        this.generateTabStorage();
        this.hasTabStorage = true;
      }
      var self = this;
      self.timer = setTimeout(function() {
        self.updateExpireTime();
        self.recycle();
        self.send();
        clearTimeout(self.timer);
        self.batchInterval();
      }, sd.para.batch_send.send_interval);
    },

    getServerUrl: function() {
      if ((isString(sd.para.server_url) && sd.para.server_url !== '') || (isArray(sd.para.server_url) && sd.para.server_url.length)) {
        this.serverUrl = isArray(sd.para.server_url) ? sd.para.server_url[0] : sd.para.server_url;
      } else {
        return sd.log('当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！');
      }
    },

    send: function() {
      if (this.sendTimeStamp && now() - this.sendTimeStamp < sd.para.batch_send.datasend_timeout) return;
      var tabStorage = _localStorage.get(this.tabKey);
      if (tabStorage) {
        this.sendTimeStamp = now();
        tabStorage = safeJSONParse(tabStorage) || this.generateTabStorageVal();
        if (tabStorage.data.length) {
          var data = [];
          for (var i = 0; i < tabStorage.data.length; i++) {
            data.push(store.readObjectVal(tabStorage.data[i]));
          }
          this.request(data, tabStorage.data);
        }
      }
    },

    updateExpireTime: function() {
      var tabStorage = _localStorage.get(this.tabKey);
      if (tabStorage) {
        tabStorage = safeJSONParse(tabStorage) || this.generateTabStorageVal();
        tabStorage.expireTime = now() + sd.para.batch_send.send_interval * 2;
        tabStorage.serverUrl = this.serverUrl;
        _localStorage.set(this.tabKey, JSON.stringify(tabStorage));
      }
    },

    request: function(data, dataKeys) {
      var self = this;
      ajax$1({
        url: this.serverUrl,
        type: 'POST',
        data: 'data_list=' + encodeURIComponent(base64Encode(JSON.stringify(data))),
        credentials: false,
        timeout: sd.para.batch_send.datasend_timeout,
        cors: true,
        success: function() {
          self.remove(dataKeys);
          self.sendTimeStamp = 0;
        },
        error: function() {
          self.sendTimeStamp = 0;
        }
      });
    },

    remove: function(dataKeys) {
      var tabStorage = _localStorage.get(this.tabKey);
      if (tabStorage) {
        var tabStorageData = (safeJSONParse(tabStorage) || this.generateTabStorageVal()).data;
        for (var i = 0; i < dataKeys.length; i++) {
          var idx = indexOf(tabStorageData, dataKeys[i]);
          if (idx > -1) {
            tabStorageData.splice(idx, 1);
          }
          _localStorage.remove(dataKeys[i]);
        }
        _localStorage.set(this.tabKey, JSON.stringify(this.generateTabStorageVal(tabStorageData)));
      }
    },

    add: function(data) {
      var dataKey = dataStoragePrefix + String(getRandom());
      var tabStorage = _localStorage.get(this.tabKey);
      if (tabStorage === null) {
        this.tabKey = tabStoragePrefix + String(getRandom());
        tabStorage = this.generateTabStorageVal();
      } else {
        tabStorage = safeJSONParse(tabStorage) || this.generateTabStorageVal();
      }
      tabStorage.data.push(dataKey);
      tabStorage.expireTime = now() + sd.para.batch_send.send_interval * 2;
      _localStorage.set(this.tabKey, JSON.stringify(tabStorage));
      store.saveObjectVal(dataKey, data);
      if (data.type === 'track_signup' || data.event === '$pageview') {
        this.sendImmediately();
      }
    },

    generateTabStorage: function() {
      this.tabKey = tabStoragePrefix + String(getRandom());
      _localStorage.set(this.tabKey, JSON.stringify(this.generateTabStorageVal()));
    },

    generateTabStorageVal: function(data) {
      data = data || [];
      return {
        data: data,
        expireTime: now() + sd.para.batch_send.send_interval * 2,
        serverUrl: this.serverUrl
      };
    },

    sendImmediately: function() {
      this.send();
    },

    recycle: function() {
      var notSendMap = {},
        lockTimeout = 10000,
        lockPrefix = 'sajssdk-lock-get-';
      for (var i = 0; i < localStorage.length; i++) {
        var item = localStorage.key(i),
          self = this;
        if (item.indexOf(tabStoragePrefix) === 0) {
          var tabStorage = safeJSONParse(_localStorage.get(item)) || this.generateTabStorageVal();
          for (var j = 0; j < tabStorage.data.length; j++) {
            notSendMap[tabStorage.data[j]] = true;
          }
          if (now() > tabStorage.expireTime && this.serverUrl === tabStorage.serverUrl) {
            var concurrentStorage = new ConcurrentStorage(lockPrefix);
            concurrentStorage.get(item, lockTimeout, 1000, function(data) {
              if (data) {
                if (_localStorage.get(self.tabKey) === null) {
                  self.generateTabStorage();
                }
                var recycleData = safeJSONParse(data) || self.generateTabStorageVal();
                _localStorage.set(self.tabKey, JSON.stringify(self.generateTabStorageVal((safeJSONParse(_localStorage.get(self.tabKey)) || this.generateTabStorageVal()).data.concat(recycleData.data))));
              }
            });
          }
        } else if (item.indexOf(lockPrefix) === 0) {
          var lock = safeJSONParse(_localStorage.get(item)) || {
            expireTime: 0
          };
          if (now() - lock.expireTime > lockTimeout) {
            _localStorage.remove(item);
          }
        }
      }
      // 存在极低概率，数据上报成功，但散落在 localStorage 中的数据没有成功删除，此处特殊处理
      for (var n = 0; n < localStorage.length; n++) {
        var key1 = localStorage.key(n);
        if (key1.indexOf(dataStoragePrefix) === 0 && !notSendMap[key1]) {
          _localStorage.remove(key1);
        }
      }
    }
  };

  var batchSend = new BatchSend();

  /*
  数据处理和发送的流程
  数据批量发送
  */

  // 数据发送流程控制
  var sendState = {};

  sendState.getSendCall = function(data, config, callback) {
    // 点击图渲染模式不发数据
    if (sd.is_heatmap_render_mode) {
      return false;
    }

    if (sd.readyState && sd.readyState.state < 3) {
      sd.log('初始化没有完成');
      return false;
    }

    data._track_id = Number(String(getRandom()).slice(2, 5) + String(getRandom()).slice(2, 4) + String(new Date().getTime()).slice(-4));
    data._flush_time = new Date().getTime();

    var originData = data;

    data = JSON.stringify(data);
    //sd.log(originData);

    var requestData = {
      data: originData,
      config: config,
      callback: callback
    };

    events.tempAdd('send', originData);

    if (!sd.para.app_js_bridge && sd.para.batch_send && _localStorage.isSupport() && localStorage.length < 100) {
      sd.log(originData);
      batchSend.add(requestData.data);
      return false;
    }
    if (originData.type === 'item_set' || originData.type === 'item_delete') {
      prepareServerUrl(requestData);
    } else {
      // trigger beforeSend then it will trigger send -> afterSend automatically
      processBeforeSend(requestData);
    }
    sd.log(originData);
  };
  sendState.prepareServerUrl = prepareServerUrl;
  sendState.sendCall = sendCall;
  sendState.realtimeSend = realtimeSend;

  //vapph5自定义属性功能
  var vapph5CustomProp = {
    events: [],
    getAssignConfigs: vtrackBase.getAssignConfigs,
    filterConfig: vtrackBase.filterConfig,
    getProp: vtrackBase.getProp,
    initUrl: vtrackBase.initUrl,
    updateEvents: function(events) {
      if (!isArray(events)) {
        return;
      }
      // console.log('vapph5prop filter result:',configs);
      this.events = events;
    },
    init: function() {
      this.initAppGetPropsBridge();
    },
    //获取打通可视化属性
    geth5Props: function(data) {
      var props = {};
      var name_arr = [];
      var that = this;
      if (!this.events.length) {
        return {};
      }
      if (data.event === '$WebClick') {
        //获取到匹配当前webclick的配置
        var events = this.filterConfig(data, this.events);
        // console.log('filter config match event:',events);
        if (!events.length) {
          return {};
        } else {
          each(events, function(event) {
            if (!isObject(event)) {
              return;
            }
            if (isArray(event.properties) && event.properties.length > 0) {
              each(event.properties, function(propConf) {
                if (!isObject(propConf)) {
                  return;
                }
                //判断属性元素宿主
                if (propConf.h5 === false) {
                  //App属性元素，把配置给到 App，App 会把这个字段删除
                  if (!isArray(props.sensorsdata_app_visual_properties)) {
                    props.sensorsdata_app_visual_properties = [];
                  }
                  props.sensorsdata_app_visual_properties.push(propConf);
                } else {
                  //h5属性元素
                  var prop = that.getProp(propConf, data);
                  // console.log('webclick get prop' + JSON.stringify(propConf) + ';value:' + JSON.stringify(prop));
                  if (isObject(prop)) {
                    props = extend(props, prop);
                  }
                }
              });
            }
            if (isString(event.event_name)) {
              name_arr.push(event.event_name);
            }
          });

          //可视化模式命中了属性配置，需要把所有可视化事件名称给到 App，App 拿去做埋点校验，App 会把这个字段删除
          if (sd.bridge.hasVisualModeBridge()) {
            props.sensorsdata_web_visual_eventName = name_arr;
          }
        }
      }
      if (props.sensorsdata_app_visual_properties) {
        props.sensorsdata_app_visual_properties = base64Encode(JSON.stringify(props.sensorsdata_app_visual_properties));
      }

      return props;
    },

    //init bridge support app get visual properties of h5
    //this is for app element click bind h5 element content
    initAppGetPropsBridge: function() {
      var that = this;
      var bridgeCall = new sd.SDKJSBridge('getJSVisualProperties');

      bridgeCall.onAppNotify(function(data) {
        // console.log('app-call-js getJSVisualProperties:' + data);
        var props = {};
        try {
          data = JSON.parse(base64Decode(data));
        } catch (error) {
          sd.log('getJSVisualProperties data parse error!');
        }
        if (isObject(data)) {
          // console.log('getJSVisualProperties data parse result',data);
          var confs = data.sensorsdata_js_visual_properties;
          var url_info = that.initUrl();
          if (url_info) {
            url_info = url_info.page_url;
            if (isArray(confs) && confs.length > 0) {
              each(confs, function(propConf) {
                if (!isObject(propConf)) {
                  return;
                }
                if (propConf.url_host === url_info.host && propConf.url_path === url_info.pathname) {
                  if (propConf.h5) {
                    var prop = that.getProp(propConf);
                    // console.log('app propConf:' + JSON.stringify(propConf) + ';propvalue:' + JSON.stringify(prop));
                    if (isObject(prop)) {
                      props = extend(props, prop);
                    }
                  }
                }
              });
            }
          }
        }
        var platform = sd.bridge.bridge_info.platform;
        // console.log('bridge platform',platform);
        if (platform === 'android') {
          //android不支持直接return,需要单独发
          bridgeCall.notifyApp({
            data: props
          }, data.message_id);
        }
        //ios直接return
        return props;
      });

      return bridgeCall;
    }
  };

  //vapph5 可视化
  var vapph5collect = {
    events: [],
    customProp: vapph5CustomProp,
    getAssignConfigs: vtrackBase.getAssignConfigs,
    initUrl: vtrackBase.initUrl,
    /**
     * 初始化
     * 1、获取可视化配置
     * 2、初始化更新配置接口
     * 3、初始化自定义属性功能
     */
    init: function() {
      // console.log('vapph5collect init');
      //检查location.href、server_url是否合法
      if (!this.initUrl()) {
        return;
      }
      var result = this.getConfigFromApp();
      if (result) {
        this.updateConfigs(result);
      }
      //初始化vapph5属性功能
      this.customProp.init();
      this.initAppUpdateConfigBridge();
    },
    //init bridge support app update visual config
    initAppUpdateConfigBridge: function() {
      var _this = this;
      return new sd.SDKJSBridge('updateH5VisualConfig').onAppNotify(function(data) {
        // console.log('app-call-js update' + JSON.stringify(data));
        if (data) {
          try {
            data = JSON.parse(base64Decode(data));
          } catch (error) {
            sd.log('updateH5VisualConfig result parse error！');
            return;
          }
          _this.updateConfigs(data);
        }
      });
    },
    /**
     * get config from App
     * return undefined / events[]
     */
    getConfigFromApp: function() {
      var result = new sd.SDKJSBridge('sensorsdata_get_app_visual_config').notifyApp();
      if (result) {
        try {
          result = JSON.parse(base64Decode(result));
        } catch (error) {
          result = null;
          sd.log('getAppVisualConfig result parse error！');
        }
      }
      return result;
    },
    //更新配置
    updateConfigs: function(config) {
      this.events = this.filterConfigs(config);
      // console.log('vapph5define updateConfig',this.events);
      this.customProp.updateEvents(this.events);
    },
    //筛选出当前页面的events return[]
    filterConfigs: function(config) {
      return this.getAssignConfigs(function(event) {
        if (isObject(event) && event.h5 !== false) {
          return true;
        } else {
          return false;
        }
      }, config);
    }
  };

  var kit = {};

  kit.buildData = function(p) {
    var identities = {};
    if (isObject(p) && isObject(p.identities) && !isEmptyObject(p.identities)) {
      extend(identities, p.identities);
    } else {
      extend(identities, store._state.identities);
    }

    var data = {
      identities: identities,
      distinct_id: store.getDistinctId(),
      lib: {
        $lib: 'js',
        $lib_method: 'code',
        $lib_version: String(sd.lib_version)
      },
      properties: {}
    };

    // 如果传了lib_detail
    if (isObject(p) && isObject(p.properties) && !isEmptyObject(p.properties)) {
      if (p.properties.$lib_detail) {
        data.lib.$lib_detail = p.properties.$lib_detail;
        delete p.properties.$lib_detail;
      }
      if (p.properties.$lib_method) {
        data.lib.$lib_method = p.properties.$lib_method;
        delete p.properties.$lib_method;
      }
    }

    extend2Lev(data, store.getUnionId(), p);

    // trigger process [formatData]
    processAddCustomProps(data);

    // 合并properties里的属性
    if (isObject(p.properties) && !isEmptyObject(p.properties)) {
      extend(data.properties, p.properties);
    }

    // profile时不传公用属性
    if (!p.type || p.type.slice(0, 7) !== 'profile') {
      // 传入的属性 > 当前页面的属性 > session的属性 > cookie的属性 > 预定义属性

      data.properties = extend({}, pageInfo.properties(), store.getProps(), store.getSessionProps(), pageInfo.currentProps, data.properties);
      if (sd.para.preset_properties.latest_referrer && !isString(data.properties.$latest_referrer)) {
        data.properties.$latest_referrer = '取值异常';
      }
      if (sd.para.preset_properties.latest_search_keyword && !isString(data.properties.$latest_search_keyword)) {
        if (!sd.para.preset_properties.search_keyword_baidu || !isString(data.properties.$search_keyword_id) || !isNumber(data.properties.$search_keyword_id_hash) || !isString(data.properties.$search_keyword_id_type)) {
          data.properties.$latest_search_keyword = '取值异常';
        }
      }
      if (sd.para.preset_properties.latest_traffic_source_type && !isString(data.properties.$latest_traffic_source_type)) {
        data.properties.$latest_traffic_source_type = '取值异常';
      }
      if (sd.para.preset_properties.latest_landing_page && !isString(data.properties.$latest_landing_page)) {
        data.properties.$latest_landing_page = '取值异常';
      }
      if (sd.para.preset_properties.latest_wx_ad_click_id === 'not_collect') {
        delete data.properties._latest_wx_ad_click_id;
        delete data.properties._latest_wx_ad_hash_key;
        delete data.properties._latest_wx_ad_callbacks;
      } else if (sd.para.preset_properties.latest_wx_ad_click_id && !isString(data.properties._latest_wx_ad_click_id)) {
        data.properties._latest_wx_ad_click_id = '取值异常';
        data.properties._latest_wx_ad_hash_key = '取值异常';
        data.properties._latest_wx_ad_callbacks = '取值异常';
      }
      if (isString(data.properties._latest_wx_ad_click_id)) {
        data.properties.$url = getURL();
      }
    }

    // 如果$time是传入的就用，否则使用服务端时间
    if (data.properties.$time && isDate(data.properties.$time)) {
      data.time = data.properties.$time * 1;
      delete data.properties.$time;
    } else {
      data.time = new Date() * 1;
    }

    //添加可视化属性
    (function addVtrackProps(data) {
      //打通需要添加h5可视化属性
      if (sd.bridge && sd.bridge.bridge_info.verify_success === 'success') {
        var h5_props = vapph5collect.customProp.geth5Props(JSON.parse(JSON.stringify(data)));
        if (isObject(h5_props) && !isEmptyObject(h5_props)) {
          data.properties = extend(data.properties, h5_props);
        }
      }
      //获取可视化自定义属性，可视化自定义属性优先级最高
      var props = vtrackcollect.customProp.getVtrackProps(JSON.parse(JSON.stringify(data)));
      if (isObject(props) && !isEmptyObject(props)) {
        data.properties = extend(data.properties, props);
      }
    })(data);

    // Parse super properties that added by registerPage()
    parseSuperProperties(data);

    //判断是否要给数据增加新用户属性
    saNewUser.checkIsAddSign(data);
    saNewUser.checkIsFirstTime(data);

    addReferrerHost(data);
    addPropsHook(data);

    // trigger process [formatData]
    processFormatData(data);
    return data;
  };

  kit.sendData = function(data, callback) {
    //去掉data里的$option
    var data_config = searchConfigData(data.properties);
    if (sd.para.debug_mode === true) {
      sd.log(data);
      saEvent.debugPath(JSON.stringify(data), callback);
    } else {
      sendState.getSendCall(data, data_config, callback);
    }
  };

  kit.encodeTrackData = function(data) {
    var dataStr = base64Encode(data);
    var crc = 'crc=' + hashCode(dataStr);
    return 'data=' + encodeURIComponent(dataStr) + '&ext=' + encodeURIComponent(crc);
  };

  kit.getUtmData = function() {
    return processGetUtmData();
  };

  function CoreFeature(sd) {
    sd.kit = kit;
    sd.saEvent = saEvent;
    // assign xxStage for registerFeature to find the xxStage implementation
    this.dataStage = dataStageImpl;
    this.sendStage = sendStageImpl;
    this.businessStage = businessStageImpl;
  }

  function HeatCollectFeature(sd) {
    sd.heatmap = heatmap;
    // assign xxStage for registerFeature to find the xxStage implementation
    this.viewStage = viewStageImpl;
  }

  /**
   * 过滤 properties 中不符合神策格式内容
   *
   * @param { JSON } p properties
   * @return { JSON }
   */
  function strip_sa_properties(p, ignores) {
    if (!isObject(p)) {
      return p;
    }
    each(p, function(v, k) {
      // 如果是数组，把值自动转换成string
      if (isArray(v)) {
        var temp = [];
        each(v, function(arrv) {
          if (isString(arrv)) {
            temp.push(arrv);
          } else {
            sdLog('您的数据-', k, v, '的数组里的值必须是字符串,已经将其删除');
          }
        });
        p[k] = temp;
      }
      // 只能是字符串，数字，日期,布尔，数组
      if (!(isString(v) || isNumber(v) || isDate(v) || isBoolean(v) || isArray(v) || isFunction(v) || k === '$option') && indexOf(ignores || [], k) === -1) {
        sdLog('您的数据-', k, v, '-格式不满足要求，我们已经将其删除');
        delete p[k];
      }
    });
    return p;
  }
  /**
   * 根据最大长度截取字符串
   *
   * @param {*} str
   * @param {*} maxLen
   * @return {*}
   */
  function formatString(str, maxLen) {
    if (isNumber(maxLen) && str.length > maxLen) {
      sdLog('字符串长度超过限制，已经做截取--' + str);
      return str.slice(0, maxLen);
    } else {
      return str;
    }
  }
  /**
   * 过滤掉事件的属性名为保留字段的属性
   *
   * @param { JOSN } obj  properties
   * @return { JOSN }
   */
  function filterReservedProperties(obj, ignore) {
    var reservedFields = ['distinct_id', 'user_id', 'id', 'date', 'datetime', 'event', 'events', 'first_id', 'original_id', 'device_id', 'properties', 'second_id', 'time', 'users'];
    if (!isObject(obj)) {
      return;
    }
    each(reservedFields, function(key, index) {
      if (!(key in obj)) {
        return;
      }

      if (indexOf(ignore || [], key) > -1) {
        return;
      }
      if (index < 3) {
        delete obj[key];
        sdLog('您的属性- ' + key + '是保留字段，我们已经将其删除');
      } else {
        sdLog('您的属性- ' + key + '是保留字段，请避免其作为属性名');
      }
    });
  }

  /**
   * 把字符串格式数据限制字符串长度
   *
   * @param {*} o properties
   */
  function searchObjString(o) {
    var white_list = ['$element_selector', '$element_path'];
    var infinite_list = ['sensorsdata_app_visual_properties'];
    if (isObject(o)) {
      each(o, function(a, b) {
        if (isObject(a)) {
          searchObjString(o[b]);
        } else {
          if (isString(a)) {
            if (indexOf(infinite_list, b) > -1) {
              //大小不受限制，慎用
              return;
            }
            o[b] = formatString(a, indexOf(white_list, b) > -1 ? 1024 : sdPara.max_string_length);
          }
        }
      });
    }
  }
  /**
   * 兼容灼洲app端做的$project和$token而加的代码
   *
   * @param { JSON } data
   */
  function searchZZAppStyle(data) {
    if (typeof data.properties.$project !== 'undefined') {
      data.project = data.properties.$project;
      delete data.properties.$project;
    }
    if (typeof data.properties.$token !== 'undefined') {
      data.token = data.properties.$token;
      delete data.properties.$token;
    }
  }
  /**
   * 格式化 properties
   *
   * @param {*} p properties
   */
  function formatProperties(p, ignore) {
    each(p, function(val, key) {
      var onComplete = function(status, value, rule_type) {
        if (!status && rule_type !== 'keyLength') {
          delete p[key];
        }
        return true;
      };
      indexOf(ignore || [], key) === -1 && check({
        propertyKey: key
      }, onComplete);
    });
  }

  function registerNGDataFormatter() {
    registerInterceptor('dataStage', {
      formatData: {
        entry: function(data) {
          var p = data.properties;
          if (isObject(p)) {
            // 过滤 properties 中不符合神策格式内容
            strip_sa_properties(p, ['identities']);
            // 过滤日志结构 properties 中的保留字段
            filterReservedProperties(p, ['distinct_id']);
            // 兼容灼洲app端做的$project和$token而加的代码
            searchZZAppStyle(data);
            // 格式化 properties
            formatProperties(p, ['distinct_id']);
            // 字符串长度截取
            searchObjString(p);
          } else if ('properties' in data) {
            // 在 properties 不为 JSON 时，将  data.properties 设置为 空JSON
            data.properties = {};
          }
          // 时间格式转换
          searchObjDate(data);

          // 删除 NG 不需要的字段
          if (indexOf(data.type, 'track') === 0) {
            delete data.identities;
            delete data.distinct_id;
            delete data.anonymous_id;
            delete data.login_id;
          }
          if (indexOf(data.type, 'profile') === 0) {
            delete data.anonymous_id;
            delete data.login_id;
          }

          // 添加 version 2.0 标识
          data.version = '2.0';
          return data;
        }
      }
    });
  }

  var heatCollectInterceptor = {
    webClickEvent: {
      entry: function(data, ctx) {
        ctx.sensors.config.default_event_schema.track('$WebClick', data.props);
      }
    },
    webStayEvent: {
      entry: function(data, ctx) {
        ctx.sensors.config.default_event_schema.track('$WebStay', data);
      }
    }
  };

  try {
    defaultPara.send_type = 'beacon';
    delete defaultPara.enc_cookie;
    delete defaultPara.name;
    delete defaultPara.is_debug;
    delete defaultPara.debug_mode;
    delete defaultPara.vtrack_ignore;
    delete defaultPara.auto_init;
    delete defaultPara.is_single_page;
    delete defaultPara.callback_timeout;
    // eslint-disable-next-line no-empty
  } catch (e) {}

  //检查是否是latest
  function initLatestProps() {
    var url_domain = pageInfo.pageProp.url_domain;

    // 判断最近一次，如果前向地址跟自己域名一致，且 cookie中取不到值，认为有异常
    // 最近一次站外前向地址，如果域名不一致，就register为latest

    var latestObj = {};

    if (url_domain === '') {
      url_domain = 'url解析失败';
    }

    // Baidu eqid
    var baiduKey = getKeywordFromReferrer(document.referrer, true);
    if (sdPara.preset_properties.search_keyword_baidu) {
      if (isReferralTraffic(document.referrer)) {
        if (isBaiduTraffic() && !(isObject(baiduKey) && baiduKey.active)) {
          latestObj['$search_keyword_id'] = getBaiduKeyword.id();
          latestObj['$search_keyword_id_type'] = getBaiduKeyword.type();
          latestObj['$search_keyword_id_hash'] = hashCode53(latestObj['$search_keyword_id']);
        } else {
          if (store._state && store._state.props) {
            store._state.props.$search_keyword_id && delete store._state.props.$search_keyword_id;
            store._state.props.$search_keyword_id_type && delete store._state.props.$search_keyword_id_type;
            store._state.props.$search_keyword_id_hash && delete store._state.props.$search_keyword_id_hash;
          }
        }
      }
    } else {
      if (store._state && store._state.props) {
        store._state.props.$search_keyword_id && delete store._state.props.$search_keyword_id;
        store._state.props.$search_keyword_id_type && delete store._state.props.$search_keyword_id_type;
        store._state.props.$search_keyword_id_hash && delete store._state.props.$search_keyword_id_hash;
      }
    }

    store.save();

    // 遍历 preset_properties 配置参数
    each(sdPara.preset_properties, function(value, key) {
      // 忽略不以 latest_ 开头的配置项
      if (key.indexOf('latest_') === -1) {
        return false;
      }
      // 得到 latest_ 后面的字符串
      // 例如 utm, traffic_source_type, search_keyword, referrer, referrer_host, landing_page
      key = key.slice(7);
      // 配置值为 true
      if (value) {
        if (key === 'wx_ad_click_id' && value === 'not_collect') {
          return false;
        }
        if (key !== 'utm' && url_domain === 'url解析失败') {
          if (key === 'wx_ad_click_id') {
            latestObj['_latest_wx_ad_click_id'] = 'url的domain解析失败';
            latestObj['_latest_wx_ad_hash_key'] = 'url的domain解析失败';
            latestObj['_latest_wx_ad_callbacks'] = 'url的domain解析失败';
          } else {
            latestObj['$latest_' + key] = 'url的domain解析失败';
          }
        } else if (isReferralTraffic(document.referrer)) {
          switch (key) {
            case 'traffic_source_type':
              latestObj['$latest_traffic_source_type'] = getSourceFromReferrer();
              break;
            case 'referrer':
              latestObj['$latest_referrer'] = pageInfo.pageProp.referrer;
              break;
            case 'search_keyword':
              if (getKeywordFromReferrer()) {
                latestObj['$latest_search_keyword'] = getKeywordFromReferrer();
              } else if (isObject(store._state) && isObject(store._state.props) && store._state.props.$latest_search_keyword) {
                delete store._state.props.$latest_search_keyword;
              }
              break;
            case 'landing_page':
              latestObj['$latest_landing_page'] = getURL();
              break;
            case 'wx_ad_click_id':
              var adObj = getWxAdIdFromUrl(location.href);
              latestObj['_latest_wx_ad_click_id'] = adObj.click_id;
              latestObj['_latest_wx_ad_hash_key'] = adObj.hash_key;
              latestObj['_latest_wx_ad_callbacks'] = adObj.callbacks;
              break;
          }
        }
      } else {
        // 如果当前配置是 latest_utm，遍历store._state.props 删除 $latest_utm 和 _latest_ 开头的属性
        if (key === 'utm' && store._state && store._state.props) {
          for (var key1 in store._state.props) {
            if (key1.indexOf('$latest_utm') === 0 || (key1.indexOf('_latest_') === 0 && key1.indexOf('_latest_wx_ad_') < 0)) {
              delete store._state.props[key1];
            }
          }
          // 如果是非 latest_utm 配置项，从 store._state.props 中删掉此属性
        } else if (store._state && store._state.props && '$latest_' + key in store._state.props) {
          delete store._state.props['$latest_' + key];
          //如果配置了 latest_wx_ad_click_id:false 则删除 wx_ad 相关属性
        } else if (key == 'wx_ad_click_id' && store._state && store._state.props && value === false) {
          var wxPro = ['_latest_wx_ad_click_id', '_latest_wx_ad_hash_key', '_latest_wx_ad_callbacks'];
          each(wxPro, function(value) {
            if (value in store._state.props) {
              delete store._state.props[value];
            }
          });
        }
      }
    });

    // utm
    if (sdPara.preset_properties.latest_utm) {
      var allUtms = pageInfo.campaignParamsStandard('$latest_', '_latest_');
      var $utms = allUtms.$utms;
      var otherUtms = allUtms.otherUtms;
      if (!isEmptyObject($utms)) {
        extend(latestObj, $utms);
      }
      if (!isEmptyObject(otherUtms)) {
        extend(latestObj, otherUtms);
      }
    }
    register(latestObj);
  }

  function listenSinglePage(trackFn) {
    if (sd.para.is_track_single_page) {
      spa.on('switch', function(last_url) {
        var sendData = function(extraData) {
          extraData = extraData || {};
          if (last_url !== location.href) {
            pageInfo.pageProp.referrer = getURL(last_url);
            var data = extend({
              $url: getURL(),
              $referrer: getURL(last_url)
            }, extraData);
            isFunction(trackFn) ? trackFn(data) : sd.quick && sd.quick('autoTrack', data);
          }
        };
        if (typeof sd.para.is_track_single_page === 'boolean') {
          sendData();
        } else if (typeof sd.para.is_track_single_page === 'function') {
          var returnValue = sd.para.is_track_single_page();
          if (isObject(returnValue)) {
            sendData(returnValue);
          } else if (returnValue === true) {
            sendData();
          }
        }
      });
    }
  }

  function enterFullTrack() {
    // 发送数据
    if (sd._q && isArray(sd._q) && sd._q.length > 0) {
      each(sd._q, function(content) {
        sd[content[0]].apply(sd, Array.prototype.slice.call(content[1]));
      });
    }

    //进入热力图采集模式
    if (isObject(sd.para.heatmap)) {
      heatmap.initHeatmap();
      heatmap.initScrollmap();
    }
  }

  function trackModeOnly(trackFn) {
    sd.readyState && sd.readyState.setState(3);
    // 初始化referrer等页面属性 1.6
    pageInfo.initPage();

    // 单页面切换事件监听
    listenSinglePage(trackFn);

    // 初始化distinct_id
    store.init();
    initLatestProps();

    sd.readyState && sd.readyState.setState(4);

    // 判断进入全埋点模式
    enterFullTrack();
  }

  // iOS 及以下非触控元素，不响应 document 或 body 监听的 click 事件
  function iOSWebClickPolyfill() {
    // 非 div 非触控元素 css 样式
    var iOS_other_tags_css = '';
    var default_cursor_css = ' { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }';
    if (sd.heatmap && isArray(sd.heatmap.otherTags)) {
      // 循环非 div tags
      each(sd.heatmap.otherTags, function(val) {
        iOS_other_tags_css += val + default_cursor_css;
      });
    }
    // iOS Safari
    if (isIOS() && getIOSVersion() && getIOSVersion() < 13) {
      // div 及 元素属性包含 data-sensors-click 添加 css
      if (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div) {
        setCssStyle('div, [data-sensors-click]' + default_cursor_css);
      }
      // 自定义元素属性添加 css
      if (sd.para.heatmap && sd.para.heatmap.track_attr) {
        setCssStyle('[' + sd.para.heatmap.track_attr.join('], [') + ']' + default_cursor_css);
      }
      // 非 div 且非触控元素添加 css
      if (iOS_other_tags_css !== '') {
        setCssStyle(iOS_other_tags_css);
      }
    }
  }

  function UserItem$1(item, user) {
    if (!item) {
      sdLog('item schema instance are required');
      return empty$2;
    }

    if (!user) {
      user = new sd.UserSchema();
    }

    if (!(user instanceof sd.UserSchema)) {
      sdLog('error: wrong user instance');
      return empty$2;
    }

    if (!(item instanceof sd.ItemSchema) && !(item instanceof sd.UserItemSchema)) {
      sdLog('error:wrong item instance');
      return empty$2;
    }

    this.item = item;
    this.user = user;
  }

  UserItem$1.prototype.setItem = function(p) {
    if (checkItem(this.item.id, p)) {
      dispatchProtocol$4('setItem', p, this);
    }
  };

  UserItem$1.prototype.deleteItem = function() {
    if (checkItem(this.item.id)) {
      dispatchProtocol$4('deleteItem', null, this);
    }
  };

  function dispatchProtocol$4(method, p, userItemInstance) {
    processCallSchema({
      className: 'UserItemSchema',
      item: {
        className: 'ItemSchema',
        schema: userItemInstance.item.schema,
        id: userItemInstance.item.id
      },
      user: {
        className: 'UserSchema',
        schema: userItemInstance.user.schema
      },
      method: method,
      args: p ? [p] : null,
      instance: userItemInstance
    });
  }

  function handleUserItemAPICall(protocol) {
    var itemInstance = protocol.instance;

    switch (protocol.method) {
      case 'setItem':
        var props = extend(getIds(itemInstance), protocol.args[0]);
        sendItem(protocol.item.id, 'item_set', protocol.item.schema, props);
        break;
      case 'deleteItem':
        sendItem(protocol.item.id, 'item_delete', protocol.item.schema, getIds(itemInstance));
        break;
    }
  }

  function getIds(uItem) {
    return {
      identities: uItem.user.getIdentities(),
      distinct_id: store.getDistinctId()
    };
  }

  var isInit = false;

  function init(para) {
    if (isInit) {
      return;
    }
    isInit = true;

    sd.UserSchema = User;
    sd.UserEventSchema = UserEvent;
    sd.UserItemSchema = UserItem$1;
    sd.ItemSchema = Item;
    sd.ItemEventSchema = ItemEvent;

    sd.disableSDK = disableSDK;
    sd.enableSDK = enableSDK;
    sd.register = ngRegister;

    ee.sdk.emit('beforeInit');
    ee.initSystemEvent();
    initPara(para);
    sd.config = sd.para;

    if (!(sd.config.default_event_schema instanceof sd.UserEventSchema) && !(sd.config.default_event_schema instanceof sd.ItemEventSchema)) {
      sd.config.default_event_schema = new sd.UserEventSchema();
    }

    ee.sdk.emit('afterInitPara');

    // 支持localstorage且开启了batch_send
    if (sd.para.batch_send && _localStorage.isSupport()) {
      batchSend.batchInterval();
    }
    trackModeOnly(function(data) {
      sd.config.default_event_schema.trackPageView(data);
    });
    iOSWebClickPolyfill();
    ee.sdk.emit('afterInit');
  }

  var sd$1;
  var utm = {
    init: function(sa) {
      if (!sa || sd$1) {
        return;
      }
      sd$1 = sa;
      sd$1.on &&
        sd$1.on('sdkAfterInitPara', function() {
          sd$1.registerInterceptor('businessStage', {
            getUtmData: {
              priority: 0,
              entry: function() {
                return getUtm();
              }
            }
          });
        });

      function getUtm() {
        var campaign_keywords = source_channel_standard.split(' '),
          kw = '',
          params = {};
        if (sd$1._.isArray(sd$1.para.source_channel) && sd$1.para.source_channel.length > 0) {
          campaign_keywords = campaign_keywords.concat(sd$1.para.source_channel);
          campaign_keywords = sd$1._.unique(campaign_keywords);
        }
        sd$1._.each(campaign_keywords, function(kwkey) {
          kw = sd$1._.getQueryParam(location.href, kwkey);
          if (kw.length) {
            params[kwkey] = kw;
          }
        });
        return params;
      }
    }
  };

  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.Utm = window.SensorsDataWebJSSDKPlugin.Utm || utm;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      Utm: utm
    };
  }

  var schemaWebInterceptor = {
    callSchema: {
      entry: schemaHandlers
    }
  };

  function schemaHandlers(protocol) {
    switch (protocol.className) {
      case 'UserSchema':
        handleUserAPICall(protocol);
        break;
      case 'UserEventSchema':
        handleUserEventAPICall(protocol);
        break;
      case 'UserItemSchema':
        handleUserItemAPICall(protocol);
        break;
      case 'ItemSchema':
        handleItemAPICall(protocol);
        break;
      case 'ItemEventSchema':
        handleItemEventAPICall(protocol);
        break;
    }
  }

  function validateAppUrl(appUrl) {
    function resolveUrl(url) {
      var obj = {
        hostname: '',
        project: ''
      };
      try {
        url = _URL(url);
        obj.hostname = url.hostname;
        obj.project = url.searchParams.get('project') || 'default';
      } catch (e) {
        sd.log(e);
      }
      return obj;
    }

    var appObj = resolveUrl(appUrl);
    var H5Obj = resolveUrl(sd.para.server_url);
    if (appObj.hostname === H5Obj.hostname && appObj.project === H5Obj.project) {
      return true;
    }

    if (isArray(sd.para.app_js_bridge.white_list)) {
      for (var i = 0; i < sd.para.app_js_bridge.white_list.length; i++) {
        var urlobj = resolveUrl(sd.para.app_js_bridge.white_list[i]);
        if (urlobj.hostname === appObj.hostname && urlobj.project === appObj.project) {
          return true;
        }
      }
    }

    return false;
  }

  function getBasicProps(sd) {
    var props = {};
    var screenInfo = sd._.info.properties();
    props.$screen_height = screenInfo.$screen_height;
    props.$screen_width = screenInfo.$screen_width;
    props.$viewport_height = screenInfo.$viewport_height;
    props.$viewport_width = screenInfo.$viewport_width;
    props.$url = location.href;
    props.$title = document.title;
    return props;
  }

  function getRegisteredValue(sd, p) {
    var _ = sd._;
    var props = _.extend2Lev({}, p);
    var registeredProps = {};
    var registered = getNGRegistered();
    if (registered.length) {
      _.each(registered, function(v) {
        try {
          var curRegProps = _.isObject(v) ? v : _.isFunction(v) ? v({
            properties: props
          }) : void 0;
          _.extend(registeredProps, curRegProps);
          // eslint-disable-next-line no-empty
        } catch (e) {
          sd.log('get registered value error.');
        }
      });
    }
    return registeredProps;
  }

  function extendTrackTypeArgs(protocol, sd) {
    if (protocol.className === 'UserEventSchema' || protocol.className === 'ItemEventSchema') {
      var basicEventProps = getBasicProps(sd);
      try {
        if (protocol.method === 'track') {
          var basicProps = sd._.extend({}, basicEventProps, protocol.args[1]);
          var registeredProps = getRegisteredValue(sd, basicProps);
          protocol.args[1] = sd._.extend({}, basicProps, registeredProps);
        } else {
          protocol.args && protocol.args.push(basicEventProps);
        }
        // eslint-disable-next-line no-empty
      } catch (e) {
        sd.log('extend track value error.');
      }
    }
  }

  function createSchemaHybridInterceptor(bridgeSenderFn) {
    var interceptor = {
      callSchema: {
        priority: 0,
        entry: function(protocol, ctx) {
          protocol._hybrid_h5 = true;
          protocol.lib_version = sdkversion_placeholder;
          extendTrackTypeArgs(protocol, ctx.sensors);
          var msg = {
            callType: 'ng_schema_protocol',
            data: protocol
          };
          protocol.instance && delete protocol.instance;
          bridgeSenderFn(JSON.stringify(msg));
          // 取消后续拦截器对 schema 调用协议的处理
          ctx.cancellationToken.cancel();
        }
      }
    };

    return interceptor;
  }

  function sendMessage(msg) {
    return window.SensorsData_APP_New_H5_Bridge.sensorsdata_track(msg);
  }

  function AndroidBridgeFeature(sd) {
    sd.on &&
      sd.on('sdkAfterInitPara', function() {
        var bridge = window.SensorsData_APP_New_H5_Bridge;
        var getAppUrl = bridge && bridge.sensorsdata_get_server_url;
        var appUrl = sd._.isFunction(getAppUrl) && getAppUrl.call(bridge);
        var isNG = bridge && sd._.isFunction(bridge.isNG) && bridge.isNG();
        if (sd.para.app_js_bridge && appUrl && isNG && validateAppUrl(appUrl)) {
          sd.log('android bridge init succeed .');
          sd.registerInterceptor('businessStage', createSchemaHybridInterceptor(sendMessage));
        }
      });
  }

  function sendMessage$1(msg) {
    return window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(msg);
  }

  function IOSBridgeFeature(sd) {
    sd.on &&
      sd.on('sdkAfterInitPara', function() {
        var bridge = window.SensorsData_iOS_JS_Bridge;
        var appUrl = bridge && bridge.sensorsdata_app_server_url;
        if (sd.para.app_js_bridge && appUrl && bridge.isNG && validateAppUrl(appUrl)) {
          sd.log('iOS bridge inits succeed.');
          sd.registerInterceptor('businessStage', createSchemaHybridInterceptor(sendMessage$1));
        }
      });
  }

  sd.log = sdLog;
  sd._ = _;
  sd.registerFeature = registerFeature;
  sd.registerInterceptor = registerInterceptor;

  sd.UserSchema = User$1;
  sd.UserEventSchema = UserEvent$1;
  sd.UserItemSchema = UserItem;
  sd.ItemSchema = Item$1;
  sd.ItemEventSchema = ItemEvent$1;

  sd.on = eventEmitterFacade;
  sd.ee = ee;
  sd.init = init;
  sd.register = function() {};

  sd._t = sd._t || 1 * new Date();
  sd.lib_version = sdkversion_placeholder;
  sd.is_first_visitor = false;
  sd.source_channel_standard = source_channel_standard;

  registerNGDataFormatter();
  registerFeature(new CoreFeature(sd));
  registerFeature(new HeatCollectFeature(sd));
  registerInterceptor('viewStage', heatCollectInterceptor);
  registerInterceptor('businessStage', schemaWebInterceptor);
  registerFeature(new AndroidBridgeFeature(sd));
  registerFeature(new IOSBridgeFeature(sd));

  // 挂载 sdk 对象到 window
  var _sd = sd;
  try {
    // 默认使用 utm 插件
    utm.init(sd);

    if (_.isUndefined(window['sensorsDataAnalytic201505'])) {
      window['sensorsDataAnalytic201505'] = sd;
    } else {
      _sd = window['sensorsDataAnalytic201505'];
    }
  } catch (err) {
    sd.log(err);
  }
  var _sd$1 = _sd;

  return _sd$1;

})));