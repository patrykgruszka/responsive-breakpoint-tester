# Responsive breakpoint tester 
Detect responsive breakpoints in JavaScript.

## Installation

Vía Bower
```
bower install responsive-breakpoint-tester
```

## Basic usage - Responsive breakpoint tester for Bootstrap 3

### Initialization
First you have to create an object instance. ResponsiveTester is a singleton class, so the constructor will always return the same object if is already created.
```javascript
$(function() {
    var screen = new ResponsiveTester();
    //...
});
```

### Checking current breakpoint
```javascript
if (screen.is('xs')) {
    // Executed only on xs breakpoint
}

if (screen.is('!=xs')) {
    // Executed on all breakpoints that are not equal xs (sm, md, lg)
}

if (screen.is('<md')) {
    // Executed on breakpoints that are smaller than md (xs, sm)
}

if (screen.is('<=md')) {
    // Executed on breakpoints that are smaller or equal to md (xs, sm, md)
}

if (screen.is('>md')) {
    // Executed on breakpoints that are larger than md (lg)
}

if (screen.is('>=md')) {
    // Executed on breakpoints that are larger or equal to md (md, lg)
}
```

### Events
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
    var screen = new ResponsiveTester({
        screenTypes: ['xs', 'sm', 'md', 'lg'],
        htmlId: 'responsive-tester',
        container: 'body',
        classTemplate: 'visible-{device}-block'
    });
});
```

## Responsive breakpoint tester for Bootstrap 4
Just add new breakpoint to screenTypes array and change the classTemplate.
```javascript
$(function() {
    var screen = new ResponsiveTester({
        screenTypes: ['xs', 'sm', 'md', 'lg', 'xl'],
        classTemplate: 'hidden-{--device}-down hidden-{++device}-up'
    });
});
```

## Responsive breakpoint tester for Foundation
Change screenTypes and classTemplate
```javascript
$(function() {
    var screen = new ResponsiveTester({
        screenTypes: ['small', 'medium', 'large', 'xlarge']
        classTemplate: 'show-for-{device}-only'
    });
});
```