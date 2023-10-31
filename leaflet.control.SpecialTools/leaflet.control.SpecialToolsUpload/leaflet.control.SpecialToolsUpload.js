
L.Control.SpecialToolsUpload = L.Control.extend({
    
    onAdd: function (map) {
        
        const self = this;
        
        const special_tools = this.options.special_tools;
        
        const tool = special_tools.options.tool;
        
        const lang = special_tools.options.lang;
        
        const component_geolocation = special_tools.options.component_geolocation;

        const controlDiv = L.DomUtil.create('div', 'special-tools-upload special-tools-controls special-tools-disable');

        tool.google_translate({

            element_html: controlDiv,
            attribute: 'title',
            str: 'Subida de archivos', 
            lang: lang

        });

        this.modal = null;
        
        const _this = this;

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

                onShow: function(evt) {

                    const modal = evt.modal;
                    
                    _this.modal = modal;

                    const modal_content = modal._container.querySelector('.modal-content');
                    
                    modal_content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    modal_content.style.marginTop = '80px';
                    
                    const modal_header = modal._container.querySelector('.modal-header');
                    
                    const modal_title = L.DomUtil.create('div');
                    modal_title.setAttribute('class', 'special-tools-h1');
                    
                    modal_header.appendChild(modal_title);
                 
                    tool.google_translate({

                        element_html: modal_title,
                        str: "Subida de archivos", 
                        lang: lang

                    });
                    
                    const modal_body = modal._container.querySelector('.modal-body');

                    const vector_layers_title_div = L.DomUtil.create('div');
                    vector_layers_title_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(vector_layers_title_div);
                    
                    const vector_layers_title = L.DomUtil.create('div');
                    vector_layers_title.setAttribute('class', 'special-tools-h2');
                    
                    tool.google_translate({

                        element_html: vector_layers_title,
                        str: "Capas Vectoriales", 
                        lang: lang

                    });
                    
                    vector_layers_title_div.appendChild(vector_layers_title);

                    const select_file_div = L.DomUtil.create('div');
                    select_file_div.setAttribute('class', 'special-tools-container special-tools-div-40');
                    
                    modal_body.appendChild(select_file_div);
                    
                    const select_file_span = L.DomUtil.create('span');
                    
                    tool.google_translate({

                       element_html: select_file_span,
                       str: "Seleccione el tipo de archivo: ", 
                       lang: lang

                    });
                    
                    select_file_div.appendChild(select_file_span);
                    
                    const file_type = L.DomUtil.create('select');
                    file_type.id = 'file_type';
                    file_type.setAttribute('class', 'special-tools-select');
                    
                    select_file_div.appendChild(file_type);
                    
                    const option_shape = L.DomUtil.create('option');
                    option_shape.value = 'shape';
                    option_shape.selected = true;
                    option_shape.innerText = 'Shape (*.zip)';
                    
                    file_type.appendChild(option_shape);
                    
                    const option_geojson = L.DomUtil.create('option');
                    option_geojson.value = 'geojson';
                    option_geojson.innerText = '(*.geojson)';
                    
                    file_type.appendChild(option_geojson);
                    
                    const option_kml = L.DomUtil.create('option');
                    option_kml.value = 'kml';
                    option_kml.innerText = '(*.kml)';
                    
                    file_type.appendChild(option_kml);
                    
                    const vector_upload_div = L.DomUtil.create('div');
                    vector_upload_div.setAttribute('class', 'special-tools-container special-tools-div-60');

                    modal_body.appendChild(vector_upload_div);
                    
                    const vector_upload_span = L.DomUtil.create('span');
                    
                    tool.google_translate({

                       element_html: vector_upload_span,
                       str: "Seleccione el archivo: ", 
                       lang: lang

                    });
                    
                    vector_upload_div.appendChild(vector_upload_span);
                    
                    const vector_upload = L.DomUtil.create('input');
                    vector_upload.type = 'file';
                    vector_upload.name = 'vector_upload';
                    vector_upload.id = 'vector_upload';
                    vector_upload.setAttribute('class', 'special-tools-input-file');
                    
                    vector_upload_div.appendChild(vector_upload);

                    const clear_div = L.DomUtil.create('div');
                    clear_div.style.clear = 'left';
                    
                    modal_body.appendChild(clear_div);

                    const btn_vector_upload_div = L.DomUtil.create('div');
                    btn_vector_upload_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(btn_vector_upload_div);
                    
                    const btn_vector_upload = L.DomUtil.create('button');
                    btn_vector_upload.type = 'button';
                    btn_vector_upload.id = 'btn_vector_upload';
                    btn_vector_upload.setAttribute('class', 'special-tools-btn-default');
                    
                    tool.google_translate({

                       element_html: btn_vector_upload,
                       str: "Subir archivo", 
                       lang: lang

                    });
                    
                    btn_vector_upload_div.appendChild(btn_vector_upload);
                    
                    const btn_list_projections = L.DomUtil.create('button');
                    btn_list_projections.type = 'button';
                    btn_list_projections.id = 'btn_list_projections';
                    btn_list_projections.setAttribute('class', 'special-tools-btn-info');
                    btn_list_projections.style.fontSize = '9px';
                    
                    tool.google_translate({

                       element_html: btn_list_projections,
                       str: "Proyecciones por defecto", 
                       lang: lang

                    });
                    
                    btn_vector_upload_div.appendChild(btn_list_projections);
                    
                    const info_div = L.DomUtil.create('div');
                    info_div.setAttribute('class', 'special-tools-container');
                    
                    tool.google_translate({

                       element_html: info_div,
                       str: "Incluir proyección para UTM (Universal Transverse Mercator) en el caso de que no se encuentre entre las proyecciones por defecto (Asegúrese de que el archivo que va a subir viene proyectado. Por ejemplo: urn:ogc:def:crs:EPSG::32619", 
                       lang: lang

                    });
                    
                    modal_body.appendChild(info_div);

                    const project_div = L.DomUtil.create('div');
                    project_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(project_div);
                    
                    const project_EPSG_span = L.DomUtil.create('span');
                    project_EPSG_span.innerText = "EPSG: ";
                    
                    project_div.appendChild(project_EPSG_span);
                    
                    const project_crs = L.DomUtil.create('input');
                    project_crs.type = 'text';
                    project_crs.id = 'project_crs';
                    project_crs.setAttribute('class', 'special-tools-input-50');
                    project_crs.setAttribute('placeholder', '32619');
                    
                    project_div.appendChild(project_crs);
                    
                    /*****************************************************/
                    
                    const project_zone_span = L.DomUtil.create('span');
                    project_zone_span.innerText = "zone: ";
                    
                    project_div.appendChild(project_zone_span);
                    
                    const project_zone = L.DomUtil.create('input');
                    project_zone.type = 'text';
                    project_zone.id = 'project_zone';
                    project_zone.setAttribute('class', 'special-tools-input-25');
                    project_zone.setAttribute('placeholder', '19');
                    
                    project_div.appendChild(project_zone);
                    
                    /***************************************************/
                    
                    const project_band_span = L.DomUtil.create('span');
                    project_band_span.innerText = "band: ";
                    
                    project_div.appendChild(project_band_span);
                    
                    const project_band = L.DomUtil.create('input');
                    project_band.type = 'text';
                    project_band.id = 'project_band';
                    project_band.setAttribute('class', 'special-tools-input-25');
                    project_band.setAttribute('placeholder', 'N');
                    
                    project_div.appendChild(project_band);
                    
                    const link_epsg_io = L.DomUtil.create('a');
                    link_epsg_io.id = 'link_epsg_io';
                    link_epsg_io.target = '_blank';
                    link_epsg_io.innerText = 'https://epsg.io/';
                    link_epsg_io.href = 'https://epsg.io/';
                    
                    project_div.appendChild(link_epsg_io);

                    const list_projections_div = L.DomUtil.create('div');
                    list_projections_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(list_projections_div);
                    
                    const list_projections = L.DomUtil.create('div');
                    list_projections.id = 'list_projections';
                    list_projections.setAttribute('class', 'special-tools-display-none');

                    tool.google_translate({

                       element_html: list_projections,
                       str: "A continuación se listan las proyecciones por defecto: EPSG:4230 EPSG:4326 EPSG:4258 EPSG:3857 EPSG:32628 EPSG:32629 EPSG:32630 EPSG:32631 EPSG:25828 EPSG:25829 EPSG:25830 EPSG:25831 EPSG:23028 EPSG:23029 EPSG:23030 EPSG:23031 EPSG:4082 EPSG:4083", 
                       lang: lang

                    });
                    
                    list_projections_div.appendChild(list_projections);

                    const hr = L.DomUtil.create('hr');
                    modal_body.appendChild(hr);

                    const images_title_div = L.DomUtil.create('div');
                    images_title_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(images_title_div);
                    
                    const images_title = L.DomUtil.create('div');
                    images_title.setAttribute('class', 'special-tools-h2');
                    
                    tool.google_translate({

                       element_html: images_title,
                       str: "Imágenes", 
                       lang: lang

                    });
                    
                    images_title_div.appendChild(images_title);
                           
                    const btn_image_upload_div = L.DomUtil.create('div');
                    btn_image_upload_div.setAttribute('class', 'special-tools-container special-tools-div-20');
                    
                    modal_body.appendChild(btn_image_upload_div);
                    
                    const btn_image_upload = L.DomUtil.create('button');
                    btn_image_upload.type = 'button';
                    btn_image_upload.id = 'btn_image_upload';
                    btn_image_upload.setAttribute('class', 'special-tools-btn-default');
                    
                    tool.google_translate({

                       element_html: btn_image_upload,
                       str: "Subir imagen", 
                       lang: lang

                    });
                    
                    btn_image_upload_div.appendChild(btn_image_upload);
                    
                    /**************************************************/
                    
                    const btn_get_image_upload_div = L.DomUtil.create('div');
                    btn_get_image_upload_div.setAttribute('class', 'special-tools-container special-tools-div-20');
                    
                    modal_body.appendChild(btn_get_image_upload_div);
                    
                    const btn_get_image_upload = L.DomUtil.create('button');
                    btn_get_image_upload.type = 'button';
                    btn_get_image_upload.id = 'btn_get_image_upload';
                    btn_get_image_upload.setAttribute('class', 'special-tools-btn-success special-tools-visibility-hide');
                    
                    tool.google_translate({

                       element_html: btn_get_image_upload,
                       str: "Obtener la imagen", 
                       lang: lang

                    });
                    
                    btn_get_image_upload_div.appendChild(btn_get_image_upload);
                    
                    /**********************************************************/
                   
                    const btn_add_image_to_map_div = L.DomUtil.create('div');
                    btn_add_image_to_map_div.setAttribute('class', 'special-tools-container special-tools-div-20');
                    
                    modal_body.appendChild(btn_add_image_to_map_div);
                    
                    const btn_add_image_to_map = L.DomUtil.create('button');
                    btn_add_image_to_map.type = 'button';
                    btn_add_image_to_map.id = 'btn_add_image_to_map';
                    btn_add_image_to_map.setAttribute('class', 'special-tools-btn-primary special-tools-visibility-hide');
                    
                    tool.google_translate({

                       element_html: btn_add_image_to_map,
                       str: "Añadir la imagen al mapa", 
                       lang: lang

                    });
                    
                    btn_add_image_to_map_div.appendChild(btn_add_image_to_map);

                    modal_body.appendChild(clear_div.cloneNode(true));

                    const box_image = L.DomUtil.create('div');
                    box_image.setAttribute('class', 'special-tools-container');
                    modal_body.appendChild(box_image);
                    
                    const box_image_config = L.DomUtil.create('div');
                    box_image_config.id = 'box_image_config';
                    box_image_config.setAttribute('class', 'special-tools-visibility-hide special-tools-text-info');
                    box_image.appendChild(box_image_config);
                    
                    const box_image_msg = L.DomUtil.create('div');
                    box_image_msg.id = 'box_image_msg';
                    box_image_config.appendChild(box_image_msg);
                    
                    const image_preview = L.DomUtil.create('img');
                    image_preview.id = 'image_preview';
                    image_preview.style.width = '100%';
                    image_preview.style.padding = '8px';
                    image_preview.setAttribute('class', 'special-tools-visibility-hide');
                    
                    box_image_config.appendChild(image_preview);

                    L.DomEvent.on(btn_list_projections, 'click', function(){
                        
                        if (L.DomUtil.hasClass(list_projections, 'special-tools-display-none')) {
                           
                            L.DomUtil.removeClass(list_projections, 'special-tools-display-none');
                            L.DomUtil.addClass(list_projections, 'special-tools-display-block');
                        
                        } else {
                            
                            L.DomUtil.removeClass(list_projections, 'special-tools-display-block');
                            L.DomUtil.addClass(list_projections, 'special-tools-display-none');
                        }
                        
                    });

                    L.DomEvent.on(project_crs, 'keyup', function(){

                        link_epsg_io.href = 'https://epsg.io/' + special_tools.strip_tags(this.value);
                        link_epsg_io.innerText = 'https://epsg.io/' + special_tools.simple_sanitize_string(this.value);

                    });

                    L.DomEvent.on(btn_vector_upload, 'click', function() {
 
                        let EPSG = {
                            
                            "EPSG_4230": {crs: "urn:ogc:def:crs:EPSG::4230", zone: null, band: null},
                            "EPSG_4326": {crs: "urn:ogc:def:crs:EPSG::4326", zone: null, band: null},
                            "EPSG_4258": {crs: "urn:ogc:def:crs:EPSG::4258", zone: null, band: null},
                            "EPSG_3857": {crs: "urn:ogc:def:crs:EPSG::3857", zone: null, band: null},
                            "EPSG_CRS84": {crs: "urn:ogc:def:crs:OGC:1.3:CRS84", zone: null, band: null},
                            "EPSG_32628": {crs: "urn:ogc:def:crs:EPSG::32628", zone: 28, band: "N"},
                            "EPSG_32629": {crs: "urn:ogc:def:crs:EPSG::32629", zone: 29, band: "N"},
                            "EPSG_32630": {crs: "urn:ogc:def:crs:EPSG::32630", zone: 30, band: "N"},
                            "EPSG_32631": {crs: "urn:ogc:def:crs:EPSG::32631", zone: 31, band: "N"},
                            "EPSG_25828": {crs: "urn:ogc:def:crs:EPSG::25828", zone: 28, band: "N"},
                            "EPSG_25829": {crs: "urn:ogc:def:crs:EPSG::25829", zone: 29, band: "N"},
                            "EPSG_25830": {crs: "urn:ogc:def:crs:EPSG::25830", zone: 30, band: "N"},
                            "EPSG_25831": {crs: "urn:ogc:def:crs:EPSG::25831", zone: 31, band: "N"},
                            "EPSG_23028": {crs: "urn:ogc:def:crs:EPSG::23028", zone: 28, band: "N"},
                            "EPSG_23029": {crs: "urn:ogc:def:crs:EPSG::23029", zone: 29, band: "N"},
                            "EPSG_23030": {crs: "urn:ogc:def:crs:EPSG::23030", zone: 30, band: "N"},
                            "EPSG_23031": {crs: "urn:ogc:def:crs:EPSG::23031", zone: 31, band: "N"},
                            "EPSG_4082": {crs: "urn:ogc:def:crs:EPSG::4082", zone: 27, band: "N"},
                            "EPSG_4083": {crs: "urn:ogc:def:crs:EPSG::4083", zone: 28, band: "N"}

                        };

                        if (project_crs.value !== '' && project_zone.value !== '' && project_band.value !== '') {
  
                            EPSG['EPSG_NEW'] = {
                                
                                crs: 'urn:ogc:def:crs:EPSG::' + project_crs.value,
                                zone: parseInt(project_zone.value),
                                band: project_band.value
                                
                            };
                            
                        }

                        const selected_file = file_type.options[file_type.selectedIndex].value;

                        if (typeof vector_upload.files[0] === 'undefined') {

                            special_tools.modal_message(special_tools, "No se ha seleccionado ningún archivo", lang);
                            
                            return;
                            
                        }
                        
                        if (selected_file === 'shape') {
                            
                            if (vector_upload.files[0].type !== 'application/zip') {
                                
                                special_tools.modal_message(special_tools, "El archivo shape tiene que ir comprimido en un archivo .zip", lang);
                                
                                return;
                                
                            }
                            
                        }
                        
                        if (selected_file === 'geojson') {
                            
                            if (vector_upload.files[0].type !== 'application/geo+json') {
                                
                                special_tools.modal_message(special_tools, "El archivo que estás intentando subir no es un archivo .geojson", lang);
                                
                                return;
                                
                            }
                            
                        }
                        
                        if (selected_file === 'kml') {
                            
                            if (vector_upload.files[0].type !== 'application/vnd.google-earth.kml+xml') {
                                
                                special_tools.modal_message(special_tools, "El archivo que estás intentando subir no es un archivo .kml", lang);
                                
                                return;
                                
                            }
                            
                        }
                        
                        if (vector_upload.files.length === 1) {
                            
                            formData = new FormData();
                            formData.append('file_type', selected_file);
                            formData.append("file_upload", vector_upload.files[0]);
                            formData.append('uploads_path', tool.uploads_path());

                        } else {
                            
                            special_tools.modal_message(special_tools, "Por favor, seleccione un archivo", lang);
                            
                            return;
                            
                        }
                        
                        tool.create_tmp_file(formData)
                        .then(function(_data) {
                            
                            let options = {};
                            options.section_id = component_geolocation.section_id;
                            options.section_tipo = component_geolocation.section_tipo;
                            options.component_tipo = component_geolocation.component_tipo;
                            options.tipo = component_geolocation.tipo;
                            options.lang = component_geolocation.lang;
                            options.section_lang = component_geolocation.section_lang;

                            options.name = _data.name;
                            options.size = _data.size;
                            options.type = _data.type;

                            tool.vector_upload(options).then(function(data){

                                if (!data.success) {
                                    
                                    special_tools.modal_message(special_tools, data.msg, lang);

                                    return;

                                }

                                if (data.type === 'application/zip') {
                                    
                                    let shpfile;

                                    try {

                                    shpfile = new L.Shapefile(

                                        data.shape, 

                                        {
                                            importUrl: tool.controls_url() + '/external-lib/leaflet.shapefile/shp.js'
                                        }

                                    );

                                    } catch(e) {
                                        
                                        special_tools.modal_message(special_tools, 'El archivo shape no es válido', lang);

                                        return;

                                    }

                                    let is_valid_shape = false;

                                    shpfile.once("data:loaded", function() {

                                        is_valid_shape = true;

                                        const GEOJSON = shpfile.toGeoJSON();
                                        
                                        const OBJECTS_GEOJSON = _this.project(GEOJSON, EPSG);

                                        for (let index in OBJECTS_GEOJSON) {

                                            let max_fit = 1;

                                            for (let obj in OBJECTS_GEOJSON[index]) {

                                                window.setTimeout(function(){

                                                    map.fire("pm:create", {layer: OBJECTS_GEOJSON[index][obj]});

                                                }, 100);

                                                if (max_fit === 1) {

                                                    if (special_tools.is_point(OBJECTS_GEOJSON[index][obj])) {

                                                       map.panTo(OBJECTS_GEOJSON[index][obj].getLatLng()); 

                                                    } else if (
                                                            
                                                        special_tools.is_linestring(OBJECTS_GEOJSON[index][obj])
                                                        || special_tools.is_polygon(OBJECTS_GEOJSON[index][obj])
                                                        
                                                        ) {

                                                        map.fitBounds(OBJECTS_GEOJSON[index][obj].getBounds());

                                                    }
                                                    max_fit = 0;
                                                }
                                            }
                                        }

                                        modal._container.querySelector('.close').click();
                                        
                                        special_tools.modal_message(special_tools, "Archivo subido correctamente.", lang);

                                        return;

                                    });
                                    window.setTimeout(function(){

                                        if (!is_valid_shape) {

                                            special_tools.modal_message(special_tools, 'El archivo .zip está dañado o no contiene los ficheros adecuados.', lang);

                                        }

                                    }, 1500);
                                } 

                                else if (data.type === 'application/geo+json') {

                                    const GEOJSON = JSON.parse(data.geojson);

                                    if (GEOJSON.hasOwnProperty('feature') && GEOJSON.hasOwnProperty('features')) {

                                        special_tools.modal_message(special_tools, 'El archivo .geojson no es válido', lang);

                                        return;
                                    }

                                    const OBJECTS_GEOJSON = _this.project(GEOJSON, EPSG);

                                    for (let index in OBJECTS_GEOJSON) {

                                        let max_fit = 1;

                                        for (let obj in OBJECTS_GEOJSON[index]) {

                                            window.setTimeout(function(){

                                                map.fire("pm:create", {layer: OBJECTS_GEOJSON[index][obj]});

                                            }, 100);

                                            if (max_fit === 1) {

                                                if (special_tools.is_point(OBJECTS_GEOJSON[index][obj])) {

                                                   map.panTo(OBJECTS_GEOJSON[index][obj].getLatLng()); 

                                                } else if (
                                                    special_tools.is_linestring(OBJECTS_GEOJSON[index][obj])
                                                    || special_tools.is_polygon(OBJECTS_GEOJSON[index][obj])
                                                    ) {

                                                    map.fitBounds(OBJECTS_GEOJSON[index][obj].getBounds());

                                                }
                                                
                                                max_fit = 0;
                                                
                                            }
                                        }
                                    }
                                    
                                    modal._container.querySelector('.close').click();

                                    special_tools.modal_message(special_tools, "Archivo subido correctamente.", lang);
                                    
                                    return;

                                } else if (data.type === 'application/vnd.google-earth.kml+xml') {

                                    const parser = new DOMParser();
                                    let kml;

                                    try {

                                        kml = parser.parseFromString(data.kml, 'text/xml');

                                    } catch(e) {
                                        
                                        special_tools.modal_message(special_tools, 'El archivo .kml no es válido', lang);

                                        return;

                                    }

                                    const track = new L.KML(kml);

                                    const GEOJSON = track.toGeoJSON();

                                    const OBJECTS_GEOJSON = _this.project(GEOJSON, EPSG);

                                    for (let index in OBJECTS_GEOJSON) {

                                        let max_fit = 1;

                                        for (let obj in OBJECTS_GEOJSON[index]) {

                                                window.setTimeout(function(){

                                                    map.fire("pm:create", {layer: OBJECTS_GEOJSON[index][obj]});

                                                }, 100);

                                            if (max_fit === 1) {

                                                if (special_tools.is_point(OBJECTS_GEOJSON[index][obj])) {

                                                   map.panTo(OBJECTS_GEOJSON[index][obj].getLatLng()); 

                                                } else if (
                                                    special_tools.is_linestring(OBJECTS_GEOJSON[index][obj])
                                                    || special_tools.is_polygon(OBJECTS_GEOJSON[index][obj])
                                                    ) {

                                                    map.fitBounds(OBJECTS_GEOJSON[index][obj].getBounds());

                                                }
                                                max_fit = 0;
                                            }
                                        }
                                    }

                                    modal._container.querySelector('.close').click();
                                    
                                    special_tools.modal_message(special_tools, "Archivo subido correctamente.", lang);

                                    return;

                                } 
                                
                            });

                        });

                    });

                    /********END VECTOR UPLOAD**********/

                    L.DomEvent.on(btn_image_upload, 'click', function() {

                        window.setTimeout(function(){
                            
                            L.DomUtil.removeClass(btn_get_image_upload, 'special-tools-visibility-hide');
                            L.DomUtil.addClass(btn_get_image_upload, 'special-tools-visibility-visible');  
                        
                        }, 8000);

                        L.DomUtil.removeClass(btn_get_image_upload, 'special-tools-visibility-visible');
                        L.DomUtil.addClass(btn_get_image_upload, 'special-tools-visibility-hide');
                        L.DomUtil.removeClass(btn_add_image_to_map, 'special-tools-visibility-visible');
                        L.DomUtil.addClass(btn_add_image_to_map, 'special-tools-visibility-hide');
                        L.DomUtil.removeClass(box_image_config, 'special-tools-visibility-visible');
                        L.DomUtil.addClass(box_image_config, 'special-tools-visibility-hide');
                        L.DomUtil.removeClass(image_preview, 'special-tools-visibility-visible');
                        L.DomUtil.addClass(image_preview, 'special-tools-visibility-hide');

                        let to_stored_image_data = tool.get_tool_upload();

                            to_stored_image_data
                            .then(function(val) {

                                stored_image_data_item = val;

                                L.DomEvent.on(btn_get_image_upload, 'click', function() {
                                    
                                let get_uploaded_image = tool.get_uploaded_image(stored_image_data_item);

                                get_uploaded_image.then(function(url) {

                                    if (url === null) {
                                        
                                        special_tools.modal_message(special_tools, "Previamente debes subir la imagen.", lang);

                                        L.DomUtil.removeClass(btn_get_image_upload, 'special-tools-visibility-visible');
                                        L.DomUtil.addClass(btn_get_image_upload, 'special-tools-visibility-hide');
                                        L.DomUtil.removeClass(btn_add_image_to_map, 'special-tools-visibility-visible');
                                        L.DomUtil.addClass(btn_add_image_to_map, 'special-tools-visibility-hide');
                                        L.DomUtil.removeClass(box_image_config, 'special-tools-visibility-visible');
                                        L.DomUtil.addClass(box_image_config, 'special-tools-visibility-hide');

                                    } else {


                                        L.DomUtil.removeClass(btn_add_image_to_map, 'special-tools-visibility-hide');
                                        L.DomUtil.addClass(btn_add_image_to_map, 'special-tools-visibility-visible');
                                        L.DomUtil.removeClass(box_image_config, 'special-tools-visibility-hide');
                                        L.DomUtil.addClass(box_image_config, 'special-tools-visibility-visible');

                                        image_preview.src = url;

                                        if (url.substr(url.length - 4) === '.tif') {
                                            
                                            tool.google_translate({

                                                element_html: box_image_msg,
                                                str: 'La imagen: ' + url + ' tiene el formato el formato (*.tif). Asegúrese de que está georreferenciada', 
                                                lang: lang

                                            });
                                            
                                            image_preview.style.display = 'none';
                                            L.DomUtil.removeClass(image_preview, 'special-tools-visibility-visible');
                                            L.DomUtil.addClass(image_preview, 'special-tools-visibility-hide');

                                        } else {
                                            
                                            tool.google_translate({

                                                element_html: box_image_msg,
                                                str: 'La imagen se ajustará al contexto actual del mapa', 
                                                lang: lang

                                            });

                                            image_preview.style.display = 'block';
                                            L.DomUtil.addClass(image_preview, 'special-tools-visibility-visible');
                                            L.DomUtil.removeClass(image_preview, 'special-tools-visibility-hide');

                                        }
                                    } 
                                });
                            });
                        });
                    });

                    L.DomEvent.on(btn_add_image_to_map, 'click', function(){

                        var url = image_preview.src;
                        
                        let point1;
                        let point2;
                        let point3;

                        special_tools.modal_message(special_tools, "Cargando la imagen ...", lang, 20000);

                        if (url.substr(url.length - 4) === '.tif') {
                            
                            fetch(url)
                            
                                .then(response => {
                                    
                                    return response.arrayBuffer();

                                })
                                .then(parseGeoraster)
                                .then(georaster => {
                                   
                                    var _layer = new GeoRasterLayer({
                                        
                                        georaster: georaster
                                
                                    });
                                    
                                    try {
                                        
                                        point1 = _layer.getBounds().getNorthWest();
                                        point2 = _layer.getBounds().getNorthEast();
                                        point3 = _layer.getBounds().getSouthWest();
                                        
                                    } catch(e) {
                                        
                                        special_tools.modal_message(special_tools, "La imagen .tif no es válida o no está georreferenciada.", lang);
                                        
                                        return;
                                        
                                    }
                                    
                                    let options = {};
                                    
                                    options.url = url;
                                    
                                    let promise = tool.geotiff_to_png(options);
                                    
                                    promise.then(function(data) {
                                        
                                            url = data.png;
                                            
                                            return;
                                            
                                            http = new XMLHttpRequest();
                                            http.open('HEAD', url, false);
                                            http.send();
                                            
                                            if (http.status === 404) {
                                                
                                                url = null;
                                                
                                                return;
                                                
                                            }
                                            
                                    });

                            });
   
                        } else {
                            
                            point1 = map.getBounds().getNorthWest();
                            point2 = map.getBounds().getNorthEast();
                            point3 = map.getBounds().getSouthWest();
                            
                        }
                        
                        window.setTimeout(function() {
                            
                        if (url === null) {
                            
                            special_tools.modal_message(special_tools, "Ha ocurrido un error inesperado.", lang);
                            
                            return;
                        }

                        const overlay = L.imageOverlay.rotated(url, point1, point2, point3, {
                                
                            opacity: 1,
                            interactive: true
                                
                        });

                        const image_id = special_tools.make_id(20);

                        overlay.addTo(map);

                        const bounds_of_image = overlay.getBounds();

                        const clip_polygon = L.rectangle(bounds_of_image, {opacity: 0, color: 'none'});
                        
                        overlay.removeFrom(map);
                        
                        clip_polygon.feature = clip_polygon.toGeoJSON();
                        clip_polygon.feature.properties.images = stored_image_data_item;
                        clip_polygon.feature.special_tools = {};
                        clip_polygon.feature.special_tools.is_clipPolygon = true;
                        clip_polygon.feature.special_tools.clipPolygon_image = url;
                        clip_polygon.feature.special_tools.image_id = image_id;
                        clip_polygon.feature.special_tools.imageOpacity = 1;
                        clip_polygon.feature.special_tools.imageInteractive = true;
                        clip_polygon.feature.special_tools.image_zIndex = 200;
                        clip_polygon.feature.special_tools.point1 = point1;
                        clip_polygon.feature.special_tools.point2 = point2;
                        clip_polygon.feature.special_tools.point3 = point3;
                        clip_polygon.feature.special_tools.geoman_edition = false;

                        map.fire('pm:create', {layer: clip_polygon});

                        map.fitBounds(bounds_of_image);

                        L.DomUtil.remove(btn_get_image_upload);
                        L.DomUtil.remove(btn_add_image_to_map);
                        L.DomUtil.remove(box_image_config);
                        L.DomUtil.remove(box_image_msg);
                        L.DomUtil.remove(image_preview);
                        modal._container.querySelector('.close').click();
                        
                        special_tools.modal_message(special_tools, "Imagen subida correctamente.", lang);
                        
                        }, 5000);
                        
                    });
                },
                
                onHide: function(){
                    
                    L.DomUtil.addClass(controlDiv, 'special-tools-disable');
                    L.DomUtil.removeClass(controlDiv, 'special-tools-enable');
                    
                    const btn_get_image_upload = _this.modal._container.querySelector("#btn_get_image_upload");
                    const btn_add_image_to_map = _this.modal._container.querySelector("#btn_add_image_to_map");
                    const box_image_config = _this.modal._container.querySelector('#box_image_config');
                    const box_image_msg = _this.modal._container.querySelector('#box_image_msg');
                    const image_preview = _this.modal._container.querySelector('#image_preview');
                    
                    try {
                        L.DomUtil.remove(btn_get_image_upload);
                        L.DomUtil.remove(btn_add_image_to_map);
                        L.DomUtil.remove(box_image_config);
                        L.DomUtil.remove(box_image_msg);
                        L.DomUtil.remove(image_preview);
                    } catch (e) {/*Nothing*/}

                }
                
            });
        });
               
        const false_div = L.DomUtil.create('div');
        
        return false_div;
        
    },
    
    project: function(GEOJSON, EPSG) {
        
        let OBJECTS_GEOJSON = new Array();
  
        if (GEOJSON.hasOwnProperty('features')) {

            for (let feature in GEOJSON.features) {

                if (GEOJSON.hasOwnProperty("crs")) {

                    GEOJSON.features[feature].crs = GEOJSON.crs;

                }

                if (GEOJSON.features[feature].geometry.type === 'Polygon') {

                    const polygon = projections.polygon(GEOJSON.features[feature], EPSG);

                    OBJECTS_GEOJSON.push(polygon);

                } else if (GEOJSON.features[feature].geometry.type === 'MultiPolygon') {

                    const multipolygon = projections.multipolygon(GEOJSON.features[feature], EPSG);

                    OBJECTS_GEOJSON.push(multipolygon);

                } else if (GEOJSON.features[feature].geometry.type === 'LineString') {

                    const linestring = projections.linestring(GEOJSON.features[feature], EPSG);

                    OBJECTS_GEOJSON.push(linestring);

                } else if (GEOJSON.features[feature].geometry.type === 'MultiLineString') {

                    const multilinestring = projections.multilinestring(GEOJSON.features[feature], EPSG);

                    OBJECTS_GEOJSON.push(multilinestring);

                } else if (GEOJSON.features[feature].geometry.type === 'Point') {

                    const point = projections.point(GEOJSON.features[feature], EPSG);

                    OBJECTS_GEOJSON.push(point);

                } else if (GEOJSON.features[feature].geometry.type === 'MultiPoint') {

                    const multipoint = projections.multipoint(GEOJSON.features[feature], EPSG);

                    OBJECTS_GEOJSON.push(multipoint);

                }
            }

        } else if (GEOJSON.geometry.type === "Polygon") {

            const polygon = projections.polygon(GEOJSON, EPSG);

            OBJECTS_GEOJSON.push(polygon);

        } else if (GEOJSON.geometry.type === "MultiPolygon") {

            const multipolygon = projections.multipolygon(GEOJSON, EPSG);

            OBJECTS_GEOJSON.push(multipolygon);

        } else if (GEOJSON.geometry.type === "LineString") {

            const linestring = projections.linestring(GEOJSON, EPSG);

            OBJECTS_GEOJSON.push(linestring);

        } else if (GEOJSON.geometry.type === "MultiLineString") {

            const multilinestring = projections.multilinestring(GEOJSON, EPSG);

            OBJECTS_GEOJSON.push(multilinestring);

        } else if (GEOJSON.geometry.type === "Point") {

            const point = projections.point(GEOJSON, EPSG);
            OBJECTS_GEOJSON.push(point);

        } else if (GEOJSON.geometry.type === "MultiPoint") {

            const multipoint = projections.multipoint(GEOJSON, EPSG);
            OBJECTS_GEOJSON.push(multipoint);

        }

        return OBJECTS_GEOJSON;
        
    }
    
});

L.control.specialToolsUpload = function (options) {
    
    return new L.Control.SpecialToolsUpload(options);
    
};