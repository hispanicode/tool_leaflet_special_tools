// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
/*global get_label, page_globals, SHOW_DEBUG, DEDALO_CORE_URL */
/*eslint no-undef: "error"*/

	import {clone, dd_console} from '../../../core/common/js/utils/index.js'
// import data_manager if you want to access to Dédalo API
	import {data_manager} from '../../../core/common/js/data_manager.js'
// import get_instance to create and init sections or components.
	import {get_instance, delete_instance} from '../../../core/common/js/instances.js'
// import common to use destroy, render, refresh and other useful methods
	import {common, create_source} from '../../../core/common/js/common.js';
// tool_common, basic methods used by all the tools
	import {open_tool, tool_common, load_component} from '../../tool_common/js/tool_common.js';
        import {tool_upload} from '../../tool_upload/js/tool_upload.js';

// specific render of the tool
	import {render_tool_leaflet_special_tools} from './render_tool_leaflet_special_tools.js' // self tool rendered (called from render common)


export const tool_leaflet_special_tools = function () {

        this.component_geolocation = null;
	this.model = null;
	this.events_tokens = null;
	this.status = null;
	this.main_element = null;
        this.context = null;
	this.type = null;
	this.source_lang = null;
	this.target_lang = null;
	this.langs = null;
	this.caller = null;
        this.component_list;
        this.tool_config;
        
}//end page
/**
* COMMON FUNCTIONS
* extend component functions from component common
*/
// prototypes assign
	tool_leaflet_special_tools.prototype.render = tool_common.prototype.render;
	// destroy: using common destroy method
	tool_leaflet_special_tools.prototype.destroy = common.prototype.destroy;
	// refresh: using common refresh method
	tool_leaflet_special_tools.prototype.refresh = common.prototype.refresh;

	tool_leaflet_special_tools.prototype.edit = render_tool_leaflet_special_tools.prototype.edit;



tool_leaflet_special_tools.prototype.init = async function(options) {

	const common_init = await tool_common.prototype.init.call(this, options);

	return common_init;
        
}


/**
* BUILD
* Custom tool build
* @param bool autoload
* @return bool common_build
*/
tool_leaflet_special_tools.prototype.build = async function(autoload=true) {

	const common_build = await tool_common.prototype.build.call(this, autoload);

	return common_build;
        
};

