(function (global, factory) {
      if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
      } else {
        factory();
      }
}(this, (function () {
  /**
   * @fileoverview sensors analytic javascript sdk
   * @author shengyonggen@sensorsdata.cn
   * 神策数据 www.sensorsdata.cn ，长期招聘 前端SDK开发工程师 ，简历求发送到我邮箱，谢谢
   */

  var sd = {};

  /*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
  (function () {
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
      attempt(function () {
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
          isSupported = "a"[0] != "a";
        } else if (name == "json") {
          // Indicates whether both `JSON.stringify` and `JSON.parse` are
          // supported.
          isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
        } else if (name == "date-serialization") {
          // Indicates whether `Date`s can be serialized accurately by `JSON.stringify`.
          isSupported = has("json-stringify") && isExtended;
          if (isSupported) {
            var stringify = exports.stringify;
            attempt(function () {
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
            var stringify = exports.stringify, stringifySupported = typeof stringify == "function";
            if (stringifySupported) {
              // A test function object with a custom `toJSON` method.
              (value = function () {
                return 1;
              }).toJSON = value;
              attempt(function () {
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
                  stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                  // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                  stringify(null, value) === "1" &&
                  stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
              }, function () {
                stringifySupported = false;
              });
            }
            isSupported = stringifySupported;
          }
          // Test `JSON.parse`.
          if (name == "json-parse") {
            var parse = exports.parse, parseSupported;
            if (typeof parse == "function") {
              attempt(function () {
                // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                // Conforming implementations should also coerce the initial argument to
                // a string prior to parsing.
                if (parse("0") === 0 && !parse(false)) {
                  // Simple parsing test.
                  value = parse(serialized);
                  parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                  if (parseSupported) {
                    attempt(function () {
                      // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                      parseSupported = !parse('"\t"');
                    });
                    if (parseSupported) {
                      attempt(function () {
                        // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                        // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                        // certain octal literals.
                        parseSupported = parse("01") !== 1;
                      });
                    }
                    if (parseSupported) {
                      attempt(function () {
                        // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                        // points. These environments, along with FF 3.1b1 and 2,
                        // also allow trailing commas in JSON objects and arrays.
                        parseSupported = parse("1.") !== 1;
                      });
                    }
                  }
                }
              }, function () {
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
        var forOwn = function (object, callback) {
          var size = 0, Properties, dontEnums, property;

          // Tests for bugs in the current environment's `for...in` algorithm. The
          // `valueOf` property inherits the non-enumerable flag from
          // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
          (Properties = function () {
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
            forOwn = function (object, callback) {
              var isFunction = getClass.call(object) == functionClass, property, length;
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
            forOwn = function (object, callback) {
              var isFunction = getClass.call(object) == functionClass, property, isConstructor;
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
          var toPaddedString = function (width, value) {
            // The `|| 0` expression is necessary to work around a bug in
            // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
            return (leadingZeroes + (value || 0)).slice(-width);
          };

          // Internal: Serializes a date object.
          var serializeDate = function (value) {
            var getData, year, month, date, time, hours, minutes, seconds, milliseconds;
            // Define additional utility methods if the `Date` methods are buggy.
            if (!isExtended) {
              var floor = Math.floor;
              // A mapping between the months of the year and the number of days between
              // January 1st and the first of the respective month.
              var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
              // Internal: Calculates the number of days between the Unix epoch and the
              // first day of the given month.
              var getDay = function (year, month) {
                return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
              };
              getData = function (value) {
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
              getData = function (value) {
                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              };
            }
            serializeDate = function (value) {
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
            function dateToJSON (key) {
              return serializeDate(this);
            }

            // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
            var nativeStringify = exports.stringify;
            exports.stringify = function (source, filter, width) {
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
            var escapeChar = function (character) {
              var charCode = character.charCodeAt(0), escaped = Escapes[charCode];
              if (escaped) {
                return escaped;
              }
              return unicodePrefix + toPaddedString(2, charCode.toString(16));
            };
            var reEscape = /[\x00-\x1f\x22\x5c]/g;
            var quote = function (value) {
              reEscape.lastIndex = 0;
              return '"' +
                (
                  reEscape.test(value)
                    ? value.replace(reEscape, escapeChar)
                    : value
                ) +
                '"';
            };

            // Internal: Recursively serializes an object. Implements the
            // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
            var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
              var value, type, className, results, element, index, length, prefix, result;
              attempt(function () {
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
                  forOwn(properties || value, function (property) {
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
            exports.stringify = function (source, filter, width) {
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
          var abort = function () {
            Index = Source = null;
            throw SyntaxError();
          };

          // Internal: Returns the next token, or `"$"` if the parser has reached
          // the end of the source string. A token may be a string, number, `null`
          // literal, or Boolean literal.
          var lex = function () {
            var source = Source, length = source.length, value, begin, position, isSigned, charCode;
            while (Index < length) {
              charCode = source.charCodeAt(Index);
              switch (charCode) {
                case 9: case 10: case 13: case 32:
                  // Skip whitespace tokens, including tabs, carriage returns, line
                  // feeds, and space characters.
                  Index++;
                  break;
                case 123: case 125: case 91: case 93: case 58: case 44:
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
                        case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
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
                  } else if (temp == "fals" && source.charCodeAt(Index + 4 ) == 101) {
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
          var get = function (value) {
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
          var update = function (source, property, callback) {
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
          var walk = function (source, property, callback) {
            var value = source[property], length;
            if (typeof value == "object" && value) {
              // `forOwn` can't be used to traverse an array in Opera <= 8.54
              // because its `Object#hasOwnProperty` implementation returns `false`
              // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
              if (getClass.call(value) == arrayClass) {
                for (length = value.length; length--;) {
                  update(getClass, forOwn, value, length, callback);
                }
              } else {
                forOwn(value, function (property) {
                  update(value, property, callback);
                });
              }
            }
            return callback.call(source, property, value);
          };

          // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
          exports.parse = function (source, callback) {
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
      "noConflict": function () {
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
  (function (root, factory) {
    factory(root);
  })(window, function (root) {
    if (root.atob) {
      // Some browsers' implementation of atob doesn't support whitespaces
      // in the encoded string (notably, IE). This wraps the native atob
      // in a function that strips the whitespaces.
      // The original function can be retrieved in atob.original
      try {
        root.atob(' ');
      } catch (e) {
        root.atob = (function (atob) {
          var func = function (string) {
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

    root.btoa = function (string) {
      string = String(string);
      var bitmap, a, b, c,
        result = '', i = 0,
        rest = string.length % 3; // To determine the final padding

      for (; i < string.length;) {
        if ((a = string.charCodeAt(i++)) > 255
          || (b = string.charCodeAt(i++)) > 255
          || (c = string.charCodeAt(i++)) > 255) {
          return '';
        }

        bitmap = (a << 16) | (b << 8) | c;
        result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63)
          + b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
      }

      // If there's need of padding, replace the last 'A's with equal signs
      return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result;
    };

    root.atob = function (string) {
      // atob can work with strings with whitespaces, even inside the encoded part,
      // but only \t, \n, \f, \r and ' ', which can be stripped.
      string = String(string).replace(/[\t\n\f\r ]+/g, '');
      if (!b64re.test(string)) {
        return '';
      }
      // Adding the padding if missing, for semplicity
      string += '=='.slice(2 - (string.length & 3));
      var bitmap, result = '', r1, r2, i = 0;
      for (; i < string.length;) {
        bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12
          | (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

        result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255)
          : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255)
            : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
      }
      return result;
    };
  });

  (function () {
    //polyfill
    if (!String.prototype.replaceAll) {
      String.prototype.replaceAll = function (str, newStr) {
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
    setup: function (logger) {
      logFn = logger;
    },
    /**
     * 使用自定义的日志函数输出日志
     * 
     * @example
     * logger.log('hello world','1234');
     */
    log: function () {
      (logFn || (console && console.log) || function () { }).apply(null, arguments);
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
    get: function (key) {
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
    parse: function (key) {
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
    set: function (key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch(err) {
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
    remove: function (key) {
      window.localStorage.removeItem(key);
    },
    /** 检测当前浏览器是否支持 localStorage 存储
     * 
     * @returns {Boolean} 返回当前浏览器是否支持 localStorage 存储
     * @example
     * // 在支持 localStorage 的浏览器中
     * localStorage.isSupport() //=> true
     */
    isSupport: function () {
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
  var getRandomBasic = (function () {
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
    } catch (e) { }
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
  ConcurrentStorage.prototype.get = function (key, lockTimeout, checkTime, callback) {
    if (!key) throw new Error('key is must');
    lockTimeout = lockTimeout || 10000;
    checkTime = checkTime || 1000;
    callback = callback || function () {};
    var lockKey = this.lockGetPrefix + key;
    var lock = _localStorage.get(lockKey);
    var randomNum = String(getRandom());
    if (lock) {
      lock = safeJSONParse(lock) || { randomNum: 0, expireTime: 0 };
      if (lock.expireTime > now()) {
        return callback(null);
      }
    }
    _localStorage.set(lockKey, JSON.stringify({ randomNum: randomNum, expireTime: now() + lockTimeout }));
    setTimeout(function () {
      lock = safeJSONParse(_localStorage.get(lockKey)) || { randomNum: 0, expireTime: 0 };
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
  ConcurrentStorage.prototype.set = function (key, val, lockTimeout, checkTime, callback) {
    if (!key || !val) throw new Error('key and val is must');
    lockTimeout = lockTimeout || 10000;
    checkTime = checkTime || 1000;
    callback = callback || function () {};
    var lockKey = this.lockSetPrefix + key;
    var lock = _localStorage.get(lockKey);
    var randomNum = String(getRandom());
    if (lock) {
      lock = safeJSONParse(lock) || { randomNum: 0, expireTime: 0 };
      if (lock.expireTime > now()) {
        return callback({ status: 'fail', reason: 'This key is locked' });
      }
    }
    _localStorage.set(lockKey, JSON.stringify({ randomNum: randomNum, expireTime: now() + lockTimeout }));
    setTimeout(function () {
      lock = safeJSONParse(_localStorage.get(lockKey)) || { randomNum: 0, expireTime: 0 };
      if (lock.randomNum === randomNum) {
        _localStorage.set(key, val) && callback({ status: 'success' });
      } else {
        callback({ status: 'fail', reason: 'This key is locked' });
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
  EventEmitter.prototype.on = function (eventName, listener) {
    if (!eventName || !listener) {
      return false;
    }

    if (!isValidListener(listener)) {
      throw new Error('listener must be a function');
    }

    this._events[eventName] = this._events[eventName] || [];
    var listenerIsWrapped = typeof listener === 'object';

    this._events[eventName].push(
      listenerIsWrapped
        ? listener
        : {
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
  EventEmitter.prototype.prepend = function (eventName, listener) {
    if (!eventName || !listener) {
      return false;
    }

    if (!isValidListener(listener)) {
      throw new Error('listener must be a function');
    }

    this._events[eventName] = this._events[eventName] || [];
    var listenerIsWrapped = typeof listener === 'object';

    this._events[eventName].unshift(
      listenerIsWrapped
        ? listener
        : {
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
  EventEmitter.prototype.prependOnce = function (eventName, listener) {
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
  EventEmitter.prototype.once = function (eventName, listener) {
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
  EventEmitter.prototype.off = function (eventName, listener) {
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
  EventEmitter.prototype.emit = function (eventName, args) {
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
  EventEmitter.prototype.removeAllListeners = function (eventName) {
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
  EventEmitter.prototype.listeners = function (eventName) {
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
    var URLParser = function (url) {
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

    URLParser.prototype.setUrl = function (url) {
      this._parse(url);
    };

    URLParser.prototype._initValues = function () {
      for (var a in this._fields) {
        this._values[a] = '';
      }
    };

    URLParser.prototype.addQueryString = function (queryObj) {
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

    URLParser.prototype.getUrl = function () {
      var url = '';
      url += this._values.Origin;
      url += this._values.Port ? ':' + this._values.Port : '';
      url += this._values.Path;
      url += this._values.QueryString ? '?' + this._values.QueryString : '';
      url += this._values.Fragment ? '#' + this._values.Fragment : '';
      return url;
    };

    URLParser.prototype._parse = function (url) {
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
    var isURLAPIWorking = function () {
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
        result.searchParams = (function () {
          var params = getURLSearchParams(result.search);
          return {
            get: function (searchParam) {
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
      result.searchParams = (function () {
        var params = getURLSearchParams('?' + instance._values.QueryString);
        return {
          get: function (searchParam) {
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

  var UUID = (function () {
    var T = function () {
      var d = 1 * new Date(),
        i = 0;
      while (d == 1 * new Date()) {
        i++;
      }
      return d.toString(16) + i.toString(16);
    };
    var R = function () {
      return getRandom().toString(16).replace('.', '');
    };
    var UA = function () {
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

    return function () {
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

  var DomElementInfo = function (dom) {
    this.ele = dom;
  };

  var siblings = function (n, elem) {
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }

    return matched;
  };

  DomElementInfo.prototype = {
    addClass: function (para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') === -1) {
        this.ele.className = this.ele.className + (this.ele.className === '' ? '' : ' ') + para;
      }
      return this;
    },
    removeClass: function (para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        this.ele.className = classes.replace(' ' + para + ' ', ' ').slice(1, -1);
      }
      return this;
    },
    hasClass: function (para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        return true;
      } else {
        return false;
      }
    },
    attr: function (key, value) {
      if (typeof key === 'string' && isUndefined(value)) {
        return this.ele.getAttribute(key);
      }
      if (typeof key === 'string') {
        value = String(value);
        this.ele.setAttribute(key, value);
      }
      return this;
    },
    offset: function () {
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
    getSize: function () {
      if (!window.getComputedStyle) {
        return { width: this.ele.offsetWidth, height: this.ele.offsetHeight };
      }
      try {
        var bounds = this.ele.getBoundingClientRect();
        return { width: bounds.width, height: bounds.height };
      } catch (e) {
        return { width: 0, height: 0 };
      }
    },
    getStyle: function (value) {
      if (this.ele.currentStyle) {
        return this.ele.currentStyle[value];
      } else {
        return this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(value);
      }
    },
    wrap: function (elementTagName) {
      var ele = document.createElement(elementTagName);
      this.ele.parentNode.insertBefore(ele, this.ele);
      ele.appendChild(this.ele);
      return ry(ele);
    },
    getCssStyle: function (prop) {
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
    sibling: function (cur, dir) {
      //eslint-disable-next-line
      while ((cur = cur[dir]) && cur.nodeType !== 1) {}
      return cur;
    },
    next: function () {
      return this.sibling(this.ele, 'nextSibling');
    },
    prev: function () {
      return this.sibling(this.ele, 'previousSibling');
    },
    siblings: function () {
      return siblings((this.ele.parentNode || {}).firstChild, this.ele);
    },
    children: function () {
      return siblings(this.ele.firstChild);
    },
    parent: function () {
      var parent = this.ele.parentNode;
      parent = parent && parent.nodeType !== 11 ? parent : null;
      return ry(parent);
    },
    // 兼容原生不支持 previousElementSibling 的旧版浏览器
    previousElementSibling: function () {
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
    getSameTypeSiblings: function () {
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
    getParents: function () {
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
    fixEvent._getPath = function () {
      var ev = this;
      return this.path || (this.composedPath && this.composedPath()) || ry(ev.target).getParents();
    };

    fixEvent.preventDefault = function () {
      this.returnValue = false;
    };
    fixEvent.stopPropagation = function () {
      this.cancelBubble = true;
    };

    var register_event = function (element, type, handler) {
      if (useCapture === undefined && type === 'click') {
        useCapture = true;
      }
      if (element && element.addEventListener) {
        element.addEventListener(
          type,
          function (e) {
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
      var handler = function (event) {
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
    each(Array.prototype.slice.call(arguments, 1), function (source) {
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
    para = extend(
      {
        success: function () { },
        error: function () { }
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

    para.success = function (data) {
      oldsuccess(data);
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
      }
    };
    para.error = function (err) {
      olderror(err);
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
      }
    };
    errorTimer = setTimeout(function () {
      abort();
    }, para.timeout);

    // eslint-disable-next-line no-undef
    if (typeof XDomainRequest !== 'undefined' && g instanceof XDomainRequest) {
      //XDomainRequest success callback
      g.onload = function () {
        para.success && para.success(getJSON(g.responseText));
        g.onreadystatechange = null;
        g.onload = null;
        g.onerror = null;
      };
      //XDomainRequest error callback
      g.onerror = function () {
        para.error && para.error(getJSON(g.responseText), g.status);
        g.onreadystatechange = null;
        g.onerror = null;
        g.onload = null;
      };
    }
    g.onreadystatechange = function () {
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
        each(para.header, function (v, i) {
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
    each(obj, function (value, index, list) {
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
      arr = map(atob(str).split(''), function (c) {
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
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
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
      init = function (e) {
        if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
        (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true)) fn.call(win, e.type || e);
      },
      poll = function () {
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
    get: function (name) {
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
    set: function (name, value, days, cross_subdomain, cookie_samesite, is_secure, domain) {
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
    remove: function (name, cross_subdomain) {
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
    isSupport: function (testKey, testValue) {
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
    each(Array.prototype.slice.call(arguments, 1), function (source) {
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
    each(obj, function (v, k) {
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
    each(Array.prototype.slice.call(arguments, 1), function (source) {
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
    function validHostname(value) {
      if (value) {
        return value;
      } else {
        return false;
      }
    }
    var new_hostname = validHostname(hostname);
    if (!new_hostname) {
      return '';
    }
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
    obj.success = isFunction(obj.success) ? obj.success : function () { };
    obj.error = isFunction(obj.error) ? obj.error : function () { };
    obj.data = obj.data || '';
    var script = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    var timer = null;
    var isError = false; //防止失败逻辑重复触发
    head.appendChild(script);
    if (isNumber(obj.timeout)) {
      timer = setTimeout(function () {
        if (isError) {
          return false;
        }
        obj.error('timeout');
        window[obj.callbackName] = function () {
          logger.log('call jsonp error');
        };
        timer = null;
        head.removeChild(script);
        isError = true;
      }, obj.timeout);
    }
    window[obj.callbackName] = function () {
      clearTimeout(timer);
      timer = null;
      obj.success.apply(null, arguments);
      window[obj.callbackName] = function () {
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
      each(obj.data, function (value, key) {
        arr.push(key + '=' + value);
      });
      obj.data = arr.join('&');
      obj.url += '&' + obj.data;
    }
    script.onerror = function (err) {
      if (isError) {
        return false;
      }
      window[obj.callbackName] = function () {
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
      visibleHandler: isFunction(obj.visible) ? obj.visible : function () { },
      hiddenHandler: isFunction(obj.hidden) ? obj.hidden : function () { },
      visibilityChange: null,
      hidden: null,
      isSupport: function () {
        return typeof document[this.hidden] !== 'undefined';
      },
      init: function () {
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
      listen: function () {
        if (!this.isSupport()) {
          addEvent(window, 'focus', this.visibleHandler);
          addEvent(window, 'blur', this.hiddenHandler);
        } else {
          var _this = this;
          addEvent(
            document,
            this.visibilityChange,
            function () {
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
    para = extend(
      {
        success: function () { },
        error: function () { },
        appendCall: function (g) {
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
    g.onload = g.onreadystatechange = function () {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        para.success();
        g.onload = g.onreadystatechange = null;
      }
    };
    g.onerror = function () {
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
      each(o, function (a, b) {
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
    isSupport: function () {
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
    var later = function () {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
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
    each(obj, function (value) {
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
    encode: function (base64) {
      return base64.replace(/[+/=]/g, function (m) {
        return ENC[m];
      });
    },

    /**
       * 对安全再编码后的 base64 字符串进行解码， 将字符串中的  '-', '_', '.' 分别替换为 '+', '/', '='
       * @param {String} safe 再编码后的 base64 字符串
       * @return {String} 执行解码还原后的 base64 字符串
       */
    decode: function (safe) {
      return safe.replace(/[-_.]/g, function (m) {
        return DEC[m];
      });
    },

    /**
       * 去除 base64 编码后的字符串中的 '=' 和 '.'
       * @param {String} string base64  编码后的字符串
       * @return {String} 去除 base64 编码字符串中的 '=' 和 '.' 后的字符串
       */
    trim: function (string) {
      return string.replace(/[.=]{1,2}$/, '');
    },

    /**
       * 检测传入字符串是否是 base64 编码的字符串
       * @param {String} string 传入字符串
       * @return {Boolean} 是否是 base64 编码的字符串
       */
    isBase64: function (string) {
      return /^[A-Za-z0-9+/]*[=]{0,2}$/.test(string);
    },

    /**
       * 检测传入字符串是否是安全的 base64 编码的字符串
       * @param {String} string 传入字符串
       * @return {Boolean}  是否是安全 base64 编码的字符串
       */
    isUrlSafeBase64: function (string) {
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

  var debug = {
    distinct_id: function () {
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
    jssdkDebug: function () {
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
    _sendDebug: function (debugString) {
      // sd.track('_sensorsdata2019_debug', {
      //   _jssdk_debug_info: debugString
      // });
    },
    apph5: function (obj) {
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
    defineMode: function (type) {
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
      protocolIsSame: function (url1, url2) {
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
      serverUrl: function () {
        //由于个别浏览器安全限制协议不一致可能发送失败
        if (isString(sdPara.server_url) && sdPara.server_url !== '' && !this.protocolIsSame(sdPara.server_url, location.href)) {
          sdLog('SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。\n因为：1、https 下面发送 http 的图片请求会失败。2、http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。');
        }
      },
      ajax: function (url) {
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

  var source_channel_standard = 'utm_source utm_medium utm_campaign utm_content utm_term';
  var sdkversion_placeholder = '1.22.7';
  var domain_test_key = 'sensorsdata_domain_test';

  var IDENTITY_KEY = {
    EMAIL: '$identity_email',
    MOBILE: '$identity_mobile',
    LOGIN: '$identity_login_id'
  };

  /**
   * 执行属性中的函数，并且过滤掉不符合条件的属性
   *
   * @param { JSON } data
   */
  function parseSuperProperties(data) {
    var obj = data.properties;
    var copyData = JSON.parse(JSON.stringify(data));
    if (isObject(obj)) {
      each(obj, function (objVal, key) {
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
    if (typeof data === 'object' && data.$option) {
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
    each(p, function (v, k) {
      if (v != null) {
        ret[k] = v;
      }
    });
    return ret;
  }

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
    props.$element_class_name = typeof target.className === 'string' ? target.className : null;
    props.$element_target_url = target.getAttribute('href');
    props.$element_content = getElementContent$1(target, tagName);
    props = strip_empty_properties(props);
    props.$url = getURL();
    props.$url_path = getURLPath();
    props.$title = document.title;

    return props;
  }

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

  function getReferrerEqid() {
    var query = getQueryParamsFromUrl(document.referrer);
    if (isEmptyObject(query) || !query.eqid) {
      return UUID().replace(/-/g, '');
    }
    return query.eqid;
  }

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

  var getBaiduKeyword = {
    data: {},
    id: function () {
      if (this.data.id) {
        return this.data.id;
      } else {
        this.data.id = getReferrerEqid();
        return this.data.id;
      }
    },
    type: function () {
      if (this.data.type) {
        return this.data.type;
      } else {
        this.data.type = getReferrerEqidType();
        return this.data.type;
      }
    }
  };

  function isReferralTraffic(refererstring) {
    refererstring = refererstring || document.referrer;
    if (refererstring === '') {
      return true;
    }

    return getCookieTopLevelDomain(getHostname(refererstring), domain_test_key) !== getCookieTopLevelDomain(null, domain_test_key);
  }

  function getReferrer(referrer, full) {
    referrer = referrer || document.referrer;
    if (typeof referrer !== 'string') {
      return '取值异常_referrer异常_' + String(referrer);
    }
    referrer = trim(referrer);
    referrer = _decodeURI(referrer);
    if (referrer.indexOf('https://www.baidu.com/') === 0 && !full) {
      referrer = referrer.split('?')[0];
    }
    referrer = referrer.slice(0, sdPara.max_referrer_string_length);
    return typeof referrer === 'string' ? referrer : '';
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

  function getKeywordFromReferrer(referrerUrl, activeValue) {
    referrerUrl = referrerUrl || document.referrer;
    var search_keyword = sdPara.source_type.keyword;
    if (document && typeof referrerUrl === 'string') {
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
            if (typeof query === 'object') {
              temp = search_keyword[i];
              if (isArray(temp)) {
                for (i = 0; i < temp.length; i++) {
                  var _value = query[temp[i]];
                  if (_value) {
                    if (activeValue) {
                      return { active: _value };
                    } else {
                      return _value;
                    }
                  }
                }
              } else if (query[temp]) {
                if (activeValue) {
                  return { active: query[temp] };
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

  // export function isFalsy(arg) {
  //   return isUndefined(arg) || arg === '' || arg === null;
  // }

  // var check = {
  //   // 检查关键字
  //   checkKeyword: function (para) {
  //     var reg = /^((?!^distinct_id$|^original_id$|^device_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_group|^user_tag)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i;
  //     if (!isString(para) || !reg.test(para)) {
  //       return false;
  //     }
  //     return true;
  //   },

  //   // 检查 id 字符串长度
  //   checkIdLength: function (str) {
  //     var temp = String(str);
  //     if (temp.length > 255) {
  //       //sd.log('id 长度超过 255 个字符！')
  //       return false;
  //     }
  //     return true;
  //   }
  // };

  var pageInfo = {
    initPage: function () {
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

    campaignParams: function () {
      var campaign_keywords = source_channel_standard.split(' '),
        kw = '',
        params = {};
      if (isArray(sdPara.source_channel) && sdPara.source_channel.length > 0) {
        campaign_keywords = campaign_keywords.concat(sdPara.source_channel);
        campaign_keywords = unique(campaign_keywords);
      }
      each(campaign_keywords, function (kwkey) {
        kw = getQueryParam(location.href, kwkey);
        if (kw.length) {
          params[kwkey] = kw;
        }
      });

      return params;
    },
    campaignParamsStandard: function (prefix, prefix_add) {
      prefix = prefix || '';
      prefix_add = prefix_add || '';
      var utms = pageInfo.campaignParams();
      var $utms = {},
        otherUtms = {};
      each(utms, function (v, i, utms) {
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
    properties: function () {
      var viewportHeightValue = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
      var viewportWidthValue = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
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
    register: function (obj) {
      extend(pageInfo.currentProps, obj);
    }
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

  // 针对 input 默认只采集 button 和 submit 非名感的词汇。可以自定义（银联提）
  function getInputElementValue(inputEle) {
    var allowCollectInputVal = sdPara.heatmap && typeof sdPara.heatmap.collect_input === 'function' && sdPara.heatmap.collect_input(inputEle);
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

  function addEvent$1(target, eventName, evenHandler) {
    var useCapture = isObject(sdPara.heatmap) && sdPara.heatmap.useCapture ? true : false;
    if (isObject(sdPara.heatmap) && typeof sdPara.heatmap.useCapture === 'undefined' && eventName === 'click') {
      useCapture = true;
    }
    return addEvent(target, eventName, evenHandler, useCapture);
  }

  var cookie$1 = {
    get: function (name) {
      return cookie.get(name);
    },
    set: function (name, value, days, cross_subdomain) {
      var cdomain = '';
      cross_subdomain = typeof cross_subdomain === 'undefined' ? sdPara.cross_subdomain : cross_subdomain;

      if (cross_subdomain) {
        var domain = getCurrentDomain(location.href);
        if (domain === 'url解析失败') {
          domain = '';
        }
        cdomain = domain ? '; domain=' + domain : '';
      }

      return cookie.set(name, value, days, cross_subdomain, sdPara.set_cookie_samesite, sdPara.is_secure_cookie, cdomain);
    },
    remove: function (name, cross_subdomain) {
      cross_subdomain = typeof cross_subdomain === 'undefined' ? sdPara.cross_subdomain : cross_subdomain;
      return cookie.remove(name, cross_subdomain);
    },
    isSupport: function (testKey, testValue) {
      testKey = testKey || 'sajssdk_2015_cookie_access_test';
      testValue = testValue || '1';
      return cookie.isSupport(testKey, testValue);
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
  cookie$1.getNewUser = isNewUser;
  function isNewUser() {
    var prefix = 'new_user';
    if (cookie$1.isSupport()) {
      if (cookie$1.get('sensorsdata_is_new_user') !== null || cookie$1.get(getNewUserFlagKey(prefix)) !== null) {
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

    get: function (name) {
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

    set: function (name, value, days) {
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

    getNewUserFlagMemoryKey: function (name_prefix) {
      return 'sajssdk_2015_' + sdPara.sdk_id + name_prefix;
    }
  };

  // 检查是否是新用户（第一次种 cookie，且在8个小时内的）
  var saNewUser = {
    checkIsAddSign: function (data) {
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
    checkIsFirstTime: function (data) {
      if (data.type === 'track' && data.event === '$pageview') {
        if (this.is_first_visit_time) {
          data.properties.$is_first_time = true;
          this.is_first_visit_time = false;
        } else {
          data.properties.$is_first_time = false;
        }
      }
    },
    setDeviceId: function (uuid) {
      // deviceid必须跨子域
      var device_id = null;
      var ds = cookie$1.get('sensorsdata2015jssdkcross' + sd.para.sdk_id);
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
        sd.store.set('$device_id', device_id);
      } else {
        state.$device_id = device_id;
        state = JSON.stringify(state);
        if (sd.para.encrypt_cookie) {
          state = encrypt(state);
        }
        cookie$1.set('sensorsdata2015jssdkcross' + sd.para.sdk_id, state, null, true);
      }

      if (sd.para.is_track_device_id) {
        pageInfo.currentProps.$device_id = device_id;
      }
    },
    storeInitCheck: function () {
      // 如果是新用户，种 cookie
      if (sd.is_first_visitor) {
        var date = new Date();
        var obj = {
          h: 23 - date.getHours(),
          m: 59 - date.getMinutes(),
          s: 59 - date.getSeconds()
        };
        if (cookie$1.isSupport()) {
          cookie$1.set(getNewUserFlagKey('new_user'), '1', obj.h * 3600 + obj.m * 60 + obj.s + 's');
        } else {
          memory.set(memory.getNewUserFlagMemoryKey('new_user'), '1', obj.h * 3600 + obj.m * 60 + obj.s + 's');
        }
        // 如果是is_first_visit_time，且第一次，那就发数据
        this.is_first_visit_time = true;
        this.is_page_first_visited = true;
      } else {
        // 如果没有这个 cookie，肯定不是首日
        if (!isNewUser()) {
          this.checkIsAddSign = function (data) {
            if (data.type === 'track') {
              data.properties.$is_first_day = false;
            }
          };
        }
        // 如果不是第一次打开的用户，肯定不是首次访问
        this.checkIsFirstTime = function (data) {
          if (data.type === 'track' && data.event === '$pageview') {
            data.properties.$is_first_time = false;
          }
        };
      }
    },
    //检查是否是latest
    checkIsFirstLatest: function () {
      var url_domain = pageInfo.pageProp.url_domain;

      // 判断最近一次，如果前向地址跟自己域名一致，且 cookie中取不到值，认为有异常
      // 最近一次站外前向地址，如果域名不一致，就register为latest

      var latestObj = {};

      if (url_domain === '') {
        url_domain = 'url解析失败';
      }

      // Baidu eqid
      var baiduKey = getKeywordFromReferrer(document.referrer, true);
      if (sd.para.preset_properties.search_keyword_baidu) {
        if (isReferralTraffic(document.referrer)) {
          if (isBaiduTraffic() && !(isObject(baiduKey) && baiduKey.active)) {
            latestObj['$search_keyword_id'] = getBaiduKeyword.id();
            latestObj['$search_keyword_id_type'] = getBaiduKeyword.type();
            latestObj['$search_keyword_id_hash'] = hashCode53(latestObj['$search_keyword_id']);
          } else {
            if (sd.store._state && sd.store._state.props) {
              sd.store._state.props.$search_keyword_id && delete sd.store._state.props.$search_keyword_id;
              sd.store._state.props.$search_keyword_id_type && delete sd.store._state.props.$search_keyword_id_type;
              sd.store._state.props.$search_keyword_id_hash && delete sd.store._state.props.$search_keyword_id_hash;
            }
          }
        }
      } else {
        if (sd.store._state && sd.store._state.props) {
          sd.store._state.props.$search_keyword_id && delete sd.store._state.props.$search_keyword_id;
          sd.store._state.props.$search_keyword_id_type && delete sd.store._state.props.$search_keyword_id_type;
          sd.store._state.props.$search_keyword_id_hash && delete sd.store._state.props.$search_keyword_id_hash;
        }
      }

      sd.store.save();

      // 遍历 preset_properties 配置参数
      each(sd.para.preset_properties, function (value, key) {
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
              } else if (isObject(sd.store._state) && isObject(sd.store._state.props) && sd.store._state.props.$latest_search_keyword) {
                delete sd.store._state.props.$latest_search_keyword;
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
          if (key === 'utm' && sd.store._state && sd.store._state.props) {
            for (var key1 in sd.store._state.props) {
              if (key1.indexOf('$latest_utm') === 0 || (key1.indexOf('_latest_') === 0 && key1.indexOf('_latest_wx_ad_') < 0)) {
                delete sd.store._state.props[key1];
              }
            }
            // 如果是非 latest_utm 配置项，从 store._state.props 中删掉此属性
          } else if (sd.store._state && sd.store._state.props && '$latest_' + key in sd.store._state.props) {
            delete sd.store._state.props['$latest_' + key];
            //如果配置了 latest_wx_ad_click_id:false 则删除 wx_ad 相关属性
          } else if (key == 'wx_ad_click_id' && sd.store._state && sd.store._state.props && value === false) {
            var wxPro = ['_latest_wx_ad_click_id', '_latest_wx_ad_hash_key', '_latest_wx_ad_callbacks'];
            each(wxPro, function (value) {
              if (value in sd.store._state.props) {
                delete sd.store._state.props[value];
              }
            });
          }
        }
      });

      sd.register(latestObj);

      // utm
      if (sd.para.preset_properties.latest_utm) {
        var allUtms = pageInfo.campaignParamsStandard('$latest_', '_latest_');
        var $utms = allUtms.$utms;
        var otherUtms = allUtms.otherUtms;
        if (!isEmptyObject($utms)) {
          sd.register($utms);
        }
        if (!isEmptyObject(otherUtms)) {
          sd.register(otherUtms);
        }
      }
    }
  };

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
    getProps: function () {
      return this._state.props || {};
    },
    getSessionProps: function () {
      return this._sessionState;
    },
    getOriginDistinctId: function () {
      return this._state._distinct_id || this._state.distinct_id;
    },
    // id3兼容修改，获取login_id和anonymous_id必须用此方法
    getOriginUnionId: function (state) {
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
    getDistinctId: function () {
      // 兼容 id3 值域名
      var unionId = this.getUnionId();
      return unionId.login_id || unionId.anonymous_id;
    },
    getUnionId: function (state) {
      // 兼容 id3 值域名
      var obj = this.getOriginUnionId(state);
      if (obj.login_id && this._state.history_login_id && this._state.history_login_id.name && this._state.history_login_id.name !== sd.IDENTITY_KEY.LOGIN) {
        obj.login_id = this._state.history_login_id.name + '+' + obj.login_id;
      }
      return obj;
    },
    getFirstId: function () {
      return this._state._first_id || this._state.first_id;
    },
    initSessionState: function () {
      var ds = cookie$1.get('sensorsdata2015session');
      ds = decryptIfNeeded(ds);
      var state = null;
      if (ds !== null && typeof (state = safeJSONParse(ds)) === 'object') {
        this._sessionState = state || {};
      }
    },

    setOnce: function (a, b) {
      if (!(a in this._state)) {
        this.set(a, b);
      }
    },
    set: function (name, value) {
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
        sd.events.tempAdd('changeDistinctId', value);
      }
    },
    // 针对当前页面修改
    change: function (name, value) {
      // 为临时属性名增加前缀 _ (下划线)
      this._state['_' + name] = value;
    },
    setSessionProps: function (newp) {
      var props = this._sessionState;
      extend(props, newp);
      this.sessionSave(props);
    },
    setSessionPropsOnce: function (newp) {
      var props = this._sessionState;
      coverExtend(props, newp);
      this.sessionSave(props);
    },
    setProps: function (newp, isCover) {
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
    setPropsOnce: function (newp) {
      var props = this._state.props || {};
      coverExtend(props, newp);
      this.set('props', props);
    },
    clearAllProps: function (arr) {
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
    sessionSave: function (props) {
      this._sessionState = props;
      var sessionStateStr = JSON.stringify(this._sessionState);
      if (sd.para.encrypt_cookie) {
        sessionStateStr = encrypt(sessionStateStr);
      }
      cookie$1.set('sensorsdata2015session', sessionStateStr, 0);
    },
    save: function () {
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
      cookie$1.set(this.getCookieName(), stateStr, 73000, sd.para.cross_subdomain);
    },
    getCookieName: function () {
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
    init: function () {
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
            var currentLoginKey = old_login_id_name || sd.IDENTITY_KEY.LOGIN;
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
        sd.store.set('distinct_id', uuid);
        sd.store.set('identities', { $identity_cookie_id: uuid });
        sd.store.set('history_login_id', {
          name: '',
          value: ''
        });
      }
      this.initSessionState();
      var uuid = UUID();
      var cross, cookieJSON;
      // 解析加密的cookie
      if (cookie$1.isSupport()) {
        cross = cookie$1.get(this.getCookieName());
        // 解析加密的cookie
        cross = decryptIfNeeded(cross);
        cookieJSON = safeJSONParse(cross);
      }
      if (!cookie$1.isSupport() || cross === null || !isJSONString(cross) || !isObject(cookieJSON) || (isObject(cookieJSON) && !cookieJSON.distinct_id)) {
        // null肯定是首次，非null，看是否有distinct_id
        sd.is_first_visitor = true;
        cookieExistExpection(uuid);
      } else {
        // corss必须是可以JSON的且是对象
        // 兼容3.0的2.0+3.0初始化逻辑
        sd.store._state = extend(compatibleWith3(cookieJSON));
        sd.store.save();
      }
      // 如果没有跨域的cookie，且没有当前域cookie，那当前域的cookie和跨域cookie一致
      saNewUser.setDeviceId(uuid);
      //判断新用户
      saNewUser.storeInitCheck();
      saNewUser.checkIsFirstLatest();
    },
    saveObjectVal: function (name, value) {
      if (!isString(value)) {
        value = JSON.stringify(value);
      }
      if (sd.para.encrypt_cookie == true) {
        value = encrypt(value);
      }
      _localStorage.set(name, value);
    },
    readObjectVal: function (name) {
      var value = _localStorage.get(name);
      if (!value) return null;
      value = decryptIfNeeded(value);
      return safeJSONParse(value);
    }
  };

  var checkLog = {
    string: function (str) {
      sdLog(str + ' must be string');
    },
    emptyString: function (str) {
      sdLog(str + '\'s is empty');
    },
    regexTest: function (str) {
      sdLog(str + ' is invalid');
    },
    idLength: function (str) {
      sdLog(str + ' length is longer than ' + sdPara.max_id_length);
    },
    keyLength: function (str) {
      sdLog(str + ' length is longer than ' + sdPara.max_key_length);
    },
    stringLength: function (str) {
      sdLog(str + ' length is longer than ' + sdPara.max_string_length);
    },
    voidZero: function (str) {
      sdLog(str + '\'s is undefined');
    },
    reservedLoginId: function (str) {
      sdLog(str + ' is invalid');
    },
    reservedBind: function (str) {
      sdLog(str + ' is invalid');
    },
    reservedUnbind: function (str) {
      sdLog(str + ' is invalid');
    }
  };
  var ruleOption = {
    regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_tag.*|^user_group.*)[a-zA-Z_$][a-zA-Z\d_$]*)$/i,
    loginIDReservedNames: ['$identity_anonymous_id', '$identity_cookie_id'],
    bindReservedNames: ['$identity_login_id', '$identity_anonymous_id', '$identity_cookie_id'],
    unbindReservedNames: ['$identity_anonymous_id', IDENTITY_KEY.LOGIN],
    string: function (str) {
      if (!isString(str)) {
        return false;
      }
      return true;
    },
    emptyString: function (str) {
      if (!isString(str) || trim(str).length === 0) {
        return false;
      }
      return true;
    },
    regexTest: function (str) {
      if (!isString(str) || !this.regName.test(str)) {
        return false;
      }
      return true;
    },
    idLength: function (str) {
      if (!isString(str) || str.length > sdPara.max_id_length) {
        return false;
      }
      return true;
    },
    keyLength: function (str) {
      if (!isString(str) || str.length > sdPara.max_key_length) {
        return false;
      }
      return true;
    },
    stringLength: function (str) {
      if (!isString(str) || str.length > sdPara.max_string_length) {
        return false;
      }
      return true;
    },
    voidZero: function (str) {
      if (str === void 0) {
        return false;
      }
      return true;
    },
    reservedLoginId: function (str) {
      if (indexOf(this.loginIDReservedNames, str) > -1) {
        return false;
      }
      return true;
    },
    reservedUnbind: function (str) {
      if (indexOf(this.unbindReservedNames, str) > -1) {
        return false;
      }
      return true;
    },
    reservedBind: function (str) {
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
      onComplete: function (status, val, rule_type) {
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
      onComplete: function (status, val, rule_type) {
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
      onComplete: function (status, val, rule_type) {
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
      onComplete: function (status, val, rule_type) {
        if (!status) {
          val = 'Property Value';
          isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
        }
        return true;
      }
    },
    properties: function (p) {
      if (isObject(p)) {
        each(p, function (s, k) {
          // key
          check({ propertyKey: k });

          // value undefined 校验
          var onComplete = function (status, val, rule_type) {
            if (!status) {
              val = k + '\'s Value';
              isFunction(checkLog[rule_type]) && checkLog[rule_type](val);
            }
            return true;
          };
          check({ propertyValue: s }, onComplete);
        });
      } else if (ruleOption.voidZero(p)) {
        sdLog('properties可以没有，但有的话必须是对象');
      }
      return true;
    },
    propertiesMust: function (p) {
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
      onComplete: function (status, val, rule_type) {
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
      onComplete: function (status, val, rule_type) {
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
      onComplete: function (status, val, rule_type) {
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
      onComplete: function (status, val, rule_type) {
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
      onComplete: function (status, val, rule_type) {
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
      onComplete: function (status, val, rule_type) {
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

    check: function (a, b, onComplete) {
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
    init: function (stage) {
      this.stage = stage;
    }
  };

  var saEvent = {};

  saEvent.check = check;

  saEvent.sendItem = function (p) {
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

    sd.sendState.getSendCall(data);
  };

  saEvent.send = function (p, callback) {
    var data = sd.kit.buildData(p);
    sd.kit.sendData(data, callback);
  };

  // 发送debug数据请求
  saEvent.debugPath = function (data) {
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
      header: { 'Dry-Run': String(sd.para.debug_mode_upload) },
      success: function (data) {
        // debug 模式下 提示框
        isEmptyObject(data) === true ? alert('debug数据发送成功' + _data) : alert('debug失败 错误原因' + JSON.stringify(data));
      }
    });
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
    initUnlimitedTags: function () {
      each(heatmap.otherTags, function (tagName) {
        if (tagName in UNLIMITED_TAGS_MAP) {
          UNLIMITED_TAGS_MAP[tagName] = true;
        }
      });
    },
    // 判断是否是支持无限层级的标签元素 (a, button, data-sensors-click)
    isUnlimitedTag: function (el) {
      if (!el || el.nodeType !== 1) return false;
      var tagName = el.nodeName.toLowerCase();
      return UNLIMITED_TAGS_MAP[tagName] || hasAttributes(el, sd.para.heatmap.track_attr);
    },
    getTargetElement: function (element, e) {
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
      var unlimitedTag = that.hasElement({ event: (e && e.originalEvent) || e, element: element }, function (target) {
        return that.isUnlimitedTag(target);
      });
      return unlimitedTag || null;
    },
    // 两个 div 之间的层级数目
    getDivLevels: function (element, rootElement) {
      var path = heatmap.getElementPath(element, true, rootElement);
      var pathArr = path.split(' > ');
      var ans = 0;
      each(pathArr, function (tag) {
        if (tag === 'div') {
          ans++;
        }
      });
      return ans;
    },
    isDivLevelValid: function (element) {
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
    getElementPath: function (element, ignoreID, rootElement) {
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
    getClosestLi: function (element) {
      // 得到符合指定选择器的最近的元素
      var getClosest = function (elem, selector) {
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
    getElementPosition: function (element, elementPath, ignoreID) {
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
    setNotice: function (web_url) {
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
        sd.para.heatmap_url = location.protocol + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/heatmap.min.js';
      }
    },
    getDomIndex: function (el) {
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
    selector: function (el, notuseid) {
      var i = el.parentNode && 9 == el.parentNode.nodeType ? -1 : this.getDomIndex(el);
      if (el.getAttribute && el.getAttribute('id') && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(el.getAttribute('id')) && (!sd.para.heatmap || (sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id')) && !notuseid) {
        return '#' + el.getAttribute('id');
      } else {
        return el.tagName.toLowerCase() + (~i ? ':nth-of-type(' + (i + 1) + ')' : '');
      }
    },
    getDomSelector: function (el, arr, notuseid) {
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
    na: function () {
      var a = document.documentElement.scrollLeft || window.pageXOffset;
      return parseInt(isNaN(a) ? 0 : a, 10);
    },
    i: function () {
      var a = 0;
      try {
        //eslint-disable-next-line
        (a = (o.documentElement && o.documentElement.scrollTop) || m.pageYOffset), (a = isNaN(a) ? 0 : a);
      } catch (b) {
        a = 0;
      }
      return parseInt(a, 10);
    },
    getBrowserWidth: function () {
      var a = window.innerWidth || document.body.clientWidth;
      return isNaN(a) ? 0 : parseInt(a, 10);
    },
    getBrowserHeight: function () {
      var a = window.innerHeight || document.body.clientHeight;
      return isNaN(a) ? 0 : parseInt(a, 10);
    },
    getScrollWidth: function () {
      var a = parseInt(document.body.scrollWidth, 10);
      return isNaN(a) ? 0 : a;
    },
    getEleDetail: function (target) {
      var selector = this.getDomSelector(target);
      var prop = getEleInfo({ target: target });
      prop.$element_selector = selector ? selector : '';
      prop.$element_path = sd.heatmap.getElementPath(target, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
      var element_position = sd.heatmap.getElementPosition(target, prop.$element_path, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
      if (isNumber(element_position)) {
        prop.$element_position = element_position;
      }
      return prop;
    },
    getPointerEventProp: function (ev, target) {
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
    start: function (ev, target, tagName, customProps, callback) {
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
      if (tagName === 'a' && sd.para.heatmap && sd.para.heatmap.isTrackLink === true) {
        sd.trackLink({ event: ev, target: target }, '$WebClick', prop);
      } else {
        sd.track('$WebClick', prop, userCallback);
      }
    },
    // 去除window
    hasElement: function (obj, func) {
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
    isStyleTag: function (tagname, isVisualMode) {
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
    isCollectableDiv: function (target, isVisualMode) {
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
    getCollectableParent: function (target, isVisualMode) {
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
    listenUrlChange: function (callback) {
      callback();
      sd.ee.spa.on('switch', function () {
        callback();
      });
    },
    initScrollmap: function () {
      if (!isObject(sd.para.heatmap) || sd.para.heatmap.scroll_notice_map !== 'default') {
        return false;
      }
      // 当前页面是否可采集
      var isPageCollect = true;
      if (sd.para.scrollmap && isFunction(sd.para.scrollmap.collect_url)) {
        this.listenUrlChange(function () {
          isPageCollect = !!sd.para.scrollmap.collect_url();
        });
      }

      var interDelay = function (param) {
        var interDelay = {};
        interDelay.timeout = param.timeout || 1000;
        interDelay.func = param.func;
        interDelay.hasInit = false;
        interDelay.inter = null;
        interDelay.main = function (para, isClose) {
          this.func(para, isClose);
          this.inter = null;
        };
        interDelay.go = function (isNoDelay) {
          var para = {};
          if (!this.inter) {
            para.$viewport_position = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
            para.$viewport_position = Math.round(para.$viewport_position) || 0;
            //para.$screen_orientation = _.getScreenOrientation();
            //para.$device_pixel_ratio = (isNaN(window.devicePixelRatio) ? 1 : window.devicePixelRatio);
            if (isNoDelay) {
              interDelay.main(para, true);
            } else {
              this.inter = setTimeout(function () {
                interDelay.main(para);
              }, this.timeout);
            }
          }
        };
        return interDelay;
      };

      var delayTime = interDelay({
        timeout: 1000,
        func: function (para, isClose) {
          var offsetTop = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
          var current_time = new Date();
          var delay_time = current_time - this.current_time;
          if ((delay_time > sd.para.heatmap.scroll_delay_time && offsetTop - para.$viewport_position !== 0) || isClose) {
            para.$url = getURL();
            para.$title = document.title;
            para.$url_path = getURLPath();
            para.event_duration = Math.min(sd.para.heatmap.scroll_event_duration, parseInt(delay_time) / 1000);
            para.event_duration = para.event_duration < 0 ? 0 : para.event_duration;
            sd.track('$WebStay', para);
          }
          this.current_time = current_time;
        }
      });

      delayTime.current_time = new Date();

      addEvent$1(window, 'scroll', function () {
        if (!isPageCollect) {
          return false;
        }
        delayTime.go();
      });

      addEvent$1(window, 'unload', function () {
        if (!isPageCollect) {
          return false;
        }
        delayTime.go('notime');
      });
    },
    initHeatmap: function () {
      var that = this;
      // 当前页面是否可采集
      var isPageCollect = true;
      if (!isObject(sd.para.heatmap) || sd.para.heatmap.clickmap !== 'default') {
        return false;
      }

      // 验证url，function成功就行，非function认为都是全部
      if (isFunction(sd.para.heatmap.collect_url)) {
        this.listenUrlChange(function () {
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
        addEvent$1(document, 'click', function (e) {
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
        addEvent$1(document, 'click', function (e) {
          if (!isPageCollect) return false;
          var ev = e || window.event;
          if (!ev) {
            return false;
          }
          var target = ev.target || ev.srcElement;
          var theTarget = sd.heatmap.getTargetElement(target, e);
          if (theTarget) {
            that.start(ev, theTarget, theTarget.tagName.toLowerCase());
          } else if (isElement(target) && target.tagName.toLowerCase() === 'div' && isObject(sd.para.heatmap) && sd.para.heatmap.get_vtrack_config && sd.unlimitedDiv.events.length > 0) {
            // 是否是想要的元素
            if (sd.unlimitedDiv.isTargetEle(target)) {
              that.start(ev, target, target.tagName.toLowerCase(), { $lib_method: 'vtrack' });
            }
          }
        });
      }
    }
  };

  var commonWays = {
    setOnlineState: function (state) {
      if (state === true && isObject(sd.para.jsapp) && typeof sd.para.jsapp.getData === 'function') {
        sd.para.jsapp.isOnline = true;
        var arr = sd.para.jsapp.getData();
        if (isArray(arr) && arr.length > 0) {
          each(arr, function (str) {
            if (isJSONString(str)) {
              sd.sendState.realtimeSend(JSON.parse(str));
            }
          });
        }
      } else {
        sd.para.jsapp.isOnline = false;
      }
    },
    autoTrackIsUsed: false,
    isReady: function (callback) {
      callback();
    },
    // 获取谷歌标准参数
    getUtm: function () {
      return pageInfo.campaignParams();
    },
    // 获取当前页面停留时间
    getStayTime: function () {
      return (new Date() - sd._t) / 1000;
    },
    setProfileLocal: function (obj) {
      if (!_localStorage.isSupport()) {
        sd.setProfile(obj);
        return false;
      }
      if (!isObject(obj) || isEmptyObject(obj)) {
        return false;
      }
      var saveData = sd.store.readObjectVal('sensorsdata_2015_jssdk_profile');
      var isNeedSend = false;
      if (isObject(saveData) && !isEmptyObject(saveData)) {
        for (var i in obj) {
          if ((i in saveData && saveData[i] !== obj[i]) || !(i in saveData)) {
            saveData[i] = obj[i];
            isNeedSend = true;
          }
        }
        if (isNeedSend) {
          sd.store.saveObjectVal('sensorsdata_2015_jssdk_profile', saveData);
          sd.setProfile(obj);
        }
      } else {
        sd.store.saveObjectVal('sensorsdata_2015_jssdk_profile', obj);
        sd.setProfile(obj);
      }
    },
    //set init referrer
    setInitReferrer: function () {
      var _referrer = getReferrer();
      sd.setOnceProfile({
        _init_referrer: _referrer,
        _init_referrer_host: pageInfo.pageProp.referrer_host
      });
    },
    // set init sessionRegister cookie
    setSessionReferrer: function () {
      var _referrer = getReferrer();
      sd.store.setSessionPropsOnce({
        _session_referrer: _referrer,
        _session_referrer_host: pageInfo.pageProp.referrer_host
      });
    },
    // set default referrr and pageurl
    setDefaultAttr: function () {
      pageInfo.register({
        _current_url: location.href,
        _referrer: getReferrer(),
        _referring_host: pageInfo.pageProp.referrer_host
      });
    },
    trackHeatMap: function (target, props, callback) {
      if (typeof target === 'object' && target.tagName) {
        var tagName = target.tagName.toLowerCase();
        var parent_ele = target.parentNode.tagName.toLowerCase();
        var trackAttrs = sd.para.heatmap && sd.para.heatmap.track_attr ? sd.para.heatmap.track_attr : ['data-sensors-click'];
        if (tagName !== 'button' && tagName !== 'a' && parent_ele !== 'a' && parent_ele !== 'button' && tagName !== 'input' && tagName !== 'textarea' && !hasAttributes(target, trackAttrs)) {
          heatmap.start(null, target, tagName, props, callback);
        }
      }
    },
    trackAllHeatMap: function (target, props, callback) {
      if (typeof target === 'object' && target.tagName) {
        var tagName = target.tagName.toLowerCase();
        heatmap.start(null, target, tagName, props, callback);
      }
    },
    autoTrackSinglePage: function (para, callback) {
      var url;
      if (this.autoTrackIsUsed) {
        url = pageInfo.pageProp.url;
      } else {
        url = pageInfo.pageProp.referrer;
      }
      para = isObject(para) ? para : {};

      function getUtm() {
        var utms = pageInfo.campaignParams();
        var $utms = {};
        each(utms, function (v, i, utms) {
          if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
            $utms['$' + i] = utms[i];
          } else {
            $utms[i] = utms[i];
          }
        });
        return $utms;
      }

      var is_set_profile = !para.not_set_profile;
      if (para.not_set_profile) {
        delete para.not_set_profile;
      }

      function closure(p, c) {
        sd.track(
          '$pageview',
          extend(
            {
              $referrer: url,
              $url: getURL(),
              $url_path: getURLPath(),
              $title: document.title
            },
            p,
            getUtm()
          ),
          c
        );
        url = getURL();
      }
      closure(para, callback);
      this.autoTrackSinglePage = closure;

      if (sd.is_first_visitor && is_set_profile) {
        var eqidObj = {};

        if (sd.para.preset_properties.search_keyword_baidu && isReferralTraffic(document.referrer) && isBaiduTraffic()) {
          eqidObj['$search_keyword_id'] = getBaiduKeyword.id();
          eqidObj['$search_keyword_id_type'] = getBaiduKeyword.type();
          eqidObj['$search_keyword_id_hash'] = hashCode53(eqidObj['$search_keyword_id']);
        }

        sd.setOnceProfile(
          extend(
            {
              // 暂时隐藏，等extractor都部署上去 $first_landing_page: pageInfo.pageProp.url.slice(0, sd.para.max_referrer_string_length),
              $first_visit_time: new Date(),
              $first_referrer: getReferrer(),
              $first_browser_language: isString(navigator.language) ? navigator.language.toLowerCase() : '取值异常',
              $first_browser_charset: typeof document.charset === 'string' ? document.charset.toUpperCase() : '取值异常',
              $first_traffic_source_type: getSourceFromReferrer(),
              $first_search_keyword: getKeywordFromReferrer()
            },
            getUtm(),
            eqidObj
          )
        );

        sd.is_first_visitor = false;
      }
    },
    autoTrackWithoutProfile: function (para, callback) {
      para = isObject(para) ? para : {};
      this.autoTrack(extend(para, { not_set_profile: true }), callback);
    },
    autoTrack: function (para, callback) {
      para = isObject(para) ? para : {};

      var utms = pageInfo.campaignParams();
      var $utms = {};
      each(utms, function (v, i, utms) {
        if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms['$' + i] = utms[i];
        } else {
          $utms[i] = utms[i];
        }
      });

      var is_set_profile = !para.not_set_profile;
      if (para.not_set_profile) {
        delete para.not_set_profile;
      }

      // 解决单页面的referrer问题
      var current_page_url = location.href;

      if (sd.para.is_single_page) {
        addHashEvent(function () {
          var referrer = getReferrer(current_page_url, true);
          sd.track(
            '$pageview',
            extend(
              {
                $referrer: referrer,
                $url: getURL(),
                $url_path: getURLPath(),
                $title: document.title
              },
              $utms,
              para
            ),
            callback
          );
          current_page_url = getURL();
        });
      }
      sd.track(
        '$pageview',
        extend(
          {
            $referrer: getReferrer(null, true),
            $url: getURL(),
            $url_path: getURLPath(),
            $title: document.title
          },
          $utms,
          para
        ),
        callback
      );

      // setOnceProfile 如果是新用户，且允许设置profile
      if (sd.is_first_visitor && is_set_profile) {
        var eqidObj = {};

        if (sd.para.preset_properties.search_keyword_baidu && isReferralTraffic(document.referrer) && isBaiduTraffic()) {
          eqidObj['$search_keyword_id'] = getBaiduKeyword.id();
          eqidObj['$search_keyword_id_type'] = getBaiduKeyword.type();
          eqidObj['$search_keyword_id_hash'] = hashCode53(eqidObj['$search_keyword_id']);
        }

        sd.setOnceProfile(
          extend(
            {
              // 暂时隐藏，等extractor都部署上去 $first_landing_page: pageInfo.pageProp.url.slice(0, sd.para.max_referrer_string_length),
              $first_visit_time: new Date(),
              $first_referrer: getReferrer(null, true),
              $first_browser_language: isString(navigator.language) ? navigator.language.toLowerCase() : '取值异常',
              $first_browser_charset: typeof document.charset === 'string' ? document.charset.toUpperCase() : '取值异常',
              $first_traffic_source_type: getSourceFromReferrer(),
              $first_search_keyword: getKeywordFromReferrer()
            },
            $utms,
            eqidObj
          )
        );

        sd.is_first_visitor = false;
      }

      this.autoTrackIsUsed = true;
    },
    getAnonymousID: function () {
      if (isEmptyObject(sd.store._state)) {
        return '请先初始化SDK';
      } else {
        // 优先使用临时属性
        return sd.store._state._first_id || sd.store._state.first_id || sd.store._state._distinct_id || sd.store._state.distinct_id;
      }
    },
    setPlugin: function (para) {
      if (!isObject(para)) {
        return false;
      }
      //      sd.pluginTempFunction = sd.pluginTempFunction || {};
      each(para, function (v, k) {
        if (isFunction(v)) {
          //          sd.pluginTempFunction[k] = v;
          if (isObject(window.SensorsDataWebJSSDKPlugin) && window.SensorsDataWebJSSDKPlugin[k]) {
            v(window.SensorsDataWebJSSDKPlugin[k]);
            //            delete sd.pluginTempFunction[k];
          } else {
            sd.log(k + '没有获取到,请查阅文档，调整' + k + '的引入顺序！');
          }
        }
      });
    },
    useModulePlugin: function () {
      sd.use.apply(sd, arguments);
    },
    useAppPlugin: function () {
      this.setPlugin.apply(this, arguments);
    }
    /*,
      pluginIsReady: function(para){
        // sdk先加载，popup后加载调用 quick('pluginIsReady',{name:popup,self:this})
        if(!sd.pluginTempFunction || !_.isObject(para) || !_.isFunction(para.name)){
          return false;
        }
        if(sd.pluginTempFunction[para.name]){
          sd.pluginTempFunction[para.name](para.self);
          delete sd.pluginTempFunction[para.name];
        }
      }*/
  };

  /*eslint no-prototype-builtins: "off"*/

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
        if (sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host) {
          data.properties.$latest_referrer_host = data.properties.$latest_referrer === '' ? '' : getHostname(data.properties.$latest_referrer, defaultHost);
        }
      }
    }
  }

  function addPropsHook(data) {
    var isNotProfileType = !data.type || data.type.slice(0, 7) !== 'profile';
    var isSatisfy = sd.para.preset_properties && isNotProfileType;
    if (isSatisfy && sd.para.preset_properties.url && typeof data.properties.$url === 'undefined') {
      data.properties.$url = getURL();
    }
    if (isSatisfy && sd.para.preset_properties.title && typeof data.properties.$title === 'undefined') {
      data.properties.$title = document.title;
    }
  }

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
    sd.para.preset_properties = extend({}, sd.para_default.preset_properties, latestObj, sd.para.preset_properties || {});

    // 合并配置
    var i;
    for (i in sd.para_default) {
      if (sd.para[i] === void 0) {
        sd.para[i] = sd.para_default[i];
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
    sd.debug.protocol.serverUrl();

    // 初始化打通参数
    sd.bridge.initPara();
    sd.bridge.initState();

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
    var search_keyword = { baidu: ['wd', 'word', 'kw', 'keyword'], google: 'q', bing: 'q', yahoo: 'p', sogou: ['query', 'keyword'], so: 'q', sm: 'q' };

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

      var trackAttrs = isArray(sd.para.heatmap.track_attr)
        ? filter(sd.para.heatmap.track_attr, function (v) {
          return v && typeof v === 'string';
        })
        : [];
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
      each(sd.para.heatmap.collect_tags, function (val, key) {
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

  // sa 当前状态管理
  var readyState = {
    state: 0,
    historyState: [],
    stateType: {
      1: '1-init未开始',
      2: '2-init开始',
      3: '3-store完成'
    },
    getState: function () {
      return this.historyState.join('\n');
    },
    setState: function (n) {
      if (String(n) in this.stateType) {
        this.state = n;
      }
      this.historyState.push(this.stateType[n]);
    }
  };

  /*
   重置 id3 中的 identities
   @para {retain:'保留什么属性'}
  */
  function resetIdentities(resetObj) {
    var identities = {};
    for (var i in resetObj) {
      identities[i] = resetObj[i];
    }
    sd.store._state.identities = identities;
    sd.store.save();
  }

  function setInitVar() {
    sd._t = sd._t || 1 * new Date();
    sd.lib_version = sdkversion_placeholder;
    sd.is_first_visitor = false;
    // 标准广告系列来源
    sd.source_channel_standard = source_channel_standard;
  }

  /**
   * 设置 sessionStorage 开启本地控制台日志输出
   */
  function enableLocalLog() {
    if (_sessionStorage.isSupport()) {
      try {
        sessionStorage.setItem('sensorsdata_jssdk_debug', 'true');
      } catch (e) {
        sd.log('enableLocalLog error: ' + e.message);
        // handle the exception here.
      }
    }
  }

  /**
   * 删除 sessionStorage 关闭本地控制台日志输出
   */
  function disableLocalLog() {
    if (_sessionStorage.isSupport()) {
      sessionStorage.removeItem('sensorsdata_jssdk_debug');
    }
  }

  // 一些常见的方法
  function quick() {
    var arg = Array.prototype.slice.call(arguments);
    var arg0 = arg[0];
    var arg1 = arg.slice(1);
    if (typeof arg0 === 'string' && commonWays[arg0]) {
      return commonWays[arg0].apply(commonWays, arg1);
    } else if (typeof arg0 === 'function') {
      arg0.apply(sd, arg1);
    } else {
      sd.log('quick方法中没有这个功能' + arg[0]);
    }
  }

  // 调用插件的 init 方法,并且返回插件对象

  function use(name, option) {
    if (!isString(name)) {
      sd.log('use插件名称必须是字符串！');
      return false;
    }

    if (isObject(window.SensorsDataWebJSSDKPlugin) && isObject(window.SensorsDataWebJSSDKPlugin[name]) && isFunction(window.SensorsDataWebJSSDKPlugin[name].init)) {
      window.SensorsDataWebJSSDKPlugin[name].init(sd, option);
      return window.SensorsDataWebJSSDKPlugin[name];
    } else if (isObject(sd.modules) && isObject(sd.modules[name]) && isFunction(sd.modules[name].init)) {
      sd.modules[name].init(sd, option);
      return sd.modules[name];
    } else {
      sd.log(name + '没有获取到,请查阅文档，调整' + name + '的引入顺序！');
    }
  }

  /*
   * @param {string} event
   * @param {string} properties
   * */
  function track(e, p, c) {
    if (saEvent.check({ event: e, properties: p })) {
      saEvent.send(
        {
          type: 'track',
          event: e,
          properties: p
        },
        c
      );
    }
  }

  function bind(itemName, itemValue) {
    if (!saEvent.check({ bindKey: itemName, bindValue: itemValue })) {
      return false;
    }
    // if (checkBindPara(itemName, itemValue) === false) {
    //   return false;
    // }

    sd.store._state.identities[itemName] = itemValue;
    sd.store.save();

    saEvent.send({
      type: 'track_id_bind',
      event: '$BindID',
      properties: {}
    });
  }

  function unbind(itemName, itemValue) {
    if (!saEvent.check({ unbindKey: itemName, bindValue: itemValue })) {
      return false;
    }

    if (isObject(sd.store._state.identities) && sd.store._state.identities.hasOwnProperty(itemName) && sd.store._state.identities[itemName] === itemValue) {
      // 如果 login_id = itemName+itemValue 需要清除用户
      var loginID = sd.store.getUnionId().login_id;
      if (loginID && itemName + '+' + itemValue === loginID) {
        sd.store._state.distinct_id = sd.store._state.first_id;
        sd.store._state.first_id = '';
        sd.store.set('history_login_id', {
          name: '',
          value: ''
        });
      }

      // 如果是 $identity_cookie_id 本地不删除，只有服务器解绑
      if (itemName !== '$identity_cookie_id') {
        delete sd.store._state.identities[itemName];
        sd.store.save();
      }
    }

    var identities = {};
    identities[itemName] = itemValue;

    saEvent.send({
      identities: identities,
      type: 'track_id_unbind',
      event: '$UnbindID',
      properties: {}
    });
  }

  function trackLink(link, event_name, event_prop) {
    function _trackLink(obj, event_name, event_prop) {
      obj = obj || {};
      var link = null;
      if (obj.ele) {
        link = obj.ele;
      }
      if (obj.event) {
        if (obj.target) {
          link = obj.target;
        } else {
          link = obj.event.target;
        }
      }

      event_prop = event_prop || {};
      if (!link || typeof link !== 'object') {
        return false;
      }
      // 如果是非当前页面会跳转的链接，直接track
      if (!link.href || /^javascript/.test(link.href) || link.target || link.download || link.onclick) {
        sd.track(event_name, event_prop);
        return false;
      }
      function linkFunc(e) {
        e.stopPropagation();
        e.preventDefault(); // 阻止默认跳转
        var hasCalled = false;
        function track_a_click() {
          if (!hasCalled) {
            hasCalled = true;
            location.href = link.href; //把 A 链接的点击跳转,改成 location 的方式跳转
          }
        }
        setTimeout(track_a_click, 1000); //如果没有回调成功，设置超时回调
        sd.track(event_name, event_prop, track_a_click); //把跳转操作加在callback里
      }
      if (obj.event) {
        linkFunc(obj.event);
      }
      if (obj.ele) {
        addEvent$1(obj.ele, 'click', function (e) {
          linkFunc(e);
        });
      }
    }

    if (typeof link === 'object' && link.tagName) {
      _trackLink({ ele: link }, event_name, event_prop);
    } else if (typeof link === 'object' && link.target && link.event) {
      _trackLink(link, event_name, event_prop);
    }
  }

  // 跟踪链接
  function trackLinks(link, event_name, event_prop) {
    event_prop = event_prop || {};
    if (!link || typeof link !== 'object') {
      return false;
    }
    if (!link.href || /^javascript/.test(link.href) || link.target) {
      return false;
    }
    addEvent$1(link, 'click', function (e) {
      e.preventDefault(); // 阻止默认跳转
      var hasCalled = false;
      setTimeout(track_a_click, 1000); //如果没有回调成功，设置超时回调
      function track_a_click() {
        if (!hasCalled) {
          hasCalled = true;
          location.href = link.href; //把 A 链接的点击跳转,改成 location 的方式跳转
        }
      }
      sd.track(event_name, event_prop, track_a_click); //把跳转操作加在callback里
    });
  }

  function setItem(type, id, p) {
    if (saEvent.check({ item_type: type, item_id: id, properties: p })) {
      saEvent.sendItem({
        type: 'item_set',
        item_type: type,
        item_id: id,
        properties: p || {}
      });
    }
  }

  function deleteItem(type, id) {
    if (saEvent.check({ item_type: type, item_id: id })) {
      saEvent.sendItem({
        type: 'item_delete',
        item_type: type,
        item_id: id
      });
    }
  }

  /*
   * @param {object} properties
   * */
  function setProfile(p, c) {
    if (saEvent.check({ propertiesMust: p })) {
      saEvent.send(
        {
          type: 'profile_set',
          properties: p
        },
        c
      );
    }
  }

  function setOnceProfile(p, c) {
    if (saEvent.check({ propertiesMust: p })) {
      saEvent.send(
        {
          type: 'profile_set_once',
          properties: p
        },
        c
      );
    }
  }

  /*
   * @param {object} properties
   * */
  function appendProfile(p, c) {
    if (saEvent.check({ propertiesMust: p })) {
      each(p, function (value, key) {
        if (isString(value)) {
          p[key] = [value];
        } else if (isArray(value)) {
          p[key] = value;
        } else {
          delete p[key];
          sd.log('appendProfile属性的值必须是字符串或者数组');
        }
      });
      if (!isEmptyObject(p)) {
        saEvent.send(
          {
            type: 'profile_append',
            properties: p
          },
          c
        );
      }
    }
  }
  /*
   * @param {object} properties
   * */
  function incrementProfile(p, c) {
    var str = p;
    if (isString(p)) {
      p = {};
      p[str] = 1;
    }
    function isChecked(p) {
      for (var i in p) {
        if (Object.prototype.hasOwnProperty.call(p, i) && !/-*\d+/.test(String(p[i]))) {
          return false;
        }
      }
      return true;
    }

    if (saEvent.check({ propertiesMust: p })) {
      if (isChecked(p)) {
        saEvent.send(
          {
            type: 'profile_increment',
            properties: p
          },
          c
        );
      } else {
        sd.log('profile_increment的值只能是数字');
      }
    }
  }

  function deleteProfile(c) {
    saEvent.send(
      {
        type: 'profile_delete'
      },
      c
    );
    store.set('distinct_id', UUID());
    store.set('first_id', '');
  }
  /*
   * @param {object} properties
   * */
  function unsetProfile(p, c) {
    var str = p;
    var temp = {};
    if (isString(p)) {
      p = [];
      p.push(str);
    }
    if (isArray(p)) {
      each(p, function (v) {
        if (isString(v)) {
          temp[v] = true;
        } else {
          sd.log('profile_unset给的数组里面的值必须时string,已经过滤掉', v);
        }
      });
      saEvent.send(
        {
          type: 'profile_unset',
          properties: temp
        },
        c
      );
    } else {
      sd.log('profile_unset的参数是数组');
    }
  }
  /*
   * @param {string} distinct_id
   * */
  function identify(id, isSave) {
    if (typeof id === 'number') {
      id = String(id);
    }

    function saveIdentities(id) {
      sd.store._state.identities.$identity_anonymous_id = id;
      sd.store.save();
    }

    var firstId = store.getFirstId();
    if (typeof id === 'undefined') {
      var uuid = UUID();
      if (firstId) {
        store.set('first_id', uuid);
      } else {
        store.set('distinct_id', uuid);
      }
      // 3.0
      saveIdentities(uuid);
    } else if (saEvent.check({ distinct_id: id })) {
      if (isSave === true) {
        if (firstId) {
          store.set('first_id', id);
        } else {
          store.set('distinct_id', id);
        }
      } else {
        if (firstId) {
          store.change('first_id', id);
        } else {
          store.change('distinct_id', id);
        }
      }
      saveIdentities(id);
    }
  }

  function sendSignup(id, e, p, c) {
    var original_id = store.getFirstId() || store.getDistinctId();
    store.set('distinct_id', id);
    saEvent.send(
      {
        original_id: original_id,
        distinct_id: sd.store.getDistinctId(),
        type: 'track_signup',
        event: e,
        properties: p
      },
      c
    );
  }

  /*
   * 这个接口是一个较为复杂的功能，请在使用前先阅读相关说明:http://www.sensorsdata.cn/manual/track_signup.html，并在必要时联系我们的技术支持人员。
   * @param {string} distinct_id
   * @param {string} event
   * @param {object} properties
   * */
  function trackSignup(id, e, p, c) {
    if (typeof id === 'number') {
      id = String(id);
    }
    if (saEvent.check({ distinct_id: id, event: e, properties: p })) {
      sendSignup(id, e, p, c);
    }
  }

  /*
   * @param {string} testid
   * @param {string} groupid
   * */

  /**
   * Register a set of properties, which are included with all events.
   *
   * @param {Object} obj - An object of properties to be registered.
   *
   */
  function registerPage(obj) {
    if (saEvent.check({ properties: obj })) {
      extend(pageInfo.currentProps, obj);
    } else {
      sd.log('register输入的参数有误');
    }
  }

  function clearAllRegister(arr) {
    store.clearAllProps(arr);
  }

  function clearPageRegister(arr) {
    var i;
    if (isArray(arr) && arr.length > 0) {
      for (i = 0; i < arr.length; i++) {
        if (isString(arr[i]) && arr[i] in pageInfo.currentProps) {
          delete pageInfo.currentProps[arr[i]];
        }
      }
    } else if (arr === true) {
      for (i in pageInfo.currentProps) {
        delete pageInfo.currentProps[i];
      }
    }
  }

  function register(props) {
    if (saEvent.check({ properties: props })) {
      store.setProps(props);
    } else {
      sd.log('register输入的参数有误');
    }
  }

  function registerOnce(props) {
    if (saEvent.check({ properties: props })) {
      store.setPropsOnce(props);
    } else {
      sd.log('registerOnce输入的参数有误');
    }
  }

  function registerSession(props) {
    if (saEvent.check({ properties: props })) {
      store.setSessionProps(props);
    } else {
      sd.log('registerSession输入的参数有误');
    }
  }

  function registerSessionOnce(props) {
    if (saEvent.check({ properties: props })) {
      store.setSessionPropsOnce(props);
    } else {
      sd.log('registerSessionOnce输入的参数有误');
    }
  }

  function loginBody(obj) {
    var id = obj.id;
    var callback = obj.callback;
    var name = obj.name;

    var firstId = store.getFirstId();
    var distinctId = store.getOriginDistinctId();

    // id 合法
    if (!saEvent.check({ distinct_id: id })) {
      sd.log('login id is invalid');
      return false;
    }
    // 未登录
    if (id === sd.store.getOriginDistinctId() && !firstId) {
      sd.log('login id is equal to distinct_id');
      return false;
    }
    // 如果已登录，再次调用 login() 传入的是匿名 id，忽略本次调用
    if (isObject(sd.store._state.identities) && sd.store._state.identities.hasOwnProperty(name) && id === sd.store._state.first_id) {
      return false;
    }

    var isNewLoginId = sd.store._state.history_login_id.name !== name || id !== sd.store._state.history_login_id.value;
    // 3.0 新增
    if (isNewLoginId) {
      sd.store._state.identities[name] = id;
      sd.store.set('history_login_id', {
        name: name,
        value: id
      });

      if (!firstId) {
        store.set('first_id', distinctId);
      }

      sendSignup(id, '$SignUp', {}, callback);

      // 重置 identities
      var tempObj = {
        $identity_cookie_id: sd.store._state.identities.$identity_cookie_id
      };
      tempObj[name] = id;
      resetIdentities(tempObj);
    }
  }

  function login(id, callback) {
    if (typeof id === 'number') {
      id = String(id);
    }
    loginBody({
      id: id,
      callback: callback,
      name: IDENTITY_KEY.LOGIN
    });
    isFunction(callback) && callback();
  }

  function loginWithKey(name, id) {
    if (typeof id === 'number') {
      id = String(id);
    }

    if (typeof name === 'number') {
      name = String(name);
    }

    // 如果id不合法
    if (!saEvent.check({ loginIdKey: name })) {
      return false;
    }

    // 如果是'$identity_login_id'走原来的逻辑
    if (IDENTITY_KEY.LOGIN === name) {
      login(id);
      return false;
    }

    loginBody({
      id: id,
      callback: null,
      name: name
    });
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
      $identity_cookie_id: sd.store._state.identities.$identity_cookie_id
    });

    sd.store.set('history_login_id', {
      name: '',
      value: ''
    });
  }
  function getPresetProperties() {
    function getUtm() {
      var utms = pageInfo.campaignParams();
      var $utms = {};
      each(utms, function (v, i, utms) {
        if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms['$' + i] = utms[i];
        } else {
          $utms[i] = utms[i];
        }
      });
      return $utms;
    }

    var obj = {
      $is_first_day: isNewUser(),
      $is_first_time: saNewUser.is_page_first_visited,
      $referrer: pageInfo.pageProp.referrer || '',
      $referrer_host: pageInfo.pageProp.referrer ? getHostname(pageInfo.pageProp.referrer) : '',
      $url: getURL(),
      $url_path: getURLPath(),
      $title: document.title || '',
      _distinct_id: store.getDistinctId(),
      identities: JSON.parse(JSON.stringify(store._state.identities))
    };
    var result = extend({}, pageInfo.properties(), sd.store.getProps(), getUtm(), obj);
    if (sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host) {
      result.$latest_referrer_host = result.$latest_referrer === '' ? '' : getHostname(result.$latest_referrer);
    }
    return result;
  }
  // iOS 及以下非触控元素，不响应 document 或 body 监听的 click 事件
  function iOSWebClickPolyfill() {
    // 非 div 非触控元素 css 样式
    var iOS_other_tags_css = '';
    var default_cursor_css = ' { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }';
    if (sd.heatmap && isArray(sd.heatmap.otherTags)) {
      // 循环非 div tags
      each(sd.heatmap.otherTags, function (val) {
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

  var functions = {
    __proto__: null,
    addReferrerHost: addReferrerHost,
    addPropsHook: addPropsHook,
    initPara: initPara,
    setInitVar: setInitVar,
    enableLocalLog: enableLocalLog,
    disableLocalLog: disableLocalLog,
    quick: quick,
    use: use,
    track: track,
    bind: bind,
    unbind: unbind,
    trackLink: trackLink,
    trackLinks: trackLinks,
    setItem: setItem,
    deleteItem: deleteItem,
    setProfile: setProfile,
    setOnceProfile: setOnceProfile,
    appendProfile: appendProfile,
    incrementProfile: incrementProfile,
    deleteProfile: deleteProfile,
    unsetProfile: unsetProfile,
    identify: identify,
    trackSignup: trackSignup,
    registerPage: registerPage,
    clearAllRegister: clearAllRegister,
    clearPageRegister: clearPageRegister,
    register: register,
    registerOnce: registerOnce,
    registerSession: registerSession,
    registerSessionOnce: registerSessionOnce,
    login: login,
    loginWithKey: loginWithKey,
    logout: logout,
    getPresetProperties: getPresetProperties,
    iOSWebClickPolyfill: iOSWebClickPolyfill,
    readyState: readyState,
    para_default: defaultPara,
    log: sdLog,
    debug: debug,
    IDENTITY_KEY: IDENTITY_KEY
  };

  var EventEmitterSa = function () {
    this._events = [];
    this.pendingEvents = [];
  };

  EventEmitterSa.prototype = {
    emit: function (type) {
      var args = [].slice.call(arguments, 1);

      each(this._events, function (val) {
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
    on: function (event, callback, context, replayAll) {
      if (typeof callback !== 'function') {
        return;
      }
      this._events.push({
        type: event,
        callback: callback,
        context: context || this
      });

      replayAll = replayAll === false ? false : true;
      if (this.pendingEvents.length > 0 && replayAll) {
        each(this.pendingEvents, function (val) {
          if (val.type === event) {
            callback.apply(context, val.data);
          }
        });
      }
    },
    tempAdd: function (event, data) {
      if (!data || !event) {
        return;
      }
      return this.emit(event, data);
    },
    isReady: function () {}
  };



  var common = {
    __proto__: null,
    parseSuperProperties: parseSuperProperties,
    searchConfigData: searchConfigData,
    strip_empty_properties: strip_empty_properties,
    getCurrentDomain: getCurrentDomain,
    getEleInfo: getEleInfo,
    isBaiduTraffic: isBaiduTraffic,
    getReferrerEqid: getReferrerEqid,
    getReferrerEqidType: getReferrerEqidType,
    getBaiduKeyword: getBaiduKeyword,
    isReferralTraffic: isReferralTraffic,
    getReferrer: getReferrer,
    getKeywordFromReferrer: getKeywordFromReferrer,
    getWxAdIdFromUrl: getWxAdIdFromUrl,
    getReferSearchEngine: getReferSearchEngine,
    getSourceFromReferrer: getSourceFromReferrer,
    info: pageInfo,
    ajax: ajax$1,
    getElementContent: getElementContent$1,
    cookie: cookie$1,
    addEvent: addEvent$1,
    EventEmitterSa: EventEmitterSa,
    encrypt: encrypt,
    decryptIfNeeded: decryptIfNeeded
  };

  var kit = {};

  kit.buildData = function (p) {
    var data = {
      identities: {},
      distinct_id: sd.store.getDistinctId(),
      lib: {
        $lib: 'js',
        $lib_method: 'code',
        $lib_version: String(sd.lib_version)
      },
      properties: {}
    };

    if (isObject(p) && isObject(p.identities) && !isEmptyObject(p.identities)) {
      extend(data.identities, p.identities);
    } else {
      extend(data.identities, store._state.identities);
    }

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

    extend(data, sd.store.getUnionId(), p);

    // trigger process [formatData]
    dataStageImpl.stage.process('addCustomProps', data);

    // 合并properties里的属性
    if (isObject(p.properties) && !isEmptyObject(p.properties)) {
      extend(data.properties, p.properties);
    }

    /*
      // 合并lib里的属性
      if (_.isObject(callback)) {
        _.extend(data.lib, callback);
      }
      */

    // profile时不传公用属性
    if (!p.type || p.type.slice(0, 7) !== 'profile') {
      // 传入的属性 > 当前页面的属性 > session的属性 > cookie的属性 > 预定义属性

      data.properties = extend({}, pageInfo.properties(), store.getProps(), store.getSessionProps(), pageInfo.currentProps, data.properties);
      if (sd.para.preset_properties.latest_referrer && !isString(data.properties.$latest_referrer)) {
        data.properties.$latest_referrer = '取值异常';
        // TODO
        // Do NOT send data here, it will cause too much recursion.
        //_.jssdkDebug(data.properties,store.getProps());
        //sd.debug.jssdkDebug(data.properties, store.getProps());
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
    sd.vtrackBase.addCustomProps(data);

    // Parse super properties that added by registerPage()
    parseSuperProperties(data);

    //判断是否要给数据增加新用户属性
    saNewUser.checkIsAddSign(data);
    saNewUser.checkIsFirstTime(data);

    sd.addReferrerHost(data);
    sd.addPropsHook(data);

    // trigger process [formatData]
    dataStageImpl.stage.process('formatData', data);
    return data;
  };

  kit.sendData = function (data, callback) {
    //去掉data里的$option
    var data_config = searchConfigData(data.properties);
    if (sd.para.debug_mode === true) {
      sd.log(data);
      sd.saEvent.debugPath(JSON.stringify(data), callback);
    } else {
      sd.sendState.getSendCall(data, data_config, callback);
    }
  };

  kit.encodeTrackData = function (data) {
    var dataStr = base64Encode(data);
    var crc = 'crc=' + hashCode(dataStr);
    return 'data=' + encodeURIComponent(dataStr) + '&ext=' + encodeURIComponent(crc);
  };

  function getSendUrl(url, data) {
    var dataStr = kit.encodeTrackData(data);
    if (url.indexOf('?') !== -1) {
      return url + '&' + dataStr;
    }
    return url + '?' + dataStr;
  }

  function getSendData(data) {
    return kit.encodeTrackData(data);
  }

  var ImageSender = function (para) {
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

  ImageSender.prototype.start = function () {
    var me = this;
    if (sd.para.ignore_oom) {
      this.img.onload = function () {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
      this.img.onerror = function () {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
      this.img.onabort = function () {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
    }
    this.img.src = this.server_url;
  };

  ImageSender.prototype.lastClear = function () {
    var sys = getUA();
    if (sys.ie !== undefined) {
      this.img.src = 'about:blank';
    } else {
      this.img.src = '';
    }
  };

  var AjaxSender = function (para) {
    this.callback = para.callback;
    this.server_url = para.server_url;
    this.data = getSendData(para.data);
  };

  AjaxSender.prototype.start = function () {
    var me = this;
    ajax$1({
      url: this.server_url,
      type: 'POST',
      data: this.data,
      credentials: false,
      timeout: sd.para.datasend_timeout,
      cors: true,
      success: function () {
        me.isEnd();
      },
      error: function () {
        me.isEnd();
      }
    });
  };

  var BeaconSender = function (para) {
    this.callback = para.callback;
    this.server_url = para.server_url;
    this.data = getSendData(para.data);
  };

  BeaconSender.prototype.start = function () {
    var me = this;
    if (typeof navigator === 'object' && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(this.server_url, this.data);
    }
    setTimeout(function () {
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
    obj.start = function () {
      var me = this;
      start.apply(this, arguments);
      setTimeout(function () {
        me.isEnd(true);
      }, sd.para.callback_timeout);
    };
    obj.end = function () {
      this.callback && this.callback();
      var self = this;
      setTimeout(function () {
        self.lastClear && self.lastClear();
      }, sd.para.datasend_timeout - sd.para.callback_timeout);
    };
    obj.isEnd = function () {
      if (!this.received) {
        this.received = true;
        this.end();
      }
    };
    return obj;
  }

  /*
  数据处理和发送的流程
  数据批量发送
  */

  // 数据发送流程控制
  var sendState = {};

  sendState.getSendCall = function (data, config, callback) {
    // 点击图渲染模式不发数据
    if (sd.is_heatmap_render_mode) {
      return false;
    }

    if (sd.readyState.state < 3) {
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

    sd.events.tempAdd('send', originData);

    if (!sd.para.app_js_bridge && sd.para.batch_send && _localStorage.isSupport() && localStorage.length < 100) {
      sd.log(originData);
      sd.batchSend.add(requestData.data);
      return false;
    }
    if (originData.type === 'item_set' || originData.type === 'item_delete') {
      this.prepareServerUrl(requestData);
    } else {
      sd.bridge.dataSend(requestData, this, callback);
    }

    sd.log(originData);
  };

  sendState.prepareServerUrl = function (requestData) {
    if (typeof requestData.config === 'object' && requestData.config.server_url) {
      this.sendCall(requestData, requestData.config.server_url, requestData.callback);
    } else if (isArray(sd.para.server_url) && sd.para.server_url.length) {
      for (var i = 0; i < sd.para.server_url.length; i++) {
        this.sendCall(requestData, sd.para.server_url[i]);
      }
    } else if (typeof sd.para.server_url === 'string' && sd.para.server_url !== '') {
      this.sendCall(requestData, sd.para.server_url, requestData.callback);
    } else {
      sd.log('当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！');
    }
  };

  sendState.sendCall = function (requestData, server_url, callback) {
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
      this.realtimeSend(data);
    }
  };

  sendState.realtimeSend = function (data) {
    var instance = getRealtimeInstance(data);
    instance.start();
  };

  var dataStoragePrefix = 'sawebjssdk-';
  var tabStoragePrefix = 'tab-sawebjssdk-';

  function BatchSend() {
    this.sendTimeStamp = 0;
    this.timer = null;
    this.serverUrl = '';
    this.hasTabStorage = false;
  }

  BatchSend.prototype = {
    batchInterval: function () {
      if (this.serverUrl === '') this.getServerUrl();
      if (!this.hasTabStorage) {
        this.generateTabStorage();
        this.hasTabStorage = true;
      }
      var self = this;
      self.timer = setTimeout(function () {
        self.updateExpireTime();
        self.recycle();
        self.send();
        clearTimeout(self.timer);
        self.batchInterval();
      }, sd.para.batch_send.send_interval);
    },

    getServerUrl: function () {
      if ((isString(sd.para.server_url) && sd.para.server_url !== '') || (isArray(sd.para.server_url) && sd.para.server_url.length)) {
        this.serverUrl = isArray(sd.para.server_url) ? sd.para.server_url[0] : sd.para.server_url;
      } else {
        return sd.log('当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！');
      }
    },

    send: function () {
      if (this.sendTimeStamp && now() - this.sendTimeStamp < sd.para.batch_send.datasend_timeout) return;
      var tabStorage = _localStorage.get(this.tabKey);
      if (tabStorage) {
        this.sendTimeStamp = now();
        tabStorage = safeJSONParse(tabStorage) || this.generateTabStorageVal();
        if (tabStorage.data.length) {
          var data = [];
          for (var i = 0; i < tabStorage.data.length; i++) {
            data.push(sd.store.readObjectVal(tabStorage.data[i]));
          }
          this.request(data, tabStorage.data);
        }
      }
    },

    updateExpireTime: function () {
      var tabStorage = _localStorage.get(this.tabKey);
      if (tabStorage) {
        tabStorage = safeJSONParse(tabStorage) || this.generateTabStorageVal();
        tabStorage.expireTime = now() + sd.para.batch_send.send_interval * 2;
        tabStorage.serverUrl = this.serverUrl;
        _localStorage.set(this.tabKey, JSON.stringify(tabStorage));
      }
    },

    request: function (data, dataKeys) {
      var self = this;
      ajax({
        url: this.serverUrl,
        type: 'POST',
        data: 'data_list=' + encodeURIComponent(base64Encode(JSON.stringify(data))),
        credentials: false,
        timeout: sd.para.batch_send.datasend_timeout,
        cors: true,
        success: function () {
          self.remove(dataKeys);
          self.sendTimeStamp = 0;
        },
        error: function () {
          self.sendTimeStamp = 0;
        }
      });
    },

    remove: function (dataKeys) {
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

    add: function (data) {
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
      sd.store.saveObjectVal(dataKey, data);
      if (data.type === 'track_signup' || data.event === '$pageview') {
        this.sendImmediately();
      }
    },

    generateTabStorage: function () {
      this.tabKey = tabStoragePrefix + String(getRandom());
      _localStorage.set(this.tabKey, JSON.stringify(this.generateTabStorageVal()));
    },

    generateTabStorageVal: function (data) {
      data = data || [];
      return { data: data, expireTime: now() + sd.para.batch_send.send_interval * 2, serverUrl: this.serverUrl };
    },

    sendImmediately: function () {
      this.send();
    },

    recycle: function () {
      var notSendMap = {},
        lockTimeout = 10000,
        lockPrefix = 'sajssdk-lock-get-';
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i),
          self = this;
        if (key.indexOf(tabStoragePrefix) === 0) {
          var tabStorage = safeJSONParse(_localStorage.get(key)) || this.generateTabStorageVal();
          for (var j = 0; j < tabStorage.data.length; j++) {
            notSendMap[tabStorage.data[j]] = true;
          }
          if (now() > tabStorage.expireTime && this.serverUrl === tabStorage.serverUrl) {
            var concurrentStorage = new ConcurrentStorage(lockPrefix);
            concurrentStorage.get(key, lockTimeout, 1000, function (data) {
              if (data) {
                if (_localStorage.get(self.tabKey) === null) {
                  self.generateTabStorage();
                }
                var recycleData = safeJSONParse(data) || self.generateTabStorageVal();
                _localStorage.set(self.tabKey, JSON.stringify(self.generateTabStorageVal((safeJSONParse(_localStorage.get(self.tabKey)) || this.generateTabStorageVal()).data.concat(recycleData.data))));
              }
            });
          }
        } else if (key.indexOf(lockPrefix) === 0) {
          var lock = safeJSONParse(_localStorage.get(key)) || { expireTime: 0 };
          if (now() - lock.expireTime > lockTimeout) {
            _localStorage.remove(key);
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

  var bridge = {
    bridge_info: {
      touch_app_bridge: false, //是否存在app打通桥，包括老版本打通
      verify_success: false, //是否成功打通，包括老版本打通 ，false 未打通，success 打通成功，fail 校验 server_url 失败
      platform: '' //原生类型 ios/android
    },
    //新版打通H5 校验 server_url（project host）是否通过
    is_verify_success: false,
    initPara: function () {
      var app_js_bridge_default = {
        //is_send:打通失败数据是否由 H5 发送
        is_send: true,
        white_list: [],
        is_mui: false
      };
      if (typeof sd.para.app_js_bridge === 'object') {
        sd.para.app_js_bridge = extend({}, app_js_bridge_default, sd.para.app_js_bridge);
      } else if (sd.para.use_app_track === true || sd.para.app_js_bridge === true || sd.para.use_app_track === 'only') {
        if (sd.para.use_app_track_is_send === false || sd.para.use_app_track === 'only') {
          app_js_bridge_default.is_send = false;
        }
        sd.para.app_js_bridge = extend({}, app_js_bridge_default);
      } else if (sd.para.use_app_track === 'mui') {
        app_js_bridge_default.is_mui = true;
        sd.para.app_js_bridge = extend({}, app_js_bridge_default);
      }
      if (sd.para.app_js_bridge.is_send === false) {
        sd.log('设置了 is_send:false,如果打通失败，数据将被丢弃！');
      }
    },
    //初始化是否打通
    initState: function () {
      function checkProjectAndHost(appUrl) {
        function getHostNameAndProject(url) {
          var obj = {
            hostname: '',
            project: ''
          };
          try {
            obj.hostname = _URL(url).hostname;
            obj.project = _URL(url).searchParams.get('project') || 'default';
          } catch (e) {
            sd.log(e);
          }
          return obj;
        }
        var appObj = getHostNameAndProject(appUrl);
        var H5Obj = getHostNameAndProject(sd.para.server_url);
        if (appObj.hostname === H5Obj.hostname && appObj.project === H5Obj.project) {
          return true;
        } else {
          if (sd.para.app_js_bridge.white_list.length > 0) {
            for (var i = 0; i < sd.para.app_js_bridge.white_list.length; i++) {
              var urlobj = getHostNameAndProject(sd.para.app_js_bridge.white_list[i]);
              if (urlobj.hostname === appObj.hostname && urlobj.project === appObj.project) {
                return true;
              }
            }
          }
        }
        return false;
      }

      if (isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui) {
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) {
          if (checkProjectAndHost(window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url)) {
            sd.bridge.is_verify_success = true;
          }
        } else if (isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track) {
          var app_server_url = window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url();
          if (app_server_url) {
            if (checkProjectAndHost(app_server_url)) {
              sd.bridge.is_verify_success = true;
            }
          }
        }
      }

      this.bridge_info = this.initDefineBridgeInfo();
    },
    initDefineBridgeInfo: function () {
      var resultObj = {
        touch_app_bridge: true,
        verify_success: false,
        platform: ''
      };

      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage && isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) {
        resultObj.platform = 'ios';
        if (sd.bridge.is_verify_success) {
          resultObj.verify_success = 'success';
        } else {
          resultObj.verify_success = 'fail';
        }
      } else if (isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track) {
        resultObj.platform = 'android';
        if (sd.bridge.is_verify_success) {
          resultObj.verify_success = 'success';
        } else {
          resultObj.verify_success = 'fail';
        }
      } else if (typeof SensorsData_APP_JS_Bridge === 'object' && ((SensorsData_APP_JS_Bridge.sensorsdata_verify && SensorsData_APP_JS_Bridge.sensorsdata_visual_verify) || SensorsData_APP_JS_Bridge.sensorsdata_track)) {
        resultObj.platform = 'android';
        if (SensorsData_APP_JS_Bridge.sensorsdata_verify && SensorsData_APP_JS_Bridge.sensorsdata_visual_verify) {
          if (SensorsData_APP_JS_Bridge.sensorsdata_visual_verify(JSON.stringify({ server_url: sd.para.server_url }))) {
            resultObj.verify_success = 'success';
          } else {
            resultObj.verify_success = 'fail';
          }
        } else {
          resultObj.verify_success = 'success';
        }
      } else if ((/sensors-verify/.test(navigator.userAgent) || /sa-sdk-ios/.test(navigator.userAgent)) && !window.MSStream) {
        resultObj.platform = 'ios';
        if (sd.bridge.iOS_UA_bridge()) {
          resultObj.verify_success = 'success';
        } else {
          resultObj.verify_success = 'fail';
        }
      } else {
        resultObj.touch_app_bridge = false;
      }

      return resultObj;
    },
    iOS_UA_bridge: function () {
      if (/sensors-verify/.test(navigator.userAgent)) {
        var match = navigator.userAgent.match(/sensors-verify\/([^\s]+)/);
        if (match && match[0] && typeof match[1] === 'string' && match[1].split('?').length === 2) {
          match = match[1].split('?');
          var hostname = null;
          var project = null;
          try {
            hostname = _URL(sd.para.server_url).hostname;
            project = _URL(sd.para.server_url).searchParams.get('project') || 'default';
          } catch (e) {
            sd.log(e);
          }
          if (hostname && hostname === match[0] && project && project === match[1]) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else if (/sa-sdk-ios/.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    },
    dataSend: function (requestData, that, callback) {
      function checkURL(originData) {
        var data = JSON.stringify(extend({ server_url: sd.para.server_url }, originData));
        data = data.replaceAll(/\r\n/g, '');
        data = encodeURIComponent(data);
        return 'sensorsanalytics://trackEvent?event=' + data;
      }
      var originData = requestData.data;
      // 打通app传数据给app
      if (isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui) {
        //如果有新版，优先用新版
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage && isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) {
          if (sd.bridge.is_verify_success) {
            window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify({ callType: 'app_h5_track', data: extend({ server_url: sd.para.server_url }, originData) }));
            typeof callback === 'function' && callback();
          } else {
            if (sd.para.app_js_bridge.is_send) {
              sd.debug.apph5({
                data: originData,
                step: '4.1',
                output: 'all'
              });
              that.prepareServerUrl(requestData);
            } else {
              typeof callback === 'function' && callback();
            }
          }
        } else if (isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track) {
          if (sd.bridge.is_verify_success) {
            SensorsData_APP_New_H5_Bridge.sensorsdata_track(JSON.stringify(extend({ server_url: sd.para.server_url }, originData)));
            typeof callback === 'function' && callback();
          } else {
            if (sd.para.app_js_bridge.is_send) {
              sd.debug.apph5({
                data: originData,
                step: '4.2',
                output: 'all'
              });
              that.prepareServerUrl(requestData);
            } else {
              typeof callback === 'function' && callback();
            }
          }
        } else if (typeof SensorsData_APP_JS_Bridge === 'object' && (SensorsData_APP_JS_Bridge.sensorsdata_verify || SensorsData_APP_JS_Bridge.sensorsdata_track)) {
          // 如果有新版方式，优先用新版
          if (SensorsData_APP_JS_Bridge.sensorsdata_verify) {
            // 如果校验通过则结束，不通过则降级改成h5继续发送
            if (!SensorsData_APP_JS_Bridge.sensorsdata_verify(JSON.stringify(extend({ server_url: sd.para.server_url }, originData)))) {
              if (sd.para.app_js_bridge.is_send) {
                sd.debug.apph5({
                  data: originData,
                  step: '3.1',
                  output: 'all'
                });
                that.prepareServerUrl(requestData);
              } else {
                typeof callback === 'function' && callback();
              }
            } else {
              typeof callback === 'function' && callback();
            }
          } else {
            SensorsData_APP_JS_Bridge.sensorsdata_track(JSON.stringify(extend({ server_url: sd.para.server_url }, originData)));
            typeof callback === 'function' && callback();
          }
        } else if ((/sensors-verify/.test(navigator.userAgent) || /sa-sdk-ios/.test(navigator.userAgent)) && !window.MSStream) {
          var iframe = null;
          if (sd.bridge.iOS_UA_bridge()) {
            iframe = document.createElement('iframe');
            var newurl = checkURL(originData);
            iframe.setAttribute('src', newurl);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
            typeof callback === 'function' && callback();
          } else {
            if (sd.para.app_js_bridge.is_send) {
              sd.debug.apph5({
                data: originData,
                step: '3.2',
                output: 'all'
              });
              that.prepareServerUrl(requestData);
            } else {
              typeof callback === 'function' && callback();
            }
          }
        } else {
          if (isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_send === true) {
            sd.debug.apph5({
              data: originData,
              step: '2',
              output: 'all'
            });
            that.prepareServerUrl(requestData);
          } else {
            typeof callback === 'function' && callback();
          }
        }
      } else if (isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_mui) {
        if (isObject(window.plus) && window.plus.SDAnalytics && window.plus.SDAnalytics.trackH5Event) {
          window.plus.SDAnalytics.trackH5Event(requestData);
          typeof callback === 'function' && callback();
        } else {
          if (isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_send === true) {
            that.prepareServerUrl(requestData);
          } else {
            typeof callback === 'function' && callback();
          }
        }
      } else {
        sd.debug.apph5({
          data: originData,
          step: '1',
          output: 'code'
        });
        that.prepareServerUrl(requestData);
      }
    },
    app_js_bridge_v1: function () {
      var app_info = null;
      var todo = null;
      function setAppInfo(data) {
        app_info = data;
        if (isJSONString(app_info)) {
          app_info = JSON.parse(app_info);
        }
        if (todo) {
          todo(app_info);
          todo = null;
          app_info = null;
        }
      }
      //android
      function getAndroid() {
        if (typeof window.SensorsData_APP_JS_Bridge === 'object' && window.SensorsData_APP_JS_Bridge.sensorsdata_call_app) {
          app_info = SensorsData_APP_JS_Bridge.sensorsdata_call_app();
          if (isJSONString(app_info)) {
            app_info = JSON.parse(app_info);
          }
        }
      }
      //ios
      window.sensorsdata_app_js_bridge_call_js = function (data) {
        setAppInfo(data);
      };
      // 通知iOS
      function calliOS() {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
          var iframe = document.createElement('iframe');
          iframe.setAttribute('src', 'sensorsanalytics://getAppInfo');
          document.documentElement.appendChild(iframe);
          iframe.parentNode.removeChild(iframe);
          iframe = null;
        }
      }
      sd.getAppStatus = function (func) {
        calliOS();
        //先获取能直接取到的安卓，ios是异步的不需要操作
        getAndroid();
        // 不传参数，直接返回数据
        if (!func) {
          return app_info;
        } else {
          //如果传参数，保存参数。如果有数据直接执行，没数据时保存
          if (app_info === null) {
            todo = func;
          } else {
            func(app_info);
            app_info = null;
          }
        }
      };
    },
    //init中调用，初始化接收app数据的通道，根据数据的type将数据分发到相应模块
    supportAppCallJs: function () {
      window.sensorsdata_app_call_js = function (type, data) {
        if (type in window.sensorsdata_app_call_js.modules) {
          return window.sensorsdata_app_call_js.modules[type](data);
        }
      };
      window.sensorsdata_app_call_js.modules = {};
    }
  };
  /**
   * 通过JSBridge创建业务的通道实例
   * @param {*} obj 实例参数
   * @param {*} obj.type 业务名称，作为和App通信的callType
   * @param {*} obj.app_call_js 接收和处理App数据的方法
   */
  var JSBridge = function (obj) {
    this.list = {};
    this.type = obj.type;
    this.app_call_js = isFunction(obj.app_call_js) ? obj.app_call_js : function () {};
    this.init();
  };
  //创建该业务接收App数据的模块，接收App数据
  JSBridge.prototype.init = function () {
    var that = this;
    if (!window.sensorsdata_app_call_js.modules[this.type]) {
      window.sensorsdata_app_call_js.modules[this.type] = function (data) {
        return that.app_call_js(data);
      };
    }
  };
  //JS发送数据给App
  JSBridge.prototype.jsCallApp = function (data) {
    var appData = {
      callType: this.type,
      data: data
    };
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
      window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(appData));
    } else if (isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app) {
      window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app(JSON.stringify(appData));
    } else {
      sd.log('数据发往App失败，App没有暴露bridge');
      return false;
    }
  };
  //调用方法主动向App获取数据
  JSBridge.prototype.getAppData = function () {
    if (isObject(window.SensorsData_APP_New_H5_Bridge)) {
      if (isFunction(window.SensorsData_APP_New_H5_Bridge[this.type])) {
        return window.SensorsData_APP_New_H5_Bridge[this.type]();
      } else {
        return window.SensorsData_APP_New_H5_Bridge[this.type];
      }
    } else if (isObject(window.SensorsData_APP_JS_Bridge)) {
      //兼容Android 老版本打通
      if (isFunction(window.SensorsData_APP_JS_Bridge[this.type])) {
        return window.SensorsData_APP_JS_Bridge[this.type]();
      }
    }
  };
  //检查App端双向通道方法是否暴露
  JSBridge.prototype.hasAppBridge = function () {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
      return 'ios';
    } else if (isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app) {
      return 'android';
    } else {
      sd.log('App端bridge未暴露');
      return false;
    }
  };
  /**
   * 双向通道，JS发送数据请求给App，可以设置超时时间与回调
   * @param {*} obj
   * {
   *   data:{},                             //Object，传输给 App 的数据
   *   callback:function(data){},               //Function,App返回响应数据执行的回调
   *   timeout:{
   *      time:2000,                        //可选参数，App响应的超时时间，超时未响应执行timeout.callback函数
   *      callback:function(){}             //Function,App 未在超时时间内返回响应数据执行的超时回调
   *   }
   * }
   */
  JSBridge.prototype.requestToApp = function (obj) {
    var that = this;
    var data = isObject(obj.data) ? obj.data : {};
    if (!isFunction(obj.callback)) {
      obj.callback = function () {};
    }

    if (isObject(obj.timeout) && isNumber(obj.timeout.time)) {
      if (!isFunction(obj.timeout.callback)) {
        obj.timeout.callback = function () {};
      }
      obj.timer = setTimeout(function () {
        obj.timeout.callback();
        delete that.list[key];
      }, obj.timeout.time);
    }
    function getKey() {
      var d = new Date().getTime().toString(16);
      var m = String(getRandom()).replace('.', '').slice(1, 8);
      return d + '-' + m;
    }
    var key = getKey();
    this.list[key] = obj;
    var appData = {
      callType: this.type,
      data: data
    };
    appData.data.message_id = key;
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
      window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(appData));
    } else if (isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app) {
      window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app(JSON.stringify(appData));
    } else {
      sd.log('数据发往App失败，App没有暴露bridge');
      return false;
    }
  };
  //双向通道，接收App响应，根据message_id执行对应回调
  JSBridge.prototype.double = function (data) {
    if (data.message_id) {
      var message = this.list[data.message_id];
      if (message) {
        if (message.timer) {
          clearTimeout(message.timer);
        }
        message.callback(data);
        delete this.list[data.message_id];
      }
    }
  };

  var vtrackBase = {};
  /**
   * 初始化serverURL、pageUrl。
   * @returns false 初始化失败
   * @returns object url信息解析对象
   */
  vtrackBase.initUrl = function () {
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
    if (!isString(sd.para.server_url)) {
      sd.log('----vcollect---server_url必须为字符串');
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
  vtrackBase.isDiv = function (obj) {
    if (obj.element_path) {
      var pathArr = obj.element_path.split('>');
      var lastPath = trim(pathArr.pop());
      if (lastPath.slice(0, 3) !== 'div') {
        return false;
      }
    }
    return true;
  };

  vtrackBase.configIsMatchNew = function (properties, eventConf) {
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
  vtrackBase.configIsMatch = function (properties, eventConf) {
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
  vtrackBase.configIsMatchOldVersion = function (properties, eventConf) {
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
      if (sd.vtrackBase.isDiv({ element_path: eventConf.element_path })) {
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
  vtrackBase.filterConfig = function (data, events, page_url) {
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
      each(events, function (item) {
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
  vtrackBase.getPropElInLi = function (li, list_selector) {
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
  vtrackBase.getProp = function (propConf, data) {
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
  vtrackBase.getAssignConfigs = function (func, config) {
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

    each(config.events, function (event) {
      if (isObject(event) && isObject(event.event) && event.event.url_host === url_info.page_url.host && event.event.url_path === url_info.page_url.pathname) {
        if (func(event)) {
          arr.push(event);
        }
      }
    });

    return arr;
  };

  //添加 web 可视化、h5 可视化（打通）属性
  vtrackBase.addCustomProps = function (data) {
    //打通需要添加h5可视化属性
    if (sd.bridge.bridge_info.verify_success === 'success') {
      var h5_props = sd.vapph5collect.customProp.geth5Props(JSON.parse(JSON.stringify(data)));
      if (isObject(h5_props) && !isEmptyObject(h5_props)) {
        data.properties = extend(data.properties, h5_props);
      }
    }

    //获取可视化自定义属性，可视化自定义属性优先级最高
    var props = sd.vtrackcollect.customProp.getVtrackProps(JSON.parse(JSON.stringify(data)));
    if (isObject(props) && !isEmptyObject(props)) {
      data.properties = extend(data.properties, props);
    }
    return data;
  };

  //初始化 web 可视化、h5 可视化（打通）采集模式
  vtrackBase.init = function () {
    //初始化可视化采集模式
    sd.vtrackcollect.init();

    //打通初始化内嵌h5可视化采集模式
    if (sd.bridge.bridge_info.verify_success === 'success') {
      sd.vapph5collect.init();
    }
  };

  var unlimitedDiv = {
    events: [],
    init: function (data) {
      this.filterWebClickEvents(data);
    },
    filterWebClickEvents: function (data) {
      this.events = sd.vtrackcollect.getAssignConfigs(function (event) {
        if (isObject(event) && event.event.unlimited_div === true && event.event_type === 'webclick') {
          return true;
        } else {
          return false;
        }
      }, data);
    },
    isTargetEle: function (ele) {
      var prop = sd.heatmap.getEleDetail(ele);

      if (!isObject(prop) || !isString(prop.$element_path)) {
        return false;
      }

      for (var i = 0; i < this.events.length; i++) {
        if (isObject(this.events[i]) && isObject(this.events[i].event) && sd.vtrackcollect.configIsMatch(prop, this.events[i].event)) {
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
    collectAble: function () {
      return this.configSwitch && isObject(sd.para.heatmap) && sd.para.heatmap.get_vtrack_config;
    },
    updateEvents: function (data) {
      this.events = sd.vtrackcollect.getAssignConfigs(function (event) {
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
    getVtrackProps: function (data) {
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
    clickCustomPropMaker: function (data, events, configs) {
      var _this = this;
      configs = configs || this.filterConfig(data, events, sd.vtrackcollect.url_info.page_url);
      var props = {};
      if (!configs.length) {
        return {};
      }
      each(configs, function (config) {
        if (isArray(config.properties) && config.properties.length > 0) {
          each(config.properties, function (propConf) {
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
    initUrl: function () {
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
    init: function () {
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
        var data = sd.store.readObjectVal(this.storage_name);
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
    serverUrlIsSame: function (obj) {
      if (!isObject(obj)) {
        return false;
      }
      if (obj.host === this.url_info.server_url.host && obj.project === this.url_info.server_url.project) {
        return true;
      }
      return false;
    },
    getConfigFromServer: function () {
      var _this = this;
      var success = function (code, data) {
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
      var error = function (err) {
        _this.update_time = new Date().getTime();
        sd.log('----vtrackcustom----配置拉取失败', err);
        _this.setNextFetch();
      };
      this.sendRequest(success, error);
    },
    //设置更新定时器
    setNextFetch: function (time) {
      var _this = this;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      time = time || this.para.update_interval;
      this.timer = setTimeout(function () {
        _this.getConfigFromServer();
      }, time);
    },
    //页面隐藏停止定时拉取计时器，页面显示时重新计算
    pageStateListenner: function () {
      var _this = this;
      listenPageState({
        visible: function () {
          var time = new Date().getTime();
          var duration = time - _this.update_time;
          if (isNumber(duration) && duration > 0 && duration < _this.para.update_interval) {
            var next_time = _this.para.update_interval - duration;
            _this.setNextFetch(next_time);
          } else {
            _this.getConfigFromServer();
          }
        },
        hidden: function () {
          if (_this.timer) {
            clearTimeout(_this.timer);
            _this.timer = null;
          }
        }
      });
    },
    updateConfig: function (data) {
      if (!isObject(data)) {
        return false;
      }
      this.config = data;
      this.customProp.updateEvents(data);
      this.unlimitedDiv.init(data);
    },
    updateStorage: function (data) {
      if (!this.storageEnable) {
        return false;
      }
      if (!isObject(data)) {
        return false;
      }
      var server_url;
      if (!this.url_info.server_url) {
        var urlinfo = sd.vtrackcollect.initUrl();
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
      sd.store.saveObjectVal(this.storage_name, obj);
    },
    sendRequest: function (suc, err) {
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
        success: function (code, data) {
          suc(code, data);
        },
        error: function (error) {
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

  //vapph5自定义属性功能
  var vapph5CustomProp = {
    events: [],
    getAssignConfigs: vtrackBase.getAssignConfigs,
    filterConfig: vtrackBase.filterConfig,
    getProp: vtrackBase.getProp,
    initUrl: vtrackBase.initUrl,
    updateEvents: function (events) {
      if (!isArray(events)) {
        return;
      }
      // console.log('vapph5prop filter result:',configs);
      this.events = events;
    },
    init: function () {
      this.initAppGetPropsBridge();
    },
    //获取打通可视化属性
    geth5Props: function (data) {
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
          each(events, function (event) {
            if (!isObject(event)) {
              return;
            }
            if (isArray(event.properties) && event.properties.length > 0) {
              each(event.properties, function (propConf) {
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
          if (isObject(window.SensorsData_App_Visual_Bridge) && window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode && (window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode === true || window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode())) {
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
    initAppGetPropsBridge: function () {
      var that = this;
      return new sd.JSBridge({
        type: 'getJSVisualProperties',
        app_call_js: function (data) {
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
                each(confs, function (propConf) {
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
            var mes = {
              callType: 'getJSVisualProperties',
              data: props
            };
            if (isObject(data) && data.message_id) {
              mes.message_id = data.message_id;
            }
            if (isObject(window.SensorsData_APP_New_H5_Bridge) && isFunction(SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app)) {
              // console.log('android --- props result js_call_app:',JSON.stringify(mes));
              SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app(JSON.stringify(mes));
            } else if (isObject(window.SensorsData_APP_JS_Bridge) && isFunction(SensorsData_APP_JS_Bridge.sensorsdata_js_call_app)) {
              //兼容Android 老版本打通
              SensorsData_APP_JS_Bridge.sensorsdata_js_call_app(JSON.stringify(mes));
            }
          }
          //ios直接return
          return props;
        }
      });
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
    init: function () {
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
    initAppUpdateConfigBridge: function () {
      var _this = this;
      return new sd.JSBridge({
        type: 'updateH5VisualConfig',
        app_call_js: function (data) {
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
        }
      });
    },

    /**
     * get config from App
     * return undefined / events[]
     */
    getConfigFromApp: function () {
      var bridge = new sd.JSBridge({
        type: 'sensorsdata_get_app_visual_config'
      });
      var result = bridge.getAppData();
      // console.log('sensorsdata_get_app_visual_config result:' + result);
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
    updateConfigs: function (config) {
      this.events = this.filterConfigs(config);
      // console.log('vapph5define updateConfig',this.events);
      this.customProp.updateEvents(this.events);
    },
    //筛选出当前页面的events return[]
    filterConfigs: function (config) {
      return this.getAssignConfigs(function (event) {
        if (isObject(event) && event.h5 !== false) {
          return true;
        } else {
          return false;
        }
      }, config);
    }
  };

  function addSinglePageEvent(callback) {
    var current_url = location.href;
    var historyPushState = window.history.pushState;
    var historyReplaceState = window.history.replaceState;

    //调用方法导致的url切换
    if (isFunction(window.history.pushState)) {
      window.history.pushState = function () {
        historyPushState.apply(window.history, arguments);
        callback(current_url);
        current_url = location.href;
      };
    }

    if (isFunction(window.history.replaceState)) {
      window.history.replaceState = function () {
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

    addEvent(window, singlePageEvent, function () {
      callback(current_url);
      current_url = location.href;
    });
  }

  var spa = new EventEmitter();

  var ee = {};
  ee.spa = spa;
  ee.initSystemEvent = function () {
    addSinglePageEvent(function (url) {
      spa.emit('switch', url);
    });
  };

  function getFlagValue(param) {
    var result = null;
    var reg = new RegExp(param + '=([^&#]+)');
    try {
      var nameParams = JSON.parse(window.name);
      each(nameParams, function (val, key) {
        if (param === key) {
          result = decodeURIComponent(val);
        }
      });
    } catch (e) {
      result = null;
    }
    if (result === null) {
      var matchs = location.href.match(reg);
      if (matchs && matchs[0] && matchs[1]) {
        result = _decodeURIComponent(matchs[1]);
      }
    }
    return result;
  }

  var heatmapMode = {
    getOriginalUrl: function () {
      var url = location.protocol + '//' + location.host + location.pathname;
      var search_params = '';
      var hash_params = '';

      function getParam(str) {
        var params = str.split('&');
        var sa_params = ['sa-request-id', 'sa-request-type', 'sa-request-url'];
        var new_params = [];
        each(params, function (param) {
          if (sa_params.indexOf(param.split('=')[0]) < 0) {
            new_params.push(param);
          }
        });
        return new_params.join('&');
      }
      if (location.search) {
        var _params = getParam(location.search.slice(1));
        if (_params) {
          search_params = '?' + _params;
        }
      }
      if (location.hash) {
        hash_params = location.hash;
        if (location.hash.indexOf('?') > -1) {
          var hashs = location.hash.split('?');
          var hashParams = getParam(hashs[1]);
          if (hashParams) {
            hash_params = hashs[0] + '?' + hashParams;
          }
        }
      }

      return decodeURI(url + search_params + hash_params);
    },
    isSeachHasKeyword: function () {
      if (getFlagValue('sa-request-id') !== null) {
        if (typeof sessionStorage.getItem('sensors-visual-mode') === 'string') {
          sessionStorage.removeItem('sensors-visual-mode');
        }
        return true;
      } else {
        return false;
      }
    },
    hasKeywordHandle: function () {
      var id = getFlagValue('sa-request-id');
      var type = getFlagValue('sa-request-type');
      var web_url = getFlagValue('sa-request-url');
      heatmap.setNotice(web_url);
      if (_sessionStorage.isSupport()) {
        if (web_url !== null) {
          sessionStorage.setItem('sensors_heatmap_url', web_url);
        }
        sessionStorage.setItem('sensors_heatmap_id', id);
        if (type !== null) {
          if (type === '1' || type === '2' || type === '3') {
            sessionStorage.setItem('sensors_heatmap_type', type);
          } else {
            type = null;
          }
        } else {
          if (sessionStorage.getItem('sensors_heatmap_type') !== null) {
            type = sessionStorage.getItem('sensors_heatmap_type');
          } else {
            type = null;
          }
        }
      }

      this.isReady(id, type, this.getOriginalUrl());
    },
    isReady: function (data, type, url) {
      if (sd.para.heatmap_url) {
        loadScript({
          success: function () {
            setTimeout(function () {
              if (typeof sa_jssdk_heatmap_render !== 'undefined') {
                //eslint-disable-next-line
                sa_jssdk_heatmap_render(sd, data, type, url);
                if (typeof console === 'object' && typeof console.log === 'function') {
                  if (!(sd.heatmap_version && sd.heatmap_version === sd.lib_version)) {
                    console.log('heatmap.js与sensorsdata.js版本号不一致，可能存在风险!');
                  }
                }
              }
            }, 0);
          },
          error: function () {},
          type: 'js',
          url: sd.para.heatmap_url
        });
      } else {
        sd.log('没有指定heatmap_url的路径');
      }
    },
    isStorageHasKeyword: function () {
      return _sessionStorage.isSupport() && typeof sessionStorage.getItem('sensors_heatmap_id') === 'string';
    },
    storageHasKeywordHandle: function () {
      heatmap.setNotice();
      heatmapMode.isReady(sessionStorage.getItem('sensors_heatmap_id'), sessionStorage.getItem('sensors_heatmap_type'), this.getOriginalUrl());
    }
  };

  var vtrackMode = {
    isStorageHasKeyword: function () {
      return _sessionStorage.isSupport() && typeof sessionStorage.getItem('sensors-visual-mode') === 'string';
    },
    isSearchHasKeyword: function () {
      if (getFlagValue('sa-visual-mode') === true || getFlagValue('sa-visual-mode') === 'true') {
        if (typeof sessionStorage.getItem('sensors_heatmap_id') === 'string') {
          sessionStorage.removeItem('sensors_heatmap_id');
        }
        return true;
      } else {
        return false;
      }
    },
    loadVtrack: function () {
      loadScript({
        success: function () {},
        error: function () {},
        type: 'js',
        url: sd.para.vtrack_url ? sd.para.vtrack_url : location.protocol + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/vtrack.min.js'
        // url: '../vtrack.full.js'
      });
    },
    messageListener: function (event) {
      function validUrl(value) {
        if (isHttpUrl(value)) {
          return removeScriptProtocol(value);
        } else {
          sd.log('可视化模式检测 URL 失败');
          return false;
        }
      }

      if (event.data.source !== 'sa-fe') {
        return false;
      }
      if (event.data.type === 'v-track-mode') {
        if (event.data.data && event.data.data.isVtrack) {
          if (_sessionStorage.isSupport()) {
            sessionStorage.setItem('sensors-visual-mode', 'true');
          }
          // 如果 iframe 链接包含 sa-visual-mode=true 则根据 message 还原原始url
          if (event.data.data.userURL && location.href.match(/sa-visual-mode=true/)) {
            var valid_url = validUrl(event.data.data.userURL);
            if (valid_url) {
              window.location.href = valid_url;
            }
          } else {
            vtrackMode.loadVtrack();
          }
        }
        window.removeEventListener('message', vtrackMode.messageListener, false);
      }
    },
    removeMessageHandle: function () {
      if (window.removeEventListener) {
        window.removeEventListener('message', vtrackMode.messageListener, false);
      }
    },
    verifyVtrackMode: function () {
      if (window.addEventListener) {
        window.addEventListener('message', vtrackMode.messageListener, false);
      }
      vtrackMode.postMessage();
    },
    postMessage: function () {
      if (window.parent && window.parent.postMessage) {
        window.parent.postMessage(
          {
            source: 'sa-web-sdk',
            type: 'v-is-vtrack',
            data: {
              sdkversion: '1.22.7'
            }
          },
          '*'
        );
      }
    },
    notifyUser: function () {
      var fn = function (event) {
        if (event.data.source !== 'sa-fe') {
          return false;
        }
        if (event.data.type === 'v-track-mode') {
          if (event.data.data && event.data.data.isVtrack) {
            alert('当前版本不支持，请升级部署神策数据治理');
          }
          window.removeEventListener('message', fn, false);
        }
      };
      if (window.addEventListener) {
        window.addEventListener('message', fn, false);
      }
      vtrackMode.postMessage();
    }
  };

  function defineMode(isLoaded) {
    var bridgeObj = sd.bridge.bridge_info;
    function getAndPostDebugInfo() {
      var arr = [];
      if (!bridgeObj.touch_app_bridge) {
        //App 没有开启打通
        arr.push(sd.debug.defineMode('1'));
      }
      if (!isObject(sd.para.app_js_bridge)) {
        //H5 没有开启打通
        arr.push(sd.debug.defineMode('2'));
        //H5 没有开启打通verify_success也会是fail ，为了防止干扰defineMode(4)，这里置为false
        bridgeObj.verify_success = false;
      }
      if (!(isObject(sd.para.heatmap) && sd.para.heatmap.clickmap == 'default')) {
        //H5 没有开启全埋点
        arr.push(sd.debug.defineMode('3'));
      }
      if (bridgeObj.verify_success === 'fail') {
        //校验失败
        arr.push(sd.debug.defineMode('4'));
      }
      var data = {
        callType: 'app_alert',
        data: arr
      };

      if (SensorsData_App_Visual_Bridge && SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info) {
        SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info(JSON.stringify(data));
      } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
        window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(data));
      }
    }

    if (isObject(window.SensorsData_App_Visual_Bridge) && window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode && (window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode === true || window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode())) {
      if (isObject(sd.para.heatmap) && sd.para.heatmap.clickmap == 'default') {
        if (isObject(sd.para.app_js_bridge) && bridgeObj.verify_success === 'success') {
          if (!isLoaded) {
            var protocol = location.protocol;
            var protocolArr = ['http:', 'https:'];
            protocol = indexOf(protocolArr, protocol) > -1 ? protocol : 'https:';
            loadScript({
              success: function () {
                setTimeout(function () {
                  if (typeof sa_jssdk_app_define_mode !== 'undefined') {
                    sa_jssdk_app_define_mode(sd, isLoaded);
                  }
                }, 0);
              },
              error: function () {},
              type: 'js',
              url: protocol + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/vapph5define.min.js'
              // url:'../vapph5define.full.js'
            });
          } else {
            sa_jssdk_app_define_mode(sd, isLoaded);
          }
        } else {
          //打通失败弹框debug信息传给App
          getAndPostDebugInfo();
        }
      } else {
        //未开启全埋点弹框
        getAndPostDebugInfo();
      }
    }
  }

  function listenSinglePage() {
    if (sd.para.is_track_single_page) {
      spa.on('switch', function (last_url) {
        var sendData = function (extraData) {
          extraData = extraData || {};
          if (last_url !== location.href) {
            pageInfo.pageProp.referrer = getURL(last_url);
            sd.quick('autoTrack', extend({ $url: getURL(), $referrer: getURL(last_url) }, extraData));
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
      each(sd._q, function (content) {
        sd[content[0]].apply(sd, Array.prototype.slice.call(content[1]));
      });
    }

    //进入热力图采集模式
    if (isObject(sd.para.heatmap)) {
      heatmap.initHeatmap();
      heatmap.initScrollmap();
    }
  }

  function trackMode() {
    sd.readyState.setState(3);

    new sd.JSBridge({
      type: 'visualized',
      app_call_js: function () {
        if (typeof sa_jssdk_app_define_mode !== 'undefined') {
          defineMode(true);
        } else {
          defineMode(false);
        }
      }
    });

    defineMode(false);

    sd.bridge.app_js_bridge_v1();
    // 初始化referrer等页面属性 1.6
    pageInfo.initPage();

    // 单页面切换事件监听
    listenSinglePage();

    // 支持localstorage且开启了batch_send
    if (!sd.para.app_js_bridge && sd.para.batch_send && _localStorage.isSupport()) {
      sd.batchSend.batchInterval();
    }
    // 初始化distinct_id
    sd.store.init();

    //web 可视化、h5 可视化（打通）采集初始化
    sd.vtrackBase.init();

    sd.readyState.setState(4);

    //sd.noticePluginIsReady();

    // 判断进入全埋点模式
    enterFullTrack();
  }

  function detectMode() {
    // 通过检查参数，判断是否是点击图模式
    if (heatmapMode.isSeachHasKeyword()) {
      // iframe 及 原页面打开的第一个窗口， url 或 window.name 有相关参数
      heatmapMode.hasKeywordHandle();
    } else if (window.parent !== self && vtrackMode.isSearchHasKeyword()) {
      vtrackMode.verifyVtrackMode();
    } else if (heatmapMode.isStorageHasKeyword()) {
      // 原页面查看中跳转到其他页面，仅判断 sessionStorage 有相关参数
      heatmapMode.storageHasKeywordHandle();
    } else if (window.parent !== self && vtrackMode.isStorageHasKeyword()) {
      vtrackMode.verifyVtrackMode();
    } else {
      trackMode();
      vtrackMode.notifyUser();
    }
  }

  var methods = ['setItem', 'deleteItem', 'getAppStatus', 'track', 'quick', 'register', 'registerPage', 'registerOnce', 'trackSignup', 'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'trackLink', 'clearAllRegister', 'clearPageRegister'];

  function checkState() {
    each(methods, function (method) {
      var oldFunc = sd[method];
      sd[method] = function () {
        if (sd.readyState.state < 3) {
          if (!isArray(sd._q)) {
            sd._q = [];
          }
          sd._q.push([method, arguments]);
          return false;
        }
        if (!sd.readyState.getState()) {
          try {
            console.error('请先初始化神策JS SDK');
          } catch (e) {
            sd.log(e);
          }
          return;
        }
        return oldFunc.apply(sd, arguments);
      };
    });
  }

  var saEmpty = {
      track: function (e, p, c) { },
      quick: function (name, p, t, c) { },
      register: function (obj) { },
      registerPage: function (obj) { },
      registerOnce: function (obj) { },
      clearAllRegister: function (arr) { },
      trackSignup: function (id, e, p, c) { },
      setProfile: function (prop, c) { },
      setOnceProfile: function (prop, c) { },
      appendProfile: function (prop, c) { },
      incrementProfile: function (prop, c) { },
      deleteProfile: function (c) { },
      unsetProfile: function (prop, c) { },
      identify: function (id, isSave) { },
      login: function (id, callback) { },
      logout: function (isChangeId) { },
      trackLink: function (link, event_name, event_prop) { },
      deleteItem: function (type, id) { },
      setItem: function (type, id, p) { },
      getAppStatus: function (func) { },
      clearPageRegister: function (arr) { }
  };

  function CancelationToken(canceled) {
    this.cancel = function () {
      canceled = true;
    };
    this.getCanceled = function () {
      return canceled || false;
    };
  }

  function InterceptorContext(data, pos, sd) {
    var originalData = null;
    try {
      originalData = JSON.parse(JSON.stringify(data));
    } catch (e) {
      sdLog(e);
    }
    this.getOriginalData = function () {
      return originalData;
    };
    this.getPosition = function () {
      return pos;
    };
    this.cancelationToken = new CancelationToken();
    this.sensors = sd;
  }

  function Stage(processDef) {
    if (!isObject(processDef)) {
      throw 'error: Stage constructor requires arguments.';
    }
    this.processDef = processDef;
    this.registeredInterceptors = {};
  }

  Stage.prototype.process = function (proc, data) {
    if (!proc || !(proc in this.processDef)) {
      sdLog('process [' + proc + '] is not supported');
      return;
    }

    var itcptrs = this.registeredInterceptors[proc];
    if (itcptrs && isArray(itcptrs) && itcptrs.length > 0) {
      var pos = { current: 0, total: itcptrs.length };
      var context = new InterceptorContext(data, pos, sd);

      for (var i = 0; i < itcptrs.length; i++) {
        try {
          pos.current = i + 1;
          data = itcptrs[i].call(null, data, context) || data;
          if (context.cancelationToken.getCanceled()) {
            sdLog('process [' + proc + '] has been canceled.');
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

  Stage.prototype.registerStageImplementation = function (stageImpl) {
    if (!stageImpl || !stageImpl.init || !isFunction(stageImpl.init)) {
      return;
    }
    stageImpl.init(this);
    stageImpl.interceptor && this.registerInterceptor(stageImpl.interceptor);
  };

  Stage.prototype.registerInterceptor = function (interceptor) {
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
        itcptr.priority = 10000000;
      }

      if (!this.registeredInterceptors[i]) {
        this.registeredInterceptors[i] = [];
      }

      var curIts = this.registeredInterceptors[i];
      var priority = itcptr.priority;
      var entry = itcptr.entry;

      switch (true) {
      case priority <= 0:
        curIts.unshift(entry);
        break;
      case priority >= curIts.length:
        curIts.push(entry);
        break;
      default:
        curIts.splice(priority, 0, entry);
        break;
      }
    }
  };

  var processDef = {
    addCustomProps: null,
    formatData: null
  };

  var dataStage = new Stage(processDef);

  function registerFeature(feature) {
    feature && feature.dataStage && dataStage.registerStageImplementation(feature.dataStage);
  }

  function CoreFeature(sd) {
    sd.kit = kit;
    sd.saEvent = saEvent;
    // assign dataStage for registerFeature to find the dataStage implementation
    this.dataStage = dataStageImpl;
  }

  /**
   * 过滤 properties 中不符合神策格式内容
   *
   * @param { JSON } p properties
   * @return { JSON }
   */
  function strip_sa_properties(p) {
    if (!isObject(p)) {
      return p;
    }
    each(p, function (v, k) {
      // 如果是数组，把值自动转换成string
      if (isArray(v)) {
        var temp = [];
        each(v, function (arrv) {
          if (isString(arrv)) {
            temp.push(arrv);
          } else {
            sdLog('您的数据-', k, v, '的数组里的值必须是字符串,已经将其删除');
          }
        });
        p[k] = temp;
      }
      // 只能是字符串，数字，日期,布尔，数组
      if (!(isString(v) || isNumber(v) || isDate(v) || isBoolean(v) || isArray(v) || isFunction(v) || k === '$option')) {
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
  function filterReservedProperties(obj) {
    var reservedFields = ['distinct_id', 'user_id', 'id', 'date', 'datetime', 'event', 'events', 'first_id', 'original_id', 'device_id', 'properties', 'second_id', 'time', 'users'];
    if (!isObject(obj)) {
      return;
    }
    each(reservedFields, function (key, index) {
      if (!(key in obj)) {
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
      each(o, function (a, b) {
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
  /** 新增
   * setItem/deleteItem 数据格式化
   *
   * @param {*} data
   */
  function formatItem(data) {
    if ('item_type' in data) {
      var item_type = data['item_type'];

      var typeOnComplete = function (status) {
        if (!status) {
          delete data['item_type'];
        }
        return true;
      };

      check({ item_type: item_type }, typeOnComplete);
    }
    if ('item_id' in data) {
      var item_id = data['item_id'];
      var idOnComplete = function (status, val, rule) {
        if (!status && rule === 'string') {
          delete data['item_id'];
        }
        return true;
      };
      check({ item_id: item_id }, idOnComplete);
    }
  }
  /**
   * 格式化 properties
   *
   * @param {*} p properties
   */
  function formatProperties(p) {
    each(p, function (val, key) {
      var onComplete = function (status, value, rule_type) {
        if (!status && rule_type !== 'keyLength') {
          delete p[key];
        }
        return true;
      };
      check({ propertyKey: key }, onComplete);
    });
  }
  /**
   * 日志统一格式化
   *
   * @export
   * @param { JSON } data
   */
  function formatData(data) {
    var p = data.properties;

    if (isObject(p)) {
      // 过滤 properties 中不符合神策格式内容
      strip_sa_properties(p);

      // 过滤日志结构 properties 中的保留字段
      filterReservedProperties(p);

      // 兼容灼洲app端做的$project和$token而加的代码
      searchZZAppStyle(data);

      // 格式化 properties
      formatProperties(p);

      // 字符串长度截取
      searchObjString(p);
    } else if ('properties' in data) {
      // 在 properties 不为 JSON 时，将  data.properties 设置为 空JSON
      data.properties = {};
    }

    // 时间格式转换
    searchObjDate(data);

    // setItem/deleteItem 格式化 item_type 及 item_id
    formatItem(data);
  }

  var dataStageImpl$1 = {
    init: function () {},
    interceptor: {
      formatData: {
        priority: 0,
        entry: function (data) {
          formatData(data);
          return data;
        }
      }
    }
  };

  function DataFormatFeature() {
    // assign dataStage for registerFeature to find the dataStage implementation
    this.dataStage = dataStageImpl$1;
  }

  var preCfg = window['sensors_data_pre_config'];
  var is_compliance_enabled = isObject(preCfg) ? preCfg.is_compliance_enabled : false;

  function implementCore(isRealImp) {
    if (isRealImp) {
      logger.setup(sdLog);
      sd._ = extend(W, common);
      sd.ee = ee;
      sd.sendState = sendState;
      sd.events = new sd._.EventEmitterSa();
      sd.batchSend = batchSend;
      sd.bridge = bridge;
      sd.JSBridge = JSBridge;
      sd.store = store;
      sd.vtrackBase = vtrackBase;
      sd.unlimitedDiv = unlimitedDiv;
      sd.customProp = customProp;
      sd.vtrackcollect = vtrackcollect;
      sd.vapph5collect = vapph5collect;
      sd.heatmap = heatmap;
      sd.detectMode = detectMode;
      sd.registerFeature = registerFeature;
      registerFeature(new CoreFeature(sd));
      registerFeature(new DataFormatFeature(sd));
    }

    var imp = isRealImp ? functions : saEmpty;
    for (var f in imp) {
      sd[f] = imp[f];
    }
  }

  sd.init = function (para) {
    // 标志已经init过
    if (sd.readyState && sd.readyState.state && sd.readyState.state >= 2) {
      return false;
    }

    // 启用合规，在init时实现接口
    if (is_compliance_enabled) {
      implementCore(true);
    }

    sd.ee.initSystemEvent();

    sd.setInitVar();
    sd.readyState.setState(2);
    sd.initPara(para);
    sd.bridge.supportAppCallJs();
    sd.detectMode();
    sd.iOSWebClickPolyfill();
  };

  if (is_compliance_enabled) {
    // 启用合规,加载时实现接口为空方法,防止提前调用出错，但不缓存方法调用
    implementCore(false);
  } else {
    // 未启用合规，加载即实现接口
    implementCore(true);
    checkState();
  }

  // 挂载 sdk 对象到 window
  var _sd = sd;
  try {
    sd.modules = {};
    // Do not remove the following line!
    sd.modules['Amp'] = (function () {
  'use strict';

  var amp = {
    sd: null,
    init: function (sd) {
      if (this.sd) {
        return false;
      }
      this.sd = sd;
      if (!(this.sd && this.sd._)) {
        return false;
      }
      var amp_id = this.sd._.cookie.get('sensors_amp_id');
      var distinct_id = this.sd.store._state.distinct_id;
      /**
       * 1、没有 ampid ，直接把 distinctid 设置到 ampid
       * 2、有 ampid ，与 distinctid 一致不需要处理
       * 3、有 ampid ，与 distinctid 不一致，ampid 不是 amp- 开头的，代表 js sdk 写入的，不作处理
       * 4、有 ampid ，与 distinctid 不一致，ampid 是 amp- 开头的（amp 生成的 uuid），需要处理：
       *        a。distinctid 是登录 id，tracksignup 做关联，然后把 ampid 设置为 distinctid。amp 和非 amp 都使用 登录 id 作为 id
       *        b。distinctid 是匿名 id，identify 把 ampid 作为 distinctid。amp 和 非amp 都使用 ampuuid 作为匿名 id
       * 5、每次调用 identify 、 login 导致 id cookie 级的变化时都同步设置 ampid
       */
      if (amp_id && amp_id.length > 0) {
        var isAmpUuid = amp_id.slice(0, 4) === 'amp-' ? true : false;
        if (amp_id !== distinct_id) {
          if (!isAmpUuid) {
            return false;
          }
          if (this.sd.store._state.first_id) {
            this.sd.identify(amp_id, true);
            this.sd.saEvent.send(
              {
                original_id: amp_id,
                distinct_id: distinct_id,
                type: 'track_signup',
                event: '$SignUp',
                properties: {}
              },
              null
            );
            this.setAmpId(distinct_id);
          } else {
            this.sd.identify(amp_id, true);
          }
        }
      } else {
        this.setAmpId(distinct_id);
      }
      this.addListener();
    },
    addListener: function () {
      var that = this;
      //id发生cookie级的变化时更新ampid
      this.sd.events.on('changeDistinctId', function (id) {
        that.setAmpId(id);
      });
      this.sd.events.isReady();
    },
    setAmpId: function (id) {
      this.sd._.cookie.set('sensors_amp_id', id);
    }
  };

  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.Amp = window.SensorsDataWebJSSDKPlugin.Amp || amp;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      Amp: amp
    };
  }

  return amp;

}());

sd.modules['Channel'] = (function () {
  'use strict';

  var _;
  var sd;
  var store;
  var Channel = {
    event_list: [],
    latest_event_initial_time: null,
    max_save_time: 1000 * 60 * 60 * 24 * 30,
    init: function (sa) {
      if (sd) {
        return false;
      }
      sd = sa;
      if (!sd) {
        return false;
      }
      _ = sd._;
      store = sd.store;
      if (!_.localStorage.isSupport()) {
        return false;
      }
      //由于 _sa_channel_landing_url 放开属性长度限制
      sd.para.max_string_length = 1024;
      this.eventList.init();
      this.addLatestChannelUrl();
      this.addIsChannelCallbackEvent();
    },

    addIsChannelCallbackEvent: function () {
      sd.registerPage({
        $is_channel_callback_event: function (data) {
          if (data.event) {
            if (!(data.event === '$WebClick' || data.event === '$pageview' || data.event === '$WebStay' || data.event === '$SignUp')) {
              if (Channel.eventList.hasEvent(data.event)) {
                return false;
              } else {
                Channel.eventList.add(data.event);
                return true;
              }
            }
          }
        }
      });
    },
    addLatestChannelUrl: function () {
      var url_domain = this.getUrlDomain();
      var cookie_prop = this.cookie.getChannel();
      if (url_domain === 'url解析失败') {
        this.registerAndSave({
          _sa_channel_landing_url: '',
          _sa_channel_landing_url_error: 'url的domain解析失败'
        });
      } else if (_.isReferralTraffic(document.referrer)) {
        var channel_sign = _.getQueryParam(location.href, 'sat_cf');
        if (_.isString(channel_sign) && channel_sign.length > 0) {
          this.registerAndSave({
            _sa_channel_landing_url: location.href
          });
          Channel.channelLinkHandler();
        } else {
          this.registerAndSave({
            _sa_channel_landing_url: ''
          });
        }
      } else {
        if (!cookie_prop) {
          sd.registerPage({
            _sa_channel_landing_url: '',
            _sa_channel_landing_url_error: '取值异常'
          });
        } else {
          sd.registerPage(cookie_prop);
        }
      }
    },
    //registerpage 注册为公共属性，并且存在 cookie 里
    registerAndSave: function (prop) {
      sd.registerPage(prop);
      this.cookie.saveChannel(prop);
    },
    cookie: {
      getChannel: function () {
        var value = _.decryptIfNeeded(_.cookie.get('sensorsdata2015jssdkchannel'));

        value = _.safeJSONParse(value);

        return _.isObject(value) && value.prop ? value.prop : false;
      },
      saveChannel: function (obj) {
        var data = {
          prop: obj
        };
        var stateStr = JSON.stringify(data);
        if (sd.para.encrypt_cookie) {
          stateStr = _.encrypt(stateStr);
        }
        _.cookie.set('sensorsdata2015jssdkchannel', stateStr);
      }
    },
    channelLinkHandler: function () {
      this.eventList.reset();
      sd.track('$ChannelLinkReaching');
    },
    getUrlDomain: function () {
      var url_domain = _.info.pageProp.url_domain;
      if (url_domain === '') {
        url_domain = 'url解析失败';
      }
      return url_domain;
    },
    eventList: {
      init: function () {
        var data = this.get();
        var now_time = new Date().getTime();
        if (data && _.isNumber(data.latest_event_initial_time) && _.isArray(data.eventList)) {
          var duration = now_time - data.latest_event_initial_time;
          if (duration > 0 && duration < Channel.max_save_time) {
            Channel.event_list = data.eventList;
            Channel.latest_event_initial_time = data.latest_event_initial_time;
          } else {
            this.reset();
          }
        } else {
          this.reset();
        }
      },
      get: function () {
        var data = {};
        try {
          data = store.readObjectVal('sawebjssdkchannel');
        } catch (error) {
          sd.log(error);
        }
        return data;
      },
      add: function (name) {
        Channel.event_list.push(name);
        this.save();
      },
      save: function () {
        var obj = {
          latest_event_initial_time: Channel.latest_event_initial_time,
          eventList: Channel.event_list
        };
        store.saveObjectVal('sawebjssdkchannel', obj);
      },
      /**
       * 重置 eventlist
       * 1、初次使用，初始化数据
       * 2、解析到新的渠道链接
       * 3、渠道链接 30 日未更新
       * 4、保存的数据出现异常
       */
      reset: function () {
        Channel.event_list = [];
        Channel.latest_event_initial_time = new Date().getTime();
        this.save();
      },
      hasEvent: function (name) {
        var result = false;
        _.each(Channel.event_list, function (item) {
          if (item === name) {
            result = true;
          }
        });
        return result;
      }
    }
  };

  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.SensorsChannel = window.SensorsDataWebJSSDKPlugin.SensorsChannel || Channel;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      SensorsChannel: Channel
    };
  }

  return Channel;

}());

sd.modules['Deeplink'] = (function () {
  'use strict';

  var hidden;
  var isWechat = /micromessenger\/([\d.]+)/i.test(navigator.userAgent || '');
  var getSupportedProperty = function getSupportedProperty() {
    var result = {};

    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      result.hidden = 'hidden';
      result.visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      result.hidden = 'msHidden';
      result.visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      result.hidden = 'webkitHidden';
      result.visibilityChange = 'webkitvisibilitychange';
    }

    return result;
  };

  function isPageHidden() {
    if (typeof hidden === 'undefined') return false;
    return document[hidden];
  }

  hidden = getSupportedProperty().hidden;
  var OSs = {
    android: /Android/i,
    iOS: /iPhone|iPad|iPod/i
  };

  var getOS = function getOS() {
    for (var key in OSs) {
      if (navigator.userAgent.match(OSs[key])) {
        return key;
      }
    }

    return '';
  }; // Only Chrome for android supports app links on Android.
  // const isNativeChrome = () => {
  //   const ua = navigator.userAgent;
  //   return /chrome\/[\d.]+ mobile safari\/[\d.]+/i.test(ua) && ua.indexOf('Version') < 0 && / OPR\/[\d.]+/.test(ua) === false && / SamsungBrowser\/[\d.]+/.test(ua) === false;
  // };


  var currentOS = getOS(); //eslint-disable-next-line

  var isSupportedOS = function isSupportedOS() {
    return OSs.hasOwnProperty(currentOS);
  };
  var isObject = function isObject(obj) {
    if (obj == null) {
      return false;
    } else {
      return Object.prototype.toString.call(obj) == '[object Object]';
    }
  };
  var parseShortURL = function parseShortURL(url) {
    var urlRegexp = /\/sd\/(\w+)\/(\w+)$/;
    return url.match(urlRegexp);
  };
  var parseAPIURL = function parseAPIURL(sd) {
    var urlParts = sd._.URL(sd.para.server_url);

    return {
      origin: urlParts.origin,
      project: urlParts.searchParams.get('project') || 'default'
    };
  };
  var handleAndroidLinks = function handleAndroidLinks(dp,
  /* deepLink, */
  scheme, downloadURL) {
    dp.log('尝试唤起 android app'); //const dest = (isNativeChrome() && deepLink) ? deepLink : scheme;//若app已安装会打开app

    var dest = scheme; // TODO: only schemes are supported at present.

    dp.log('唤起APP的地址：' + dest);
    window.location = dest;
    dp.timer = setTimeout(function () {
      // 如果app未安装会执行这个定时器，否则不会执行
      var pageHidden = isPageHidden();
      dp.log('hide:' + hidden + ':' + document[hidden]);

      if (pageHidden) {
        dp.log('The page is hidden, stop navigating to download page');
        return false;
      }

      dp.log('App可能未安装，跳转到下载地址'); // 跳转至 app 下载页面

      window.location = downloadURL;
    }, dp.timeout);
  };
  var handleIOSLinks = function handleIOSLinks(dp, deepLink, downloadURL) {
    dp.log('尝试唤起 iOS app:' + deepLink);
    window.location.href = deepLink; //若app已安装会打开app

    dp.timer = setTimeout(function () {
      // 如果app未安装会执行这个定时器，否则不会执行
      var pageHidden = isPageHidden();

      if (pageHidden) {
        dp.log('The page is hidden, stop navigating to download page');
        return false;
      }

      dp.log('App可能未安装，跳转到下载地址'); // 跳转至 app 下载页面

      window.location.href = downloadURL;
    }, dp.timeout);
    dp.log('new timer:' + dp.timer);
  };

  var SADeepLink = {
    key: null,
    timer: null,
    sd: null,
    data: null,
    timeout: 2500,
    apiURL: '{origin}/sdk/deeplink/param?key={key}&system_type=JS&project={project}',
    init: function init() {
      if (this.sd) {
        this.log('deeplink已经初始化');
        return false;
      }

      if (isObject(sensorsDataAnalytic201505)) {
        this.sd = sensorsDataAnalytic201505;
      }

      this.log('init()');

      if (this.sd === null) {
        this.log('神策JS SDK未成功引入');
        return false;
      }
      /**
       * 根据参数个数适配不同的引入方式
       * 1、useAppPlugin方式：init(option)
       * 2、sd.use方式：init（sd,option)
       */


      var options = {};

      if (arguments.length > 0) {
        if (arguments.length === 1 && isObject(arguments[0])) {
          options = arguments[0];
        } else if (arguments.length >= 2 && isObject(arguments[1])) {
          options = arguments[1];
        }
      } // 检查当前操作系统是否支持，目前只支持 Android 和 iOS


      if (!isSupportedOS()) {
        this.log('不支持当前系统，目前只支持Android和iOS');
        return false;
      }

      if (isObject(options) && this.sd._.isNumber(options.timeout)) {
        if (options.timeout >= 2500) {
          this.timeout = options.timeout;
        }
      }

      if (!this.sd.para.server_url) {
        this.log('神策JS SDK配置项server_url未正确配置');
        return false;
      }

      var serverInfo = parseAPIURL(this.sd);

      this.apiURL = this.apiURL.replace('{origin}', serverInfo.origin).replace('{project}', serverInfo.project); // 检查落地页 URL 是否含有 deeplink 参数，若无则停止处理

      var deeplinkParam = this.sd._.getQueryParam(window.location.href, 'deeplink');

      if (!deeplinkParam) {
        this.log('当前页面缺少deeplink参数');
        return false;
      } // 检查解码后的 deeplink 参数值是否符合规范，若不符合要求则停止处理


      deeplinkParam = window.decodeURIComponent(deeplinkParam);

      var shortURLParams = parseShortURL(deeplinkParam);

      if (!shortURLParams) {
        this.log('当前页面的deeplink参数无效');
        return false;
      }

      this.key = shortURLParams[2];
      this.apiURL = this.apiURL.replace('{key}', window.encodeURIComponent(shortURLParams[2])); // 从神策服务器查询深层链接信息

      this.sd._.ajax({
        url: this.apiURL,
        type: 'GET',
        cors: true,
        //timeout: 5000,
        credentials: false,
        success: function (data) {
          // 没有找到指定 key 的 deeplink 数据，停止处理
          if (data.errorMsg) {
            SADeepLink.log('API报错：' + data.errorMsg);
            return false;
          }

          SADeepLink.data = data;
          SADeepLink.log('API查询成功，数据：' + JSON.stringify(data, null, '  '));

          if (this.data.app_key) {
            if (this.data.android_info && this.data.android_info.url_schemes) {
              this.data.android_info.url_schemes += '://sensorsdata/sd/' + this.data.app_key + '/' + this.key;
            }

            if (this.data.ios_info && this.data.ios_info.url_schemes) {
              this.data.ios_info.url_schemes += '://sensorsdata/sd/' + this.data.app_key + '/' + this.key;
            }
          }
        }.bind(this),
        error: function error() {
          SADeepLink.log('API查询出错');
        }
      });

      this.addListeners();
    },
    openDeepLink: function openDeepLink() {
      this.log('openDeeplink()');

      if (!this.data) {
        this.log('没有Deep link数据!');
        return false;
      }

      if (currentOS === 'iOS') {
        this.log('当前系统是iOS');
        var appURL = this.sd && this.sd._ && this.sd._.getIOSVersion() >= 9 && this.data.ios_info.ios_wake_url ? this.data.ios_info.ios_wake_url : this.data.ios_info.url_schemes; // TODO, this.data.ios_info.deeplink_url ||
        // const appURL = (_.isWechat && this.data.ios_info.deeplink_url) ? this.data.ios_info.deeplink_url : this.data.ios_info.url_schemes;

        this.log('唤起APP的地址：' + appURL);

        handleIOSLinks(this, appURL, this.data.ios_info.download_url);
      } else {
        this.log('当前系统是 android');

        handleAndroidLinks(this, this.data.android_info.url_schemes, this.data.android_info.download_url);
      }
    },
    log: function log(message) {
      if (this.sd) {
        this.sd.log(message);
      }
    },
    addListeners: function addListeners() {
      var visibilityName = getSupportedProperty().visibilityChange;

      if (visibilityName) {
        document.addEventListener(visibilityName, function () {
          clearTimeout(this.timer);
          this.log('visibilitychange, clear timeout:' + this.timer);
        }.bind(this), false);
      }

      window.addEventListener('pagehide', function () {
        this.log('page hide, clear timeout:' + this.timer);
        clearTimeout(this.timer);
      }.bind(this), false);
    }
  };

  if (!isObject(window.SensorsDataWebJSSDKPlugin)) {
    window.SensorsDataWebJSSDKPlugin = {
      Deeplink: SADeepLink,
      deeplink: SADeepLink
    };
  } else {
    window.SensorsDataWebJSSDKPlugin.Deeplink = window.SensorsDataWebJSSDKPlugin.Deeplink || SADeepLink;
    window.SensorsDataWebJSSDKPlugin.deeplink = window.SensorsDataWebJSSDKPlugin.deeplink || SADeepLink;
  }

  return SADeepLink;

}());

sd.modules['Pageleave'] = (function () {
  'use strict';

  // 防止重复触发页面关闭状态刷新时间
  var page_hidden_status_refresh_time = 5000;

  function PageLeave() {
    this.sd = null;
    // 页面浏览开始时间点。默认：codeStart时间
    this.start_time = +new Date();
    // 页面打开状态。true - 打开状态 (默认) false - 非打开状态
    this.page_show_status = true;
    // 页面关闭状态。true - 关闭状态  false - 非关闭状态(默认)
    this.page_hidden_status = false;
    // 工具类
    this._ = {};
    // 防止重复触发页面关闭Timer
    this.timer = null;
    // 单页面Referrer
    this.current_page_url = document.referrer;
    // 当前页面地址
    this.url = location.href;
    // plugin 运行参数
    this.option = {};
    // 心跳刷新时间, 默认：5000
    this.heartbeat_interval_time = 5000;
    // 心跳Timer
    this.heartbeat_interval_timer = null;
    // 当前页面临时 ID
    this.page_id = null;
    // localStorage 存储 name
    this.storage_name = 'sawebjssdkpageleave';
  }
  /**
   * 页面浏览插件初始化方法
   * @param {String} option
   * @returns 是否初始化成功
   */
  PageLeave.prototype.init = function (sd, option) {
    if (sd) {
      this.sd = sd;
      this._ = this.sd._;
      var _this = this;
      if (option) {
        this.option = option;

        var heartbeat_interval_time = option.heartbeat_interval_time;
        if (heartbeat_interval_time && (this._.isNumber(heartbeat_interval_time) || this._.isNumber(heartbeat_interval_time * 1)) && heartbeat_interval_time * 1 > 0) {
          this.heartbeat_interval_time = heartbeat_interval_time * 1000;
        }
      }

      // 创建页面临时 ID
      this.page_id = Number(String(this._.getRandom()).slice(2, 5) + String(this._.getRandom()).slice(2, 4) + String(new Date().getTime()).slice(-4));
      //创建监听
      // this._.addEvent(window, 'load', function () {
      _this.addEventListener();
      if (document.hidden === true) {
        this.page_show_status = false;
      } else {
        _this.addHeartBeatInterval();
      }
      // })
      this.log('PageLeave初始化完毕');
    } else {
      this.log('神策JS SDK未成功引入');
    }
  };
  /**
   * 打印日志
   * @param {String} message 日志信息
   */
  PageLeave.prototype.log = function (message) {
    if (this.sd) {
      this.sd.log(message);
    }
  };
  /**
   * 刷新页面关闭状态  发送页面浏览事件100ms后刷新
   */
  PageLeave.prototype.refreshPageEndTimer = function () {
    var _this = this;
    // 触发页面展示，清除防止重复触发Timer
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(function () {
      _this.page_hidden_status = false;
    }, page_hidden_status_refresh_time);
  };
  /**
   * 页面展示时修正 page_hidden_statu 为 false
   * 以免防止刷新时间影响 tab 页切换时发送 $WebPageLeave
   */
  PageLeave.prototype.hiddenStatusHandler = function () {
    clearTimeout(this.timer);
    this.timer = null;
    this.page_hidden_status = false;
  };
  /**
   * 页面展示监听处理程序
   */
  PageLeave.prototype.pageStartHandler = function () {
    this.start_time = +new Date();

    if (!document.hidden === true) {
      this.page_show_status = true;
    } else {
      this.page_show_status = false;
    }
    this.url = location.href;
  };
  /**
   * 页面关闭监听处理程序
   */
  PageLeave.prototype.pageEndHandler = function () {
    if (this.page_hidden_status === true) return;

    var data = this.getPageLeaveProperties();
    if (this.page_show_status === false) {
      delete data.event_duration;
    }
    // 切换页面状态
    this.page_show_status = false;
    this.page_hidden_status = true;
    if (this.isCollectUrl(this.url)) {
      this.sd.track('$WebPageLeave', data);
    }

    // 刷新页面关闭状态
    this.refreshPageEndTimer();
    // 删除当前页面心跳记录
    this.delHeartBeatData();
  };
  /**
   * 监听处理器
   */
  PageLeave.prototype.addEventListener = function () {
    // 创建页面展示监听
    this.addPageStartListener();
    // 创建页面 tab 切换监听
    this.addPageSwitchListener();
    // 创建单页面跳转监听
    this.addSinglePageListener();
    // 创建页面关闭监听
    this.addPageEndListener();
  };
  /**
   * 添加页面展示监听
   */
  PageLeave.prototype.addPageStartListener = function () {
    var _this = this;
    if ('onpageshow' in window) {
      this._.addEvent(window, 'pageshow', function () {
        _this.pageStartHandler();
        _this.hiddenStatusHandler();
      });
    }
  };

  // 是否在不包含的 url 内
  PageLeave.prototype.isCollectUrl = function (url) {
    if (typeof this.option.isCollectUrl === 'function') {
      if (typeof url === 'string' && url !== '') {
        return this.option.isCollectUrl(url);
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  /**
   * 添加单页面切换监听
   */
  PageLeave.prototype.addSinglePageListener = function () {
    var _this = this;
    //监测Hash及history跳转 根据单页面自动采集开关控制
    this.sd.ee &&
      this.sd.ee.spa.prepend('switch', function (last_url) {
        //监测Hash及history跳转
        if (last_url !== location.href) {
          // 指定上一个页面地址为pageleave的页面url
          _this.url = last_url;
          // 触发页面关闭
          _this.pageEndHandler();
          // 停止心跳记录及心跳补充
          _this.stopHeartBeatInterval();
          // pageleave发送完毕后，且url发生改变，将referrer切换为改变前的url
          _this.current_page_url = _this.url;
          // 触发页面打开
          _this.pageStartHandler();
          // 修正 page_hidden_status
          _this.hiddenStatusHandler();
          // 显示时，开始心跳记录及心跳补充
          _this.startHeartBeatInterval();
        }
      });
  };
  /**
   * 添加页面关闭监听
   */
  PageLeave.prototype.addPageEndListener = function () {
    var _this = this;
    this._.each(['pagehide', 'beforeunload', 'unload'], function (key) {
      if ('on' + key in window) {
        _this._.addEvent(window, key, function () {
          _this.pageEndHandler();

          // 停止心跳记录及心跳补充
          _this.stopHeartBeatInterval();
        });
      }
    });
  };
  /**
   * 添加页面tab切换监听
   */
  PageLeave.prototype.addPageSwitchListener = function () {
    var _this = this;
    this._.listenPageState({
      visible: function () {
        _this.pageStartHandler();
        // 修正 page_hidden_status
        _this.hiddenStatusHandler();
        // 显示时，开始心跳记录及心跳补充
        _this.startHeartBeatInterval();
      },
      hidden: function () {
        // 切换tab时，为当前页面的关闭，url为当前页面url，referrer为改变前的url
        _this.url = location.href;
        _this.pageEndHandler();
        // 隐藏时，停止心跳记录及心跳补充
        _this.stopHeartBeatInterval();
      }
    });
  };
  /**
   * 循环检测
   */
  PageLeave.prototype.addHeartBeatInterval = function () {
    if (!this._.localStorage.isSupport()) {
      return;
    }
    this.startHeartBeatInterval();
  };
  /**
   * 开启心跳记录及心跳补充
   */
  PageLeave.prototype.startHeartBeatInterval = function () {
    var _this = this;
    // 如已存在心跳循环，则停止后再次启动
    if (this.heartbeat_interval_timer) {
      this.stopHeartBeatInterval();
    }
    // 如果当前页面不匹配规则，则不存储数据
    var COLLECT_URL_STATUS = true;
    if (!this.isCollectUrl(this.url)) {
      COLLECT_URL_STATUS = false;
    }
    this.heartbeat_interval_timer = setInterval(function () {
      // 心跳记录
      COLLECT_URL_STATUS && _this.saveHeartBeatData();
      // 补充数据
      // _this.reissueHeartBeatData();
    }, this.heartbeat_interval_time);
    // 初始化第一时间进行补充和记录。兼容未开始循环检测期间，发生关闭行为
    // 心跳记录
    COLLECT_URL_STATUS && this.saveHeartBeatData('is_first_heartbeat');
    // 补充数据
    this.reissueHeartBeatData();
  };
  /**
   * 关闭心跳记录及心跳补充
   */
  PageLeave.prototype.stopHeartBeatInterval = function () {
    clearInterval(this.heartbeat_interval_timer);
    this.heartbeat_interval_timer = null;
  };
  /**
   * 心跳记录
   */
  PageLeave.prototype.saveHeartBeatData = function (type) {
    var pageleave_properties = this.getPageLeaveProperties();
    // 使用设备时间
    var device_time = new Date();
    pageleave_properties.$time = device_time;
    if (type === 'is_first_heartbeat') {
      pageleave_properties.event_duration = 3.14;
    }

    var data = this.sd.kit.buildData({
      type: 'track',
      event: '$WebPageLeave',
      properties: pageleave_properties
    });

    try {
      // 打通情况下移动端会修正 data.time, 所以添加 data.properties.$time, 以免因移动端修正逻辑影响 data.time
      if (this.sd.bridge.bridge_info.verify_success === 'success') {
        data.properties.$time = device_time * 1;
      }
    } catch (err){
      this.log(err.message);
    }

    // 记录当前页面的 heartbeat_interval_time
    // 作用：在对比超过阈值时间时，根据原页面所使用的配置。
    data.heartbeat_interval_time = this.heartbeat_interval_time;
    this.sd.store.saveObjectVal(this.storage_name + '-' + this.page_id, data);
  };
  /**
   * 删除当前页面心跳记录
   */
  PageLeave.prototype.delHeartBeatData = function (storage_key) {
    this._.localStorage.remove(storage_key || this.storage_name + '-' + this.page_id);
  };
  /**
   * 补充数据
   */
  PageLeave.prototype.reissueHeartBeatData = function () {
    var storage_length = window.localStorage.length;

    for (var i = storage_length - 1; i >= 0; i--) {
      var item_key = window.localStorage.key(i);
      if (item_key && item_key !== this.storage_name + '-' + this.page_id && item_key.indexOf(this.storage_name + '-') === 0) {
        var item_value = this.sd.store.readObjectVal(item_key);
        if (this._.isObject(item_value) && new Date() * 1 - item_value.time > item_value.heartbeat_interval_time + 5000) {
          delete item_value.heartbeat_interval_time;
          this.sd.kit.sendData(item_value);
          this.delHeartBeatData(item_key);
        }
      }
    }
  };
  /**
   * 获取页面浏览时长自定义属性
   */
  PageLeave.prototype.getPageLeaveProperties = function () {
    var duration = (+new Date() - this.start_time) / 1000;
    if (isNaN(duration) || duration < 0) {
      duration = 0;
    }
    duration = Number(duration.toFixed(3));

    var referrer = this._.getReferrer(this.current_page_url);
    var viewport_position = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || (document.body && document.body.scrollTop) || 0;
    viewport_position = Math.round(viewport_position) || 0;
    var data = {
      $title: document.title,
      $url: this._.getURL(this.url),
      $url_path: this._.getURLPath(),
      $referrer_host: referrer ? this._.getHostname(referrer) : '',
      $referrer: referrer,
      $viewport_position: viewport_position
    };
    if (duration !== 0) {
      data.event_duration = duration;
    }
    data = this._.extend(data, this.option.custom_props);
    return data;
  };
  var pageLeave = new PageLeave();
  // 对外公开PageLeave插件
  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.PageLeave = window.SensorsDataWebJSSDKPlugin.PageLeave || pageLeave;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      PageLeave: pageLeave
    };
  }

  return pageLeave;

}());

sd.modules['Pageload'] = (function () {
  'use strict';

  var PageLoad = {
    init: function (sd) {
      // 采集页面资源大小
      function getPageSize(p, prop) {
        if (p.getEntries && typeof p.getEntries === 'function') {
          var entries = p.getEntries();

          var totalSize = null;
          for (var i = 0; i < entries.length; i++) {
            if ('transferSize' in entries[i]) {
              totalSize += entries[i].transferSize;
            }
          }

          // 大小限制 [0, 10G)
          if (sd._.isNumber(totalSize) && totalSize >= 0 && totalSize < 10737418240) {
            // 单位 kb
            prop.$page_resource_size = Number((totalSize / 1024).toFixed(3));
          }
        }
      }

      function fn() {
        var p = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
        var duration = 0;
        var prop = {
          $url: sd._.getURL(),
          $title: document.title,
          $url_path: sd._.getURLPath(),
          $referrer: sd._.getReferrer(null, true)
        };

        if (!p || !p.timing) {
          sd.log('浏览器未支持 performance API.');
        } else {
          var t = p.timing;
          if (t.fetchStart === 0 || t.domContentLoadedEventEnd === 0) {
            sd.log('performance 数据获取异常');
          } else {
            duration = t.domContentLoadedEventEnd - t.fetchStart;
          }
          getPageSize(p, prop);
        }
        if (duration > 0) {
          prop.event_duration = Number((duration / 1000).toFixed(3));
        }
        sd.track('$WebPageLoad', prop);

        // 解除事件监听
        if (window.removeEventListener) {
          window.removeEventListener('load', fn);
        } else if (window.detachEvent) {
          window.detachEvent('onload', fn);
        }
      }

      if (document.readyState == 'complete') {
        fn();
      } else if (window.addEventListener) {
        window.addEventListener('load', fn);
      } else if (window.attachEvent) {
        window.attachEvent('onload', fn);
      }
    }
  };

  // 对外公开 PageLoad 插件
  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.PageLoad = window.SensorsDataWebJSSDKPlugin.PageLoad || PageLoad;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      PageLoad: PageLoad
    };
  }

  return PageLoad;

}());

sd.modules['RegisterProperties'] = (function () {
  'use strict';

  /**
   * 添加自定义属性
   *
   * @param { JSON } data 数据日志
   * @param { Object } instance 当前 use 插件的实例
   * @return { JSON } 添加完毕后的数据日志
   */
  function addProperties(data, instance) {
    if (data.type !== 'track') return data;
    var sd = instance.sd;
    var _ = sd._;
    var check = sd.saEvent.check;

    // 克隆数据，阻止 hookRegister 中无法对原有 data 的更改
    var copyData = _.extend2Lev({ properties: {} }, data);
    var currentProps = instance.currentProps;
    var properties = copyData.properties;
    var event = copyData.event;
    var props = {};

    _.each(currentProps, function (prop) {
      if (_.isObject(prop)) {
        if (prop.events.indexOf(event) > -1) {
          // 校验属性及属性值是否合法
          if (check({ properties: prop.properties })) {
            props = _.extend(props, prop.properties);
          }
        }
      } else if (_.isFunction(prop)) {
        var callbackProp = prop({
          event: event,
          properties: properties,
          data: copyData
        });
        // 校验属性及属性值是否合法
        if (_.isObject(callbackProp) && !_.isEmptyObject(callbackProp) && check({ properties: callbackProp })) {
          props = _.extend(props, callbackProp);
        }
      }
    });
    data.properties = _.extend(properties, props);
    return data;
  }

  function DataStageImpl(registerInstance) {
    var _this = this;
    this.sd = registerInstance.sd;
    this.currentProps = registerInstance.customRegister;
    this.interceptor = {
      addCustomProps: {
        priority: 0,
        entry: function (data) {
          addProperties(data, _this);
          return data;
        }
      }
    };
  }
  /**
   *  DataStageImpl 必须有 init 方法，可以为空方法
   */
  DataStageImpl.prototype.init = function () {};

  function registerPropertiesFeature(registerInstance) {
    // assign dataStage for registerFeature to find the dataStage implementation
    this.dataStage = new DataStageImpl(registerInstance);
  }

  function RegisterProperties() {
    this.sd = null;
    this.log = (window.console && window.console.log) || function () {};
    this.customRegister = [];
  }
  RegisterProperties.prototype.init = function (sd) {
    if (sd) {
      this.sd = sd;
      this._ = sd._;
      this.log = sd.log;
      sd.registerFeature(new registerPropertiesFeature(this));
    } else {
      this.log('神策JS SDK未成功引入');
    }
  };

  RegisterProperties.prototype.register = function (customProps) {
    if (!this.sd) {
      this.log('神策JS SDK未成功引入');
      return;
    }
    if (this._.isObject(customProps) && this._.isArray(customProps.events) && customProps.events.length > 0 && this._.isObject(customProps.properties) && !this._.isEmptyObject(customProps.properties)) {
      this.customRegister.push(customProps);
    } else {
      this.log('RegisterProperties: register 参数错误');
    }
  };

  RegisterProperties.prototype.hookRegister = function (customFun) {
    if (!this.sd) {
      this.log('神策JS SDK未成功引入');
      return;
    }
    if (this._.isFunction(customFun)) {
      this.customRegister.push(customFun);
    } else {
      this.log('RegisterProperties: hookRegister 参数错误');
    }
  };

  var instance = new RegisterProperties();
  instance.__constructor__ = RegisterProperties;
  // 对外公开 PageLoad 插件
  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.RegisterProperties = window.SensorsDataWebJSSDKPlugin.RegisterProperties || instance;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      RegisterProperties: instance
    };
  }

  return instance;

}());

sd.modules['RegisterPropertyPageHeight'] = (function () {
  'use strict';

  /*
   * @Author: andy
   * @Date: 2022-01-13 14:49:12
   * @LastEditTime: 2022-01-14 18:22:42
   * @LastEditors: andy
   */
  var _sd,
    _oldBuildData,
    _log = (window.console && window.console.log) || function () {};

  /**
   * @description: 重写 buildData，非 $pageview 与 非 profile 的增加页面高度属性
   * @param {*} p
   * @return {*}
   */
  function buildData(p) {
    try {
      if (p.event !== '$pageview' && (!p.type || p.type.slice(0, 7) !== 'profile')) {
        var viewportHeightValue = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        var scrollHeightValue = document.documentElement.scrollHeight || 0;
        var prop = {
          $page_height: Math.max(viewportHeightValue, scrollHeightValue) || 0
        };
        p.properties = _sd._.extend(p.properties || {}, prop);
      }
    } catch (e) {
      _log('页面高度获取异常。');
    }
    return _oldBuildData.call(_sd.kit, p);
  }

  /**
   * @description: RegisterPropertyPageHeight init
   * @param {*}
   * @return {*}
   */
  var RegisterPropertyPageHeight = {
    init: function (sd) {
      _sd = sd;
      _log = (_sd && _sd.log) || _log;

      if (!sd || !sd.kit || !sd.kit.buildData) {
        _log('RegisterPropertyPageHeight 插件初始化失败,当前主sdk不支持 RegisterPropertyPageHeight 插件，请升级主sdk');
        return;
      }
      _oldBuildData = _sd.kit.buildData;
      _sd.kit.buildData = buildData;
      _log('RegisterPropertyPageHeight 插件初始化完成');
    }
  };

  // 对外公开 RegisterPropertyPageHeight 插件
  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.RegisterPropertyPageHeight = window.SensorsDataWebJSSDKPlugin.RegisterPropertyPageHeight || RegisterPropertyPageHeight;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      RegisterPropertyPageHeight: RegisterPropertyPageHeight
    };
  }

  return RegisterPropertyPageHeight;

}());

(function () {
  'use strict';

  var siteLinker = {};

  // 检查指定URL是否匹配打通规则
  siteLinker.getPart = function (part) {
    var temp = false;
    var len = this.option.length;
    if (len) {
      for (var i = 0; i < len; i++) {
        if (part.indexOf(this.option[i]['part_url']) > -1) {
          return true;
        }
      }
    }
    return temp;
  };

  siteLinker.getPartHash = function (part) {
    var len = this.option.length;
    var temp = false;
    if (len) {
      for (var i = 0; i < len; i++) {
        if (part.indexOf(this.option[i]['part_url']) > -1) {
          return this.option[i]['after_hash'];
        }
      }
    }
    return !!temp;
  };

  // 得到当前页面编码后的 ID
  siteLinker.getCurrenId = function () {
    var distinct_id = this.store.getDistinctId() || '',
      first_id = this.store.getFirstId() || '';
    if (this._.urlSafeBase64 && this._.urlSafeBase64.encode) {
      distinct_id = distinct_id ? this._.urlSafeBase64.trim(this._.urlSafeBase64.encode(this._.base64Encode(distinct_id))) : '';
    } else if (this._.rot13obfs) {
      distinct_id = distinct_id ? this._.rot13obfs(distinct_id) : '';
    }
    // 若有 first_id，则格式是 'f' + distinct_id，对应的旧版格式是 'u' + distinct_id
    // 否则格式是 'd' + distinct_id，对应的旧版格式是 'a' + distinct_id
    var urlId = first_id ? 'f' + distinct_id : 'd' + distinct_id;
    return encodeURIComponent(urlId);
  };

  siteLinker.rewriteUrl = function (url, target) {
    var reg = /([^?#]+)(\?[^#]*)?(#.*)?/;
    var arr = reg.exec(url),
      nurl = '';
    if (!arr) {
      return;
    }
    var host = arr[1] || '',
      search = arr[2] || '',
      hash = arr[3] || '';
    var idIndex;
    if (this.getPartHash(url)) {
      idIndex = hash.indexOf('_sasdk');
      var queryIndex = hash.indexOf('?');
      if (queryIndex > -1) {
        if (idIndex > -1) {
          nurl = host + search + '#' + hash.substring(1, idIndex) + '_sasdk=' + this.getCurrenId();
        } else {
          nurl = host + search + '#' + hash.substring(1) + '&_sasdk=' + this.getCurrenId();
        }
      } else {
        nurl = host + search + '#' + hash.substring(1) + '?_sasdk=' + this.getCurrenId();
      }
    } else {
      idIndex = search.indexOf('_sasdk');
      var hasQuery = /^\?(\w)+/.test(search);
      if (hasQuery) {
        if (idIndex > -1) {
          nurl = host + '?' + search.substring(1, idIndex) + '_sasdk=' + this.getCurrenId() + hash;
        } else {
          nurl = host + '?' + search.substring(1) + '&_sasdk=' + this.getCurrenId() + hash;
        }
      } else {
        nurl = host + '?' + search.substring(1) + '_sasdk=' + this.getCurrenId() + hash;
      }
    }

    if (target) {
      target.href = nurl;
    }
    return nurl;
  };

  siteLinker.getUrlId = function () {
    /* eslint-disable no-useless-escape */
    var sa_id = location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);
    if (this._.isArray(sa_id) && sa_id[1]) {
      var uid = decodeURIComponent(sa_id[1]);
      if (uid && (uid.substring(0, 1) === 'f' || uid.substring(0, 1) === 'd')) {
        if (this._.urlSafeBase64 && this._.urlSafeBase64.isUrlSafeBase64 && this._.urlSafeBase64.isUrlSafeBase64(uid)) {
          uid = uid.substring(0, 1) + this._.base64Decode(this._.urlSafeBase64.decode(uid.substring(1)));
        } else if (this._.rot13defs) {
          uid = uid.substring(0, 1) + this._.rot13defs(uid.substring(1));
        }
      }
      return uid;
    } else {
      return '';
    }
  };

  siteLinker.setRefferId = function () {
    var distinct_id = this.store.getDistinctId();
    var urlId = this.getUrlId();
    if (urlId === '') {
      return false;
    }
    var isAnonymousId = urlId.substring(0, 1) === 'a' || urlId.substring(0, 1) === 'd';
    urlId = urlId.substring(1);

    if (urlId === distinct_id) {
      return false;
    }
    if (urlId && isAnonymousId && this.store.getFirstId()) {
      this.sd.identify(urlId, true);
      this.sd.saEvent.send(
        {
          original_id: urlId,
          distinct_id: distinct_id,
          type: 'track_signup',
          event: '$SignUp',
          properties: {}
        },
        null
      );
    }
    if (urlId && isAnonymousId && !this.store.getFirstId()) {
      this.sd.identify(urlId, true);
    }
    if (urlId && !isAnonymousId && !this.store.getFirstId()) {
      this.sd.login(urlId);
    }
  };

  siteLinker.addListen = function () {
    var that = this;
    var clickFn = function (event) {
      var target = event.target;
      var nodeName = target.tagName.toLowerCase();
      var parent_target = target.parentNode;
      var sasdk_url;
      var sasdk_target;
      if ((nodeName === 'a' && target.href) || (parent_target && parent_target.tagName && parent_target.tagName.toLowerCase() === 'a' && parent_target.href)) {
        if (nodeName === 'a' && target.href) {
          sasdk_url = target.href;
          sasdk_target = target;
        } else {
          sasdk_url = parent_target.href;
          sasdk_target = parent_target;
        }
        var location = that._.URL(sasdk_url);
        var protocol = location.protocol;
        if (protocol === 'http:' || protocol === 'https:') {
          if (that.getPart(sasdk_url)) {
            that.rewriteUrl(sasdk_url, sasdk_target);
          }
        }
      }
    };
    that._.addEvent(document, 'mousedown', clickFn);
    if (!!window.PointerEvent && 'maxTouchPoints' in window.navigator && window.navigator.maxTouchPoints >= 0) {
      that._.addEvent(document, 'pointerdown', clickFn);
    }
  };

  siteLinker.init = function (sd, option) {
    this.sd = sd;
    this._ = sd._;
    this.store = sd.store;
    this.para = sd.para;
    if (this._.isObject(option) && this._.isArray(option.linker) && option.linker.length > 0) {
      this.setRefferId();
      this.addListen();
    } else {
      sd.log('请配置打通域名参数！');
      return;
    }
    this.option = option.linker;
    this.option = resolveOption(this.option);

    function resolveOption(option) {
      var len = option.length,
        arr = [];
      for (var i = 0; i < len; i++) {
        if (/[A-Za-z0-9]+\./.test(option[i].part_url) && Object.prototype.toString.call(option[i].after_hash) == '[object Boolean]') {
          arr.push(option[i]);
        } else {
          sd.log('linker 配置的第 ' + (i + 1) + ' 项格式不正确，请检查参数格式！');
        }
      }
      //option = arr;
      return arr;
    }
  };

  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.SiteLinker = window.SensorsDataWebJSSDKPlugin.SiteLinker || siteLinker;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      SiteLinker: siteLinker
    };
  }

}());


    // 动态创建脚本加载 sdk
    if (typeof window['sensorsDataAnalytic201505'] === 'string') {
      //异步或者同步
      sd.para = window[sensorsDataAnalytic201505].para;
      sd._q = window[sensorsDataAnalytic201505]._q;

      window[sensorsDataAnalytic201505] = sd;
      window['sensorsDataAnalytic201505'] = sd;
      sd.init();
    } else if (typeof window['sensorsDataAnalytic201505'] === 'undefined') {
      // window 上 sdk 为空则挂载 sdk 对象到 window对象
      window['sensorsDataAnalytic201505'] = sd;
    } else {
      // 如果 window 上已经挂在了 sdk 对象，则使用已经加载的 sdk 对象
      _sd = window['sensorsDataAnalytic201505'];
    }
  } catch (err) {
    if (typeof console === 'object' && console.log) {
      try {
        console.log(err);
      } catch (e) {
        sd.log(e);
      }
    }
  }

  var _sd$1 = _sd;

  return _sd$1;

})));
