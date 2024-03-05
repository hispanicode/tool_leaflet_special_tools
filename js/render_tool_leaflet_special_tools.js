// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
/*global get_label, page_globals, SHOW_DEBUG, DEDALO_CORE_URL, tool_dummy */
/*eslint no-undef: "error"*/

import {event_manager} from '../../../core/common/js/event_manager.js';
import {ui} from '../../../core/common/js/ui.js';
import {pause} from '../../../core/common/js/utils/index.js';
import {common, create_source} from '../../../core/common/js/common.js';
// import data_manager if you want to access to Dédalo API
import {data_manager} from '../../../core/common/js/data_manager.js';
import {clone, dd_console} from '../../../core/common/js/utils/index.js';
import * as instances from '../../../core/common/js/instances.js';
import {open_tool, tool_common, load_component} from '../../tool_common/js/tool_common.js';
import {tool_upload} from '../../tool_upload/js/tool_upload.js';

import {special_tools} from './special_tools.js';
import {special_tools_upload} from './special_tools_upload.js';
import {special_tools_catastro} from './special_tools_catastro.js';
import {special_tools_geolocation} from './special_tools_geolocation.js';
import {special_tools_legend} from './special_tools_legend.js';
import {special_tools_map_image_download} from './special_tools_map_image_download.js';
import {special_tools_objects} from './special_tools_objects.js';
import {special_tools_onexone} from './special_tools_onexone.js';
import {special_tools_roman_empire} from './special_tools_roman_empire.js';
import {special_tools_UA_es} from './special_tools_UA_es.js';
import {special_tools_wms} from './special_tools_wms.js';
import {special_tools_xyz} from './special_tools_xyz.js';

export const render_tool_leaflet_special_tools = function() {

	return true;
        
};

render_tool_leaflet_special_tools.prototype.edit = async function(options) {

    const self = this;

    const component_geolocation = self.caller;

    const lib_special_tools = render_tool_leaflet_special_tools.prototype.get_lib();

    const the_promise = new Promise(function(resolve) {

        for (let index = 0; index < lib_special_tools.length; index++) {

            lib_special_tools[index];

        }

        window.setTimeout(function() {
            resolve(true);
        }, 3000);

    }).then(function() {

        //Create modal
        SpecialToolsModal.create(component_geolocation.map);

        render_tool_leaflet_special_tools.prototype.load_special_tools(L);
        render_tool_leaflet_special_tools.prototype.load_special_tools_catastro(L);
        render_tool_leaflet_special_tools.prototype.load_special_tools_geolocation(L);
        render_tool_leaflet_special_tools.prototype.load_special_tools_legend(L);
        render_tool_leaflet_special_tools.prototype.load_special_tools_map_image_download(L);
        render_tool_leaflet_special_tools.prototype.load_special_tools_objects(L);
        render_tool_leaflet_special_tools.prototype.load_special_tools_onexone(L);
        render_tool_leaflet_special_tools.prototype.load_special_tools_roman_empire(L);
        render_tool_leaflet_special_tools.prototype.load_special_tools_UA_es(L);
        render_tool_leaflet_special_tools.prototype.load_special_tools_upload(L);
        render_tool_leaflet_special_tools.prototype.load_special_tools_wms(L);
        render_tool_leaflet_special_tools.prototype.load_special_tools_xyz(L);

        const special_tools_options = {

            position: "topleft"

        };

        render_tool_leaflet_special_tools.prototype.control(component_geolocation, special_tools_options);

    });

    const content_data = await get_content_data(self);
    
    window.setTimeout(function() {
        content_data.parentElement.remove();
    }, 3000);
    
    return content_data;
    
       

};

const get_content_data = async function(self) {
    
	const fragment = new DocumentFragment();

	// info_container

		const info_container = ui.create_dom_element({
			element_type	: 'div',
			class_name 		: 'info_container',
			inner_html 		: ``,
			parent 			: fragment
		});
                
                info_container.style.paddingTop = '18px';
                info_container.style.textAlign = 'center';
                
                const logo = document.createElement('img');
                logo.src = render_tool_leaflet_special_tools.prototype.tool_url() + '/img/loading.gif';
                logo.style.width = '100%';
                logo.style.height = '100%';
                logo.style.maxWidth = '300px';
                
                info_container.appendChild(logo);
                
	// components_container
		const components_container = ui.create_dom_element({
			element_type	: 'div',
			class_name 		: 'components_container',
			parent 			: fragment
		})

	// source component
		const main_component_container = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'main_component_container',
			parent			: components_container
		})
                
	// value_container
		const value_container = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'value_container',
			parent			: fragment
		})

	// content_data
		const content_data = ui.tool.build_content_data(self);
		content_data.appendChild(fragment);


	return content_data;
        
};


