/*
 ioBroker.vis material Widget-Set
 version: "0.1.6"
 Copyright 2018 - 2019 nisiode<nisio.air@mail.com>
 forked by Pix 7/2018 (humidity, shutter)
 */
/* global vis, systemDictionary */

"use strict";
// add translations for edit mode
if (vis.editMode) {
    $.extend(true, systemDictionary, {
        "subtitle": {"en": "Subtitle", "de": "Untertitel", "ru": "подзаголовок", "pt": "Subtítulo", "nl": "subtitel", "fr": "Sous-titre", "it": "Sottotitolo", "es": "Subtitular", "pl": "Podtytuł", "zh-cn": "字幕"},
        "title": {"en": "Title", "de": "Titel", "ru": "заглавие", "pt": "Título", "nl": "Titel", "fr": "Titre", "it": "Titolo", "es": "Título", "pl": "Tytuł", "zh-cn": "标题"}

    });
}

// add translations for non-edit mode
$.extend(true, systemDictionary, {

    "Instance": {"en": "Instance", "de": "Beispiel", "ru": "Пример", "pt": "Instância", "nl": "Aanleg", "fr": "Exemple", "it": "Esempio", "es": "Ejemplo", "pl": "Instancja", "zh-cn": "例"},
    "closed": {"en": "closed", "de": "geschlossen", "ru": "закрыто", "pt": "fechadas", "nl": "Gesloten", "fr": "fermé", "it": "chiuso", "es": "cerrado", "pl": "Zamknięte", "zh-cn": "关闭"},
    "off": {"en": "off", "de": "aus", "ru": "от", "pt": "fora", "nl": "uit", "fr": "de", "it": "via", "es": "apagado", "pl": "poza", "zh-cn": "离"},
    "on": {"en": "on", "de": "an", "ru": "на", "pt": "em", "nl": "op", "fr": "sur", "it": "sopra", "es": "en", "pl": "na", "zh-cn": "上"},
    "open": {"en": "open", "de": "öffnen", "ru": "открыть", "pt": "abrir", "nl": "Open", "fr": "ouvrir", "it": "Aperto", "es": "abierto", "pl": "otwarty", "zh-cn": "打开"},
    "tilted": {"en": "tilted", "de": "gekippt", "ru": "наклоне", "pt": "inclinado", "nl": "gekanteld", "fr": "incliné", "it": "inclinato", "es": "inclinado", "pl": "przechylony", "zh-cn": "斜"}

});

vis.binds.material = {
    version: "0.1.6",
    showVersion: function () {
        if (vis.binds.material.version) {
            console.log('Version material: ' + vis.binds.material.version);
            vis.binds.material.version = null;
        }
    },
    tplMdListDoor: function (widgetID, view, data) {
        const srcOpen = 'widgets/material/img/fts_door_open.png';
        const srcClosed = 'widgets/material/img/fts_door.png';
        const valOpen = _('open');
        const valClosed = _('closed');
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListDoor(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var value = (state) ? valOpen : valClosed;
            var src = (state) ? srcOpen : srcClosed;
            $div.find('.md-list-value').html(value);
            $div.find('.md-list-icon').find('img').attr('src', src);
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListWindow: function (widgetID, view, data) {
        const srcOpen = 'widgets/material/img/fts_window_2w_open.png';
        const srcClosed = 'widgets/material/img/fts_window_2w.png';
        const valOpen = _('open');
        const valClosed = _('closed');
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListWindow(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var value = (state) ? valOpen : valClosed;
            var src = (state) ? srcOpen : srcClosed;
            $div.find('.md-list-value').html(value);
            $div.find('.md-list-icon').find('img').attr('src', src);
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListTemp: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListTemp(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.md-list-value').css('opacity', '0.5');
        }

        function update(state) {
            if (typeof state === 'number') {
                $div.find('.md-list-value').html(state.toFixed(1) + ' °C');
            }
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListHumid: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListHumid(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.md-list-value').css('opacity', '0.5');
        }

        function update(state) {
            if (typeof state === 'number') {
                $div.find('.md-list-value').html(state.toFixed(1) + ' %');
            }
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListLight: function (widgetID, view, data) {
        const srcOff = 'widgets/material/img/light_light_dim_00.png';
        const srcOn = 'widgets/material/img/light_light_dim_100.png';
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListLight(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_checkbox');
            $tmp.prop('checked', state);
            $div.find('.md-list-icon').find('img').attr('src', src);
        }

        if (!vis.editMode) {
            var $this = $('#' + widgetID + '_checkbox');
            $this.change(function () {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListLightDim: function (widgetID, view, data) {
        const srcOff = 'widgets/material/img/light_light_dim_00.png';
        const srcOn = 'widgets/material/img/light_light_dim_100.png';
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListLightDim(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var src = 'widgets/material/img/light_light_dim_' + Math.ceil(state / 10) + '0.png';
            $div.find('.md-list-icon').find('img').attr('src', src);
        }

        /* if (!vis.editMode) {
         var $this = $('#' + widgetID + '_slider');
         $this.change(function () {
         var $this_ = $(this);
         vis.setValue($this_.data('oid'), $this_.prop('checked'));
         });
         } */

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListShutter: function (widgetID, view, data) {
        const srcOff = 'widgets/material/img/fts_shutter_00.png';
        const srcOn = 'widgets/material/img/fts_shutter_100.png';
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.material.tplMdListShutter(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var src = 'widgets/material/img/fts_shutter_' + Math.ceil(state / 10) + '0.png';
            $div.find('.md-list-icon').find('img').attr('src', src);
        }

        /* if (!vis.editMode) {
         var $this = $('#' + widgetID + '_slider');
         $this.change(function () {
         var $this_ = $(this);
         vis.setValue($this_.data('oid'), $this_.prop('checked'));
         });
         } */

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
            // set current value
            update(vis.states[data.oid + '.val']);
        }
    }
};
vis.binds.material.showVersion();
