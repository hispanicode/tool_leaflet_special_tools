
export const special_tools_UA_es = function() {

	return true;
        
};

special_tools_UA_es.prototype.load = async function(L, special_tools) {
    
    special_tools_UA_es.prototype.special_tools = special_tools;
    
    L.Control.SpecialToolsUA = L.Control.extend({

        onAdd: function () {

            const self = special_tools_UA_es.prototype.special_tools;

            const controlDiv = L.DomUtil.create('div');
            special_tools_UA_es.prototype.controlDiv = controlDiv;
            
            const controlDivButton = L.DomUtil.create('div', 'special-tools-button-UA special-tools-controls special-tools-disable', controlDiv);
            controlDivButton.innerText = 'U.A';
            special_tools_UA_es.prototype.controlDivButton = controlDivButton;
            
            self.tool.google_translate({

                element_html: controlDiv,
                attribute: 'title',
                str: 'Unidades Administrativas de España', 
                lang: self.lang

            });

            self.special_tools_btns.appendChild(controlDiv);
            
            special_tools_UA_es.prototype.create_select();
            
            L.DomEvent.on(controlDivButton, 'click', function(e) {

                if (L.DomUtil.hasClass(controlDivButton, 'special-tools-disable')) {

                    L.DomUtil.addClass(controlDivButton, 'special-tools-enable');

                    L.DomUtil.removeClass(controlDivButton, 'special-tools-disable');

                    self.only_one_active_control(controlDivButton);

                    special_tools_UA_es.prototype.UA_on();

                }  else {

                    L.DomUtil.addClass(controlDivButton, 'special-tools-disable');

                    L.DomUtil.removeClass(controlDivButton, 'special-tools-enable');

                    special_tools_UA_es.prototype.UA_off();

                }

                if (self.enable_UA) {
                    
                    special_tools_UA_es.prototype.init_UA();
                    
                }

                L.DomEvent.preventDefault(e);

            });
            
            const false_div = L.DomUtil.create('div');

            return false_div;
            
        }
        
    });
    
    L.control.specialToolsUA = function (options) {

        return new L.Control.SpecialToolsUA(options);

    };
    
};

special_tools_UA_es.prototype.create_select = function() {
    
    const _this = this;
    
    const self = this.special_tools;
    
    self.leaflet_control_select_UA = L.DomUtil.create('select', 'special-tools-menu-UA', _this.controlDiv);
    self.leaflet_control_select_UA.style.display = 'none';

    self.leaflet_control_munic_UA = L.DomUtil.create('option', 'special-tools-option-UA', self.leaflet_control_select_UA);
    self.leaflet_control_munic_UA.selected = true;
    self.leaflet_control_munic_UA.value = 'Municipio';

    self.tool.google_translate({

        element_html: self.leaflet_control_munic_UA,
        str: 'Municipio', 
        lang: self.lang

    });

    self.tool.google_translate({

        element_html: self.leaflet_control_munic_UA,
        attribute: 'title',
        str: 'Municipio', 
        lang: self.lang

    });

    self.leaflet_control_prov_UA = L.DomUtil.create('option', 'special-tools-option-UA', self.leaflet_control_select_UA);
    self.leaflet_control_prov_UA.selected = false;
    self.leaflet_control_prov_UA.value = 'Provincia';

    self.tool.google_translate({

        element_html: self.leaflet_control_prov_UA,
        str: 'Provincia', 
        lang: self.lang

    });

    self.tool.google_translate({

        element_html: self.leaflet_control_prov_UA,
        attribute: 'title',
        str: 'Provincia', 
        lang: self.lang

    });

    self.leaflet_control_CCAA_UA = L.DomUtil.create('option', 'special-tools-option-UA', self.leaflet_control_select_UA);
    self.leaflet_control_CCAA_UA.selected = false;
    self.leaflet_control_CCAA_UA.value = 'CCAA';

    self.tool.google_translate({

        element_html: self.leaflet_control_CCAA_UA,
        str: 'Comunidad Autónoma', 
        lang: self.lang

    });

    self.tool.google_translate({

        element_html: self.leaflet_control_CCAA_UA,
        attribute: 'title',
        str: 'Comunidad Autónoma', 
        lang: self.lang

    });

    self.special_tools_btns.appendChild(_this.controlDiv);

    self.UA_selected = 'Municipio';

    self.hover_select_UA = false;

    L.DomEvent.addListener(self.leaflet_control_select_UA, 'click change', function(){

        self.hover_select_UA = true;
        self.UA_selected = this.value;

        window.setTimeout(function(){self.hover_select_UA = false;}, 1000);

    });
    
};

