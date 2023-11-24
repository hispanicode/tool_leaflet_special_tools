
export const special_tools_roman_empire = function() {

	return true;
        
};

special_tools_roman_empire.prototype.load = async function(L, special_tools) {
    
    special_tools_roman_empire.prototype.special_tools = special_tools;
    
    L.Control.SpecialToolsRomanEmpire = L.Control.extend({

        onAdd: function () {

            const self = special_tools_roman_empire.prototype.special_tools;

            const controlDiv = L.DomUtil.create('div', 'special-tools-roman-empire special-tools-controls special-tools-disable');

            special_tools_roman_empire.prototype.controlDiv = controlDiv;
            
            self.tool.google_translate({

                element_html: controlDiv,
                attribute: 'title',
                str: 'Imperio Romano', 
                lang: self.lang

            });

            self.special_tools_btns.appendChild(controlDiv);
            
            L.DomEvent.on(controlDiv, 'click', function(){

                    L.DomUtil.addClass(controlDiv, 'special-tools-enable');
                    L.DomUtil.removeClass(controlDiv, 'special-tools-disable');

                    self.only_one_active_control(controlDiv);

                    special_tools_roman_empire.prototype.load_modal();

                });
            
                const false_div = L.DomUtil.create('div');

                return false_div;
            
        }

        
    });
    
    L.control.specialToolsRomanEmpire = function (options) {

        return new L.Control.SpecialToolsRomanEmpire(options);

    };
    
};

special_tools_roman_empire.prototype.load_modal = function() {
    
    const _this = this;
    
    const self = this.special_tools;
    
    self.modal = self.new_modal("Servicios relacionados con el Imperio Romano");

    self.modal_body = self.modal._container.querySelector('.modal-body');

    /**************************************************************************/
    
    _this.load_pleiades();
    _this.load_pelagios();
    _this.load_imperium();

};

