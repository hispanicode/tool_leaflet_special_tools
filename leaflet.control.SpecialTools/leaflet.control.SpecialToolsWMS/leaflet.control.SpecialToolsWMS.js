/*
 * Author: Manuel Jesús Dávila González
 * e-mail: manudavgonz@gmail.com
 */
L.Control.SpecialToolsWMS = L.Control.extend({
    
    onAdd: function (map) {
        
        const self = this;
        
        const special_tools = this.options.special_tools;

        const tool = special_tools.options.tool;
        
        const lang = special_tools.options.lang;

        const component_geolocation = special_tools.options.component_geolocation;

        const controlDiv = L.DomUtil.create('div', 'special-tools-WMS special-tools-controls special-tools-disable');
        controlDiv.innerText = 'WMS';
        
        tool.google_translate({

            element_html: controlDiv,
            attribute: 'title',
            str: 'Servicios WMS', 
            lang: lang

        });

        special_tools.special_tools_btns.appendChild(controlDiv);
        
        var wms_array = new Array();
        
        map.createPane('wms');
        map.getPane('wms').style.zIndex = 200;
        
        let promise = tool.select_wms({});
        
        promise.then(function(data) {
            
            if (data.success) {
                
                let content = JSON.parse(data.content);
                const wms = content.wms;

                for (let index in wms) {
                    
                    if (wms[index].view) {
                                
                        const wms_layer =  L.tileLayer.wms(wms[index].url + '?', {

                            request: 'getMap',
                            layers: wms[index].name,
                            format: 'image/png',
                            opacity: wms[index].opacity,
                            transparent: false,
                            pane: 'wms'

                        });

                        wms_layer.addTo(map);
                    
                    }
                                
                }
                
            }
            
        });

        L.DomEvent.addListener(controlDiv, 'click', function(){
            
            L.DomUtil.addClass(controlDiv, 'special-tools-enable');
            L.DomUtil.removeClass(controlDiv, 'special-tools-disable');
            
            let elements_controls = special_tools.controlDiv.querySelectorAll('.special-tools-controls');

            try {
                special_tools.only_one_control_active(elements_controls, controlDiv);
            } catch (e) {};

            map.fire('modal', {
                
              template: ['<div class="modal-header"></div>',
                '<hr>',
                '<div class="modal-body"></div>'
              ].join(''),

              width: 'auto',
                
                onShow: function(evt){
                    
                    wms_array = new Array();

                    modal = evt.modal;
                    
                    const modal_content = modal._container.querySelector('.modal-content');
                    
                    modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    modal_content.style.marginTop = '80px';
                    
                    const modal_header = modal._container.querySelector('.modal-header');
                    
                    const modal_title = L.DomUtil.create('div');
                    modal_title.setAttribute('class', 'special-tools-h1');
                    
                    modal_header.appendChild(modal_title);
                    
                    tool.google_translate({

                        element_html: modal_title,
                        str: "Servicios WMS", 
                        lang: lang

                    });
                    
                    const modal_body = modal._container.querySelector('.modal-body');

                    const wms_url_div_1 = L.DomUtil.create('div');
                    wms_url_div_1.setAttribute('class', 'special-tools-container special-tools-div-50');
                    
                    modal_body.appendChild(wms_url_div_1);
                    
                    const wms_url_span = L.DomUtil.create('span');
                    
                    wms_url_div_1.appendChild(wms_url_span);
                    
                    tool.google_translate({

                        element_html: wms_url_span,
                        str: "Url del servidor WMS: ", 
                        lang: lang

                    });
                    
                    const wms_url_input = L.DomUtil.create('input');
                    wms_url_input.type = 'text';
                    wms_url_input.id = 'wms_url_input';
                    wms_url_input.setAttribute('class', 'special-tools-input-200');
                            
                    wms_url_div_1.appendChild(wms_url_input);
                    
                    const wms_url_div_2 = L.DomUtil.create('div');
                    wms_url_div_2.setAttribute('class', 'special-tools-container special-tools-div-50');
                    
                    modal_body.appendChild(wms_url_div_2);
                    
                    const wms_url_btn = L.DomUtil.create('button');
                    wms_url_btn.type = 'button';
                    wms_url_btn.id = 'wms_url_btn';
                    wms_url_btn.setAttribute('class', 'special-tools-btn-primary');
                    
                    wms_url_div_2.appendChild(wms_url_btn);
                    
                    tool.google_translate({

                        element_html: wms_url_btn,
                        str: "Buscar capas", 
                        lang: lang

                    });
                    
                    const wms_clear_btn = L.DomUtil.create('button');
                    wms_clear_btn.type = 'button';
                    wms_clear_btn.id = 'wms_clear_btn';
                    wms_clear_btn.setAttribute('class', 'special-tools-btn-default');
                    
                    wms_url_div_2.appendChild(wms_clear_btn);
                    
                    tool.google_translate({

                        element_html: wms_clear_btn,
                        str: "Limpiar búsqueda", 
                        lang: lang

                    });
                    
                    const div_clear = L.DomUtil.create('div');
                    div_clear.style.clear = 'left';
                    
                    modal_body.appendChild(div_clear);
                    
                    const list_layers_div = L.DomUtil.create('div');
                    list_layers_div.id = 'list_layers_div';
                    list_layers_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(list_layers_div);
                    
                    const title_layers_div = L.DomUtil.create('div');
                    title_layers_div.setAttribute('class', 'special-tools-container special-tools-h1');
                    
                    modal_body.appendChild(title_layers_div);
                    
                    tool.google_translate({

                        element_html: title_layers_div,
                        str: "Capas disponibles", 
                        lang: lang

                    });
                    
                    const mylist_layers_div = L.DomUtil.create('div');
                    mylist_layers_div.id = 'mylist_layers_div';
                    mylist_layers_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(mylist_layers_div);
                    
                    const _wms_url_btn = modal._container.querySelector('#wms_url_btn');
                    const _wms_clear_btn = modal._container.querySelector('#wms_clear_btn');
                    const _wms_url_input = modal._container.querySelector('#wms_url_input');
                    const _list_layers_div = modal._container.querySelector('#list_layers_div');
                    const _mylist_layers_div = modal._container.querySelector('#mylist_layers_div');
                    
                    L.DomEvent.on(_wms_clear_btn, 'click', function(e) {
                        
                        _list_layers_div.innerHTML = '';
                        
                        L.DomEvent.preventDefault(e);
                        
                    });
                    
                    map.eachLayer(function(layer) {
                        
                        if (layer instanceof L.TileLayer.WMS) {
                            
                            layer.removeFrom(map);
                            
                        }
                        
                    });
                    
                    let promise = tool.select_wms({});
                    
                    promise.then(function(data) {
                        
                        if (data.success) {

                            let content = JSON.parse(data.content);
                            const wms = content.wms;

                            for (let index in wms) {
                                
                                const wms_layer =  L.tileLayer.wms(wms[index].url + '?', {

                                    request: 'getMap',
                                    layers: wms[index].name,
                                    format: 'image/png',
                                    opacity: wms[index].opacity,
                                    transparent: false,
                                    pane: 'wms'

                                });

                                wms_array.push(wms_layer);

                                const layer_div = L.DomUtil.create('div');
                                layer_div.setAttribute('class', 'special-tools-container layer-div');

                                _mylist_layers_div.appendChild(layer_div);

                                const layer_input_text = L.DomUtil.create('input');
                                layer_input_text.setAttribute('readonly', true);
                                layer_input_text.value = wms[index].title;
                                layer_input_text.setAttribute('class', 'special-tools-input-175');
                                layer_input_text.style.position = 'relative';
                                layer_input_text.style.top = '-4px';

                                layer_div.appendChild(layer_input_text);

                                const layer_view_btn = L.DomUtil.create('button');
                                layer_view_btn.setAttribute('class', 'special-tools-btn-white layer-view-btn');
                                layer_view_btn.setAttribute('wms-index', index);

                                layer_div.appendChild(layer_view_btn);
                                
                                const icon_view_btn = L.DomUtil.create('img');
                                icon_view_btn.width = 16;
                                icon_view_btn.height = 16;
                                
                                layer_view_btn.appendChild(icon_view_btn);
                                
                                if (wms[index].view) {
                                    
                                    layer_view_btn.setAttribute('view', '1');
                                    icon_view_btn.src = tool.controls_url() + '/leaflet.control.SpecialToolsWMS/img/hide.png';

                                    wms_layer.addTo(map);
                                    
                                } else {
                                    
                                    layer_view_btn.setAttribute('view', '0');
                                    icon_view_btn.src = tool.controls_url() + '/leaflet.control.SpecialToolsWMS/img/view.png';
                                    
                                }

                                /***********************************************************/
                                const layer_opacity_span = L.DomUtil.create('span');

                                tool.google_translate({

                                    element_html: layer_opacity_span,
                                    str: 'Opacidad: ', 
                                    lang: lang

                                });

                                layer_div.appendChild(layer_opacity_span);

                                /*************************************************************/

                                const layer_opacity_input = L.DomUtil.create('input');
                                layer_opacity_input.type = 'range';
                                layer_opacity_input.id = 'layer_opacity_input';
                                layer_opacity_input.setAttribute('class', 'special-tools-input-75');
                                layer_opacity_input.setAttribute('wms-index', index);
                                layer_opacity_input.setAttribute('min', 0);
                                layer_opacity_input.setAttribute('max', 1);
                                layer_opacity_input.setAttribute('step', 0.1);
                                layer_opacity_input.value = wms[index].opacity;
                                layer_opacity_input.style.position = 'relative';
                                layer_opacity_input.style.top = '8px';
                                
                                layer_div.appendChild(layer_opacity_input);

                                /*************************************************************/

                                const layer_delete_btn = L.DomUtil.create('button');
                                layer_delete_btn.setAttribute('class', 'special-tools-btn-danger layer-delete-btn');
                                layer_delete_btn.setAttribute('wms-index', index);

                                layer_div.appendChild(layer_delete_btn);
                                
                                const icon_delete_btn = L.DomUtil.create('img');
                                icon_delete_btn.width = 16;
                                icon_delete_btn.height = 16;
                                icon_delete_btn.src = tool.controls_url() + '/leaflet.control.SpecialToolsWMS/img/trash.png';

                                layer_delete_btn.appendChild(icon_delete_btn);

                                L.DomEvent.on(layer_view_btn, 'click', function() {

                                    const wms_index = this.getAttribute('wms-index');
                                    
                                    var view = this.getAttribute('view');

                                    if (view === '0') {

                                        _view = true;
                                        
                                        this.setAttribute('view', '1');

                                        icon_view_btn.src = tool.controls_url() + '/leaflet.control.SpecialToolsWMS/img/hide.png';

                                        tool.update_wms({view: true, wms_index: wms_index});


                                    } else {

                                        _view = false;

                                        this.setAttribute('view', '0');

                                        icon_view_btn.src = tool.controls_url() + '/leaflet.control.SpecialToolsWMS/img/view.png';

                                        tool.update_wms({view: false, wms_index: wms_index});

                                    }

                                    if (_view) {

                                        wms_array[wms_index].addTo(map);
                                        
                                        special_tools.modal_message(special_tools, "Capa cargada con éxito en el mapa", lang);

                                    } else {
                                        
                                        wms_array[wms_index].removeFrom(map);
                                        
                                        special_tools.modal_message(special_tools, "Capa quitada con éxito del mapa", lang);

                                    }

                                });

                                L.DomEvent.on(layer_delete_btn, 'click', function() {
                                    
                                    this.disabled = true;

                                    const wms_index = this.getAttribute('wms-index');

                                    let options = {};
                                    
                                    options.wms_index = wms_index;

                                    let promise = tool.remove_wms(options);

                                    promise.then(function(__data) {

                                        if (__data.success) {

                                            wms_array[wms_index].removeFrom(map);

                                            wms_array = wms_array.flat();

                                            window.setTimeout(function() {

                                                layer_div.remove();
                                                
                                                special_tools.modal_message(special_tools, "Capa eliminada con éxito", lang);
                                                
                                                let layers_divs = _mylist_layers_div.querySelectorAll('.layer-div');

                                                for (let x = 0; x < layers_divs.length; x++) {

                                                    layers_divs[x].querySelector('.layer-delete-btn').setAttribute('wms-index', x);
                                                    layers_divs[x].querySelector('.layer-view-btn').setAttribute('wms-index', x);

                                                }

                                            }, 100);

                                        } else {
                                            
                                            special_tools.modal_message(special_tools, __data.msg, lang);
                                            
                                        }

                                    });

                                });
                                
                                L.DomEvent.on(layer_opacity_input, 'input change', function() {
                                    
                                    if (parseFloat(this.value) >= 0 && parseFloat(this.value) <= 1) {
                                    
                                        const wms_index = this.getAttribute('wms-index');
                                        
                                        let options = {};

                                        options.wms_opacity = this.value;
                                        options.wms_index = wms_index;
                                        
                                        tool.update_wms(options);
                                        
                                        wms_array[wms_index].setOpacity(parseFloat(this.value));
                                    
                                    }
                                    
                                });
                                
                            }

                        } else {
                            
                            special_tools.modal_message(special_tools, data.msg, lang);
                            
                        }
                        
                    });
                    
                    L.DomEvent.on(_wms_url_btn, 'click', function(e) {
                        
                        const search = _wms_url_input.value;
                        
                        if (!special_tools.is_url(search)) {
                            
                            special_tools.modal_message(special_tools, "Por favor, introduzca una url correcta.", lang);
                            
                            return;
                            
                        }
                        
                        if (special_tools.is_url(search)) {
                            
                            //Se realiza la búsqueda
                            let options = {};
                            
                            options.search = search;
                            
                            let promise = tool.get_wms_layers(options);
                            
                            promise.then(function(data) {
                                
                                if (data.success) {
                                    
                                    _list_layers_div.innerHTML = '';
                                    
                                    const parser = new DOMParser();
                                    const xmlDoc = parser.parseFromString(data.content,"text/xml");
                                    
                                    const layers = xmlDoc.getElementsByTagName('Layer');
                                    
                                    for (let x = 0; x < layers.length; x++) {
                                        
                                        const queryable = layers[x].getAttribute('queryable');
                                        
                                        if (queryable !== null) {
                                            
                                            const layer_name = layers[x].getElementsByTagName('Name')[0].textContent;
                                            const layer_title = layers[x].getElementsByTagName('Title')[0].textContent;
                                            
                                            const layer_div = L.DomUtil.create('div');
                                            layer_div.setAttribute('class', 'special-tools-container');
                                            
                                            _list_layers_div.appendChild(layer_div);
                                            
                                            const layer_btn = L.DomUtil.create('button');
                                            layer_btn.type = 'button';
                                            layer_btn.setAttribute('class', 'special-tools-btn-transparent');
                                            layer_btn.setAttribute('layer-name', layer_name);
                                            layer_btn.innerText = layer_title;
                                            
                                            layer_div.appendChild(layer_btn);
                                            
                                            L.DomEvent.on(layer_btn, 'click', function() {
                                                
                                                
                                                let options = {};
                                                
                                                options.wms_url = data.url;
                                                options.wms_name = layer_name;
                                                options.wms_title = layer_title;
                                                options.wms_opacity = 0.7;
                                                
                                                let promise = tool.create_wms(options);
                                                
                                                promise.then(function(_data) {
                                                    
                                                    if (_data.success) {
                                                                                       
                                                        const wms_layer =  L.tileLayer.wms(data.url + '?', {

                                                            request: 'getMap',
                                                            layers: layer_name,
                                                            format: 'image/png',
                                                            opacity: 0.7,
                                                            transparent: false,
                                                            pane: 'wms'

                                                        });
                                                        
                                                        wms_array.push(wms_layer);
                                                        
                                                        special_tools.modal_message(special_tools, "Capa guardada con éxito", lang);

                                                        const layer_div = L.DomUtil.create('div');
                                                        layer_div.setAttribute('class', 'special-tools-container layer-div');
                                                        
                                                        _mylist_layers_div.appendChild(layer_div);
                                                        
                                                        const layer_input_text = L.DomUtil.create('input');
                                                        layer_input_text.readonly = true;
                                                        layer_input_text.value = layer_title;
                                                        layer_input_text.setAttribute('class', 'special-tools-input-175');
                                                        layer_input_text.style.position = 'relative';
                                                        layer_input_text.style.top = '-4px';
                                                        
                                                        layer_div.appendChild(layer_input_text);
                                                        
                                                        /************************************************************/
                                                        
                                                        const layer_view_btn = L.DomUtil.create('button');
                                                        layer_view_btn.setAttribute('class', 'special-tools-btn-white layer-view-btn');
                                                        layer_view_btn.setAttribute('wms-index', wms_array.length-1);
                                                        layer_view_btn.setAttribute('view', '0');
                                                        
                                                        layer_div.appendChild(layer_view_btn);
                                                        
                                                        /************************************************************/

                                                        const icon_view_btn = L.DomUtil.create('img');
                                                        icon_view_btn.src = tool.controls_url() + '/leaflet.control.SpecialToolsWMS/img/view.png';
                                                        icon_view_btn.width = 16;
                                                        icon_view_btn.height = 16;

                                                        layer_view_btn.appendChild(icon_view_btn);
                                                        
                                                        /*************************************************************/
                                                        
                                                        const layer_opacity_span = L.DomUtil.create('span');
                                                        
                                                        tool.google_translate({

                                                            element_html: layer_opacity_span,
                                                            str: 'Opacidad: ', 
                                                            lang: lang

                                                        });
                                                        
                                                        layer_div.appendChild(layer_opacity_span);
                                                        
                                                        /*************************************************************/
                                                        
                                                        const layer_opacity_input = L.DomUtil.create('input');
                                                        layer_opacity_input.type = 'range';
                                                        layer_opacity_input.id = 'layer_opacity_input';
                                                        layer_opacity_input.setAttribute('class', 'special-tools-input-75');
                                                        layer_opacity_input.setAttribute('wms-index', wms_array.lenght-1);
                                                        layer_opacity_input.setAttribute('min', 0);
                                                        layer_opacity_input.setAttribute('max', 1);
                                                        layer_opacity_input.setAttribute('step', 0.1);
                                                        layer_opacity_input.value = 0.7;
                                                        layer_opacity_input.style.position = 'relative';
                                                        layer_opacity_input.style.top = '8px';
                                                        
                                                        layer_div.appendChild(layer_opacity_input);
                                                        
                                                        /*************************************************************/
                                                        
                                                        const layer_delete_btn = L.DomUtil.create('button');
                                                        layer_delete_btn.setAttribute('class', 'special-tools-btn-danger layer-delete-btn');
                                                        layer_delete_btn.setAttribute('wms-index', wms_array.length-1);
                                                        
                                                        layer_div.appendChild(layer_delete_btn);
                                                        
                                                        /*************************************************************/
                                                        
                                                        const icon_delete_btn = L.DomUtil.create('img');
                                                        icon_delete_btn.src = tool.controls_url() + '/leaflet.control.SpecialToolsWMS/img/trash.png';
                                                        icon_delete_btn.width = 16;
                                                        icon_delete_btn.height = 16;
                                                        
                                                        layer_delete_btn.appendChild(icon_delete_btn);
                                                        
                                                        /*************************************************************/
                                                        
                                                        L.DomEvent.on(layer_view_btn, 'click', function() {
                                                            
                                                            const wms_index = this.getAttribute('wms-index');
                                                            var view = this.getAttribute('view');
                                                            
                                                            var _view;
                                                            
                                                            if (view === '0') {
                                                                
                                                                _view = true;
                                                                this.setAttribute('view', '1');
                                                                icon_view_btn.src = tool.controls_url() + '/leaflet.control.SpecialToolsWMS/img/hide.png';
                                                                
                                                                tool.update_wms({view: true, wms_index: wms_index});
                                                                
                                                                
                                                            } else {
                                                                
                                                                _view = false;
                                                                
                                                                this.setAttribute('view', '0');
                                                                icon_view_btn.src = tool.controls_url() + '/leaflet.control.SpecialToolsWMS/img/view.png';

                                                                tool.update_wms({view: false, wms_index: wms_index});
                                                                
                                                            }
                                                            
                                                            if (_view) {
                                                                
                                                                wms_array[wms_index].addTo(map);
                                                                
                                                                special_tools.modal_message(special_tools, "Capa cargada con éxito en el mapa", lang);
                                                            
                                                            } else {
                                                                
                                                                wms_array[wms_index].removeFrom(map);
                                                                
                                                                special_tools.modal_message(special_tools, "Capa quitada con éxito del mapa", lang);
                                                                
                                                            }
                                                                    
                                                        });
                                                        
                                                        L.DomEvent.on(layer_delete_btn, 'click', function() {
                                                            
                                                            this.disabled = true;
                                                            
                                                            const wms_index = this.getAttribute('wms-index');
                                                            
                                                            let options = {};
                                                            options.wms_index = wms_index;
                                                            
                                                            let promise = tool.remove_wms(options);
                                                            
                                                            promise.then(function(__data) {
                                                                
                                                                if (__data.success) {
                                                                    
                                                                    wms_array[wms_index].removeFrom(map);
                                                    
                                                                    wms_array = wms_array.flat();
                                                                    
                                                                    window.setTimeout(function() {
                                                                        
                                                                        layer_div.remove();
                                                                        
                                                                        special_tools.modal_message(special_tools, "Capa eliminada con éxito", lang);
                                                                        
                                                                        let layers_divs = _mylist_layers_div.querySelectorAll('.layer-div');
                                                                        
                                                                        for (let x = 0; x < layers_divs.length; x++) {
                                                                            
                                                                            layers_divs[x].querySelector('.layer-delete-btn').setAttribute('wms-index', x);
                                                                            layers_divs[x].querySelector('.layer-view-btn').setAttribute('wms-index', x);
                                                                            
                                                                        }
                                                                        
                                                                    }, 100);
                                                                    
                                                                } else {
                                                                    
                                                                    special_tools.modal_message(special_tools, __data.msg, lang);
                                                                    
                                                                }
                                                                
                                                            });
                                                            
                                                        });
                                                        
                                                        L.DomEvent.on(layer_opacity_input, 'input change', function() {

                                                            if (parseFloat(this.value) >= 0 && parseFloat(this.value) <= 1) {

                                                                const wms_index = this.getAttribute('wms-index');

                                                                let options = {};

                                                                options.wms_opacity = this.value;
                                                                options.wms_index = wms_index;
                                                                
                                                                tool.update_wms(options);
                                                                
                                                                wms_array[wms_index].setOpacity(parseFloat(this.value));

                                                            }

                                                        });
                                                    
                                                    } else {
                                                        
                                                        special_tools.modal_message(special_tools, _data.msg, lang);
                                                        
                                                    }
                                                    
                                                });                                               
                                                
                                            });
                                            
                                        }
                                        
                                    }  
                                    
                                } else {
                                    
                                    special_tools.modal_message(special_tools, data.msg, lang);
                                    
                                }
                                
                            });
                            
                            
                        }
                        
                        L.DomEvent.preventDefault(e);
                        
                    });
                    
                },
                
                onHide: function(){
                    
                    L.DomUtil.addClass(controlDiv, 'special-tools-disable');
                    L.DomUtil.removeClass(controlDiv, 'special-tools-enable');
                
                }
                
            });
             
        });
               
        const false_div = L.DomUtil.create('div');
        
        return false_div;
        
    }
});

L.control.specialToolsWMS = function (options) {
    
    return new L.Control.SpecialToolsWMS(options);
    
};
