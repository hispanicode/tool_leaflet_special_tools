
export const special_tools_wms = function() {

	return true;
        
};

special_tools_wms.prototype.load = async function(L, special_tools) {
    
    special_tools_wms.prototype.special_tools = special_tools;
    
    L.Control.SpecialToolsWMS = L.Control.extend({

        onAdd: function () {

            const self = special_tools_wms.prototype.special_tools;

            const controlDiv = L.DomUtil.create('div', 'st-WMS st-controls st-disable');
            controlDiv.innerText = 'WMS';
            special_tools_wms.prototype.controlDiv = controlDiv;
            
            self.tool.google_translate({

                element_html: controlDiv,
                attribute: 'title',
                str: 'Servicios WMS', 
                lang: self.lang

            });

            self.special_tools_btns.appendChild(controlDiv);

            special_tools_wms.prototype.init_wms();
            
            L.DomEvent.on(controlDiv, 'click', function() {

                    L.DomUtil.addClass(controlDiv, 'st-enable');
                    L.DomUtil.removeClass(controlDiv, 'st-disable');

                    self.only_one_active_control(controlDiv);

                    special_tools_wms.prototype.load_modal();

                });
            
            const false_div = L.DomUtil.create('div');

            return false_div;
            
        }

    });
    
    L.control.specialToolsWMS = function (options) {

        return new L.Control.SpecialToolsWMS(options);

    };
    
};

special_tools_wms.prototype.init_wms = function() {
    
    const self = this.special_tools;
    
    self.wms_array = new Array();

    self.map.createPane('wms');
    self.map.getPane('wms').style.zIndex = 200;

    let promise = self.tool.select_wms({});

    promise.then(function(data) {

        if (data.success) {

            let content = JSON.parse(data.content);
            
            self.wms = content.wms;

            for (let index in self.wms) {

                if (self.wms[index].view) {

                    const wms_layer =  L.tileLayer.wms(self.wms[index].url + '?', {

                        request: 'getMap',
                        layers: self.wms[index].name,
                        format: 'image/png',
                        opacity: self.wms[index].opacity,
                        transparent: false,
                        pane: 'wms'

                    });

                    wms_layer.addTo(self.map);

                }

            }

        }

    });
    
};