tool_leaflet_special_tools.prototype.get_lib = function() {
       
const load_promises = [];

/* CSS */

const modal_css = this.controls_url() + '/external-lib/leaflet-modal/dist/leaflet.modal.min.css';
load_promises.push(common.prototype.load_style(modal_css));                     

const graphicscale_css = this.controls_url() + '/external-lib/leaflet-graphicscale/dist/Leaflet.GraphicScale.min.css';
load_promises.push( common.prototype.load_style(graphicscale_css));

const geocoder_css = 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css';
load_promises.push( common.prototype.load_style(geocoder_css));

const special_tools_css = this.controls_url() + '/leaflet.control.SpecialTools.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_css));

const special_tools_oneXone_css = this.controls_url() + '/leaflet.control.SpecialToolsOneXOne/leaflet.control.SpecialToolsOneXOne.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_oneXone_css));

const special_tools_catastro_css = this.controls_url() + '/leaflet.control.SpecialToolsCatastro/leaflet.control.SpecialToolsCatastro.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_catastro_css));

const special_tools_UA_css = this.controls_url() + '/leaflet.control.SpecialToolsUA/leaflet.control.SpecialToolsUA.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_UA_css));

const special_tools_roman_empire_css = this.controls_url() + '/leaflet.control.SpecialToolsRomanEmpire/leaflet.control.SpecialToolsRomanEmpire.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_roman_empire_css));

const special_tools_objects_css = this.controls_url() + '/leaflet.control.SpecialToolsObjects/leaflet.control.SpecialToolsObjects.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_objects_css));

const special_tools_XYZ_css = this.controls_url() + '/leaflet.control.SpecialToolsXYZ/leaflet.control.SpecialToolsXYZ.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_XYZ_css));

const special_tools_WMS_css = this.controls_url() + '/leaflet.control.SpecialToolsWMS/leaflet.control.SpecialToolsWMS.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_WMS_css));

const special_tools_map_image_download_css = this.controls_url() + '/leaflet.control.SpecialToolsMapImageDownload/leaflet.control.SpecialToolsMapImageDownload.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_map_image_download_css));

const special_tools_upload_css = this.controls_url() + '/leaflet.control.SpecialToolsUpload/leaflet.control.SpecialToolsUpload.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_upload_css));

const special_tools_legend_css = this.controls_url() + '/leaflet.control.SpecialToolsLegend/leaflet.control.SpecialToolsLegend.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_legend_css));

const special_tools_geolocation_css = this.controls_url() + '/leaflet.control.SpecialToolsGeolocation/leaflet.control.SpecialToolsGeolocation.css?v=' + this.make_id(30);
load_promises.push(common.prototype.load_style(special_tools_geolocation_css));

/* CSS */

/* JS */

const catiline_js = this.controls_url() + '/external-lib/leaflet.shapefile/catiline.js';
load_promises.push(common.prototype.load_script(catiline_js));

const shpfile_js = this.controls_url() + '/external-lib/leaflet.shapefile/leaflet.shpfile.js';
load_promises.push(common.prototype.load_script(shpfile_js));

const kml_js = this.controls_url() + '/external-lib/leaflet-kml/L.KML.js';
load_promises.push(common.prototype.load_script(kml_js));

const georaster_js = this.controls_url() + '/external-lib/georaster/dist/georaster.browser.bundle.js';
load_promises.push(common.prototype.load_script(georaster_js));

const georaster_layer_for_leaflet_js = 'https://unpkg.com/georaster-layer-for-leaflet/dist/georaster-layer-for-leaflet.min.js';
load_promises.push(common.prototype.load_script(georaster_layer_for_leaflet_js)); 

const imageoverlay_rotated_js = this.controls_url() + '/external-lib/Leaflet.ImageOverlay.Rotated/Leaflet.ImageOverlay.Rotated.js'
load_promises.push(common.prototype.load_script(imageoverlay_rotated_js));

const domtoimage_js = this.controls_url() + '/external-lib/dom-to-image/dist/dom-to-image.min.js'
load_promises.push(common.prototype.load_script(domtoimage_js));

const marker_filter_color_js = this.controls_url() + '/external-lib/marker-filter-color/marker-filter-color.js';
load_promises.push(common.prototype.load_script(marker_filter_color_js));

const graphicscale_js = this.controls_url() + '/external-lib/leaflet-graphicscale/dist/Leaflet.GraphicScale.min.js';
load_promises.push(common.prototype.load_script(graphicscale_js));                    

const modal_js = this.controls_url() + '/external-lib/leaflet-modal/dist/L.Modal.min.js';
load_promises.push(common.prototype.load_script(modal_js));

const utm_js = this.controls_url() + '/external-lib/Leaflet.UTM/L.LatLng.UTM.js';
load_promises.push(common.prototype.load_script(utm_js));

const projections_js = this.controls_url() + '/external-lib/projections/projections.js';
load_promises.push(common.prototype.load_script(projections_js));

const geocoder_js = 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js';
load_promises.push(common.prototype.load_script(geocoder_js));

const special_tools_js = this.controls_url() + '/leaflet.control.SpecialTools.js?v=' + this.make_id(30);
load_promises.push(common.prototype.load_script(special_tools_js));

const special_tools_oneXone_js = this.controls_url() + '/leaflet.control.SpecialToolsOneXOne/leaflet.control.SpecialToolsOneXOne.js?v=' + this.make_id(30);
load_promises.push(common.prototype.load_script(special_tools_oneXone_js));

const special_tools_catastro_js = this.controls_url() + '/leaflet.control.SpecialToolsCatastro/leaflet.control.SpecialToolsCatastro.js?v=' + this.make_id(30);
load_promises.push(common.prototype.load_script(special_tools_catastro_js));

const special_tools_UA_js = this.controls_url() + '/leaflet.control.SpecialToolsUA/leaflet.control.SpecialToolsUA.js?v=' + this.make_id(30);
load_promises.push( common.prototype.load_script(special_tools_UA_js));

const special_tools_roman_empire_js = this.controls_url() + '/leaflet.control.SpecialToolsRomanEmpire/leaflet.control.SpecialToolsRomanEmpire.js?v=' + this.make_id(30);
load_promises.push(common.prototype.load_script(special_tools_roman_empire_js));

const special_tools_objects_js = this.controls_url() + '/leaflet.control.SpecialToolsObjects/leaflet.control.SpecialToolsObjects.js?v=' + this.make_id(30);
load_promises.push(common.prototype.load_script(special_tools_objects_js));

const special_tools_XYZ_js = this.controls_url() + '/leaflet.control.SpecialToolsXYZ/leaflet.control.SpecialToolsXYZ.js?v=' + this.make_id(30);
load_promises.push(common.prototype.load_script(special_tools_XYZ_js));

const special_tools_WMS_js = this.controls_url() + '/leaflet.control.SpecialToolsWMS/leaflet.control.SpecialToolsWMS.js?v=' + this.make_id(30);
load_promises.push(common.prototype.load_script(special_tools_WMS_js));

const special_tools_upload_js = this.controls_url() + '/leaflet.control.SpecialToolsUpload/leaflet.control.SpecialToolsUpload.js?v=' + this.make_id(30);
load_promises.push(common.prototype.load_script(special_tools_upload_js));

const special_tools_map_image_download_js = this.controls_url() + '/leaflet.control.SpecialToolsMapImageDownload/leaflet.control.SpecialToolsMapImageDownload.js?v=' + this.make_id(30);
load_promises.push(common.prototype.load_script(special_tools_map_image_download_js));

const special_tools_legend_js = this.controls_url() + '/leaflet.control.SpecialToolsLegend/leaflet.control.SpecialToolsLegend.js?v=' + this.make_id(30);
load_promises.push(common.prototype.load_script(special_tools_legend_js));

const special_tools_geolocation_js = this.controls_url() + '/leaflet.control.SpecialToolsGeolocation/leaflet.control.SpecialToolsGeolocation.js?v=' + this.make_id(30);
load_promises.push(common.prototype.load_script(special_tools_geolocation_js));

/* JS */
   
    return load_promises;
    
};

