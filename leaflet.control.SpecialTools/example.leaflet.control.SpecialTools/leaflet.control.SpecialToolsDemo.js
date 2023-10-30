/*
 * Author: Manuel Jesús Dávila González
 * e-mail: manudavgonz@gmail.com
 */
L.Control.SpecialToolsDemo = L.Control.extend({
    
    onAdd: function (map) {
        
        const self = this;
        
        const special_tools = this.options.special_tools;

        const tool = special_tools.options.tool;
        
        const lang = special_tools.options.lang;

        const component_geolocation = special_tools.options.component_geolocation;

        const controlDiv = L.DomUtil.create('div', 'special-tools-demo special-tools-controls special-tools-disable');


        special_tools.special_tools_btns.appendChild(controlDiv);
        

        L.DomEvent.addListener(controlDiv, 'click', function(){
            
            L.DomUtil.addClass(controlDiv, 'special-tools-enable');
            L.DomUtil.removeClass(controlDiv, 'special-tools-disable');
            
            let elements_controls = special_tools.controlDiv.querySelectorAll('.special-tools-controls');

            try {
                special_tools.only_one_control_active(elements_controls, controlDiv);
            } catch (e) {};

            map.fire('modal', {
                
              template: ['<div class="modal-header"></div>',
                '<hr>',
                '<div class="modal-body"></div>'
              ].join(''),

              width: 'auto',
                
                onShow: function(evt){
                    
                    modal = evt.modal;
                    
                    modal._container.querySelector('.modal-content').style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                    
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

L.control.specialToolsDemo = function (options) {
    
    return new L.Control.SpecialToolsDemo(options);
    
};