special_tools_roman_empire.prototype.load_pleiades = function() {

    const self = this.special_tools;
    
    const pleiades_title = L.DomUtil.create('div');
    pleiades_title.setAttribute('class', 'special-tools-h2');
    pleiades_title.innerText = 'Pleiades (pleiades.stoa.org)';
    self.modal_body.appendChild(pleiades_title);

    const pleiades_div = L.DomUtil.create('div');
    pleiades_div.setAttribute('class', 'pleiades-div');
    pleiades_div.style.borderBottom = '1px solid #9da5cf';
    pleiades_div.style.marginBottom = '5px';
    pleiades_div.style.paddingBottom = '10px';
    self.modal_body.appendChild(pleiades_div);

    const pleiades_div_container_1 = L.DomUtil.create('div');
    pleiades_div_container_1.setAttribute('class', 'special-tools-container special-tools-div-50');
    pleiades_div.appendChild(pleiades_div_container_1);

    const search_pleiades = L.DomUtil.create('input');
    search_pleiades.type = 'text';
    search_pleiades.id = 'search_pleiades';
    search_pleiades.setAttribute('class', 'special-tools-input-150');
    pleiades_div_container_1.appendChild(search_pleiades);

    /***********************************************************/

    const btn_pleiades = L.DomUtil.create('button');
    btn_pleiades.type = 'button';
    btn_pleiades.id = 'btn_pleiades';
    btn_pleiades.setAttribute('class', 'special-tools-btn-success');
    btn_pleiades.style.position = 'relative';
    btn_pleiades.style.top = '4px';
    pleiades_div_container_1.appendChild(btn_pleiades);

    /***********************************************************/

    const btn_pleiades_img = L.DomUtil.create('img');
    btn_pleiades_img.src = self.tool.tool_url() + '/img/search.png';
    btn_pleiades.appendChild(btn_pleiades_img);

    /************************************************************/

    const pleiades_div_container_2 = L.DomUtil.create('div');
    pleiades_div_container_2.setAttribute('class', 'special-tools-container special-tools-div-33');
    pleiades_div.appendChild(pleiades_div_container_2);

    const radio_pleiades_filter_span = L.DomUtil.create('span');

    self.tool.google_translate({

        element_html: radio_pleiades_filter_span,
        str: "Filtrar por: ", 
        lang: self.lang

    });

    pleiades_div_container_2.appendChild(radio_pleiades_filter_span);

    /******************************************************/

    const radio_pleiades_name_span = L.DomUtil.create('span');

    self.tool.google_translate({

        element_html: radio_pleiades_name_span,
        str: "Nombre: ", 
        lang: self.lang

    });

    pleiades_div_container_2.appendChild(radio_pleiades_name_span);

    /************************************************************/

    const radio_pleiades_name = L.DomUtil.create('input');
    radio_pleiades_name.type = 'radio';
    radio_pleiades_name.name = 'radio_pleiades';
    radio_pleiades_name.setAttribute('class', 'radio_pleiades');
    radio_pleiades_name.value = 'name';
    radio_pleiades_name.checked = true;

    pleiades_div_container_2.appendChild(radio_pleiades_name);

    /**********************************************************/

    const radio_pleiades_id_span = L.DomUtil.create('span');
    radio_pleiades_id_span.innerText = ' id: ';


    pleiades_div_container_2.appendChild(radio_pleiades_id_span);

    /**********************************************************/

    const radio_pleiades_id = L.DomUtil.create('input');
    radio_pleiades_id.type = 'radio';
    radio_pleiades_id.name = 'radio_pleiades';
    radio_pleiades_id.setAttribute('class', 'radio_pleiades');
    radio_pleiades_id.value = 'id';

    pleiades_div_container_2.appendChild(radio_pleiades_id);

    /*********************************************************/

    const clear_div = L.DomUtil.create('div');
    clear_div.style.clear = 'left';

    pleiades_div.appendChild(clear_div);

    /*******************************************************/

    const pleiades_items_founds = L.DomUtil.create('div');
    pleiades_items_founds.id = 'pleiades_items_founds';

    pleiades_div.appendChild(pleiades_items_founds);


    for (let n=1; n<=10; n++) {

        const p_get_pleiades = L.DomUtil.create('p');
        p_get_pleiades.setAttribute('class', 'p-get-pleiades');
        p_get_pleiades.style.display = 'none';

        pleiades_items_founds.appendChild(p_get_pleiades);

        const get_pleiades = L.DomUtil.create('button');
        get_pleiades.type = 'button';
        get_pleiades.style.marginTop = '4px';
        get_pleiades.style.marginBottom = '4px';
        get_pleiades.setAttribute('class', 'get-pleiades special-tools-btn-success');
        get_pleiades.setAttribute('pleiades-id', '');

        p_get_pleiades.appendChild(get_pleiades);

    }

    L.DomEvent.on(search_pleiades, 'keyup', function() {

            btn_pleiades.click();

    });

    L.DomEvent.on(btn_pleiades, 'click', function() {

        const radio_option_checked = self.modal._container.querySelector('input[name="radio_pleiades"]:checked').value;
        const input_value = self.simple_sanitize_string(search_pleiades.value);
        const pleiades_array = self.modal._container.querySelectorAll('.get-pleiades');
        const p_pleiades_array = self.modal._container.querySelectorAll('.p-get-pleiades');

        if (input_value === '') {

            for (let index = 0; index < pleiades_array.length; index++) {

                pleiades_array[index].setAttribute('pleiades-id', '');

                pleiades_array[index].innerText = '';

                p_pleiades_array[index].style.display = 'none';

            }

            return;

        }

        let options = {};

        options.type = radio_option_checked;
        options.value = input_value;

        let promise = self.tool.get_pleiades_json(options);

        promise.then(function(json){

            if (!json.success) {

                self.modal_message(json.msg);

                return;

            }

            for (let index = 0; index < pleiades_array.length; index++) {

                pleiades_array[index].setAttribute('pleiades-id', '');

                pleiades_array[index].innerText = '';

                p_pleiades_array[index].style.display = 'none';

            }

            let get_pleiades = '';
            let p_pleiades;

            let json_content = JSON.parse(json.content);

            for (let index in json_content) {

                get_pleiades = self.modal._container.querySelectorAll('.get-pleiades')[index];
                p_pleiades = self.modal._container.querySelectorAll('.p-get-pleiades')[index];

                try {

                    L.DomEvent.off(get_pleiades);

                } catch(Exception) {

                    if (typeof get_pleiades === 'undefined') {

                        return;

                    }

                }

                get_pleiades.setAttribute('pleiades-id', json_content[index].id);

                get_pleiades.innerText = json_content[index].name + ' - ' + json_content[index].id;

                p_pleiades.style.display = 'block';

                L.DomEvent.on(get_pleiades, 'click', function(){

                    const id = this.getAttribute('pleiades-id');

                    let options = {};

                    options.id = id;

                    let promise = self.tool.get_pleiades_service(options);

                    promise.then(function(data) {

                        if (data.success) {

                            const content = JSON.parse(data.content);

                            if (content.hasOwnProperty('features')) {

                                const first_feature_type = content.features[0].geometry.type;

                                if (first_feature_type === 'Point') {

                                    const coordinates = content.features[0].geometry.coordinates;

                                    const lng = coordinates[0];
                                    const lat = coordinates[1];    

                                    const marker = L.marker([lat, lng]);

                                    marker.feature = marker.toGeoJSON();
                                    marker.feature.special_tools = {};
                                    marker.feature.special_tools.is_pleiades = true;
                                    marker.feature.special_tools.geoman_edition = false;
                                    marker.feature.properties = {};

                                    if (content.hasOwnProperty('id')) {

                                        marker.feature.properties.id = "https://pleiades.stoa.org/places/"+data.id;

                                    }
                                    if (content.hasOwnProperty('title')) {

                                        marker.feature.properties.title = content.title;

                                    }
                                    if (content.hasOwnProperty('description')) {

                                        marker.feature.properties.description = content.description;

                                    }
                                    if (content.hasOwnProperty('names')) {

                                        marker.feature.properties.names = content.names.toString();

                                    }

                                    if (content.features.length === 1) {

                                        if (content.features[0].properties.hasOwnProperty('description')) {

                                            marker.feature.properties.info = content.features[0].properties.description;

                                        }
                                    }

                                    else if (content.features.length > 1) {

                                        if (content.features[1].properties.hasOwnProperty('description')) {

                                            marker.feature.properties.info = content.features[1].properties.description;

                                        }
                                    }

                                    self.map.fire("pm:create", {layer: marker});

                                    self.map.setView([lat, lng], 14);

                                    self.modal_message("Objeto creado con éxito");

                                }


                                if (content.features.length === 1) return;

                                for (let index = 1; index < content.features.length; index++) {

                                    const feature = content.features[index];
                                    const feature_type = feature.geometry.type;

                                    if (feature_type === 'LineString') {

                                        const coordinates = feature.geometry.coordinates;

                                        let linestring = turf.lineString(coordinates);

                                        const linestring_coord = L.GeoJSON.coordsToLatLngs(coordinates);

                                        linestring = L.polyline(linestring_coord);

                                        linestring.feature = linestring.toGeoJSON();
                                        linestring.feature.special_tools = {};
                                        linestring.feature.special_tools.is_pleiades = true;
                                        linestring.feature.special_tools.geoman_edition = false;
                                        linestring.feature.properties = {};

                                        if (content.hasOwnProperty('id')) {

                                            linestring.feature.properties.id = "https://pleiades.stoa.org/places/"+content.id;

                                        }

                                        if (content.hasOwnProperty('title')) {

                                            linestring.feature.properties.title = content.title;

                                        }

                                        if (content.hasOwnProperty('description')) {
                                            linestring.feature.properties.description = content.description;
                                        }

                                        if (content.hasOwnProperty('names')) {

                                            linestring.feature.properties.names = content.names.toString();

                                        }

                                        if (feature.properties.hasOwnProperty('description')) {

                                            linestring.feature.properties.info = feature.properties.description;

                                        }

                                        self.map.fire("pm:create", {layer: linestring});

                                        self.modal_message("Objeto creado con éxito");

                                    } else if (feature_type === 'MultiLineString') {


                                        const coordinates = feature.geometry.coordinates;

                                        const multi_id = self.make_id(20);

                                        for (let index in coordinates) {

                                            const multilinestring_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                                            const multilinestring = L.polyline(multilinestring_coord);

                                            multilinestring.feature = multilinestring.toGeoJSON();
                                            multilinestring.feature.special_tools = {};

                                            const tools_id = self.make_id(20);

                                            multilinestring.feature.special_tools.tools_id = tools_id;
                                            multilinestring.feature.special_tools.is_pleiades = true;
                                            multilinestring.feature.special_tools.geoman_edition = false;
                                            multilinestring.feature.special_tools.multi_id = multi_id;
                                            multilinestring.feature.properties = {};

                                            if (content.hasOwnProperty('id')) {

                                                multilinestring.feature.properties.id = "https://pleiades.stoa.org/places/"+content.id;

                                            }

                                            if (content.hasOwnProperty('title')) {

                                                multilinestring.feature.properties.title = content.title;

                                            }

                                            if (content.hasOwnProperty('description')) {

                                                multilinestring.feature.properties.description = content.description;

                                            }

                                            if (content.hasOwnProperty('names')) {

                                                multilinestring.feature.properties.names = content.names.toString();

                                            }

                                            if (feature.properties.hasOwnProperty('description')) {

                                                multilinestring.feature.properties.info = feature.properties.description;

                                            }

                                            self.map.fire('pm:create', {layer: multilinestring});

                                            self.modal_message("Objeto creado con éxito");

                                        }

                                    } else if (feature_type === 'MultiPoint') {

                                        const coordinates = feature.geometry.coordinates;

                                        const multi_id = self.make_id(20);

                                        for (let index in coordinates) {

                                            const multipoint_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                                            const multipoint = L.marker(multipoint_coord);

                                            multipoint.feature = multipoint.toGeoJSON();
                                            multipoint.feature.special_tools = {};

                                            const tools_id = self.make_id(20);

                                            multipoint.feature.special_tools.tools_id = tools_id;
                                            multipoint.feature.special_tools.is_pleiades = true;
                                            multipoint.feature.special_tools.geoman_edition = false;
                                            multipoint.feature.special_tools.multi_id = multi_id;
                                            multipoint.feature.properties = {};

                                            if (content.hasOwnProperty('id')) {

                                                multipoint.feature.properties.id = "https://pleiades.stoa.org/places/"+content.id;

                                            }

                                            if (content.hasOwnProperty('title')) {

                                                multipoint.feature.properties.title = content.title;

                                            }

                                            if (content.hasOwnProperty('description')) {

                                                multipoint.feature.properties.description = content.description;

                                            }

                                            if (content.hasOwnProperty('names')) {

                                                multipoint.feature.properties.names = content.names.toString();

                                            }

                                            if (feature.properties.hasOwnProperty('description')) {

                                                multipoint.feature.properties.info = feature.properties.description;

                                            }

                                            self.map.fire('pm:create', {layer: multipoint});

                                            self.modal_message("Objeto creado con éxito");

                                        }

                                    } else if (feature_type === 'Polygon') {

                                        const coordinates = feature.geometry.coordinates;

                                        const polygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[0]);

                                        const polygon = L.polygon(polygon_coord);

                                        polygon.feature = polygon.toGeoJSON();
                                        polygon.feature.special_tools = {};
                                        polygon.feature.special_tools.is_pleiades = true;
                                        polygon.feature.special_tools.geoman_edition = false;
                                        polygon.feature.properties = {};

                                        if (content.hasOwnProperty('id')) {

                                            polygon.feature.properties.id = "https://pleiades.stoa.org/places/"+content.id;

                                        }

                                        if (content.hasOwnProperty('title')) {

                                            polygon.feature.properties.title = content.title;

                                        }

                                        if (content.hasOwnProperty('description')) {

                                            polygon.feature.properties.description = content.description;

                                        }

                                        if (content.hasOwnProperty('names')) {

                                            polygon.feature.properties.names = content.names.toString();

                                        }

                                        if (feature.properties.hasOwnProperty('description')) {

                                            polygon.feature.properties.info = feature.properties.description;

                                        }

                                        self.map.fire("pm:create", {layer: polygon});

                                        self.map.fitBounds(polygon.getBounds());

                                        self.modal_message("Objeto creado con éxito");

                                    } else if (feature_type === 'MultiPolygon') {

                                        const coordinates = feature.geometry.coordinates;

                                        const multi_id = self.make_id(20);

                                        for (let index_1 in coordinates) {

                                            for (let index_2 in coordinates[index_1]) {

                                                const multipolygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[index_1][index_2]);

                                                const multipolygon = L.polygon(multipolygon_coord);

                                                multipolygon.feature = multipolygon.toGeoJSON();
                                                multipolygon.feature.special_tools = {};

                                                const tools_id = self.make_id(20);

                                                multipolygon.feature.special_tools.tools_id = tools_id;

                                                multipolygon.feature.special_tools.is_pleiades = true;

                                                multipolygon.feature.special_tools.geoman_edition = false;

                                                multipolygon.feature.special_tools.multi_id = multi_id;

                                                multipolygon.feature.properties = {};

                                                if (content.hasOwnProperty('id')) {

                                                    multipolygon.feature.properties.id = "https://pleiades.stoa.org/places/"+content.id;

                                                }

                                                if (content.hasOwnProperty('title')) {

                                                    multipolygon.feature.properties.title = content.title;

                                                }

                                                if (content.hasOwnProperty('description')) {

                                                    multipolygon.feature.properties.description = content.description;

                                                }

                                                if (content.hasOwnProperty('names')) {

                                                    multipolygon.feature.properties.names = content.names.toString();

                                                }

                                                if (feature.properties.hasOwnProperty('description')) {

                                                    multipolygon.feature.properties.info = feature.properties.description;

                                                }

                                                self.map.fire('pm:create', {layer: multipolygon});

                                                self.map.fitBounds(multipolygon.getBounds());

                                                self.modal_message("Objeto creado con éxito");

                                            }

                                        }
                                    }
                                }
                            }
                        }
                    });
                });
            }                 
        });

    });
    
};

