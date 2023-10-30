
L.Control.SpecialToolsCatastro = L.Control.extend({
    
    onAdd: function (map) {
        
        const self = this;
        
        const special_tools = this.options.special_tools;
        
        const tool = special_tools.options.tool;

        const lang = special_tools.options.lang;
        
        const component_geolocation = special_tools.options.component_geolocation;
        
        const controlDiv = L.DomUtil.create('div', 'special-tools-catastro special-tools-controls special-tools-disable');
        controlDiv.innerText = 'Catast';
        
        tool.google_translate({

            element_html: controlDiv,
            attribute: 'title',
            str: 'Catastro', 
            lang: lang

        });

        special_tools.special_tools_btns.appendChild(controlDiv);

        var enable_catastro = false;
        
        var wms = null;
        
        var basemap_history;
        
        L.DomEvent.addListener(controlDiv, 'click', function(e){
            
            if (L.DomUtil.hasClass(controlDiv, 'special-tools-disable')) {
                          
                    window.setTimeout(function(){

                        map.on('click', map_click);

                    }, 1500);
                
                    L.DomUtil.addClass(controlDiv, 'special-tools-enable');
                    
                    L.DomUtil.removeClass(controlDiv, 'special-tools-disable');

                    let elements_controls = special_tools.controlDiv.querySelectorAll('.special-tools-controls');

                    try {
                        
                        special_tools.only_one_control_active(elements_controls, controlDiv);
                    
                    } catch (e) {};

                    enable_catastro = true;

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
                    
                    wms = L.tileLayer.wms('http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?', {opacity: 1, maxZoom: 18});
                        
                    component_geolocation.layer_control.addBaseLayer(wms, "Catastro");

                    leaflet_control_layers_base = document.querySelector('.leaflet-control-layers-base');
                    
                    leaflet_control_layers_selector = leaflet_control_layers_base.querySelectorAll('.leaflet-control-layers-selector');

                    const last_basemap_index = leaflet_control_layers_selector.length-1;

                    const catastro_input_radio = leaflet_control_layers_selector[last_basemap_index];

                    catastro_input_radio.click();

                }  else {
                    
                    map.off('click', map_click);

                    L.DomUtil.addClass(controlDiv, 'special-tools-disable');
                    
                    L.DomUtil.removeClass(controlDiv, 'special-tools-enable');
                        
                    component_geolocation.layer_control.removeLayer(wms);

                    wms.removeFrom(map);

                    document.querySelectorAll('.leaflet-control-layers-selector')[basemap_history].click();

                    enable_catastro = false;
                    
                }

                L.DomEvent.stop(e);
                
            });
            
        map_click = function(event) {

            if (
                !special_tools.geoman_edition_mode(map)
                && enable_catastro) {

                special_tools.modal_message(special_tools, "Espere hasta que finalice el proceso, obteniendo parcela ...", lang, 20000);

                const bbox = map.getBounds().toBBoxString();

                const point = map.latLngToContainerPoint(event.latlng, map.getZoom());

                const size = map.getSize();

                let options = {};

                options.url = 'http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?request=getFeatureInfo&layers=Catastro&query_layers=Catastro&srs=EPSG:4326&bbox='+bbox+'&height='+size.y+'&width='+size.x+'&x='+point.x+'&y='+point.y;

                let promise = tool.get_catastro_refcat(options);

                promise.then(function(data) {
                    
                    if (!data.success) {
                        
                        special_tools.modal_message(special_tools, data.msg, lang);
                        
                        return;
                        
                    }

                    let content = L.DomUtil.create('div');

                    content.innerHTML = data.content;

                    if (typeof content.querySelectorAll('a')[0] === 'undefined') {

                        special_tools.modal_message(special_tools, "No ha sido posible obtener la parcela. Es posible que el servidor del Catastro esté saturado o la zona seleccionada no tenga una parcela asociada.", lang);

                        return;

                    }

                    const refcat = content.innerText.trim();

                    const refcat_url = content.querySelectorAll('a')[0].href;

                    if (typeof refcat_url !== 'undefined') {

                        let options = {};

                        options.url = 'http://ovc.catastro.meh.es/INSPIRE/wfsCP.aspx?service=WFS&version=2.0&srs=EPSG:3857&request=getfeature&STOREDQUERIE_ID=getneighbourparcel&refcat=' + refcat;
                        options.reference = 1;
                        
                        let promise = tool.get_catastro_feature(options);

                        promise.then(function(data) {

                            if (data.success) {

                                let latlngs = JSON.parse(data.feature);

                                if (typeof latlngs !== 'object') {

                                    special_tools.modal_message(special_tools, "No ha sido posible obtener la parcela. Inténtelo de nuevo.", lang);

                                    return;

                                }

                                const polygon = L.polygon(latlngs);

                                polygon.feature = polygon.toGeoJSON();

                                polygon.feature.special_tools = {};

                                polygon.feature.special_tools.is_catastro = true;

                                polygon.feature.special_tools.geoman_edition = false;

                                polygon.feature.special_tools.tools_id = special_tools.make_id(20);

                                polygon.feature.properties.url = refcat_url;

                                try {

                                    special_tools.modal_message(special_tools, "Creando la parcela ...", lang);

                                    map.fire('pm:create', {layer: polygon});

                                    map.fitBounds(polygon.getBounds());

                                } catch (error) {

                                    special_tools.modal_message(special_tools, "Ha ocurrido un error al intentar crear la parcela.", lang);

                                }

                                L.DomEvent.stop(event);

                            } else {
                                
                                let options = {};

                                options.url = 'http://ovc.catastro.meh.es/INSPIRE/wfsCP.aspx?service=WFS&version=2.0&srs=EPSG:3857&request=getfeature&STOREDQUERIE_ID=getparcel&refcat=' + refcat;
                                options.reference = 0;

                                let promise = tool.get_catastro_feature(options);

                                promise.then(function(_data) {

                                    if (!_data.success) {
                                        
                                        special_tools.modal_message(special_tools, "No ha sido posible obtener la parcela. Inténtelo de nuevo.", lang);

                                        return;

                                    } else {

                                        let latlngs = JSON.parse(_data.feature);

                                        if (typeof latlngs !== 'object') {

                                            special_tools.modal_message(special_tools, "No ha sido posible obtener la parcela. Inténtelo de nuevo.", lang);

                                            return;

                                        }

                                        const polygon = L.polygon(latlngs);

                                        polygon.feature = polygon.toGeoJSON();

                                        polygon.feature.special_tools = {};

                                        polygon.feature.special_tools.is_catastro = true;

                                        polygon.feature.special_tools.geoman_edition = false;

                                        polygon.feature.special_tools.tools_id = special_tools.make_id(20);

                                        polygon.feature.properties.url = refcat_url;

                                        try {

                                            special_tools.modal_message(special_tools, "Creando la parcela ...", lang);

                                            map.fire('pm:create', {layer: polygon});

                                            map.fitBounds(polygon.getBounds());

                                        } catch(error) {

                                            special_tools.modal_message(special_tools, "Ha ocurrido un error al intentar crear la parcela", lang);

                                        }

                                        L.DomEvent.stop(event);

                                    }
                                });
                            }
                        });
                    }
                });

                map.off('click', map_click);

                window.setTimeout(function(){

                    map.on('click', map_click);

                }, 1000);
                
            }
        };

        const false_div = L.DomUtil.create('div');
        
        return false_div;
        
    }
});

L.control.specialToolsCatastro = function (options) {
    
    return new L.Control.SpecialToolsCatastro(options);
    
};
