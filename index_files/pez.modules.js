pez.extend(function ($, pez) {

    'use strict';

    var attr = 'data-pz-module';

    pez.modules = new pez.Library();

    pez.modules.bind = function ($el, ignoreAlreadyLoaded) {
        $el = $($el);
        $el.find('[' + attr + ']').each(function () {
            var $mod = $(this);
            if (ignoreAlreadyLoaded && $mod.hasClass('pz-module-loaded')) {
                return true;
            }
            $mod.addClass('pz-module-loaded');
            var moduleNames = $.trim($mod.attr('data-pz-module')).split(',');
            for (var i = 0; i < moduleNames.length; i++) {
                var moduleName = $.trim(moduleNames[i]);
                //console.log(moduleName);
                pez.modules.load(moduleName, $, $mod);
            }
        });
    };

    pez.page({
        match: 'any',
        pageLoad: function ($) {
            pez.modules.bind('html');
        }
    });
});