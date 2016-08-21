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
            this.setClass(this.device, outDevice);
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

    ResponsiveTester.prototype.is = function(device) {
        return this.device == device;
    };

    window.ResponsiveTester = ResponsiveTester;
}(window, jQuery));