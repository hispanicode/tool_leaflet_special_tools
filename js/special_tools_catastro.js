
export const special_tools_catastro = function() {

	return true;
        
};

special_tools_catastro.prototype.load = async function(L, special_tools) {
    
    special_tools_catastro.prototype.special_tools = special_tools;

    L.Control.SpecialToolsCatastro = L.Control.extend({

        onAdd: function() {

            const self = special_tools_catastro.prototype.special_tools;
            
            const controlDiv = L.DomUtil.create('div', 'st-catastro st-controls st-disable');
            controlDiv.innerText = 'Catast';
            
            special_tools_catastro.prototype.controlDiv = controlDiv;
            
            self.tool.google_translate({

                element_html: controlDiv,
                attribute: 'title',
                str: 'Catastro', 
                lang: self.lang

            });

            self.special_tools_btns.appendChild(controlDiv);
            
            self.enable_catastro = false;

            self.wms_catastro = null;

            self.basemap_history = null;

            L.DomEvent.addListener(controlDiv, 'click', function(e) {
                
            if (L.DomUtil.hasClass(controlDiv, 'st-disable')) {

                special_tools_catastro.prototype.catastro_on();

            }  else {

                special_tools_catastro.prototype.catastro_off();

            }

            L.DomEvent.stop(e);
  
            });

            const false_div = L.DomUtil.create('div');

            return false_div;

        }

    });

    L.control.specialToolsCatastro = function (options) {

        return new L.Control.SpecialToolsCatastro(options);

    };
    
};

special_tools_catastro.prototype.catastro_on = function() {
    
    const _this = this;
    const self = this.special_tools;
    
    window.setTimeout(function(){

        self.map.on('click', _this.map_click);

    }, 1500);

    self.only_one_active_control(_this.controlDiv);
    
    self.enable_catastro = true;

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

    self.wms_catastro = L.tileLayer.wms('http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?', {opacity: 1, maxZoom: 18});

    self.component_geolocation.layer_control.addBaseLayer(self.wms_catastro, "Catastro");

    leaflet_control_layers_base = document.querySelector('.leaflet-control-layers-base');

    leaflet_control_layers_selector = leaflet_control_layers_base.querySelectorAll('.leaflet-control-layers-selector');

    const last_basemap_index = leaflet_control_layers_selector.length-1;

    const catastro_input_radio = leaflet_control_layers_selector[last_basemap_index];

    catastro_input_radio.click();
    
};

special_tools_catastro.prototype.catastro_off = function() {
    
    const _this = this;
    const self = this.special_tools;
   
    self.map.off('click', _this.map_click);

    L.DomUtil.addClass(_this.controlDiv, 'st-disable');

    L.DomUtil.removeClass(_this.controlDiv, 'st-enable');

    self.component_geolocation.layer_control.removeLayer(self.wms_catastro);

    self.wms_catastro.removeFrom(self.map);

    document.querySelectorAll('.leaflet-control-layers-selector')[self.basemap_history].click();

    self.enable_catastro = false;
    
};

special_tools_catastro.prototype.map_click = function(event) {
    
    const _this = special_tools_catastro.prototype;
    const self = _this.special_tools;

    if (
        !self.geoman_edition_mode(self.map)
        && self.enable_catastro) {

        self.modal_message("Espere hasta que finalice el proceso, obteniendo parcela ...", 20000);

        const bbox = self.map.getBounds().toBBoxString();

        const point = self.map.latLngToContainerPoint(event.latlng, self.map.getZoom());

        const size = self.map.getSize();

        let options = {};

        options.url = 'http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?request=getFeatureInfo&layers=Catastro&query_layers=Catastro&srs=EPSG:4326&bbox='+bbox+'&height='+size.y+'&width='+size.x+'&x='+point.x+'&y='+point.y;

        let promise = self.tool.get_catastro_refcat(options);

        promise.then(function(data) {

            if (!data.success) {

                self.modal_message(data.msg);

                return;

            }

            let content = L.DomUtil.create('div');

            content.innerHTML = data.content;

            if (typeof content.querySelectorAll('a')[0] === 'undefined') {

                self.modal_message("No ha sido posible obtener la parcela. Es posible que el servidor del Catastro esté saturado o la zona seleccionada no tenga una parcela asociada.");

                return;

            }

            const refcat = content.innerText.trim();

            const refcat_url = content.querySelectorAll('a')[0].href;

            if (typeof refcat_url !== 'undefined') {

                let options = {};

                options.url = 'http://ovc.catastro.meh.es/INSPIRE/wfsCP.aspx?service=WFS&version=2.0&srs=EPSG:3857&request=getfeature&STOREDQUERIE_ID=getneighbourparcel&refcat=' + refcat;
                options.reference = 1;

                let promise = self.tool.get_catastro_feature(options);

                promise.then(function(data) {

                    if (data.success) {

                        let latlngs = JSON.parse(data.feature);

                        if (typeof latlngs !== 'object') {

                            self.modal_message("No ha sido posible obtener la parcela. Inténtelo de nuevo.");

                            return;

                        }

                        const polygon = L.polygon(latlngs);

                        polygon.feature = polygon.toGeoJSON();

                        polygon.feature.special_tools = {};

                        polygon.feature.special_tools.is_catastro = true;

                        polygon.feature.special_tools.geoman_edition = false;

                        polygon.feature.special_tools.tools_id = self.make_id(20);

                        polygon.feature.properties.url = refcat_url;

                        try {

                            self.modal_message("Creando la parcela ...");

                            self.map.fire('pm:create', {layer: polygon});

                            self.map.fitBounds(polygon.getBounds());

                        } catch (error) {

                            self.modal_message("Ha ocurrido un error al intentar crear la parcela.");

                        }

                        L.DomEvent.stop(event);

                    } else {

                        let options = {};

                        options.url = 'http://ovc.catastro.meh.es/INSPIRE/wfsCP.aspx?service=WFS&version=2.0&srs=EPSG:3857&request=getfeature&STOREDQUERIE_ID=getparcel&refcat=' + refcat;
                        options.reference = 0;

                        let promise = self.tool.get_catastro_feature(options);

                        promise.then(function(_data) {

                            if (!_data.success) {

                                self.modal_message("No ha sido posible obtener la parcela. Inténtelo de nuevo.");

                                return;

                            } else {

                                let latlngs = JSON.parse(_data.feature);

                                if (typeof latlngs !== 'object') {

                                    self.modal_message("No ha sido posible obtener la parcela. Inténtelo de nuevo.");

                                    return;

                                }

                                const polygon = L.polygon(latlngs);

                                polygon.feature = polygon.toGeoJSON();

                                polygon.feature.special_tools = {};

                                polygon.feature.special_tools.is_catastro = true;

                                polygon.feature.special_tools.geoman_edition = false;

                                polygon.feature.special_tools.tools_id = self.make_id(20);

                                polygon.feature.properties.url = refcat_url;

                                try {

                                    self.modal_message("Creando la parcela ...");

                                    self.map.fire('pm:create', {layer: polygon});

                                    self.map.fitBounds(polygon.getBounds());

                                } catch(error) {

                                    self.modal_message("Ha ocurrido un error al intentar crear la parcela");

                                }

                                L.DomEvent.stop(event);

                            }
                        });
                    }
                });
            }
        });

        self.map.off('click', _this.map_click);

        window.setTimeout(function(){

            self.map.on('click', _this.map_click);

        }, 1000);
    }  
};