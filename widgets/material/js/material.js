/*
    ioBroker.vis material Widget-Set
    version: "0.0.1"
    Copyright 10.2015-2016 nisiode<email@mail.com>
*/
"use strict";

// add translations for edit mode
if (vis.editMode) {
    $.extend(true, systemDictionary, {
        "title":          {"en": "title",       "de": "Titel",  "ru": "???"},
        "subtitle":         {"en": "subtitle",      "de": "Untertitel",   "ru": "???"}
    });
}

// add translations for non-edit mode
$.extend(true, systemDictionary, {
    "Instance":  {"en": "Instance", "de": "Instanz", "ru": "?????????"}
});

// this code can be placed directly in material.html
vis.binds.material = {
    version: "0.0.1",
    showVersion: function () {
        if (vis.binds.material.version) {
            console.log('Version material: ' + vis.binds.material.version);
            vis.binds.material.version = null;
        }
    },
	tplMdListDoor: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListDoor(widgetID, view, data);
            }, 100);
        }

        var value = (vis.states[data.oid + '.val']) ? 'closed' : 'open';
        var src = (value) ? 'widgets/material/img/fts_door.png' : 'widgets/material/img/fts_door_open.png';
        
        $div.find('.my-list-value').html(value);
        $div.find('.my-list-icon').find('img').attr('src', src);

        // subscribe on updates of value
        if (data.oid) {
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                $div.find('.my-list-value').html(newVal);
                var value = (newVal) ? 'closed' : 'open';
                var src = (newVal) ? 'widgets/material/img/fts_door.png' : 'widgets/material/img/fts_door_open.png';
                $div.find('.my-list-value').html(value);
                $div.find('.my-list-icon').find('img').attr('src', src);
            });
        }
    },
	tplMdListWindow: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListWindow(widgetID, view, data);
            }, 100);
        }

        var value = (vis.states[data.oid + '.val']) ? 'closed' : 'open';
        var src = (value) ? 'widgets/material/img/fts_window_2w.png' : 'widgets/material/img/fts_window_2w_open.png';

        $div.find('.my-list-value').html(value);
        $div.find('.my-list-icon').find('img').attr('src', src);

        // subscribe on updates of value
        if (data.oid) {
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                var value = (newVal) ? 'closed' : 'open';
                var src = (newVal) ? 'widgets/material/img/fts_window_2w.png' : 'widgets/material/img/fts_window_2w_open.png';
                $div.find('.my-list-value').html(value);
                $div.find('.my-list-icon').find('img').attr('src', src);
            });
        }
    }
};

vis.binds.material.showVersion();