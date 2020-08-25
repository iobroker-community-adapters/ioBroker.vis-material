/*
    ioBroker.vis material Widget-Set
    version: "0.3.0"
    Copyright 2018 nisiode<nisio.air@mail.com>
    forked by Pix 7/2018 (humidity, shutter)
    forked by EdgarM73 07/2020 ( occupancy )
*/
"use strict";

// add translations for edit mode
if (vis.editMode) {
    $.extend(true, systemDictionary, {
        "title": {
            "en": "Title",
            "de": "Titel",
            "ru": "Заголовок"
        },
        "subtitle": {
            "en": "Subtitle",
            "de": "Untertitel",
            "ru": "Подзаголовок"
        }
    });
}

// add translations for non-edit mode
$.extend(true, systemDictionary, {
    "Instance": {
        "en": "Instance",
        "de": "Instanz",
        "ru": "Инстанция"
    },
    "open": {
        "en": "open",
        "de": "offen",
        "ru": "открыто"
    },
    "tilted": {
        "en": "tilted",
        "de": "gekippt",
        "ru": "приоткрыто"
    },
    "closed": {
        "en": "closed",
        "de": "zu",
        "ru": "закрыто"
    },
    "on": {
        "en": "on",
        "de": "an",
        "ru": "вкл"
    },
    "off": {
        "en": "off",
        "de": "aus",
        "ru": "выкл"
    },
    "motion": {
        "en": "motion",
        "de": "Bewegung",
        "ru": "motion"
    },
    "nomotion": {
        "en": "no motion",
        "de": "Nein",
        "ru": "na"
    },
    "Text-Color": {
        "en": "Text Color",
        "de": "Textfarbe",
        "ru": "na"
    },
    "opac-white": {
        "en": "white opacity",
        "de": "Transparenz Weiss",
        "ru": "na"
    },
    "opac-red": {
        "en": "Red opacity",
        "de": "Transparenz Rot",
        "ru": "na"
    },
    "opac-blue": {
        "en": "blue opacity",
        "de": "Transparenz Blau",
        "ru": "na"
    },
    "opac-purple": {
        "en": "purple opacity",
        "de": "Transparenz Lila",
        "ru": "na"
    },
    "opac-green": {
        "en": "green opacity",
        "de": "Transparenz Grün",
        "ru": "na"
    },
    "opacity-color": {
        "en": "opacity color",
        "de": "Transparenz Farbe",
        "ru": "na"
    },
    "colorizeByTemp": {
        "en": "colorize By Temp",
        "de": "einfärben durch Temp",
        "ru": "раскрасить по температуре",
        "pt": "colorir por Temp",
        "nl": "inkleuren door temp",
        "fr": "coloriser par température",
        "it": "colorize By Temp",
        "es": "colorear por temperatura",
        "pl": "koloruj według temp",
        "zh-cn": "通过临时着色"
    },
    "below": {
        "en": "below",
        "de": "niedriger",
        "ru": "ниже",
        "pt": "abaixo",
        "nl": "hieronder",
        "fr": "au dessous de",
        "it": "sotto",
        "es": "abajo",
        "pl": "poniżej",
        "zh-cn": "下面"
    },
    "normal": {
        "en": "normal",
        "de": "normal",
        "ru": "нормальный",
        "pt": "normal",
        "nl": "normaal",
        "fr": "Ordinaire",
        "it": "normale",
        "es": "normal",
        "pl": "normalna",
        "zh-cn": "正常"
    },
    "above": {
        "en": "above",
        "de": "über",
        "ru": "выше",
        "pt": "acima",
        "nl": "bovenstaande",
        "fr": "au dessus",
        "it": "sopra",
        "es": "encima",
        "pl": "powyżej",
        "zh-cn": "以上"
    }
});

