(function(joint, util) {

    joint.shapes.app.NavigatorElementView = joint.dia.ElementView.extend({

        body: null,

        markup: [{
            tagName: 'rect',
            selector: 'body',
            attributes: {
                'fill': '#31d0c6'
            }
        }],

        initialize: function() {
            this.listenTo(this.model, 'change:position', this.translate);
            this.listenTo(this.model, 'change:size', this.resize);
            this.listenTo(this.model, 'change:angle', this.rotate);
        },

        render: function() {
            var doc = util.parseDOMJSON(this.markup);
            this.body = doc.selectors.body;
            this.el.appendChild(doc.fragment);
            this.update();
        },

        update: function() {
            var size = this.model.get('size');
            this.body.setAttribute('width', size.width);
            this.body.setAttribute('height', size.height);
            this.updateTransformation();
        }
    });

    joint.shapes.app.NavigatorLinkView = joint.dia.LinkView.extend({

        initialize: util.noop,

        render: util.noop,

        update: util.noop
    });

})(joint, joint.util);
