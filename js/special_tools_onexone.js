
export const special_tools_onexone = function() {

	return true;
        
};

special_tools_onexone.prototype.load = async function(L, special_tools) {
    
    special_tools_onexone.prototype.special_tools = special_tools;
    
    L.Control.SpecialToolsOneXOne = L.Control.extend({

        onAdd: function () {

            const self = special_tools_onexone.prototype.special_tools;

            const controlDiv = L.DomUtil.create('div', 'special-tools-oneXone special-tools-controls special-tools-disable');
            controlDiv.innerText = '1x1';

            special_tools_onexone.prototype.controlDiv = controlDiv;
            
            self.tool.google_translate({

                element_html: controlDiv,
                attribute: 'title',
                str: 'Crear polígono de 1x1', 
                lang: self.lang

            });

            self.special_tools_btns.appendChild(controlDiv);
            
            L.DomEvent.on(controlDiv, 'click', function(e) {

                if (L.DomUtil.hasClass(controlDiv, 'special-tools-disable')) {

                    L.DomUtil.addClass(controlDiv, 'special-tools-enable');
                    L.DomUtil.removeClass(controlDiv, 'special-tools-disable');

                    self.only_one_active_control(controlDiv);

                    self.enable_oneXone = true;

                }  else {

                    L.DomUtil.addClass(controlDiv, 'special-tools-disable');
                    L.DomUtil.removeClass(controlDiv, 'special-tools-enable');
                    
                    self.enable_oneXone = false;

                }

                special_tools_onexone.prototype.oneXone_event();
                
                L.DomEvent.preventDefault(e);
                
                        
            });
            
            const false_div = L.DomUtil.create('div');

            return false_div;
            
        }
        
    });
    
    L.control.specialToolsOneXOne = function (options) {

        return new L.Control.SpecialToolsOneXOne(options);

    };
    
};

special_tools_onexone.prototype.oneXone_event = function() {
    
    const _this = this;
    
    const self = this.special_tools;
    
    self.map.eachLayer(function(layer) {

        if (!(layer instanceof L.TileLayer)) {

            if (self.is_point(layer) && !self.is_centroid(layer)) {

                L.DomEvent.on(layer, 'click', function() {

                    if (!self.enable_oneXone) return;

                    if  (!self.geoman_edition_mode(self.map) && !self.is_oneXone(this)) {

                        const multi_id = self.make_id(20);

                        if (!self.is_special_tools(this)) {

                            this.feature.special_tools = {};
                        }

                        this.feature.special_tools.is_oneXone = true;
                        this.feature.special_tools.oneXone_type = 'Marker';
                        this.feature.special_tools.geoman_edition = false;
                        this.feature.special_tools.tools_id = self.make_id(20);
                        this.feature.special_tools.multi_id = multi_id;

                        const radiusMts = 1;

                        const bounds = L.latLng(this._latlng).toBounds(radiusMts);

                        const rectangle = L.rectangle(bounds);

                        rectangle.feature = rectangle.toGeoJSON();
                        rectangle.feature.special_tools = {};
                        rectangle.feature.special_tools.is_oneXone = true;
                        rectangle.feature.special_tools.oneXone_type = 'Rectangle';
                        rectangle.feature.special_tools.tools_id = self.make_id(20);
                        rectangle.feature.special_tools.multi_id = multi_id;
                        rectangle.feature.special_tools.is_incertidumbre = true;
                        rectangle.feature.special_tools.on_incertidumbre = true;
                         
                        self.map.fire('pm:create', {layer: rectangle});

                        rectangle.fireEvent('click');

                        L.DomUtil.addClass(_this.controlDiv, 'special-tools-enable');
                        L.DomUtil.removeClass(_this.controlDiv, 'special-tools-disable');
                        
                        self.enable_oneXone = true;

                        L.DomEvent.off(layer);

                    }
                });
            }
        }
    });
};


