
L.Control.SpecialToolsXYZ = L.Control.extend({
    
    onAdd: function (map) {
        
        const self = this;
        
        const special_tools = this.options.special_tools;
        
        const tool = special_tools.options.tool;

        const lang = special_tools.options.lang;
        
        const component_geolocation = special_tools.options.component_geolocation;
        
        const leaflet_control_layers_base = document.querySelector('.leaflet-control-layers-base');
                    
        const leaflet_control_layers_selector = leaflet_control_layers_base.querySelectorAll('.leaflet-control-layers-selector');
        
        const count_defaults_basemaps = leaflet_control_layers_selector.length;
        
        var array_basemaps = new Array();

        const controlDiv = L.DomUtil.create('div', 'special-tools-XYZ special-tools-controls special-tools-disable');
        controlDiv.innerText = 'XYZ';
        
        tool.google_translate({

            element_html: controlDiv,
            attribute: 'title',
            str: 'Mapas base XYZ', 
            lang: lang

        });

        special_tools.special_tools_btns.appendChild(controlDiv);

        var content;
        var basemaps;
            
        let promise = tool.select_basemaps({});

        promise.then(function(data) {

            if (data.success) {

                content = JSON.parse(data.content);
                basemaps = content.basemaps;
                
                if (basemaps.length > 0) {
                    
                    map.eachLayer(function(layer) {
                        
                        if (layer instanceof L.TileLayer) {
                            
                            layer.removeFrom(map);
                            
                        }
                        
                    });
                    
                }

                for (let index in basemaps) {
                    

                    var basemap_name = basemaps[index].name;
                    var basemap_url = basemaps[index].url;
                    var basemap_attribution = basemaps[index].attribution;
                    var basemap_minzoom = basemaps[index].minzoom;
                    var basemap_maxzoom = basemaps[index].maxzoom;

                    const tilelayer = L.tileLayer(basemap_url, {

                        attribution: basemap_attribution,
                        minZoom: basemap_minzoom,
                        maxZoom: basemap_maxzoom

                    });

                    component_geolocation.layer_control.addBaseLayer(tilelayer, basemap_name);
                    
                    if (index == 0) {
                        
                        document.querySelectorAll('.leaflet-control-layers-selector')[0].click();
                        
                    }

                    array_basemaps.push(tilelayer);

                }

            } else {
                
               special_tools.modal_message(special_tools, data.msg, lang);
               
            }

        });
        
        /***************************************************************/

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
                        str: "Mapas base XYZ", 
                        lang: lang

                    });
                    
                    const modal_body = modal._container.querySelector('.modal-body');
                    
                    /*---------------------------------------------------*/
                    
                    const basemap_input_div = L.DomUtil.create('div');
                    basemap_input_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(basemap_input_div);
                    
                    const basemap_input = L.DomUtil.create('input');
                    basemap_input.type = 'text';
                    basemap_input.id = 'basemap_input';
                    basemap_input.setAttribute('class', 'special-tools-input-250');
                    
                    basemap_input_div.appendChild(basemap_input);
                    
                    /**********************************************************/
                    
                    const basemap_input_span = L.DomUtil.create('span');
                    
                    basemap_input_div.appendChild(basemap_input_span);
                    
                    tool.google_translate({

                        element_html: basemap_input_span,
                        str: "URL del Mapa Base (obligatorio)", 
                        lang: lang

                    });
                    
                    /*--------------------------------------------------------*/
                    
                    const name_input_div = L.DomUtil.create('div');
                    name_input_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(name_input_div);
                    
                    const name_input = L.DomUtil.create('input');
                    name_input.type = 'text';
                    name_input.id = 'name_input';
                    name_input.setAttribute('class', 'special-tools-input-250');
                    
                    name_input_div.appendChild(name_input);
                    
                    /****************************************************/
                    
                    const name_input_span = L.DomUtil.create('span');
                    
                    name_input_div.appendChild(name_input_span);
                    
                    tool.google_translate({

                        element_html: name_input_span,
                        str: "Nombre del Mapa Base (obligatorio)", 
                        lang: lang

                    });
                    
                    /*----------------------------------------------------*/
                    
                    const attribution_input_div = L.DomUtil.create('div');
                    attribution_input_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(attribution_input_div);
                    
                    const attribution_input = L.DomUtil.create('input');
                    attribution_input.type = 'text';
                    attribution_input.id = 'attribution_input';
                    attribution_input.setAttribute('class', 'special-tools-input-250');
                    
                    attribution_input_div.appendChild(attribution_input);
                    
                    const attribution_input_span = L.DomUtil.create('span');
                    
                    attribution_input_div.appendChild(attribution_input_span);
                    
                    tool.google_translate({

                        element_html: attribution_input_span,
                        str: "Atribución (no obligatorio)", 
                        lang: lang

                    });
                    
                    /*----------------------------------------------------*/

                    const minzoom_input_div = L.DomUtil.create('div');
                    minzoom_input_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(minzoom_input_div);
                    
                    const minzoom_input = L.DomUtil.create('input');
                    minzoom_input.type = 'text';
                    minzoom_input.id = 'minzoom_input';
                    minzoom_input.setAttribute('class', 'special-tools-input-50');
                    minzoom_input.value = 0;
                    
                    minzoom_input_div.appendChild(minzoom_input);
                    
                    const minzoom_input_span = L.DomUtil.create('span');
                    
                    minzoom_input_div.appendChild(minzoom_input_span);
                    
                    tool.google_translate({

                        element_html: minzoom_input_span,
                        str: "MinZoom (obligatorio) Por defecto 0", 
                        lang: lang

                    });
                    
                    /*----------------------------------------------------*/
                    
                    const maxzoom_input_div = L.DomUtil.create('div');
                    maxzoom_input_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(maxzoom_input_div);
                    
                    const maxzoom_input = L.DomUtil.create('input');
                    maxzoom_input.type = 'text';
                    maxzoom_input.id = 'maxzoom_input';
                    maxzoom_input.setAttribute('class', 'special-tools-input-50');
                    maxzoom_input.value = 18;
                    
                    maxzoom_input_div.appendChild(maxzoom_input);
                    
                    const maxzoom_input_span = L.DomUtil.create('span');
                    
                    maxzoom_input_div.appendChild(maxzoom_input_span);
                    
                    tool.google_translate({

                        element_html: maxzoom_input_span,
                        str: "MaxZoom (obligatorio) Por defecto 18", 
                        lang: lang

                    });
                    
                    /*----------------------------------------------------*/

                    const basemap_btn_div = L.DomUtil.create('div');
                    basemap_btn_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(basemap_btn_div);
                    
                    const basemap_btn = L.DomUtil.create('button');
                    basemap_btn.type = 'button';
                    basemap_btn.id = 'basemap_btn';
                    basemap_btn.setAttribute('class', 'special-tools-btn-default');
                    
                    basemap_btn_div.appendChild(basemap_btn);
                    
                    tool.google_translate({

                        element_html: basemap_btn,
                        str: "Añadir mapa base", 
                        lang: lang

                    });

                    /*------------------------------------------------------*/
                    
                    const available_basemaps_title = L.DomUtil.create('div');
                    available_basemaps_title.setAttribute('class', 'special-tools-h2');
                    
                    tool.google_translate({

                        element_html: available_basemaps_title,
                        str: "Mapas base disponibles", 
                        lang: lang

                    });
                    
                    modal_body.appendChild(available_basemaps_title);

                    /**********************************************************/
                    
                    const basemap_list = L.DomUtil.create('div');
                    basemap_list.id = 'basemap_list';
                    basemap_list.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(basemap_list);
                    
                    /*-------------------------------------------------------*/
                    
                    const _basemap_input = modal._container.querySelector('#basemap_input');
                    const _name_input = modal._container.querySelector('#name_input');
                    const _basemap_btn = modal._container.querySelector('#basemap_btn');
                    const _attribution_input = modal._container.querySelector('#attribution_input');
                    const _minzoom_input = modal._container.querySelector('#minzoom_input');
                    const _maxzoom_input = modal._container.querySelector('#maxzoom_input');
                    const _basemap_list = modal._container.querySelector('#basemap_list');
                    
                    /*--------------------------------------------------------*/
                    
                    let promise = tool.select_basemaps({});
                    
                    promise.then(function(data) {
                        
                        if (data.success) {
                            
                            content = JSON.parse(data.content);
                            basemaps = content.basemaps;
                            
                            for (let index in basemaps) {
                                
                                const box_container = L.DomUtil.create('div');

                                box_container.setAttribute('class', 'special-tools-container special-tools-element-basemap');

                                const element_input_name = L.DomUtil.create('input');
                                element_input_name.type = 'text';
                                element_input_name.setAttribute('class', 'special-tools-input-150');
                                element_input_name.setAttribute('readonly', true);
                                element_input_name.value = basemaps[index].name;


                                const element_btn_delete = L.DomUtil.create('button');
                                element_btn_delete.type = 'button';
                                element_btn_delete.setAttribute('class', 'special-tools-btn-danger');
                                element_btn_delete.setAttribute('index', index);
                                element_btn_delete.style.position = 'relative';
                                element_btn_delete.style.top = '4px';
                                
                                const element_btn_delete_img = L.DomUtil.create('img');
                                element_btn_delete_img.src = tool.controls_url() + '/leaflet.control.SpecialToolsXYZ/img/trash.png';
                                element_btn_delete_img.width = 16;
                                element_btn_delete_img.height = 16;
                                
                                element_btn_delete.appendChild(element_btn_delete_img);
                                
                                box_container.appendChild(element_input_name);
                                box_container.appendChild(element_btn_delete);

                                _basemap_list.appendChild(box_container);

                                L.DomEvent.on(element_btn_delete, 'click', function(e) {
                                    
                                    this.disabled = true;

                                    const basemap_index = parseInt(this.getAttribute('index'));
                                    
                                    window.setTimeout(function() {
                                        
                                        let options = {};
                                        
                                        options.basemap_index = basemap_index;

                                        let promise = tool.remove_basemap(options);

                                        promise.then(function(data) {

                                            if (data.success) {
                                                
                                                L.DomUtil.remove(box_container);
                                                
                                                special_tools.modal_message(special_tools, "Mapa base eliminado con éxito", lang);
                                                    
                                                component_geolocation.layer_control.removeLayer(array_basemaps[basemap_index]);

                                                array_basemaps[basemap_index].removeFrom(map);

                                                array_basemaps = array_basemaps.flat();
                                                
                                                document.querySelectorAll('.leaflet-control-layers-selector')[0].click();

                                            } else {

                                                special_tools.modal_message(special_tools, data.msg, lang);

                                            }

                                        });

                                    }, 100);

                                    window.setTimeout(function() {

                                        self.restore(_basemap_list);

                                    }, 500);

                                    L.DomEvent.preventDefault(e);

                                });
                            
                            }
                            
                        } else {
                            
                            special_tools.modal_message(special_tools, data.msg, lang);
                            
                        }
                        
                    });

                    L.DomEvent.on(_basemap_btn, 'click', function() {
                        
                        if (_basemap_input.value === '') {
                            
                            special_tools.modal_message(special_tools, "El mapa base es requerido", lang);
                            
                            return;
                            
                        } else if (!special_tools.is_url(_basemap_input.value)) {
                            
                            special_tools.modal_message(special_tools, "Por favor, introduzca una url correcta", lang);
                            
                            return;
                            
                        }
                        
                        if (_name_input.value === '') {
                            
                            special_tools.modal_message(special_tools, "El campo nombre es requerido", lang);
                            
                            return;
                            
                        }
                        
                        if (_minzoom_input.value === '') {
                            
                            special_tools.modal_message(special_tools, "El Zoom mínimo debe de ser un número entero entre 0 y 18", lang);
                            
                            return;
                            
                        }
                        
                        if (parseInt(_minzoom_input.value) < 0 || parseInt(_minzoom_input.value) > 18) {
                            
                            special_tools.modal_message(special_tools, "El Zoom mínimo no puede ser inferior a 0 ni superior a 18", lang);
                            
                            return;
                            
                        }
                        
                        if (parseInt(_maxzoom_input.value) < 0 || parseInt(_maxzoom_input.value) > 18) {
                            
                            special_tools.modal_message(special_tools, "El Zoom máximo no puede ser inferior a 0 ni superior a 18", lang);
                            
                            return;
                            
                        }
                        
                        if (_maxzoom_input.value === '') {
                            
                            special_tools.modal_message(special_tools, "El Zoom máximo debe de ser un número entero entre 0 y 18", lang);
                            
                            return;
                            
                        }
                        
                        is_valid_basemap = true;
                        
                        const basemap_url = _basemap_input.value;

                        const test_basemap = L.tileLayer(basemap_url);
                        
                        test_basemap.addTo(map);
                        
                        test_basemap.on('tileerror', function(){
                            
                            is_valid_basemap = false;
                            
                            special_tools.modal_message(special_tools, "El mapa base no es correcto", lang);
                            
                            window.setTimeout(function() {
                                
                                test_basemap.removeFrom(map);
                                
                            }, 100);
                            
                            return;
                            
                        });
                        
                        window.setTimeout(function() {

                            if (!is_valid_basemap) return;
                            
                            test_basemap.removeFrom(map);
                           
                            let options = {
                                
                                basemap_url: _basemap_input.value,
                                basemap_name: special_tools.strip_tags(_name_input.value),
                                basemap_attribution: _attribution_input.value,
                                basemap_minzoom: _minzoom_input.value,
                                basemap_maxzoom: _maxzoom_input.value
                                
                            };
                           
                            let promise = tool.create_basemap(options);
                            
                            promise.then(function(data) {
                                
                                if (!data.success) {
                                    
                                    special_tools.modal_message(special_tools, data.msg, lang);
                                    
                                    return;
                                    
                                } else {
                                    
                                    content = JSON.parse(data.content);
                                    
                                    basemaps = content.basemaps;
                                    
                                    const basemap_index = basemaps.length - 1;
                                    
                                    var basemap_url = basemaps[basemap_index].url;
                                    var basemap_name = basemaps[basemap_index].name;
                                    var basemap_attribution = basemaps[basemap_index].attribution;
                                    var basemap_minzoom = basemaps[basemap_index].minzoom;
                                    var basemap_maxzoom = basemaps[basemap_index].maxzoom;
                                    
                                    const test_basemap = L.tileLayer(basemap_url, {

                                        "attribution": basemap_attribution,
                                        "minZoom": basemap_minzoom,
                                        "maxZoom": basemap_maxzoom

                                    });
                                    
                                    test_basemap.addTo(map);
                                    
                                    test_basemap.on('tileerror', function(){
                                        
                                        is_valid_basemap = false;
                                        
                                        special_tools.modal_message(special_tools, "El mapa base no es correcto", lang);

                                        window.setTimeout(function() {
                                            
                                            test_basemap.removeFrom(map);
                                            
                                            let options = {};

                                            options.basemap_index = basemap_index;

                                            tool.remove_basemap(options);

                                        }, 100);

                                        return;

                                    });
                                    
                                    if (!is_valid_basemap) return;
                                    
                                    test_basemap.removeFrom(map);
                                    
                                    const box_container = L.DomUtil.create('div');
                                    
                                    box_container.setAttribute('class', 'special-tools-container special-tools-element-basemap');
                                    
                                    const element_input_name = L.DomUtil.create('input');
                                    element_input_name.type = 'text';
                                    element_input_name.setAttribute('class', 'special-tools-input-150');
                                    element_input_name.setAttribute('readonly', true);
                                    element_input_name.value = basemaps[basemap_index].name;

                                    const element_btn_delete = L.DomUtil.create('button');
                                    element_btn_delete.type = 'button';
                                    element_btn_delete.setAttribute('class', 'special-tools-btn-danger');
                                    element_btn_delete.setAttribute('index', basemap_index);
                                    element_btn_delete.style.position = 'relative';
                                    element_btn_delete.style.top = '4px';

                                    const element_btn_delete_img = L.DomUtil.create('img');
                                    element_btn_delete_img.src = tool.controls_url() + '/leaflet.control.SpecialToolsXYZ/img/trash.png';
                                    element_btn_delete_img.width = 16;
                                    element_btn_delete_img.height = 16;

                                    element_btn_delete.appendChild(element_btn_delete_img);

                                    box_container.appendChild(element_input_name);
                                    box_container.appendChild(element_btn_delete);
                                    
                                    _basemap_list.appendChild(box_container);
                                    
                                    special_tools.modal_message(special_tools, "Mapa base creado con éxito", lang);
  
                                    basemap_name = basemaps[basemap_index].name;
                                    basemap_url = basemaps[basemap_index].url;
                                    basemap_attribution = basemaps[basemap_index].attribution;
                                    basemap_minzoom = basemaps[basemap_index].minzoom;
                                    basemap_maxzoom = basemaps[basemap_index].maxzoom;

                                    const tilelayer = L.tileLayer(basemap_url, {

                                        attribution: basemap_attribution,
                                        minZoom: basemap_minzoom,
                                        maxZoom: basemap_maxzoom

                                    });

                                    component_geolocation.layer_control.addBaseLayer(tilelayer, basemap_name);

                                    array_basemaps.push(tilelayer);

                                    L.DomEvent.on(element_btn_delete, 'click', function(e) {
                                        
                                        this.disabled = true;
                                        
                                        const basemap_index = parseInt(this.getAttribute('index'));
                                        
                                        window.setTimeout(function() {

                                            let options = {};

                                            options.basemap_index = basemap_index;

                                            let promise = tool.remove_basemap(options);

                                            promise.then(function(data) {
                                               
                                                if (data.success) {
                                                    
                                                    L.DomUtil.remove(box_container);
                                                    
                                                    special_tools.modal_message(special_tools, "Mapa base eliminado con éxito", lang);

                                                    component_geolocation.layer_control.removeLayer(array_basemaps[basemap_index]);

                                                    array_basemaps[basemap_index].removeFrom(map);
                                                    
                                                    array_basemaps = array_basemaps.flat();
                                                    
                                                    document.querySelectorAll('.leaflet-control-layers-selector')[0].click();

                                                    return;

                                                } else {

                                                    special_tools.modal_message(special_tools, data.msg, lang);

                                                }
                                                
                                            });

                                        }, 100);
                                        
                                        window.setTimeout(function() {

                                            self.restore(_basemap_list);

                                        }, 500);
                                        
                                        L.DomEvent.preventDefault(e);
  
                                    });

                                }

                            });
                            
                        }, 300);
 
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
        
    },

    restore: function(_basemap_list) {
        
        elements = _basemap_list.querySelectorAll('.special-tools-element-basemap');
        
        for (let index = 0; index < elements.length; index++) {

            btn_delete = elements[index].querySelector('.special-tools-btn-danger');
            btn_delete.setAttribute('index', index);
            
        }
        
    }
    
});

L.control.specialToolsXYZ = function (options) {
    
    return new L.Control.SpecialToolsXYZ(options);
    
};
