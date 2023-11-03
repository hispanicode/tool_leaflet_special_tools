
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
                    
                    /**********************************************************/
                    
                    const vector_upload_container = L.DomUtil.create('div');
                    vector_upload_container.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(vector_upload_container);
                    
                    /*
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
                    
                    */

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
                    
                    modal_body.appendChild(btn_list_projections);
                    
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

                    /*******************************************************/

                    const hr = L.DomUtil.create('hr');
                    modal_body.appendChild(hr);

                    /*******************************************************/

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
                    
                    tool.vector_service_upload(vector_upload_container, ['zip', 'geojson', 'kml'])
                    .then(function() {
                        
                        tool.vector_subscribe(

                            function(response) {
                                
                                const options = {

                                    file_data: response.file_data,
                                    tipo: component_geolocation.tipo,
                                    section_tipo: component_geolocation.section_tipo,
                                    section_id: component_geolocation.section_id,
                                    project_crs: project_crs.value,
                                    project_zone: project_zone.value,
                                    project_band: project_band.value

                                };

                                tool.get_vector_data(options).then(function(data) {

                                if (!data.success) {

                                    special_tools.modal_message(special_tools, data.msg, lang);

                                    return;

                                }

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

                                if (data.project_crs !== '' && data.project_zone !== '' && data.project_band !== '') {

                                    EPSG['EPSG_NEW'] = {

                                        crs: 'urn:ogc:def:crs:EPSG::' + data.project_crs,
                                        zone: parseInt(data.project_zone),
                                        band: data.project_band

                                    };

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

                    /********START RASTER UPLOAD********/
                    
                    const images_title_div = L.DomUtil.create('div');
                    images_title_div.setAttribute('class', 'special-tools-container');
                    
                    modal_body.appendChild(images_title_div);
                    
                    /********************************************************/
                    
                    const images_title = L.DomUtil.create('div');
                    images_title.setAttribute('class', 'special-tools-h2');
                    
                    tool.google_translate({

                       element_html: images_title,
                       str: "Imágenes", 
                       lang: lang

                    });
                    
                    images_title_div.appendChild(images_title);
                    
                    /*********************************************************/

                    const btn_image_container = L.DomUtil.create('div');
                    btn_image_container.id = 'btn_image_container';
                    btn_image_container.setAttribute('class', 'special-tools-container');

                    modal_body.appendChild(btn_image_container);
                    
                    /**************************************************/

                    tool.image_service_upload(btn_image_container, ['tif', 'jpg', 'jpeg', 'png', 'gif', 'webp'])
                    .then(function() {

                        tool.image_subscribe(

                            function(response) {

                                console.log(response.file_data);
                                
                                const options = {

                                    file_data: response.file_data,
                                    tipo: tool.component_image.tipo,
                                    section_tipo: tool.component_image.section_tipo,
                                    section_id: tool.component_image.section_id,
                                    default_quality: tool.component_image.context.features.default_target_quality

                                };

                                tool.get_image_data(options).then(function(data) {

                                    const image_object = {

                                        url: data.image_src,
                                        tipo: tool.component_image.tipo,
                                        section_tipo: tool.component_image.section_tipo,
                                        section_id: tool.component_image.section_id

                                    };
                                    
                                    var url = data.image_src;

                                    let point1;
                                    let point2;
                                    let point3;

                                    special_tools.modal_message(special_tools, "Cargando la imagen ...", lang, 20000);

                                    if (data.is_geotiff) {

                                        fetch(data.geotiff_src)

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

                                            });

                                   } else {

                                       point1 = map.getBounds().getNorthWest();
                                       point2 = map.getBounds().getNorthEast();
                                       point3 = map.getBounds().getSouthWest();

                                   }

                                   window.setTimeout(function() {

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
                                   clip_polygon.feature.properties.images = [];
                                   clip_polygon.feature.properties.images.push(image_object);
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

                                   special_tools.modal_message(special_tools, "Imagen subida correctamente.", lang);
                                   
                                   modal._container.querySelector('.close').click();
                                   
                                   }, 5000);
                                });
                            }
                        );
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