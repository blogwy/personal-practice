var App = App || {};
App.config = App.config || {};

(function() {

    'use strict';

    App.config.selection = {

        handles: [{
            name: 'remove',
            position: 'nw',
            events: {
                pointerdown: 'removeElements'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click to remove the selected elements',
                    'data-tooltip-position': 'right',
                    'data-tooltip-padding': 15
                }
            }

        }, {
            name: 'rotate',
            position: 'sw',
            events: {
                pointerdown: 'startRotating',
                pointermove: 'doRotate',
                pointerup: 'stopBatch'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click and drag to rotate the selected elements',
                    'data-tooltip-position': 'right',
                    'data-tooltip-padding': 15
                }
            }

        }, {
            name: 'resize',
            position: 'se',
            events: {
                pointerdown: 'startResizing',
                pointermove: 'doResize',
                pointerup: 'stopBatch'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': 'Click and drag to resize the selected elements',
                    'data-tooltip-position': 'left',
                    'data-tooltip-padding': 15
                }
            }
        }]
    };

})();
