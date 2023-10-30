
L.Control.SpecialToolsObjects = L.Control.extend({
    
    onAdd: function (map) {
        
        const self = this;
        
        const special_tools = this.options.special_tools;
        
        const tool = special_tools.options.tool;
        
        const lang = special_tools.options.lang;
        
        const component_geolocation = special_tools.options.component_geolocation;

        const controlDiv = L.DomUtil.create('div', 'special-tools-objects special-tools-controls special-tools-disable');
 
         tool.google_translate({

            element_html: controlDiv,
            attribute: 'title',
            str: 'Objetos', 
            lang: lang

        });
 
        special_tools.special_tools_btns.appendChild(controlDiv);
        
        
        L.DomEvent.addListener(controlDiv, 'click', function(){
            
            
            L.DomUtil.addClass(controlDiv, 'special-tools-enable');
            L.DomUtil.removeClass(controlDiv, 'special-tools-disable');
            
            let elements_controls = special_tools.controlDiv.querySelectorAll('.special-tools-controls');

            try {
                
                special_tools.only_one_control_active(elements_controls, controlDiv);
                
            } catch (e) {};
            
            /******************************************************************/
            
            const special_tools_title_1 = L.DomUtil.create('div');
            special_tools_title_1.setAttribute('class', 'special-tools-h2');
            
            tool.google_translate({

               element_html: special_tools_title_1,
               str: "Objectos Vectoriales", 
               lang: lang

            });
            
            /******************************************************************/
            
            const special_tools_container_1 = L.DomUtil.create('div');
            special_tools_container_1.setAttribute('class', 'special-tools-container');
            
            /******************************************************************/
            
            
            let collection = component_geolocation.FeatureGroup[component_geolocation.active_layer_id];

            let layer;
            
            var leaflet_id;
            
            var multi_id;
            
            if (typeof collection === 'object') {
                
                    multi_id = null;
                    
                    for (let obj in collection._layers) {
                        
                        layer = collection._layers[obj];
                        leaflet_id = layer._leaflet_id;
                        
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
                        
                            const _multi_id = layer.feature.special_tools.multi_id;
                            
                            if (_multi_id !== multi_id) {
                                
                                multi_id = _multi_id;
                                
                                /****************************************************/
                                
                                let special_tools_p = L.DomUtil.create('p');
                                special_tools_container_1.appendChild(special_tools_p);
                                
                                /****************************************************/
                                
                                let input_checkbox = L.DomUtil.create('input');
                                input_checkbox.type = 'checkbox';
                                input_checkbox.setAttribute('class', 'leaflet-id');
                                input_checkbox.setAttribute('multi-id', multi_id);
                                input_checkbox.checked = checked;
                                
                                special_tools_p.appendChild(input_checkbox);
                                
                                /**************************************************/
                                
                                let span = L.DomUtil.create('span');
                                span.innerText = " multi_id: " + multi_id + " ";
                                
                                special_tools_p.appendChild(span);
                                
                                /**************************************************/
                                
                                let icon_view = L.DomUtil.create('img');
                                icon_view.setAttribute('class', 'icon-view-object');
                                icon_view.setAttribute('multi-id', multi_id);
                                icon_view.setAttribute('src', tool.controls_url() + "/img/view.png");
                                icon_view.style.cursor = 'pointer';
                                icon_view.style.position = 'relative';
                                icon_view.style.top = '4px';

                                special_tools_p.appendChild(icon_view);
                                
                                /***************************************************/
                                //icon_edit = "<img class='icon-edit-object'  multi-id='" + multi_id + "' src='" + tool.controls_url() + "/img/edit.png' style='cursor: pointer'>";
                            
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
                            special_tools_container_1.appendChild(special_tools_p);

                            /****************************************************/
                        
                            let input_checkbox = L.DomUtil.create('input');
                            input_checkbox.type = 'checkbox';
                            input_checkbox.setAttribute('class', 'leaflet-id not-multi-id');
                            input_checkbox.setAttribute('leaflet-id', leaflet_id);
                            input_checkbox.checked = checked;

                            special_tools_p.appendChild(input_checkbox);

                            /**************************************************/
                            
                            let span = L.DomUtil.create('span');
                            span.innerText = " id: " + leaflet_id + " ";

                            special_tools_p.appendChild(span);

                            /**************************************************/

                            let icon_view = L.DomUtil.create('img');
                            icon_view.setAttribute('class', 'icon-view-object not-multi-id');
                            icon_view.setAttribute('leaflet-id', leaflet_id);
                            icon_view.setAttribute('src', tool.controls_url() + "/img/view.png");
                            icon_view.style.cursor = 'pointer';
                            icon_view.style.position = 'relative';
                            icon_view.style.top = '4px';

                            special_tools_p.appendChild(icon_view);

                            /***************************************************/
                            
                            //icon_edit = "<img class='icon-edit-object not-multi-id' leaflet-id='" + leaflet_id + "' src='" + tool.controls_url() + "/img/edit.png' style='cursor: pointer'>";
                        
                        }
                        
                    }  
            }

            
            /******************************************************************/
            
            const special_tools_title_2 = L.DomUtil.create('div');
            special_tools_title_2.setAttribute('class', 'special-tools-h2');
            
            tool.google_translate({

               element_html: special_tools_title_2,
               str: "Objectos Rasterizados", 
               lang: lang

            });
            
            /******************************************************************/
            
            const special_tools_container_2 = L.DomUtil.create('div');
            special_tools_container_2.setAttribute('class', 'special-tools-container');
            
            /******************************************************************/
            
            for (let obj in collection._layers) {
                
                layer = collection._layers[obj];
                leaflet_id = layer._leaflet_id;
                
                
                if (layer.feature.special_tools.hasOwnProperty('is_clipPolygon')) {
                    
                    checked = true
                    ;
                    if (layer.feature.special_tools.hasOwnProperty('display')) {
                        
                        if (layer.feature.special_tools.display) {
                            
                            checked = true;
                            
                        } else {
                            
                            checked = false;
                            
                        }
                    }
                    
                    /****************************************************/

                    let special_tools_p = L.DomUtil.create('p');
                    special_tools_container_2.appendChild(special_tools_p);

                    /****************************************************/

                    let input_checkbox = L.DomUtil.create('input');
                    input_checkbox.type = 'checkbox';
                    input_checkbox.setAttribute('class', 'leaflet-id not-multi-id');
                    input_checkbox.setAttribute('leaflet-id', leaflet_id);
                    input_checkbox.checked = checked;

                    special_tools_p.appendChild(input_checkbox);

                    /**************************************************/

                    let span = L.DomUtil.create('span');
                    span.innerText = " id: " + leaflet_id + " ";

                    special_tools_p.appendChild(span);

                    /**************************************************/

                    let icon_view = L.DomUtil.create('img');
                    icon_view.setAttribute('class', 'icon-view-object not-multi-id');
                    icon_view.setAttribute('leaflet-id', leaflet_id);
                    icon_view.setAttribute('src', tool.controls_url() + "/img/view.png");
                    icon_view.style.cursor = 'pointer';
                    icon_view.style.position = 'relative';
                    icon_view.style.top = '4px';

                    special_tools_p.appendChild(icon_view);

                    /***************************************************/
                    //icon_edit = "<img class='icon-edit-object not-multi-id' leaflet-id='" + leaflet_id + "' src='" + tool.controls_url() + "/img/edit.png' style='cursor: pointer'>";
                }
            }
            
            map.fire('modal', {

                template: ['<div class="modal-header"></div>',
                  '<hr>',
                  '<div class="modal-body"></div>'
                ].join(''),

                width: 'auto',

                onShow: function(evt) {

                    const modal = evt.modal;

                    const modal_content = modal._container.querySelector('.modal-content');
                    
                    modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    modal_content.style.marginTop = '80px';
                    
                    const modal_header = modal._container.querySelector('.modal-header');
                    
                    const modal_title = L.DomUtil.create('div');
                    modal_title.setAttribute('class', 'special-tools-h1');
                    
                    modal_header.appendChild(modal_title);
                 
                    tool.google_translate({

                        element_html: modal_title,
                        str: "Objetos", 
                        lang: lang

                    });
                    
                    const modal_body = modal._container.querySelector('.modal-body');
                    
                    modal_body.appendChild(special_tools_title_1);
                    modal_body.appendChild(special_tools_container_1);
                    modal_body.appendChild(special_tools_title_2);
                    modal_body.appendChild(special_tools_container_2);
                    
                    const leaflet_id_inputs = modal._container.querySelectorAll(".leaflet-id");

                    try {
                        for (let index in leaflet_id_inputs) {

                            L.DomEvent.on(leaflet_id_inputs[index], 'click', function(){
                                
                                var is_multi_id = false;
                                
                                if (L.DomUtil.hasClass(this, 'not-multi-id')) {
                                
                                    _leaflet_id = parseInt(this.getAttribute('leaflet-id'));
                                    
                                } else {
                                    
                                    _multi_id = this.getAttribute('multi-id');
                                    is_multi_id = true;
                                    
                                }

                                if (this.checked) {
                                    
                                    if (typeof collection === 'object') {

                                        if (is_multi_id) {
                                                
                                            map.eachLayer(function(_layer){
                                                
                                                if (!_layer.hasOwnProperty('_icon')  && _layer.hasOwnProperty('feature')) {
                                                    
                                                    if (_layer.feature.special_tools.hasOwnProperty('multi_id')) {
                                                        
                                                        if (_multi_id === _layer.feature.special_tools.multi_id) {

                                                            _layer._path.style.display = 'block';
                                                            _layer.feature.special_tools.display = true;

                                                        }
                                                    }
                                                    
                                                } else if (_layer.hasOwnProperty('_icon')  && _layer.hasOwnProperty('feature')) {
                                                    
                                                    if (_layer.feature.special_tools.hasOwnProperty('multi_id')) {
                                                        
                                                            if (_multi_id === _layer.feature.special_tools.multi_id) {
                                                                
                                                            _layer._icon.style.display = 'block';
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
                                        
                                        for (let obj in collection._layers) {
                                            
                                            const layer = collection._layers[obj];
                                            
                                            const leaflet_id = collection._layers[obj]._leaflet_id;

                                            if (
                                                    !layer.hasOwnProperty('_icon') 
                                                    && !layer.feature.special_tools.hasOwnProperty('is_clipPolygon')
                                                    && !is_multi_id
                                                ) {
                                            
                                                if (leaflet_id === _leaflet_id) {

                                                layer._path.style.display = 'block';
                                                layer.feature.special_tools.display = true;
                                                
                                                break;
                                                    
                                                }
                                            } 
                                            
                                            else if (layer.feature.special_tools.hasOwnProperty('is_clipPolygon')) {
                                                
                                                if (leaflet_id === _leaflet_id) {
                                                    
                                                    const image_id = layer.feature.special_tools.image_id;
                                                    
                                                    map.eachLayer(function(_layer){
                                                        
                                                       if (_layer.hasOwnProperty('special_tools')) {
                                                           
                                                           if (!_layer.hasOwnProperty('_icon') && _layer.special_tools.hasOwnProperty('image_id')) {
                                                               
                                                               if (image_id === _layer.special_tools.image_id) {
                                                                   
                                                                  _layer._image.style.display = 'block';
                                                                  
                                                                  layer.feature.special_tools.display = true;
                                                                  
                                                               }
                                                           } else if (_layer.hasOwnProperty('_icon') && _layer.special_tools.hasOwnProperty('image_id')) {

                                                                _layer._icon.style.display = 'block';

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
                                                
                                                if (leaflet_id === _leaflet_id) {
                                                    
                                                    layer._icon.style.display = 'block';
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
                                    
                                    if (typeof collection === 'object') {
                                        
                                        if (is_multi_id) {

                                            map.eachLayer(function(_layer){
                                                
                                                if (!_layer.hasOwnProperty('_icon') && _layer.hasOwnProperty('feature')) {
                                                    
                                                    if (_layer.feature.special_tools.hasOwnProperty('multi_id')) {
                                                        
                                                        if (_multi_id === _layer.feature.special_tools.multi_id) {

                                                            _layer._path.style.display = 'none';
                                                            _layer.feature.special_tools.display = false;

                                                        }
                                                        
                                                    }
                                                } else if (_layer.hasOwnProperty('_icon')  && _layer.hasOwnProperty('feature')) {
                                                    
                                                    if (_layer.feature.special_tools.hasOwnProperty('multi_id')) {
                                                    
                                                        if (_multi_id === _layer.feature.special_tools.multi_id) {
                                                                                                                   
                                                            _layer._icon.style.display = 'none';
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
                                        
                                        for (let obj in collection._layers) {
                                            
                                            const layer = collection._layers[obj];
                                            const leaflet_id = collection._layers[obj]._leaflet_id;
                                            
                                            if (
                                                    !layer.hasOwnProperty('_icon')  
                                                    && !layer.feature.special_tools.hasOwnProperty('is_clipPolygon')
                                                    && !is_multi_id
                                                ) {

                                                if (leaflet_id === _leaflet_id) {
                                                    
                                                    layer._path.style.display = 'none';
                                                    layer.feature.special_tools.display = false;
                                                    
                                                    break;
                                                }
                                            
                                            } 
                                            
                                            else if (layer.feature.special_tools.hasOwnProperty('is_clipPolygon')) {
                                                
                                                if (leaflet_id === _leaflet_id) {
                                                    
                                                    const image_id = layer.feature.special_tools.image_id;
                                                    
                                                    map.eachLayer(function(_layer){
                                                        
                                                       if (_layer.hasOwnProperty('special_tools')) {
                                                           
                                                           if (!_layer.hasOwnProperty('_icon') && _layer.special_tools.hasOwnProperty('image_id')) {
                                                               
                                                                if (image_id === _layer.special_tools.image_id) {
                                                                   
                                                                  _layer._image.style.display = 'none';
                                                                  
                                                                  layer.feature.special_tools.display = false;
                                                                  
                                                               }
                                                               
                                                           } else if (_layer.hasOwnProperty('_icon') && _layer.special_tools.hasOwnProperty('image_id')) {

                                                                _layer._icon.style.display = 'none';

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
                                                
                                                if (leaflet_id === _leaflet_id) {
                                                    
                                                    layer._icon.style.display = 'none';
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
                        
                        let is_multi_id;
                        
                        const icon_view_object = modal._container.querySelectorAll(".icon-view-object");
                        
                        for (let index in icon_view_object) {

                            L.DomEvent.on(icon_view_object[index], 'click', function(){

                                is_multi_id = false;
                                
                                _leaflet_id = parseInt(this.getAttribute('leaflet-id'));
                                
                                if (isNaN(_leaflet_id) && this.hasAttribute('multi-id')) {
                                    
                                    is_multi_id = true;
                                    
                                    _multi_id = this.getAttribute('multi-id');
                                    
                                } 
                                    
                                if (typeof collection === 'object') {

                                    for (let obj in collection._layers) {
                                        
                                        const layer = collection._layers[obj];

                                        if (!is_multi_id) {
                                            
                                            leaflet_id = collection._layers[obj]._leaflet_id;

                                            if (_leaflet_id === leaflet_id) {

                                                if (layer.hasOwnProperty('_icon')) {
                                                    
                                                    map.setView(layer._latlng, 16);
                                                    
                                                } else {
                                                    
                                                    map.fitBounds(layer.getBounds());
                                                    
                                                }

                                            }
                                            
                                        } else {
                                            
                                            multi_id = collection._layers[obj].feature.special_tools.multi_id;
                                            
                                            if (_multi_id === multi_id) {

                                                if (layer.hasOwnProperty('_icon')) {
                                                    
                                                    map.setView(layer._latlng, 16);
                                                    
                                                } else {
                                                    
                                                    map.fitBounds(layer.getBounds());
                                                    
                                                }
                                                
                                                break;
                                                
                                            }
                                            
                                        }

                                    }
                                }
                            });
                            
                        }
                        
                    } catch (e) {}

                },
                
                onHide: function(){
                    
                    L.DomUtil.addClass(controlDiv, 'special-tools-disable');
                    L.DomUtil.removeClass(controlDiv, 'special-tools-enable');
                    
                }
            });
        });
               
        const false_div = L.DomUtil.create('div');
        
        return false_div;
        
    }
});

L.control.specialToolsObjects = function (options) {
    
    return new L.Control.SpecialToolsObjects(options);
    
};