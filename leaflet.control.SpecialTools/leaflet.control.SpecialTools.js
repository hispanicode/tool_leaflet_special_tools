
L.Control.SpecialTools = L.Control.extend({

    onAdd: function (map) {

        const self = this;
        
        this.map = map;
        
        this.component_geolocation = this.options.component_geolocation;
        
        this.tool = this.options.tool;

        this.lang = this.options.lang;

        this.controlDiv = L.DomUtil.create('div', 'special-tools');

        this.special_tools_btns = L.DomUtil.create('div', 'special-tools-btns', this.controlDiv);
        
        this.special_tools_panel_show_hide = L.DomUtil.create('div', 'special-tools-panel-show-hide', this.special_tools_btns);

        this.tool.google_translate({

            element_html: self.special_tools_panel_show_hide,
            attribute: 'title',
            str: 'Mostrar-Ocultar', 
            lang: self.lang

        });

        this.special_tools_console = L.DomUtil.create('div', 'special-tools-console', this.controlDiv);
        
        this.special_tools_info_console = L.DomUtil.create('div', 'special-tools-info-console', this.special_tools_console);

        if (!L.Browser.mobile) {
        
            this.special_tools_panel_show_hide.setAttribute('show', '1');
        
        } else {
            
            this.special_tools_panel_show_hide.setAttribute('show', '0');
            
            this.special_tools_console.style.display = 'none';
            
        }

        L.DomEvent.on(this.special_tools_console, 'mouseover', function(e){
            
            map.dragging.disable();
            
            L.DomEvent.preventDefault(e);
            
        });
        
        L.DomEvent.on(this.special_tools_console, 'mouseout', function(e) {
            
            map.dragging.enable();
            
            L.DomEvent.preventDefault(e);
            
        });

        window.setTimeout(function(){
            
            map.eachLayer(function(layer){
                
                self.set_info_console(self, layer);
                
            });
            
        }, 500);
   
        self.tool.google_translate({
            
            element_html: self.special_tools_info_console,
            str: "Haga clic sobre algún objeto del mapa.", 
            lang: self.lang
            
        });
        
        var multi_id_max_messages = 1;
        
        map.on('pm:remove', function(e) {

            if (self.has_centroid(e.layer)) {
                
                const centroid_id = e.layer.feature.special_tools.centroid_tools_id;
                const centroid = self.get_layer_by_tools_id(map, centroid_id);
                centroid.pm.remove();
                
            }
            
            if (self.is_multi(e.layer)) {
                
                if (multi_id_max_messages === 1) {
                    
                    self.modal_message(self, "Eliminando objetos, por favor espere a que finalice el proceso.", self.lang, 6000);
                    
                    window.setTimeout(function() {
                        
                        multi_id_max_messages = 1;
                    
                    }
                    , 6000);
                
                }
                
                multi_id_max_messages = 0;
                
                const multi_id = self.get_multi_id(e.layer);

                window.setTimeout(function(){
                    
                    self.remove_by_multi_id(map, multi_id);

                }, 1000);
                
                window.setTimeout(function(){
                    
                    self.remove_by_multi_id(map, multi_id);
                    
                }, 2000);
                
                window.setTimeout(function(){
                    
                    self.remove_by_multi_id(map, multi_id);
                    
                }, 3000);
                
            }
            
            if (!self.is_centroid(e.layer)) {
                
                let options = {};

                options.str = "Haga clic sobre algún objeto del mapa.";
                options.lang = self.lang;
                
                self.tool.google_translate({

                    element_html: self.special_tools_info_console,
                    str: "Haga clic sobre algún objeto del mapa.", 
                    lang: self.lang

                });
                
            }
            
        });

        map.on('pm:create', function(e){

            if (!e.layer.hasOwnProperty('feature')) {
                
                e.layer.feature = e.layer.toGeoJSON();
                e.layer.feature.special_tools = {};
                e.layer.feature.special_tools.tools_id = self.make_id(20);
                e.layer.feature.special_tools.geoman_edition = false;
                self.set_info_console(self, e.layer);
                
            } 
            
            else if (e.layer.hasOwnProperty('feature')) {
                
                if (!self.is_special_tools(e.layer)) {
                    
                    e.layer.feature.special_tools = {};
                    e.layer.feature.special_tools.tools_id = self.make_id(20);
                    e.layer.feature.special_tools.geoman_edition = false;
                    self.set_info_console(self, e.layer);
                
                } else {
                    
                    self.set_info_console(self, e.layer);
                    
                }
                    
            }
            

        });

        var last_position = null;
        map.on('move', function(e){
            
            const map_bounds = map.getBounds();

                map.eachLayer(function(layer){
                    
                    if (!(layer instanceof L.TileLayer)) {
                        
                        if (layer instanceof L.Polygon || layer instanceof L.Rectangle)
                        {
                            
                            if (self.has_centroid(layer) && self.is_incertidumbre(layer)) {

                            const centroid_id = layer.feature.special_tools.centroid_tools_id;
                            const centroid = self.get_layer_by_tools_id(self.map, centroid_id);
                            const centroid_latlng = centroid._latlng;
                            var new_coordinates;
                            var midpoint;

                            const new_polygon = new Array();
                            
                                const poly_1 = turf.bboxPolygon(
                                    [
                                        map_bounds.getWest(),
                                        map_bounds.getSouth(),
                                        map_bounds.getEast(),
                                        map_bounds.getNorth()
                                    ] 
                                );
                        
                                const poly_2 = turf.bboxPolygon(
                                    [
                                        layer.getBounds().getWest(),
                                        layer.getBounds().getSouth(),
                                        layer.getBounds().getEast(),
                                        layer.getBounds().getNorth()
                                    ]
                                );
                        
                                const area_poly_1 = turf.area(poly_1);
                                const area_poly_2 = turf.area(poly_2);
                            
                                if (!map_bounds.contains(layer.getBounds().getCenter()) && area_poly_1 > area_poly_2) {

                                midpoint = turf.midpoint(
                                         
                                    [layer.getBounds().getCenter().lat, layer.getBounds().getCenter().lng], 
                                    [
                                        layer.getBounds().getSouthWest().lat, 
                                        layer.getBounds().getSouthWest().lng
                                    ]
                                            
                                );
                                
                                new_coordinates = L.latLng(midpoint.geometry.coordinates);
                                
                                if (map_bounds.contains(new_coordinates) && self.point_in_polygon(new_coordinates, layer)) {
                                    
                                    centroid.setLatLng(new_coordinates);
                                    
                                    return;
                                    
                                }
                                
                                 midpoint = turf.midpoint(
                                         
                                    [layer.getBounds().getCenter().lat, layer.getBounds().getCenter().lng], 
                                    [
                                        layer.getBounds().getNorthEast().lat, 
                                        layer.getBounds().getNorthEast().lng
                                    ]
                                            
                                );
                                
                                new_coordinates = L.latLng(midpoint.geometry.coordinates);
                                
                                if (map_bounds.contains(new_coordinates) && self.point_in_polygon(new_coordinates, layer)) {
                                    
                                    centroid.setLatLng(new_coordinates);

                                    return;
                                    
                                }

                                 midpoint = turf.midpoint(
                                         
                                    [layer.getBounds().getCenter().lat, layer.getBounds().getCenter().lng], 
                                    [
                                        layer.getBounds().getNorthWest().lat, 
                                        layer.getBounds().getNorthWest().lng
                                    ]
                                            
                                );
                                
                                new_coordinates = L.latLng(midpoint.geometry.coordinates);
                                
                                if (map_bounds.contains(new_coordinates) && self.point_in_polygon(new_coordinates, layer)) {
                                    
                                    centroid.setLatLng(new_coordinates);

                                    return;
                                    
                                }
                                
                                 midpoint = turf.midpoint(
                                         
                                    [layer.getBounds().getCenter().lat, layer.getBounds().getCenter().lng], 
                                    [
                                        layer.getBounds().getSouthEast().lat, 
                                        layer.getBounds().getSouthEast().lng
                                    ]
                                            
                                );
                                
                                new_coordinates = L.latLng(midpoint.geometry.coordinates);
                                
                                if (map_bounds.contains(new_coordinates) && self.point_in_polygon(new_coordinates, layer)) {
                                    
                                    centroid.setLatLng(new_coordinates);

                                    return;
                                    
                                }
                                
                                if (map_bounds.contains(layer.getBounds().getSouthWest())) {
                                    
                                    new_coordinates = layer.getBounds().getSouthWest();
                                    
                                    if (self.point_in_polygon(new_coordinates, layer)) {
                                        
                                        centroid.setLatLng(new_coordinates);
                                        
                                        return;
                                        
                                    } 
                                    
                                }
                                
                                if (map_bounds.contains(layer.getBounds().getNorthEast())) {
                                    
                                    new_coordinates = layer.getBounds().getNorthEast();
                                    
                                    if (self.point_in_polygon(new_coordinates, layer)) {
                                        
                                        centroid.setLatLng(new_coordinates);
                                        
                                        return;
                                        
                                    }
                                    
                                }
                                
                                if (map_bounds.contains(layer.getBounds().getNorthWest())) {
                                    
                                    new_coordinates = layer.getBounds().getNorthWest();
                                    
                                    if (self.point_in_polygon(new_coordinates, layer)) {
                                        
                                        centroid.setLatLng(new_coordinates);
                                        
                                        return;
                                        
                                    }
                                    
                                }
                                
                                if (map_bounds.contains(layer.getBounds().getSouthEast())) {
                                    
                                    new_coordinates = layer.getBounds().getSouthEast();
                                    
                                    if (self.point_in_polygon(new_coordinates, layer)) {
                                        
                                        centroid.setLatLng(new_coordinates);
                                        
                                        return;
                                        
                                    }
                                    
                                } 
                                

                            } else if (area_poly_1 < area_poly_2 && layer.getBounds().contains(map_bounds.getCenter())){
                                
                                if (self.point_in_polygon(map_bounds.getCenter(), layer)) {

                                    last_position = map_bounds.getCenter();

                                    centroid.setLatLng(map_bounds.getCenter());

                                    return;

                                }
                                
                            } else if (map_bounds.contains(layer.getBounds().getCenter()) && area_poly_1 > area_poly_2) {
                                
                                if (self.point_in_polygon(layer.getBounds().getCenter(), layer)) {
                                    
                                    centroid.setLatLng(layer.getBounds().getCenter());

                                    return;
                                        
                                } else {
                                    
                                    if (last_position !== null) {
                                        
                                        centroid.setLatLng(last_position);
                                        
                                    }
                                    
                                }
                                
                            } else if(area_poly_1 < area_poly_2 && !layer.getBounds().contains(map_bounds.getCenter())) {
                                
                                if(
                                    last_position !== null 
                                    && layer.getBounds().contains(last_position)
                                    && self.point_in_polygon(last_position, layer)
                                ) {
                            
                                    centroid.setLatLng(last_position);
                                    
                                    return;
                                }

                                else if (map_bounds.contains(layer.getBounds().getSouthWest())) {
                                    
                                    new_coordinates = layer.getBounds().getSouthWest();
                                    
                                    if (self.point_in_polygon(new_coordinates, layer)) {
                                        
                                        centroid.setLatLng(new_coordinates);
                                        
                                        return;
                                        
                                    }
                                    
                                }
                                
                                else if (map_bounds.contains(layer.getBounds().getNorthEast())) {
                                    
                                    new_coordinates = layer.getBounds().getNorthEast();
                                    
                                    if (self.point_in_polygon(new_coordinates, layer)) {
                                        
                                        centroid.setLatLng(new_coordinates);
                                        
                                        return;
                                        
                                    }
                                }
                                
                                else if (map_bounds.contains(layer.getBounds().getNorthWest())) {
                                    
                                    new_coordinates = layer.getBounds().getNorthWest();
                                    
                                    if (self.point_in_polygon(new_coordinates, layer)) {
                                        
                                        centroid.setLatLng(new_coordinates);
                                        
                                        return;
                                        
                                    }
                                }
                                
                                else if (map_bounds.contains(layer.getBounds().getSouthEast())) {
                                    
                                    new_coordinates = layer.getBounds().getSouthEast();
                                    
                                    if (self.point_in_polygon(new_coordinates, layer)) {
                                        
                                        centroid.setLatLng(new_coordinates);
                                        
                                        return;
                                        
                                    }
                                }   
                            }
                        }
                    }
                }
            });
        });
        
        L.DomEvent.addListener(this.special_tools_panel_show_hide, 'click', function() {
            
           if (this.getAttribute('show') === '1') {
               
               this.setAttribute('show', '0');
               
               self.special_tools_console.style.display = 'none';
               
           } else if (this.getAttribute('show') === '0') {
               
               this.setAttribute('show', '1');
               
               self.special_tools_console.style.display = 'block';
               
           }
        });
        /* Mostrar-Ocultar consola */

        return this.controlDiv;

    },
    
    set_info_console: function(self, layer) {

        let geometry_type = null;
  
        if (!(layer instanceof L.TileLayer)) {

            if (!self.is_special_tools(layer)) {

                if (layer.hasOwnProperty('feature')) {

                    layer.feature.special_tools = {};
                    layer.feature.special_tools.tools_id = self.make_id(20);
                    layer.feature.special_tools.geoman_edition = false;

                } else {
                    
                    try {
                        
                        layer.feature = layer.toGeoJSON();
                        layer.feature.special_tools = {};
                        layer.feature.special_tools.tools_id = self.make_id(20);
                        layer.feature.special_tools.geoman_edition = false;
                        
                    } catch (e){}
                    
                }
            }

            if (self.is_point(layer) && !self.is_circle(layer)) {
                
                if (layer instanceof L.Marker) {

                    const icon = L.icon({
                        
                        iconUrl: self.tool.controls_url() + '/img/pin.svg',
                        iconSize: [36, 36],
                        iconAnchor: [18, 34]
                        
                    });

                    layer.setIcon(icon);
                    
                    var default_color;

                    if (layer.feature.properties.hasOwnProperty('color')) {
                        
                        default_color = layer.feature.properties.color;
                        
                    } else {
                        
                        default_color = '#3d5880';
                        
                    }

                    if (!layer.feature.special_tools.hasOwnProperty('marker_filter')) {
                    
                        let _compute = compute(default_color);
                        
                        layer._icon.style.filter = _compute.result.filterRaw;

                    
                    } else {
                        
                        layer._icon.style.filter = layer.feature.special_tools.marker_filter;
                        
                    }

                }

                if (!self.is_geoman_edition_mode(layer)) {
                    
                    self.pm_disable(layer);

                } else {
                    
                    self.pm_enable(layer);

                }

                layer.on('click pm:edit', function(){
                    
                    self.special_tools_info_console.innerHTML = '';

                    self.special_tools_info_console.style.display = 'none';

                    window.setTimeout(function() {

                        self.special_tools_info_console.style.display = 'block';

                    }, 1000);
                    
                    geometry_type = this.feature.geometry.type;
                    
                    const div_geometry_type = L.DomUtil.create('div');
                    div_geometry_type.innerText = geometry_type;
                    div_geometry_type.setAttribute('class', 'special-tools-container');
                    self.special_tools_info_console.appendChild(div_geometry_type);

                    if (!self.is_geoman_edition_mode(this)) {

                        self.pm_disable(this);

                    } else {

                        self.pm_enable(this);

                    }

                    if (self.is_oneXone(this)) {
                        
                        let point_reference_div = L.DomUtil.create('div');
                        point_reference_div.setAttribute('class', 'special-tools-container');
                        self.special_tools_info_console.appendChild(point_reference_div);
                        
                        self.tool.google_translate({

                            element_html: point_reference_div,
                            str: "Punto de referencia de polígono de 1 m²", 
                            lang: self.lang

                        });
                        
                    }
                    
                    const lat_lng_div = L.DomUtil.create('div');
                    lat_lng_div.setAttribute('class', 'special-tools-container');
                    
                    self.special_tools_info_console.appendChild(lat_lng_div);

                    const lat_lng_span_1 = L.DomUtil.create('span');
                    
                    lat_lng_div.appendChild(lat_lng_span_1);

                    self.tool.google_translate({

                        element_html: lat_lng_span_1,
                        str: "Coordenadas: ", 
                        lang: self.lang

                    });
                    
                    const br = L.DomUtil.create('br');
                    lat_lng_div.appendChild(br);
                    
                    const lat_lng_span_2 = L.DomUtil.create('span');
                    lat_lng_span_2.innerText = this._latlng.lat + " " + this._latlng.lng;
                    
                    lat_lng_div.appendChild(lat_lng_span_2);

                    const tools_id = self.get_tools_id_by_layer(this);
                    
                    let checked_geoman = false;
                    
                    if (self.is_geoman_edition_mode(this)) {

                        checked_geoman = true;

                    }
                    
                    const geoman_edition_div = L.DomUtil.create('div');
                    geoman_edition_div.setAttribute('class', 'special-tools-container');

                    self.special_tools_info_console.appendChild(geoman_edition_div);
                    
                    const geoman_edition_input = L.DomUtil.create('input');
                    geoman_edition_input.type = 'checkbox';
                    geoman_edition_input.id = 'geoman_edition_input';
                    geoman_edition_input.setAttribute('tools-id', tools_id);
                    geoman_edition_input.checked = checked_geoman;
                    
                    geoman_edition_div.appendChild(geoman_edition_input);
                    
                    const geoman_edition_span = L.DomUtil.create('span');
                    
                    geoman_edition_div.appendChild(geoman_edition_span);
                    
                    self.tool.google_translate({

                        element_html: geoman_edition_span,
                        str: "  Edición Geoman activa", 
                        lang: self.lang

                    });
                    
                    const options_div = L.DomUtil.create('div');
                    options_div.setAttribute('class', 'special-tools-container');
                    
                    self.special_tools_info_console.appendChild(options_div);
                    
                    const marker_options_btn = L.DomUtil.create('button');
                    marker_options_btn.type = 'button';
                    marker_options_btn.setAttribute('class', 'special-tools-btn-default');
                    marker_options_btn.style.fontSize = '9px';
                    
                    self.tool.google_translate({

                        element_html: marker_options_btn,
                        str: "Editar estilos", 
                        lang: self.lang

                    });
                    
                    options_div.appendChild(marker_options_btn);
                    
                    const vector_download_options_btn = L.DomUtil.create('button');
                    vector_download_options_btn.type = 'button';
                    vector_download_options_btn.setAttribute('class', 'special-tools-btn-default');
                    vector_download_options_btn.style.fontSize = '9px';
                    
                    self.tool.google_translate({

                        element_html: vector_download_options_btn,
                        str: "Descargar Vectorial", 
                        lang: self.lang

                    });
                    
                    options_div.appendChild(vector_download_options_btn);
                    
                    /******************************************************/

                    self.info_console_load_properties(self, this);
                    
                    const _this = this; //layer

                    const _geoman_edition_input = self.special_tools_info_console.querySelector('#geoman_edition_input');
                    
                    L.DomEvent.on(_geoman_edition_input, "click", function(){

                        if (this.checked) {
                            
                            self.pm_enable(_this);

                            _this.feature.special_tools.geoman_edition = true;

                        } else {
                            
                            self.pm_disable(_this);

                            _this.feature.special_tools.geoman_edition = false;

                        }
                        
                        const active_layer_id = self.component_geolocation.active_layer_id;
                        self.component_geolocation.update_draw_data(active_layer_id);
                        
                    });

                    self.show_modal_vector_download(vector_download_options_btn, self, layer);

                    self.marker_style(marker_options_btn, self.map, layer);
                    
                });
            }

            else if (self.is_circle(layer)) {
                
                var default_color;
     
                if (layer.feature.special_tools.hasOwnProperty('obj_stroke_color')) {

                    layer.setStyle({color: layer.feature.special_tools.obj_stroke_color});
                    layer.setStyle({fillColor: layer.feature.special_tools.obj_stroke_color});

                } else if (layer.feature.properties.hasOwnProperty('color')) {
                        
                    default_color = layer.feature.properties.color;
                    layer.setStyle({color: default_color});
                    layer.setStyle({fillColor: default_color});
                        
                } else {

                    default_color = '#3388ff';
                    layer.setStyle({color: default_color});
                    layer.setStyle({fillColor: default_color});

                }

                if (layer.feature.special_tools.hasOwnProperty('obj_stroke_width')) {

                    layer.setStyle({weight: layer.feature.special_tools.obj_stroke_width});

                }

                if (layer.feature.special_tools.hasOwnProperty('obj_stroke_opacity')) {

                    layer.setStyle({opacity: layer.feature.special_tools.obj_stroke_opacity});

                }

                if (layer.feature.special_tools.hasOwnProperty('obj_stroke_dasharray')) {

                    layer.setStyle({
                        
                        dashArray: layer.feature.special_tools.obj_stroke_dasharray,
                        dashOffset: 0
                    
                    });

                }

                if (layer.feature.special_tools.hasOwnProperty('obj_fill_opacity')) {

                    layer.setStyle({fillOpacity: layer.feature.special_tools.obj_fill_opacity});

                }
                
                if (!self.is_geoman_edition_mode(layer)) {
                    
                    self.pm_disable(layer);

                } else {
                    
                    self.pm_enable(layer);

                }
                
                if (layer.feature.special_tools.hasOwnProperty('bringToBack')) {
                    
                    if (layer.feature.special_tools.bringToBack) {
                        
                        layer.bringToBack();
                        
                    }
                }

                if (layer.feature.special_tools.hasOwnProperty('bringToFront')) {
                    
                    if (layer.feature.special_tools.bringToFront) {
                        
                        layer.bringToFront();
                        
                    }
                }
   
                layer.on('click pm:edit', function() {
                    
                    self.special_tools_info_console.innerHTML = '';

                    self.special_tools_info_console.style.display = 'none';

                    window.setTimeout(function() {

                        self.special_tools_info_console.style.display = 'block';

                    }, 1000);

                    const geometry_type = this.feature.geometry.type;
                    
                    const div_geometry_type = L.DomUtil.create('div');
                    div_geometry_type.innerText = geometry_type;
                    div_geometry_type.setAttribute('class', 'special-tools-container');
                    self.special_tools_info_console.appendChild(div_geometry_type);

                    if (!self.is_geoman_edition_mode(this)) {
                        
                        self.pm_disable(this);

                    } else {
                        
                        self.pm_enable(this);
                    }
                    
                    let checked_bringtoback = false;
                    let checked_bringtofront = false;

                    if (layer.feature.special_tools.hasOwnProperty('bringToBack')) {
                        if (layer.feature.special_tools.bringToBack) {
                            layer.bringToBack();
                            checked_bringtoback = true;
                            checked_bringtofront = false;
                        }
                    }

                    if (layer.feature.special_tools.hasOwnProperty('bringToFront')) {
                        if (layer.feature.special_tools.bringToFront) {
                            layer.bringToFront();
                            checked_bringtoback = false;
                            checked_bringtofront = true;
                        }
                    }
                    
                    const lat_lng_div = L.DomUtil.create('div');
                    lat_lng_div.setAttribute('class', 'special-tools-container');
                    
                    self.special_tools_info_console.appendChild(lat_lng_div);

                    const lat_lng_div_1 = L.DomUtil.create('div');
                    
                    lat_lng_div.appendChild(lat_lng_div_1);
                    
                    self.tool.google_translate({

                        element_html: lat_lng_div_1,
                        str: "Coordenadas del centro: ", 
                        lang: self.lang

                    });
                    
                    const lat_lng_div_2 = L.DomUtil.create('div');
                    lat_lng_div_2.innerText = this._latlng.lat + " " + this._latlng.lng;
                    
                    lat_lng_div.appendChild(lat_lng_div_2);
                    
                    const radius_div = L.DomUtil.create('div');
                    radius_div.setAttribute('class', 'special-tools-container');
                    
                    self.special_tools_info_console.appendChild(radius_div);

                    const radius = this.getRadius().toFixed(2);
                    
                    self.tool.google_translate({

                        element_html: radius_div,
                        str: "Radio: " + radius + "m.", 
                        lang: self.lang

                    });
                    
                    const area_div = L.DomUtil.create('div');
                    area_div.setAttribute('class', 'special-tools-container');
                    
                    self.special_tools_info_console.appendChild(area_div);
  
                    const area = (2 * Math.PI * radius).toFixed(2);
                    
                    self.tool.google_translate({

                        element_html: area_div,
                        str: "Área: " + area + "m.", 
                        lang: self.lang

                    });

                    const tools_id = self.get_tools_id_by_layer(this);

                    let checked_centroid = false;
                    
                    if (self.has_centroid(this)) {

                        checked_centroid = true;

                    }

                    let checked_geoman = false;
                    
                    if (self.is_geoman_edition_mode(this)) {

                        checked_geoman = true;

                    }
                    
                    const centroide_div = L.DomUtil.create('div');
                    centroide_div.setAttribute('class', 'special-tools-container');

                    self.special_tools_info_console.appendChild(centroide_div);
                    
                    const centroide_input = L.DomUtil.create('input');
                    centroide_input.type = 'checkbox';
                    centroide_input.id = 'centroide_input';
                    centroide_input.setAttribute('tools-id', tools_id);
                    centroide_input.checked = checked_centroid;
                    
                    centroide_div.appendChild(centroide_input);
                    
                    const centroide_span = L.DomUtil.create('span');
                    
                    centroide_div.appendChild(centroide_span);
                    
                    self.tool.google_translate({

                        element_html: centroide_span,
                        str: " Centroide", 
                        lang: self.lang

                    });
                    
                    const geoman_edition_div = L.DomUtil.create('div');
                    geoman_edition_div.setAttribute('class', 'special-tools-container');

                    self.special_tools_info_console.appendChild(geoman_edition_div);
                    
                    const geoman_edition_input = L.DomUtil.create('input');
                    geoman_edition_input.type = 'checkbox';
                    geoman_edition_input.id = 'geoman_edition_input';
                    geoman_edition_input.setAttribute('tools-id', tools_id);
                    geoman_edition_input.checked = checked_geoman;
                    
                    geoman_edition_div.appendChild(geoman_edition_input);
                    
                    const geoman_edition_span = L.DomUtil.create('span');
                    
                    geoman_edition_div.appendChild(geoman_edition_span);
                    
                    self.tool.google_translate({

                        element_html: geoman_edition_span,
                        str: "  Edición Geoman activa", 
                        lang: self.lang

                    });
                    
                    const hierarchy_div = L.DomUtil.create('div');
                    hierarchy_div.setAttribute('class', 'special-tools-container');
                    self.special_tools_info_console.appendChild(hierarchy_div);
                    
                    self.tool.google_translate({

                        element_html: hierarchy_div,
                        str: "Jerarquía del objeto: ", 
                        lang: self.lang

                    });
                    
                    const bringtofront_div = L.DomUtil.create('div');
                    bringtofront_div.setAttribute('class', 'special-tools-container');
                    self.special_tools_info_console.appendChild(bringtofront_div);
                    
                    const bringtofront_input = L.DomUtil.create('input');
                    bringtofront_input.type = 'checkbox';
                    bringtofront_input.id = 'bringtofront_input';
                    bringtofront_input.setAttribute('tools-id', tools_id);
                    bringtofront_input.checked = checked_bringtofront;
                    
                    bringtofront_div.appendChild(bringtofront_input);
                    
                    const bringtofront_span = L.DomUtil.create('span');
                    
                    bringtofront_div.appendChild(bringtofront_span);
                    
                    self.tool.google_translate({

                        element_html: bringtofront_span,
                        str: " Delante", 
                        lang: self.lang

                    });
                    
                    const bringtoback_div = L.DomUtil.create('div');
                    bringtoback_div.setAttribute('class', 'special-tools-container');
                    self.special_tools_info_console.appendChild(bringtoback_div);
                    
                    const bringtoback_input = L.DomUtil.create('input');
                    bringtoback_input.type = 'checkbox';
                    bringtoback_input.id = 'bringtoback_input';
                    bringtoback_input.setAttribute('tools-id', tools_id);
                    bringtoback_input.checked = checked_bringtoback;
                    
                    bringtoback_div.appendChild(bringtoback_input);
                    
                    const bringtoback_span = L.DomUtil.create('span');
                    
                    bringtoback_div.appendChild(bringtoback_span);
                    
                    self.tool.google_translate({

                        element_html: bringtoback_span,
                        str: " Detrás", 
                        lang: self.lang

                    });
                    
                    const options_div = L.DomUtil.create('div');
                    options_div.setAttribute('class', 'special-tools-container');
                    
                    self.special_tools_info_console.appendChild(options_div);
                    
                    const circle_options_btn = L.DomUtil.create('button');
                    circle_options_btn.type = 'button';
                    circle_options_btn.setAttribute('class', 'special-tools-btn-default');
                    circle_options_btn.style.fontSize = '9px';
                    
                    self.tool.google_translate({

                        element_html: circle_options_btn,
                        str: "Editar estilos", 
                        lang: self.lang

                    });
                    
                    options_div.appendChild(circle_options_btn);
                    
                    const vector_download_options_btn = L.DomUtil.create('button');
                    vector_download_options_btn.type = 'button';
                    vector_download_options_btn.setAttribute('class', 'special-tools-btn-default');
                    vector_download_options_btn.style.fontSize = '9px';
                    
                    self.tool.google_translate({

                        element_html: vector_download_options_btn,
                        str: "Descargar Vectorial", 
                        lang: self.lang

                    });
                    
                    options_div.appendChild(vector_download_options_btn);
                    
                    /******************************************************/

                    self.info_console_load_properties(self, this);
                    
                    /******************************************************/
                    
                    const _this = this; //layer
                    
                    const _centroide_input = self.special_tools_info_console.querySelector('#centroide_input');
                    
                    L.DomEvent.on(_centroide_input, "click", function(){

                        if (this.checked) {

                            centroid = layer.getBounds().getCenter();
                            
                            const marker = L.marker(centroid);

                            marker.feature = marker.toGeoJSON();
                            marker.feature.special_tools = {};
                            marker.feature.special_tools.is_centroid = true;

                            const new_tools_id = self.make_id(20);

                            marker.feature.special_tools.tools_id = new_tools_id;

                            _this.feature.special_tools.has_centroid = true;
                            _this.feature.special_tools.centroid_tools_id = new_tools_id;
                                
                            self.map.fire('pm:create', {layer: marker});
                            
                            self.modal_message(self, "Centroide creado con éxito", self.lang);

                        } else {

                            if (self.has_centroid(_this)) {

                                const centroid_tools_id = _this.feature.special_tools.centroid_tools_id;

                                const centroid = self.get_layer_by_tools_id(self.map, centroid_tools_id);

                                _this.feature.special_tools.has_centroid = false;
                                _this.feature.special_tools.centroid_tools_id = null;

                                centroid.pm.remove();
                                
                                self.modal_message(self, "Centroide eliminado con éxito", self.lang);
                            }
                        }

                    });
                    
                    const _geoman_edition_input = self.special_tools_info_console.querySelector('#geoman_edition_input');

                    L.DomEvent.on(_geoman_edition_input, "click", function(){

                        if (this.checked) {
                            
                            self.pm_enable(_this);

                            _this.feature.special_tools.geoman_edition = true;

                        } else {
                            
                            self.pm_disable(_this);

                            _this.feature.special_tools.geoman_edition = false;

                        }
                        
                        const active_layer_id = self.component_geolocation.active_layer_id;
                        self.component_geolocation.update_draw_data(active_layer_id);
                    
                    });
                    
                    const _bringtoback_input = self.special_tools_info_console.querySelector('#bringtoback_input');
                    
                    L.DomEvent.on(_bringtoback_input, "click", function(){
                        
                        if (this.checked) {
                            
                            _this.feature.special_tools.bringToBack = true;
                            _this.feature.special_tools.bringToFront = false;
                            bringtofront_input.checked = false;
                            
                            _this.bringToBack();
                            
                        } else {
                            
                            _this.feature.special_tools.bringToBack = false;
                            _this.bringToFront();
                            
                        }

                        const active_layer_id = self.component_geolocation.active_layer_id;
                        self.component_geolocation.update_draw_data(active_layer_id);

                    });
                    
                    const _bringtofront_input = self.special_tools_info_console.querySelector('#bringtofront_input');
                    
                    L.DomEvent.on(_bringtofront_input, "click", function(){

                        if (this.checked) {
                            
                            _this.feature.special_tools.bringToFront = true;
                            _this.feature.special_tools.bringToBack = false;
                            bringtoback_input.checked = false;
                            
                            _this.bringToFront();
                            
                        } else {
                            
                            _this.feature.special_tools.bringToFront = false;
                            
                            _this.bringToBack();
                        }

                        const active_layer_id = self.component_geolocation.active_layer_id;
                        self.component_geolocation.update_draw_data(active_layer_id);

                    });
          
                    self.show_modal_vector_download(vector_download_options_btn, self, layer);
                 
                    self.polygon_circle_style(circle_options_btn, self.map, layer);
                
                });
            }

            else if (self.is_linestring(layer)) {
                
                var default_color;
                
                if (layer.feature.special_tools.hasOwnProperty('obj_stroke_color')) {
                            
                    layer.setStyle({color: layer.feature.special_tools.obj_stroke_color});
                
                } else if (layer.feature.properties.hasOwnProperty('color')) {
                        
                    default_color = layer.feature.properties.color;
                    layer.setStyle({color: default_color});
                        
                } else {

                    default_color = '#3388ff';
                    layer.setStyle({color: default_color});

                }
                
                if (layer.feature.special_tools.hasOwnProperty('obj_stroke_width')) {
                            
                    layer.setStyle({weight: layer.feature.special_tools.obj_stroke_width});
                
                }
                
                if (layer.feature.special_tools.hasOwnProperty('obj_stroke_opacity')) {
                            
                    layer.setStyle({opacity: layer.feature.special_tools.obj_stroke_opacity});
                
                }
                
                if (layer.feature.special_tools.hasOwnProperty('obj_stroke_dasharray')) {
                            
                    layer.setStyle({
                        
                        dashArray: layer.feature.special_tools.obj_stroke_dasharray,
                        dashOffset: 0
                        
                    });
                
                }
                
                if (!self.is_geoman_edition_mode(layer)) {

                    self.pm_disable(layer); 

                } else {

                    self.pm_enable(layer);

                }
                
                if (layer.feature.special_tools.hasOwnProperty('bringToBack')) {
                    
                    if (layer.feature.special_tools.bringToBack) {
                        
                        layer.bringToBack();
                        
                    }
                }

                if (layer.feature.special_tools.hasOwnProperty('bringToFront')) {
                    
                    if (layer.feature.special_tools.bringToFront) {
                        
                        layer.bringToFront();
                        
                    }
                }
                
                layer.on('click pm:edit', function(){
                    
                    self.special_tools_info_console.innerHTML = '';

                    self.special_tools_info_console.style.display = 'none';

                    window.setTimeout(function() {

                        self.special_tools_info_console.style.display = 'block';

                    }, 1000);

                    const geometry_type = this.feature.geometry.type;
                    
                    const div_geometry_type = L.DomUtil.create('div');
                    div_geometry_type.innerText = geometry_type;
                    div_geometry_type.setAttribute('class', 'special-tools-container');
                    self.special_tools_info_console.appendChild(div_geometry_type);

                    if (!self.is_geoman_edition_mode(this)) {
                        
                        self.pm_disable(this);

                    } else {
                        
                        self.pm_enable(this);

                    }
                    
                    let checked_bringtoback = false;
                    let checked_bringtofront = false;

                    if (layer.feature.special_tools.hasOwnProperty('bringToBack')) {
                        
                        if (layer.feature.special_tools.bringToBack) {
                            
                            layer.bringToBack();
                            checked_bringtoback = true;
                            checked_bringtofront = false;
                            
                        }
                    }

                    if (layer.feature.special_tools.hasOwnProperty('bringToFront')) {
                        
                        if (layer.feature.special_tools.bringToFront) {
                            
                            layer.bringToFront();
                            checked_bringtoback = false;
                            checked_bringtofront = true;
                            
                        }
                    }

                    const distance_div = L.DomUtil.create('div');
                    distance_div.setAttribute('class', 'special-tools-container');
                    
                    self.special_tools_info_console.appendChild(distance_div);

                    const length = turf.length(layer.toGeoJSON());
                    
                    self.tool.google_translate({

                        element_html: distance_div,
                        str: "Distancia: " + length.toFixed(2) + " km", 
                        lang: self.lang

                    });

                    const tools_id = self.get_tools_id_by_layer(this);
                    
                    let checked_geoman = false;
                    
                    if (self.is_geoman_edition_mode(this)) {

                        checked_geoman = true;

                    }
                    
                    const geoman_edition_div = L.DomUtil.create('div');
                    geoman_edition_div.setAttribute('class', 'special-tools-container');

                    self.special_tools_info_console.appendChild(geoman_edition_div);
                    
                    const geoman_edition_input = L.DomUtil.create('input');
                    geoman_edition_input.type = 'checkbox';
                    geoman_edition_input.id = 'geoman_edition_input';
                    geoman_edition_input.setAttribute('tools-id', tools_id);
                    geoman_edition_input.checked = checked_geoman;
                    
                    geoman_edition_div.appendChild(geoman_edition_input);
                    
                    const geoman_edition_span = L.DomUtil.create('span');
                    
                    geoman_edition_div.appendChild(geoman_edition_span);
                    
                    self.tool.google_translate({

                        element_html: geoman_edition_span,
                        str: "  Edición Geoman activa", 
                        lang: self.lang

                    });

                    const hierarchy_div = L.DomUtil.create('div');
                    hierarchy_div.setAttribute('class', 'special-tools-container');
                    self.special_tools_info_console.appendChild(hierarchy_div);
                    
                    self.tool.google_translate({

                        element_html: hierarchy_div,
                        str: "Jerarquía del objeto: ", 
                        lang: self.lang

                    });
                    
                    const bringtofront_div = L.DomUtil.create('div');
                    bringtofront_div.setAttribute('class', 'special-tools-container');
                    self.special_tools_info_console.appendChild(bringtofront_div);
                    
                    const bringtofront_input = L.DomUtil.create('input');
                    bringtofront_input.type = 'checkbox';
                    bringtofront_input.id = 'bringtofront_input';
                    bringtofront_input.setAttribute('tools-id', tools_id);
                    bringtofront_input.checked = checked_bringtofront;
                    
                    bringtofront_div.appendChild(bringtofront_input);
                    
                    const bringtofront_span = L.DomUtil.create('span');
                    
                    bringtofront_div.appendChild(bringtofront_span);
                    
                    self.tool.google_translate({

                        element_html: bringtofront_span,
                        str: " Delante", 
                        lang: self.lang

                    });
                    
                    const bringtoback_div = L.DomUtil.create('div');
                    bringtoback_div.setAttribute('class', 'special-tools-container');
                    self.special_tools_info_console.appendChild(bringtoback_div);
                    
                    const bringtoback_input = L.DomUtil.create('input');
                    bringtoback_input.type = 'checkbox';
                    bringtoback_input.id = 'bringtoback_input';
                    bringtoback_input.setAttribute('tools-id', tools_id);
                    bringtoback_input.checked = checked_bringtoback;
                    
                    bringtoback_div.appendChild(bringtoback_input);
                    
                    const bringtoback_span = L.DomUtil.create('span');
                    
                    bringtoback_div.appendChild(bringtoback_span);
                    
                    self.tool.google_translate({

                        element_html: bringtoback_span,
                        str: " Detrás", 
                        lang: self.lang

                    });
                    
                    const options_div = L.DomUtil.create('div');
                    options_div.setAttribute('class', 'special-tools-container');
                    
                    self.special_tools_info_console.appendChild(options_div);
                    
                    const linestring_options_btn = L.DomUtil.create('button');
                    linestring_options_btn.type = 'button';
                    linestring_options_btn.setAttribute('class', 'special-tools-btn-default');
                    linestring_options_btn.style.fontSize = '9px';
                    
                    self.tool.google_translate({

                        element_html: linestring_options_btn,
                        str: "Editar estilos", 
                        lang: self.lang

                    });
                    
                    options_div.appendChild(linestring_options_btn);
                    
                    const vector_download_options_btn = L.DomUtil.create('button');
                    vector_download_options_btn.type = 'button';
                    vector_download_options_btn.setAttribute('class', 'special-tools-btn-default');
                    vector_download_options_btn.style.fontSize = '9px';
                    
                    self.tool.google_translate({

                        element_html: vector_download_options_btn,
                        str: "Descargar Vectorial", 
                        lang: self.lang

                    });
                    
                    options_div.appendChild(vector_download_options_btn);
                    
                    /******************************************************/

                    self.info_console_load_properties(self, this);
                    
                    /******************************************************/

                    const _this = this;

                    const _geoman_edition_input = self.special_tools_info_console.querySelector('#geoman_edition_input');

                    L.DomEvent.on(_geoman_edition_input, "click", function(){

                        if (this.checked) {
                            
                            self.pm_enable(_this);

                            _this.feature.special_tools.geoman_edition = true;

                        } else {
                            
                            self.pm_disable(_this);

                            _this.feature.special_tools.geoman_edition = false;

                        }

                        const active_layer_id = self.component_geolocation.active_layer_id;
                        self.component_geolocation.update_draw_data(active_layer_id);
                        
                    });
                    
                    const _bringtoback_input = self.special_tools_info_console.querySelector('#bringtoback_input');
                    
                    L.DomEvent.on(_bringtoback_input, "click", function(){
                        
                        if (this.checked) {
                            
                            _this.feature.special_tools.bringToBack = true;
                            _this.feature.special_tools.bringToFront = false;
                            bringtofront_input.checked = false;
                            
                            _this.bringToBack();
                            
                        } else {
                            
                            _this.feature.special_tools.bringToBack = false;
                            
                            _this.bringToFront();
                        }

                        const active_layer_id = self.component_geolocation.active_layer_id;
                        self.component_geolocation.update_draw_data(active_layer_id);

                    });
                    
                    const _bringtofront_input = self.special_tools_info_console.querySelector('#bringtofront_input');

                    L.DomEvent.on(_bringtofront_input, "click", function(){

                        if (this.checked) {
                            
                            _this.feature.special_tools.bringToFront = true;
                            _this.feature.special_tools.bringToBack = false;
                            bringtoback_input.checked = false;
                            
                            _this.bringToFront();
                            
                        } else {
                            _this.feature.special_tools.bringToFront = false;
                            
                            _this.bringToBack();
                        }

                        const active_layer_id = self.component_geolocation.active_layer_id;
                        self.component_geolocation.update_draw_data(active_layer_id);
                    
                    });
        
                    self.show_modal_vector_download(vector_download_options_btn, self, layer);
                  
                    self.linestring_style(linestring_options_btn, self.map, layer);
                    
                });
            }

            else if (self.is_polygon(layer)) {
                
                if (!self.is_geoman_edition_mode(layer)) {

                    self.pm_disable(layer); 

                } else {

                    self.pm_enable(layer);

                }
                
                if (layer.feature.special_tools.hasOwnProperty('bringToBack')) {
                    if (layer.feature.special_tools.bringToBack) {
                        layer.bringToBack();
                    }
                }

                if (layer.feature.special_tools.hasOwnProperty('bringToFront')) {
                    if (layer.feature.special_tools.bringToFront) {
                        layer.bringToFront();
                    }
                }

                if (self.is_clipPolygon(layer)) {

                    const image_id = layer.feature.special_tools.image_id;
                    var image_opacity = layer.feature.special_tools.imageOpacity;
                    var image_interactive = layer.feature.special_tools.imageInteractive;
                    var image_zIndex = layer.feature.special_tools.image_zIndex;
                    const stored_image_data_item = layer.feature.properties.images;

                    const point1 = layer.feature.special_tools.point1;
                    const point2 = layer.feature.special_tools.point2;
                    const point3 = layer.feature.special_tools.point3;

                    const marker1 = L.marker(point1, {draggable: true, pmIgnore: true, snapIgnore: true} );
                    const marker2 = L.marker(point2, {draggable: true, pmIgnore: true, snapIgnore: true} );
                    const marker3 = L.marker(point3, {draggable: true, pmIgnore: true, snapIgnore: true} );

                    marker1.addTo(self.map);
                    marker2.addTo(self.map);
                    marker3.addTo(self.map);
                    
                    marker1.special_tools = {};
                    marker1.special_tools.image_id = image_id;
                    marker2.special_tools = {};
                    marker2.special_tools.image_id = image_id;
                    marker3.special_tools = {};
                    marker3.special_tools.image_id = image_id;

                    let is_interactive;
                    
                    if (!image_interactive) {

                        marker1._icon.style.display = 'none';
                        marker2._icon.style.display = 'none';
                        marker3._icon.style.display = 'none';
                        marker1._shadow.style.display = 'none';
                        marker2._shadow.style.display = 'none';
                        marker3._shadow.style.display = 'none';
                        is_interactive = false;

                    } else {

                        marker1._icon.style.display = 'block';
                        marker2._icon.style.display = 'block';
                        marker3._icon.style.display = 'block';
                        marker1._shadow.style.display = 'block';
                        marker2._shadow.style.display = 'block';
                        marker3._shadow.style.display = 'block';
                        is_interactive = true;

                    }

                    const image_src = layer.feature.special_tools.clipPolygon_image;

                    const overlay = L.imageOverlay.rotated(image_src, point1, point2, point3, {
                        opacity: image_opacity,
                        interactive: true
                    });
                    
                    //199 backToFront
                    overlay.setZIndex(image_zIndex);

                    overlay.special_tools = {};
                    overlay.special_tools.image_id = image_id;

                    overlay.addTo(self.map);

                    marker1.on('drag dragend', function(){

                        overlay.reposition(this.getLatLng(), marker2.getLatLng(), marker3.getLatLng());

                        const p1 = overlay.getBounds().getSouthWest();
                        const p2 = overlay.getBounds().getNorthEast();
                        const p3 = overlay.getBounds().getNorthWest();
                        const p4 = overlay.getBounds().getSouthEast();

                        layer.setLatLngs([
                            [p1.lat, p1.lng],
                            [p3.lat, p3.lng],
                            [p2.lat, p2.lng],
                            [p4.lat, p4.lng]
                        ]);

                        layer.feature.special_tools.point1 = this.getLatLng();
                        layer.feature.special_tools.point2 = marker2.getLatLng();
                        layer.feature.special_tools.point3 = marker3.getLatLng();
                    });

                    marker2.on('drag dragend', function(){

                        overlay.reposition(marker1.getLatLng(), this.getLatLng(), marker3.getLatLng());

                        const p1 = overlay.getBounds().getSouthWest();
                        const p2 = overlay.getBounds().getNorthEast();
                        const p3 = overlay.getBounds().getNorthWest();
                        const p4 = overlay.getBounds().getSouthEast();

                        layer.setLatLngs([
                            [p1.lat, p1.lng],
                            [p3.lat, p3.lng],
                            [p2.lat, p2.lng],
                            [p4.lat, p4.lng]
                        ]);

                        layer.feature.special_tools.point1 = marker1.getLatLng();
                        layer.feature.special_tools.point2 = this.getLatLng();
                        layer.feature.special_tools.point3 = marker3.getLatLng();

                    });

                    marker3.on('drag dragend', function(){

                        overlay.reposition(marker1.getLatLng(), marker2.getLatLng(), this.getLatLng());

                        const p1 = overlay.getBounds().getSouthWest();
                        const p2 = overlay.getBounds().getNorthEast();
                        const p3 = overlay.getBounds().getNorthWest();
                        const p4 = overlay.getBounds().getSouthEast();

                        layer.setLatLngs([
                            [p1.lat, p1.lng],
                            [p3.lat, p3.lng],
                            [p2.lat, p2.lng],
                            [p4.lat, p4.lng]
                        ]);

                        layer.feature.special_tools.point1 = marker1.getLatLng();
                        layer.feature.special_tools.point2 = marker2.getLatLng();
                        layer.feature.special_tools.point3 = this.getLatLng();

                    });

                    marker1.on('dragend', function(){
                            
                        const active_layer_id = self.component_geolocation.active_layer_id;
                        self.component_geolocation.update_draw_data(active_layer_id);

                    });

                    marker2.on('dragend', function(){

                        const active_layer_id = self.component_geolocation.active_layer_id;
                        self.component_geolocation.update_draw_data(active_layer_id);

                    });

                    marker3.on('dragend', function(){
                            
                        const active_layer_id = self.component_geolocation.active_layer_id;
                        self.component_geolocation.update_draw_data(active_layer_id);

                    });

                    overlay.on('pm:remove', function(){
                        
                        marker1.removeFrom(self.map);
                        marker2.removeFrom(self.map);
                        marker3.removeFrom(self.map);
                        layer.pm.remove();
                        
                    });

                    overlay.on('click', function () {
                        
                        const image_interactive = layer.feature.special_tools.imageInteractive;
                        
                        if (!image_interactive) {
                            
                            is_interactive = false;
                            
                        } else {
                            
                            is_interactive = true;
                            
                        }
                        
                        self.special_tools_info_console.innerHTML = '';
                        
                        self.special_tools_info_console.style.display = 'none';
                        
                        window.setTimeout(function() {
                            
                            self.special_tools_info_console.style.display = 'block';
                            
                        }, 1000);
                        
                        const div_geometry_type = L.DomUtil.create('div');
                        div_geometry_type.setAttribute('class', 'special-tools-container');
                        self.special_tools_info_console.appendChild(div_geometry_type);

                        self.tool.google_translate({

                            element_html: div_geometry_type,
                            str: "Imagen", 
                            lang: self.lang

                        });
                        
                        const url_image_div = L.DomUtil.create('div');
                        url_image_div.setAttribute('class', 'special-tools-container');
                        self.special_tools_info_console.appendChild(url_image_div);

                        const url_image_link = L.DomUtil.create('a');
                        url_image_link.href = "?t=" + stored_image_data_item.section_tipo + "&section_id=" + stored_image_data_item.section_id  + "&component_tipo=" + stored_image_data_item.component_tipo;
                        url_image_link.target = '_blank';
                        url_image_div.appendChild(url_image_link);

                        self.tool.google_translate({

                            element_html: url_image_link,
                            str: "Ver imagen", 
                            lang: self.lang

                        });
                        
                        const image_edition_div = L.DomUtil.create('div');
                        image_edition_div.setAttribute('class', 'special-tools-container');
                        self.special_tools_info_console.appendChild(image_edition_div);
                        
                        const image_edition_input = L.DomUtil.create('input');
                        image_edition_input.type = 'checkbox';
                        image_edition_input.id = 'image_edition_input';
                        image_edition_input.setAttribute('image-id', image_id);
                        image_edition_input.checked = is_interactive;
                        
                        image_edition_div.appendChild(image_edition_input);
                        
                        const image_edition_span = L.DomUtil.create('span');
                        image_edition_div.appendChild(image_edition_span);
                        
                        self.tool.google_translate({

                            element_html: image_edition_span,
                            str: " Activar edición", 
                            lang: self.lang

                        });
                        
                        const image_opacity_div = L.DomUtil.create('div');
                        image_opacity_div.setAttribute('class', 'special-tools-container');
                        self.special_tools_info_console.appendChild(image_opacity_div);

                        const image_opacity_span = L.DomUtil.create('span');
                        image_opacity_div.appendChild(image_opacity_span);
                        
                        self.tool.google_translate({

                            element_html: image_opacity_span,
                            str: " Opacidad: ", 
                            lang: self.lang

                        });
                        
                        const image_opacity_input = L.DomUtil.create('input');
                        image_opacity_input.type = 'range';
                        image_opacity_input.id = 'image_opacity_input';
                        image_opacity_input.setAttribute('class', 'special-tools-input-range');
                        image_opacity_input.setAttribute('min', 0);
                        image_opacity_input.setAttribute('max', 1);
                        image_opacity_input.setAttribute('step', 0.1);
                        image_opacity_input.value = layer.feature.special_tools.imageOpacity;
                        image_opacity_input.setAttribute('image-id', image_id);
                        
                        image_opacity_div.appendChild(image_opacity_input);
                        
                        const image_zindex_div = L.DomUtil.create('div');
                        image_zindex_div.setAttribute('class', 'special-tools-container');
                        self.special_tools_info_console.appendChild(image_zindex_div);

                        const image_zindex_span = L.DomUtil.create('span');
                        image_zindex_div.appendChild(image_zindex_span);
                        image_zindex_div.innerText = 'zIndex: ';
                        
                        const image_zindex_input = L.DomUtil.create('input');
                        image_zindex_input.type = 'range';
                        image_zindex_input.id = 'image_zindex_input';
                        image_zindex_input.setAttribute('class', 'special-tools-input-range');
                        image_zindex_input.setAttribute('min', 0);
                        image_zindex_input.setAttribute('max', 1000);
                        image_zindex_input.setAttribute('step', 1);
                        image_zindex_input.value = layer.feature.special_tools.image_zIndex;
                        image_zindex_input.setAttribute('image-id', image_id);
                        
                        image_zindex_div.appendChild(image_zindex_input);
                        
                        const options_div = L.DomUtil.create('div');
                        options_div.setAttribute('class', 'special-tools-container');

                        self.special_tools_info_console.appendChild(options_div);

                        const raster_download_options_btn = L.DomUtil.create('button');
                        raster_download_options_btn.type = 'button';
                        raster_download_options_btn.setAttribute('class', 'special-tools-btn-default');
                        raster_download_options_btn.style.fontSize = '9px';
                        raster_download_options_btn.style.marginTop = '7px';

                        self.tool.google_translate({

                            element_html: raster_download_options_btn,
                            str: "Descargar Imagen", 
                            lang: self.lang

                        });
                    
                        options_div.appendChild(raster_download_options_btn);
                        
                        /****************************************************/
                        
                        self.info_console_load_properties(self, layer, this);
                        
                        /****************************************************/

                        const _image_opacity_input = self.special_tools_info_console.querySelector('#image_opacity_input');

                        _image_opacity_input.setAttribute("value", layer.feature.special_tools.imageOpacity);

                        L.DomEvent.on(_image_opacity_input, 'change input', function() {

                            overlay.setOpacity(this.value);
                            
                            layer.feature.special_tools.imageOpacity = this.value;
                            
                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);

                        });
                        
                        const _image_zindex_input = self.special_tools_info_console.querySelector('#image_zindex_input');

                        _image_zindex_input.setAttribute("value", layer.feature.special_tools.image_zIndex);
                        
                        L.DomEvent.on(_image_zindex_input, 'change input', function() {

                            overlay.setZIndex(this.value);
                            
                            layer.feature.special_tools.image_zIndex = this.value;

                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);

                        });
                        
                        const _image_edition_input = self.special_tools_info_console.querySelector('#image_edition_input');

                        L.DomEvent.on(_image_edition_input, 'click', function() {

                            if (!this.checked) {

                                layer.feature.special_tools.imageInteractive = false;

                                marker1._icon.style.display = 'none';
                                marker2._icon.style.display = 'none';
                                marker3._icon.style.display = 'none';
                                marker1._shadow.style.display = 'none';
                                marker2._shadow.style.display = 'none';
                                marker3._shadow.style.display = 'none';

                                active_layer_id = self.component_geolocation.active_layer_id;
                                self.component_geolocation.update_draw_data(active_layer_id);

                            } else {

                                layer.feature.special_tools.imageInteractive = true;

                                marker1._icon.style.display = 'block';
                                marker2._icon.style.display = 'block';
                                marker3._icon.style.display = 'block';
                                marker1._shadow.style.display = 'block';
                                marker2._shadow.style.display = 'block';
                                marker3._shadow.style.display = 'block';

                                const active_layer_id = self.component_geolocation.active_layer_id;
                                self.component_geolocation.update_draw_data(active_layer_id);

                            }

                        });

                        self.show_modal_raster_download(raster_download_options_btn, self, layer, overlay, marker1, marker2, marker3);

                    });

                } 
                
                else {
                    
                    var default_color;

                    if (layer.feature.special_tools.hasOwnProperty('obj_stroke_color')) {

                        layer.setStyle({color: layer.feature.special_tools.obj_stroke_color});
                        layer.setStyle({fillColor: layer.feature.special_tools.obj_stroke_color});
                    
                    } else if (layer.feature.properties.hasOwnProperty('color')) {
                        
                        default_color = layer.feature.properties.color;
                        layer.setStyle({color: default_color});
                        layer.setStyle({fillColor: default_color});
                        
                    } else {

                        default_color = '#3388ff';
                        layer.setStyle({color: default_color});
                        layer.setStyle({fillColor: default_color});

                    }

                    if (layer.feature.special_tools.hasOwnProperty('obj_stroke_width')) {

                        layer.setStyle({weight: layer.feature.special_tools.obj_stroke_width});

                    }

                    if (layer.feature.special_tools.hasOwnProperty('obj_stroke_opacity')) {

                        layer.setStyle({opacity: layer.feature.special_tools.obj_stroke_opacity});

                    }

                    if (layer.feature.special_tools.hasOwnProperty('obj_stroke_dasharray')) {

                        layer.setStyle({
                            
                            dashArray: layer.feature.special_tools.obj_stroke_dasharray,
                            dashOffset: 0
                        
                        });

                    }

                    if (layer.feature.special_tools.hasOwnProperty('obj_fill_opacity')) {

                        layer.setStyle({fillOpacity: layer.feature.special_tools.obj_fill_opacity});

                    }

                    layer.on('click pm:edit', function() {

                        self.special_tools_info_console.innerHTML = '';
                        
                        self.special_tools_info_console.style.display = 'none';
                        
                        window.setTimeout(function() {
                            
                            self.special_tools_info_console.style.display = 'block';
                            
                        }, 1000);

                        const geometry_type = this.feature.geometry.type;

                        const div_geometry_type = L.DomUtil.create('div');
                        div_geometry_type.innerText = geometry_type;
                        div_geometry_type.setAttribute('class', 'special-tools-container');
                        self.special_tools_info_console.appendChild(div_geometry_type);

                            
                        if (!self.is_geoman_edition_mode(this)) {

                            self.pm_disable(this);

                        } else {

                            self.pm_enable(this);

                        }
                        
                        let checked_bringtoback = false;
                        let checked_bringtofront = false;

                        if (layer.feature.special_tools.hasOwnProperty('bringToBack')) {
                            if (layer.feature.special_tools.bringToBack) {
                                layer.bringToBack();
                                checked_bringtoback = true;
                                checked_bringtofront = false;
                            }
                        }

                        if (layer.feature.special_tools.hasOwnProperty('bringToFront')) {
                            if (layer.feature.special_tools.bringToFront) {
                                layer.bringToFront();
                                checked_bringtoback = false;
                                checked_bringtofront = true;
                            }
                        }

                        if (self.is_oneXone(this)) {
                            
                            const onexone_div = L.DomUtil.create('div');
                            onexone_div.setAttribute('class', 'special-tools-container');
                            self.special_tools_info_console.appendChild(onexone_div);
                            
                            self.tool.google_translate({

                                element_html: onexone_div,
                                str: "Área: 1 m²", 
                                lang: self.lang

                            });
                            
                        } else {
                            
                            const area_div = L.DomUtil.create('div');
                            area_div.setAttribute('class', 'special-tools-container');

                            const area_meters = turf.area(this.toGeoJSON());
                            const area = self.get_area_square_meters(area_meters);
                            self.special_tools_info_console.appendChild(area_div);
                            
                            self.tool.google_translate({

                                element_html: area_div,
                                str: "Área: " + area, 
                                lang: self.lang

                            });
                            
                        }

                        const tools_id = self.get_tools_id_by_layer(this);
                        
                        let checked_centroid = false;
                        
                        if (self.has_centroid(this)) {

                            checked_centroid = true;

                        }
                        
                        let incertidumbre = '';
                        let checked_incertidumbre = false;
                        
                        if (self.is_incertidumbre(this) && self.on_incertidumbre(this)) {
                            
                            area = turf.area(this.toGeoJSON());
                            incertidumbre = self.get_incertidumbre(area);
                            checked_incertidumbre = true;   

                        }
                        
                        let checked_geoman = false;
                        
                        if (self.is_geoman_edition_mode(this)) {

                            checked_geoman = true;

                        }
                        
                        if (!self.is_oneXone(this)) { 
                            
                            const centroide_div = L.DomUtil.create('div');
                            centroide_div.setAttribute('class', 'special-tools-container');

                            self.special_tools_info_console.appendChild(centroide_div);

                            const centroide_input = L.DomUtil.create('input');
                            centroide_input.type = 'checkbox';
                            centroide_input.id = 'centroide_input';
                            centroide_input.setAttribute('tools-id', tools_id);
                            centroide_input.checked = checked_centroid;
                            centroide_input.id = 'centroide_input';

                            centroide_div.appendChild(centroide_input);

                            const centroide_span = L.DomUtil.create('span');

                            centroide_div.appendChild(centroide_span);

                            self.tool.google_translate({

                                element_html: centroide_span,
                                str: " Centroide", 
                                lang: self.lang

                            });
                            
                            const incertidumbre_div = L.DomUtil.create('div');
                            incertidumbre_div.setAttribute('class', 'special-tools-container');

                            self.special_tools_info_console.appendChild(incertidumbre_div);

                            const incertidumbre_input = L.DomUtil.create('input');
                            incertidumbre_input.type = 'checkbox';
                            incertidumbre_input.id = 'incertidumbre_input';
                            incertidumbre_input.setAttribute('tools-id', tools_id);
                            incertidumbre_input.checked = checked_incertidumbre;

                            incertidumbre_div.appendChild(incertidumbre_input);

                            const incertidumbre_span = L.DomUtil.create('span');

                            incertidumbre_div.appendChild(incertidumbre_span);

                            self.tool.google_translate({

                                element_html: incertidumbre_span,
                                str: " Incertidumbre", 
                                lang: self.lang

                            });
                            
                            const incertidumbre_color = L.DomUtil.create('div');
                            incertidumbre_color.id = 'incertidumbre_color';
                            incertidumbre_color.style.color = 'yellow';
                            incertidumbre_color.setAttribute('class', 'special-tools-container');
                            incertidumbre_color.innerText = incertidumbre;
                            
                            incertidumbre_div.appendChild(incertidumbre_color);

                            const geoman_edition_div = L.DomUtil.create('div');
                            geoman_edition_div.setAttribute('class', 'special-tools-container');

                            self.special_tools_info_console.appendChild(geoman_edition_div);

                            const geoman_edition_input = L.DomUtil.create('input');
                            geoman_edition_input.type = 'checkbox';
                            geoman_edition_input.id = 'geoman_edition_input';
                            geoman_edition_input.setAttribute('tools-id', tools_id);
                            geoman_edition_input.checked = checked_geoman;

                            geoman_edition_div.appendChild(geoman_edition_input);

                            const geoman_edition_span = L.DomUtil.create('span');

                            geoman_edition_div.appendChild(geoman_edition_span);

                            self.tool.google_translate({

                                element_html: geoman_edition_span,
                                str: "  Edición Geoman activa", 
                                lang: self.lang

                            });
                            
                        } 

                        const hierarchy_div = L.DomUtil.create('div');
                        hierarchy_div.setAttribute('class', 'special-tools-container');
                        self.special_tools_info_console.appendChild(hierarchy_div);

                        self.tool.google_translate({

                            element_html: hierarchy_div,
                            str: "Jerarquía del objeto: ", 
                            lang: self.lang

                        });

                        const bringtofront_div = L.DomUtil.create('div');
                        bringtofront_div.setAttribute('class', 'special-tools-container');
                        self.special_tools_info_console.appendChild(bringtofront_div);

                        const bringtofront_input = L.DomUtil.create('input');
                        bringtofront_input.type = 'checkbox';
                        bringtofront_input.id = 'bringtofront_input';
                        bringtofront_input.setAttribute('tools-id', tools_id);
                        bringtofront_input.checked = checked_bringtofront;

                        bringtofront_div.appendChild(bringtofront_input);

                        const bringtofront_span = L.DomUtil.create('span');

                        bringtofront_div.appendChild(bringtofront_span);

                        self.tool.google_translate({

                            element_html: bringtofront_span,
                            str: " Delante", 
                            lang: self.lang

                        });

                        const bringtoback_div = L.DomUtil.create('div');
                        bringtoback_div.setAttribute('class', 'special-tools-container');
                        self.special_tools_info_console.appendChild(bringtoback_div);

                        const bringtoback_input = L.DomUtil.create('input');
                        bringtoback_input.type = 'checkbox';
                        bringtoback_input.id = 'bringtoback_input';
                        bringtoback_input.setAttribute('tools-id', tools_id);
                        bringtoback_input.checked = checked_bringtoback;

                        bringtoback_div.appendChild(bringtoback_input);

                        const bringtoback_span = L.DomUtil.create('span');

                        bringtoback_div.appendChild(bringtoback_span);

                        self.tool.google_translate({

                            element_html: bringtoback_span,
                            str: " Detrás", 
                            lang: self.lang

                        });

                        const options_div = L.DomUtil.create('div');
                        options_div.setAttribute('class', 'special-tools-container');

                        self.special_tools_info_console.appendChild(options_div);

                        const polygon_options_btn = L.DomUtil.create('button');
                        polygon_options_btn.type = 'button';
                        polygon_options_btn.setAttribute('class', 'special-tools-btn-default');
                        polygon_options_btn.style.fontSize = '9px';

                        self.tool.google_translate({

                            element_html: polygon_options_btn,
                            str: "Editar estilos", 
                            lang: self.lang

                        });

                        options_div.appendChild(polygon_options_btn);

                        const vector_download_options_btn = L.DomUtil.create('button');
                        vector_download_options_btn.type = 'button';
                        vector_download_options_btn.setAttribute('class', 'special-tools-btn-default');
                        vector_download_options_btn.style.fontSize = '9px';

                        self.tool.google_translate({

                            element_html: vector_download_options_btn,
                            str: "Descargar Vectorial", 
                            lang: self.lang

                        });

                        options_div.appendChild(vector_download_options_btn);

                        /******************************************************/
                        
                        self.info_console_load_properties(self, this);
                        
                        /******************************************************/

                        const _this = this;
                        
                        if (!self.is_oneXone(this)) {
                            
                            const _centroide_input = self.special_tools_info_console.querySelector('#centroide_input');
                            
                            L.DomEvent.on(_centroide_input, "click", function(){

                                if (this.checked) {

                                    const polygon = turf.polygon(_this.feature.geometry.coordinates);

                                    //Centro de la masa
                                    let centroid_latlng = turf.centerOfMass(polygon);

                                    const coordinates = {'lng': centroid_latlng.geometry.coordinates[1], 'lat': centroid_latlng.geometry.coordinates[0]};

                                    if (!self.point_in_polygon(coordinates, _this)) {
                                        
                                        //Centro de la masa para polígonos donde su centro queda fuera de la misma
                                        centroid_latlng = turf.pointOnFeature(polygon);
                                        
                                    }

                                    const marker = L.marker([centroid_latlng.geometry.coordinates[1], centroid_latlng.geometry.coordinates[0]]);
                                    
                                    marker.feature = marker.toGeoJSON();
                                    marker.feature.special_tools = {};
                                    marker.feature.special_tools.is_centroid = true;

                                    const new_tools_id = self.make_id(20);

                                    marker.feature.special_tools.tools_id = new_tools_id;

                                    _this.feature.special_tools.has_centroid = true;
                                    _this.feature.special_tools.centroid_tools_id = new_tools_id;
                                        
                                    self.map.fire('pm:create', {layer: marker});
                                    
                                    self.modal_message(self, "Centroide creado con éxito", self.lang);

                                } else {

                                    if (self.has_centroid(_this)) {

                                        const centroid_tools_id = _this.feature.special_tools.centroid_tools_id;

                                        const centroid = self.get_layer_by_tools_id(self.map, centroid_tools_id);

                                        _this.feature.special_tools.has_centroid = false;
                                        _this.feature.special_tools.centroid_tools_id = null;

                                        centroid.pm.remove();
                                        
                                        self.modal_message(self, "Centroide eliminado con éxito", self.lang);
                                        
                                    }
                                }

                            });
                            
                            const _incertidumbre_input = self.special_tools_info_console.querySelector('#incertidumbre_input');
                            const _incertidumbre_color = self.special_tools_info_console.querySelector('#incertidumbre_color');

                            L.DomEvent.on(_incertidumbre_input, "click", function(){

                                if (this.checked) {

                                    _this.feature.special_tools.is_incertidumbre = true;
                                    _this.feature.special_tools.on_incertidumbre = true;

                                    const area = turf.area(_this.toGeoJSON());

                                    const incertidumbre = self.get_incertidumbre(area);

                                    _incertidumbre_color.innerHTML = incertidumbre;

                                } else {

                                    _this.feature.special_tools.is_incertidumbre = false;
                                    _this.feature.special_tools.on_incertidumbre = false;
                                    
                                    _incertidumbre_color.innerHTML = '';

                                }
                                
                                    
                                const active_layer_id = self.component_geolocation.active_layer_id;
                                self.component_geolocation.update_draw_data(active_layer_id);

                            });

                            const _geoman_edition_input = self.special_tools_info_console.querySelector('#geoman_edition_input');

                            L.DomEvent.on(_geoman_edition_input, "click", function(){

                                if (this.checked) {
                                    
                                    self.pm_enable(_this);

                                    _this.feature.special_tools.geoman_edition = true;


                                } else {
                                    
                                    self.pm_disable(_this);

                                    _this.feature.special_tools.geoman_edition = false;
                                
                                }
                                
                                const active_layer_id = self.component_geolocation.active_layer_id;
                                self.component_geolocation.update_draw_data(active_layer_id);
                                
                            });
  
                        }

                        const _bringtoback_input = self.special_tools_info_console.querySelector('#bringtoback_input');

                        L.DomEvent.on(_bringtoback_input, "click", function(){

                            if (this.checked) {

                                _this.feature.special_tools.bringToBack = true;
                                _this.feature.special_tools.bringToFront = false;
                                bringtofront_input.checked = false;
                                
                                _this.bringToBack();

                            } else {
                                
                                _this.feature.special_tools.bringToBack = false;
                                _this.bringToFront();
                                
                            }

                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                            
                        });
                        
                        const _bringtofront_input = self.special_tools_info_console.querySelector('#bringtofront_input');

                        L.DomEvent.on(_bringtofront_input, "click", function(){

                            if (this.checked) {

                                _this.feature.special_tools.bringToFront = true;
                                _this.feature.special_tools.bringToBack = false;
                                bringtoback_input.checked = false;
                                _this.bringToFront();

                            } else {
                                
                                _this.feature.special_tools.bringToFront = false;
                                _this.bringToBack();
                                
                            }

                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                        
                        });
                        
                        self.show_modal_vector_download(vector_download_options_btn, self, layer);
            
                        self.polygon_circle_style(polygon_options_btn, self.map, layer);
                        
                    });

                }
            }
        }
    },
    
    get_incertidumbre: function(area) {
        
        return (1 / area).toFixed(20) + ' m²';
        
    },
    
    is_special_tools: function(layer) {
        
        if (layer.hasOwnProperty('feature')) {
            
            if (layer.feature.hasOwnProperty('special_tools')) {
                
                return true;  
                
            }
        }
        
        return false;
    },
     
    is_oneXone: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('special_tools')) {
                if (layer.feature.special_tools.hasOwnProperty('is_oneXone')) {
                    if (layer.feature.special_tools.is_oneXone) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    
    is_catastro: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('special_tools')) {
                if (layer.feature.special_tools.hasOwnProperty('is_catastro')) {
                    if (layer.feature.special_tools.is_catastro) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    
    is_UA: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('special_tools')) {
                if (layer.feature.special_tools.hasOwnProperty('is_UA')) {
                    if (layer.feature.special_tools.is_UA) {
                        return true;
                    }
                }            
            }
        }
        return false;
    },
  
    is_clipPolygon: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('special_tools')) {
                if (layer.feature.special_tools.hasOwnProperty('is_clipPolygon')) {
                    if (layer.feature.special_tools.is_clipPolygon) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    
    is_point: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('geometry')) {
                if (layer.feature.geometry.hasOwnProperty('type')) {
                    if (layer.feature.geometry.type === 'Point') {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    
    is_linestring: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('geometry')) {
                if (layer.feature.geometry.hasOwnProperty('type')) {
                    if (layer.feature.geometry.type === 'LineString') {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    
    is_polygon: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('geometry')) {
                if (layer.feature.geometry.hasOwnProperty('type')) {
                    if (layer.feature.geometry.type === 'Polygon') {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    is_circle: function(layer) {
        if (layer.hasOwnProperty('pm')) {
            if (layer.hasOwnProperty('_radius')) {
                    return true;
            }
        }
        return false;
    },
      
    get_layer_by_tools_id: function(map, tools_id) {
        self = this;
        let _layer = null;
        map.eachLayer(function(layer) {
            if (!(layer instanceof L.TileLayer)) {
                const _tools_id = self.get_tools_id_by_layer(layer);
                if (_tools_id === tools_id) {
                    _layer = layer;
                } 
            }
        });
        return _layer;
    },

    get_tools_id_by_layer: function(layer) {
        self = this;
        if (self.is_special_tools(layer)) {
            return layer.feature.special_tools.tools_id;
        }
        return null;
    },
    
    has_centroid: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('special_tools')) {
                if (layer.feature.special_tools.hasOwnProperty('has_centroid')) {
                    if (layer.feature.special_tools.has_centroid) {
                        return true;
                    }
                }
            }
        }  else {
            return false;
        }
        
    },
    
    is_centroid: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('special_tools')) {
                if (layer.feature.special_tools.hasOwnProperty('is_centroid')) {
                    if (layer.feature.special_tools.is_centroid) {
                        return true;
                    }
                }
                
            }
        } else {
            return false;
        }
        
    },
    
    is_multi: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('special_tools')) {
                if (layer.feature.special_tools.hasOwnProperty('multi_id')) {
                    return true;
                }
            }
        } else {
            return false;
        }
    },
    
    get_multi_id: function(layer) {
        return layer.feature.special_tools.multi_id;
    },
    
    remove_by_multi_id: function(map, multi_id) {
        
        self = this;
        
        map.eachLayer(function(layer) {
            
            if (self.is_multi(layer)) {
                
                if (self.get_multi_id(layer) === multi_id) {
                    
                    layer.pm.remove();
                }
            }
            
        });
    },
    
    is_incertidumbre: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('special_tools')) {
                if (layer.feature.special_tools.hasOwnProperty('is_incertidumbre')) {
                    if (layer.feature.special_tools.is_incertidumbre) {
                        return true;
                    }
                }               
            }
        } else {
            return false;
        }
        
    },
    
    on_incertidumbre: function(layer) {
        if (layer.hasOwnProperty('feature')) {
            if (layer.feature.hasOwnProperty('special_tools')) {
                if (layer.feature.special_tools.hasOwnProperty('on_incertidumbre')) {
                    if (layer.feature.special_tools.on_incertidumbre) {
                        return true;
                    }
                } 
            }
        } else {
            return false;
        }
        
    },
    
    get_area_square_meters: function(area_meters) {
            if (area_meters < 10000) {
                area = area_meters.toFixed(2) + ' m²';
            } else if (area_meters >= 10000) {
                area = turf.round(turf.convertArea(area_meters, 'meters', 'kilometers'), 2) + ' km²';
            }
            return area;
    },
    
    make_id: function(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    },
    
    geoman_edition_mode: function(map) {
        if (
            !map.pm.globalEditModeEnabled()
            && !map.pm.globalDrawModeEnabled()
            && !map.pm.globalDragModeEnabled()
            && !map.pm.globalRemovalModeEnabled()
            && !map.pm.globalCutModeEnabled()
            && !map.pm.globalRotateModeEnabled()
        ) {
            return false;
        }
        return true;
    },

    is_geoman_edition_mode: function(layer) {
        
        self = this;
        
        if (self.is_special_tools(layer)) {
            
            if (layer.feature.special_tools.hasOwnProperty('geoman_edition')) {
                
                return layer.feature.special_tools.geoman_edition;
                
            } 
            
        }
        
        return false;
        
    },
    
    pm_enable: function(layer) {
        
        layer.pm.enable({

            allowSelfIntersection: true,
            allowEditing: true,
            draggable: true,
            snappable: true

        });  
        
    },
    
    pm_disable: function(layer) {
        
        layer.pm.enable({

            allowSelfIntersection: false,
            allowEditing: false,
            draggable: false,
            snappable: false

        });  
        
    },
    
    point_in_polygon: function(coordinate, layer) {
        
        let point = turf.point(
            [coordinate.lng, coordinate.lat]
         );

        return turf.booleanPointInPolygon(point, layer.toGeoJSON().geometry);
        
    },
    
    is_url: function(string) {
        
      try { return Boolean(new URL(string)); }
      
      catch(e){ return false; }
      
    },
    
    only_one_control_active: function(elements, element_except) {
        
        for (let index in elements) {
            
            if (elements[index] !== element_except) {
                if (L.DomUtil.hasClass(elements[index], 'special-tools-enable')) {
                    elements[index].click();
                }
            }
        }
        
    },
    
    show_modal_vector_download: function(btn_show_modal_vector_download, self, layer) {
        
        L.DomEvent.on(btn_show_modal_vector_download, 'click', function(e) {

            self.map.fire('modal', {

                template: ['<div class="modal-header"></div>',
                  '<hr>',
                  '<div class="modal-body"></div>'
                ].join(''),

                width: 'auto',

                onShow: function(evt) {

                    const modal = evt.modal;

                    const modal_content = modal._container.querySelector('.modal-content');
                    
                    modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    modal_content.style.marginTop = '80px';
                    
                    const modal_header = modal._container.querySelector('.modal-header');
                    
                    const modal_title = L.DomUtil.create('div');
                    modal_title.setAttribute('class', 'special-tools-h1');
                    
                    modal_header.appendChild(modal_title);
                 
                    self.tool.google_translate({

                        element_html: modal_title,
                        str: "Descargar objeto vectorial", 
                        lang: self.lang

                    });
                    
                    const modal_body = modal._container.querySelector('.modal-body');

                    /*********************************************************/
                    
                    const vector_download_export_div = L.DomUtil.create('div');
                    vector_download_export_div.setAttribute('class', 'special-tools-container special-tools-div-33');
                    
                    modal_body.appendChild(vector_download_export_div);

                    /*********************************************************/

                    const vector_download_export_span = L.DomUtil.create('span');
                    
                    self.tool.google_translate({

                        element_html: vector_download_export_span,
                        str: "Exportar como: ", 
                        lang: self.lang

                    });
                    
                    vector_download_export_div.appendChild(vector_download_export_span);
                    
                    /**********************************************************/
                    
                    const vector_export = L.DomUtil.create('select');
                    vector_export.id = 'vector_export';
                    vector_export.setAttribute('class', 'special-tools-select');
                    
                    vector_download_export_div.appendChild(vector_export);
                            
                    /**********************************************************/
                    
                    const option_geojson = L.DomUtil.create('option');
                    option_geojson.value = 'geojson';
                    option_geojson.innerText = 'GeoJSON';
                    
                    vector_export.appendChild(option_geojson);
                    
                    /**********************************************************/
                    
                    const option_shp = L.DomUtil.create('option');
                    option_shp.value = 'shp';
                    option_shp.innerText = 'ESRI Shapefile';
                    
                    vector_export.appendChild(option_shp);
                    
                    /**********************************************************/
                    
                    const option_kml = L.DomUtil.create('option');
                    option_kml.value = 'kml';
                    option_kml.innerText = 'KML';
                    
                    vector_export.appendChild(option_kml);
                    
                    /**********************************************************/
                    
                    const vector_name_div = L.DomUtil.create('div');
                    vector_name_div.setAttribute('class', 'special-tools-container special-tools-div-66');
                    modal_body.appendChild(vector_name_div);
                    
                    /**********************************************************/
                    
                    const vector_name_span = L.DomUtil.create('span');
                    
                    self.tool.google_translate({

                        element_html: vector_name_span,
                        str: "Nombre: ", 
                        lang: self.lang

                    });
                    
                    vector_name_div.appendChild(vector_name_span);
                    
                    /**********************************************************/
                    
                    const vector_name = L.DomUtil.create('input');
                    vector_name.type = 'text';
                    vector_name.id = 'vector_name';
                    vector_name.setAttribute('class', 'special-tools-input-150');
                    
                    self.tool.google_translate({

                        element_html: vector_name,
                        str: "archivo", 
                        lang: self.lang,
                        attribute: 'value'

                    });
                    
                    vector_name_div.appendChild(vector_name);
                    
                    /**********************************************************/
                    
                    const vector_export_button = L.DomUtil.create('button');
                    vector_export_button.id = 'vector_export_button';
                    vector_export_button.type = 'button';
                    vector_export_button.setAttribute('class', 'special-tools-btn-success');
                    vector_export_button.style.position = 'relative';
                    vector_export_button.style.top = '4px';
                    
                    self.tool.google_translate({

                        element_html: vector_export_button,
                        str: "Descargar archivo", 
                        lang: self.lang,
                        attribute: 'title'

                    });
                    
                    vector_name_div.appendChild(vector_export_button);
                    
                    /**********************************************************/
                    
                    const vector_export_button_img = L.DomUtil.create('img');
                    vector_export_button_img.src = self.tool.controls_url() + '/img/direct-download.png';
                    
                    vector_export_button.appendChild(vector_export_button_img);
                    
                    /**********************************************************/
                    
                    const clear_div = L.DomUtil.create('div');
                    clear_div.style.clear = 'left';
                    
                    modal_body.appendChild(clear_div);
                    
                    /**********************************************************/

                    L.DomEvent.on(vector_export_button, 'click', function(event) {

                        var geojson;
                        
                        if (vector_name.value === '') {
                            
                            self.modal_message(self, "Por favor, indique el nombre del archivo", self.lang);

                            return;
                            
                        }
                        
                        self.modal_message(self, "Descargando ...", self.lang, 20000);

                        const vector_type = vector_export.options[vector_export.selectedIndex].value;

                        if (!layer.feature.special_tools.hasOwnProperty('multi_id')) {

                            geojson = layer.feature;

                        } else if (layer.feature.special_tools.hasOwnProperty('multi_id') && layer.feature.geometry.type === 'Point') {

                            geojson = layer.feature;

                        } else if (layer.feature.special_tools.hasOwnProperty('multi_id') && layer.feature.geometry.type !== 'Point') {

                            let coordinates = new Array();

                            self.map.eachLayer(function(_layer){

                                if (self.is_special_tools(_layer)) {

                                    if (_layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (_layer.feature.special_tools.multi_id === layer.feature.special_tools.multi_id) {

                                            if (layer.feature.geometry.type === 'Polygon' || layer.feature.geometry.type === 'LineString') {

                                                coordinates.push(_layer.getLatLngs());

                                            }

                                        }

                                    }

                                }

                                if (layer.feature.geometry.type === 'Polygon') {

                                    const multipolygon = L.polygon(coordinates);
                                    geojson = multipolygon.toGeoJSON();

                                } else if (layer.feature.geometry.type === 'LineString') {

                                    const multipolyline = L.polyline(coordinates);
                                    geojson = multipolyline.toGeoJSON();

                                }

                                geojson.properties = layer.feature.properties;
                                geojson.special_tools = layer.feature.special_tools;

                            });
                        }

                        const crs = {"type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" }};

                        geojson.crs = crs;
                            
                        let options = {};

                        options.vector_type = vector_type;

                        options.vector_name = self.simple_sanitize_string(vector_name.value);

                        options.content = JSON.stringify(geojson);
                            
                        let promise = self.tool.vector_download(options);

                        promise.then(function(data){

                            if (data.success) {

                                window.open(data.zip, '_blank');
                                
                                self.set_info_console(self, layer);
                                
                                self.modal_message(self, "Archivo descargado correctamente", self.lang);

                            } else {

                                self.map.fireEvent('pm:create');
                                
                                self.set_info_console(self, layer);
                                
                                self.modal_message(self, data.msg, self.lang);
                                
                            }

                        });
                        
                        L.DomEvent.preventDefault(event);

                    });
                
                }
            
            });
            
            L.DomEvent.preventDefault(e);

        });
    },
    
    show_modal_raster_download: function(btn_show_modal_raster_download, self, layer, overlay, marker1, marker2, marker3) {
        
        L.DomEvent.on(btn_show_modal_raster_download, 'click', function() {

            self.map.fire('modal', {
                
                template: ['<div class="modal-header"></div>',
                  '<hr>',
                  '<div class="modal-body"></div>'
                ].join(''),

                width: 'auto',
                
                onShow: function(evt) {
                    
                    const modal = evt.modal;

                    const modal_content = modal._container.querySelector('.modal-content');
                    
                    modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    modal_content.style.marginTop = '80px';
                    
                    const modal_header = modal._container.querySelector('.modal-header');
                    
                    const modal_title = L.DomUtil.create('div');
                    modal_title.setAttribute('class', 'special-tools-h1');
                    
                    modal_header.appendChild(modal_title);
                 
                    self.tool.google_translate({

                        element_html: modal_title,
                        str: "Descargar imagen", 
                        lang: self.lang

                    });
                    
                    const modal_body = modal._container.querySelector('.modal-body');
                    
                    /**********************************************************/
                    
                    const raster_export_div = L.DomUtil.create('div');
                    raster_export_div.setAttribute('class', 'special-tools-container special-tools-div-33');
                    modal_body.appendChild(raster_export_div);
                    
                    /**********************************************************/
                    
                    const raster_export_span = L.DomUtil.create('span');
                    
                    self.tool.google_translate({

                        element_html: raster_export_span,
                        str: "Exportar como: ", 
                        lang: self.lang

                    });
                    
                    raster_export_div.appendChild(raster_export_span);
                    
                    /**********************************************************/
                    
                    const raster_export = L.DomUtil.create('select');
                    raster_export.id = 'raster_export';
                    raster_export.setAttribute('class', 'special-tools-select');
                    raster_export_div.appendChild(raster_export);
                    
                    /**********************************************************/
                    
                    const option_geotiff = L.DomUtil.create('option');
                    option_geotiff.value = 'geotiff';
                    option_geotiff.innerText = 'Raster GeoTiff';
                    
                    raster_export.appendChild(option_geotiff);
                    
                    /**********************************************************/
                    
                    const option_png = L.DomUtil.create('option');
                    option_png.value = 'png';
                    option_png.innerText = 'png';
                    
                    raster_export.appendChild(option_png);
                    
                    /**********************************************************/
                    
                    const option_jpg = L.DomUtil.create('option');
                    option_jpg.value = 'jpg';
                    option_jpg.innerText = 'jpg';
                    
                    raster_export.appendChild(option_jpg);
                    
                    /**********************************************************/
                    
                    const option_gif = L.DomUtil.create('option');
                    option_gif.value = 'gif';
                    option_gif.innerText = 'gif';
                    
                    raster_export.appendChild(option_gif);
                    
                    /**********************************************************/
                    
                    const option_webp = L.DomUtil.create('option');
                    option_webp.value = 'webp';
                    option_webp.innerText = 'webp';
                    
                    raster_export.appendChild(option_webp);
                    
                    /**********************************************************/
                    
                    const raster_export_name_div = L.DomUtil.create('div');
                    raster_export_name_div.setAttribute('class', 'special-tools-container special-tools-div-66');
                    modal_body.appendChild(raster_export_name_div);
                    
                    /**********************************************************/
                    
                    const raster_export_name_span = L.DomUtil.create('span');
                    
                    self.tool.google_translate({

                        element_html: raster_export_name_span,
                        str: "Nombre: ", 
                        lang: self.lang

                    });
                    
                    raster_export_name_div.appendChild(raster_export_name_span);
                    
                    /**********************************************************/
                    
                    const raster_name = L.DomUtil.create('input');
                    raster_name.type = 'text';
                    raster_name.id = 'raster_name';
                    raster_name.setAttribute('class', 'special-tools-input-150');

                    self.tool.google_translate({

                        element_html: raster_name,
                        str: "imagen", 
                        lang: self.lang,
                        attribute: 'value'

                    });
                    
                    raster_export_name_div.appendChild(raster_name);
                    
                    /**********************************************************/

                    const raster_export_button = L.DomUtil.create('button');
                    raster_export_button.id = 'raster_export_button';
                    raster_export_button.setAttribute('class', 'special-tools-btn-success');
                    raster_export_button.style.position = 'relative';
                    raster_export_button.style.top = '4px';
                    
                    self.tool.google_translate({

                        element_html: raster_export_button,
                        str: "Descargar imagen", 
                        lang: self.lang,
                        attribute: 'title'

                    });
                    
                    raster_export_name_div.appendChild(raster_export_button);
                    
                    /**********************************************************/
                    
                    const raster_export_button_img = L.DomUtil.create('img');
                    raster_export_button_img.src = self.tool.controls_url() + '/img/direct-download.png';
                    
                    raster_export_button.appendChild(raster_export_button_img);
                    
                    /**********************************************************/
                    
                    const clear_div = L.DomUtil.create('div');
                    clear_div.style.clear = 'left';
                    
                    modal_body.appendChild(clear_div);
                    
                    /**********************************************************/
                    
                    L.DomEvent.on(raster_export_button, 'click', function() {

                        if (raster_name.value === '') {
                            
                            self.modal_message(self, "Por favor, indique el nombre del archivo", self.lang);
                            
                            return;
                        }

                        self.modal_message(self, "Descargando ...", self.lang, 20000);

                        const image_type = raster_export.options[raster_export.selectedIndex].value;

                        if (image_type === 'geotiff') {
                            
                            const volatil_image = document.createElement('img');
                            volatil_image.src = overlay._rawImage.src;
                            volatil_image.setAttribute('style', overlay._rawImage.getAttribute('style'));

                            const current_width = overlay._rawImage.getBoundingClientRect().width;
                            const current_height = overlay._rawImage.getBoundingClientRect().height;
                            const current_quality = current_width * current_height;
                            const quality_image_full_hd = 1920 * 1080;
                            var scale = 1;
                            const max_scale = 100;

                            for (let sca = 1; sca < max_scale; sca++) {
                                
                                if (((current_width * sca) * (current_height * sca)) >= quality_image_full_hd) {
                                    
                                    scale = sca;
                                    
                                    break;
                                    
                                }
                                
                            }

                            volatil_image.style.width = overlay._rawImage.getBoundingClientRect().width*scale + 'px';
                            volatil_image.style.height = overlay._rawImage.getBoundingClientRect().height*scale + 'px';

                            volatil_image.width = overlay._rawImage.getBoundingClientRect().width*scale;
                            volatil_image.height = overlay._rawImage.getBoundingClientRect().height*scale;

                            const canvas = L.DomUtil.create('canvas');
                            const ctx = canvas.getContext("2d");
                            ctx.globalAlpha = layer.feature.special_tools.imageOpacity;

                            var transform = volatil_image.style.transform;
                            transform = transform.replace('matrix(', '');
                            transform = transform.replace(')');
                            transform = transform.split(", ");


                            const trans_a = parseFloat(transform[0]);
                            const trans_b = parseFloat(transform[1]);
                            const trans_c = parseFloat(transform[2]);
                            const trans_d = parseFloat(transform[3]);
                            const trans_e = parseFloat(transform[4]);
                            const trans_f = parseFloat(transform[5]);

                            canvas.width = volatil_image.width;
                            canvas.height = volatil_image.height;

                            ctx.setTransform(trans_a*scale, trans_b*scale, trans_c*scale, trans_d*scale, trans_e*scale, trans_f*scale);

                            ctx.drawImage(volatil_image, 0, 0);

                            const dataURL = canvas.toDataURL();

                            var overlay_bounds_str = overlay.getBounds().getNorthWest().lng;
                            overlay_bounds_str = overlay_bounds_str + ' ' + overlay.getBounds().getNorthWest().lat;
                            overlay_bounds_str = overlay_bounds_str + ' ' + overlay.getBounds().getSouthEast().lng;
                            overlay_bounds_str = overlay_bounds_str + ' ' + overlay.getBounds().getSouthEast().lat;

                            let options = {};

                            options.bounds = overlay_bounds_str;

                            options.url = dataURL;

                            options.raster_name = self.simple_sanitize_string(raster_name.value);

                            let promise = self.tool.geotiff_download(options);
                                    
                            promise.then(function(data){

                                if (data.success) {

                                    window.open(data.zip, '_blank');

                                    self.modal_message(self, "Imagen descargada correctamente", self.lang);

                                } else {

                                    self.modal_message(self, data.msg, self.lang);

                                }

                            });

                        } else {

                            const volatil_image = document.createElement('img');
                            volatil_image.src = overlay._rawImage.src;
                            volatil_image.setAttribute('style', overlay._rawImage.getAttribute('style'));

                            const current_width = overlay._rawImage.getBoundingClientRect().width;
                            const current_height = overlay._rawImage.getBoundingClientRect().height;
                            const current_quality = current_width * current_height;
                            const quality_image_full_hd = 1920 * 1080;
                            var scale = 1;
                            const max_scale = 100;

                            for (let sca = 1; sca < max_scale; sca++) {
                                
                                if (((current_width * sca) * (current_height * sca)) >= quality_image_full_hd) {
                                    
                                    scale = sca;
                                    
                                    break;
                                    
                                }
                                
                            }

                            volatil_image.style.width = overlay._rawImage.getBoundingClientRect().width*scale + 'px';
                            volatil_image.style.height = overlay._rawImage.getBoundingClientRect().height*scale + 'px';

                            volatil_image.width = overlay._rawImage.getBoundingClientRect().width*scale;
                            volatil_image.height = overlay._rawImage.getBoundingClientRect().height*scale;

                            //Imagen canvas para exportar a geotiff
                            const canvas = L.DomUtil.create('canvas');
                            const ctx = canvas.getContext("2d");
                            ctx.globalAlpha = layer.feature.special_tools.imageOpacity;

                            var transform = volatil_image.style.transform;
                            transform = transform.replace('matrix(', '');
                            transform = transform.replace(')');
                            transform = transform.split(", ");

                            const trans_a = parseFloat(transform[0]);
                            const trans_b = parseFloat(transform[1]);
                            const trans_c = parseFloat(transform[2]);
                            const trans_d = parseFloat(transform[3]);
                            const trans_e = parseFloat(transform[4]);
                            const trans_f = parseFloat(transform[5]);

                            canvas.width = volatil_image.width;
                            canvas.height = volatil_image.height;

                            ctx.setTransform(trans_a*scale, trans_b*scale, trans_c*scale, trans_d*scale, trans_e*scale, trans_f*scale);

                            ctx.drawImage(volatil_image, 0, 0);

                            const dataURL = canvas.toDataURL();

                            let options = {};

                            options.image_src = dataURL;

                            options.image_type = image_type;

                            options.raster_name = self.simple_sanitize_string(raster_name.value);

                            let promise = self.tool.image_download(options);

                            promise.then(function(data) {

                                if (data.success) {

                                    window.open(data.zip, '_blank');

                                    self.modal_message(self, "Imagen descargada correctamente", self.lang);

                                } else {

                                    self.modal_message(self, data.msg, self.lang);
                                
                                }

                            });

                        }

                    });
                    
                }
                
            });
        
        });
        
    },
    
    marker_style: function(btn_marker_style, map, layer) {
        
        L.DomEvent.on(btn_marker_style, 'click', function(){
            
            var color;

            if (!layer.feature.special_tools.hasOwnProperty('marker_color')) {

                if (layer.feature.properties.hasOwnProperty('color')) {
                    
                    color = layer.feature.properties.color;
                    
                } else {
                    
                    color = '#3d5880';
                    
                }
            
            } else {
                
                color = layer.feature.special_tools.marker_color;
                
            }
            
            map.fire('modal', {

                template: ['<div class="modal-header"></div>',
                  '<hr>',
                  '<div class="modal-body"></div>'
                ].join(''),

                width: 'auto',
                
                onShow: function(evt){
                    
                    const modal = evt.modal;
                    
                    const modal_content = modal._container.querySelector('.modal-content');
                    
                    modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    modal_content.style.marginTop = '80px';
                    
                    const modal_header = modal._container.querySelector('.modal-header');
                    
                    const modal_title = L.DomUtil.create('div');
                    modal_title.setAttribute('class', 'special-tools-h1');
                    
                    modal_header.appendChild(modal_title);
                 
                    self.tool.google_translate({

                        element_html: modal_title,
                        str: "Editar estilos", 
                        lang: self.lang

                    });
                    
                    const modal_body = modal._container.querySelector('.modal-body');
                    
                    /**********************************************************/
                    
                    const marker_div = L.DomUtil.create('div');
                    marker_div.setAttribute('class', 'special-tools-container');
                    modal_body.appendChild(marker_div);
                    
                    /**********************************************************/
                    
                    const marker_color_div = L.DomUtil.create('div');
                    marker_color_div.setAttribute('class', 'special-tools-container special-tools-div-33');
                    marker_div.appendChild(marker_color_div);

                    /**********************************************************/

                    const marker_color = L.DomUtil.create('div');
                    marker_color.id = 'marker_color';
                    marker_color.style.width = '36px';
                    marker_color.style.height = '36px';
                    marker_color.style.borderRadius = '50%';
                    marker_color.style.backgroundColor = color;
                    marker_color.setAttribute('iro-visible', false);
                    
                    marker_color_div.appendChild(marker_color);
                    
                    /**********************************************************/
                    
                    const marker_color_input = L.DomUtil.create('input');
                    marker_color_input.id = 'marker_color_input';
                    marker_color_input.setAttribute('class', 'special-tools-input-100');
                    marker_color_input.setAttribute('placeholder', '#000000');
                    marker_color_input.style.marginTop = '7px';
                    
                    marker_color_div.appendChild(marker_color_input);
                    
                    /**********************************************************/
                    
                    const marker_color_btn = L.DomUtil.create('button');
                    marker_color_btn.type = 'button';
                    marker_color_btn.id = 'marker_color_btn';
                    marker_color_btn.setAttribute('class', 'special-tools-btn-success');
                    marker_color_btn.style.position = 'relative';
                    marker_color_btn.style.top = '4px';
                    
                    marker_color_div.appendChild(marker_color_btn);
                    
                    /**********************************************************/
                    
                    const marker_color_btn_img = L.DomUtil.create('img');
                    marker_color_btn_img.src = self.tool.controls_url() + '/img/check-mark.png';
                    
                    marker_color_btn.appendChild(marker_color_btn_img);
                    
                    /**********************************************************/
                    
                    const marker_iro_container = L.DomUtil.create('div');
                    marker_iro_container.id = 'marker_iro_container';
                    marker_iro_container.setAttribute('class', 'special-tools-container special-tools-div-33');
                    marker_div.appendChild(marker_iro_container);
                    
                    
                    const iro_marker_color = new iro.ColorPicker('#marker_iro_container', {
                        
                        width: 140,
                        color: color,
                        display: 'none'
                        
                    });

                    /**********************************************************/
                    
                    const readonly_color_div = L.DomUtil.create('div');
                    readonly_color_div.setAttribute('class', 'special-tools-container special-tools-div-33');
                    marker_div.appendChild(readonly_color_div);
                    
                    /**********************************************************/
                    
                    const readonly_color_span = L.DomUtil.create('span');
                    
                    self.tool.google_translate({

                        element_html: readonly_color_span,
                        str: "Copiar: ", 
                        lang: self.lang

                    });
                    
                    readonly_color_div.appendChild(readonly_color_span);
                    
                    /**********************************************************/
                    
                    const readonly_color = L.DomUtil.create('input');
                    readonly_color.type = 'text';
                    readonly_color.id = 'readonly_color';
                    readonly_color.readonly = true;
                    readonly_color.value = color;
                    readonly_color.setAttribute('class', 'special-tools-input-100');
                    
                    readonly_color_div.appendChild(readonly_color);
                    
                    /**********************************************************/
                    
                    const marker_preview = L.DomUtil.create('img');
                    marker_preview.id = 'marker_preview';
                    marker_preview.src = self.tool.controls_url() + '/img/pin.svg';
                    marker_preview.style.width = '36px';
                    marker_preview.style.height = '36px';
                    
                    readonly_color_div.appendChild(marker_preview);
                    
                    /**********************************************************/
                    
                    const clear_div = L.DomUtil.create('div');
                    clear_div.style.clear = 'left';
                    modal_body.appendChild(clear_div);
                    
                    /**********************************************************/
                    
                    if (layer.feature.special_tools.hasOwnProperty('marker_filter')) {
                        
                        marker_preview.style.filter = layer.feature.special_tools.marker_filter;
                        
                    } else {
                        
                        const default_color = '#3d5880';

                        const _compute = compute(default_color);
                        
                        marker_preview.style.filter = _compute.result.filterRaw;

                        
                    }
                    
                    iro_marker_color.on('color:change', function(color) {
                        
                        if (validateColor(color.hexString)) {

                            const _compute = compute(color.hexString);

                            layer._icon.style.filter = _compute.result.filterRaw;
                            
                            layer.feature.special_tools.marker_filter = _compute.result.filterRaw;
                            layer.feature.special_tools.marker_color = color.hexString;
                            
                            readonly_color.value = color.hexString;
                            
                            marker_color.style.backgroundColor = color.hexString;
                            
                            marker_preview.style.filter = _compute.result.filterRaw;
 
                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                            
                        }
                      
                    });
                    
                    
                    L.DomEvent.on(marker_color, 'click', function() {

                        const iro_visible = this.getAttribute('iro-visible');
                        
                        if (iro_visible === 'false') {
                            
                            iro_marker_color.base.style.display = 'block';
                            this.setAttribute('iro-visible', true);
                            
                        } else {
                            
                            iro_marker_color.base.style.display = 'none';
                            this.setAttribute('iro-visible', false);
                            
                        }
                        
                    });
                    
                    L.DomEvent.on(marker_color_btn, 'click', function() {
                        
                        const color = marker_color_input.value;
                        
                        if (validateColor(color)) {
                            
                            iro_marker_color.color.hexString = color;
                            
                            marker_color.style.backgroundColor = color;
                            
                            readonly_color.value = color;

                            const _compute = compute(color);

                            layer._icon.style.filter = _compute.result.filterRaw;
                            layer.feature.special_tools.marker_filter = _compute.result.filterRaw;
                            layer.feature.special_tools.marker_color = color;

                            marker_preview.style.filter = _compute.result.filterRaw;
 
                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                            
                        } else {
                            
                            self.modal_message(self, "Por favor, introduzca un número hexadecimal correcto, por ejemplo: #ffffff", self.lang);
                            
                        }
                        
                    });

                    
                }
                
            });
            
        });
        
    },
    
    linestring_style: function(btn_linestring_style, map, layer) {
        
        L.DomEvent.on(btn_linestring_style, 'click', function(){
            
            var _stroke_color;
            var _stroke_width;
            var _stroke_opacity;
            var _stroke_dasharray;
            
            if (!layer.feature.special_tools.hasOwnProperty('obj_stroke_color')) {
                
                if (layer.feature.properties.hasOwnProperty('color')) {
                    
                    _stroke_color = layer.feature.properties.color.substr(0, 7);
                    
                } else {
                    
                    _stroke_color = '#3388ff';
                    
                }
            
            } else {
                
                _stroke_color = layer.feature.special_tools.obj_stroke_color;
                
            }
            
            if (!layer.feature.special_tools.hasOwnProperty('obj_stroke_width')) {
                
                _stroke_width = 3;
                
            } else {
                
                _stroke_width = layer.feature.special_tools.obj_stroke_width;
                
            }
            
            if (!layer.feature.special_tools.hasOwnProperty('obj_stroke_opacity')) {
                
            _stroke_opacity = 1;
            
            } else {
                
                _stroke_opacity = layer.feature.special_tools.obj_stroke_opacity;
                
            }
            
            if (!layer.feature.special_tools.hasOwnProperty('obj_stroke_dasharray')) {
                
            _stroke_dasharray = 0;
            
            } else {
                
                _stroke_dasharray = layer.feature.special_tools.obj_stroke_dasharray;
                
            }

            map.fire('modal', {

                template: ['<div class="modal-header"></div>',
                  '<hr>',
                  '<div class="modal-body"></div>'
                ].join(''),

                width: 'auto',
                
                onShow: function(evt){
                    
                    const modal = evt.modal;
                    
                    const modal_content = modal._container.querySelector('.modal-content');
                    
                    modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    modal_content.style.marginTop = '80px';
                    
                    const modal_header = modal._container.querySelector('.modal-header');
                    
                    const modal_title = L.DomUtil.create('div');
                    modal_title.setAttribute('class', 'special-tools-h1');
                    
                    modal_header.appendChild(modal_title);
                 
                    self.tool.google_translate({

                        element_html: modal_title,
                        str: "Editar estilos", 
                        lang: self.lang

                    });
                    
                    const modal_body = modal._container.querySelector('.modal-body');
                    
                    /**********************************************************/
                    
                    const linestring_div = L.DomUtil.create('div');
                    linestring_div.setAttribute('class', 'special-tools-container');
                    modal_body.appendChild(linestring_div);
                    
                    /**********************************************************/
                    
                    const linestring_stroke_color_div = L.DomUtil.create('div');
                    linestring_stroke_color_div.setAttribute('class', 'special-tools-container special-tools-div-33');
                    linestring_div.appendChild(linestring_stroke_color_div);

                    /**********************************************************/
                    
                    const linestring_stroke_color = L.DomUtil.create('div');
                    linestring_stroke_color.id = 'linestring_stroke_color';
                    linestring_stroke_color.style.width = '36px';
                    linestring_stroke_color.style.height = '36px';
                    linestring_stroke_color.style.borderRadius = '50%';
                    linestring_stroke_color.style.backgroundColor = _stroke_color;
                    linestring_stroke_color.setAttribute('iro-visible', false);
                    
                    linestring_stroke_color_div.appendChild(linestring_stroke_color);
                    
                    /**********************************************************/
                    
                    const linestring_stroke_color_input = L.DomUtil.create('input');
                    linestring_stroke_color_input.id = 'linestring_stroke_color_input';
                    linestring_stroke_color_input.setAttribute('class', 'special-tools-input-100');
                    linestring_stroke_color_input.setAttribute('placeholder', '#000000');
                    linestring_stroke_color_input.style.marginTop = '7px';
                    
                    linestring_stroke_color_div.appendChild(linestring_stroke_color_input);
                    
                    /**********************************************************/
                    
                    const linestring_stroke_color_btn = L.DomUtil.create('button');
                    linestring_stroke_color_btn.type = 'button';
                    linestring_stroke_color_btn.id = 'linestring_stroke_color_btn';
                    linestring_stroke_color_btn.setAttribute('class', 'special-tools-btn-success');
                    linestring_stroke_color_btn.style.position = 'relative';
                    linestring_stroke_color_btn.style.top = '4px';
                    
                    linestring_stroke_color_div.appendChild(linestring_stroke_color_btn);
                    
                    /**********************************************************/
                    
                    const linestring_stroke_color_btn_img = L.DomUtil.create('img');
                    linestring_stroke_color_btn_img.src = self.tool.controls_url() + '/img/check-mark.png';
                    
                    linestring_stroke_color_btn.appendChild(linestring_stroke_color_btn_img);
                    
                    /**********************************************************/
                    
                    const linestring_iro_container = L.DomUtil.create('div');
                    linestring_iro_container.id = 'linestring_iro_container';
                    linestring_iro_container.setAttribute('class', 'special-tools-container special-tools-div-33');
                    linestring_div.appendChild(linestring_iro_container);
                    
                    
                    const iro_linestring_color = new iro.ColorPicker('#linestring_iro_container', {
                        
                        width: 140,
                        color: _stroke_color,
                        display: 'none'
                        
                    });

                    /**********************************************************/
                    
                    const readonly_stroke_color_div = L.DomUtil.create('div');
                    readonly_stroke_color_div.setAttribute('class', 'special-tools-container special-tools-div-33');
                    linestring_div.appendChild(readonly_stroke_color_div);
                    
                    /**********************************************************/
                    
                    const readonly_stroke_span = L.DomUtil.create('span');
                    
                    self.tool.google_translate({

                        element_html: readonly_stroke_span,
                        str: "Copiar: ", 
                        lang: self.lang

                    });
                    
                    readonly_stroke_color_div.appendChild(readonly_stroke_span);
                    
                    /**********************************************************/
                    
                    const readonly_stroke_color = L.DomUtil.create('input');
                    readonly_stroke_color.type = 'text';
                    readonly_stroke_color.id = 'readonly_stroke_color';
                    readonly_stroke_color.readonly = true;
                    readonly_stroke_color.value = _stroke_color;
                    readonly_stroke_color.setAttribute('class', 'special-tools-input-100');
                    
                    readonly_stroke_color_div.appendChild(readonly_stroke_color);
                    
                    /**********************************************************/
                    
                    const clear_div = L.DomUtil.create('div');
                    clear_div.style.clear = 'left';
                    modal_body.appendChild(clear_div);
                    
                    /**********************************************************/
                    
                    const stroke_width_div = L.DomUtil.create('div');
                    stroke_width_div.setAttribute('class', 'special-tools-container');
                    modal_body.appendChild(stroke_width_div);
                    
                    /**********************************************************/
                    
                    const stroke_width_span = L.DomUtil.create('span');
                    
                    self.tool.google_translate({

                        element_html: stroke_width_span,
                        str: 'Ancho del borde: ', 
                        lang: self.lang

                    });
                    
                    stroke_width_div.appendChild(stroke_width_span);
                    
                    /**********************************************************/
                    
                    const stroke_width = L.DomUtil.create('input');
                    stroke_width.type = 'range';
                    stroke_width.id = 'stroke_width';
                    stroke_width.setAttribute('min', 1);
                    stroke_width.setAttribute('max', 100);
                    stroke_width.setAttribute('step', 1);
                    stroke_width.setAttribute('class', 'special-tools-input-range');
                    stroke_width.value = _stroke_width;

                    stroke_width_div.appendChild(stroke_width);
                    
                    /**********************************************************/
                    
                    const stroke_opacity_div = L.DomUtil.create('div');
                    stroke_opacity_div.setAttribute('class', 'special-tools-container');
                    modal_body.appendChild(stroke_opacity_div);
                    
                    /**********************************************************/
                    
                    const stroke_opacity_span = L.DomUtil.create('span');
                    
                    self.tool.google_translate({

                        element_html: stroke_opacity_span,
                        str: 'Opacidad: ', 
                        lang: self.lang

                    });
                    
                    stroke_opacity_div.appendChild(stroke_opacity_span);
                    
                    /**********************************************************/
                    
                    const stroke_opacity = L.DomUtil.create('input');
                    stroke_opacity.type = 'range';
                    stroke_opacity.id = 'stroke_opacity';
                    stroke_opacity.setAttribute('min', 0);
                    stroke_opacity.setAttribute('max', 1);
                    stroke_opacity.setAttribute('step', 0.1);
                    stroke_opacity.setAttribute('class', 'special-tools-input-range');
                    stroke_opacity.value = _stroke_opacity;

                    stroke_opacity_div.appendChild(stroke_opacity);
                    
                    /**********************************************************/
                    
                    const stroke_dasharray_div = L.DomUtil.create('div');
                    stroke_dasharray_div.setAttribute('class', 'special-tools-container');
                    modal_body.appendChild(stroke_dasharray_div);
                    
                    /**********************************************************/
                    
                    const stroke_dasharray_span = L.DomUtil.create('span');
                    
                    self.tool.google_translate({

                        element_html: stroke_dasharray_span,
                        str: 'Borde discontinuo: ', 
                        lang: self.lang

                    });
                    
                    stroke_dasharray_div.appendChild(stroke_dasharray_span);
                    
                    /**********************************************************/
                    
                    const stroke_dasharray = L.DomUtil.create('input');
                    stroke_dasharray.type = 'range';
                    stroke_dasharray.id = 'stroke_dasharray';
                    stroke_dasharray.setAttribute('min', 0);
                    stroke_dasharray.setAttribute('max', 100);
                    stroke_dasharray.setAttribute('step', 2);
                    stroke_dasharray.setAttribute('class', 'special-tools-input-range');
                    stroke_dasharray.value = _stroke_dasharray;

                    stroke_dasharray_div.appendChild(stroke_dasharray);
                    
                    /**********************************************************/
                    
                    const linestring_preview_div = L.DomUtil.create('div');
                    linestring_preview_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(linestring_preview_div);
                    
                    /**********************************************************/
                    
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('viewBox', '0 0 300 100');
                    linestring_preview_div.appendChild(svg);
                    
                    /**********************************************************/
                    
                    const linestring_preview = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    linestring_preview.id = 'linestring_preview';
                    linestring_preview.setAttribute('stroke-linecap', 'round');
                    linestring_preview.setAttribute('stroke-linejoin', 'round');
                    linestring_preview.setAttribute('fill', 'none');
                    linestring_preview.setAttribute('d', 'M 75 50 l 150 0');
                    linestring_preview.setAttribute('stroke', _stroke_color);
                    linestring_preview.setAttribute('stroke-width', _stroke_width);
                    linestring_preview.setAttribute('stroke-opacity', _stroke_opacity);
                    linestring_preview.setAttribute('stroke-dasharray', _stroke_dasharray);
                    linestring_preview.setAttribute('stroke-dashoffset', 0);

                    svg.appendChild(linestring_preview);

                    var default_stroke_color;
                    var default_stroke_width;
                    var default_stroke_opacity;
                    
                    if (layer.feature.special_tools.hasOwnProperty('obj_stroke_color')) {
                        
                        linestring_preview.setAttribute('stroke', layer.feature.special_tools.obj_stroke_color);
                        
                    } else {
                        
                        if (layer.feature.properties.hasOwnProperty('color')) {

                            default_stroke_color = layer.feature.properties.color.substr(0, 7);


                        } else {

                            default_stroke_color = '#3388ff';

                        }

                        linestring_preview.setAttribute('stroke', default_stroke_color);

                        
                    }
                    
                    if (layer.feature.special_tools.hasOwnProperty('obj_stroke_width')) {
                        
                        linestring_preview.setAttribute('stroke-width', layer.feature.special_tools.obj_stroke_width);
                        
                    } else {
                        
                        default_stroke_width = 3;

                        linestring_preview.setAttribute('stroke-width', default_stroke_width);

                        
                    }
                    
                    if (layer.feature.special_tools.hasOwnProperty('obj_stroke_opacity')) {
                        
                        linestring_preview.setAttribute('stroke-opacity', layer.feature.special_tools.obj_stroke_opacity);
                        
                    } else {
                        
                        default_stroke_opacity = 1;

                        linestring_preview.setAttribute('stroke-opacity', default_stroke_opacity);

                        
                    }

                    iro_linestring_color.on('color:change', function(color) {

                        if (validateColor(color.hexString)) {
                            
                           if (layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                const multi_id = layer.feature.special_tools.multi_id;

                                self.map.eachLayer(function(_layer_){
                                    
                                    if (!_layer_.hasOwnProperty('feature')) return;

                                    if (_layer_.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (multi_id === _layer_.feature.special_tools.multi_id && !_layer_.hasOwnProperty('_icon')) {

                                            _layer_.feature.special_tools.obj_stroke_color = color.hexString;
                            
                                            _layer_.setStyle({color: color.hexString});
                                            
                                        }

                                    }

                                });

                            } else {

                                layer.feature.special_tools.obj_stroke_color = color.hexString;
                            
                                layer.setStyle({color: color.hexString});
                            
                            }
                            
                            linestring_preview.setAttribute('stroke', color.hexString);
                            
                            readonly_stroke_color.value = color.hexString;
                            
                            linestring_stroke_color.style.backgroundColor = color.hexString;
                            
                            layer.feature.properties.color = color.hexString;

                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                            
                        }

                    });
                    
                    L.DomEvent.on(linestring_stroke_color, 'click', function() {
                        
                        const iro_visible = this.getAttribute('iro-visible');
                        
                        if (iro_visible === 'false') {
                            
                            iro_linestring_color.base.style.display = 'block';
                            this.setAttribute('iro-visible', true);
                            
                        } else {
                            
                            iro_linestring_color.base.style.display = 'none';
                            this.setAttribute('iro-visible', false);
                            
                        }
                        
                    });
                    
                    L.DomEvent.on(linestring_stroke_color_btn, 'click', function() {
                        
                        const color = linestring_stroke_color_input.value;
                        
                        if (validateColor(color)) {
                            
                           if (layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                const multi_id = layer.feature.special_tools.multi_id;

                                self.map.eachLayer(function(_layer_){
                                    
                                    if (!_layer_.hasOwnProperty('feature')) return;

                                    if (_layer_.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (multi_id === _layer_.feature.special_tools.multi_id && !_layer_.hasOwnProperty('_icon')) {

                                            _layer_.feature.special_tools.obj_stroke_color = color;
                            
                                            _layer_.setStyle({color: color});
                                            
                                        }

                                    }

                                });

                            } else {

                                layer.feature.special_tools.obj_stroke_color = color;
                            
                                layer.setStyle({color: color});
                            
                            }
                            
                            linestring_preview.setAttribute('stroke', color);
                            
                            iro_linestring_color.color.hexString = color;
                            
                            linestring_stroke_color.style.backgroundColor = color;
                            
                            readonly_stroke_color.value = color;
 
                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                            
                        } else {
                            
                            self.modal_message(self, "Por favor, introduzca un número hexadecimal correcto, por ejemplo: #ffffff", self.lang);
                            
                        }
                        
                    });
                    
                    L.DomEvent.on(stroke_width, 'change input', function(){
                        
                        if (this.value >= 1 && this.value <= 100) {
                            
                           if (layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                const multi_id = layer.feature.special_tools.multi_id;

                                const _this = this;

                                self.map.eachLayer(function(_layer_){
                                    
                                    if (!_layer_.hasOwnProperty('feature')) return;

                                    if (_layer_.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (multi_id === _layer_.feature.special_tools.multi_id && !_layer_.hasOwnProperty('_icon')) {

                                            _layer_.feature.special_tools.obj_stroke_width = _this.value;

                                            _layer_.setStyle({weight: _this.value});
                                            
                                        }

                                    }

                                });

                            } else {

                                layer.feature.special_tools.obj_stroke_width = this.value;
                            
                                layer.setStyle({weight: this.value});
                            
                            }
                            
                            linestring_preview.setAttribute('stroke-width', this.value);
                                
                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                            
                        }
                        
                    });
                    
                    L.DomEvent.on(stroke_opacity, 'change input', function(){
                        
                        if (this.value >= 0 && this.value <= 1) {
                            
                           if (layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                const multi_id = layer.feature.special_tools.multi_id;

                                const _this = this;

                                self.map.eachLayer(function(_layer_){
                                    
                                    if (!_layer_.hasOwnProperty('feature')) return;

                                    if (_layer_.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (multi_id === _layer_.feature.special_tools.multi_id && !_layer_.hasOwnProperty('_icon')) {

                                            _layer_.feature.special_tools.obj_stroke_opacity = _this.value;
                                            _layer_.setStyle({opacity: _this.value});
                                            
                                        }

                                    }

                                });

                            } else {

                                layer.feature.special_tools.obj_stroke_opacity = this.value;
                                layer.setStyle({opacity: this.value});
                            
                            }
                            
                            linestring_preview.setAttribute('stroke-opacity', this.value);

                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                            
                        }
                        
                    });
                    
                    L.DomEvent.on(stroke_dasharray, 'change input', function(){
                        
                        if (this.value >= 0 && this.value <= 100) {

                           if (layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                const multi_id = layer.feature.special_tools.multi_id;

                                const _this = this;

                                self.map.eachLayer(function(_layer_){
                                    
                                    if (!_layer_.hasOwnProperty('feature')) return;

                                    if (_layer_.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (multi_id === _layer_.feature.special_tools.multi_id && !_layer_.hasOwnProperty('_icon')) {

                                            _layer_.feature.special_tools.obj_stroke_dasharray = _this.value;

                                            _layer_.setStyle({
                                                dashArray: _this.value,
                                                dashOffset: 0
                                            });
                                            
                                        }

                                    }

                                });

                            } else {

                                layer.feature.special_tools.obj_stroke_dasharray = this.value;

                                layer.setStyle({
                                    dashArray: this.value,
                                    dashOffset: 0
                                });
                            
                            }
                            
                            linestring_preview.setAttribute('stroke-dasharray', this.value);
                            linestring_preview.setAttribute('stroke-dashoffset', 0);
                                
                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);

                        }
                        
                    });
                    
                }
                
            });
            
        });
        
    },
    
    polygon_circle_style: function(btn_obj_style, map, layer) {
        
        var _stroke_color;
        var _stroke_width;
        var _stroke_opacity;
        var _stroke_dasharray;
        var _fill_opacity;
        
        L.DomEvent.on(btn_obj_style, 'click', function(){
            
            if (!layer.feature.special_tools.hasOwnProperty('obj_stroke_color')) {
                
                if (layer.feature.properties.hasOwnProperty('color')) {
                    
                    _stroke_color = layer.feature.properties.color.substr(0, 7);


                } else {
                    
                    _stroke_color = '#3388ff';
                    
                }
                
            
            } else {
                
                _stroke_color = layer.feature.special_tools.obj_stroke_color;
                
            }
            
            if (!layer.feature.special_tools.hasOwnProperty('obj_stroke_width')) {
                
                _stroke_width = 3;
                
            } else {
                
                _stroke_width = layer.feature.special_tools.obj_stroke_width;
                
            }
            
            if (!layer.feature.special_tools.hasOwnProperty('obj_stroke_opacity')) {
                
            _stroke_opacity = 1;
            
            } else {
                
                _stroke_opacity = layer.feature.special_tools.obj_stroke_opacity;
                
            }
            
            if (!layer.feature.special_tools.hasOwnProperty('obj_stroke_dasharray')) {
                
            _stroke_dasharray = 0;
            
            } else {
                
                _stroke_dasharray = layer.feature.special_tools.obj_stroke_dasharray;
                
            }

            if (!layer.feature.special_tools.hasOwnProperty('obj_fill_opacity')) {
                
            _fill_opacity = 0.2;
            
            } else {
                
                _fill_opacity = layer.feature.special_tools.obj_fill_opacity;
                
            }

            map.fire('modal', {

                template: ['<div class="modal-header"></div>',
                  '<hr>',
                  '<div class="modal-body"></div>'
                ].join(''),

                width: 'auto',
                
                onShow: function(evt){
                    
                    const modal = evt.modal;
                    
                    const modal_content = modal._container.querySelector('.modal-content');
                    
                    modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    modal_content.style.marginTop = '80px';
                    
                    const modal_header = modal._container.querySelector('.modal-header');
                    
                    const modal_title = L.DomUtil.create('div');
                    modal_title.setAttribute('class', 'special-tools-h1');
                    
                    modal_header.appendChild(modal_title);
                 
                    self.tool.google_translate({

                        element_html: modal_title,
                        str: "Editar estilos", 
                        lang: self.lang

                    });
                    
                    const modal_body = modal._container.querySelector('.modal-body');

                    /**********************************************************/

                    const object_div = L.DomUtil.create('div');
                    object_div.setAttribute('class', 'special-tools-container');
                    modal_body.appendChild(object_div);
                    
                    /**********************************************************/
                    
                    const object_stroke_color_div = L.DomUtil.create('div');
                    object_stroke_color_div.setAttribute('class', 'special-tools-container special-tools-div-33');
                    object_div.appendChild(object_stroke_color_div);

                    /**********************************************************/
                    
                    const object_stroke_color = L.DomUtil.create('div');
                    object_stroke_color.id = 'object_stroke_color';
                    object_stroke_color.style.width = '36px';
                    object_stroke_color.style.height = '36px';
                    object_stroke_color.style.borderRadius = '50%';
                    object_stroke_color.style.backgroundColor = _stroke_color;
                    object_stroke_color.setAttribute('iro-visible', false);
                    
                    object_stroke_color_div.appendChild(object_stroke_color);
                    
                    /**********************************************************/
                    
                    const object_stroke_color_input = L.DomUtil.create('input');
                    object_stroke_color_input.id = 'object_stroke_color_input';
                    object_stroke_color_input.setAttribute('class', 'special-tools-input-100');
                    object_stroke_color_input.setAttribute('placeholder', '#000000');
                    object_stroke_color_input.style.marginTop = '7px';
                    
                    object_stroke_color_div.appendChild(object_stroke_color_input);
                    
                    /**********************************************************/
                    
                    const object_stroke_color_btn = L.DomUtil.create('button');
                    object_stroke_color_btn.type = 'button';
                    object_stroke_color_btn.id = 'object_stroke_color_btn';
                    object_stroke_color_btn.setAttribute('class', 'special-tools-btn-success');
                    object_stroke_color_btn.style.position = 'relative';
                    object_stroke_color_btn.style.top = '4px';
                    
                    object_stroke_color_div.appendChild(object_stroke_color_btn);
                    
                    /**********************************************************/
                    
                    const object_stroke_color_btn_img = L.DomUtil.create('img');
                    object_stroke_color_btn_img.src = self.tool.controls_url() + '/img/check-mark.png';
                    
                    object_stroke_color_btn.appendChild(object_stroke_color_btn_img);
                    
                    /**********************************************************/
                    
                    const object_iro_container = L.DomUtil.create('div');
                    object_iro_container.id = 'object_iro_container';
                    object_iro_container.setAttribute('class', 'special-tools-container special-tools-div-33');
                    object_div.appendChild(object_iro_container);
                    
                    
                    const iro_object_color = new iro.ColorPicker('#object_iro_container', {
                        
                        width: 140,
                        color: _stroke_color,
                        display: 'none'
                        
                    });

                    /**********************************************************/
                    
                    const readonly_stroke_color_div = L.DomUtil.create('div');
                    readonly_stroke_color_div.setAttribute('class', 'special-tools-container special-tools-div-33');
                    object_div.appendChild(readonly_stroke_color_div);
                    
                    /**********************************************************/
                    
                    const readonly_stroke_span = L.DomUtil.create('span');
                    
                    self.tool.google_translate({

                        element_html: readonly_stroke_span,
                        str: "Copiar: ", 
                        lang: self.lang

                    });
                    
                    readonly_stroke_color_div.appendChild(readonly_stroke_span);
                    
                    /**********************************************************/
                    
                    const readonly_stroke_color = L.DomUtil.create('input');
                    readonly_stroke_color.type = 'text';
                    readonly_stroke_color.id = 'readonly_stroke_color';
                    readonly_stroke_color.readonly = true;
                    readonly_stroke_color.value = _stroke_color;
                    readonly_stroke_color.setAttribute('class', 'special-tools-input-100');
                    
                    readonly_stroke_color_div.appendChild(readonly_stroke_color);
                    
                    /**********************************************************/
                    
                    const clear_div = L.DomUtil.create('div');
                    clear_div.style.clear = 'left';
                    modal_body.appendChild(clear_div);
                    
                    /**********************************************************/

                    const special_tools_container_2 = L.DomUtil.create('div');
                    special_tools_container_2.setAttribute('class', 'special-tools-container');
                    special_tools_container_2.setAttribute('id', 'special_tools_container_2');

                    modal_body.appendChild(special_tools_container_2);

                    /********************************************************/

                    const special_tools_span_2 = L.DomUtil.create('span');
                    special_tools_span_2.setAttribute('id', 'special_tools_span_2');

                    self.tool.google_translate({
                        
                        element_html: special_tools_span_2,
                        str: 'Ancho del borde: ',
                        lang: self.lang
                    
                    });

                    special_tools_container_2.appendChild(special_tools_span_2);

                    /********************************************************/

                    const stroke_width = L.DomUtil.create('input');
                    stroke_width.setAttribute('type', 'range');
                    stroke_width.setAttribute('id', 'stroke_width');
                    stroke_width.setAttribute('class', 'special-tools-input-range');
                    stroke_width.setAttribute('min', '1');
                    stroke_width.setAttribute('max', '100');
                    stroke_width.setAttribute('step', '1');
                    stroke_width.setAttribute('value', _stroke_width);

                    special_tools_container_2.appendChild(stroke_width);

                    /********************************************************/

                    const special_tools_container_3 = L.DomUtil.create('div');
                    special_tools_container_3.setAttribute('class', 'special-tools-container');
                    special_tools_container_3.setAttribute('id', 'special_tools_container_3');

                    modal_body.appendChild(special_tools_container_3);

                    /********************************************************/

                    const special_tools_span_3 = L.DomUtil.create('span');
                    special_tools_span_3.setAttribute('id', 'special_tools_span_3');

                    self.tool.google_translate({
                        
                        element_html: special_tools_span_3,
                        str: 'Opacidad del borde: ',
                        lang: self.lang
                    
                    });

                    special_tools_container_3.appendChild(special_tools_span_3);

                    /********************************************************/

                    const stroke_opacity = L.DomUtil.create('input');
                    stroke_opacity.setAttribute('type', 'range');
                    stroke_opacity.setAttribute('id', 'stroke_opacity');
                    stroke_opacity.setAttribute('class', 'special-tools-input-range');
                    stroke_opacity.setAttribute('min', '0');
                    stroke_opacity.setAttribute('max', '1');
                    stroke_opacity.setAttribute('step', '0.1');
                    stroke_opacity.setAttribute('value', _stroke_opacity);

                    special_tools_container_3.appendChild(stroke_opacity);

                    /********************************************************/

                    const special_tools_container_4 = L.DomUtil.create('div');
                    special_tools_container_4.setAttribute('class', 'special-tools-container');
                    special_tools_container_4.setAttribute('id', 'special_tools_container_4');

                    modal_body.appendChild(special_tools_container_4);

                    /********************************************************/

                    const special_tools_span_4 = L.DomUtil.create('span');
                    special_tools_span_4.setAttribute('id', 'special_tools_span_4');

                    self.tool.google_translate({
                        
                        element_html: special_tools_span_4,
                        str: 'Borde discontinuo: ',
                        lang: self.lang
                    
                    });

                    special_tools_container_4.appendChild(special_tools_span_4);

                    /********************************************************/

                    const stroke_dasharray = L.DomUtil.create('input');
                    stroke_dasharray.setAttribute('type', 'range');
                    stroke_dasharray.setAttribute('id', 'stroke_dasharray');
                    stroke_dasharray.setAttribute('class', 'special-tools-input-range');
                    stroke_dasharray.setAttribute('min', '0');
                    stroke_dasharray.setAttribute('max', '100');
                    stroke_dasharray.setAttribute('step', '2');
                    stroke_dasharray.setAttribute('value', _stroke_dasharray);

                    special_tools_container_4.appendChild(stroke_dasharray);

                    /********************************************************/

                    const special_tools_container_5 = L.DomUtil.create('div');
                    special_tools_container_5.setAttribute('class', 'special-tools-container');
                    special_tools_container_5.setAttribute('id', 'special_tools_container_5');

                    modal_body.appendChild(special_tools_container_5);

                    /********************************************************/

                    const special_tools_span_5 = L.DomUtil.create('span');
                    special_tools_span_5.setAttribute('id', 'special_tools_span_5');

                    self.tool.google_translate({
                        
                        element_html: special_tools_span_5,
                        str: 'Opacidad de relleno: ',
                        lang: self.lang
                    
                    });

                    special_tools_container_5.appendChild(special_tools_span_5);

                    /********************************************************/

                    const fill_opacity = L.DomUtil.create('input');
                    fill_opacity.setAttribute('type', 'range');
                    fill_opacity.setAttribute('id', 'fill_opacity');
                    fill_opacity.setAttribute('class', 'special-tools-input-range');
                    fill_opacity.setAttribute('min', '0');
                    fill_opacity.setAttribute('max', '1');
                    fill_opacity.setAttribute('step', '0.1');
                    fill_opacity.setAttribute('value', _fill_opacity);

                    special_tools_container_5.appendChild(fill_opacity);

                    /********************************************************/

                    const special_tools_container_6 = L.DomUtil.create('div');
                    special_tools_container_6.setAttribute('class', 'special-tools-container');
                    special_tools_container_6.setAttribute('id', 'special_tools_container_6');

                    modal_body.appendChild(special_tools_container_6);

                    /********************************************************/


                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('viewBox', '0 0 300 100');
                    special_tools_container_6.appendChild(svg);

                    /**********************************************************/

                    const object_preview = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    object_preview.setAttribute('id', 'object_preview');
                    object_preview.setAttribute('width', '300');
                    object_preview.setAttribute('height', '100');
                    object_preview.setAttribute('stroke-linecap', 'round');
                    object_preview.setAttribute('stroke-linejoin', 'round');
                    object_preview.setAttribute('stroke', _stroke_color);
                    object_preview.setAttribute('stroke-width', _stroke_width);
                    object_preview.setAttribute('stroke-opacity', _stroke_opacity);
                    object_preview.setAttribute('fill-opacity', _fill_opacity);
                    object_preview.setAttribute('stroke-dasharray', _stroke_dasharray);
                    object_preview.setAttribute('stroke-dashoffset', '0');
                    object_preview.setAttribute('fill', '#3388ff');

                    svg.appendChild(object_preview);

                    /********************************************************/

                    var default_stroke_color;
                    
                    if (layer.feature.special_tools.hasOwnProperty('obj_stroke_color')) {
                        
                        object_preview.setAttribute('stroke', layer.feature.special_tools.obj_stroke_color);
                        object_preview.setAttribute('fill', layer.feature.special_tools.obj_stroke_color);
                        
                    } else {
                        
                        if (layer.feature.properties.hasOwnProperty('color')) {

                            default_stroke_color = layer.feature.properties.color.substr(0, 7);


                        } else {

                            default_stroke_color = '#3388ff';

                        }

                        object_preview.setAttribute('stroke', default_stroke_color);
                        object_preview.setAttribute('fill', default_stroke_color);
 
                    }
                    
                    var default_stroke_width;
                    
                    if (layer.feature.special_tools.hasOwnProperty('obj_stroke_width')) {
                        
                        object_preview.setAttribute('stroke-width', layer.feature.special_tools.obj_stroke_width);
                        
                    } else {
                        
                        default_stroke_width = 3;

                        object_preview.setAttribute('stroke-width', default_stroke_width);

                    }

                    var default_stroke_opacity;
                    
                    if (layer.feature.special_tools.hasOwnProperty('obj_stroke_opacity')) {
                        
                        object_preview.setAttribute('stroke-opacity', layer.feature.special_tools.obj_stroke_opacity);
                        
                    } else {
                        
                        default_stroke_opacity = 1;

                        object_preview.setAttribute('stroke-opacity', default_stroke_opacity);

                    }
                    
                    var default_stroke_dasharray;
                    
                    if (layer.feature.special_tools.hasOwnProperty('obj_stroke_dasharray')) {
                        
                        object_preview.setAttribute('stroke-dasharray', layer.feature.special_tools.obj_stroke_dasharray);
                        object_preview.setAttribute('stroke-dashoffset', 0);
                        
                    } else {
                        
                        default_stroke_dasharray = 0;

                        object_preview.setAttribute('stroke-dasharray', default_stroke_dasharray);
                        object_preview.setAttribute('stroke-dashoffset', 0);
                        
                    }
                    
                    var default_fill_opacity;
                    
                    if (layer.feature.special_tools.hasOwnProperty('obj_fill_opacity')) {
                        
                        object_preview.setAttribute('fill-opacity', layer.feature.special_tools.obj_fill_opacity);
                        
                    } else {
                        
                        default_fill_opacity = 0.2;

                        object_preview.setAttribute('fill-opacity', default_fill_opacity);

                    }
                    
                    iro_object_color.on('color:change', function(color) {

                        if (validateColor(color.hexString)) {
                            
                           if (layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                const multi_id = layer.feature.special_tools.multi_id;

                                self.map.eachLayer(function(_layer_){
                                    
                                    if (!_layer_.hasOwnProperty('feature')) return;

                                    if (_layer_.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (multi_id === _layer_.feature.special_tools.multi_id && !_layer_.hasOwnProperty('_icon')) {

                                            _layer_.feature.special_tools.obj_stroke_color = color.hexString;
                            
                                            _layer_.setStyle({color: color.hexString, fillColor: color.hexString});
                                            
                                        }

                                    }

                                });

                            } else {

                                layer.feature.special_tools.obj_stroke_color = color.hexString;
                            
                                layer.setStyle({color: color.hexString, fillColor: color.hexString});
                            
                            }
                            
                            object_preview.setAttribute('stroke', color.hexString);
                            object_preview.setAttribute('fill', color.hexString);
                            
                            readonly_stroke_color.value = color.hexString;
                            
                            object_stroke_color.style.backgroundColor = color.hexString;
                            
                            layer.feature.properties.color = color.hexString;

                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                            
                        }

                    });
                    
                    L.DomEvent.on(object_stroke_color, 'click', function() {
                        
                        const iro_visible = this.getAttribute('iro-visible');
                        
                        if (iro_visible === 'false') {
                            
                            iro_object_color.base.style.display = 'block';
                            this.setAttribute('iro-visible', true);
                            
                        } else {
                            
                            iro_object_color.base.style.display = 'none';
                            this.setAttribute('iro-visible', false);
                            
                        }
                        
                    });
                    
                    L.DomEvent.on(object_stroke_color_btn, 'click', function() {
                        
                        const color = object_stroke_color_input.value;
                        
                        if (validateColor(color)) {
                            
                           if (layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                const multi_id = layer.feature.special_tools.multi_id;

                                self.map.eachLayer(function(_layer_){
                                    
                                    if (!_layer_.hasOwnProperty('feature')) return;

                                    if (_layer_.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (multi_id === _layer_.feature.special_tools.multi_id && !_layer_.hasOwnProperty('_icon')) {

                                            _layer_.feature.special_tools.obj_stroke_color = color;
                            
                                            _layer_.setStyle({color: color, fillColor: color});
                                            
                                        }

                                    }

                                });

                            } else {

                                layer.feature.special_tools.obj_stroke_color = color;
                            
                                layer.setStyle({color: color, fillColor: color});
                            
                            }
                            
                            object_preview.setAttribute('stroke', color);
                            object_preview.setAttribute('fill', color);
                            
                            iro_object_color.color.hexString = color;
                            
                            object_stroke_color.style.backgroundColor = color;
                            
                            readonly_stroke_color.value = color;
 
                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                            
                        } else {
                            
                            self.modal_message(self, "Por favor, introduzca un número hexadecimal correcto, por ejemplo: #ffffff", self.lang);
                            
                        }
                        
                    });
                    
                    L.DomEvent.on(stroke_width, 'change input', function(){
                        
                        if (this.value >= 1 && this.value <= 100) {
                            
                            if (layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                const multi_id = layer.feature.special_tools.multi_id;

                                const _this = this;

                                self.map.eachLayer(function(_layer_){
                                    
                                    if (!_layer_.hasOwnProperty('feature')) return;

                                    if (_layer_.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (multi_id === _layer_.feature.special_tools.multi_id && !_layer_.hasOwnProperty('_icon')) {

                                            _layer_.feature.special_tools.obj_stroke_width = _this.value;
                            
                                            _layer_.setStyle({weight: _this.value});
                                            
                                        }

                                    }

                                });

                            } else {
                            
                                layer.feature.special_tools.obj_stroke_width = this.value;
                            
                                layer.setStyle({weight: this.value});
                            
                            }
                            
                            object_preview.setAttribute('stroke-width', this.value);
 
                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                            
                        }
                        
                    });
                    
                    L.DomEvent.on(stroke_opacity, 'change input', function(){
                        
                        if (this.value >= 0 && this.value <= 1) {
                            
                            if (layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                const multi_id = layer.feature.special_tools.multi_id;

                                const _this = this;

                                self.map.eachLayer(function(_layer_){
                                    
                                    if (!_layer_.hasOwnProperty('feature')) return;

                                    if (_layer_.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (multi_id === _layer_.feature.special_tools.multi_id && !_layer_.hasOwnProperty('_icon')) {

                                            _layer_.feature.special_tools.obj_stroke_opacity = _this.value;
                                            
                                            _layer_.setStyle({opacity: _this.value});
                                            
                                        }

                                    }

                                });

                            } else {

                                layer.feature.special_tools.obj_stroke_opacity = this.value;

                                layer.setStyle({opacity: this.value});
                            
                            }
                            
                            object_preview.setAttribute('stroke-opacity', this.value);

                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);
                            
                        }
                        
                    });
                    
                    L.DomEvent.on(stroke_dasharray, 'change input', function(){
                        
                        if (this.value >= 0 && this.value <= 100) {

                            if (layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                const multi_id = layer.feature.special_tools.multi_id;

                                const _this = this;

                                self.map.eachLayer(function(_layer_){
                                    
                                    if (!_layer_.hasOwnProperty('feature')) return;

                                    if (_layer_.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (multi_id === _layer_.feature.special_tools.multi_id && !_layer_.hasOwnProperty('_icon')) {

                                            _layer_.feature.special_tools.obj_stroke_dasharray = _this.value;
                                            
                                            _layer_.setStyle({
                                                
                                                dashArray: _this.value,
                                                dashOffset: 0
                                            
                                            });

                                        }

                                    }

                                });

                            } else {

                                layer.feature.special_tools.obj_stroke_dasharray = this.value;

                                layer.setStyle({

                                    dashArray: this.value,
                                    dashOffset: 0

                                });
                            
                            }
                            
                            object_preview.setAttribute('stroke-dasharray', this.value);
                            object_preview.setAttribute('stroke-dashoffset', 0);
                            
                            const active_layer_id = self.component_geolocation.active_layer_id;
                            self.component_geolocation.update_draw_data(active_layer_id);

                        }
                        
                    });

                    L.DomEvent.on(fill_opacity, 'change input', function(){
                        
                        if (layer.feature.special_tools.hasOwnProperty('multi_id')) {
                            
                            const multi_id = layer.feature.special_tools.multi_id;
                            
                            const _this = this;
                            
                            self.map.eachLayer(function(_layer_){
                                
                                if (!_layer_.hasOwnProperty('feature')) return;
                                
                                if (_layer_.feature.special_tools.hasOwnProperty('multi_id')) {
                                    
                                    if (multi_id === _layer_.feature.special_tools.multi_id && !_layer_.hasOwnProperty('_icon')) {
                                        
                                        _layer_.setStyle({fillOpacity: _this.value});
                                        _layer_.feature.special_tools.obj_fill_opacity = _this.value;
                                        
                                    }
                                    
                                }
                                
                            });
                            
                        } else {
                            
                            layer.setStyle({fillOpacity: this.value});
                            layer.feature.special_tools.obj_fill_opacity = this.value;

                        }
                                                
                        object_preview.setAttribute('fill-opacity', this.value);

                        const active_layer_id = self.component_geolocation.active_layer_id;
                        self.component_geolocation.update_draw_data(active_layer_id);
                        
                    });
                    
                }
                
            });
            
        });
        
    },

    strip_tags: function(string) {
        
        return string.replace(/(<([^>]+)>)/gi, '');
        
    },
    
    simple_sanitize_string: function(string) {
        
        string = string.replace(/(<([^>]+)>)/gi, '');
        string = string.replace(/\"/g, '');
        string = string.replace(/\'/g, '');
        string = string.replace(/\\/g, '');
        string = string.replace(/\//g, '');
        string = string.replace(/\;/g, '');
        string = string.replace(/\&/g, '');
        
        return string;
        
    },
    
    is_hex_color: function(string) {
        
        if (/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(string)) {

            return true;
            
        }
        
        return false;
        
    },


    modal_message: function(self, message, lang, miliseconds) {

        if (self.map._container.querySelector('.special-tools-modal-message') !== null) {
            
            self.map._container.querySelector('.special-tools-modal-message').remove();
        
        }
        
        const map_width = self.map._container.clientWidth;
        const map_height = self.map._container.clientHeight;

        if (typeof miliseconds === 'undefined') miliseconds = 3500;
        
        const modal_message = L.DomUtil.create('div');
        modal_message.setAttribute('class', 'special-tools-modal-message');

        
        const modal_message_top = (map_height / 2) - 100;
        modal_message.style.top = modal_message_top + 'px';
        
        const modal_message_left = (map_width / 2) - (350 / 2);
        modal_message.style.left = modal_message_left + 'px';
        
        self.options.tool.google_translate({

            element_html: modal_message,
            str: message, 
            lang: lang

        });

        self.map._container.append(modal_message);
        
        window.setTimeout(function() {
            
            modal_message.remove();
            
        }, miliseconds);
    },
    
    modal_properties_form_create: function(self, layer, overlay) {
        
        if (typeof overlay === 'undefined') {
            
            overlay = false;
            
        }

        if (self.map._container.querySelector('.special-tools-modal-properties-form') !== null) {
            
            self.map._container.querySelector('.special-tools-modal-properties-form').remove();
        
        }
        
        const map_width = self.map._container.clientWidth;
        const map_height = self.map._container.clientHeight;
  
        const modal_properties_form = L.DomUtil.create('div');
        modal_properties_form.setAttribute('class', 'special-tools-modal-properties-form');

        
        const modal_top = (map_height / 2) - 100;
        modal_properties_form.style.top = modal_top + 'px';
        
        const modal_left = (map_width / 2) - (350 / 2);
        modal_properties_form.style.left = modal_left + 'px';

        self.map._container.append(modal_properties_form);
        
        const title = L.DomUtil.create('div');
        title.setAttribute('class', 'special-tools-h2');
        
        self.tool.google_translate({

            element_html: title,
            str: "Nueva propiedad", 
            lang: self.lang

        });
        
        modal_properties_form.appendChild(title);
        
        /**********************************************************/
        
        const br = L.DomUtil.create('br');
        modal_properties_form.appendChild(br);
        
        /**********************************************************/
        

        const text_property_name_span = L.DomUtil.create('span');

            self.tool.google_translate({

                element_html: text_property_name_span,
                str: "Nombre de la propiedad: ", 
                lang: self.lang

            });

        modal_properties_form.appendChild(text_property_name_span);

        /*******************************************************/

        const text_property_name_input = L.DomUtil.create('input');
        text_property_name_input.type = 'text';
        text_property_name_input.setAttribute('class', 'special-tools-input-200');

        modal_properties_form.appendChild(text_property_name_input);

        /********************************************************/

        modal_properties_form.appendChild(br.cloneNode(true));
        modal_properties_form.appendChild(br.cloneNode(true));

        /*******************************************************/

        const text_property_value_span = L.DomUtil.create('span');

            self.tool.google_translate({

                element_html: text_property_value_span,
                str: "Valor de la propiedad: ", 
                lang: self.lang

            });

        modal_properties_form.appendChild(text_property_value_span);

        /********************************************************/

        modal_properties_form.appendChild(br.cloneNode(true));
        modal_properties_form.appendChild(br.cloneNode(true));

        /********************************************************/

        const text_property_value_input = L.DomUtil.create('textarea');
        text_property_value_input.style.width = '100%';
        text_property_value_input.style.height = '100px';
        text_property_value_input.setAttribute('class', 'special-tools-textarea');

        modal_properties_form.appendChild(text_property_value_input);

        /*********************************************************/

        modal_properties_form.appendChild(br.cloneNode(true));
        modal_properties_form.appendChild(br.cloneNode(true));

        /*********************************************************/

        const create_button = L.DomUtil.create('button');
        create_button.type = 'button';
        create_button.setAttribute('class', 'special-tools-btn-success');

        self.tool.google_translate({

            element_html: create_button,
            str: "Crear propiedad", 
            lang: self.lang

        });

        modal_properties_form.appendChild(create_button);

        /*********************************************************/

        const close_button = L.DomUtil.create('button');
        close_button.type = 'button';
        close_button.setAttribute('class', 'special-tools-btn-danger');

        self.tool.google_translate({

            element_html: close_button,
            str: "Cancelar", 
            lang: self.lang

        });

        modal_properties_form.appendChild(close_button);

        /**********************************************************/

        L.DomEvent.on(close_button, 'click', function() {
            
            this.disabled = true;

            window.setTimeout(function() {
                
                modal_properties_form.remove();
                
            }, 100);
 
        });

        L.DomEvent.on(create_button, 'click', function() {

            const name = text_property_name_input.value;
            const value = text_property_value_input.value;

            const name_allows = /^[A-Za-z\_]+$/;

            if (name === '') {

                self.modal_message(self, "El campo nombre de la propiedad no puede estar vacío", self.lang);

                return;

            } else if (name.length > 50) {

                self.modal_message(self, "El campo nombre de la propiedad no puede superar los 50 caracteres", self.lang);

                return;

            } else if (!name.match(name_allows)) {

                self.modal_message(self, "El campo nombre de la propiedad solo acepta valores alfanúmericos y guiones bajos", self.lang);

                return;

            }

            if (value === '') {

                self.modal_message(self, "El campo valor de la propiedad no puede estar vacío", self.lang);

                return;

            } else if (value.length > 250) {

                self.modal_message(self, "El campo valor de la propiedad no puede superar los 250 caracteres", self.lang);

                return;

            }

            let options = {};

            options.name = name;
            options.value = self.strip_tags(value);

            let promise = self.tool.create_property(options);

            promise.then(function(data) {

                if (data.success) {

                    const new_property = JSON.parse('{"'+data.name+'": "'+data.value+'"}');

                    Object.assign(layer.feature.properties, new_property);

                    const active_layer_id = self.component_geolocation.active_layer_id;
                    self.component_geolocation.update_draw_data(active_layer_id);
                    
                    if (overlay !== false) {
                        
                        overlay.fireEvent('click');
                        
                    } else {
                        
                        layer.fireEvent('click');
                        
                    }

                    modal_properties_form.remove();
                    
                    self.special_tools_info_console.querySelector('#properties_btn').click();

                    self.modal_message(self, "Propiedad creada con éxito", self.lang);

                } else {

                    self.modal_message(self, data.msg, self.lang);

                }

            });

        });

    },
    
    modal_properties_form_update: function(self, property, layer, overlay) {
        
        if (typeof overlay === 'undefined') {
            
            overlay = false;
            
        }

        if (self.map._container.querySelector('.special-tools-modal-properties-form') !== null) {
            
            self.map._container.querySelector('.special-tools-modal-properties-form').remove();
        
        }
        
        const map_width = self.map._container.clientWidth;
        const map_height = self.map._container.clientHeight;
  
        const modal_properties_form = L.DomUtil.create('div');
        modal_properties_form.setAttribute('class', 'special-tools-modal-properties-form');

        
        const modal_top = (map_height / 2) - 100;
        modal_properties_form.style.top = modal_top + 'px';
        
        const modal_left = (map_width / 2) - (350 / 2);
        modal_properties_form.style.left = modal_left + 'px';

        self.map._container.append(modal_properties_form);
        
        const title = L.DomUtil.create('div');
        title.setAttribute('class', 'special-tools-h2');
        
        self.tool.google_translate({

            element_html: title,
            str: "Editar propiedad", 
            lang: self.lang

        });
        
        modal_properties_form.appendChild(title);
        
        /**********************************************************/
        
        const br = L.DomUtil.create('br');
        modal_properties_form.appendChild(br);
        
        /**********************************************************/
        

        const text_property_name_span = L.DomUtil.create('span');

            self.tool.google_translate({

                element_html: text_property_name_span,
                str: "Nombre de la propiedad: ", 
                lang: self.lang

            });

        modal_properties_form.appendChild(text_property_name_span);

        /*******************************************************/

        const text_property_name_title = L.DomUtil.create('span');
        text_property_name_title.setAttribute('class', 'special-tools-h3');
        text_property_name_title.innerText = " " + property.name;

        modal_properties_form.appendChild(text_property_name_title);

        /********************************************************/

        modal_properties_form.appendChild(br.cloneNode(true));
        modal_properties_form.appendChild(br.cloneNode(true));

        /*******************************************************/

        const text_property_value_span = L.DomUtil.create('span');

            self.tool.google_translate({

                element_html: text_property_value_span,
                str: "Valor de la propiedad: ", 
                lang: self.lang

            });

        modal_properties_form.appendChild(text_property_value_span);

        /********************************************************/

        modal_properties_form.appendChild(br.cloneNode(true));
        modal_properties_form.appendChild(br.cloneNode(true));

        /********************************************************/

        const text_property_value_input = L.DomUtil.create('textarea');
        text_property_value_input.style.width = '100%';
        text_property_value_input.style.height = '100px';
        text_property_value_input.setAttribute('class', 'special-tools-textarea');
        text_property_value_input.value = property.value;

        modal_properties_form.appendChild(text_property_value_input);

        /*********************************************************/

        modal_properties_form.appendChild(br.cloneNode(true));
        modal_properties_form.appendChild(br.cloneNode(true));

        /*********************************************************/

        const edit_button = L.DomUtil.create('button');
        edit_button.type = 'button';
        edit_button.setAttribute('class', 'special-tools-btn-success');

        self.tool.google_translate({

            element_html: edit_button,
            str: "Guardar propiedad", 
            lang: self.lang

        });

        modal_properties_form.appendChild(edit_button);

        /*********************************************************/

        const close_button = L.DomUtil.create('button');
        close_button.type = 'button';
        close_button.setAttribute('class', 'special-tools-btn-danger');

        self.tool.google_translate({

            element_html: close_button,
            str: "Cerrar", 
            lang: self.lang

        });

        modal_properties_form.appendChild(close_button);

        /**********************************************************/

        L.DomEvent.on(close_button, 'click', function() {
            
            this.disabled = true;
            
            window.setTimeout(function() {
                
                modal_properties_form.remove();
                
            }, 100);

        });

        L.DomEvent.on(edit_button, 'click', function() {

            const name = property.name;
            const value = text_property_value_input.value;

            if (value === '') {

                self.modal_message(self, "El campo valor de la propiedad no puede estar vacío", self.lang);

                return;

            } else if (value.length > 250) {

                self.modal_message(self, "El campo valor de la propiedad no puede superar los 250 caracteres", self.lang);

                return;

            }

            let options = {};

            options.name = name;
            options.value = self.strip_tags(value);

            let promise = self.tool.edit_property(options);

            promise.then(function(data) {

                if (data.success && layer.feature.properties.hasOwnProperty(data.name)) {
                    
                    layer.feature.properties[data.name] = data.value;
                    
                    const active_layer_id = self.component_geolocation.active_layer_id;
                    self.component_geolocation.update_draw_data(active_layer_id);
                    
                    if (overlay !== false) {
                        
                        overlay.fireEvent('click');
                        
                    } else {
                        
                        layer.fireEvent('click');
                        
                    }
                    
                    self.special_tools_info_console.querySelector('#properties_btn').click();

                    self.modal_message(self, "Propiedad editada con éxito", self.lang);

                } else {
                    
                    window.setTimeout(function() {
                        
                        modal_properties_form.remove();
                        
                    }, 100);

                    self.modal_message(self, "Ha ocurrido un error inesperado", self.lang);

                }

            });

        });
        
    },
    
    modal_properties_form_delete: function(self, property, layer, overlay) {
        
        if (typeof overlay === 'undefined') {
            
            overlay = false;
            
        }

        if (self.map._container.querySelector('.special-tools-modal-properties-form') !== null) {
            
            self.map._container.querySelector('.special-tools-modal-properties-form').remove();
        
        }
        
        const map_width = self.map._container.clientWidth;
        const map_height = self.map._container.clientHeight;
  
        const modal_properties_form = L.DomUtil.create('div');
        modal_properties_form.setAttribute('class', 'special-tools-modal-properties-form');

        
        const modal_top = (map_height / 2) - 100;
        modal_properties_form.style.top = modal_top + 'px';
        
        const modal_left = (map_width / 2) - (350 / 2);
        modal_properties_form.style.left = modal_left + 'px';

        self.map._container.append(modal_properties_form);
        
        const title = L.DomUtil.create('div');
        title.setAttribute('class', 'special-tools-h2');
        
        self.tool.google_translate({

            element_html: title,
            str: "Eliminar propiedad", 
            lang: self.lang

        });
        
        modal_properties_form.appendChild(title);
        
        /**********************************************************/
        
        const br = L.DomUtil.create('br');
        modal_properties_form.appendChild(br);
        
        /**********************************************************/
        

        const text_property_name_span = L.DomUtil.create('span');

            self.tool.google_translate({

                element_html: text_property_name_span,
                str: "Nombre de la propiedad: ", 
                lang: self.lang

            });

        modal_properties_form.appendChild(text_property_name_span);

        /*******************************************************/

        const text_property_name_title = L.DomUtil.create('span');
        text_property_name_title.setAttribute('class', 'special-tools-h3');
        text_property_name_title.innerText = " " + property.name;

        modal_properties_form.appendChild(text_property_name_title);

        /********************************************************/

        modal_properties_form.appendChild(br.cloneNode(true));
        modal_properties_form.appendChild(br.cloneNode(true));

        /*******************************************************/

        modal_properties_form.appendChild(br.cloneNode(true));
        modal_properties_form.appendChild(br.cloneNode(true));

        /*********************************************************/

        const delete_button = L.DomUtil.create('button');
        delete_button.type = 'button';
        delete_button.setAttribute('class', 'special-tools-btn-danger');

        self.tool.google_translate({

            element_html: delete_button,
            str: "Eliminar propiedad", 
            lang: self.lang

        });

        modal_properties_form.appendChild(delete_button);

        /*********************************************************/

        const close_button = L.DomUtil.create('button');
        close_button.type = 'button';
        close_button.setAttribute('class', 'special-tools-btn-default');

        self.tool.google_translate({

            element_html: close_button,
            str: "Cancelar", 
            lang: self.lang

        });

        modal_properties_form.appendChild(close_button);

        /**********************************************************/

        L.DomEvent.on(close_button, 'click', function() {
            
            this.disabled = true;
            
            window.setTimeout(function() {
                
                modal_properties_form.remove();
                
            }, 100);

        });

        L.DomEvent.on(delete_button, 'click', function() {
            
            this.disabled = true;

            const name = property.name;

            if (layer.feature.properties.hasOwnProperty(name)) {

                delete layer.feature.properties[name];

                const active_layer_id = self.component_geolocation.active_layer_id;
                self.component_geolocation.update_draw_data(active_layer_id);

                self.modal_message(self, "Propiedad eliminada con éxito", self.lang);

            } else {

                self.modal_message(self, 'Ha ocurrido un error, la propiedad no existe', self.lang);

            }
            
            if (overlay !== false) {

                overlay.fireEvent('click');

            } else {

                layer.fireEvent('click');

            }

            window.setTimeout(function() {

                modal_properties_form.remove();

            }, 100);

            self.special_tools_info_console.querySelector('#properties_btn').click();

        });
        
    },
    
    modal_properties: function(self, layer, overlay) {
        
        if (typeof overlay === 'undefined') {
            
            overlay = false;
            
        }
        
        self.map.fire('modal', {

            template: ['<div class="modal-header"></div>',
              '<hr>',
              '<div class="modal-body"></div>'
            ].join(''),

            width: 'auto',

            onShow: function(evt) {

                const modal = evt.modal;

                const modal_content = modal._container.querySelector('.modal-content');

                modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                modal_content.style.marginTop = '80px';

                const modal_header = modal._container.querySelector('.modal-header');

                const modal_title = L.DomUtil.create('div');
                modal_title.setAttribute('class', 'special-tools-h1');

                modal_header.appendChild(modal_title);

                self.tool.google_translate({

                    element_html: modal_title,
                    str: "Propiedades del objeto", 
                    lang: self.lang

                });

                const modal_body = modal._container.querySelector('.modal-body');

                /********************************************************/

                const select_container = L.DomUtil.create('div');
                select_container.setAttribute('class', 'special-tools-container');

                modal_body.appendChild(select_container); 

                /********************************************************/

                const new_property = L.DomUtil.create('button');
                new_property.type = 'button';
                new_property.setAttribute('class', 'special-tools-btn-success');

                self.tool.google_translate({

                    element_html: new_property,
                    str: "Nueva propiedad", 
                    lang: self.lang

                });

                select_container.appendChild(new_property);

                /********************************************************/

                const properties_div = L.DomUtil.create('div');
                properties_div.setAttribute('class', 'special-tools-container');
                properties_div.style.padding = '5px';
                properties_div.style.backgroundColor = '#ffffff';
                properties_div.style.borderRadius = '4px';

                modal_body.appendChild(properties_div);

                /*********************************************************/

                const properties = layer.feature.properties;

                for (let prop in properties) {

                    if (
                        properties[prop] !== null 
                        && prop !== 'color' 
                        && prop !== 'layer_id'
                        && typeof properties[prop] !== 'object'
                    ){
                        if (self.is_url(properties[prop])) {

                            const properties_content_div = L.DomUtil.create('div');
                            properties_content_div.setAttribute('class', 'special-tools-container');

                            properties_div.appendChild(properties_content_div);

                            /**************************************************/

                            const properties_link_div = L.DomUtil.create('a');
                            properties_link_div.href = properties[prop];
                            properties_link_div.target = '_blank';

                            self.tool.google_translate({

                                element_html: properties_link_div,
                                str: "Más información", 
                                lang: self.lang

                            });

                            properties_content_div.appendChild(properties_link_div);

                        } else {

                            const properties_content_div = L.DomUtil.create('div');
                            properties_content_div.setAttribute('class', 'special-tools-container');
                            properties_content_div.style.borderBottom = '1px solid #b0cdd2';
                            properties_content_div.style.paddingBottom = '4px';
                            properties_content_div.style.fontSize = '12px';
                            
                            properties_content_div.innerHTML = "<strong>" + prop + "</strong>" + ": <br>" + properties[prop] + "<br>";

                            properties_div.appendChild(properties_content_div);
                            
                            /***************************************************/
                            
                            const br = L.DomUtil.create('br');
                            properties_content_div.appendChild(br);
                            
                            /***************************************************/
                            
                            const update_property = L.DomUtil.create('button');
                            update_property.type = 'button';
                            update_property.setAttribute('class', 'special-tools-btn-info');
                            update_property.setAttribute('property-name', prop);
                            
                            properties_content_div.appendChild(update_property);
                            
                            /***************************************************/
                            
                            const update_property_image = L.DomUtil.create('img');
                            update_property_image.src = self.tool.controls_url() + '/img/edit.png';
                            update_property_image.style.width = '10px';
                            update_property_image.style.height = '10px';
                            const _compute = compute('#ffffff'); 
                            update_property_image.style.filter = _compute.result.filterRaw;
                            
                            update_property.appendChild(update_property_image);
                            
                            /***************************************************/
                            
                            const delete_property = L.DomUtil.create('button');
                            delete_property.type = 'button';
                            delete_property.setAttribute('class', 'special-tools-btn-danger');
                            delete_property.setAttribute('property-name', prop);
                            
                            properties_content_div.appendChild(delete_property);
                            
                            /***************************************************/
                            
                            const delete_property_image = L.DomUtil.create('img');
                            delete_property_image.src = self.tool.controls_url() + '/img/trash.png';
                            delete_property_image.style.width = '10px';
                            delete_property_image.style.height = '10px';
                            
                            delete_property.appendChild(delete_property_image);
                            
                            /***************************************************/

                            properties_content_div.appendChild(br.cloneNode(true));
                            
                            /***************************************************/
                            
                            /* EVENTS */
                            L.DomEvent.on(update_property, 'click', function() {
                                
                                const property = {name: prop, value: properties[prop]};
                                
                                self.modal_properties_form_update(self, property, layer, overlay);
                                
                            });
                            
                            /***************************************************/
                            
                            /* EVENTS */
                            L.DomEvent.on(delete_property, 'click', function() {
                                
                                const property = {name: prop};
                                
                                self.modal_properties_form_delete(self, property, layer, overlay);
                                
                            });
                            
                            /***************************************************/

                        }
                    }

                }

                L.DomEvent.on(new_property, 'click', function() {

                    self.modal_properties_form_create(self, layer, overlay);

                });

            }

        });
        
    },
    
    info_console_load_properties: function(self, layer, overlay) {
        
        if (typeof overlay === 'undefined') {
            
            overlay = false;
            
        }
        
        const hr = L.DomUtil.create('hr');
        self.special_tools_info_console.appendChild(hr);

        /******************************************************/

        const properties_title = L.DomUtil.create('div');
        properties_title.setAttribute('class', 'special-tools-h3');

        self.tool.google_translate({

            element_html: properties_title,
            str: "Propiedades del objeto:", 
            lang: self.lang

        });

        self.special_tools_info_console.appendChild(properties_title);

        /******************************************************/

        const properties_div = L.DomUtil.create('div');
        properties_div.setAttribute('class', 'special-tools-container');
        self.special_tools_info_console.appendChild(properties_div);

        /*******************************************************/

        const properties_btn = L.DomUtil.create('button');
        properties_btn.type = 'button';
        properties_btn.id = 'properties_btn';
        properties_btn.setAttribute('class', 'special-tools-btn-default');
        properties_btn.style.fontSize = '9px';

        self.tool.google_translate({

            element_html: properties_btn,
            str: "Propiedades", 
            lang: self.lang

        });

        properties_div.appendChild(properties_btn);

        /******************************************************/
        
        const image_btn = L.DomUtil.create('button');
        image_btn.type = 'button';
        image_btn.id = 'image_btn';
        image_btn.setAttribute('class', 'special-tools-btn-default');
        image_btn.style.fontSize = '9px';
        
        self.tool.google_translate({

            element_html: image_btn,
            str: "Asociar imagen", 
            lang: self.lang

        });
        
        properties_div.appendChild(image_btn);
        
        /*****************************************************/
        
       const images_gallery_btn = L.DomUtil.create('button');
        images_gallery_btn.type = 'button';
        images_gallery_btn.id = 'images_gallery';
        images_gallery_btn.setAttribute('class', 'special-tools-btn-default');
        images_gallery_btn.style.fontSize = '9px';
        
        self.tool.google_translate({

            element_html: images_gallery_btn,
            str: "Galería", 
            lang: self.lang

        });
        
        properties_div.appendChild(images_gallery_btn);
        
        /******************************************************/

        const properties = layer.feature.properties;
        var images_urls = new Array();

        for (let prop in properties) {

            if (
                properties[prop] !== null 
                && prop !== 'color' 
                && prop !== 'layer_id'
                && typeof properties[prop] !== 'object'
            ){
                if (self.is_url(properties[prop])) {

                    const properties_content_div = L.DomUtil.create('div');
                    properties_content_div.setAttribute('class', 'special-tools-container');

                    const properties_link_div = L.DomUtil.create('a');
                    properties_link_div.href = properties[prop];
                    properties_link_div.target = '_blank';

                    properties_content_div.appendChild(properties_link_div);

                    properties_div.appendChild(properties_content_div);

                    self.tool.google_translate({

                        element_html: properties_link_div,
                        str: "Más información", 
                        lang: self.lang

                    });

                } else {

                    const properties_content_div = L.DomUtil.create('div');
                    properties_content_div.setAttribute('class', 'special-tools-container');

                    if (properties[prop].length > 80) {

                        properties[prop] = properties[prop].substring(0, 80) + '...';

                    }

                    properties_content_div.innerHTML = "<strong>" + prop + "</strong>" + ": " + properties[prop];

                    properties_div.appendChild(properties_content_div);

                }
            }

        }
        
        /******************IMAGES GALLERY**********************/

        if (properties.hasOwnProperty('images')) {

            for (let x = 0; x < properties.images.length; x++) {

                if (properties.images[x].hasOwnProperty('url')) {

                    //Check if image exist
                    fetch(properties.images[x].url, {method: 'HEAD'})
                    .then(function(res) {

                        if (res.ok) {

                            images_urls.push(properties.images[x].url);

                        }

                    });

                }

            }

        }

        /******************IMAGES GALLERY**********************/

        L.DomEvent.on(properties_btn, 'click', function() {

            self.modal_properties(self, layer, overlay);

        });
        
        L.DomEvent.on(image_btn, 'click', function() {
            
            self.modal_associate_image(self, layer, overlay);
            
        });
        
        L.DomEvent.on(images_gallery_btn, 'click', function() {
            
            if (images_urls.length > 0) {
            
                const lightbox = SimpleLightbox.open({

                    items: images_urls

                });
            
            } else {
                
                self.modal_message(self, "No existen imágenes asociadas al objeto", self.lang);
                
            }

        });
        
        
    }, 
    
    modal_associate_image: function(self, layer, overlay) {
        
        if (typeof overlay === 'undefined') {
            
            overlay = false;
            
        }
        
        self.map.fire('modal', {
            
            template: ['<div class="modal-header"></div>',
              '<hr>',
              '<div class="modal-body"></div>'
            ].join(''),

            width: 'auto',

            onShow: function(evt) {

                const modal = evt.modal;

                const modal_content = modal._container.querySelector('.modal-content');

                modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                modal_content.style.marginTop = '80px';

                const modal_header = modal._container.querySelector('.modal-header');

                const modal_title = L.DomUtil.create('div');
                modal_title.setAttribute('class', 'special-tools-h1');

                modal_header.appendChild(modal_title);

                self.tool.google_translate({

                    element_html: modal_title,
                    str: "Asociar imagen al objeto", 
                    lang: self.lang

                });

                const modal_body = modal._container.querySelector('.modal-body');

                /********************************************************/
                
                const container = L.DomUtil.create('div');
                container.setAttribute('class', 'special-tools-container');
                
                modal_body.appendChild(container);
                
                /********************************************************/
                
                self.tool.image_service_upload(container, ['jpg','jpeg','png','gif', 'webp'])
                .then(function() {
                    
                    self.tool.image_subscribe(
                            
                        function(response) {

                            const options = {

                                file_data: response.file_data,
                                tipo: self.tool.component_image.tipo,
                                section_tipo: self.tool.component_image.section_tipo,
                                section_id: self.tool.component_image.section_id,
                                default_quality: self.tool.component_image.context.features.default_target_quality

                            };

                            self.tool.get_image_data(options).then(function(data) {

                                if (!data.success) {

                                    return;

                                }

                                const image_object = {

                                    url: data.image_src,
                                    tipo: self.tool.component_image.tipo,
                                    section_tipo: self.tool.component_image.section_tipo,
                                    section_id: self.tool.component_image.section_id

                                };

                                if (!layer.feature.properties.hasOwnProperty('images')) {

                                    layer.feature.properties.images = [];
                                    layer.feature.properties.images.push(image_object);

                                } else {

                                    layer.feature.properties.images.push(image_object);

                                }

                                const active_layer_id = self.component_geolocation.active_layer_id;
                                self.component_geolocation.update_draw_data(active_layer_id);

                                self.modal_message(self, "Imagen asociada con éxito al objeto", self.lang);

                                if (overlay !== false) {

                                    overlay.fireEvent('click');

                                } else {

                                    layer.fireEvent('click');

                                }
                                        
                            });
                    });
 
                });  
            }
        }); 
    }  
});

L.control.specialTools = function (options) {
    
    return new L.Control.SpecialTools(options);
    
};