special_tools_UA_es.prototype.UA_on = function() {
    
    const self = this.special_tools;
    
    self.leaflet_control_select_UA.style.display = 'block';
    
    self.enable_UA = true;
    
    var leaflet_control_layers_base = document.querySelector('.leaflet-control-layers-base');

    var leaflet_control_layers_selector = leaflet_control_layers_base.querySelectorAll('.leaflet-control-layers-selector');

    for (let index in leaflet_control_layers_selector) {

        if (leaflet_control_layers_selector[index].checked) {

            self.basemap_history = index;

            break;

        }

    }

    self.map.eachLayer(function(layer) {

        if (layer instanceof L.TileLayer) {

            layer.removeFrom(self.map);
        }

    });

    self.wms_UA = L.tileLayer.wms('http://www.ign.es/wms-inspire/unidades-administrativas?', {layers: 'AU.AdministrativeUnit'});

    self.component_geolocation.layer_control.addBaseLayer(self.wms_UA, "Unidades Administrativas (ES)");

    leaflet_control_layers_base = document.querySelector('.leaflet-control-layers-base');

    leaflet_control_layers_selector = leaflet_control_layers_base.querySelectorAll('.leaflet-control-layers-selector');

    for (let index in leaflet_control_layers_selector) {

        if (leaflet_control_layers_selector[index].checked) {

            self.basemap_history = index;

            break;

        }

    }

    const last_basemap_index = leaflet_control_layers_selector.length-1;

    const UA_input_radio = leaflet_control_layers_selector[last_basemap_index];

    UA_input_radio.click();
    
};

special_tools_UA_es.prototype.UA_off = function() {
    
    const self = this.special_tools;
    
    self.leaflet_control_select_UA.style.display = 'none';
    
    self.component_geolocation.layer_control.removeLayer(self.wms_UA);

    self.wms_UA.removeFrom(self.map);

    document.querySelectorAll('.leaflet-control-layers-selector')[self.basemap_history].click();

    self.enable_UA = false;
    
};

