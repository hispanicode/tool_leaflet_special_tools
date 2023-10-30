
L.Control.SpecialToolsUA = L.Control.extend({
    
    onAdd: function (map) {
        
        const self = this;
        
        const special_tools = this.options.special_tools;
        
        const tool = special_tools.options.tool;
        
        const lang = special_tools.options.lang;
        
        const component_geolocation = special_tools.options.component_geolocation;
        
        this.special_tools_msg = null;

        const controlDiv = L.DomUtil.create('div');
        
        const controlDivButton = L.DomUtil.create('div', 'special-tools-button-UA special-tools-controls special-tools-disable', controlDiv);
        controlDivButton.innerText = 'U.A';
        
        tool.google_translate({

            element_html: controlDivButton,
            attribute: 'title',
            str: 'Unidades Administrativas de España', 
            lang: lang

        });
        
        const leaflet_control_select_UA = L.DomUtil.create('select', 'special-tools-menu-UA', controlDiv);
        leaflet_control_select_UA.style.display = 'none';
        
        const leaflet_control_munic_UA = L.DomUtil.create('option', 'special-tools-option-UA', leaflet_control_select_UA);
        leaflet_control_munic_UA.selected = true;
        leaflet_control_munic_UA.value = 'Municipio';
        
        tool.google_translate({

            element_html: leaflet_control_munic_UA,
            str: 'Municipio', 
            lang: lang

        });
        
        tool.google_translate({

            element_html: leaflet_control_munic_UA,
            attribute: 'title',
            str: 'Municipio', 
            lang: lang

        });
        
        const leaflet_control_prov_UA = L.DomUtil.create('option', 'special-tools-option-UA', leaflet_control_select_UA);
        leaflet_control_prov_UA.selected = false;
        leaflet_control_prov_UA.value = 'Provincia';
        
        tool.google_translate({

            element_html: leaflet_control_prov_UA,
            str: 'Provincia', 
            lang: lang

        });
        
        tool.google_translate({

            element_html: leaflet_control_prov_UA,
            attribute: 'title',
            str: 'Provincia', 
            lang: lang

        });
        
        const leaflet_control_CCAA_UA = L.DomUtil.create('option', 'special-tools-option-UA', leaflet_control_select_UA);
        leaflet_control_CCAA_UA.selected = false;
        leaflet_control_CCAA_UA.value = 'CCAA';
        
        tool.google_translate({

            element_html: leaflet_control_CCAA_UA,
            str: 'Comunidad Autónoma', 
            lang: lang

        });
        
        tool.google_translate({

            element_html: leaflet_control_CCAA_UA,
            attribute: 'title',
            str: 'Comunidad Autónoma', 
            lang: lang

        });

        special_tools.special_tools_btns.appendChild(controlDiv);

        var UA_selected = 'Municipio';
        
        var hover_select_UA = false;

        L.DomEvent.addListener(leaflet_control_select_UA, 'click change', function(){
            
            hover_select_UA = true;
            UA_selected = this.value;
            
            window.setTimeout(function(){hover_select_UA = false;}, 1000);

        });
        
        var enable_UA = false;
        
        var wms = null;
        
        var basemap_history;

        L.DomEvent.addListener(controlDivButton, 'click', function(e) {

            if (L.DomUtil.hasClass(controlDivButton, 'special-tools-disable')) {
                
                    L.DomUtil.addClass(controlDivButton, 'special-tools-enable');
                    
                    L.DomUtil.removeClass(controlDivButton, 'special-tools-disable');
                    
                    leaflet_control_select_UA.style.display = 'block';

                    let elements_controls = special_tools.controlDiv.querySelectorAll('.special-tools-controls');
                    
                    try {
                        
                        special_tools.only_one_control_active(elements_controls, controlDivButton);
                    
                    } catch (e) {};
                    
                    enable_UA = true;
                    
                    var leaflet_control_layers_base = document.querySelector('.leaflet-control-layers-base');
                    
                    var leaflet_control_layers_selector = leaflet_control_layers_base.querySelectorAll('.leaflet-control-layers-selector');
                    
                    for (let index in leaflet_control_layers_selector) {
                        
                        if (leaflet_control_layers_selector[index].checked) {
                            
                            basemap_history = index;
                            
                            break;
                            
                        }
                        
                    }
                    
                    map.eachLayer(function(layer) {
                        
                        if (layer instanceof L.TileLayer) {
                            
                            layer.removeFrom(map);
                        }
                        
                    });

                    wms = L.tileLayer.wms('http://www.ign.es/wms-inspire/unidades-administrativas?', {layers: 'AU.AdministrativeUnit'});
                    
                    component_geolocation.layer_control.addBaseLayer(wms, "Unidades Administrativas (ES)");

                    leaflet_control_layers_base = document.querySelector('.leaflet-control-layers-base');

                    leaflet_control_layers_selector = leaflet_control_layers_base.querySelectorAll('.leaflet-control-layers-selector');

                    for (let index in leaflet_control_layers_selector) {

                        if (leaflet_control_layers_selector[index].checked) {

                            basemap_history = index;

                            break;

                        }

                    }

                    const last_basemap_index = leaflet_control_layers_selector.length-1;

                    const UA_input_radio = leaflet_control_layers_selector[last_basemap_index];

                    UA_input_radio.click();

                }  else {

                    L.DomUtil.addClass(controlDivButton, 'special-tools-disable');
                    
                    L.DomUtil.removeClass(controlDivButton, 'special-tools-enable');
                    
                    leaflet_control_select_UA.style.display = 'none';

                    component_geolocation.layer_control.removeLayer(wms);
                        
                    wms.removeFrom(map);

                    document.querySelectorAll('.leaflet-control-layers-selector')[basemap_history].click();
                        
                    enable_UA = false;
                    
                }

                if (enable_UA) {

                    map.off('click');

                    window.setTimeout(function(){
                        
                        map.on('click', function(event){

                            if (
                                !special_tools.geoman_edition_mode(map)
                                && enable_UA && !hover_select_UA
                            ) {
                                
                                const bbox = this.getBounds().toBBoxString();
                                
                                const point = this.latLngToContainerPoint(event.latlng, this.getZoom());
                                
                                const size = this.getSize();
                            
                                let options = {};
                                
                                options.url = 'https://www.ign.es/wms-inspire/unidades-administrativas?service=WMS&version=1.3.0&request=GetFeatureInfo&layers=AU.AdministrativeUnit&feature_count=3&info_format=application/json&query_layers=AU.AdministrativeUnit&bbox='+bbox+'&height='+size.y+'&width='+size.x+'&i='+parseInt(point.x)+'&j='+parseInt(point.y);
                                
                                let promise = tool.get_UA(options);
                                
                                promise.then(function(data) {
                                    
                                    if (!data.success) {
                                        
                                        special_tools.modal_message(special_tools, data.msg, lang);
                                        
                                        return;
                                        
                                    }

                                    if (data.feature.numberReturned === 0) {
                                        
                                        special_tools.modal_message(special_tools, "No ha sido posible obtener resultados", lang);
                                        
                                        return;
                                        
                                    }
                                    
                                    if (typeof data.feature !== 'undefined') {

                                        let COLLECTION = L.geoJSON(data.feature);

                                        COLLECTION = COLLECTION.toGeoJSON();

                                        let GEOJSON = null;

                                        for (let index in COLLECTION.features) {

                                            const nationallevel = COLLECTION.features[index].properties.nationallevel;

                                            let OBJECTS_GEOJSON = new Array();

                                            if (UA_selected === 'Municipio' && nationallevel === 'https://inspire.ec.europa.eu/codelist/AdministrativeHierarchyLevel/4thOrder') {

                                                GEOJSON = COLLECTION.features[index];

                                            }

                                            else if (UA_selected === 'Provincia' && nationallevel === 'https://inspire.ec.europa.eu/codelist/AdministrativeHierarchyLevel/3rdOrder') {

                                                GEOJSON = COLLECTION.features[index];

                                            }

                                            else if (UA_selected === 'CCAA' && nationallevel === 'https://inspire.ec.europa.eu/codelist/AdministrativeHierarchyLevel/2ndOrder') {

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

                                                            map.fire("pm:create", {layer: OBJECTS_GEOJSON[index][obj]});

                                                        }, 100);


                                                        if (max_fit === 1) {

                                                            if (special_tools.is_point(OBJECTS_GEOJSON[index][obj])) {

                                                               map.panTo(OBJECTS_GEOJSON[index][obj].getLatLng()); 

                                                            } else if (
                                                                special_tools.is_linestring(OBJECTS_GEOJSON[index][obj])
                                                                || special_tools.is_polygon(OBJECTS_GEOJSON[index][obj])
                                                                ) {

                                                                map.fitBounds(OBJECTS_GEOJSON[index][obj].getBounds());

                                                            }
                                                            max_fit = 0;
                                                        }

                                                    }
                                                }

                                                special_tools.modal_message(special_tools, "Espere un momento a que termine el proceso, cargando ...", lang);

                                                break;

                                            }
                                        }

                                        if (GEOJSON === null) {

                                            special_tools.modal_message(special_tools, "No ha sido posible obtener la Unidad Administrativa.", lang);

                                        }
                                            
                                    }
                                })
                                
                                .catch(() => {
                                    
                                    special_tools.modal_message(special_tools, "No ha sido posible obtener la Unidad Administrativa.", lang);

                                });
                            }

                            L.DomEvent.preventDefault(event);
                            
                        });
                        
                    }, 1000);   
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


