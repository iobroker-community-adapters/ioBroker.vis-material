/*
    ioBroker.vis template Widget-Set
    version: "0.0.1"
    Copyright 10.2015-2016 @@Author@@<@@email@@>
*/
"use strict";

// add translations for edit mode
if (vis.editMode) {
    $.extend(true, systemDictionary, {
        "myColor":          {"en": "myColor",       "de": "mainColor",  "ru": "??? ????"},
        "myColor_tooltip":  {
            "en": "Description of\x0AmyColor",
            "de": "Beschreibung von\x0AmyColor",
            "ru": "????????\x0AmyColor"
        },
        "htmlText":         {"en": "htmlText",      "de": "htmlText",   "ru": "htmlText"},
        "group_extraMyset": {"en": "extraMyset",    "de": "extraMyset", "ru": "extraMyset"},
        "extraAttr":        {"en": "extraAttr",     "de": "extraAttr",  "ru": "extraAttr"}
    });
}

// add translations for non-edit mode
$.extend(true, systemDictionary, {
    "Instance":  {"en": "Instance", "de": "Instanz", "ru": "?????????"}
});

// this code can be placed directly in template.html
vis.binds.template = {
    version: "0.0.2",
    showVersion: function () {
        if (vis.binds.template.version) {
            console.log('Version template: ' + vis.binds.template.version);
            vis.binds.template.version = null;
        }
    },
	getValue: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.template.getValue(widgetID, view, data);
            }, 100);
        }
        var text = '';
        if(vis.states[data.oid + '.val']){
            text = 'closed';
        }else{
            text = 'open';
        }
        
        $div.find('.my-list-value').html(text);
        // subscribe on updates of value
        if (data.oid) {
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                $div.find('.my-list-value').html(newVal);
            });
        }
    }
};

vis.binds.template.showVersion();