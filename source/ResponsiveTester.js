/*!
 * Responsive Tester
 * Version: 1.0.0
 * Author: Patryk Gruszka
 * URL: https://github.com/patrykgruszka/responsive-tester
 * License: MIT
 */
(function(window, $) {
    'use strict';

    var ResponsiveTester = function(settings) {
        if (ResponsiveTester.prototype._singletonInstance) {
            return ResponsiveTester.prototype._singletonInstance;
        }
        ResponsiveTester.prototype._singletonInstance = this;

        this.settings = $.extend({}, ResponsiveTester.defaults, settings);
        this.$container = $(this.settings.container);

        this.createElement();
        this.device = this.testDevice();
        this.emitEvents(this.device);
        $(window).on("resize", this.resize.bind(this));
    };

    ResponsiveTester.defaults = {
        screenTypes: ['xs', 'sm', 'md', 'lg'],
        htmlId: 'responsive-tester',
        container: 'body',
        classPrefix: 'screen-',
        classTemplate: 'visible-{device}-block'
    };

    ResponsiveTester.prototype.getClassName = function(device) {
        return this.settings.classTemplate.replace('{device}', device);
    };

    ResponsiveTester.prototype.createElement = function() {
        var elements = [],
            types = this.settings.screenTypes;

        for (var i = 0; i < types.length; i++) {
            var device = types[i],
                className = this.getClassName(device);
            elements.push('<div class="' + className + '"></div>');
        }

        this.$element = $('<div id="' + this.settings.htmlId + '">' + elements.join('') + '</div>');
        this.$container.append(this.$element);
    };

    ResponsiveTester.prototype.testDevice = function() {
        var types = this.settings.screenTypes,
            screen;

        for (var i = 0; i < types.length; i++) {
            var device = types[i],
                className = this.getClassName(device);

            if (this.$element.find('.' + className).is(':visible')) {
                screen = device;
            }
        }

        return screen;
    };

    ResponsiveTester.prototype.resize = function() {
        var outDevice = this.device;
        var inDevice = this.testDevice();
        if (outDevice != inDevice) {
            this.device = inDevice;
            this.emitEvents(inDevice, outDevice);
        }
    };

    ResponsiveTester.prototype.emitEvents = function(inDevice, outDevice) {
        var params = {
            inDevice: inDevice,
            outDevice: outDevice || false
        };

        if (outDevice) {
            this.$container
                .trigger('change.screen', params)
                .trigger('out.screen.' + outDevice, params);
        } else {
            this.$container.trigger('init.screen', params);
        }
        this.$container.trigger('in.screen.' + inDevice, params);
    };

    ResponsiveTester.prototype.get = function() {
        return this.device;
    };

    ResponsiveTester.prototype.getDeviceIndex = function(device) {
        var screenTypes = this.settings.screenTypes;
        return screenTypes.indexOf(device);
    };

    ResponsiveTester.prototype.isEqual = function(device) {
        return this.device === device;
    };

    ResponsiveTester.prototype.isNotEqual = function(device) {
        return this.device !== device;
    };

    ResponsiveTester.prototype.isGreater = function(device) {
        return this.getDeviceIndex(this.device) > this.getDeviceIndex(device);
    };

    ResponsiveTester.prototype.isLess = function(device) {
        return this.getDeviceIndex(this.device) < this.getDeviceIndex(device);
    };

    ResponsiveTester.prototype.isGreaterOrEqual = function(device) {
        return this.getDeviceIndex(this.device) >= this.getDeviceIndex(device);
    };

    ResponsiveTester.prototype.isLessOrEqual = function(device) {
        return this.getDeviceIndex(this.device) <= this.getDeviceIndex(device);
    };

    ResponsiveTester.prototype.findOperator = function(expression) {
        var operators = ['>', '<', '>=', '<=', '!=', '=='],
            operator = '==';

        for (var i = 0; i < operators.length; i++) {
            var candidate = operators[i];
            if (expression.slice(0, candidate.length) == candidate) {
                operator = candidate;
            }
        }

        return operator;
    };

    ResponsiveTester.prototype.findDevice = function(expression) {
        var screenTypes = this.settings.screenTypes,
            device = false;

        for (var i = 0; i < screenTypes.length; i++) {
            var candidate = screenTypes[i];
            if (expression.indexOf(candidate) != -1) {
                device = candidate;
            }
        }

        return device;
    };

    ResponsiveTester.prototype.is = function(expression) {
        expression = expression.replace(/\s/g, '');
        var operator = this.findOperator(expression),
            device = this.findDevice(expression);

        var methods = {
            '>': 'isGreater',
            '<': 'isLess',
            '>=': 'isGreaterOrEqual',
            '<=': 'isLessOrEqual',
            '!=': 'isNotEqual',
            '==': 'isEqual'
        };
        return ResponsiveTester.prototype[methods[operator]].call(this, device);
    };

    window.ResponsiveTester = ResponsiveTester;
}(window, jQuery));