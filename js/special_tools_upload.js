
export const special_tools_upload = function() {

	return true;
        
};

special_tools_upload.prototype.load = async function(L, special_tools) {
    
    special_tools_upload.prototype.special_tools = special_tools;

    L.Control.SpecialToolsUpload = L.Control.extend({

        onAdd: function() {

            const self = special_tools_upload.prototype.special_tools;
            
            const controlDiv = L.DomUtil.create('div', 'special-tools-upload special-tools-controls special-tools-disable');

            special_tools_upload.prototype.controlDiv = controlDiv;

            self.tool.google_translate({

                element_html: controlDiv,
                attribute: 'title',
                str: 'Subir archivo al mapa', 
                lang: self.lang

            });

            self.special_tools_btns.appendChild(controlDiv);

            L.DomEvent.addListener(controlDiv, 'click', function() {

                self.only_one_active_control(controlDiv);

                special_tools_upload.prototype.load_modal();
                
            });

            const false_div = L.DomUtil.create('div');

            return false_div;

        }

    });

    L.control.specialToolsUpload = function (options) {

        return new L.Control.SpecialToolsUpload(options);

    };
    
};

special_tools_upload.prototype.load_modal = function() {
    
    const _this = this;
    
    const self = this.special_tools;
    
    /**************************************************************************/

    const modal = self.new_modal("Subir archivo al mapa");

    const modal_body = modal._container.querySelector('.modal-body');

    /**************************************************************************/

    self.open_vector_modal = L.DomUtil.create('button');
    self.open_vector_modal.id = 'open_vector_modal';
    self.open_vector_modal.setAttribute('class', 'special-tools-btn-success');

    self.tool.google_translate({

        element_html: self.open_vector_modal,
        str: "Subir archivo vectorial", 
        lang: self.lang

    });

    modal_body.appendChild(self.open_vector_modal);

    /**************************************************************************/

    self.open_raster_modal = L.DomUtil.create('button');
    self.open_raster_modal.id = 'open_raster_modal';
    self.open_raster_modal.setAttribute('class', 'special-tools-btn-success');

    self.tool.google_translate({

        element_html: self.open_raster_modal,
        str: "Subir imagen", 
        lang: self.lang

    });

    modal_body.appendChild(self.open_raster_modal);

    /**************************************************************************/

    _this.open_vector_modal_event();

    /**************************************************************************/
    
    _this.open_raster_modal_event();
    
    /**************************************************************************/
};

