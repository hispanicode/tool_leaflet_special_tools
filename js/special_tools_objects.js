
export const special_tools_objects = function() {

	return true;
        
};

special_tools_objects.prototype.load = async function(L, special_tools) {
    
    special_tools_objects.prototype.special_tools = special_tools;
    
    L.Control.SpecialToolsObjects = L.Control.extend({

        onAdd: function () {

            const self = special_tools_objects.prototype.special_tools;

            const controlDiv = L.DomUtil.create('div', 'special-tools-objects special-tools-controls special-tools-disable');

            special_tools_objects.prototype.controlDiv = controlDiv;

            self.tool.google_translate({

                element_html: controlDiv,
                attribute: 'title',
                str: 'Objetos', 
                lang: self.lang

            });

            self.special_tools_btns.appendChild(controlDiv);


            L.DomEvent.addListener(controlDiv, 'click', function(){

                L.DomUtil.addClass(controlDiv, 'special-tools-enable');
                L.DomUtil.removeClass(controlDiv, 'special-tools-disable');

                self.only_one_active_control(controlDiv);
                
                special_tools_objects.prototype.create_containers();

                special_tools_objects.prototype.load_modal();
                        
            });

            const false_div = L.DomUtil.create('div');

            return false_div;

        }
    });

    L.control.specialToolsObjects = function (options) {

        return new L.Control.SpecialToolsObjects(options);

    };

};

