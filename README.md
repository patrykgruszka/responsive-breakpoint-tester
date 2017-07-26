# Responsive breakpoint tester 
Detect responsive breakpoints in JavaScript and fire events on breakpoints change.

## Installation

Vía Bower
```
bower install responsive-breakpoint-tester
```

## Basic usage - How to detect breakpoints in Bootstrap 3 using JavaScript

### Initialization
First you have to create an object instance. ResponsiveTester is a singleton class, so the constructor will always return the same object if is already created.
```javascript
$(function() {
    var viewport = new ResponsiveTester();
    //...
});
```

## How to check current breakpoint in Bootstrap using JavaScript?
```javascript
if (viewport.is('xs')) {
    // Executed only on xs breakpoint
}

if (viewport.is('!=xs')) {
    // Executed on all breakpoints that are not equal xs (sm, md, lg)
}

if (viewport.is('<md')) {
    // Executed on breakpoints that are smaller than md (xs, sm)
}

if (viewport.is('<=md')) {
    // Executed on breakpoints that are smaller or equal to md (xs, sm, md)
}

if (viewport.is('>md')) {
    // Executed on breakpoints that are larger than md (lg)
}

if (viewport.is('>=md')) {
    // Executed on breakpoints that are larger or equal to md (md, lg)
}
```

## Fire events on Bootstrap breakpoint change 
```javascript
var $body = $('body');
$body.on('init.screen', function(event, devices) {
    // Code executed after plugin initialization
});

$body.on('change.screen', function(event, devices) {
    // Code executed when viewport was changed and reached breakpoint
});

$body.on('in.screen.xs', function(event, devices) {
    // Code executed when viewport is xs or was changed to xs
});

$body.on('out.screen.xs' + device, function(event, devices) {
    // Code executed when viewport is no longer xs
});
```

## Custom configuration
You can pass a configuration object when the instance is initialized

### Options
* screenTypes - Array with screen types. Proper order is mandatory
* htmlId - Id of element that script will create
* container - Selector of container for plugin, used also in event emitter
* classTemplate - Template for testable element class. The {device} will be replaced by the values from screenTypes array
```javascript
$(function() {
    var viewport = new ResponsiveTester({
        screenTypes: ['xs', 'sm', 'md', 'lg'],
        htmlId: 'responsive-tester',
        container: 'body',
        classTemplate: 'visible-{device}-block'
    });
});
```

## How to detect breakpoints in Bootstrap 4 using JavaScript
Just add new breakpoint to screenTypes array and change the classTemplate.
```javascript
$(function() {
    var viewport = new ResponsiveTester({
        screenTypes: ['xs', 'sm', 'md', 'lg', 'xl'],
        classTemplate: 'hidden-{--device}-down hidden-{++device}-up'
    });
    
    // current breakpoint check
    if (viewport.is('>=xl')) {
        // Executed on breakpoints that are larger or equal to xl
    }
    
    // execute code when window width is xl or was changed to xl
    $('body').on('in.screen.xl', function(event, devices) {
        // code to execute
    });
});
```

## How to detect breakpoints in Foundation using JavaScript
Change screenTypes and classTemplate
```javascript
$(function() {
    var viewport = new ResponsiveTester({
        screenTypes: ['small', 'medium', 'large', 'xlarge'],
        classTemplate: 'show-for-{device}-only'
    });
    
    // current breakpoint check
    if (viewport.is('>=medium')) {
        // Executed on breakpoints that are larger or equal to medium
    }
    
    // execute code when window width medium width or was changed to medium
    $('body').on('in.screen.medium', function(event, devices) {
        // code to execute
    });
});
```