special_tools_upload.prototype.open_vector_modal_event = function() {
    
    const self = this.special_tools;
    
    L.DomEvent.on(self.open_vector_modal, 'click', function(e) {

        try {

            self.map._container.querySelector('#modal_image').remove();

        } catch (Exception) {}

        /**********************************************************************/

        const modal_vector = L.DomUtil.create('div');
        modal_vector.id = 'modal_vector';
        modal_vector.setAttribute('class', 'special-tools-modal-upload-vector');

        self.map._container.append(modal_vector);

        L.DomEvent.on(modal_vector, 'mouseover', function() {

            self.map.dragging.disable();
            self.map.doubleClickZoom.disable();
            document.querySelector('.map_inputs').style.zIndex = 0;

        });

        L.DomEvent.on(modal_vector, 'mouseout', function() {

            self.map.dragging.enable();
            self.map.doubleClickZoom.enable();

        });

        /**********************************************************************/

        const title_vector = L.DomUtil.create('div');
        title_vector.setAttribute('class', 'special-tools-h2');

        self.tool.google_translate({

            element_html: title_vector,
            str: "Subir archivo vectorial", 
            lang: self.lang

        });

        modal_vector.appendChild(title_vector);

        /**********************************************************************/

        const container_vector = L.DomUtil.create('div');
        modal_vector.appendChild(container_vector);

        /**********************************************************************/

        var br = L.DomUtil.create('br');
        modal_vector.appendChild(br);
        modal_vector.appendChild(br.cloneNode(true));

        /**********************************************************************/

        const msg_extension_vector = L.DomUtil.create('div');
        msg_extension_vector.setAttribute('class', 'special-tools-container special-tools-text-info');

        self.tool.google_translate({

           element_html: msg_extension_vector,
           str: "Extensiones permitidas: .zip (shape), .geojson y .kml", 
           lang: self.lang

        });

        modal_vector.appendChild(msg_extension_vector);

        /**********************************************************************/

        const btn_list_projections = L.DomUtil.create('button');
        btn_list_projections.type = 'button';
        btn_list_projections.id = 'btn_list_projections';
        btn_list_projections.setAttribute('class', 'special-tools-btn-info');
        btn_list_projections.style.fontSize = '9px';

        self.tool.google_translate({

           element_html: btn_list_projections,
           str: "Proyecciones por defecto", 
           lang: self.lang

        });

        modal_vector.appendChild(btn_list_projections);

        const info_div = L.DomUtil.create('div');
        info_div.setAttribute('class', 'special-tools-container');

        self.tool.google_translate({

           element_html: info_div,
           str: "Incluir proyección para UTM (Universal Transverse Mercator) en el caso de que no se encuentre entre las proyecciones por defecto (Asegúrese de que el archivo que va a subir viene proyectado. Por ejemplo: urn:ogc:def:crs:EPSG::32619", 
           lang: self.lang

        });

        modal_vector.appendChild(info_div);

        const project_div = L.DomUtil.create('div');
        project_div.setAttribute('class', 'special-tools-container');

        modal_vector.appendChild(project_div);

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

        modal_vector.appendChild(list_projections_div);

        const list_projections = L.DomUtil.create('div');
        list_projections.id = 'list_projections';
        list_projections.setAttribute('class', 'special-tools-display-none special-tools-text-info');

        self.tool.google_translate({

           element_html: list_projections,
           str: "A continuación se listan las proyecciones por defecto: EPSG:4230 EPSG:4326 EPSG:4258 EPSG:3857 EPSG:32628 EPSG:32629 EPSG:32630 EPSG:32631 EPSG:25828 EPSG:25829 EPSG:25830 EPSG:25831 EPSG:23028 EPSG:23029 EPSG:23030 EPSG:23031 EPSG:4082 EPSG:4083", 
           lang: self.lang

        });

        list_projections_div.appendChild(list_projections);

        /**********************************************************************/

        modal_vector.appendChild(br.cloneNode(true));
        modal_vector.appendChild(br.cloneNode(true));

        /**********************************************************************/

        const btn_cancel_vector = L.DomUtil.create('button');
        btn_cancel_vector.setAttribute('class', 'special-tools-btn-danger');

        self.tool.google_translate({

           element_html: btn_cancel_vector,
           str: "Cancelar", 
           lang: self.lang

        });

        modal_vector.appendChild(btn_cancel_vector);

        /**********************************************************************/

        L.DomEvent.on(btn_cancel_vector, 'click', function() {

            window.setTimeout(function() {

                modal_vector.remove();
                
                document.querySelector('.map_inputs').style.zIndex = 1;

            }, 100);

        });

        L.DomEvent.on(btn_list_projections, 'click', function() {

            if (L.DomUtil.hasClass(list_projections, 'special-tools-display-none')) {

                L.DomUtil.removeClass(list_projections, 'special-tools-display-none');
                L.DomUtil.addClass(list_projections, 'special-tools-display-block');

            } else {

                L.DomUtil.removeClass(list_projections, 'special-tools-display-block');
                L.DomUtil.addClass(list_projections, 'special-tools-display-none');
            }

        });

        L.DomEvent.on(project_crs, 'keyup', function() {

            link_epsg_io.href = 'https://epsg.io/' + self.strip_tags(this.value);
            link_epsg_io.innerText = 'https://epsg.io/' + self.simple_sanitize_string(this.value);

        });


        self.tool.vector_service_upload(container_vector, ['zip', 'geojson', 'kml'])
        .then(function() {

            self.tool.vector_subscribe(

                function(response) {

                    const options = {

                        file_data: response.file_data,
                        tipo: self.component_geolocation.tipo,
                        section_tipo: self.component_geolocation.section_tipo,
                        section_id: self.component_geolocation.section_id,
                        project_crs: project_crs.value,
                        project_zone: project_zone.value,
                        project_band: project_band.value

                    };

                    self.tool.get_vector_data(options).then(function(data) {

                    if (!data.success) {

                        self.modal_message(data.msg);

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
                                importUrl: self.tool.tool_url() + '/external-lib/leaflet.shapefile/shp.js'
                            }

                        );

                        } catch(e) {

                            self.modal_message('El archivo shape no es válido');

                            return;

                        }

                        let is_valid_shape = false;

                        shpfile.once("data:loaded", function() {

                            is_valid_shape = true;

                            const GEOJSON = shpfile.toGeoJSON();

                            const OBJECTS_GEOJSON = self.project(GEOJSON, EPSG);

                            for (let index in OBJECTS_GEOJSON) {

                                let max_fit = 1;

                                for (let obj in OBJECTS_GEOJSON[index]) {

                                    window.setTimeout(function(){

                                        self.map.fire("pm:create", {layer: OBJECTS_GEOJSON[index][obj]});

                                    }, 100);

                                    if (max_fit === 1) {

                                        if (self.is_point(OBJECTS_GEOJSON[index][obj])) {

                                           self.map.panTo(OBJECTS_GEOJSON[index][obj].getLatLng()); 

                                        } else if (

                                            self.is_linestring(OBJECTS_GEOJSON[index][obj])
                                            || self.is_polygon(OBJECTS_GEOJSON[index][obj])

                                            ) {

                                            self.map.fitBounds(OBJECTS_GEOJSON[index][obj].getBounds());

                                        }
                                        max_fit = 0;
                                    }
                                }
                            }

                            window.setTimeout(function() {

                                self.map._container.querySelector('#modal_vector').remove();

                            }, 100);

                            const leaflet_modal = self.map._container.querySelector('.leaflet-modal');
                            leaflet_modal.querySelector('.close').click();

                            self.modal_message("Archivo subido correctamente.");

                            return;

                        });

                        window.setTimeout(function(){

                            if (!is_valid_shape) {

                                self.modal_message('El archivo .zip está dañado o no contiene los ficheros adecuados.');

                            }

                        }, 1500);

                    } 

                    else if (data.type === 'application/geo+json') {

                        const GEOJSON = JSON.parse(data.geojson);

                        if (GEOJSON === null) return;

                        if (GEOJSON.hasOwnProperty('feature') && GEOJSON.hasOwnProperty('features')) {

                            self.modal_message('El archivo .geojson no es válido');

                            return;
                        }

                        const OBJECTS_GEOJSON = self.project(GEOJSON, EPSG);

                        for (let index in OBJECTS_GEOJSON) {

                            let max_fit = 1;

                            for (let obj in OBJECTS_GEOJSON[index]) {

                                window.setTimeout(function(){

                                    self.map.fire("pm:create", {layer: OBJECTS_GEOJSON[index][obj]});

                                }, 100);

                                if (max_fit === 1) {

                                    if (self.is_point(OBJECTS_GEOJSON[index][obj])) {

                                       self.map.panTo(OBJECTS_GEOJSON[index][obj].getLatLng()); 

                                    } else if (
                                        self.is_linestring(OBJECTS_GEOJSON[index][obj])
                                        || self.is_polygon(OBJECTS_GEOJSON[index][obj])
                                        ) {

                                        self.map.fitBounds(OBJECTS_GEOJSON[index][obj].getBounds());

                                    }

                                    max_fit = 0;

                                }
                            }
                        }

                        window.setTimeout(function() {

                            self.map._container.querySelector('#modal_vector').remove();

                        }, 100);

                        const leaflet_modal = self.map._container.querySelector('.leaflet-modal');
                        leaflet_modal.querySelector('.close').click();

                        self.modal_message("Archivo subido correctamente.");

                        return;

                    } else if (data.type === 'application/vnd.google-earth.kml+xml') {

                        const parser = new DOMParser();

                        let kml;

                        try {

                            kml = parser.parseFromString(data.kml, 'text/xml');

                        } catch(e) {

                            self.modal_message('El archivo .kml no es válido');

                            return;

                        }

                        const track = new L.KML(kml);

                        const GEOJSON = track.toGeoJSON();

                        const OBJECTS_GEOJSON = self.project(GEOJSON, EPSG);

                        for (let index in OBJECTS_GEOJSON) {

                            let max_fit = 1;

                            for (let obj in OBJECTS_GEOJSON[index]) {

                                    window.setTimeout(function(){

                                        self.map.fire("pm:create", {layer: OBJECTS_GEOJSON[index][obj]});

                                    }, 100);

                                if (max_fit === 1) {

                                    if (self.is_point(OBJECTS_GEOJSON[index][obj])) {

                                       self.map.panTo(OBJECTS_GEOJSON[index][obj].getLatLng()); 

                                    } else if (
                                        self.is_linestring(OBJECTS_GEOJSON[index][obj])
                                        || self.is_polygon(OBJECTS_GEOJSON[index][obj])
                                        ) {

                                        self.map.fitBounds(OBJECTS_GEOJSON[index][obj].getBounds());

                                    }
                                    max_fit = 0;
                                }
                            }
                        }

                        window.setTimeout(function() {

                            self.map._container.querySelector('#modal_vector').remove();

                        }, 100);

                        const leaflet_modal = self.map._container.querySelector('.leaflet-modal');
                        leaflet_modal.querySelector('.close').click();

                        self.modal_message("Archivo subido correctamente.");

                        return;

                    } 

                });

            });
        });

        L.DomEvent.off(this);
        
        L.DomEvent.preventDefault(e);

    });
    
};

