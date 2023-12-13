
export const special_tools_map_image_download = function() {

	return true;
        
};

special_tools_map_image_download.prototype.load = async function(L, special_tools) {
    
    special_tools_map_image_download.prototype.special_tools = special_tools;
    
    L.Control.SpecialToolsMapImageDownload = L.Control.extend({

        onAdd: function () {

            const self = special_tools_map_image_download.prototype.special_tools;
            
            const controlDiv = L.DomUtil.create('div', 'special-tools-map-image-download special-tools-controls special-tools-disable');

            special_tools_map_image_download.prototype.controlDiv = controlDiv;

            self.tool.google_translate({

                element_html: controlDiv,
                attribute: 'title',
                str: 'Descargar mapa como imagen', 
                lang: self.lang

            });

            self.special_tools_btns.appendChild(controlDiv);

            L.DomEvent.addListener(controlDiv, 'click', function(){

                L.DomUtil.addClass(controlDiv, 'special-tools-enable');
                L.DomUtil.removeClass(controlDiv, 'special-tools-disable');

                self.only_one_active_control(controlDiv);
                
                special_tools_map_image_download.prototype.load_modal();

            });

            const false_div = L.DomUtil.create('div');

            return false_div;

        }
    });

    L.control.specialToolsMapImageDownload = function (options) {

        return new L.Control.SpecialToolsMapImageDownload(options);

    };

    
};

special_tools_map_image_download.prototype.load_modal = function() {
    
    const _this = this;
    
    const self = this.special_tools;
    
    const modal = self.new_modal("Descargar mapa");

    const modal_body = modal._container.querySelector('.modal-body');

    /**************************************************************************/

    const special_tools_div_1 = L.DomUtil.create('div');
    special_tools_div_1.setAttribute('id', 'special_tools_div_1');
    special_tools_div_1.setAttribute('class', 'special-tools-container special-tools-div-33');

    modal_body.appendChild(special_tools_div_1);

    /********************************************************/

    const special_tools_span_1 = L.DomUtil.create('span');
    special_tools_span_1.setAttribute('id', 'special_tools_span_1');

    self.tool.google_translate({

        element_html: special_tools_span_1,
        str: 'Exportar como:',
        lang: self.lang

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

    self.tool.google_translate({

        element_html: special_tools_option_1,
        str: 'Raster GeoTiff',
        lang: self.lang

    });

    raster_export.appendChild(special_tools_option_1);

    /********************************************************/

    const special_tools_option_2 = L.DomUtil.create('option');
    special_tools_option_2.setAttribute('id', 'special_tools_option_2');
    special_tools_option_2.setAttribute('value', 'png');

    self.tool.google_translate({

        element_html: special_tools_option_2,
        str: 'png',
        lang: self.lang

    });

    raster_export.appendChild(special_tools_option_2);

    /********************************************************/

    const special_tools_option_3 = L.DomUtil.create('option');
    special_tools_option_3.setAttribute('id', 'special_tools_option_3');
    special_tools_option_3.setAttribute('value', 'jpg');

    self.tool.google_translate({

        element_html: special_tools_option_3,
        str: 'jpg',
        lang: self.lang

    });

    raster_export.appendChild(special_tools_option_3);

    /********************************************************/

    const special_tools_option_4 = L.DomUtil.create('option');
    special_tools_option_4.setAttribute('id', 'special_tools_option_4');
    special_tools_option_4.setAttribute('value', 'gif');

    self.tool.google_translate({

        element_html: special_tools_option_4,
        str: 'gif',
        lang: self.lang

    });

    raster_export.appendChild(special_tools_option_4);

    /********************************************************/

    const special_tools_option_5 = L.DomUtil.create('option');
    special_tools_option_5.setAttribute('id', 'special_tools_option_5');
    special_tools_option_5.setAttribute('value', 'webp');

    self.tool.google_translate({

        element_html: special_tools_option_5,
        str: 'webp',
        lang: self.lang

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

    self.tool.google_translate({

        element_html: special_tools_span_2,
        str: 'Nombre:',
        lang: self.lang

    });

    special_tools_div_2.appendChild(special_tools_span_2);

    /********************************************************/

    const raster_name = L.DomUtil.create('input');
    raster_name.setAttribute('type', 'text');
    raster_name.setAttribute('id', 'raster_name');
    raster_name.setAttribute('class', 'special-tools-input-150');

    self.tool.google_translate({

        element_html: raster_name,
        str: 'archivo',
        lang: self.lang,
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
    btn_map_download_img.setAttribute('src', self.tool.tool_url() + '/img/direct-download.png');
    
    const _compute = compute('#ffffff');

    btn_map_download_img.style.filter = _compute.result.filterRaw;

    self.tool.google_translate({

        element_html: btn_map_download_img,
        str: 'Descargar imagen',
        lang: self.lang,
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

            self.modal_message("Por favor, indique un nombre para el archivo");

            return;

        }
        
        _this.control_corners_display('none');

        const leaflet_pane = self.map._container.querySelector('.leaflet-pane');

        domtoimage.toPng(leaflet_pane, {cacheBust: true, width: leaflet_pane.offsetParent.offsetWidth, height: leaflet_pane.offsetParent.offsetHeight})

        .then(function (dataUrl) {

                var tif_bounds;

                const bounds = self.map.getBounds();

                const _NW = bounds.getNorthWest();

                const _SE = bounds.getSouthEast();

                self.modal_message("Descargando ...");

                if (file_type === 'tif') {

                    const NW = self.epsg4326_to_Epsg3857([_NW.lng, _NW.lat]);
                    const SE = self.epsg4326_to_Epsg3857([_SE.lng, _SE.lat]);
                    
                    tif_bounds = NW[0];
                    tif_bounds = tif_bounds + ' ' + NW[1];
                    tif_bounds = tif_bounds + ' ' + SE[0];
                    tif_bounds = tif_bounds + ' ' + SE[1];

                } else {

                    tif_bounds = null;

                }

                let options = {};
                
                options.raster_name = self.simple_sanitize_string(raster_name.value);
                options.file_type = file_type;
                options.tif_bounds = tif_bounds;
                options.dataUrl = dataUrl;

                let promise = self.tool.map_image_download(options);

                promise.then(function(data){

                    if (data.success) {

                        window.open(data.zip, '_blank');
                        
                        _this.control_corners_display('block');
                        
                        self.modal_message("Archivo descargado correctamente");

                    } else {

                        self.modal_message(data.msg);

                    }

                });

            }).catch(function(error) {

                self.modal_message(error);
                
                _this.control_corners_display('block');

            });

    });
    
};

special_tools_map_image_download.prototype.control_corners_display = function(display) {
    
    const self = this.special_tools;
    
    self.map._controlCorners.topright.style.display = display;
    self.map._controlCorners.topleft.style.display = display;
    self.map._controlCorners.bottomright.style.display = display;
    self.map._controlCorners.bottomleft.style.display = display;
    
};