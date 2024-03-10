

export const special_tools_geolocation = function() {

	return true;
        
};

special_tools_geolocation.prototype.load = async function(L, special_tools) {
    
    special_tools_geolocation.prototype.special_tools = special_tools;
    
    L.Control.SpecialToolsGeolocation = L.Control.extend({

        onAdd: function () {
            
            const self = special_tools_geolocation.prototype.special_tools;
            
            const controlDiv = L.DomUtil.create('div', 'st-geolocation st-controls st-disable');
            
            special_tools_geolocation.prototype.controlDiv = controlDiv;
            
            self.tool.google_translate({

                element_html: controlDiv,
                attribute: 'title',
                str: 'Geolocalización',
                lang: self.lang

            });

            self.special_tools_btns.appendChild(controlDiv);
            
            L.DomEvent.addListener(controlDiv, 'click', function() {

                L.DomUtil.addClass(controlDiv, 'st-enable');
                L.DomUtil.removeClass(controlDiv, 'st-disable');

                self.only_one_active_control(controlDiv);

                special_tools_geolocation.prototype.locate();
                
                special_tools_geolocation.prototype.location_found_event();
                
                special_tools_geolocation.prototype.location_error_event();

            });

            const false_div = L.DomUtil.create('div');

            return false_div;

        }

    });
    
  
    L.control.specialToolsGeolocation = function (options) {

        return new L.Control.SpecialToolsGeolocation(options);

    };
    
};

special_tools_geolocation.prototype.locate = function() {
    
     const self = this.special_tools;
    
    self.map.locate({

        setView: true, 
        maxZoom: 16,
        enableHighAccuracy: true,
        timeout: 14000

    });
    
};

special_tools_geolocation.prototype.location_found_event = function() {
    
    const _this = this;
    const self = this.special_tools;
    
    self.map.on('locationfound', function(e){

        if (L.DomUtil.hasClass(_this.controlDiv, 'st-disable')) {

            return;

        }

        const marker = L.marker(e.latlng);
        marker.feature = marker.toGeoJSON();
        marker.feature.special_tools = {};
        marker.feature.special_tools.tools_id = self.make_id(20);

        self.map.fire('pm:create', {layer: marker});

        self.map.setView(e.latlng, 16);

        self.map.stopLocate();

        L.DomUtil.addClass(_this.controlDiv, 'st-disable');
        L.DomUtil.removeClass(_this.controlDiv, 'st-enable');

        L.DomEvent.preventDefault(e);

    });
    
};

special_tools_geolocation.prototype.location_error_event = function() {
    
    const _this = this;
    const self = this.special_tools;
    
    self.map.on('locationerror', function(e){

        self.modal_message("No ha sido posible encontrar la localización");

        L.DomUtil.addClass(_this.controlDiv, 'st-disable');
        L.DomUtil.removeClass(_this.controlDiv, 'st-enable');

        L.DomEvent.preventDefault(e);

    });
    
};