special_tools_wms.prototype.load_modal = function() {
    
    const _this = this;
    
    const self = this.special_tools;
    
    self.modal = self.new_modal("Servicios WMS");

    self.modal_body = SpecialToolsModal.getBody();
    
    self.wms_array = new Array();

    /**************************************************************************/

    const wms_url_div_1 = L.DomUtil.create('div');
    wms_url_div_1.setAttribute('class', 'st-container st-div-50');

    self.modal_body.appendChild(wms_url_div_1);
    
    /**************************************************************************/

    const wms_url_span = L.DomUtil.create('span');

    self.tool.google_translate({

        element_html: wms_url_span,
        str: "Url del servidor WMS: ", 
        lang: self.lang

    });

    wms_url_div_1.appendChild(wms_url_span);

    /**************************************************************************/

    self.wms_url_input = L.DomUtil.create('input');
    self.wms_url_input.type = 'text';
    self.wms_url_input.id = 'wms_url_input';
    self.wms_url_input.setAttribute('class', 'st-input st-input-200');

    wms_url_div_1.appendChild(self.wms_url_input);

    /**************************************************************************/

    const wms_url_div_2 = L.DomUtil.create('div');
    wms_url_div_2.setAttribute('class', 'st-container st-div-50');

    self.modal_body.appendChild(wms_url_div_2);

    /**************************************************************************/

    self.wms_url_btn = L.DomUtil.create('button');
    self.wms_url_btn.type = 'button';
    self.wms_url_btn.id = 'wms_url_btn';
    self.wms_url_btn.setAttribute('class', 'st-btn st-btn-success');

    self.tool.google_translate({

        element_html: self.wms_url_btn,
        str: "Buscar capas", 
        lang: self.lang

    });
    
    wms_url_div_2.appendChild(self.wms_url_btn);
    
    /**************************************************************************/

    self.wms_clear_btn = L.DomUtil.create('button');
    self.wms_clear_btn.type = 'button';
    self.wms_clear_btn.id = 'wms_clear_btn';
    self.wms_clear_btn.setAttribute('class', 'st-btn st-btn-default');

    self.tool.google_translate({

        element_html: self.wms_clear_btn,
        str: "Limpiar búsqueda", 
        lang: self.lang

    });

    wms_url_div_2.appendChild(self.wms_clear_btn);
    
    /**************************************************************************/

    const div_clear = L.DomUtil.create('div');
    div_clear.style.clear = 'left';

    self.modal_body.appendChild(div_clear);
    
    /**************************************************************************/

    self.list_layers_div = L.DomUtil.create('div');
    self.list_layers_div.id = 'list_layers_div';
    self.list_layers_div.setAttribute('class', 'st-container');

    self.modal_body.appendChild(self.list_layers_div);
    
    /**************************************************************************/

    const title_layers_div = L.DomUtil.create('div');
    title_layers_div.setAttribute('class', 'st-container st-h1');

    self.tool.google_translate({

        element_html: title_layers_div,
        str: "Capas disponibles", 
        lang: self.lang

    });
    
    self.modal_body.appendChild(title_layers_div);

    /**************************************************************************/

    self.my_list_layers_div = L.DomUtil.create('div');
    self.my_list_layers_div.id = 'my_list_layers_div';
    self.my_list_layers_div.setAttribute('class', 'st-container');

    self.modal_body.appendChild(self.my_list_layers_div);
    
    /**************************************************************************/

    L.DomEvent.on(self.wms_clear_btn, 'click', function(e) {

        self.list_layers_div.innerHTML = '';

        L.DomEvent.preventDefault(e);

    });

    self.map.eachLayer(function(layer) {

        if (layer instanceof L.TileLayer.WMS) {

            layer.removeFrom(self.map);

        }

    });

    _this.load_wms();
    
    _this.wms_search_event();
    
};