special_tools_roman_empire.prototype.load_pelagios = function() {

    const self = this.special_tools;
    
    const pelagios_title = L.DomUtil.create('div');
    pelagios_title.setAttribute('class', 'special-tools-h2');
    pelagios_title.innerText = 'Pelagios D.A.R.E';
    self.modal_body.appendChild(pelagios_title);

    /*********************************************************/

    const pelagios_div = L.DomUtil.create('div');
    pelagios_div.setAttribute('class', 'pelagios-div');
    pelagios_div.style.borderBottom = '1px solid #9da5cf';
    pelagios_div.style.marginBottom = '5px';
    pelagios_div.style.paddingBottom = '10px';
    self.modal_body.appendChild(pelagios_div);

    /**********************************************************/

    const pelagios_search_container = L.DomUtil.create('div');
    pelagios_search_container.setAttribute('class', 'special-tools-container special-tools-div-50');

    pelagios_div.appendChild(pelagios_search_container);

    /***********************************************************/

    const search_pelagios = L.DomUtil.create('input');
    search_pelagios.type = 'text';
    search_pelagios.id = 'search_pelagios';
    search_pelagios.setAttribute('class', 'special-tools-input-150');

    pelagios_search_container.appendChild(search_pelagios);

    /************************************************************/

    const btn_pelagios = L.DomUtil.create('button');
    btn_pelagios.type = 'button';
    btn_pelagios.id = 'btn_pelagios';
    btn_pelagios.style.position = 'relative';
    btn_pelagios.style.top = '4px';
    btn_pelagios.setAttribute('class', 'special-tools-btn-success');
    pelagios_search_container.appendChild(btn_pelagios);

    /******************************************************/

    const btn_pelagios_img = L.DomUtil.create('img');
    btn_pelagios_img.src = self.tool.tool_url() + '/img/search.png';
    btn_pelagios.appendChild(btn_pelagios_img);

    /************************************************************/

    const pelagios_checkbox_div = L.DomUtil.create('div');
    pelagios_checkbox_div.setAttribute('class', 'special-tools-container special-tools-div-33');
    pelagios_div.appendChild(pelagios_checkbox_div);

    /******************************************************/

    const check_uncheck_all = L.DomUtil.create('input');
    check_uncheck_all.type = 'checkbox';
    check_uncheck_all.id = 'check_uncheck_all';
    check_uncheck_all.checked = true;

    pelagios_checkbox_div.appendChild(check_uncheck_all);

    /******************************************************/

    const pelagios_checkbox_span = L.DomUtil.create('span');

    self.tool.google_translate({

        element_html: pelagios_checkbox_span,
        str: " Marcar/Desmarcar todo", 
        lang: self.lang

    });

    pelagios_checkbox_div.appendChild(pelagios_checkbox_span);
    
    /************************************************************/
    
    const clear_div = L.DomUtil.create('div');
    clear_div.style.clear = 'left';

    pelagios_div.appendChild(clear_div);

    /************************************************************/

    const pelagios_filter_div = L.DomUtil.create('div');
    pelagios_filter_div.setAttribute('class', 'special-tools-container');

    pelagios_div.appendChild(pelagios_filter_div);

    /************************************************************/

    const pelagios_filter_span = L.DomUtil.create('span');

    self.tool.google_translate({

        element_html: pelagios_filter_span,
        str: "Filtrar por: ", 
        lang: self.lang

    });

    pelagios_filter_div.appendChild(pelagios_filter_span);

    /*********************************************************/

    const pelagios_options_div = L.DomUtil.create('div');
    pelagios_options_div.setAttribute('class', 'special-tools-container');
    pelagios_div.appendChild(pelagios_options_div);

    /*********************************************************/

    const container_option_1 = L.DomUtil.create('div');
    container_option_1.setAttribute('class', 'w-col-3');
    pelagios_div.appendChild(container_option_1);

    const pelagios_option_1 = L.DomUtil.create('input');
    pelagios_option_1.type = 'checkbox';
    pelagios_option_1.name = '10m_lakes';
    pelagios_option_1.checked = true;

    container_option_1.appendChild(pelagios_option_1);

    const pelagios_option_1_span = L.DomUtil.create('span');
    pelagios_option_1_span.innerText = ' 10m_lakes';

    container_option_1.appendChild(pelagios_option_1_span);

    /*********************************************************/

    const container_option_2 = L.DomUtil.create('div');
    container_option_2.setAttribute('class', 'w-col-3');
    pelagios_div.appendChild(container_option_2);

    const pelagios_option_2 = L.DomUtil.create('input');
    pelagios_option_2.type = 'checkbox';
    pelagios_option_2.name = '10m_lakes_label';
    pelagios_option_2.checked = true;

    container_option_2.appendChild(pelagios_option_2);

    const pelagios_option_2_span = L.DomUtil.create('span');
    pelagios_option_2_span.innerText = ' 10m_lakes_label';

    container_option_2.appendChild(pelagios_option_2_span);

    /*********************************************************/

    const container_option_3 = L.DomUtil.create('div');
    container_option_3.setAttribute('class', 'w-col-6');
    pelagios_div.appendChild(container_option_3);

    const pelagios_option_3 = L.DomUtil.create('input');
    pelagios_option_3.type = 'checkbox';
    pelagios_option_3.name = '10m_rivers_lake_centerlines';
    pelagios_option_3.checked = true;

    container_option_3.appendChild(pelagios_option_3);

    const pelagios_option_3_span = L.DomUtil.create('span');
    pelagios_option_3_span.innerText = ' 10m_rivers_lake_centerlines';

    container_option_3.appendChild(pelagios_option_3_span);

    /*********************************************************/

    const container_option_4 = L.DomUtil.create('div');
    container_option_4.setAttribute('class', 'w-col-3');
    pelagios_div.appendChild(container_option_4);

    const pelagios_option_4 = L.DomUtil.create('input');
    pelagios_option_4.type = 'checkbox';
    pelagios_option_4.name = 'fortifications';
    pelagios_option_4.checked = true;

    container_option_4.appendChild(pelagios_option_4);

    const pelagios_option_4_span = L.DomUtil.create('span');
    pelagios_option_4_span.innerText = ' fortifications';

    container_option_4.appendChild(pelagios_option_4_span);

    /*********************************************************/

    const container_option_5 = L.DomUtil.create('div');
    container_option_5.setAttribute('class', 'w-col-3');
    pelagios_div.appendChild(container_option_5);

    const pelagios_option_5 = L.DomUtil.create('input');
    pelagios_option_5.type = 'checkbox';
    pelagios_option_5.name = 'places_high';
    pelagios_option_5.checked = true;

    container_option_5.appendChild(pelagios_option_5);

    const pelagios_option_5_span = L.DomUtil.create('span');
    pelagios_option_5_span.innerText = ' places_high';

    container_option_5.appendChild(pelagios_option_5_span);

    /*********************************************************/

    const container_option_6 = L.DomUtil.create('div');
    container_option_6.setAttribute('class', 'w-col-3');
    pelagios_div.appendChild(container_option_6);

    const pelagios_option_6 = L.DomUtil.create('input');
    pelagios_option_6.type = 'checkbox';
    pelagios_option_6.name = 'places_low';
    pelagios_option_6.checked = true;

    container_option_6.appendChild(pelagios_option_6);

    const pelagios_option_6_span = L.DomUtil.create('span');
    pelagios_option_6_span.innerText = ' places_low';

    container_option_6.appendChild(pelagios_option_6_span);

    /*********************************************************/

    const container_option_7 = L.DomUtil.create('div');
    container_option_7.setAttribute('class', 'w-col-3');
    pelagios_div.appendChild(container_option_7);

    const pelagios_option_7 = L.DomUtil.create('input');
    pelagios_option_7.type = 'checkbox';
    pelagios_option_7.name = 'places_medium';
    pelagios_option_7.checked = true;

    container_option_7.appendChild(pelagios_option_1);

    const pelagios_option_7_span = L.DomUtil.create('span');
    pelagios_option_7_span.innerText = ' places_medium';

    container_option_7.appendChild(pelagios_option_7_span);

    /*********************************************************/

    const container_option_8 = L.DomUtil.create('div');
    container_option_8.setAttribute('class', 'w-col-3');
    pelagios_div.appendChild(container_option_8);

    const pelagios_option_8 = L.DomUtil.create('input');
    pelagios_option_8.type = 'checkbox';
    pelagios_option_8.name = 'places_subsites';
    pelagios_option_8.checked = true;

    container_option_8.appendChild(pelagios_option_8);

    const pelagios_option_8_span = L.DomUtil.create('span');
    pelagios_option_8_span.innerText = ' places_subsites';

    container_option_8.appendChild(pelagios_option_8_span);

    /*********************************************************/

    const container_option_9 = L.DomUtil.create('div');
    container_option_9.setAttribute('class', 'w-col-3');
    pelagios_div.appendChild(container_option_9);

    const pelagios_option_9 = L.DomUtil.create('input');
    pelagios_option_9.type = 'checkbox';
    pelagios_option_9.name = 'provinces';
    pelagios_option_9.checked = true;

    container_option_9.appendChild(pelagios_option_9);

    const pelagios_option_9_span = L.DomUtil.create('span');
    pelagios_option_9_span.innerText = ' provinces';

    container_option_9.appendChild(pelagios_option_9_span);

    /*********************************************************/

    const container_option_10 = L.DomUtil.create('div');
    container_option_10.setAttribute('class', 'w-col-3');
    pelagios_div.appendChild(container_option_10);

    const pelagios_option_10 = L.DomUtil.create('input');
    pelagios_option_10.type = 'checkbox';
    pelagios_option_10.name = 'provinces_label';
    pelagios_option_10.checked = true;

    container_option_10.appendChild(pelagios_option_10);

    const pelagios_option_10_span = L.DomUtil.create('span');
    pelagios_option_10_span.innerText = ' provinces_label';

    container_option_10.appendChild(pelagios_option_10_span);

    /*********************************************************/

    const container_option_11 = L.DomUtil.create('div');
    container_option_11.setAttribute('class', 'w-col-3');
    pelagios_div.appendChild(container_option_11);

    const pelagios_option_11 = L.DomUtil.create('input');
    pelagios_option_11.type = 'checkbox';
    pelagios_option_11.name = 'roads_high';
    pelagios_option_11.checked = true;

    container_option_11.appendChild(pelagios_option_11);

    const pelagios_option_11_span = L.DomUtil.create('span');
    pelagios_option_11_span.innerText = ' roads_high';

    container_option_11.appendChild(pelagios_option_11_span);

    /*********************************************************/

    const container_option_12 = L.DomUtil.create('div');
    container_option_12.setAttribute('class', 'w-col-12');
    pelagios_div.appendChild(container_option_12);

    const pelagios_option_12 = L.DomUtil.create('input');
    pelagios_option_12.type = 'checkbox';
    pelagios_option_12.name = 'roads_low';
    pelagios_option_12.checked = true;

    container_option_12.appendChild(pelagios_option_12);

    const pelagios_option_12_span = L.DomUtil.create('span');
    pelagios_option_12_span.innerText = ' roads_low';

    container_option_12.appendChild(pelagios_option_12_span);

    /*********************************************************/

    const pelagios_items_founds = L.DomUtil.create('div');
    pelagios_items_founds.id = 'pelagios_items_founds';
    pelagios_items_founds.setAttribute('class', 'special-tools-container');

    pelagios_div.appendChild(pelagios_items_founds);


    for (let n = 1; n <= 10; n++) {

        const p_get_pelagios = L.DomUtil.create('p');
        p_get_pelagios.setAttribute('class', 'p-get-pelagios');
        p_get_pelagios.style.display = 'none';

        pelagios_items_founds.appendChild(p_get_pelagios);

        const get_pelagios = L.DomUtil.create('button');
        get_pelagios.type = 'button';
        get_pelagios.style.marginTop = '4px';
        get_pelagios.style.marginBottom = '4px';
        get_pelagios.setAttribute('class', 'get-pelagios special-tools-btn-success');
        get_pelagios.setAttribute('pelagios-geojson', '');

        p_get_pelagios.appendChild(get_pelagios);

    }

    L.DomEvent.on(check_uncheck_all, 'click', function() {

        if (this.checked) {

            pelagios_option_1.checked = true;
            pelagios_option_2.checked = true;
            pelagios_option_3.checked = true;
            pelagios_option_4.checked = true;
            pelagios_option_5.checked = true;
            pelagios_option_6.checked = true;
            pelagios_option_7.checked = true;
            pelagios_option_8.checked = true;
            pelagios_option_9.checked = true;
            pelagios_option_10.checked = true;
            pelagios_option_11.checked = true;
            pelagios_option_12.checked = true;

        } else {

            pelagios_option_1.checked = false;
            pelagios_option_2.checked = false;
            pelagios_option_3.checked = false;
            pelagios_option_4.checked = false;
            pelagios_option_5.checked = false;
            pelagios_option_6.checked = false;
            pelagios_option_7.checked = false;
            pelagios_option_8.checked = false;
            pelagios_option_9.checked = false;
            pelagios_option_10.checked = false;
            pelagios_option_11.checked = false;
            pelagios_option_12.checked = false;

        }

    });

    L.DomEvent.on(search_pelagios, 'keyup', function(e) {

            btn_pelagios.click();

    });

    L.DomEvent.on(btn_pelagios, 'click', function() {

        let filter = new Array();

        if (self.modal._container.querySelector('input[name="10m_lakes"]:checked')) {

            filter.push("10m_lakes");

        }

        if (self.modal._container.querySelector('input[name="10m_lakes_label"]:checked')) {

            filter.push("10m_lakes_label");

        }

        if (self.modal._container.querySelector('input[name="10m_rivers_lake_centerlines"]:checked')) {

            filter.push("10m_rivers_lake_centerlines");

        }

        if (self.modal._container.querySelector('input[name="fortifications"]:checked')) {

            filter.push("fortifications");

        }

        if (self.modal._container.querySelector('input[name="places_high"]:checked')) {

            filter.push("places_high");

        }

        if (self.modal._container.querySelector('input[name="places_low"]:checked')) {

            filter.push("places_low");

        }

        if (self.modal._container.querySelector('input[name="places_medium"]:checked')) {

            filter.push("places_medium");

        }

        if (self.modal._container.querySelector('input[name="places_subsites"]:checked')) {

            filter.push("places_subsites");

        }

        if (self.modal._container.querySelector('input[name="provinces"]:checked')) {

            filter.push("provinces");

        }

        if (self.modal._container.querySelector('input[name="provinces_label"]:checked')) {

            filter.push("provinces_label");

        }

        if (self.modal._container.querySelector('input[name="roads_high"]:checked')) {

            filter.push("roads_high");

        }

        if (self.modal._container.querySelector('input[name="roads_low"]:checked')) {

            filter.push("roads_low");

        }

        const query = self.simple_sanitize_string(search_pelagios.value);
        const pelagios_array = self.modal._container.querySelectorAll('.get-pelagios');   
        const p_pelagios_array = self.modal._container.querySelectorAll('.p-get-pelagios');

        if (query === '') {

            for (let index = 0; index < pelagios_array.length; index++) {

                pelagios_array[index].setAttribute('pelagios-geojson', '');
                pelagios_array[index].innerHTML = '';
                p_pelagios_array[index].style.display = 'none';

            }

            return;

        }

        let options = {};

        options.query = query;

        options.filter = filter;

        let promise = self.tool.get_pelagios(options);

        promise.then(function(data){

            if (!data.success) {

                return;

            }

            let get_pelagios = '';
            let p_pelagios;

            const content = data.content;

            for (let index in data.content) {

                get_pelagios = self.modal._container.querySelectorAll('.get-pelagios')[index];
                p_pelagios = self.modal._container.querySelectorAll('.p-get-pelagios')[index];

                try {

                    L.DomEvent.off(get_pelagios);

                } catch(Exception) {

                    if (typeof get_pelagios === 'undefined') {

                        return;

                    }

                }

                get_pelagios.setAttribute('pelagios-geojson', content[index].geojson);
                get_pelagios.innerHTML = content[index].value + ' - ' + content[index].geometry_type + " &nbsp;<small> " + content[index].file + "</small>";
                p_pelagios.style.display = 'block';

                L.DomEvent.addListener(get_pelagios, 'click', function(){

                    const geojson = JSON.parse(this.getAttribute('pelagios-geojson'));

                    if (geojson.geometry.type === 'Point') {

                        const tools_id = self.make_id(20);

                        const coordinates = geojson.geometry.coordinates;

                        const lng = coordinates[0];
                        const lat = coordinates[1];

                        const marker = L.marker([lat, lng]);

                        marker.feature = marker.toGeoJSON();
                        marker.feature.special_tools = {};
                        marker.feature.special_tools.tools_id = tools_id;
                        marker.feature.special_tools.is_pelagios = true;
                        marker.feature.special_tools.geoman_edition = false;
                        marker.feature.properties = geojson.properties;

                        self.map.fire('pm:create', {layer: marker});

                        self.map.setView([lat, lng], 14);

                        self.modal_message("Objeto creado con éxito");

                    }

                    else if (geojson.geometry.type === 'Polygon') {

                        const tools_id = self.make_id(20);

                        const coordinates = geojson.geometry.coordinates;

                        const polygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[0]);

                        const polygon = L.polygon(polygon_coord);

                        polygon.feature = polygon.toGeoJSON();
                        polygon.feature.special_tools = {};
                        polygon.feature.special_tools.tools_id = tools_id;
                        polygon.feature.special_tools.is_pelagios = true;
                        polygon.feature.special_tools.geoman_edition = false;
                        polygon.feature.properties = geojson.properties;

                        self.map.fire('pm:create', {layer: polygon});

                        self.map.fitBounds(polygon.getBounds());

                        self.modal_message("Objeto creado con éxito");

                    }

                    else if (geojson.geometry.type === 'MultiPolygon') {

                        const coordinates = geojson.geometry.coordinates;

                        const multi_id = self.make_id(20);

                        for (let index_1 in coordinates) {

                            for(let index_2 in coordinates[index_1]) {

                                const multipolygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[index_1][index_2]);

                                const multipolygon = L.polygon(multipolygon_coord);

                                multipolygon.feature = multipolygon.toGeoJSON();
                                multipolygon.feature.special_tools = {};
                                const tools_id = self.make_id(20);
                                multipolygon.feature.special_tools.tools_id = tools_id;
                                multipolygon.feature.special_tools.is_pelagios = true;
                                multipolygon.feature.special_tools.geoman_edition = false;
                                multipolygon.feature.special_tools.multi_id = multi_id;
                                multipolygon.feature.properties = geojson.properties;

                                self.map.fire('pm:create', {layer: multipolygon});

                                self.map.fitBounds(multipolygon.getBounds());

                                self.modal_message("Objeto creado con éxito");

                            }

                        }

                    }

                    else if (geojson.geometry.type === 'LineString') {

                        const tools_id = self.make_id(20);

                        const coordinates = geojson.geometry.coordinates;

                        const linestring_coord = L.GeoJSON.coordsToLatLngs(coordinates);

                        const linestring = L.polyline(linestring_coord);

                        linestring.feature = linestring.toGeoJSON();
                        linestring.feature.special_tools = {};
                        linestring.feature.special_tools.tools_id = tools_id;
                        linestring.feature.special_tools.is_pelagios = true;
                        linestring.feature.special_tools.geoman_edition = false;
                        linestring.feature.properties = geojson.properties;

                        self.map.fire('pm:create', {layer: linestring});

                        self.map.fitBounds(linestring.getBounds());

                        self.modal_message("Objeto creado con éxito");

                    }

                    else if (geojson.geometry.type === 'MultiLineString') {

                        const coordinates = geojson.geometry.coordinates;

                        const multi_id = self.make_id(20);

                        for (let index in coordinates) {

                            const multilinestring_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                            const multilinestring = L.polyline(multilinestring_coord);

                            multilinestring.feature = multilinestring.toGeoJSON();
                            multilinestring.feature.special_tools = {};

                            const tools_id = self.make_id(20);

                            multilinestring.feature.special_tools.tools_id = tools_id;
                            multilinestring.feature.special_tools.is_pelagios = true;
                            multilinestring.feature.special_tools.geoman_edition = false;
                            multilinestring.feature.special_tools.multi_id = multi_id;
                            multilinestring.feature.properties = geojson.properties;

                            self.map.fire('pm:create', {layer: multilinestring});

                            self.map.fitBounds(multilinestring.getBounds());

                            self.modal_message("Objeto creado con éxito");

                        }

                    }

                });
            }

        });

    });  
    
};