render_tool_leaflet_special_tools.prototype.load_special_tools = async function(L) {

        const content_data = await special_tools.prototype.load(L);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_catastro = async function(L) {

        const content_data = await special_tools_catastro.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_geolocation = async function(L) {

        const content_data = await special_tools_geolocation.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_legend = async function(L) {

        const content_data = await special_tools_legend.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_map_image_download = async function(L) {

        const content_data = await special_tools_map_image_download.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_objects = async function(L) {

        const content_data = await special_tools_objects.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_onexone = async function(L) {

        const content_data = await special_tools_onexone.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_roman_empire = async function(L) {

        const content_data = await special_tools_roman_empire.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_UA_es = async function(L) {

        const content_data = await special_tools_UA_es.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_upload = async function(L) {

        const content_data = await special_tools_upload.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_wms = async function(L) {

        const content_data = await special_tools_wms.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_xyz = async function(L) {

        const content_data = await special_tools_xyz.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.get_lib = async function() {
       
    const load_promises = [];

    /* CSS */

    const modal_css = this.tool_url() + '/external-lib/leaflet-modal/dist/leaflet.modal.css';
    load_promises.push(common.prototype.load_style(modal_css));                     

    const graphicscale_css = this.tool_url() + '/external-lib/leaflet-graphicscale/dist/Leaflet.GraphicScale.min.css';
    load_promises.push( common.prototype.load_style(graphicscale_css));

    const geocoder_css = this.tool_url() + '/external-lib/node_modules/leaflet-control-geocoder/dist/Control.Geocoder.css';
    load_promises.push( common.prototype.load_style(geocoder_css));

    const simplelightbox_css = this.tool_url() + '/external-lib/simpleLightbox/dist/simpleLightbox.min.css';
    load_promises.push( common.prototype.load_style(simplelightbox_css));

    const tool_leaflet_special_tools_css = this.tool_url() + '/css/tool_leaflet_special_tools.css';
    load_promises.push(common.prototype.load_style(tool_leaflet_special_tools_css));
    /* CSS */

    /* JS */

    const catiline_js = this.tool_url() + '/external-lib/leaflet.shapefile/catiline.js';
    load_promises.push(common.prototype.load_script(catiline_js));

    const shpfile_js = this.tool_url() + '/external-lib/leaflet.shapefile/leaflet.shpfile.js';
    load_promises.push(common.prototype.load_script(shpfile_js));

    const kml_js = this.tool_url() + '/external-lib/leaflet-kml/L.KML.js';
    load_promises.push(common.prototype.load_script(kml_js));

    const georaster_js = this.tool_url() + '/external-lib/georaster/dist/georaster.browser.bundle.js';
    load_promises.push(common.prototype.load_script(georaster_js));

    const georaster_layer_for_leaflet_js = this.tool_url() + '/external-lib/node_modules/georaster-layer-for-leaflet/dist/georaster-layer-for-leaflet.min.js';
    load_promises.push(common.prototype.load_script(georaster_layer_for_leaflet_js));

    const imageoverlay_rotated_js = this.tool_url() + '/external-lib/Leaflet.ImageOverlay.Rotated/Leaflet.ImageOverlay.Rotated.js'
    load_promises.push(common.prototype.load_script(imageoverlay_rotated_js));

    const domtoimage_js = this.tool_url() + '/external-lib/dom-to-image/dist/dom-to-image.min.js';
    load_promises.push(common.prototype.load_script(domtoimage_js));

    const marker_filter_color_js = this.tool_url() + '/external-lib/marker-filter-color/marker-filter-color.js';
    load_promises.push(common.prototype.load_script(marker_filter_color_js));

    const graphicscale_js = this.tool_url() + '/external-lib/leaflet-graphicscale/dist/Leaflet.GraphicScale.min.js';
    load_promises.push(common.prototype.load_script(graphicscale_js));                    

    const modal_js = this.tool_url() + '/external-lib/leaflet-modal/dist/L.Modal.js';
    load_promises.push(common.prototype.load_script(modal_js));

    const utm_js = this.tool_url() + '/external-lib/Leaflet.UTM/L.LatLng.UTM.js';
    load_promises.push(common.prototype.load_script(utm_js));

    const projections_js = this.tool_url() + '/external-lib/projections/projections.js';
    load_promises.push(common.prototype.load_script(projections_js));

    const geocoder_js = this.tool_url() + '/external-lib/node_modules/leaflet-control-geocoder/dist/Control.Geocoder.min.js';
    load_promises.push(common.prototype.load_script(geocoder_js));

    const simplelightbox_js = this.tool_url() + '/external-lib/simpleLightbox/dist/simpleLightbox.min.js';
    load_promises.push(common.prototype.load_script(simplelightbox_js));

    /* JS */
   
    return load_promises;
    
};

render_tool_leaflet_special_tools.prototype.control = async function(component_geolocation, options) {

    const self = this;

    options.component_geolocation = component_geolocation;
    
    options.tool = this;
    
    try {

        const geocoder = L.Control.geocoder({position: 'topleft', defaultMarkGeocode: false});

        geocoder.on('markgeocode', function(e) {

            const bbox = e.geocode.bbox;
            component_geolocation.map.fitBounds(bbox);

        }).addTo(component_geolocation.map);

    } catch(e){};

    this.set_component_geolocation(component_geolocation);
    
    options.lang = component_geolocation.section_lang;

    const specialTools = L.control.specialTools(options);

    specialTools.addTo(component_geolocation.map);
    
    options.special_tools = specialTools;
    
    const controls = self.get_controls();
    
    try {
        L.control.graphicScale({fill: 'hollow', doubleLine: true, position: 'bottomright'}).addTo(component_geolocation.map);
    } catch(e){};
    
    for (let control in controls) {
        
        /*
         * 
         * @type type
            Objects
            BaseMaps
            OneXOne
            Catastro
            UA
            RomanEmpire
            MapImageDownload
            Upload
            Legend
            Geolocation
         */
        
        switch (control) {
            
            case "XYZ":
                
                L.control.specialToolsXYZ(options).addTo(component_geolocation.map);
  
                break;
                
            case "WMS":
                    
                L.control.specialToolsWMS(options).addTo(component_geolocation.map);
  
                break;
            
            case "Catastro":
                
                L.control.specialToolsCatastro(options).addTo(component_geolocation.map);
                
                break;
                
            case "Geolocation":
                
                L.control.specialToolsGeolocation(options).addTo(component_geolocation.map);
                
                break;
                
            case "Legend":
                
                L.control.specialToolsLegend(options).addTo(component_geolocation.map);
                
                break;
                
            case "MapImageDownload":
                
                L.control.specialToolsMapImageDownload(options).addTo(component_geolocation.map);
                
                break;
                
            case "Objects":
                
                L.control.specialToolsObjects(options).addTo(component_geolocation.map);
                
                break;
                
            case "OneXOne":
                
                L.control.specialToolsOneXOne(options).addTo(component_geolocation.map);
                
                break;
                
            case "RomanEmpire":
                
                L.control.specialToolsRomanEmpire(options).addTo(component_geolocation.map);
                
                break;
                
            case "UA":
                
                L.control.specialToolsUA(options).addTo(component_geolocation.map);
                
                break;
                
            case "Upload":
                
                L.control.specialToolsUpload(options).addTo(component_geolocation.map);
                
                break;
                
        }

    }

    return specialTools;
    
};

render_tool_leaflet_special_tools.prototype.vector_download = async function(options) {
    
    const self = this;
    
    this.model = 'tool_leaflet_special_tools';
    
    const method = 'vector_download';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.geotiff_download = async function(options) {
    
    const self = this;
    
    this.model = 'tool_leaflet_special_tools';
    
    const method = 'geotiff_download';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.image_download = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    const method = 'image_download';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.get_catastro_refcat = async function(options) {
    
    const self = this;
    
    this.model = 'tool_leaflet_special_tools';
    
    const method = 'get_catastro_refcat';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.get_catastro_feature = async function(options) {
    
    const self = this;
    
    this.model = 'tool_leaflet_special_tools';
    
    const method = 'get_catastro_feature';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.get_UA = async function(options) {
    
    const self = this;
    
    this.model = 'tool_leaflet_special_tools';
    
    const method = 'get_UA';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.get_pleiades_json = async function(options) {
    
    const self = this;
    
    this.model = 'tool_leaflet_special_tools';
    const method = 'get_pleiades_json';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.get_pleiades_service = async function(options) {
    
    const self = this;
    
    this.model = 'tool_leaflet_special_tools';
    
    const method = 'get_pleiades_service';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.get_pelagios = async function(options) {
    
    const self = this;
    
    this.model = 'tool_leaflet_special_tools';
    const method = 'get_pelagios';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.get_imperium_ahlfeldt = async function(options) {
    
    const self = this;
    
    this.model = 'tool_leaflet_special_tools';
    
    const method = 'get_imperium_ahlfeldt';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        }).then(function(response) {

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.map_image_download = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    const method = 'map_image_download';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.legends = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';

    options.section_tipo = self.get_section_tipo();

    const method = 'legends';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.get_wms_layers = async function(options) {
    
    self = this;

    this.model = 'tool_leaflet_special_tools';
    
    const method = 'get_wms_layers';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.select_basemaps = async function(options) {

    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.section_tipo = this.get_section_tipo();

    const method = 'select_basemaps';
    
    const source = create_source(this, method);

    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.create_basemap = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.section_tipo = this.get_section_tipo();

    const method = 'create_basemap';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.update_basemap = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.section_tipo = this.get_section_tipo();

    const method = 'update_basemap';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.remove_basemap = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.section_tipo = this.get_section_tipo();

    const method = 'remove_basemap';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.select_wms = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.section_tipo = this.get_section_tipo();

    const method = 'select_wms';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.update_wms = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.section_tipo = this.get_section_tipo();

    const method = 'update_wms';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.create_wms = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.section_tipo = this.get_section_tipo();

    const method = 'create_wms';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.remove_wms = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.geo_provider = this.get_component_geolocation().context.features.geo_provider;

    const method = 'remove_wms';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.create_property = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';

    const method = 'create_property';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.edit_property = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';

    const method = 'edit_property';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.google_translate = async function(options) {

    this.model = 'tool_leaflet_special_tools';

    const source = create_source(this, 'google_translate');

    const rqo = {

            dd_api	: 'dd_tools_api',
            action	: 'tool_request',
            source	: source,
            options	: options,
            prevent_lock: true
    };

    // call to the API, fetch data and get response
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            resolve(response);

            if (options.hasOwnProperty('attribute')) {

                options.element_html.setAttribute(options.attribute, response.str_translate);


            } else {

                options.element_html.innerText = response.str_translate;

            }

        });
    });
};

render_tool_leaflet_special_tools.prototype.image_service_upload = async function(container, allowed_extensions) {
    
    const self = this;
    
    this.random_id = self.make_id(50);
    
    container.innerHTML = '';
    
    const image_section_tipo    =  'rsc170'; //DD_TIPOS.DEDALO_SECTION_RESOURCES_IMAGE_TIPO // 'rsc170'
    const component_image_tipo  = 'rsc29'; // DD_TIPOS.DEDALO_COMPONENT_RESOURCES_IMAGE_TIPO //'rsc29'

    // create API call as rqo (request query object), with the action to create new section
    const rqo = {
        action  : 'create',
        source  : {

            section_tipo : image_section_tipo

        }
    };
    // call to API
    const api_response = await data_manager.request({

        body : rqo

    });

    // if the API result is ok go ahead
    if (api_response.result) {
        // section_id of the new record
        const section_id = api_response.result;

        // To create the new image instance with the result data of uploaded process and build it. 
        const component_image = await instances.get_instance({

            model           : 'component_image',
            mode            : 'edit',
            tipo            : component_image_tipo,
            section_tipo    : image_section_tipo,
            section_id      : section_id

        });

        await component_image.build(true);
        
        self.set_component_image(component_image);

        const service_upload = await instances.get_instance({

            model: 'service_upload',
            allowed_extensions: allowed_extensions,
            mode: 'edit',
            id_variant: 'special_tools_service_upload_' + self.random_id, // optionally set to prevent id collisions
            caller: component_image // object mandatory, normally a component, tool or section instance
        });

        // build
        await service_upload.build();

        // render
        const service_node = await service_upload.render();

        // Place it
        container.appendChild(service_node);
    
    }
    
};

render_tool_leaflet_special_tools.prototype.image_subscribe = async function(callback) {
    
    const self = this;

    const events = event_manager.get_events();
    
    for (let x in events) {
        
        if (events[x].event_name === 'upload_file_done_' + self.component_image.id) {

            event_manager.unsubscribe(events[x].token);
            
        } 
        
    }
    
    event_manager.subscribe('upload_file_done_' + self.component_image.id, callback);

};

render_tool_leaflet_special_tools.prototype.get_image_data = async function(options) {


        this.model = 'tool_leaflet_special_tools';
    
        const source = create_source(this, 'process_uploaded_image');

        const rqo = {
            dd_api  : 'dd_tools_api',
            action  : 'tool_request',
            source  : source,
            options : options

        };
            
        const api_response = data_manager.request({

            body : rqo

        });
        
        return api_response;
    
};

render_tool_leaflet_special_tools.prototype.vector_service_upload = async function(container, allowed_extensions) {
    
    const self = this;
    
    this.random_id = self.make_id(50);
    
    container.innerHTML = '';

    const service_upload = await instances.get_instance({

        model: 'service_upload',
        allowed_extensions: allowed_extensions,
        mode: 'edit',
        id_variant: 'special_tools_service_upload_' + self.random_id, // optionally set to prevent id collisions
        caller: self.get_component_geolocation() // object mandatory, normally a component, tool or section instance
    });

    // build
    await service_upload.build();

    // render
    const service_node = await service_upload.render();

    // Place it
    container.appendChild(service_node);
    
};

render_tool_leaflet_special_tools.prototype.vector_subscribe = async function(callback) {
    
    const self = this;
    
    const events = event_manager.get_events();
    
    for (let x in events) {
        
        if (events[x].event_name === 'upload_file_done_' + self.get_component_geolocation().id) {

            event_manager.unsubscribe(events[x].token);
            
        } 
        
    }
    
    event_manager.subscribe('upload_file_done_' + self.get_component_geolocation().id, callback);

};

render_tool_leaflet_special_tools.prototype.get_vector_data = async function(options) {

        this.model = 'tool_leaflet_special_tools';
    
        const source = create_source(this, 'process_uploaded_vector');

        const rqo = {
            dd_api  : 'dd_tools_api',
            action  : 'tool_request',
            source  : source,
            options : options

        };
            
        const api_response = data_manager.request({

            body : rqo

        });
        
        return api_response;
    
};

render_tool_leaflet_special_tools.prototype.get_elevation = function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';

    const method = 'get_elevation';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
};

render_tool_leaflet_special_tools.prototype.image_to_blob = function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';

    const method = 'image_to_blob';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
};

render_tool_leaflet_special_tools.prototype.set_component_geolocation = function(component_geolocation) {
    
    this.component_geolocation = component_geolocation;
    
};

render_tool_leaflet_special_tools.prototype.get_component_geolocation = function() {
    
    return this.component_geolocation;
    
};

render_tool_leaflet_special_tools.prototype.set_component_image = function(component_image) {
    
    this.component_image = component_image;
    
};

render_tool_leaflet_special_tools.prototype.get_component_image = function() {
    
    return this.component_image;
    
};

render_tool_leaflet_special_tools.prototype.tool_url = function() {
    
    const get_url = window.location;
    
    const base_url = get_url.protocol + "//" + get_url.host + "/" + get_url.pathname.split('/')[1];

    return base_url + '/tools/tool_leaflet_special_tools';

};

render_tool_leaflet_special_tools.prototype.make_id = function(length) {
    
        let result = '';
        
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        const charactersLength = characters.length;
        
        let counter = 0;
        
        while (counter < length) {
            
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
          
        }
        
        return result;
        
};

render_tool_leaflet_special_tools.prototype.external_image_to_component_image = async function(file_data) {
    
    const self = this;
    
    const image_section_tipo    =  'rsc170'; //DD_TIPOS.DEDALO_SECTION_RESOURCES_IMAGE_TIPO // 'rsc170'
    const component_image_tipo  = 'rsc29'; // DD_TIPOS.DEDALO_COMPONENT_RESOURCES_IMAGE_TIPO //'rsc29'

    // create API call as rqo (request query object), with the action to create new section
    const rqo = {
        action  : 'create',
        source  : {

            section_tipo : image_section_tipo

        }
    };
    // call to API
    const api_response = await data_manager.request({

        body : rqo

    });

    // if the API result is ok go ahead
    if (api_response.result) {
        // section_id of the new record
        const section_id = api_response.result;

        // To create the new image instance with the result data of uploaded process and build it. 
        const component_image = await instances.get_instance({

            model           : 'component_image',
            mode            : 'edit',
            tipo            : component_image_tipo,
            section_tipo    : image_section_tipo,
            section_id      : section_id

        });

        await component_image.build(true);
        
        self.set_component_image(component_image);
        
        let options = {};

        options.model = 'component_image';
        options.mode = 'edit';
        options.tipo = component_image_tipo;
        options.section_tipo = image_section_tipo;
        options.section_id = section_id;
        options.default_quality = component_image.context.features.default_target_quality;
        options.file_data = file_data;

        return self.get_image_data(options);
    
    }
    
};

render_tool_leaflet_special_tools.prototype.external_image_to_tmp_dir = function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';

    const method = 'external_image_to_tmp_dir';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.legend_icon = function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';

    const method = 'legend_icon';
    
    const source = create_source(this, method);
    
    const rqo = {

        dd_api: 'dd_tools_api',
        action: 'tool_request',
        source: source,
        prevent_lock: true,
        options: options
    };
    
    return new Promise(function(resolve){

        data_manager.request({

            body : rqo

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

render_tool_leaflet_special_tools.prototype.base_url = function() {
    
        const getUrl = window.location;
        const baseUrl = getUrl .protocol + "//" + getUrl.host;
        
        return baseUrl;
    
};

render_tool_leaflet_special_tools.prototype.get_controls = function() {
    
    const component_geolocation = this.get_component_geolocation();

    let special_tools_controls;

    if (component_geolocation.section_tipo.match('numisdata')) {

        if (component_geolocation.section_lang === 'lg-spa' || 
            component_geolocation.section_lang === 'lg-cat' || 
            component_geolocation.section_lang === 'lg-eus') {

            special_tools_controls = {

                Objects: true,
                XYZ: true,
                WMS: true,
                OneXOne: true,
                Catastro: true,
                UA: true,
                RomanEmpire: true,
                MapImageDownload: true,
                Upload: true,
                Legend: true,
                Geolocation: true

            };

        } else {

            special_tools_controls = {

                Objects: true,
                XYZ: true,
                WMS: true,
                OneXOne: true,
                RomanEmpire: true,
                MapImageDownload: true,
                Upload: true,
                Legend: true,
                Geolocation: true

            };

        }

    } 

    else {

        if (component_geolocation.section_lang === 'lg-spa' || 
            component_geolocation.section_lang === 'lg-cat' || 
            component_geolocation.section_lang === 'lg-eus') {

            special_tools_controls = { 

                Objects: true,
                XYZ: true,
                WMS: true,
                OneXOne: true,
                Catastro: true,
                UA: true,
                MapImageDownload: true,
                Upload: true,
                Legend: true,
                Geolocation: true

            };

        } else {

            special_tools_controls = { 

                Objects: true,
                XYZ: true,
                WMS: true,
                OneXOne: true,
                MapImageDownload: true,
                Upload: true,
                Legend: true,
                Geolocation: true

            };

        }

    }
    
    return special_tools_controls;
    
};

render_tool_leaflet_special_tools.prototype.get_section_tipo = function() {
    
    const component_geolocation = this.get_component_geolocation();

    return component_geolocation.section_tipo.replace(/\d/gi, '');
    
};