
export const special_tools_xyz = function() {

	return true;
        
};

special_tools_xyz.prototype.load = async function(L, special_tools) {
    
    special_tools_xyz.prototype.special_tools = special_tools;
    
    L.Control.SpecialToolsXYZ = L.Control.extend({

        onAdd: function () {

            const self = special_tools_xyz.prototype.special_tools;

            const controlDiv = L.DomUtil.create('div', 'special-tools-XYZ special-tools-controls special-tools-disable');
            controlDiv.innerText = 'XYZ';
            special_tools_xyz.prototype.controlDiv = controlDiv;
            
            self.tool.google_translate({

                element_html: controlDiv,
                attribute: 'title',
                str: 'Mapas base XYZ', 
                lang: self.lang

            });

            self.special_tools_btns.appendChild(controlDiv);

            special_tools_xyz.prototype.init_xyz();
            
            L.DomEvent.on(controlDiv, 'click', function() {

                    L.DomUtil.addClass(controlDiv, 'special-tools-enable');
                    L.DomUtil.removeClass(controlDiv, 'special-tools-disable');

                    self.only_one_active_control(controlDiv);

                    special_tools_xyz.prototype.load_modal();

                });
            
            const false_div = L.DomUtil.create('div');
            false_div.style.display = 'none';

            return false_div;
            
        }

    });
    
    L.control.specialToolsXYZ = function (options) {

        return new L.Control.SpecialToolsXYZ(options);

    };
    
};

special_tools_xyz.prototype.init_xyz = function() {
    
    const self = this.special_tools;
    
    self.array_basemaps = new Array();

    let promise = self.tool.select_basemaps({});

    promise.then(function(data) {

        if (data.success) {

            const content = JSON.parse(data.content);
            self.basemaps = content.basemaps;

            if (self.basemaps.length > 0) {

                self.map.eachLayer(function(layer) {

                    if (layer instanceof L.TileLayer) {

                        layer.removeFrom(self.map);

                    }

                });

            }

            for (let index in self.basemaps) {


                const basemap_name = self.basemaps[index].name;
                const basemap_url = self.basemaps[index].url;
                const basemap_attribution = self.basemaps[index].attribution;
                const basemap_minzoom = self.basemaps[index].minzoom;
                const basemap_maxzoom = self.basemaps[index].maxzoom;

                const tilelayer = L.tileLayer(basemap_url, {

                    attribution: basemap_attribution,
                    minZoom: basemap_minzoom,
                    maxZoom: basemap_maxzoom

                });

                self.component_geolocation.layer_control.addBaseLayer(tilelayer, basemap_name);

                if (index == 0) {

                    document.querySelectorAll('.leaflet-control-layers-selector')[0].click();

                }

                self.array_basemaps.push(tilelayer);

            }

        } else {

           self.modal_message(data.msg);

        }

    });
    
};

