
L.Control.SpecialToolsGeolocation = L.Control.extend({
    
    onAdd: function (map) {
        
        const self = this;
        
        const special_tools = this.options.special_tools;
        
        const tool = special_tools.options.tool;
        
        const lang = special_tools.options.lang;

        const component_geolocation = special_tools.options.component_geolocation;

        const controlDiv = L.DomUtil.create('div', 'special-tools-geolocation special-tools-controls special-tools-disable');

        tool.google_translate({

            element_html: controlDiv,
            attribute: 'title',
            str: 'Geolocalización', 
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
            
            map.locate({
                
                setView: true, 
                maxZoom: 16,
                enableHighAccuracy: true,
                timeout: 14000
            
            });
            
            map.on('locationfound', function(e){
                
                if (L.DomUtil.hasClass(controlDiv, 'special-tools-disable')) {
                    
                    return;
                    
                }
                
                const marker = L.marker(e.latlng);
                marker.feature = marker.toGeoJSON();
                marker.feature.special_tools = {};
                marker.feature.special_tools.tools_id = special_tools.make_id(20);
                
                map.fire('pm:create', {layer: marker});

                map.setView(e.latlng, 16);
                
                map.stopLocate();
                
                L.DomUtil.addClass(controlDiv, 'special-tools-disable');
                L.DomUtil.removeClass(controlDiv, 'special-tools-enable');

                L.DomEvent.preventDefault(e);
                
            });
            
            map.on('locationerror', function(e){
                
                special_tools.modal_message(special_tools, "No ha sido posible encontrar la localización", lang);
                
                L.DomUtil.addClass(controlDiv, 'special-tools-disable');
                L.DomUtil.removeClass(controlDiv, 'special-tools-enable');
                
                L.DomEvent.preventDefault(e);
                
            });
            
        });
               
        const false_div = L.DomUtil.create('div');
        
        return false_div;
        
    }
});

L.control.specialToolsGeolocation = function (options) {
    
    return new L.Control.SpecialToolsGeolocation(options);
    
};