special_tools_upload.prototype.open_raster_modal_event = function() {
    
    const self = this.special_tools;
    
    L.DomEvent.on(self.open_raster_modal, 'click', function() {

        try {

            self.map._container.querySelector('#modal_vector').remove();

        } catch (Exception) {}

        const modal_image = L.DomUtil.create('div');
        modal_image.id = 'modal_image';
        modal_image.setAttribute('class', 'special-tools-modal-upload-image');

        self.map._container.append(modal_image);

        L.DomEvent.on(modal_image, 'mouseover', function() {

            self.map.dragging.disable();
            self.map.doubleClickZoom.disable();
            document.querySelector('.map_inputs').style.zIndex = 0;

        });

        L.DomEvent.on(modal_image, 'mouseout', function() {

            self.map.dragging.enable();
            self.map.doubleClickZoom.enable();

        });

        /**********************************************************************/

        const title_image = L.DomUtil.create('div');
        title_image.setAttribute('class', 'special-tools-h2');

        self.tool.google_translate({

            element_html: title_image,
            str: "Subir imagen", 
            lang: self.lang

        });

        modal_image.appendChild(title_image);

        /**********************************************************************/

        const container_image = L.DomUtil.create('div');
        modal_image.appendChild(container_image);

        /**********************************************************************/

        var br = L.DomUtil.create('br');

        modal_image.appendChild(br);
        modal_image.appendChild(br.cloneNode(true));

        /**********************************************************************/

        const msg_extension_images = L.DomUtil.create('div');
        msg_extension_images.setAttribute('class', 'special-tools-container special-tools-text-info');

        self.tool.google_translate({

           element_html: msg_extension_images,
           str: "Extensiones permitidas: .tif (georreferenciada), .jpg, .jpeg, .png, y .webp", 
           lang: self.lang

        });

        modal_image.appendChild(msg_extension_images);

        /**********************************************************************/

        modal_image.appendChild(br.cloneNode(true));
        modal_image.appendChild(br.cloneNode(true));

        /**********************************************************************/

        const btn_cancel_image = L.DomUtil.create('button');
        btn_cancel_image.setAttribute('class', 'special-tools-btn-danger');

        self.tool.google_translate({

           element_html: btn_cancel_image,
           str: "Cancelar", 
           lang: self.lang

        });

        modal_image.appendChild(btn_cancel_image);

        /**********************************************************************/

        L.DomEvent.on(btn_cancel_image, 'click', function() {

            modal_image.style.display = 'none';
            document.querySelector('.map_inputs').style.zIndex = 1;

        });

        self.tool.image_service_upload(container_image, ['tif', 'jpg', 'jpeg', 'png', 'webp'])
        .then(function() {

            self.tool.image_subscribe(

                function(response) {

                    const options = {

                        file_data: response.file_data,
                        tipo: self.tool.get_component_image().tipo,
                        section_tipo: self.tool.get_component_image().section_tipo,
                        section_id: self.tool.get_component_image().section_id,
                        default_quality: self.tool.get_component_image().context.features.default_target_quality

                    };

                    self.tool.get_image_data(options).then(function(data) {

                        const image_object = {

                            url: data.image_src,
                            tipo: data.tipo,
                            section_tipo: data.section_tipo,
                            section_id: data.section_id

                        };

                        var url = data.image_src;

                        let point1;
                        let point2;
                        let point3;

                        self.modal_message("Cargando la imagen ...", 20000);

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

                                       self.modal_message("La imagen .tif no es válida o no está georreferenciada.");

                                       return;

                                   }

                                });

                       } else {

                           point1 = self.map.getBounds().getNorthWest();
                           point2 = self.map.getBounds().getNorthEast();
                           point3 = self.map.getBounds().getSouthWest();

                       }

                       window.setTimeout(function() {

                       const overlay = L.imageOverlay.rotated(url, point1, point2, point3, {

                           opacity: 1,
                           interactive: true

                       });

                       const image_id = self.make_id(20);

                       overlay.addTo(self.map);

                       const bounds_of_image = overlay.getBounds();

                       const clip_polygon = L.rectangle(bounds_of_image, {opacity: 0, color: 'none'});

                       overlay.removeFrom(self.map);

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

                       self.map.fire('pm:create', {layer: clip_polygon});

                       self.map.fitBounds(bounds_of_image);

                       self.modal_message("Imagen subida correctamente.");

                        window.setTimeout(function() {

                            self.map._container.querySelector('#modal_image').remove();

                        }, 100);

                       const leaflet_modal = self.map._container.querySelector('.leaflet-modal');
                       leaflet_modal.querySelector('.close').click();

                       }, 5000);

                    });
                }
            );
        });
    });
    
};