special_tools_objects.prototype.create_containers = function() {

    const self = this.special_tools;
    
    self.special_tools_title_1 = L.DomUtil.create('div');
    self.special_tools_title_1.setAttribute('class', 'special-tools-h2');

    self.tool.google_translate({

       element_html: self.special_tools_title_1,
       str: "Objetos Vectoriales", 
       lang: self.lang

    });

    /******************************************************************/

    self.special_tools_container_1 = L.DomUtil.create('div');
    self.special_tools_container_1.setAttribute('class', 'special-tools-container');

    /******************************************************************/


    self.collection = self.component_geolocation.FeatureGroup[self.component_geolocation.active_layer_id];

    let layer;

    var leaflet_id;

    var multi_id;
    
    var layer_name;

    if (typeof self.collection === 'object') {

        multi_id = null;

        for (let obj in self.collection._layers) {

            layer = self.collection._layers[obj];
            leaflet_id = layer._leaflet_id;
                
            if (layer.feature.properties.hasOwnProperty('name')) {

                layer_name = layer.feature.properties.name;

            } else if (layer.feature.properties.hasOwnProperty('title')) {

                layer_name = layer.feature.properties.title;

            } else {

                layer_name = special_tools_objects.prototype.translate_nameless();
                layer.feature.properties.name = layer_name;

            }

            let checked = true;

            if (!layer.hasOwnProperty('_icon') && !layer.feature.special_tools.hasOwnProperty('multi_id')) {                       

                if (layer.feature.special_tools.hasOwnProperty('display')) {

                    if (layer.feature.special_tools.display === false) checked = false;

                }
                
            } 

            else if (layer.feature.special_tools.hasOwnProperty('multi_id') && !layer.hasOwnProperty('_icon')) {

                if (layer.feature.special_tools.hasOwnProperty('display')) {

                    if (layer.feature.special_tools.display === false) checked = false;

                }  

                self._multi_id = layer.feature.special_tools.multi_id;

                if (self._multi_id !== multi_id) {

                    multi_id = self._multi_id;

                    /****************************************************/

                    let special_tools_p = L.DomUtil.create('p');
                    self.special_tools_container_1.appendChild(special_tools_p);

                    /****************************************************/

                    let input_checkbox = L.DomUtil.create('input');
                    input_checkbox.type = 'checkbox';
                    input_checkbox.setAttribute('class', 'leaflet-id');
                    input_checkbox.setAttribute('multi-id', multi_id);
                    input_checkbox.checked = checked;

                    special_tools_p.appendChild(input_checkbox);

                    /**************************************************/

                    let span = L.DomUtil.create('span');
                    span.innerHTML = " " + self.max_length_str(layer_name, 35) + " ";

                    special_tools_p.appendChild(span);

                    /**************************************************/

                    let icon_view = L.DomUtil.create('img');
                    icon_view.setAttribute('class', 'icon-view-object');
                    icon_view.setAttribute('multi-id', multi_id);
                    icon_view.setAttribute('src', self.tool.tool_url() + "/img/view.png");
                    icon_view.style.cursor = 'pointer';
                    icon_view.style.position = 'relative';
                    icon_view.style.top = '4px';

                    special_tools_p.appendChild(icon_view);

                }

            }

            else if (layer.hasOwnProperty('_icon')) {

                if (layer.feature.special_tools.hasOwnProperty('icon_display')) {

                    if (layer.feature.special_tools.icon_display === 'none') checked = '';

                }

            }


            if (!layer.feature.special_tools.hasOwnProperty('is_clipPolygon') && !layer.feature.special_tools.hasOwnProperty('multi_id')) {

                /****************************************************/

                let special_tools_p = L.DomUtil.create('p');
                self.special_tools_container_1.appendChild(special_tools_p);

                /****************************************************/

                let input_checkbox = L.DomUtil.create('input');
                input_checkbox.type = 'checkbox';
                input_checkbox.setAttribute('class', 'leaflet-id not-multi-id');
                input_checkbox.setAttribute('leaflet-id', leaflet_id);
                input_checkbox.checked = checked;

                special_tools_p.appendChild(input_checkbox);

                /**************************************************/

                let span = L.DomUtil.create('span');
                span.innerHTML = " " + self.max_length_str(layer_name, 35) + " ";

                special_tools_p.appendChild(span);

                /**************************************************/

                let icon_view = L.DomUtil.create('img');
                icon_view.setAttribute('class', 'icon-view-object not-multi-id');
                icon_view.setAttribute('leaflet-id', leaflet_id);
                icon_view.setAttribute('src', self.tool.tool_url() + "/img/view.png");
                icon_view.style.cursor = 'pointer';
                icon_view.style.position = 'relative';
                icon_view.style.top = '4px';

                special_tools_p.appendChild(icon_view);

            }

        }  
    }

    /******************************************************************/

    self.special_tools_title_2 = L.DomUtil.create('div');
    self.special_tools_title_2.setAttribute('class', 'special-tools-h2');

    self.tool.google_translate({

       element_html: self.special_tools_title_2,
       str: "Objetos Rasterizados", 
       lang: self.lang

    });

    /******************************************************************/

    self.special_tools_container_2 = L.DomUtil.create('div');
    self.special_tools_container_2.setAttribute('class', 'special-tools-container');

    /******************************************************************/

    for (let obj in self.collection._layers) {

        layer = self.collection._layers[obj];
        leaflet_id = layer._leaflet_id;

        if (layer.feature.properties.hasOwnProperty('name')) {
            
            layer_name = layer.feature.properties.name;
            
        } else if (layer.feature.properties.hasOwnProperty('title')) {
            
            layer_name = layer.feature.properties.title;
            
        } else {
            
            layer_name = special_tools_objects.prototype.translate_nameless();
            layer.feature.properties.name = layer_name;
            
        }

        if (layer.feature.special_tools.hasOwnProperty('is_clipPolygon')) {

            let checked = true;
            
            if (layer.feature.special_tools.hasOwnProperty('display')) {

                if (layer.feature.special_tools.display) {

                    checked = true;

                } else {

                    checked = false;

                }
            }

            /****************************************************/

            let special_tools_p = L.DomUtil.create('p');
            self.special_tools_container_2.appendChild(special_tools_p);

            /****************************************************/

            let input_checkbox = L.DomUtil.create('input');
            input_checkbox.type = 'checkbox';
            input_checkbox.setAttribute('class', 'leaflet-id not-multi-id');
            input_checkbox.setAttribute('leaflet-id', leaflet_id);
            input_checkbox.checked = checked;

            special_tools_p.appendChild(input_checkbox);

            /**************************************************/

            let span = L.DomUtil.create('span');
            span.innerHTML = " " + self.max_length_str(layer_name, 35) + " ";

            special_tools_p.appendChild(span);

            /**************************************************/

            let icon_view = L.DomUtil.create('img');
            icon_view.setAttribute('class', 'icon-view-object not-multi-id');
            icon_view.setAttribute('leaflet-id', leaflet_id);
            icon_view.setAttribute('src', self.tool.tool_url() + "/img/view.png");
            icon_view.style.cursor = 'pointer';
            icon_view.style.position = 'relative';
            icon_view.style.top = '4px';

            special_tools_p.appendChild(icon_view);

        }
    }
    
};

