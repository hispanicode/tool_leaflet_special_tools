
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

    self.modal_body = SpecialToolsModal.getBody();

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
    pleiades_items_founds.setAttribute('class', 'special-tools-items-founds');
    
    pleiades_items_founds.style.top = search_pleiades.style.bottom;
    
    pleiades_div.appendChild(pleiades_items_founds);
    
    /********************************************************/

    for (let n=1; n<=10; n++) {

        const p_get_pleiades = L.DomUtil.create('p');
        p_get_pleiades.setAttribute('class', 'p-get-pleiades special-tools-item-found-p');

        pleiades_items_founds.appendChild(p_get_pleiades);

        const get_pleiades = L.DomUtil.create('span');
        get_pleiades.setAttribute('class', 'get-pleiades special-tools-item-found-span');
        get_pleiades.setAttribute('pleiades-id', '');

        p_get_pleiades.appendChild(get_pleiades);

    }

    L.DomEvent.on(search_pleiades, 'keyup', function() {

            btn_pleiades.click();

    });

    L.DomEvent.on(btn_pleiades, 'click', function() {

        const radio_option_checked = self.modal_body.querySelector('input[name="radio_pleiades"]:checked').value;
        const input_value = self.simple_sanitize_string(search_pleiades.value);
        const pleiades_array = self.modal_body.querySelectorAll('.get-pleiades');
        const p_pleiades_array = self.modal_body.querySelectorAll('.p-get-pleiades');
        const pleiades_items_founds = self.modal_body.querySelector('#pleiades_items_founds');
        
        pleiades_items_founds.style.display = 'none';
        
        for (let index = 0; index < pleiades_array.length; index++) {

            pleiades_array[index].setAttribute('pleiades-id', '');
            pleiades_array[index].innerText = '';
            p_pleiades_array[index].style.display = 'none';

        }


        if (input_value === '') {

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

            const json_content = JSON.parse(json.content);

            for (let index in json_content) {

                const get_pleiades = self.modal_body.querySelectorAll('.get-pleiades')[index];
                const p_pleiades = self.modal_body.querySelectorAll('.p-get-pleiades')[index];

                try {
        
                    pleiades_items_founds.style.display = 'block';
                    get_pleiades.setAttribute('pleiades-id', json_content[index].id);
                    get_pleiades.innerText = json_content[index].name + ' - ' + json_content[index].id;
                    p_pleiades.style.display = 'block';
                
                } catch (Exception) {};

            }                 
        });

    });
    
    const pleiades_array = self.modal_body.querySelectorAll('.get-pleiades');
    
    for (let index = 0; index < pleiades_array.length; index++) {
        
        L.DomEvent.on(pleiades_array[index], 'click', function() {

            const id = this.getAttribute('pleiades-id');

            let options = {};

            options.id = id;

            let promise = self.tool.get_pleiades_service(options);

            promise.then(function(data) {

                if (data.success) {

                    const GEOJSON = JSON.parse(data.content);

                    const OBJECTS_GEOJSON = self.project(GEOJSON);

                    for (let index in OBJECTS_GEOJSON) {

                        let count_objects = 1;
                        let areas = [];

                        for (let obj in OBJECTS_GEOJSON[index]) {

                            window.setTimeout(function(){

                                self.map.fire("pm:create", {layer: OBJECTS_GEOJSON[index][obj]});

                            }, 100);

                            if (self.is_point(OBJECTS_GEOJSON[index][obj])) {

                               if (count_objects === OBJECTS_GEOJSON[index].length) { 

                                    self.map.panTo(OBJECTS_GEOJSON[index][obj].getLatLng());

                               }

                            } else if (self.is_linestring(OBJECTS_GEOJSON[index][obj])) {

                                if (count_objects === OBJECTS_GEOJSON[index].length) {

                                    self.map.fitBounds(OBJECTS_GEOJSON[index][obj].getBounds());

                                }

                            } else if (self.is_polygon(OBJECTS_GEOJSON[index][obj])) {

                                areas.push({
                                    area: turf.area(OBJECTS_GEOJSON[index][obj].toGeoJSON()),
                                    object: OBJECTS_GEOJSON[index][obj]
                                });

                                if (count_objects === OBJECTS_GEOJSON[index].length) {

                                    let max_value = 0;
                                    for (let y in areas) {

                                       max_value = Math.max(max_value, areas[y].area); 

                                    }                                                    

                                    for (let r in areas) {

                                        if (areas[r].area === max_value) {

                                            self.map.fitBounds(areas[r].object.getBounds());

                                        }

                                    }

                                }

                            }

                            count_objects++;

                        }
                    
                    }
                            
                }
            });
        });
        
    }
    
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
    
    const pelagios_items_founds = L.DomUtil.create('div');
    pelagios_items_founds.id = 'pelagios_items_founds';
    pelagios_items_founds.setAttribute('class', 'special-tools-items-founds');
    
    pelagios_items_founds.style.top = search_pelagios.style.bottom;

    pelagios_div.appendChild(pelagios_items_founds);

    /************************************************************/

    for (let n = 1; n <= 10; n++) {

        const p_get_pelagios = L.DomUtil.create('p');
        p_get_pelagios.setAttribute('class', 'p-get-pelagios special-tools-item-found-p');

        pelagios_items_founds.appendChild(p_get_pelagios);

        const get_pelagios = L.DomUtil.create('span');
        get_pelagios.setAttribute('class', 'get-pelagios special-tools-item-found-span');
        get_pelagios.setAttribute('pelagios-geojson', '');

        p_get_pelagios.appendChild(get_pelagios);

    }
    
    /***********************************************************/

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

    container_option_7.appendChild(pelagios_option_7);

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

    L.DomEvent.on(search_pelagios, 'keyup', function() {

            btn_pelagios.click();

    });

    L.DomEvent.on(btn_pelagios, 'click', function() {
        const query = self.simple_sanitize_string(search_pelagios.value);
        const pelagios_array = self.modal_body.querySelectorAll('.get-pelagios');   
        const p_pelagios_array = self.modal_body.querySelectorAll('.p-get-pelagios');
        
        const pelagios_items_founds = self.modal_body.querySelector('#pelagios_items_founds');
        
        pelagios_items_founds.style.display = 'none';
        
        for (let index = 0; index < pelagios_array.length; index++) {

            pelagios_array[index].setAttribute('pelagios-geojson', '');
            pelagios_array[index].innerHTML = '';
            p_pelagios_array[index].style.display = 'none';

        }

        let filter = new Array();

        if (self.modal_body.querySelector('input[name="10m_lakes"]:checked')) {

            filter.push("10m_lakes");

        }

        if (self.modal_body.querySelector('input[name="10m_lakes_label"]:checked')) {

            filter.push("10m_lakes_label");

        }

        if (self.modal_body.querySelector('input[name="10m_rivers_lake_centerlines"]:checked')) {

            filter.push("10m_rivers_lake_centerlines");

        }

        if (self.modal_body.querySelector('input[name="fortifications"]:checked')) {

            filter.push("fortifications");

        }

        if (self.modal_body.querySelector('input[name="places_high"]:checked')) {

            filter.push("places_high");

        }

        if (self.modal_body.querySelector('input[name="places_low"]:checked')) {

            filter.push("places_low");

        }

        if (self.modal_body.querySelector('input[name="places_medium"]:checked')) {

            filter.push("places_medium");

        }

        if (self.modal_body.querySelector('input[name="places_subsites"]:checked')) {

            filter.push("places_subsites");

        }

        if (self.modal_body.querySelector('input[name="provinces"]:checked')) {

            filter.push("provinces");

        }

        if (self.modal_body.querySelector('input[name="provinces_label"]:checked')) {

            filter.push("provinces_label");

        }

        if (self.modal_body.querySelector('input[name="roads_high"]:checked')) {

            filter.push("roads_high");

        }

        if (self.modal_body.querySelector('input[name="roads_low"]:checked')) {

            filter.push("roads_low");

        }

        if (query === '' || query.length < 2) {

            return;

        }

        let options = {};

        options.query = query;

        options.filter = filter;

        let promise = self.tool.get_pelagios(options);

        promise.then(function(data) {

            if (!data.success) {

                return;

            }

            const content = data.content;

            for (let index in data.content) {

                const get_pelagios = self.modal_body.querySelectorAll('.get-pelagios')[index];
                const p_pelagios = self.modal_body.querySelectorAll('.p-get-pelagios')[index];
                
                try {
                    
                    pelagios_items_founds.style.display = 'block';
                    get_pelagios.setAttribute('pelagios-geojson', content[index].geojson);
                    get_pelagios.innerHTML = content[index].value + ' - ' + content[index].geometry_type + " &nbsp;<small> " + content[index].file + "</small>";
                    p_pelagios.style.display = 'block';
                
                } catch (Exception) {};
                
            }

        });

    });
    
    const pelagios_array = self.modal_body.querySelectorAll('.get-pelagios');
    
    for (let index = 0; index < pelagios_array.length; index++) {
        
        L.DomEvent.addListener(pelagios_array[index], 'click', function() {

            const GEOJSON = JSON.parse(this.getAttribute('pelagios-geojson'));

            const OBJECTS_GEOJSON = self.project(GEOJSON);

            for (let index in OBJECTS_GEOJSON) {

                let count_objects = 1;
                let areas = [];

                for (let obj in OBJECTS_GEOJSON[index]) {

                    window.setTimeout(function(){

                        self.map.fire("pm:create", {layer: OBJECTS_GEOJSON[index][obj]});

                    }, 100);

                    if (self.is_point(OBJECTS_GEOJSON[index][obj])) {

                       if (count_objects === OBJECTS_GEOJSON[index].length) { 

                            self.map.panTo(OBJECTS_GEOJSON[index][obj].getLatLng());

                       }

                    } else if (self.is_linestring(OBJECTS_GEOJSON[index][obj])) {

                        if (count_objects === OBJECTS_GEOJSON[index].length) {

                            self.map.fitBounds(OBJECTS_GEOJSON[index][obj].getBounds());

                        }

                    } else if (self.is_polygon(OBJECTS_GEOJSON[index][obj])) {

                        areas.push({
                            area: turf.area(OBJECTS_GEOJSON[index][obj].toGeoJSON()),
                            object: OBJECTS_GEOJSON[index][obj]
                        });

                        if (count_objects === OBJECTS_GEOJSON[index].length) {

                            let max_value = 0;
                            for (let y in areas) {

                               max_value = Math.max(max_value, areas[y].area); 

                            }                                                    

                            for (let r in areas) {

                                if (areas[r].area === max_value) {

                                    self.map.fitBounds(areas[r].object.getBounds());

                                }

                            }

                        }

                    }

                    count_objects++;

                }

            }

        });
        
    }
    
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
    
    const imperium_items_founds = L.DomUtil.create('div');
    imperium_items_founds.id = 'imperium_items_founds';
    imperium_items_founds.setAttribute('class', 'special-tools-items-founds');
    
    imperium_items_founds.style.top = search_imperium.style.bottom;
    
    imperium_div.appendChild(imperium_items_founds);

    /************************************************************/

    for (let n = 1; n <= 10; n++) {

        const p_get_imperium = L.DomUtil.create('p');
        p_get_imperium.setAttribute('class', 'p-get-imperium special-tools-item-found-p');

        imperium_items_founds.appendChild(p_get_imperium);

        const get_imperium = L.DomUtil.create('span');
        get_imperium.setAttribute('class', 'get-imperium special-tools-item-found-span');
        get_imperium.setAttribute('imperium-geojson', '');

        p_get_imperium.appendChild(get_imperium);

    }

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

    L.DomEvent.on(search_imperium, 'keyup', function () {

            btn_imperium.click();

    });

    L.DomEvent.on(btn_imperium, 'click', function () {
        const type_site = select_imperium_type.options[select_imperium_type.selectedIndex].value;
        const type_name = select_imperium_name.options[select_imperium_name.selectedIndex].value;
        const type_country = select_imperium_country.options[select_imperium_country.selectedIndex].value;
        const query = self.simple_sanitize_string(self.modal_body.querySelector('#search_imperium').value);
        const imperium_array = self.modal_body.querySelectorAll('.get-imperium');
        const p_imperium_array = self.modal_body.querySelectorAll('.p-get-imperium');

        const imperium_items_founds = self.modal_body.querySelector('#imperium_items_founds');
        
        imperium_items_founds.style.display = 'none';
        
        for (let index = 0; index < imperium_array.length; index++) {

            imperium_array[index].setAttribute('imperium-geojson', '');
            imperium_array[index].innerHTML = '';
            p_imperium_array[index].style.display = 'none';

        }

        if (query === '' || query.length <= 3) {

            return;

        }

        let options = {};

        options.query = query;
        options.type_site = type_site;
        options.type_name = type_name;
        options.type_country = type_country;

        let promise = self.tool.get_imperium_ahlfeldt(options);

        promise.then(function(data) {

            const content = data.content;

            for (let index in content) {

                const get_imperium = self.modal_body.querySelectorAll('.get-imperium')[index];
                const p_imperium = self.modal_body.querySelectorAll('.p-get-imperium')[index];

                try {

                    imperium_items_founds.style.display = 'block';
                    get_imperium.setAttribute('imperium-geojson', content[index].geojson);
                    get_imperium.innerHTML = content[index].value + ' - ' + content[index].geometry_type;

                } catch (Exception) {return;}

                p_imperium.style.display = 'block';

            }
        });
        
    });

    const imperium_array = self.modal_body.querySelectorAll('.get-imperium');
    
    for (let index = 0; index < imperium_array.length; index++) {
        
        L.DomEvent.addListener(imperium_array[index], 'click', function () {

            const GEOJSON = JSON.parse(this.getAttribute('imperium-geojson'));

            const OBJECTS_GEOJSON = self.project(GEOJSON);

            for (let index in OBJECTS_GEOJSON) {

                let count_objects = 1;
                let areas = [];

                for (let obj in OBJECTS_GEOJSON[index]) {

                    window.setTimeout(function(){

                        self.map.fire("pm:create", {layer: OBJECTS_GEOJSON[index][obj]});

                    }, 100);

                    if (self.is_point(OBJECTS_GEOJSON[index][obj])) {

                       if (count_objects === OBJECTS_GEOJSON[index].length) { 

                            self.map.panTo(OBJECTS_GEOJSON[index][obj].getLatLng());

                       }

                    } else if (self.is_linestring(OBJECTS_GEOJSON[index][obj])) {

                        if (count_objects === OBJECTS_GEOJSON[index].length) {

                            self.map.fitBounds(OBJECTS_GEOJSON[index][obj].getBounds());

                        }

                    } else if (self.is_polygon(OBJECTS_GEOJSON[index][obj])) {

                        areas.push({
                            area: turf.area(OBJECTS_GEOJSON[index][obj].toGeoJSON()),
                            object: OBJECTS_GEOJSON[index][obj]
                        });

                        if (count_objects === OBJECTS_GEOJSON[index].length) {

                            let max_value = 0;
                            for (let y in areas) {

                               max_value = Math.max(max_value, areas[y].area); 

                            }                                                    

                            for (let r in areas) {

                                if (areas[r].area === max_value) {

                                    self.map.fitBounds(areas[r].object.getBounds());

                                }

                            }

                        }

                    }

                    count_objects++;

                }

            }
                    
        });
        
    }
    
};