special_tools_wms.prototype.wms_search_event = function() {
    
    const self = this.special_tools;
    
    L.DomEvent.on(self.wms_url_btn, 'click', function(e) {

        const search = self.wms_url_input.value;

        if (!self.is_url(search)) {

            self.modal_message("Por favor, introduzca una url correcta.");

            return;

        }

        let options = {};

        options.search = search;

        let promise = self.tool.get_wms_layers(options);

        promise.then(function(data) {

            if (data.success) {

                self.list_layers_div.innerHTML = '';

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data.content,"text/xml");

                const layers = xmlDoc.getElementsByTagName('Layer');

                for (let x = 0; x < layers.length; x++) {

                    const queryable = layers[x].getAttribute('queryable');

                    if (queryable !== null) {

                        const layer_name = layers[x].getElementsByTagName('Name')[0].textContent;
                        const layer_title = layers[x].getElementsByTagName('Title')[0].textContent;

                        const layer_div = L.DomUtil.create('div');
                        layer_div.setAttribute('class', 'st-container');

                        self.list_layers_div.appendChild(layer_div);

                        const layer_btn = L.DomUtil.create('button');
                        layer_btn.type = 'button';
                        layer_btn.setAttribute('class', 'st-btn st-btn-transparent');
                        layer_btn.setAttribute('layer-name', layer_name);
                        layer_btn.innerText = layer_title;

                        layer_div.appendChild(layer_btn);

                        L.DomEvent.on(layer_btn, 'click', function() {


                            let options = {};

                            options.wms_url = data.url;
                            options.wms_name = layer_name;
                            options.wms_title = layer_title;
                            options.wms_opacity = 0.7;

                            let promise = self.tool.create_wms(options);

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

                                    self.wms_array.push(wms_layer);

                                    self.modal_message("Capa guardada con éxito");

                                    const layer_div = L.DomUtil.create('div');
                                    layer_div.setAttribute('class', 'st-container layer-div');

                                    self.my_list_layers_div.appendChild(layer_div);

                                    const layer_input_text = L.DomUtil.create('input');
                                    layer_input_text.readonly = true;
                                    layer_input_text.value = layer_title;
                                    layer_input_text.setAttribute('class', 'st-input st-input-175');
                                    layer_input_text.style.position = 'relative';
                                    layer_input_text.style.top = '-4px';

                                    layer_div.appendChild(layer_input_text);

                                    /************************************************************/

                                    const layer_view_btn = L.DomUtil.create('button');
                                    layer_view_btn.setAttribute('class', 'st-btn st-btn-white layer-view-btn');
                                    layer_view_btn.setAttribute('wms-index', self.wms_array.length-1);
                                    layer_view_btn.setAttribute('view', '0');

                                    layer_div.appendChild(layer_view_btn);

                                    /************************************************************/

                                    const icon_view_btn = L.DomUtil.create('img');
                                    icon_view_btn.src = self.tool.tool_url() + '/img/view.png';
                                    icon_view_btn.width = 16;
                                    icon_view_btn.height = 16;

                                    layer_view_btn.appendChild(icon_view_btn);

                                    /*************************************************************/

                                    const layer_opacity_span = L.DomUtil.create('span');

                                    self.tool.google_translate({

                                        element_html: layer_opacity_span,
                                        str: 'Opacidad:', 
                                        lang: self.lang

                                    });

                                    layer_div.appendChild(layer_opacity_span);

                                    /*************************************************************/

                                    const layer_opacity_input = L.DomUtil.create('input');
                                    layer_opacity_input.type = 'range';
                                    layer_opacity_input.id = 'layer_opacity_input';
                                    layer_opacity_input.setAttribute('class', 'st-input st-input-75');
                                    layer_opacity_input.setAttribute('wms-index', self.wms_array.length-1);
                                    layer_opacity_input.setAttribute('min', 0);
                                    layer_opacity_input.setAttribute('max', 1);
                                    layer_opacity_input.setAttribute('step', 0.1);
                                    layer_opacity_input.value = 0.7;
                                    layer_opacity_input.style.position = 'relative';
                                    layer_opacity_input.style.top = '8px';

                                    layer_div.appendChild(layer_opacity_input);

                                    /*************************************************************/

                                    const layer_delete_btn = L.DomUtil.create('button');
                                    layer_delete_btn.setAttribute('class', 'st-btn st-btn-danger layer-delete-btn');
                                    layer_delete_btn.setAttribute('wms-index', self.wms_array.length-1);

                                    layer_div.appendChild(layer_delete_btn);

                                    /*************************************************************/

                                    const icon_delete_btn = L.DomUtil.create('img');
                                    icon_delete_btn.src = self.tool.tool_url() + '/img/trash.png';
                                    icon_delete_btn.width = 16;
                                    icon_delete_btn.height = 16;

                                    layer_delete_btn.appendChild(icon_delete_btn);

                                    /*************************************************************/

                                    L.DomEvent.on(layer_view_btn, 'click', function() {

                                        const wms_index = this.getAttribute('wms-index');
                                        
                                        self.view = this.getAttribute('view');

                                        if (self.view === '0') {

                                            self._view = true;
                                            this.setAttribute('view', '1');
                                            icon_view_btn.src = self.tool.tool_url() + '/img/hide.png';
                                            
                                            self.tool.update_wms({view: true, wms_index: wms_index});


                                        } else {

                                            self._view = false;

                                            this.setAttribute('view', '0');
                                            icon_view_btn.src = self.tool.tool_url() + '/img/view.png';

                                            self.tool.update_wms({view: false, wms_index: wms_index});

                                        }

                                        if (self._view) {

                                            self.wms_array[wms_index].addTo(self.map);

                                            self.modal_message("Capa cargada con éxito en el mapa");

                                        } else {

                                            self.wms_array[wms_index].removeFrom(self.map);

                                            self.modal_message("Capa quitada con éxito del mapa");

                                        }

                                    });

                                    L.DomEvent.on(layer_delete_btn, 'click', function() {

                                        this.disabled = true;

                                        const wms_index = this.getAttribute('wms-index');

                                        let options = {};
                                        options.wms_index = wms_index;

                                        let promise = self.tool.remove_wms(options);

                                        promise.then(function(__data) {

                                            if (__data.success) {

                                                self.wms_array[wms_index].removeFrom(self.map);
                                                
                                                delete self.wms_array[wms_index];

                                                self.wms_array = self.wms_array.flat();

                                                window.setTimeout(function() {

                                                    layer_div.remove();

                                                    self.modal_message("Capa eliminada con éxito");

                                                    const layers_divs = self.my_list_layers_div.querySelectorAll('.layer-div');

                                                    for (let x = 0; x < layers_divs.length; x++) {

                                                        layers_divs[x].querySelector('.layer-delete-btn').setAttribute('wms-index', x);
                                                        layers_divs[x].querySelector('.layer-view-btn').setAttribute('wms-index', x);

                                                    }

                                                }, 100);

                                            } else {

                                                self.modal_message(__data.msg);

                                            }

                                        });

                                    });

                                    L.DomEvent.on(layer_opacity_input, 'input change', function() {

                                        const opacity_value = parseFloat(this.value);
                                        const wms_index = this.getAttribute('wms-index');

                                        if (opacity_value >= 0 && opacity_value <= 1) {

                                            let options = {};

                                            options.wms_opacity = parseFloat(this.value);
                                            options.wms_index = wms_index;

                                            self.tool.update_wms(options);

                                            wms_layer.setOpacity(parseFloat(this.value));

                                        }

                                    });

                                } else {

                                    self.modal_message(_data.msg);

                                }

                            });                                               

                        });

                    }

                }  

            } else {

                self.modal_message(data.msg);

            }

        });

        L.DomEvent.preventDefault(e);

    });
    
};