vis.binds.material = {
    version: "0.3.0",
    showVersion: function() {
        if (vis.binds.material.version) {
            console.log('Version material: ' + vis.binds.material.version);
            vis.binds.material.version = null;
        }
    },
    tplMdListDoor: function(widgetID, view, data) {
        const srcOpen = 'widgets/material/img/fts_door_open.png';
        const srcClosed = 'widgets/material/img/fts_door.png';
        const valOpen = _('open');
        const valClosed = _('closed');

        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
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
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListWindow: function(widgetID, view, data) {
        const srcOpen = 'widgets/material/img/fts_window_2w_open.png';
        const srcClosed = 'widgets/material/img/fts_window_2w.png';
        const valOpen = _('open');
        const valClosed = _('closed');
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
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
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListTemp: function(widgetID, view, data) {
        var $div = $('#' + widgetID);
        const $colorize = data.attr('colorizeByTemp');
        const $low = data.attr('below');
        const $normal = data.attr('normal');
        const $high = data.attr('above');
        const $original_class = data.attr('opacity-color');

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
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
            if ($colorize == true) {
                if (state <= $low) {
                    console.log('Temperatur ist niedrig ');
                    $div.find('.my_child').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass('opac-below');
                } else if (state > $normal && state < $above) {
                    $div.find('.my_child').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass($original_class);
                } else if (state >= $above) {
                    console.log('Temperatur ist hoch');
                    $div.find('.my_child').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass('opac-above');
                } else {
                    console.log('Fehler in Temperatur berechnung');
                }
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListHumid: function(widgetID, view, data) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
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
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value 
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListOccupancy: function(widgetID, view, data) {
        const srcMotion = 'widgets/material/img/motion.png';
        const srcNoMotion = 'widgets/material/img/no-motion.png';
        const valMotion = _('motion');
        const valNoMotion = _('nomotion');

        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds.material.tplMdListOccupancy(widgetID, view, data);
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
            var value = (state) ? valMotion : valNoMotion;
            var src = (state) ? srcMotion : srcNoMotion;
            $div.find('.md-list-value').html(value);
            $div.find('.md-list-icon').find('img').attr('src', src);

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListLight: function(widgetID, view, data) {
        const srcOff = 'widgets/material/img/light_light_dim_00.png';
        const srcOn = 'widgets/material/img/light_light_dim_100.png';
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
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
            $this.change(function() {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListWindowShutter: function(widgetID, view, data) {
        const srcOff = 'widgets/material/img/light_light_dim_00.png';
        const srcOn = 'widgets/material/img/light_light_dim_100.png';
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds.material.tplMdListWindowShutter(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var percent = Math.ceil(state / 10);
            var name;

            console.log("Status: " + state);

            if (data.attr('inverted') == true) {

                name = 10 - parseInt(percent);
                console.log('Inverted -> name: ' + name);
            } else {
                name = percent;
            }

            var src = 'widgets/material/img/fts_shutter_' + name + '0.png';
            console.log(' name : ' + name + " Icon : " + src);
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
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListLightDim: function(widgetID, view, data) {
        const srcOff = 'widgets/material/img/light_light_dim_00.png';
        const srcOn = 'widgets/material/img/light_light_dim_100.png';
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
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
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListLightKelvin: function(widgetID, view, data) {
        const srcCold = 'widgets/material/img/fts_kelvin_kaltweiss.png';
        const srcMedium = 'widgets/material/img/fts_kelvin_mittel.png';
        const srcWarm = 'widgets/material/img/fts_kelvin_warmweiss.png';

        var $div = $('#' + widgetID);
        console.log('LightKelvin called');
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds.material.tplMdListLightKelvin(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var drittel = (data.attr('max') - data.attr('min')) / 3;
            /*console.log("ein Drittel ist: " + drittel + " von  :" + data.attr('max'));
            console.log("Minimum : " + data.attr('min'));
            console.log('Maximum : ' + data.attr('max'));
            console.log('state : ' + state);*/
            var medium = parseInt(data.attr('min')) + parseInt(drittel);
            var cold = parseInt(data.attr('max')) - parseInt(drittel);
            var src;
            if (state >= data.attr('min') && state < medium) {
                console.log('warmweiss : min -> ' + data.attr('min') + " state -> " + state + " medium ->" + medium);
                src = srcWarm;
            } else if (state >= medium && state < cold) {
                console.log('medium: min -> ' + data.attr('min') + " state -> " + state + " medium ->" + medium);
                src = srcMedium;
            } else if (state >= cold && state <= data.attr('max')) {
                console.log('kaltweiss: max -> ' + data.attr('max') + " state -> " + state + " cold ->" + cold);
                src = srcCold;
            } else {
                console.log('Fehler');
                src = 'Fehler';
            }
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
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    }
};

vis.binds.material.showVersion();