special_tools_objects.prototype.load_modal = function() {

    const self = this.special_tools;
    
    self.new_modal('Objetos');

    const modal_body = SpecialToolsModal.getBody();

    /**************************************************************************/

    modal_body.appendChild(self.special_tools_title_1);
    modal_body.appendChild(self.special_tools_container_1);
    modal_body.appendChild(self.special_tools_title_2);
    modal_body.appendChild(self.special_tools_container_2);

    const leaflet_id_inputs = modal_body.querySelectorAll(".leaflet-id");

    try {
        
        for (let index in leaflet_id_inputs) {

            L.DomEvent.on(leaflet_id_inputs[index], 'click', function() {

                var is_multi_id = false;

                if (L.DomUtil.hasClass(this, 'not-multi-id')) {

                    self._leaflet_id = parseInt(this.getAttribute('leaflet-id'));

                } else {

                    self._multi_id = this.getAttribute('multi-id');
                    
                    is_multi_id = true;

                }

                if (this.checked) {

                    if (typeof self.collection === 'object') {

                        if (is_multi_id) {

                            self.map.eachLayer(function(_layer) {

                                if (!_layer.hasOwnProperty('_icon')  && _layer.hasOwnProperty('feature')) {

                                    if (_layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (self._multi_id === _layer.feature.special_tools.multi_id) {

                                            _layer._path.style.display = 'block';
                                            _layer.feature.special_tools.display = true;

                                        }
                                    }

                                } else if (_layer.hasOwnProperty('_icon')  && _layer.hasOwnProperty('feature')) {

                                    if (_layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                            if (self._multi_id === _layer.feature.special_tools.multi_id) {

                                            try {
                                                _layer._icon.style.display = 'block';
                                            } catch(e){};
                                            
                                            _layer.feature.special_tools.icon_display = 'block';

                                            if (_layer.hasOwnProperty('_shadow')) {

                                                if (_layer._shadow !== null) {

                                                    _layer._shadow.style.display = 'block';
                                                    _layer.feature.special_tools.shadow_display = 'block';

                                                }

                                            }
                                        }
                                    }
                                }
                            });

                            return;  

                        }

                        for (let obj in self.collection._layers) {

                            const layer = self.collection._layers[obj];

                            const leaflet_id = self.collection._layers[obj]._leaflet_id;

                            if (
                                    !layer.hasOwnProperty('_icon') 
                                    && !layer.feature.special_tools.hasOwnProperty('is_clipPolygon')
                                    && !is_multi_id
                                ) {

                                if (leaflet_id === self._leaflet_id) {

                                layer._path.style.display = 'block';
                                layer.feature.special_tools.display = true;

                                break;

                                }
                            } 

                            else if (layer.feature.special_tools.hasOwnProperty('is_clipPolygon')) {

                                if (leaflet_id === self._leaflet_id) {

                                    const image_id = layer.feature.special_tools.image_id;

                                    self.map.eachLayer(function(_layer) {

                                       if (_layer.hasOwnProperty('special_tools')) {

                                           if (!_layer.hasOwnProperty('_icon') && _layer.special_tools.hasOwnProperty('image_id')) {

                                               if (image_id === _layer.special_tools.image_id) {

                                                    try {
                                                        _layer._image.style.display = 'block';
                                                    } catch(e) {};

                                                    layer.feature.special_tools.display = true;

                                               }
                                           } else if (_layer.hasOwnProperty('_icon') && _layer.special_tools.hasOwnProperty('image_id')) {

                                                try {                                              
                                                    _layer._icon.style.display = 'block';
                                                } catch(e){};

                                                if (_layer.hasOwnProperty('_shadow')) {

                                                    if (_layer._shadow !== null) {

                                                        _layer._shadow.style.display = 'block';

                                                    }

                                                }

                                                layer.feature.special_tools.display = true;

                                           }
                                       } 

                                    });

                                    break;
                                }
                            }

                            else if (layer.hasOwnProperty('_icon') && !is_multi_id) {

                                if (leaflet_id === self._leaflet_id) {
                                    
                                    try {                               
                                        layer._icon.style.display = 'block';
                                    } catch(e){};
                                    
                                    layer.feature.special_tools.icon_display = 'block';

                                    if (layer.hasOwnProperty('_shadow')) {

                                        if (layer._shadow !== null) {

                                            layer._shadow.style.display = 'block';
                                            layer.feature.special_tools.shadow_display = 'block';

                                        }

                                    }

                                    break;

                                }

                            }   
                        }

                    }

                } else {

                    if (typeof self.collection === 'object') {

                        if (is_multi_id) {

                            self.map.eachLayer(function(_layer) {

                                if (!_layer.hasOwnProperty('_icon') && _layer.hasOwnProperty('feature')) {

                                    if (_layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (self._multi_id === _layer.feature.special_tools.multi_id) {

                                            _layer._path.style.display = 'none';
                                            _layer.feature.special_tools.display = false;

                                        }

                                    }
                                } else if (_layer.hasOwnProperty('_icon')  && _layer.hasOwnProperty('feature')) {

                                    if (_layer.feature.special_tools.hasOwnProperty('multi_id')) {

                                        if (self._multi_id === _layer.feature.special_tools.multi_id) {

                                            try {
                                                _layer._icon.style.display = 'none';
                                            } catch(e){};
                                            
                                            _layer.feature.special_tools.icon_display = 'none';

                                            if (_layer.hasOwnProperty('_shadow')) {

                                                if (_layer._shadow !== null) {

                                                    _layer._shadow.style.display = 'none';
                                                    _layer.feature.special_tools.shadow_display = 'none';

                                                }

                                            }

                                        }

                                    }

                                }
                            });

                            return;

                        }

                        for (let obj in self.collection._layers) {

                            const layer = self.collection._layers[obj];
                            const leaflet_id = self.collection._layers[obj]._leaflet_id;

                            if (
                                    !layer.hasOwnProperty('_icon')  
                                    && !layer.feature.special_tools.hasOwnProperty('is_clipPolygon')
                                    && !is_multi_id
                                ) {

                                if (leaflet_id === self._leaflet_id) {

                                    layer._path.style.display = 'none';
                                    layer.feature.special_tools.display = false;

                                    break;
                                }

                            } 

                            else if (layer.feature.special_tools.hasOwnProperty('is_clipPolygon')) {

                                if (leaflet_id === self._leaflet_id) {

                                    const image_id = layer.feature.special_tools.image_id;

                                    self.map.eachLayer(function(_layer) {

                                       if (_layer.hasOwnProperty('special_tools')) {

                                           if (!_layer.hasOwnProperty('_icon') && _layer.special_tools.hasOwnProperty('image_id')) {

                                                if (image_id === _layer.special_tools.image_id) {

                                                    try {
                                                    
                                                        _layer._image.style.display = 'none';
                                                    
                                                    } catch(e){};

                                                    layer.feature.special_tools.display = false;

                                               }

                                           } else if (_layer.hasOwnProperty('_icon') && _layer.special_tools.hasOwnProperty('image_id')) {

                                                try {
                                                    _layer._icon.style.display = 'none';
                                                } catch(e){};

                                                if (_layer.hasOwnProperty('_shadow')) {

                                                    if (_layer._shadow !== null) {

                                                        _layer._shadow.style.display = 'none';

                                                    }

                                                }

                                                layer.feature.special_tools.display = false;

                                           }
                                       } 
                                       
                                    });

                                    break;
                                }
                            }

                            else if (layer.hasOwnProperty('_icon') && !is_multi_id){

                                if (leaflet_id === self._leaflet_id) {

                                    try {
                                        layer._icon.style.display = 'none';
                                    } 
                                    catch(e){};
                                    
                                    layer.feature.special_tools.icon_display = 'none';

                                    if (layer.hasOwnProperty('_shadow')) {

                                        if (layer._shadow !== null) {

                                            layer._shadow.style.display = 'none';
                                            layer.feature.special_tools.shadow_display = 'none';

                                        }

                                    }

                                    break;

                                }

                            }

                        }

                    }

                }

            });
            
        }

    } catch (e) {}

    try {

        var is_multi_id;

        const icon_view_object = modal_body.querySelectorAll(".icon-view-object");

        for (let index in icon_view_object) {

            L.DomEvent.on(icon_view_object[index], 'click', function() {

                is_multi_id = false;

                self._leaflet_id = parseInt(this.getAttribute('leaflet-id'));

                if (isNaN(self._leaflet_id) && this.hasAttribute('multi-id')) {

                    is_multi_id = true;

                    self._multi_id = this.getAttribute('multi-id');

                } 

                if (typeof self.collection === 'object') {
                    
                    let count_objects = 1;
                    let areas = [];

                    for (let obj in self.collection._layers) {

                        const layer = self.collection._layers[obj];

                        if (!is_multi_id) {

                            var leaflet_id = self.collection._layers[obj]._leaflet_id;

                            if (self._leaflet_id === leaflet_id) {

                                if (layer.hasOwnProperty('_latlng')) {

                                    self.map.setView(layer._latlng, 16);

                                } else {

                                    self.map.fitBounds(layer.getBounds());

                                }

                            }

                        } else {

                            var multi_id = self.collection._layers[obj].feature.special_tools.multi_id;

                            if (self._multi_id === multi_id) {

                                if (layer.hasOwnProperty('_latlng')) {

                                    self.map.setView(layer._latlng, 16);
                                    
                                    break;

                                } else if (self.is_linestring(layer)) {

                                    self.map.fitBounds(layer.getBounds());
                                    
                                    break;

                                } else if (self.is_polygon(layer)) {
                                    
                                    const multi_polygon = self.get_layers_by_multi_id(multi_id);
                                    let feature_collection = new Array();
                                    
                                    for (let x in multi_polygon) {
                                        
                                        feature_collection.push(multi_polygon[x].toGeoJSON());
                                        
                                    }
                                    
                                    const geojson_multi_polygon = turf.featureCollection(feature_collection);
                                    
                                    const to_geojson = L.geoJSON(geojson_multi_polygon);
                                    
                                    self.map.fitBounds(to_geojson.getBounds());
                                    
                                    break;
                                    
                                }

                            }

                        }
                        
                        count_objects++;

                    }
                }
            });

        }

    } catch (e) {}
    
};

special_tools_objects.prototype.translate_nameless = function() {
    
    const self = this.special_tools;
    
    let nameless;
    
    switch(self.lang) {

        case 'lg-spa': 
            nameless = 'Sin nombre';
            break;
        case 'lg-eng':
            nameless = 'Nameless';
            break;
        case 'lg-fra':
            nameless = 'Sans nom';
            break;
        case 'lg-ita':
            nameless = 'Senza nome';
            break;
        case 'lg-por':
            nameless = 'Sem nome';
            break;
        case 'lg-cat':
            nameless = 'Sense nom';
            break;

    }
    
    return nameless;
    
    
};