special_tools_wms.prototype.load_wms = function() {
    
    const self = this.special_tools;
    
    let promise = self.tool.select_wms({});

    promise.then(function(data) {

        if (data.success) {

            let content = JSON.parse(data.content);
            self.wms = content.wms;

            for (let index in self.wms) {

                const wms_layer =  L.tileLayer.wms(self.wms[index].url + '?', {

                    request: 'getMap',
                    layers: self.wms[index].name,
                    format: 'image/png',
                    opacity: self.wms[index].opacity,
                    transparent: false,
                    pane: 'wms'

                });

                self.wms_array.push(wms_layer);

                const layer_div = L.DomUtil.create('div');
                layer_div.setAttribute('class', 'st-container layer-div');

                self.my_list_layers_div.appendChild(layer_div);

                const layer_input_text = L.DomUtil.create('input');
                layer_input_text.setAttribute('readonly', true);
                layer_input_text.value = self.wms[index].title;
                layer_input_text.setAttribute('class', 'st-input st-input-175');
                layer_input_text.style.position = 'relative';
                layer_input_text.style.top = '-4px';

                layer_div.appendChild(layer_input_text);

                const layer_view_btn = L.DomUtil.create('button');
                layer_view_btn.setAttribute('class', 'st-btn st-btn-white layer-view-btn');
                layer_view_btn.setAttribute('wms-index', index);

                layer_div.appendChild(layer_view_btn);

                const icon_view_btn = L.DomUtil.create('img');
                icon_view_btn.width = 16;
                icon_view_btn.height = 16;

                layer_view_btn.appendChild(icon_view_btn);

                if (self.wms[index].view) {

                    layer_view_btn.setAttribute('view', '1');
                    icon_view_btn.src = self.tool.tool_url() + '/img/hide.png';

                    wms_layer.addTo(self.map);

                } else {

                    layer_view_btn.setAttribute('view', '0');
                    icon_view_btn.src = self.tool.tool_url() + '/img/view.png';

                }

                /***********************************************************/
                const layer_opacity_span = L.DomUtil.create('span');

                self.tool.google_translate({

                    element_html: layer_opacity_span,
                    str: 'Opacidad:', 
                    lang: self.lang

                });

                layer_div.appendChild(layer_opacity_span);

                /*************************************************************/

                const layer_opacity_input = L.DomUtil.create('input');
                layer_opacity_input.type = 'range';
                layer_opacity_input.id = 'layer_opacity_input';
                layer_opacity_input.setAttribute('class', 'st-input st-input-75');
                layer_opacity_input.setAttribute('wms-index', index);
                layer_opacity_input.setAttribute('min', 0);
                layer_opacity_input.setAttribute('max', 1);
                layer_opacity_input.setAttribute('step', 0.1);
                layer_opacity_input.value = self.wms[index].opacity;
                layer_opacity_input.style.position = 'relative';
                layer_opacity_input.style.top = '8px';

                layer_div.appendChild(layer_opacity_input);

                /*************************************************************/

                const layer_delete_btn = L.DomUtil.create('button');
                layer_delete_btn.setAttribute('class', 'st-btn st-btn-danger layer-delete-btn');
                layer_delete_btn.setAttribute('wms-index', index);

                layer_div.appendChild(layer_delete_btn);

                const icon_delete_btn = L.DomUtil.create('img');
                icon_delete_btn.width = 16;
                icon_delete_btn.height = 16;
                icon_delete_btn.src = self.tool.tool_url() + '/img/trash.png';

                layer_delete_btn.appendChild(icon_delete_btn);

                L.DomEvent.on(layer_view_btn, 'click', function() {

                    const wms_index = this.getAttribute('wms-index');

                    self.view = this.getAttribute('view');

                    if (self.view === '0') {

                        self._view = true;

                        this.setAttribute('view', '1');

                        icon_view_btn.src = self.tool.tool_url() + '/img/hide.png';

                        self.tool.update_wms({view: true, wms_index: wms_index});


                    } else {

                        self._view = false;

                        this.setAttribute('view', '0');

                        icon_view_btn.src = self.tool.tool_url() + '/img/view.png';

                        self.tool.update_wms({view: false, wms_index: wms_index});

                    }

                    if (self._view) {

                        self.wms_array[wms_index].addTo(self.map);

                        self.modal_message("Capa cargada con éxito en el mapa");

                    } else {

                        self.wms_array[wms_index].removeFrom(self.map);

                        self.modal_message("Capa quitada con éxito del mapa");

                    }

                });

                L.DomEvent.on(layer_delete_btn, 'click', function() {

                    this.disabled = true;

                    const wms_index = this.getAttribute('wms-index');

                    let options = {};

                    options.wms_index = wms_index;

                    let promise = self.tool.remove_wms(options);

                    promise.then(function(__data) {

                        if (__data.success) {

                            self.wms_array[wms_index].removeFrom(self.map);
                            
                            delete self.wms_array[wms_index];

                            self.wms_array = self.wms_array.flat();

                            window.setTimeout(function() {

                                layer_div.remove();

                                self.modal_message("Capa eliminada con éxito");

                                const layers_divs = self.my_list_layers_div.querySelectorAll('.layer-div');

                                for (let x = 0; x < layers_divs.length; x++) {

                                    layers_divs[x].querySelector('.layer-delete-btn').setAttribute('wms-index', x);
                                    layers_divs[x].querySelector('.layer-view-btn').setAttribute('wms-index', x);

                                }

                            }, 100);

                        } else {

                            self.modal_message(__data.msg);

                        }

                    });

                });

                L.DomEvent.on(layer_opacity_input, 'input change', function() {

                    if (parseFloat(this.value) >= 0 && parseFloat(this.value) <= 1) {

                        const wms_index = this.getAttribute('wms-index');

                        let options = {};

                        options.wms_opacity = this.value;
                        options.wms_index = wms_index;

                        self.tool.update_wms(options);

                        self.wms_array[wms_index].setOpacity(parseFloat(this.value));

                    }

                });

            }

        } else {

            self.modal_message(data.msg);

        }

    });
    
};