special_tools_UA_es.prototype.init_UA = function() {
    
    const self = this.special_tools;
    
    self.map.off('click');

    window.setTimeout(function(){

        self.map.on('click', function(event) {

            if (
                !self.geoman_edition_mode(self.map)
                && self.enable_UA && !self.hover_select_UA
            ) {

                const bbox = this.getBounds().toBBoxString();

                const point = this.latLngToContainerPoint(event.latlng, this.getZoom());

                const size = this.getSize();

                let options = {};

                options.url = 'https://www.ign.es/wms-inspire/unidades-administrativas?service=WMS&version=1.3.0&request=GetFeatureInfo&layers=AU.AdministrativeUnit&feature_count=3&info_format=application/json&query_layers=AU.AdministrativeUnit&bbox='+bbox+'&height='+size.y+'&width='+size.x+'&i='+parseInt(point.x)+'&j='+parseInt(point.y);

                let promise = self.tool.get_UA(options);

                    promise.then(function(data) {

                        if (!data.success) {

                            self.modal_message(data.msg);

                            return;

                        }

                        if (data.feature.numberReturned === 0) {

                            self.modal_message("No ha sido posible obtener resultados");

                            return;

                        }

                        if (typeof data.feature !== 'undefined') {

                            let COLLECTION = L.geoJSON(data.feature);

                            COLLECTION = COLLECTION.toGeoJSON();

                            let GEOJSON = null;

                            for (let index in COLLECTION.features) {

                                const nationallevel = COLLECTION.features[index].properties.nationallevel;

                                let OBJECTS_GEOJSON = new Array();

                                if (self.UA_selected === 'Municipio' && nationallevel === 'https://inspire.ec.europa.eu/codelist/AdministrativeHierarchyLevel/4thOrder') {

                                    GEOJSON = COLLECTION.features[index];

                                }

                                else if (self.UA_selected === 'Provincia' && nationallevel === 'https://inspire.ec.europa.eu/codelist/AdministrativeHierarchyLevel/3rdOrder') {

                                    GEOJSON = COLLECTION.features[index];

                                }

                                else if (self.UA_selected === 'CCAA' && nationallevel === 'https://inspire.ec.europa.eu/codelist/AdministrativeHierarchyLevel/2ndOrder') {

                                    GEOJSON = COLLECTION.features[index];

                                }

                                if (GEOJSON !== null) {

                                    if (GEOJSON.geometry.type === "Polygon") {

                                        const polygon = projections.polygon(GEOJSON);

                                        OBJECTS_GEOJSON.push(polygon);

                                    } else if (GEOJSON.geometry.type === "MultiPolygon") {

                                        const multipolygon = projections.multipolygon(GEOJSON);

                                        OBJECTS_GEOJSON.push(multipolygon);

                                    } else if (GEOJSON.geometry.type === "LineString") {

                                        const linestring = projections.linestring(GEOJSON);

                                        OBJECTS_GEOJSON.push(linestring);

                                    } else if (GEOJSON.geometry.type === "MultiLineString") {

                                        const multilinestring = projections.multilinestring(GEOJSON);

                                        OBJECTS_GEOJSON.push(multilinestring);

                                    } else if (GEOJSON.geometry.type === "Point") {

                                        const point = projections.point(GEOJSON);

                                        OBJECTS_GEOJSON.push(point);

                                    } else if (GEOJSON.geometry.type === "MultiPoint") {

                                        const multipoint = projections.multipoint(GEOJSON);

                                        OBJECTS_GEOJSON.push(multipoint);

                                    }

                                    for (let index in OBJECTS_GEOJSON) {

                                        let max_fit = 1;

                                        for (let obj in OBJECTS_GEOJSON[index]) {

                                            window.setTimeout(function(){

                                                self.map.fire("pm:create", {layer: OBJECTS_GEOJSON[index][obj]});

                                            }, 100);


                                            if (max_fit === 1) {

                                                if (self.is_point(OBJECTS_GEOJSON[index][obj])) {

                                                   self.map.panTo(OBJECTS_GEOJSON[index][obj].getLatLng()); 

                                                } else if (
                                                    self.is_linestring(OBJECTS_GEOJSON[index][obj])
                                                    || self.is_polygon(OBJECTS_GEOJSON[index][obj])
                                                    ) {
                                                    
                                                    const _COLLECTION = L.geoJSON(COLLECTION);
                                                    self.map.fitBounds(_COLLECTION.getBounds());
                                                    

                                                }
                                                max_fit = 0;
                                            }

                                        }
                                    }

                                    self.modal_message("Espere un momento a que termine el proceso, cargando ...");

                                    break;

                                }
                            }

                            if (GEOJSON === null) {

                                self.modal_message("No ha sido posible obtener la Unidad Administrativa.");

                            }

                        }
                    })

                    .catch(() => {

                        self.modal_message("No ha sido posible obtener la Unidad Administrativa.");

                    });
                }

            L.DomEvent.preventDefault(event);

        });

    }, 1000);
    
};