tool_leaflet_special_tools.prototype.control = function(component_geolocation, options) {
    
    self = this;
    
    options.component_geolocation = component_geolocation;
    
    options.tool = this;
    
    const geocoder = L.Control.geocoder({position: 'topleft', defaultMarkGeocode: false});
            
    geocoder.on('markgeocode', function(e) {
          
        const bbox = e.geocode.bbox;
        component_geolocation.map.fitBounds(bbox);
        
    }).addTo(component_geolocation.map);
    
    this.set_component_geolocation(component_geolocation);

    const specialTools = L.control.specialTools(options);
    
    specialTools.addTo(component_geolocation.map);
    
    options.special_tools = specialTools;
    
    const controls = options.controls;

    L.control.graphicScale({fill: 'hollow', doubleLine: true, position: 'bottomright'}).addTo(component_geolocation.map);
    
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

tool_leaflet_special_tools.prototype.vector_download = async function(options) {
    
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

tool_leaflet_special_tools.prototype.geotiff_download = async function(options) {
    
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

tool_leaflet_special_tools.prototype.image_download = async function(options) {
    
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

tool_leaflet_special_tools.prototype.get_catastro_refcat = async function(options) {
    
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

tool_leaflet_special_tools.prototype.get_catastro_feature = async function(options) {
    
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

tool_leaflet_special_tools.prototype.get_UA = async function(options) {
    
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

tool_leaflet_special_tools.prototype.get_pleiades_json = async function(options) {
    
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

tool_leaflet_special_tools.prototype.get_pleiades_service = async function(options) {
    
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

tool_leaflet_special_tools.prototype.get_pelagios = async function(options) {
    
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

tool_leaflet_special_tools.prototype.get_imperium_ahlfeldt = async function(options) {
    
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

        })
        .then(function(response){

            if (SHOW_DEVELOPER) {

                dd_console("-> API " + self.model + "::" + method  + " response:",'DEBUG', response);

            }

            resolve(response);

        });

    });
    
};

tool_leaflet_special_tools.prototype.create_tmp_file = async function(formData) {

    const url = this.tool_url() + '/helpers/create-tmp-file.php';
    
    return new Promise(function(resolve) {
        
        fetch(url, {

                method: "POST", 
                body: formData

        }).then(function(response) {

            resolve(response.json());

        });
        
    });

};

tool_leaflet_special_tools.prototype.vector_upload = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    const method = 'vector_upload';
    
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

tool_leaflet_special_tools.prototype.get_tool_upload = async function() {
    
        // create new section for the image, it will create new record in the database.
        // the result will be the data to stored into ...
        // DD_TIPOS object has the most common media sections, in this case we using the image section and component, but it's possible to use the ontology tipo or other sections.

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

            // data to be stored into ...., it will be used to load the image
            // the storage could be an array of images objects as:
            const to_stored_image_data = [{
                    
                section_tipo    : image_section_tipo,
                section_id      : section_id,
                component_tipo  : component_image_tipo
                
            }];

            // To create the new image instance with the result data of uploaded process and build it. 
            const component_image = await get_instance({
                
                model           : 'component_image',
                mode            : 'edit',
                tipo            : component_image_tipo,
                section_tipo    : image_section_tipo,
                section_id      : section_id
                
            });
            
            await component_image.build(true);

            const tool_upload = component_image.tools.find(el => el.model === 'tool_upload');

            open_tool({
                
                tool_context    : tool_upload,
                caller          : component_image
                
            });

            return {
                
                section_tipo: image_section_tipo,
                section_id: section_id,
                component_tipo: component_image_tipo
                
            };
        }
        
};

tool_leaflet_special_tools.prototype.get_uploaded_image = async function(stored_image_data_item) {

        // NOTE: this variable is used to show the locator data and to understand the next code.
        // It need to be the specific locator object to be loaded.

        // create the new image instance and build it with the data stored
        const component_image = await get_instance({
            model           : 'component_image',
            mode            : 'edit',
            tipo            : stored_image_data_item.component_tipo,
            section_tipo    : stored_image_data_item.section_tipo,
            section_id      : stored_image_data_item.section_id,
        })
        await component_image.build(true)// Note the await here to indicate that this process need to be complete before continue, you can create a promise or do it inside a async function... as you want

        // Get the quality of the image, it could be default_quality, but maybe original_quality would be better here... ???
        // Perhaps is possible add a quality selector to be decided by user.
        const file_info_default_target_quality = component_image.data.datalist.find(el => el.quality===component_image.context.features.default_target_quality && el.file_exist===true)

        console.log(component_image.context.features);

        // so the url of the image to use will be: (don't forget to check if the uri exist!)
        const url = file_info_default_target_quality
            ? file_info_default_target_quality.file_url
            : null
            
        return url;
        
};

tool_leaflet_special_tools.prototype.geotiff_to_png = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    const method = 'geotiff_to_png';
    
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

tool_leaflet_special_tools.prototype.map_image_download = async function(options) {
    
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

tool_leaflet_special_tools.prototype.legends = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.geo_provider = this.get_component_geolocation().context.features.geo_provider;
    options.section_tipo = this.get_component_geolocation().section_tipo;

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

tool_leaflet_special_tools.prototype.get_wms_layers = async function(options) {
    
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

tool_leaflet_special_tools.prototype.select_basemaps = async function(options) {

    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.geo_provider = this.get_component_geolocation().context.features.geo_provider;

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

tool_leaflet_special_tools.prototype.create_basemap = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.geo_provider = this.get_component_geolocation().context.features.geo_provider;

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

tool_leaflet_special_tools.prototype.remove_basemap = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.geo_provider = this.get_component_geolocation().context.features.geo_provider;

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

tool_leaflet_special_tools.prototype.select_wms = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.geo_provider = this.get_component_geolocation().context.features.geo_provider;

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

tool_leaflet_special_tools.prototype.update_wms = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.geo_provider = this.get_component_geolocation().context.features.geo_provider;

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

tool_leaflet_special_tools.prototype.create_wms = async function(options) {
    
    const self = this;

    this.model = 'tool_leaflet_special_tools';
    
    options.geo_provider = this.get_component_geolocation().context.features.geo_provider;

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

tool_leaflet_special_tools.prototype.remove_wms = async function(options) {
    
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

tool_leaflet_special_tools.prototype.google_translate = async function(options) {

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
                
                if (SHOW_DEVELOPER) {
                    
                    dd_console("-> Google Translate API response:",'DEBUG',response);

                    resolve(response);
                    
                    if (options.hasOwnProperty('attribute')) {
                        
                        if (options.attribute === 'value') {
                            
                            options.element_html.value = response.str_translate;
                            
                        } else if (options.attribute === 'title') {
                            
                            options.element_html.setAttribute('title', response.str_translate);
                            
                        }
                        
                    } else {
                    
                        options.element_html.innerText = response.str_translate;
                        
                    }

                }

            });
        });
};

tool_leaflet_special_tools.prototype.set_component_geolocation = function(component_geolocation) {
    
    this.component_geolocation = component_geolocation;
    
};

tool_leaflet_special_tools.prototype.get_component_geolocation = function() {
    
    return this.component_geolocation;
    
};

tool_leaflet_special_tools.prototype.tool_url = function() {
    
    return DEDALO_ROOT_WEB + '/tools/tool_leaflet_special_tools';

};

tool_leaflet_special_tools.prototype.controls_url = function() {
    
    return this.tool_url() + '/leaflet.control.SpecialTools';

};


tool_leaflet_special_tools.prototype.uploads_url = function() {
    
    return this.tool_url() + '/uploads';

};

tool_leaflet_special_tools.prototype.uploads_path = function() {
    
    return '../uploads';

};


tool_leaflet_special_tools.prototype.make_id = function(length) {
    
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