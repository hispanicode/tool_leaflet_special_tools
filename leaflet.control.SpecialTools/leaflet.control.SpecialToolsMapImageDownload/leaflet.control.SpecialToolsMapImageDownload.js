
L.Control.SpecialToolsMapImageDownload = L.Control.extend({
    
    onAdd: function (map) {

        const self = this;
        
        const special_tools = this.options.special_tools;
        
        const tool = special_tools.options.tool;
        
        const lang = special_tools.options.lang;

        const component_geolocation = special_tools.options.component_geolocation;

        const controlDiv = L.DomUtil.create('div', 'special-tools-map-image-download special-tools-controls special-tools-disable');

        tool.google_translate({

            element_html: controlDiv,
            attribute: 'title',
            str: 'Descargar mapa como imagen', 
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

            map.fire('modal', {
                
                template: ['<div class="modal-header"></div>',
                  '<hr>',
                  '<div class="modal-body"></div>'
                ].join(''),

                width: 'auto',
                
                onShow: function(evt){
                    
                    const modal = evt.modal;

                    const modal_content = modal._container.querySelector('.modal-content');
                    
                    modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    modal_content.style.marginTop = '80px';
                    
                    const modal_header = modal._container.querySelector('.modal-header');
                    
                    const modal_title = L.DomUtil.create('div');
                    modal_title.setAttribute('class', 'special-tools-h1');
                    
                    modal_header.appendChild(modal_title);
                    
                    tool.google_translate({

                        element_html: modal_title,
                        str: "Descargar Mapa", 
                        lang: lang

                    });
                    
                    const modal_body = modal._container.querySelector('.modal-body');
                    
                    const special_tools_div_1 = L.DomUtil.create('div');
                    special_tools_div_1.setAttribute('id', 'special_tools_div_1');
                    special_tools_div_1.setAttribute('class', 'special-tools-container special-tools-div-33');

                    modal_body.appendChild(special_tools_div_1);

                    /********************************************************/

                    const special_tools_span_1 = L.DomUtil.create('span');
                    special_tools_span_1.setAttribute('id', 'special_tools_span_1');

                    tool.google_translate({
                        
                        element_html: special_tools_span_1,
                        str: 'Exportar como: ',
                        lang: lang
                    
                    });

                    special_tools_div_1.appendChild(special_tools_span_1);

                    /********************************************************/

                    const raster_export = L.DomUtil.create('select');
                    raster_export.setAttribute('class', 'special-tools-select');
                    raster_export.setAttribute('id', 'raster_export');

                    special_tools_div_1.appendChild(raster_export);

                    /********************************************************/

                    const special_tools_option_1 = L.DomUtil.create('option');
                    special_tools_option_1.setAttribute('id', 'special_tools_option_1');
                    special_tools_option_1.setAttribute('value', 'tif');
                    special_tools_option_1.setAttribute('selected', 'true');

                    tool.google_translate({
                        
                        element_html: special_tools_option_1,
                        str: 'Raster GeoTiff',
                        lang: lang
                    
                    });

                    raster_export.appendChild(special_tools_option_1);

                    /********************************************************/

                    const special_tools_option_2 = L.DomUtil.create('option');
                    special_tools_option_2.setAttribute('id', 'special_tools_option_2');
                    special_tools_option_2.setAttribute('value', 'png');

                    tool.google_translate({
                        
                        element_html: special_tools_option_2,
                        str: 'png',
                        lang: lang
                    
                    });

                    raster_export.appendChild(special_tools_option_2);

                    /********************************************************/

                    const special_tools_option_3 = L.DomUtil.create('option');
                    special_tools_option_3.setAttribute('id', 'special_tools_option_3');
                    special_tools_option_3.setAttribute('value', 'jpg');

                    tool.google_translate({
                        
                        element_html: special_tools_option_3,
                        str: 'jpg',
                        lang: lang
                    
                    });

                    raster_export.appendChild(special_tools_option_3);

                    /********************************************************/

                    const special_tools_option_4 = L.DomUtil.create('option');
                    special_tools_option_4.setAttribute('id', 'special_tools_option_4');
                    special_tools_option_4.setAttribute('value', 'gif');

                    tool.google_translate({
                        
                        element_html: special_tools_option_4,
                        str: 'gif',
                        lang: lang
                    
                    });

                    raster_export.appendChild(special_tools_option_4);

                    /********************************************************/

                    const special_tools_option_5 = L.DomUtil.create('option');
                    special_tools_option_5.setAttribute('id', 'special_tools_option_5');
                    special_tools_option_5.setAttribute('value', 'webp');

                    tool.google_translate({
                        
                        element_html: special_tools_option_5,
                        str: 'webp',
                        lang: lang
                    
                    });

                    raster_export.appendChild(special_tools_option_5);

                    /********************************************************/

                    const special_tools_div_2 = L.DomUtil.create('div');
                    special_tools_div_2.setAttribute('id', 'special_tools_div_2');
                    special_tools_div_2.setAttribute('class', 'special-tools-container special-tools-div-66');

                    modal_body.appendChild(special_tools_div_2);

                    /********************************************************/

                    const special_tools_span_2 = L.DomUtil.create('span');
                    special_tools_span_2.setAttribute('id', 'special_tools_span_2');

                    tool.google_translate({
                        
                        element_html: special_tools_span_2,
                        str: 'Nombre: ',
                        lang: lang
                    
                    });

                    special_tools_div_2.appendChild(special_tools_span_2);

                    /********************************************************/

                    const raster_name = L.DomUtil.create('input');
                    raster_name.setAttribute('type', 'text');
                    raster_name.setAttribute('id', 'raster_name');
                    raster_name.setAttribute('class', 'special-tools-input-150');

                    tool.google_translate({
                        
                        element_html: raster_name,
                        str: 'archivo',
                        lang: lang,
                        attribute: 'value'
                    
                    });

                    special_tools_div_2.appendChild(raster_name);

                    /********************************************************/
                    
                    const btn_map_download = L.DomUtil.create('button');
                    btn_map_download.id = 'btn_map_download';
                    btn_map_download.setAttribute('class', 'special-tools-btn-success');
                    btn_map_download.style.position = 'relative';
                    btn_map_download.style.top = '4px';
                    
                    special_tools_div_2.appendChild(btn_map_download);
                    
                    /********************************************************/

                    const btn_map_download_img = L.DomUtil.create('img');
                    btn_map_download_img.setAttribute('id', 'btn_map_download_img');
                    btn_map_download_img.setAttribute('src', tool.controls_url() + '/img/direct-download.png');

                    tool.google_translate({
                        
                        element_html: btn_map_download_img,
                        str: 'Descargar imagen',
                        lang: lang,
                        attribute: 'title'
                    
                    });

                    btn_map_download.appendChild(btn_map_download_img);

                    /********************************************************/

                    const special_tools_div_3 = L.DomUtil.create('div');
                    special_tools_div_3.setAttribute('id', 'special_tools_div_3');
                    special_tools_div_3.setAttribute('style', 'clear: left;');

                    modal_body.appendChild(special_tools_div_3);

                    /********************************************************/
                    
                    L.DomEvent.on(btn_map_download, 'click', function() {
 
                        const file_type = raster_export.options[raster_export.selectedIndex].value;

                        if (raster_name.value === '') {
                            
                            special_tools.modal_message(special_tools, "Por favor, indique un nombre para el archivo", lang);

                            return;
                            
                        }

                        map._controlCorners.topright.style.display = 'none';
                        map._controlCorners.topleft.style.display = 'none';
                        map._controlCorners.bottomright.style.display = 'none';
                        map._controlCorners.bottomleft.style.display = 'none';

                        const leaflet_pane = map._container.querySelector('.leaflet-pane');

                        domtoimage.toPng(leaflet_pane, {cacheBust: true, width: leaflet_pane.offsetParent.offsetWidth, height: leaflet_pane.offsetParent.offsetHeight})

                        .then(function (dataUrl) {
                            
                                var tif_bounds;
                                
                                const bounds = map.getBounds();
                                
                                const NW = bounds.getNorthWest();
                                
                                const SE = bounds.getSouthEast();

                                special_tools.modal_message(special_tools, "Descargando ...", lang);

                                if (file_type === 'tif') {

                                    tif_bounds = NW.lng;
                                    tif_bounds = tif_bounds + ' ' + NW.lat;
                                    tif_bounds = tif_bounds + ' ' + SE.lng;
                                    tif_bounds = tif_bounds + ' ' + SE.lat;
                                    
                                    console.log("tif_bounds: " + tif_bounds);
                                    
                                } else {

                                    tif_bounds = null;

                                }

                                let options = {};
                                
                                options.raster_name = special_tools.simple_sanitize_string(raster_name.value);
                                options.file_type = file_type;
                                options.tif_bounds = tif_bounds;
                                options.dataUrl = dataUrl;
                                
                                let promise = tool.map_image_download(options);

                                promise.then(function(data){

                                    if (data.success) {

                                        window.open(data.zip, '_blank');

                                        map._controlCorners.topright.style.display = 'block';
                                        map._controlCorners.topleft.style.display = 'block';
                                        map._controlCorners.bottomright.style.display = 'block';
                                        map._controlCorners.bottomleft.style.display = 'block';
                                        
                                        special_tools.modal_message(special_tools, "Archivo descargando correctamente", lang);

                                    } else {

                                        special_tools.modal_message(special_tools, data.msg, lang);

                                    }

                                });
                                
                            }).catch(function(error) {
 
                                special_tools.modal_message(special_tools, error, lang);
                                
                                map._controlCorners.topright.style.display = 'block';
                                map._controlCorners.topleft.style.display = 'block';
                                map._controlCorners.bottomright.style.display = 'block';
                                map._controlCorners.bottomleft.style.display = 'block';
                                
                            });

                    });
                    
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

L.control.specialToolsMapImageDownload = function (options) {
    
    return new L.Control.SpecialToolsMapImageDownload(options);
    
};