special_tools_xyz.prototype.load_modal = function() {
    
    const _this = this;
    
    const self = this.special_tools;
    
    self.wms_basemaps = new Array();
    
    self.modal = self.new_modal("Mapas base XYZ");

    self.modal_body = self.modal._container.querySelector('.modal-body');
    
    /**************************************************************************/                 

    const basemap_input_div = L.DomUtil.create('div');
    basemap_input_div.setAttribute('class', 'special-tools-container');

    self.modal_body.appendChild(basemap_input_div);
    
    /**************************************************************************/

    self.basemap_input = L.DomUtil.create('input');
    self.basemap_input.type = 'text';
    self.basemap_input.id = 'basemap_input';
    self.basemap_input.setAttribute('class', 'special-tools-input-250');

    basemap_input_div.appendChild(self.basemap_input);

    /**************************************************************************/

    const basemap_input_span = L.DomUtil.create('span');
    
    self.tool.google_translate({

        element_html: basemap_input_span,
        str: "URL del Mapa Base (requerido)", 
        lang: self.lang

    });

    basemap_input_div.appendChild(basemap_input_span);

    /**************************************************************************/

    const name_input_div = L.DomUtil.create('div');
    name_input_div.setAttribute('class', 'special-tools-container');

    self.modal_body.appendChild(name_input_div);
    
    /**************************************************************************/

    self.name_input = L.DomUtil.create('input');
    self.name_input.type = 'text';
    self.name_input.id = 'name_input';
    self.name_input.setAttribute('class', 'special-tools-input-250');

    name_input_div.appendChild(self.name_input);

    /**************************************************************************/

    const name_input_span = L.DomUtil.create('span');
    
    self.tool.google_translate({

        element_html: name_input_span,
        str: "Nombre del Mapa Base (requerido)", 
        lang: self.lang

    });

    name_input_div.appendChild(name_input_span);

    /**************************************************************************/

    const attribution_input_div = L.DomUtil.create('div');
    attribution_input_div.setAttribute('class', 'special-tools-container');

    self.modal_body.appendChild(attribution_input_div);
    
    /**************************************************************************/

    self.attribution_input = L.DomUtil.create('input');
    self.attribution_input.type = 'text';
    self.attribution_input.id = 'attribution_input';
    self.attribution_input.setAttribute('class', 'special-tools-input-250');

    attribution_input_div.appendChild(self.attribution_input);
    
    /**************************************************************************/

    const attribution_input_span = L.DomUtil.create('span');
    
    self.tool.google_translate({

        element_html: attribution_input_span,
        str: "Atribución (no requerido)", 
        lang: self.lang

    });

    attribution_input_div.appendChild(attribution_input_span);

    /**************************************************************************/

    const minzoom_input_div = L.DomUtil.create('div');
    minzoom_input_div.setAttribute('class', 'special-tools-container');

    self.modal_body.appendChild(minzoom_input_div);
    
    /**************************************************************************/

    self.minzoom_input = L.DomUtil.create('input');
    self.minzoom_input.type = 'text';
    self.minzoom_input.id = 'minzoom_input';
    self.minzoom_input.setAttribute('class', 'special-tools-input-50');
    self.minzoom_input.value = 0;

    minzoom_input_div.appendChild(self.minzoom_input);
    
    /**************************************************************************/

    const minzoom_input_span = L.DomUtil.create('span');
    
    self.tool.google_translate({

        element_html: minzoom_input_span,
        str: "MinZoom (requerido) Por defecto 0", 
        lang: self.lang

    });

    minzoom_input_div.appendChild(minzoom_input_span);

    /**************************************************************************/

    const maxzoom_input_div = L.DomUtil.create('div');
    maxzoom_input_div.setAttribute('class', 'special-tools-container');

    self.modal_body.appendChild(maxzoom_input_div);
    
    /**************************************************************************/

    self.maxzoom_input = L.DomUtil.create('input');
    self.maxzoom_input.type = 'text';
    self.maxzoom_input.id = 'maxzoom_input';
    self.maxzoom_input.setAttribute('class', 'special-tools-input-50');
    self.maxzoom_input.value = 18;

    maxzoom_input_div.appendChild(self.maxzoom_input);
    
    /**************************************************************************/

    const maxzoom_input_span = L.DomUtil.create('span');
    
    self.tool.google_translate({

        element_html: maxzoom_input_span,
        str: "MaxZoom (requerido) Por defecto 18", 
        lang: self.lang

    });

    maxzoom_input_div.appendChild(maxzoom_input_span);

    /**************************************************************************/

    const basemap_btn_div = L.DomUtil.create('div');
    basemap_btn_div.setAttribute('class', 'special-tools-container');

    self.modal_body.appendChild(basemap_btn_div);
    
    /**************************************************************************/

    self.basemap_btn = L.DomUtil.create('button');
    self.basemap_btn.type = 'button';
    self.basemap_btn.id = 'basemap_btn';
    self.basemap_btn.setAttribute('class', 'special-tools-btn-success');
    
    self.tool.google_translate({

        element_html: self.basemap_btn,
        str: "Añadir mapa base", 
        lang: self.lang

    });

    basemap_btn_div.appendChild(self.basemap_btn);

    /**************************************************************************/

    const available_basemaps_title = L.DomUtil.create('div');
    available_basemaps_title.setAttribute('class', 'special-tools-h2');

    self.tool.google_translate({

        element_html: available_basemaps_title,
        str: "Mapas base disponibles", 
        lang: self.lang

    });

    self.modal_body.appendChild(available_basemaps_title);

    /**************************************************************************/

    self.basemap_list = L.DomUtil.create('div');
    self.basemap_list.id = 'basemap_list';
    self.basemap_list.setAttribute('class', 'special-tools-container');

    self.modal_body.appendChild(self.basemap_list);

    /**************************************************************************/

    let promise = self.tool.select_basemaps({});

    promise.then(function(data) {

        if (data.success) {

            const content = JSON.parse(data.content);
            self.basemaps = content.basemaps;

            for (let index in self.basemaps) {

                const box_container = L.DomUtil.create('div');

                box_container.setAttribute('class', 'special-tools-container special-tools-element-basemap');

                const element_input_name = L.DomUtil.create('input');
                element_input_name.type = 'text';
                element_input_name.setAttribute('class', 'special-tools-input-150');
                element_input_name.setAttribute('readonly', true);
                element_input_name.value = self.basemaps[index].name;


                const element_btn_delete = L.DomUtil.create('button');
                element_btn_delete.type = 'button';
                element_btn_delete.setAttribute('class', 'special-tools-btn-danger');
                element_btn_delete.setAttribute('index', index);
                element_btn_delete.style.position = 'relative';
                element_btn_delete.style.top = '4px';

                const element_btn_delete_img = L.DomUtil.create('img');
                element_btn_delete_img.src = self.tool.tool_url() + '/img/trash.png';
                element_btn_delete_img.width = 16;
                element_btn_delete_img.height = 16;

                element_btn_delete.appendChild(element_btn_delete_img);

                box_container.appendChild(element_input_name);
                box_container.appendChild(element_btn_delete);

                self.basemap_list.appendChild(box_container);

                L.DomEvent.on(element_btn_delete, 'click', function(e) {

                    this.disabled = true;

                    const basemap_index = parseInt(this.getAttribute('index'));

                    window.setTimeout(function() {

                        let options = {};

                        options.basemap_index = basemap_index;

                        let promise = self.tool.remove_basemap(options);

                        promise.then(function(data) {

                            if (data.success) {

                                L.DomUtil.remove(box_container);

                                self.modal_message("Mapa base eliminado con éxito");

                                self.component_geolocation.layer_control.removeLayer(self.array_basemaps[basemap_index]);

                                self.array_basemaps[basemap_index].removeFrom(self.map);

                                self.array_basemaps = self.array_basemaps.flat();

                                document.querySelectorAll('.leaflet-control-layers-selector')[0].click();

                            } else {

                                self.modal_message(data.msg);

                            }

                        });

                    }, 100);

                    window.setTimeout(function() {

                        _this.restore();

                    }, 500);

                    L.DomEvent.preventDefault(e);

                });

            }

        } else {

            self.modal_message(data.msg);

        }

    });

    L.DomEvent.on(self.basemap_btn, 'click', function() {

        if (self.basemap_input.value === '') {

            self.modal_message("El mapa base es requerido");

            return;

        } else if (!self.is_url(self.basemap_input.value)) {

            self.modal_message("Por favor, introduzca una url correcta");

            return;

        }

        if (self.name_input.value === '') {

            self.modal_message("El campo nombre es requerido");

            return;

        }

        if (self.minzoom_input.value === '') {

            self.modal_message("El Zoom mínimo debe de ser un número entero entre 0 y 18");

            return;

        }

        if (parseInt(self.minzoom_input.value) < 0 || parseInt(self.minzoom_input.value) > 18) {

            self.modal_message("El Zoom mínimo no puede ser inferior a 0 ni superior a 18");

            return;

        }

        if (parseInt(self.maxzoom_input.value) < 0 || parseInt(self.maxzoom_input.value) > 18) {

            self.modal_message("El Zoom máximo no puede ser inferior a 0 ni superior a 18");

            return;

        }

        if (self.maxzoom_input.value === '') {

            self.modal_message("El Zoom máximo debe de ser un número entero entre 0 y 18");

            return;

        }

        self.is_valid_basemap = true;

        const basemap_url = self.basemap_input.value;

        const test_basemap = L.tileLayer(basemap_url);

        test_basemap.addTo(self.map);

        test_basemap.on('tileerror', function(){

            self.is_valid_basemap = false;

            self.modal_message("El mapa base no es correcto");

            window.setTimeout(function() {

                test_basemap.removeFrom(self.map);

            }, 100);

            return;

        });

        window.setTimeout(function() {

            if (!self.is_valid_basemap) return;

            test_basemap.removeFrom(self.map);

            let options = {

                basemap_url: self.basemap_input.value,
                basemap_name: self.strip_tags(self.name_input.value),
                basemap_attribution: self.attribution_input.value,
                basemap_minzoom: self.minzoom_input.value,
                basemap_maxzoom: self.maxzoom_input.value

            };

            let promise = self.tool.create_basemap(options);

            promise.then(function(data) {

                if (!data.success) {

                    self.modal_message(data.msg);

                    return;

                } else {

                    const content = JSON.parse(data.content);

                    self.basemaps = content.basemaps;

                    const basemap_index = self.basemaps.length - 1;

                    let basemap_url = self.basemaps[basemap_index].url;
                    let basemap_name = self.basemaps[basemap_index].name;
                    let basemap_attribution = self.basemaps[basemap_index].attribution;
                    let basemap_minzoom = self.basemaps[basemap_index].minzoom;
                    let basemap_maxzoom = self.basemaps[basemap_index].maxzoom;

                    const test_basemap = L.tileLayer(basemap_url, {

                        "attribution": basemap_attribution,
                        "minZoom": basemap_minzoom,
                        "maxZoom": basemap_maxzoom

                    });

                    test_basemap.addTo(self.map);

                    test_basemap.on('tileerror', function(){

                        self.is_valid_basemap = false;

                        self.modal_message("El mapa base no es correcto");

                        window.setTimeout(function() {

                            test_basemap.removeFrom(self.map);

                            let options = {};

                            options.basemap_index = basemap_index;

                            self.tool.remove_basemap(options);

                        }, 100);

                        return;

                    });

                    if (!self.is_valid_basemap) return;

                    test_basemap.removeFrom(self.map);

                    const box_container = L.DomUtil.create('div');
                    box_container.setAttribute('class', 'special-tools-container special-tools-element-basemap');
                    self.basemap_list.appendChild(box_container);
                    
                    /**********************************************************/

                    const element_input_name = L.DomUtil.create('input');
                    element_input_name.type = 'text';
                    element_input_name.setAttribute('class', 'special-tools-input-150');
                    element_input_name.setAttribute('readonly', true);
                    element_input_name.value = self.basemaps[basemap_index].name;

                    const element_btn_delete = L.DomUtil.create('button');
                    element_btn_delete.type = 'button';
                    element_btn_delete.setAttribute('class', 'special-tools-btn-danger');
                    element_btn_delete.setAttribute('index', basemap_index);
                    element_btn_delete.style.position = 'relative';
                    element_btn_delete.style.top = '4px';

                    const element_btn_delete_img = L.DomUtil.create('img');
                    element_btn_delete_img.src = self.tool.tool_url() + '/img/trash.png';
                    element_btn_delete_img.width = 16;
                    element_btn_delete_img.height = 16;

                    element_btn_delete.appendChild(element_btn_delete_img);

                    box_container.appendChild(element_input_name);
                    box_container.appendChild(element_btn_delete);

                    self.modal_message("Mapa base creado con éxito");

                    basemap_name = self.basemaps[basemap_index].name;
                    basemap_url = self.basemaps[basemap_index].url;
                    basemap_attribution = self.basemaps[basemap_index].attribution;
                    basemap_minzoom = self.basemaps[basemap_index].minzoom;
                    basemap_maxzoom = self.basemaps[basemap_index].maxzoom;

                    const tilelayer = L.tileLayer(basemap_url, {

                        attribution: basemap_attribution,
                        minZoom: basemap_minzoom,
                        maxZoom: basemap_maxzoom

                    });

                    self.component_geolocation.layer_control.addBaseLayer(tilelayer, basemap_name);

                    self.array_basemaps.push(tilelayer);

                    L.DomEvent.on(element_btn_delete, 'click', function(e) {

                        this.disabled = true;

                        const basemap_index = parseInt(this.getAttribute('index'));

                        window.setTimeout(function() {

                            let options = {};

                            options.basemap_index = basemap_index;

                            let promise = self.tool.remove_basemap(options);

                            promise.then(function(data) {

                                if (data.success) {

                                    L.DomUtil.remove(box_container);

                                    self.modal_message("Mapa base eliminado con éxito");

                                    self.component_geolocation.layer_control.removeLayer(self.array_basemaps[basemap_index]);

                                    self.array_basemaps[basemap_index].removeFrom(self.map);

                                    self.array_basemaps = self.array_basemaps.flat();

                                    document.querySelectorAll('.leaflet-control-layers-selector')[0].click();

                                    return;

                                } else {

                                    self.modal_message(data.msg);

                                }

                            });

                        }, 100);

                        window.setTimeout(function() {

                            _this.restore();

                        }, 500);

                        L.DomEvent.preventDefault(e);

                    });

                }

            });

        }, 300);

    });
    
};

special_tools_xyz.prototype.restore = function() {
    
    const self = this.special_tools;
    
    const elements = self.basemap_list.querySelectorAll('.special-tools-element-basemap');

    for (let index = 0; index < elements.length; index++) {

        const btn_delete = elements[index].querySelector('.special-tools-btn-danger');
        btn_delete.setAttribute('index', index);

    }
         
};