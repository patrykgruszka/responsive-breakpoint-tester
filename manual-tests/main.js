var viewport;

$(function() {
    var screenTypes = ['xs', 'sm', 'md', 'lg', 'xl'],
        $body = $('body');

    $body.on('init.screen', function(event, devices) {
        console.log('EVENT FIRED: init.screen', devices);
    });

    $body.on('change.screen', function(event, devices) {
        console.log('EVENT FIRED: change.screen', devices);
    });

    screenTypes.forEach(function(device) {
        $body.on('in.screen.' + device, function(event, devices) {
            console.log('EVENT FIRED: ' + 'in.screen.' + device, devices);
        });

        $body.on('out.screen.' + device, function(event, devices) {
            console.log('EVENT FIRED: ' + 'out.screen.' + device, devices);
        });
    });

    viewport = new ResponsiveTester();

    if (viewport.is('xs')) {
        // Executed only on xs breakpoint
    }

    if (viewport.is('!=xs')) {
        // Executed on all breakpoints that are not xs (sm, md, lg)
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
});
