# Responsive breakpoint tester 
Detect responsive breakpoints in JavaScript and fire events on breakpoints change.

## Installation

Via Bower
```
bower install responsive-breakpoint-tester
```

## Basic usage - How to detect breakpoints in Bootstrap 4 using JavaScript

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

$body.on('out.screen.xs', function(event, devices) {
    // Code executed when viewport is no longer xs
});
```

## Custom configuration
You can pass a configuration object when the instance is initialized

### Options
* screenTypes - Array with screen types. Proper order is mandatory
* screenTest - Object with visible only CSS class set for each screen type 
* htmlId - Id of element that script will create
* container - Selector of container for plugin, used also in event emitter
```javascript
$(function() {
    var viewport = new ResponsiveTester({
        screenTypes: ['xs', 'sm', 'md', 'lg', 'xl'],
        screenTest: {
            'xs': 'd-block d-sm-none',
            'sm': 'd-none d-sm-block d-md-none',
            'md': 'd-none d-md-block d-lg-none',
            'lg': 'd-none d-md-block d-xl-none',
            'xl': 'd-none d-xl-block'
        },
        htmlId: 'responsive-tester',
        container: 'body'
    });
});
```

## How to detect breakpoints in Bootstrap 3 using JavaScript
Just add new breakpoint to screenTypes array and change the classTemplate.
```javascript
$(function() {
    var viewport = new ResponsiveTester({
        screenTypes: ['xs', 'sm', 'md', 'lg'],
        screenTest: {
            'xs': 'visible-xs-block',
            'sm': 'visible-sm-block',
            'md': 'visible-md-block',
            'lg': 'visible-lg-block'
        }
    });
    
    // current breakpoint check
    if (viewport.is('>=lg')) {
        // Executed on breakpoints that are larger or equal to lg
    }
    
    // execute code when window width is lg or was changed to lg
    $('body').on('in.screen.lg', function(event, devices) {
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
        screenTest: {
            'small': 'show-for-small-only',
            'medium': 'show-for-medium-only',
            'large': 'show-for-large-only',
            'xlarge': 'show-for-xlarge-only'
        }
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