special_tools_roman_empire.prototype.load_imperium = function() {
    
    const self = this.special_tools;

    const imperium_title = L.DomUtil.create('div');
    imperium_title.setAttribute('class', 'special-tools-h2');
    imperium_title.innerText = 'imperium.ahlfeldt.se (Lund University)';

    self.modal_body.appendChild(imperium_title);

    /*****************************************************/

    const imperium_div = L.DomUtil.create('div');
    imperium_div.setAttribute('class', 'imperium-div');
    imperium_div.marginBottom = '35px';

    self.modal_body.appendChild(imperium_div);

    /******************************************************/

    const imperium_search_div = L.DomUtil.create('div');
    imperium_search_div.setAttribute('class', 'special-tools-container');
    imperium_div.appendChild(imperium_search_div);

    /******************************************************/

    const search_imperium = L.DomUtil.create('input');
    search_imperium.type = 'text';
    search_imperium.id = 'search_imperium';
    search_imperium.setAttribute('class', 'special-tools-input-150');
    imperium_search_div.appendChild(search_imperium);

    /******************************************************/

    const btn_imperium = L.DomUtil.create('button');
    btn_imperium.type = 'button';
    btn_imperium.id = 'btn_imperium';
    btn_imperium.setAttribute('class', 'special-tools-btn-success');
    btn_imperium.style.position = 'relative';
    btn_imperium.style.top = '4px';
    imperium_search_div.appendChild(btn_imperium);

    /*******************************************************/

    const btn_imperium_img = L.DomUtil.create('img');
    btn_imperium_img.src = self.tool.tool_url() + '/img/search.png';
    btn_imperium.appendChild(btn_imperium_img);

    /************************************************************/

    const select_imperium_type_div = L.DomUtil.create('div');
    select_imperium_type_div.setAttribute('class', 'special-tools-container special-tools-div-33');
    imperium_div.appendChild(select_imperium_type_div);

    /*******************************************************/

    const select_imperium_type = L.DomUtil.create('select');
    select_imperium_type.setAttribute('class', 'special-tools-select');
    select_imperium_type.id = 'select_imperium_type';
    select_imperium_type_div.appendChild(select_imperium_type);

    /*******************************************************/

    const imperium_type_object = [

        {value: '', type: 'All types'},
        {value: '11', type: 'City'},
        {value: '13', type: 'Civitas'},
        {value: '12', type: 'Town'},
        {value: '14', type: 'Villa'},
        {value: '16', type: 'Station'},
        {value: '56', type: 'Port'},
        {value: '57', type: 'Mine'},
        {value: '58', type: 'Production'},
        {value: '17', type: 'Fortress'},
        {value: '18', type: 'Fort'},
        {value: '53', type: 'Fortlet/tower'},
        {value: '15', type: 'Camp'},
        {value: '41', type: 'River'},
        {value: '43', type: 'Rapid'},
        {value: '46', type: 'Mountain'},
        {value: '47', type: 'Island'},
        {value: '50', type: 'Cape'},
        {value: '76', type: 'Lighthouse'},
        {value: '49', type: 'Pass'},
        {value: '51', type: 'Bridge'},
        {value: '55', type: 'Road/milestone'},
        {value: '52', type: 'Aqueduct'},
        {value: '77', type: 'Canal'},
        {value: '20', type: 'Well'}

    ];

    for (let index in imperium_type_object) {

        const select_imperium_type_option = L.DomUtil.create('option');
        select_imperium_type_option.innerText = imperium_type_object[index].type;
        select_imperium_type_option.value = imperium_type_object[index].value;

        select_imperium_type.appendChild(select_imperium_type_option);

    }

    /**********************************************************/

    const select_imperium_name_div = L.DomUtil.create('div');
    select_imperium_name_div.setAttribute('class', 'special-tools-container special-tools-div-33');
    imperium_div.appendChild(select_imperium_name_div);

    /***********************************************************/

    const select_imperium_name = L.DomUtil.create('select');
    select_imperium_name.id = 'select_imperium_name';
    select_imperium_name.setAttribute('class', 'special-tools-select');

    select_imperium_name_div.appendChild(select_imperium_name);

    /************************************************************/

    const select_imperium_name_option_1 = L.DomUtil.create('option');
    select_imperium_name_option_1.value = 'mss';

    self.tool.google_translate({

        element_html: select_imperium_name_option_1,
        str: "Nombre de lugar moderno",
        lang: self.lang

    });

    select_imperium_name.appendChild(select_imperium_name_option_1);

    /************************************************************/

    const select_imperium_name_option_2 = L.DomUtil.create('option');
    select_imperium_name_option_2.value = 'ass';

    self.tool.google_translate({

        element_html: select_imperium_name_option_2,
        str: "Nombre de lugar antiguo",
        lang: self.lang

    });

    select_imperium_name.appendChild(select_imperium_name_option_2);

    /************************************************************/

    const select_imperium_country_div = L.DomUtil.create('div');
    select_imperium_country_div.setAttribute('class', 'special-tools-container special-tools-div-33');
    imperium_div.appendChild(select_imperium_country_div);

    /*************************************************************/

    const select_imperium_country = L.DomUtil.create('select');
    select_imperium_country.id = 'select_imperium_country';
    select_imperium_country.setAttribute('class', 'special-tools-select');

    select_imperium_country_div.appendChild(select_imperium_country);

    const imperium_country_object = [

        {value: "", type: "All countries"},
        {value: "AL", type: "Albania"},
        {value: "DZ", type: "Algeria"},
        {value: "AM", type: "Armenia"},
        {value: "AT", type: "Austria"},
        {value: "AZ", type: "Azerbaijan"},
        {value: "BH", type: "Bahrain"},
        {value: "BE", type: "Belgium"},
        {value: "BA", type: "Bosnia and Herzegovina"},
        {value: "BG", type: "Bulgaria"},
        {value: "HR", type: "Croatia"},
        {value: "CZ", type: "Czech Republic"},
        {value: "DK", type: "Denmark"},
        {value: "DJ", type: "Djibouti"},
        {value: "EG", type: "Egypt"},
        {value: "ER", type: "Eritrea"},
        {value: "ET", type: "Ethiopia"},
        {value: "FR", type: "France"},
        {value: "GE", type: "Georgia"},
        {value: "DE", type: "Germany"},
        {value: "GB", type: "Great Britain"},
        {value: "GR", type: "Greece"},
        {value: "HU", type: "Hungary"},
        {value: "IR", type: "Iran"},
        {value: "IQ", type: "Iraq"},
        {value: "IE", type: "Ireland"},
        {value: "IL", type: "Israel"},
        {value: "IT", type: "Italy"},
        {value: "JO", type: "Jordania"},
        {value: "XK", type: "Kosovo"},
        {value: "KW", type: "Kuwait"},
        {value: "LB", type: "Lebanon"},
        {value: "LU", type: "Luxembourg"},
        {value: "LY", type: "Libya"},
        {value: "MK", type: "Macedonia"},
        {value: "MA", type: "Morocco"},
        {value: "ME", type: "Montenegro"},
        {value: "NL", type: "Netherlands"},
        {value: "OM", type: "Oman"},
        {value: "PS", type: "Palestine"},
        {value: "PL", type: "Poland"},
        {value: "PT", type: "Portugal"},
        {value: "QA", type: "Qatar"},
        {value: "RO", type: "Romania"},
        {value: "SA", type: "Saudi Arabia"},
        {value: "RS", type: "Serbia"},
        {value: "SK", type: "Slovakia"},
        {value: "SI", type: "Slovenia"},
        {value: "ES", type: "Spain"},
        {value: "SO", type: "Somalia"},
        {value: "SD", type: "Sudan"},
        {value: "SE", type: "Sweden"},
        {value: "CH", type: "Switzerland"},
        {value: "SY", type: "Syria"},
        {value: "TN", type: "Tunisia"},
        {value: "TR", type: "Turkey"},
        {value: "AE", type: "United Arab Emirates"},
        {value: "YE", type: "Yemen"}

    ];

    for (let index in imperium_country_object) {

        const select_imperium_country_option = L.DomUtil.create('option');

        select_imperium_country_option.value = imperium_country_object[index].value;

        self.tool.google_translate({

            element_html: select_imperium_country_option,
            str: imperium_country_object[index].type,
            lang: self.lang,
            source: 'en'

        });

        select_imperium_country.appendChild(select_imperium_country_option);

    }

    /************************************************************/

    const clear_div = L.DomUtil.create('div');
    clear_div.style.clear = 'left';
    imperium_div.appendChild(clear_div);

    /************************************************************/

    const imperium_items_founds = L.DomUtil.create('div');
    imperium_items_founds.id = 'imperium_items_founds';
    imperium_div.appendChild(imperium_items_founds);

    /************************************************************/

    for (let n = 1; n <= 10; n++) {

        const p_get_imperium = L.DomUtil.create('p');
        p_get_imperium.setAttribute('class', 'p-get-imperium');
        p_get_imperium.style.display = 'none';
        imperium_items_founds.appendChild(p_get_imperium);

        const get_imperium = L.DomUtil.create('button');
        get_imperium.type = 'button';
        get_imperium.style.marginTop = '4px';
        get_imperium.style.marginBottom = '4px';
        get_imperium.setAttribute('class', 'get-imperium special-tools-btn-success');
        get_imperium.setAttribute('imperium-geojson', '');

        p_get_imperium.appendChild(get_imperium);

    }

    /************************************************************/

    L.DomEvent.on(search_imperium, 'keyup', function () {

            btn_imperium.click();

    });

    L.DomEvent.on(btn_imperium, 'click', function () {

        const type_site = select_imperium_type.options[select_imperium_type.selectedIndex].value;
        const type_name = select_imperium_name.options[select_imperium_name.selectedIndex].value;
        const type_country = select_imperium_country.options[select_imperium_country.selectedIndex].value;
        const query = self.simple_sanitize_string(self.modal._container.querySelector('#search_imperium').value);
        const imperium_array = self.modal._container.querySelectorAll('.get-imperium');
        const p_imperium_array = self.modal._container.querySelectorAll('.p-get-imperium');


        if (query === '') {

            for (let index = 0; index < imperium_array.length; index++) {

                imperium_array[index].setAttribute('imperium-geojson', '');
                imperium_array[index].innerHTML = '';
                p_imperium_array[index].style.display = 'none';

            }

            return;

        }

        let options = {};

        options.query = query;
        options.type_site = type_site;
        options.type_name = type_name;
        options.type_country = type_country;

        let promise = self.tool.get_imperium_ahlfeldt(options);

        promise.then(function (data) {

            let get_imperium = '';
            let p_imperium;

            let content = data.content;

            for (let index in content) {

                get_imperium = self.modal._container.querySelectorAll('.get-imperium')[index];
                p_imperium = self.modal._container.querySelectorAll('.p-get-imperium')[index];

                try {

                    L.DomEvent.off(get_imperium);

                } catch (Exception) {

                    if (typeof get_imperium === 'undefined')
                        return;

                }

                get_imperium.setAttribute('imperium-geojson', content[index].geojson);
                get_imperium.innerHTML = content[index].value + ' - ' + content[index].geometry_type;

                p_imperium.style.display = 'block';

                L.DomEvent.addListener(get_imperium, 'click', function () {

                    const geojson = JSON.parse(this.getAttribute('imperium-geojson'));

                    if (geojson.geometry.type === 'Point') {

                        const tools_id = self.make_id(20);

                        const coordinates = geojson.geometry.coordinates;

                        const lng = coordinates[0];
                        const lat = coordinates[1];

                        const marker = L.marker([lat, lng]);

                        marker.feature = marker.toGeoJSON();
                        marker.feature.special_tools = {};
                        marker.feature.special_tools.tools_id = tools_id;
                        marker.feature.special_tools.is_imperium = true;
                        marker.feature.special_tools.geoman_edition = false;
                        marker.feature.properties = geojson.properties;

                        self.map.fire('pm:create', {layer: marker});

                        self.map.setView([lat, lng], 14);

                        self.modal_message("Objeto creado con éxito");

                    } else if (geojson.geometry.type === 'Polygon') {

                        const tools_id = self.make_id(20);

                        const coordinates = geojson.geometry.coordinates;

                        const polygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[0]);

                        const polygon = L.polygon(polygon_coord);

                        polygon.feature = polygon.toGeoJSON();
                        polygon.feature.special_tools = {};
                        polygon.feature.special_tools.tools_id = tools_id;
                        polygon.feature.special_tools.is_imperium = true;
                        polygon.feature.special_tools.geoman_edition = false;
                        polygon.feature.properties = geojson.properties;

                        self.map.fire('pm:create', {layer: polygon});

                        self.map.fitBounds(polygon.getBounds());

                        self.modal_message("Objeto creado con éxito");

                    } else if (geojson.geometry.type === 'MultiPolygon') {

                        const coordinates = geojson.geometry.coordinates;

                        const multi_id = self.make_id(20);

                        for (let index_1 in coordinates) {

                            for (let index_2 in coordinates[index_1]) {

                                const multipolygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[index_1][index_2]);

                                const multipolygon = L.polygon(multipolygon_coord);

                                multipolygon.feature = multipolygon.toGeoJSON();
                                multipolygon.feature.special_tools = {};
                                const tools_id = self.make_id(20);
                                multipolygon.feature.special_tools.tools_id = tools_id;
                                multipolygon.feature.special_tools.is_imperium = true;
                                multipolygon.feature.special_tools.geoman_edition = false;
                                multipolygon.feature.special_tools.multi_id = multi_id;
                                multipolygon.feature.properties = geojson.properties;

                                self.map.fire('pm:create', {layer: multipolygon});

                                self.map.fitBounds(multipolygon.getBounds());

                                self.modal_message("Objeto creado con éxito");

                            }

                        }

                    } else if (geojson.geometry.type === 'LineString') {

                        const tools_id = self.make_id(20);

                        const coordinates = geojson.geometry.coordinates;

                        const linestring_coord = L.GeoJSON.coordsToLatLngs(coordinates);

                        const linestring = L.polyline(linestring_coord);

                        linestring.feature = linestring.toGeoJSON();
                        linestring.feature.special_tools = {};
                        linestring.feature.special_tools.tools_id = tools_id;
                        linestring.feature.special_tools.is_imperium = true;
                        linestring.feature.special_tools.geoman_edition = false;
                        linestring.feature.properties = geojson.properties;

                        self.map.fire('pm:create', {layer: linestring});

                        self.map.fitBounds(linestring.getBounds());

                        self.modal_message("Objeto creado con éxito");

                    } else if (geojson.geometry.type === 'MultiLineString') {

                        const coordinates = geojson.geometry.coordinates;

                        const multi_id = self.make_id(20);

                        for (let index in coordinates) {

                            const multilinestring_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                            const multilinestring = L.polyline(multilinestring_coord);

                            multilinestring.feature = multilinestring.toGeoJSON();
                            multilinestring.feature.special_tools = {};
                            const tools_id = self.make_id(20);
                            multilinestring.feature.special_tools.tools_id = tools_id;
                            multilinestring.feature.special_tools.is_imperium = true;
                            multilinestring.feature.special_tools.geoman_edition = false;
                            multilinestring.feature.special_tools.multi_id = multi_id;
                            multilinestring.feature.properties = geojson.properties;

                            self.map.fire('pm:create', {layer: multilinestring});

                            self.map.fitBounds(multilinestring.getBounds());

                            self.modal_message("Objeto creado con éxito");

                        }
                    }
                });
            }
        });
    });
    
};


